// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEyTYOzUoS3DyQsRbmk9263_7igpy8m4A",
  authDomain: "namhockey-64af2.firebaseapp.com",
  projectId: "namhockey-64af2",
  storageBucket: "namhockey-64af2.firebasestorage.app",
  messagingSenderId: "430066998544",
  appId: "1:430066998544:web:959b84a9b75dac8b185995",
  measurementId: "G-YNV19QVMYS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default app;
export { db };

// Function to initialize sample teams
export const initializeTeams = async () => {
  const teamsRef = collection(db, 'teams');
  
  const sampleTeams = [
    {
      name: 'National Team',
      division: 'Premier League',
      playerCount: 25,
      titles: 3,
      status: 'champion',
      imageUrl: 'https://example.com/national-team.png',
      bannerUrl: 'https://example.com/national-team-banner.jpg',
      description: 'Premier League Champions'
    },
    {
      name: 'Team A',
      division: 'Division 1',
      playerCount: 15,
      status: 'active',
      imageUrl: 'https://example.com/team-a.png'
    },
    {
      name: 'Team B',
      division: 'Premier League',
      playerCount: 20,
      status: 'champion',
      imageUrl: 'https://example.com/team-b.png'
    },
    {
      name: 'Team C',
      division: 'Division 2',
      playerCount: 18,
      status: 'promoted',
      imageUrl: 'https://example.com/team-c.png'
    }
  ];

  try {
    for (const team of sampleTeams) {
      await addDoc(teamsRef, team);
    }
    console.log('Sample teams added successfully');
  } catch (error) {
    console.error('Error adding sample teams:', error);
  }
}; 
