import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import app from './firebaseConfig';

export const auth = getAuth(app);

export const resetPassword = async (email: string) => {
  return sendPasswordResetEmail(auth, email);
};