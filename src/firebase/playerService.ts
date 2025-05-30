import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  where,
  getDocs
} from 'firebase/firestore';
import { db } from './firebaseConfig';

export interface Player {
  id?: string;
  teamId: string;
  name: string;
  number: number;
  position: 'Forward' | 'Defense' | 'Goalie';
  age: number;
  height: string;
  weight: number;
  stats?: {
    goals?: number;
    assists?: number;
    points?: number;
    gamesPlayed?: number;
    penaltyMinutes?: number;
  };
  imageUrl?: string;
  status: 'active' | 'injured' | 'suspended';
}

export const subscribeToTeamPlayers = (teamId: string, callback: (players: Player[]) => void) => {
  const playersRef = collection(db, 'teams', teamId, 'players');
  const q = query(playersRef, orderBy('number', 'asc'));

  return onSnapshot(q, (snapshot) => {
    const players = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Player[];
    callback(players);
  });
};

export const addPlayer = async (teamId: string, player: Omit<Player, 'id' | 'teamId'>): Promise<string> => {
  const playersRef = collection(db, 'teams', teamId, 'players');
  const docRef = await addDoc(playersRef, { ...player, teamId });
  return docRef.id;
};

export const updatePlayer = async (teamId: string, playerId: string, updates: Partial<Player>): Promise<void> => {
  const playerRef = doc(db, 'teams', teamId, 'players', playerId);
  await updateDoc(playerRef, updates);
};

export const getPlayerStats = async (teamId: string) => {
  const playersRef = collection(db, 'teams', teamId, 'players');
  const snapshot = await getDocs(playersRef);
  const players = snapshot.docs.map(doc => doc.data() as Player);
  
  return {
    totalPlayers: players.length,
    activePlayers: players.filter(p => p.status === 'active').length,
    totalGoals: players.reduce((sum, p) => sum + (p.stats?.goals || 0), 0),
    totalAssists: players.reduce((sum, p) => sum + (p.stats?.assists || 0), 0),
    totalPoints: players.reduce((sum, p) => sum + (p.stats?.points || 0), 0)
  };
}; 