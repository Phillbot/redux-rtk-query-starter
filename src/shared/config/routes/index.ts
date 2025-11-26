export const RoutePath = {
  home: '/',
  about: '/about',
  admin: '/admin',
} as const;

export type AppRoute = keyof typeof RoutePath;
