import { useEffect, useState } from 'react';
import { getUserRole } from '../firebase/userRoles';
import { getAuth } from 'firebase/auth';

// Define UserRole type for type safety
export type UserRole = 'admin' | 'coach' | 'fan';

// Centralized permissions object for easy extension
const permissions: Record<UserRole, {
  canEditTeams: boolean;
  canDeleteTeams: boolean;
  canEditPlayers: boolean;
  canDeletePlayers: boolean;
  canEditMatches: boolean;
  canDeleteMatches: boolean;
  canEditNews: boolean;
  canDeleteNews: boolean;
  canView: boolean;
}> = {
  admin: {
    canEditTeams: true,
    canDeleteTeams: true,
    canEditPlayers: true,
    canDeletePlayers: true,
    canEditMatches: true,
    canDeleteMatches: true,
    canEditNews: true,
    canDeleteNews: true,
    canView: true
  },
  coach: {
    canEditTeams: true,
    canDeleteTeams: false,
    canEditPlayers: true,
    canDeletePlayers: false,
    canEditMatches: true,
    canDeleteMatches: false,
    canEditNews: false,
    canDeleteNews: false,
    canView: true
  },
  fan: {
    canEditTeams: false,
    canDeleteTeams: false,
    canEditPlayers: false,
    canDeletePlayers: false,
    canEditMatches: false,
    canDeleteMatches: false,
    canEditNews: false,
    canDeleteNews: false,
    canView: true
  }
};

export function useUserRole() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      setRole(null);
      setLoading(false);
      return;
    }
    getUserRole(user.uid).then(r => {
      setRole(r);
      setLoading(false);
    });
  }, []);

  return { role, loading };
}

export function isAdmin(role: string | null): boolean {
  return role === 'admin';
}

export function isCoach(role: string | null): boolean {
  return role === 'coach';
}

export function isFan(role: string | null): boolean {
  return role === 'fan';
}

function getRoleKey(role: string | null): UserRole | null {
  if (role === 'admin' || role === 'coach' || role === 'fan') return role;
  return null;
}

export function canEditTeams(role: string | null): boolean {
  const key = getRoleKey(role);
  return !!key && permissions[key].canEditTeams;
}

export function canDeleteTeams(role: string | null): boolean {
  const key = getRoleKey(role);
  return !!key && permissions[key].canDeleteTeams;
}

export function canEditPlayers(role: string | null): boolean {
  const key = getRoleKey(role);
  return !!key && permissions[key].canEditPlayers;
}

export function canDeletePlayers(role: string | null): boolean {
  const key = getRoleKey(role);
  return !!key && permissions[key].canDeletePlayers;
}

export function canEditMatches(role: string | null): boolean {
  const key = getRoleKey(role);
  return !!key && permissions[key].canEditMatches;
}

export function canDeleteMatches(role: string | null): boolean {
  const key = getRoleKey(role);
  return !!key && permissions[key].canDeleteMatches;
}

export function canEditNews(role: string | null): boolean {
  const key = getRoleKey(role);
  return !!key && permissions[key].canEditNews;
}

export function canDeleteNews(role: string | null): boolean {
  const key = getRoleKey(role);
  return !!key && permissions[key].canDeleteNews;
}

export function hasReadOnlyAccess(role: string | null): boolean {
  const key = getRoleKey(role);
  return !!key && permissions[key].canView && !permissions[key].canEditTeams && !permissions[key].canEditPlayers && !permissions[key].canEditMatches && !permissions[key].canEditNews;
}
