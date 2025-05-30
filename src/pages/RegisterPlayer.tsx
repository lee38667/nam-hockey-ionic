import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonSelect,
  IonSelectOption,
  useIonToast
} from '@ionic/react';
import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
// import './RegisterPlayer.css';

const RegisterPlayer: React.FC = () => {
  const [name, setName] = useState('');
  const [team, setTeam] = useState('');
  const [position, setPosition] = useState('');
  const [teams, setTeams] = useState<{ id: string; name: string }[]>([]);
  const [present] = useIonToast();

  useEffect(() => {
    const fetchTeams = async () => {
      const teamsSnapshot = await getDocs(collection(db, 'teams'));
      const teamsList = teamsSnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name
      }));
      setTeams(teamsList);
    };
    fetchTeams();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'players'), {
        name,
        team,
        position,
        createdAt: new Date()
      });
      present({
        message: 'Player registered successfully!',
        duration: 2000,
        color: 'success'
      });
      setName('');
      setTeam('');
      setPosition('');
    } catch (error) {
      present({
        message: 'Error registering player',
        duration: 2000,
        color: 'danger'
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register Player</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardContent>
            <form onSubmit={handleSubmit}>
              <IonItem>
                <IonLabel position="stacked">Player Name</IonLabel>
                <IonInput value={name} onIonChange={e => setName(e.detail.value!)} required />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Team</IonLabel>
                <IonSelect value={team} onIonChange={e => setTeam(e.detail.value)} required>
                  {teams.map(team => (
                    <IonSelectOption key={team.id} value={team.id}>
                      {team.name}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Position</IonLabel>
                <IonSelect value={position} onIonChange={e => setPosition(e.detail.value)} required>
                  <IonSelectOption value="Forward">Forward</IonSelectOption>
                  <IonSelectOption value="Midfielder">Midfielder</IonSelectOption>
                  <IonSelectOption value="Defender">Defender</IonSelectOption>
                  <IonSelectOption value="Goalkeeper">Goalkeeper</IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonButton expand="block" type="submit" className="ion-margin-top">
                Register Player
              </IonButton>
            </form>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPlayer; 