import React from 'react';
import { useUserRole } from '../hooks/useUserRole';
import { UserRole } from '../firebase/userRoles';

interface RoleGuardProps {
  children: React.ReactNode;
  requiredRole: UserRole[];
}

const RoleGuard: React.FC<RoleGuardProps> = ({ children, requiredRole }) => {
  const { role } = useUserRole();
  if (!role || !requiredRole.includes(role)) {
    return null;
  }
  return <>{children}</>;
};

export default RoleGuard;
