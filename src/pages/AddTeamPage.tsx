import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonText,
  IonBackButton,
  IonButtons,
  useIonToast,
  IonCard,
  IonCardContent
} from '@ionic/react';
import { addTeam } from '../firebase/firestore';
import { useHistory } from 'react-router-dom';

const AddTeamPage: React.FC = () => {
  const [teamName, setTeamName] = useState('');
  const [coachName, setCoachName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const history = useHistory();
  const [present] = useIonToast();

  const handleAddTeam = async () => {
    setError('');
    setSuccess('');
    if (!teamName || !coachName) {
      setError('Please fill in all fields.');
      return;
    }
    try {
      await addTeam({ name: teamName, coach: coachName });
      setSuccess('Team added successfully!');
      present({
        message: 'Team added successfully!',
        duration: 1500,
        color: 'success',
        position: 'top',
        onDidDismiss: () => history.push('/home')
      });
      setTimeout(() => history.push('/home'), 1600);
      setTeamName('');
      setCoachName('');
    } catch {
      setError('Error adding team.');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/teams" />
          </IonButtons>
          <IonTitle>Add Team</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardContent>
            <form onSubmit={e => { e.preventDefault(); handleAddTeam(); }}>
              <IonList lines="none">
                <IonItem>
                  <IonLabel position="stacked">Team Name</IonLabel>
                  <IonInput value={teamName} onIonChange={e => setTeamName(e.detail.value!)} placeholder="Enter team name" />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Coach Name</IonLabel>
                  <IonInput value={coachName} onIonChange={e => setCoachName(e.detail.value!)} placeholder="Enter coach name" />
                </IonItem>
              </IonList>
              {error && <IonText color="danger"><p>{error}</p></IonText>}
              {success && <IonText color="success"><p>{success}</p></IonText>}
              <IonButton expand="block" type="submit" className="ion-margin-top">Add Team</IonButton>
            </form>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default AddTeamPage;