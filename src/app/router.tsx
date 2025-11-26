import { lazy, type ReactNode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';

import { type AppRole, EVERYONE } from '@/shared/config';
import { RoutePath } from '@/shared/config';
import { RoleGuard } from '@/shared/lib';
import { MainLayout } from '@/pages/common/layout';
import { AdminLayout } from '@/pages/admin/layout';

const HomePage = lazy(async () => ({
  default: (await import('@/pages/common/home/home-page')).HomePage,
}));
const AboutPage = lazy(async () => ({
  default: (await import('@/pages/common/about/about-page')).AboutPage,
}));
const NotFoundPage = lazy(async () => ({
  default: (await import('@/shared/pages/not-found')).NotFoundPage,
}));
const AdminDashboardPage = lazy(async () => ({
  default: (await import('@/pages/admin/dashboard/dashboard-page')).DashboardPage,
}));

const withRoleGuard = (element: ReactNode, allowedRoles: AppRole[]) => (
  <RoleGuard allowedRoles={allowedRoles}>{element}</RoleGuard>
);

const appRouter = createBrowserRouter([
  {
    path: RoutePath.home,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: withRoleGuard(<HomePage />, EVERYONE),
      },
      {
        path: RoutePath.about,
        element: withRoleGuard(<AboutPage />, EVERYONE),
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: withRoleGuard(<AdminDashboardPage />, EVERYONE),
      },
    ],
  },
]);

export const AppRouter = () => {
  return (
    <NuqsAdapter>
      <RouterProvider router={appRouter} />
    </NuqsAdapter>
  );
};
