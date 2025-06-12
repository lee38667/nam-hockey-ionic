import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

export type UserRole = 'admin' | 'coach' | 'fan';

export const setUserRole = async (uid: string, role: UserRole) => {
  const db = getFirestore();
  await setDoc(doc(db, 'userRoles', uid), { role });
};

export const getUserRole = async (uid: string): Promise<UserRole> => {
  const db = getFirestore();
  const docRef = doc(db, 'userRoles', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? (docSnap.data().role as UserRole) : 'fan';
};

export const checkPermission = async (uid: string, allowedRoles: UserRole[]): Promise<boolean> => {
  const userRole = await getUserRole(uid);
  return allowedRoles.includes(userRole);
};
