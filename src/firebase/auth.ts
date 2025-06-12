import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import app from './firebaseConfig';

export const auth = getAuth(app);

export async function resetPassword(email: string): Promise<void> {
  const auth = getAuth();
  await sendPasswordResetEmail(auth, email);
}