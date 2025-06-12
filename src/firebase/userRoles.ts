import { db } from './firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export type UserRole = 'admin' | 'coach' | 'fan';

export const setUserRole = async (uid: string, role: UserRole) => {
  await setDoc(doc(db, 'userRoles', uid), { role });
};

export const getUserRole = async (uid: string): Promise<UserRole> => {
  const roleDoc = await getDoc(doc(db, 'userRoles', uid));
  return roleDoc.exists() ? (roleDoc.data().role as UserRole) : 'fan';
};

export const checkPermission = async (uid: string, allowedRoles: UserRole[]): Promise<boolean> => {
  const userRole = await getUserRole(uid);
  return allowedRoles.includes(userRole);
};
