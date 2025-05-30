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
  IonTextarea,
  IonSelect,
  IonSelectOption,
  useIonToast
} from '@ionic/react';
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import './RegisterTeam.css';

const RegisterTeam: React.FC = () => {
  const [teamName, setTeamName] = useState('');
  const [division, setDivision] = useState('');
  const [description, setDescription] = useState('');
  const [present] = useIonToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'teams'), {
        name: teamName,
        division,
        description,
        createdAt: new Date(),
        players: []
      });
      present({
        message: 'Team registered successfully!',
        duration: 2000,
        color: 'success'
      });
      setTeamName('');
      setDivision('');
      setDescription('');
    } catch (error) {
      present({
        message: 'Error registering team',
        duration: 2000,
        color: 'danger'
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register Team</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard className="register-team-card">
          <IonCardContent>
            <form onSubmit={handleSubmit}>
              <IonItem>
                <IonLabel position="stacked">Team Name</IonLabel>
                <IonInput value={teamName} onIonChange={e => setTeamName(e.detail.value!)} required />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Division</IonLabel>
                <IonSelect value={division} onIonChange={e => setDivision(e.detail.value)} required>
                  <IonSelectOption value="Premier League">Premier League</IonSelectOption>
                  <IonSelectOption value="Division 1">Division 1</IonSelectOption>
                  <IonSelectOption value="Division 2">Division 2</IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Description</IonLabel>
                <IonTextarea value={description} onIonChange={e => setDescription(e.detail.value!)} />
              </IonItem>
              <IonButton expand="block" type="submit" className="ion-margin-top">
                Register Team
              </IonButton>
            </form>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default RegisterTeam; 