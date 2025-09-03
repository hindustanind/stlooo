
import { OutfitCategory, MusicTrack } from './types';

export const OUTFIT_CATEGORIES: OutfitCategory[] = [
  OutfitCategory.FAVORITES,
  OutfitCategory.ALL,
  OutfitCategory.PARTY,
  OutfitCategory.CASUAL,
  OutfitCategory.DATE,
  OutfitCategory.OFFICE,
];

export const VIEW_ANGLES: string[] = [
  'Front',
  'Front Right',
  'Right',
  'Back Right',
  'Back',
  'Back Left',
  'Left',
  'Front Left',
];

export const MUSIC_TRACKS: MusicTrack[] = [
  { name: 'Synthwave Dreams', url: 'https://cdn.pixabay.com/audio/2022/11/21/audio_18c3224216.mp3' },
  { name: 'Lo-fi Chill', url: 'https://cdn.pixabay.com/audio/2022/05/27/audio_180aad7834.mp3' },
  { name: 'Upbeat Funk', url: 'https://cdn.pixabay.com/audio/2022/08/03/audio_5838d1c816.mp3' },
];