
import React, { useState, useEffect } from 'react';
// Explicitly include the file extension when importing the header component
// Vite 6’s resolver can sometimes fail to locate `.tsx` files when the extension
// is omitted (especially on case‑sensitive file systems).  Providing the
// extension here avoids the unresolved import error seen on Netlify builds.
import Header from './components/myOutfits/Header.tsx';
import HomePage from './components/home/HomePage';
import OutfitGeneratorPage from './components/outfitGenerator/OutfitGeneratorPage';
import MyOutfitsPage from './components/myOutfits/MyOutfitsPage';
import AvaStylistPage from './components/ava/AvaStylistPage';
import ProfilePage from './components/profile/ProfilePage';
import Chatbot from './components/chatbot/Chatbot';
import useLocalStorage from './hooks/useLocalStorage';
import { Outfit, Avatar } from './types';
import OutfitDetailModal from './components/myOutfits/OutfitDetailModal';
import { TutorialProvider, useTutorial } from './contexts/TutorialContext';
import { TutorialGuide } from './components/tutorial/TutorialGuide';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import OnboardingModal from './components/onboarding/OnboardingModal';

type Page = 'home' | 'generator' | 'closet' | 'ava' | 'profile';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const AppContent: React.FC = () => {
    const { currentUser, initializeUser } = useAuth();
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [viewedUserId, setViewedUserId] = useState<string | null>(null);

    const [outfits, setOutfits] = useLocalStorage<Outfit[]>('stylosphere-outfits', []);
    const [avatar, setAvatar] = useLocalStorage<Avatar | null>('stylosphere-avatar', null);
    const [isDevMode, setIsDevMode] = useState(false);
    const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);

    // State for page transitions
    const [displayedPage, setDisplayedPage] = useState<Page>(currentPage);
    const [animationClass, setAnimationClass] = useState('page-transition-enter');
    
    // State for PWA install prompt
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [isInstallable, setIsInstallable] = useState(false);
    
    const { setPageNavigator, isTutorialActive, startTutorial } = useTutorial();

    // Effect to handle PWA installation prompt
    useEffect(() => {
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            setIsInstallable(true);
        };
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    // Effect to handle navigation for the tutorial
    useEffect(() => {
        // A simple function to pass to the tutorial context for navigation
        const navigator = (page: Page) => handleNavigate(page);
        setPageNavigator(navigator);
    }, [setPageNavigator]);


    useEffect(() => {
        const preventDefault = (e: Event) => e.preventDefault();
        document.addEventListener('contextmenu', preventDefault);
        document.addEventListener('dblclick', preventDefault);
        document.addEventListener('dragstart', preventDefault);
        return () => {
            document.removeEventListener('contextmenu', preventDefault);
            document.removeEventListener('dblclick', preventDefault);
            document.removeEventListener('dragstart', preventDefault);
        };
    }, []);

    useEffect(() => {
        if (currentPage !== displayedPage) {
            setAnimationClass('page-transition-exit');
            const timer = setTimeout(() => {
                setDisplayedPage(currentPage);
                setAnimationClass('page-transition-enter');
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [currentPage, displayedPage]);

    const handleNavigate = (page: Page, userId: string | null = null) => {
        setCurrentPage(page);
        if (page === 'profile') {
            setViewedUserId(userId);
        }
    };
    
    const handleOutfitSaved = (newOutfit: Omit<Outfit, 'id' | 'createdAt'>) => {
        const outfitWithId: Outfit = {
            ...newOutfit,
            id: `outfit-${Date.now()}`,
            createdAt: Date.now(),
        };
        setOutfits(prevOutfits => [outfitWithId, ...prevOutfits]);
        handleNavigate('closet');
    };

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;
        setIsInstallable(false);
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
        } else {
            console.log('User dismissed the A2HS prompt');
        }
        setDeferredPrompt(null);
    };

    if (!currentUser) {
        return <OnboardingModal onSave={initializeUser} />;
    }

    const renderPage = (page: Page) => {
        switch (page) {
            case 'home':
                return <HomePage onGetStarted={() => handleNavigate('generator')} userName={currentUser.username} />;
            case 'generator':
                return <OutfitGeneratorPage onOutfitSaved={handleOutfitSaved} isDevMode={isDevMode} userName={currentUser.username} />;
            case 'closet':
                return <MyOutfitsPage outfits={outfits} setOutfits={setOutfits} avatar={avatar} setAvatar={setAvatar} isDevMode={isDevMode} setSelectedOutfit={setSelectedOutfit} />;
            case 'ava':
                return <AvaStylistPage userName={currentUser.username} outfits={outfits} isDevMode={isDevMode} />;
            case 'profile':
                return <ProfilePage 
                            key={viewedUserId || currentUser.id} // Re-mount when user changes
                            viewedUserId={viewedUserId}
                            onNavigate={handleNavigate}
                        />;
            default:
                return <HomePage onGetStarted={() => handleNavigate('generator')} userName={currentUser.username} />;
        }
    };
    
    return (
        <div className="min-h-screen w-full relative">
            <Header 
                currentPage={currentPage} 
                setCurrentPage={handleNavigate} 
                isDevMode={isDevMode} 
                setIsDevMode={setIsDevMode} 
                onRestartTutorial={startTutorial}
                isInstallable={isInstallable}
                onInstallClick={handleInstallClick}
            />
            <main className={
                displayedPage === 'home'
                ? 'h-screen overflow-hidden'
                : 'pt-24 px-4 sm:px-6 lg:px-8 pb-20 overflow-hidden'
            }>
                <div className={animationClass}>
                    {renderPage(displayedPage)}
                </div>
            </main>
            {currentPage !== 'closet' && <Chatbot outfits={outfits} isDevMode={isDevMode} userName={currentUser.username} />}
            
            {selectedOutfit && (
                <OutfitDetailModal 
                    outfit={selectedOutfit} 
                    onClose={() => setSelectedOutfit(null)} 
                    isDevMode={isDevMode}
                    currentUser={currentUser}
                />
            )}
            <TutorialGuide />
        </div>
    );
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <TutorialProvider>
                <AppContent />
            </TutorialProvider>
        </AuthProvider>
    );
};

export default App;