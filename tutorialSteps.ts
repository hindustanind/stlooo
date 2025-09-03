type Page = 'home' | 'generator' | 'closet' | 'ava' | 'profile';

export interface TutorialStep {
  elementId: string;
  title: string;
  content: string;
  page?: Page;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

export const tutorialSteps: TutorialStep[] = [
  {
    page: 'generator',
    elementId: 'tutorial-generator-uploader',
    title: '1. The Outfit Generator',
    content: "Welcome to StyloSphere! Start here by uploading a photo of an outfit. Our AI will create a clean, interactive 360° model for your virtual closet.",
    position: 'right',
  },
  {
    page: 'closet',
    elementId: 'tutorial-my-outfits-page',
    title: '2. Your Digital Closet',
    content: "All your saved outfits live here. You can view them, organize by category, and more.",
    position: 'bottom',
  },
  {
    page: 'closet',
    elementId: 'tutorial-dressing-room-tab',
    title: '3. The Dressing Room',
    content: "This is where the magic happens! Create a photorealistic avatar of yourself and try on any outfit from your closet.",
    position: 'bottom',
  },
  {
    page: 'ava',
    elementId: 'tutorial-ava-stylist-page',
    title: "4. Meet AVA, Your AI Stylist",
    content: "Have a style question? Ask AVA! She gives personalized advice based on the outfits you've saved.",
    position: 'top',
  },
  {
    page: 'profile',
    elementId: 'tutorial-profile-page',
    title: "5. Your Style Profile",
    content: "Post your favorite looks to your public showcase, update your style bio, and share your fashion journey.",
    position: 'bottom',
  },
];
