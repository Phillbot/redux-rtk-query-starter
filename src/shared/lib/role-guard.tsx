import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { type AppRole, getCurrentRole } from '@/shared/config';
import { RoutePath } from '@/shared/config';

type RoleGuardProps = Readonly<{
  allowedRoles: AppRole[];
  redirectTo?: string;
  children: ReactNode;
}>;

export const RoleGuard = ({ allowedRoles, redirectTo = RoutePath.home, children }: RoleGuardProps) => {
  const location = useLocation();
  const role = getCurrentRole();

  if (!allowedRoles.includes(role)) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return children;
};
