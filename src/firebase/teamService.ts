import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  DocumentData
} from 'firebase/firestore';
import { db } from './firebaseConfig';

export interface Team {
  id?: string;
  name: string;
  division: string;
  playerCount: number;
  titles?: number;
  status: 'active' | 'champion' | 'promoted';
  imageUrl?: string;
  bannerUrl?: string;
  description?: string;
  recentResults?: {
    id: string;
    opponent: string;
    score: string;
    date: string;
  }[];
  upcomingFixtures?: {
    id: string;
    opponent: string;
    date: string;
    time: string;
  }[];
  points: number;
}

export const subscribeToTeams = (callback: (teams: Team[]) => void) => {
  const teamsRef = collection(db, 'teams');
  const q = query(teamsRef, orderBy('name', 'asc'));

  return onSnapshot(q, (snapshot) => {
    const teams = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Team[];
    callback(teams);
  });
};

export const addTeam = async (team: Omit<Team, 'id'>): Promise<string> => {
  const teamsRef = collection(db, 'teams');
  const docRef = await addDoc(teamsRef, team);
  return docRef.id;
};

export const updateTeam = async (teamId: string, updates: Partial<Team>): Promise<void> => {
  const teamRef = doc(db, 'teams', teamId);
  await updateDoc(teamRef, updates);
}; 