import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  addDoc, 
  updateDoc,
  doc,
  Timestamp,
  DocumentData
} from 'firebase/firestore';
import { db } from './firebaseConfig';

export interface Match {
  id?: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  date: Timestamp;
  location: string;
  status: 'upcoming' | 'live' | 'past';
  homeTeamImage?: string;
  awayTeamImage?: string;
}

export const subscribeToMatches = (
  status: 'upcoming' | 'live' | 'past',
  callback: (matches: Match[]) => void
) => {
  const matchesRef = collection(db, 'matches');
  const q = query(
    matchesRef,
    where('status', '==', status),
    orderBy('date', status === 'past' ? 'desc' : 'asc')
  );

  return onSnapshot(q, (snapshot) => {
    const matches = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Match[];
    callback(matches);
  });
};

export const addMatch = async (match: Omit<Match, 'id'>): Promise<string> => {
  const matchesRef = collection(db, 'matches');
  const docRef = await addDoc(matchesRef, match);
  return docRef.id;
};

export const updateMatch = async (matchId: string, updates: Partial<Match>): Promise<void> => {
  const matchRef = doc(db, 'matches', matchId);
  await updateDoc(matchRef, updates);
};

export const updateMatchStatus = async (matchId: string, status: 'upcoming' | 'live' | 'past'): Promise<void> => {
  await updateMatch(matchId, { status });
};

export const updateMatchScore = async (
  matchId: string, 
  homeScore: number, 
  awayScore: number
): Promise<void> => {
  await updateMatch(matchId, { homeScore, awayScore });
}; 