import { useEffect, useState } from 'react';
import { getUserRole } from '../firebase/userRoles';
import { getAuth } from 'firebase/auth';

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

export function canEditTeams(role: string): boolean {
  return role === 'admin';
}

export function canEditPlayers(role: string): boolean {
  return role === 'admin' || role === 'coach';
}

export function canEditNews(role: string): boolean {
  return role === 'admin';
}

export function canEditMatches(role: string): boolean {
  return role === 'admin';
}
