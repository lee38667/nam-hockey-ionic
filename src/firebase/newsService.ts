import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot,
  Timestamp,
  DocumentData
} from 'firebase/firestore';
import { db } from './firebaseConfig';

export interface NewsItem {
  id?: string;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: Timestamp;
  author?: string;
  authorName?: string;
  authorPhotoURL?: string;
  timestamp?: number;
}

export const addNews = async (news: Omit<NewsItem, 'id' | 'createdAt'>): Promise<string> => {
  try {
    const newsRef = collection(db, 'news');
    const newsData = {
      ...news,
      createdAt: Timestamp.now(),
      imageUrl: news.imageUrl || null,
      author: news.author || null,
      authorName: news.authorName || null,
      authorPhotoURL: news.authorPhotoURL || null
    };
    const docRef = await addDoc(newsRef, newsData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding news:', error);
    throw error;
  }
};

export const subscribeToNews = (callback: (news: NewsItem[]) => void) => {
  const newsRef = collection(db, 'news');
  const q = query(newsRef, orderBy('createdAt', 'desc'));

  return onSnapshot(q, (snapshot) => {
    const news = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as NewsItem[];
    callback(news);
  });
}; 