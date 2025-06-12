import { useState, useEffect } from 'react';
import { auth } from '../firebase/firebaseAuth';
import { getUserRole, UserRole } from '../firebase/userRoles';

export function useUserRole() {
  const [role, setRole] = useState<UserRole>('fan'); // Default to fan
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserRole = async () => {
      if (auth.currentUser) {
        try {
          const userRole = await getUserRole(auth.currentUser.uid);
          setRole(userRole);
        } catch (error) {
          setRole('fan');
        }
      } else {
        setRole('fan');
      }
      setLoading(false);
    };

    loadUserRole();
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setLoading(true);
      if (user) {
        try {
          const userRole = await getUserRole(user.uid);
          setRole(userRole);
        } catch (error) {
          setRole('fan');
        }
      } else {
        setRole('fan');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { role, loading };
}

export function canEditTeams(role: UserRole): boolean {
  return role === 'admin';
}

export function canEditPlayers(role: UserRole): boolean {
  return role === 'admin' || role === 'coach';
}

export function canEditNews(role: UserRole): boolean {
  return role === 'admin';
}

export function canEditMatches(role: UserRole): boolean {
  return role === 'admin';
}
