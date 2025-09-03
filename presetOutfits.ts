
import { OutfitCategory, PresetOutfit } from './types';

// Using picsum.photos for consistent, seeded placeholder images
const getImageUrl = (seed: string) => `https://picsum.photos/seed/${seed}/300/400`;

export const PRESET_OUTFITS: PresetOutfit[] = [
  // Party
  {
    id: 'preset-party-1',
    name: 'Midnight Glam',
    category: OutfitCategory.PARTY,
    image: getImageUrl('stylo-party-1'),
  },
  {
    id: 'preset-party-2',
    name: 'Sequined Star',
    category: OutfitCategory.PARTY,
    image: getImageUrl('stylo-party-2'),
  },
  // Casual
  {
    id: 'preset-casual-1',
    name: 'Urban Explorer',
    category: OutfitCategory.CASUAL,
    image: getImageUrl('stylo-casual-1'),
  },
  {
    id: 'preset-casual-2',
    name: 'Weekend Comfort',
    category: OutfitCategory.CASUAL,
    image: getImageUrl('stylo-casual-2'),
  },
  // Date
  {
    id: 'preset-date-1',
    name: 'Romantic Allure',
    category: OutfitCategory.DATE,
    image: getImageUrl('stylo-date-1'),
  },
  {
    id: 'preset-date-2',
    name: 'Chic Encounter',
    category: OutfitCategory.DATE,
    image: getImageUrl('stylo-date-2'),
  },
  // Office
  {
    id: 'preset-office-1',
    name: 'Power Executive',
    category: OutfitCategory.OFFICE,
    image: getImageUrl('stylo-office-1'),
  },
  {
    id: 'preset-office-2',
    name: 'Modern Professional',
    category: OutfitCategory.OFFICE,
    image: getImageUrl('stylo-office-2'),
  },
];