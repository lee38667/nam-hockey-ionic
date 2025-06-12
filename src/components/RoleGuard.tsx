import React from 'react';
import { useUserRole } from '../hooks/useUserRole';

interface RoleGuardProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, children }) => {
  const { role, loading } = useUserRole();
  if (loading) return null;
  if (!role || !allowedRoles.includes(role)) return null;
  return <>{children}</>;
};
