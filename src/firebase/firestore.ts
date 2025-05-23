import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export const addTeam = async (teamData: any) => {
  try {
    const docRef = await addDoc(collection(db, "teams"), teamData);
    console.log("Team added with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding team: ", e);
    throw e;
  }
};

export const addEvent = async (eventData: any) => {
  try {
    const docRef = await addDoc(collection(db, "events"), eventData);
    console.log("Event added with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding event: ", e);
    throw e;
  }
}; 