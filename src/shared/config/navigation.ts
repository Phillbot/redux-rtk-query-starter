import { RoutePath } from './routes';

export const NAV_LINKS = [
  { labelKey: 'navigation.home', path: RoutePath.home },
  { labelKey: 'navigation.about', path: RoutePath.about },
] as const;
