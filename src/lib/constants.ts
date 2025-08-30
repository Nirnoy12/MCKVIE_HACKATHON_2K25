import type { NavigationItem } from './types';

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Problems', path: '/problems' },
  { name: 'Schedule', path: '/schedule' },
  { name: 'Register', path: '/register' },
  { name: 'Contact', path: '/contact' },
];

export const APP_CONFIG = {
  name: 'MCKVIE',
  year: '2025',
  event: 'Hackathon',
  email: 'hackathon@mckvie.edu.in',
  phone: '+91 98765 43210',
  website: 'www.mckvie.edu.in',
  github: 'github.com/mckvie-hackathon',
} as const;

export const RULEBOOK_URL = '/rulebook.pdf';
