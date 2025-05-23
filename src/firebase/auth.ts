import { getAuth } from 'firebase/auth';
import { app } from '../backend/firebaseConfig';

export const auth = getAuth(app); 