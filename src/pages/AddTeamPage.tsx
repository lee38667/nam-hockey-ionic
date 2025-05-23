import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonItem, IonLabel, IonList, IonText } from '@ionic/react';
import { addTeam } from '../firebase/firestore';

const AddTeamPage: React.FC = () => {
  const [teamName, setTeamName] = useState('');
  const [coachName, setCoachName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
      setTeamName('');
      setCoachName('');
    } catch (e: any) {
      setError('Error adding team: ' + e.message);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Team</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="floating">Team Name</IonLabel>
            <IonInput value={teamName} onIonChange={e => setTeamName(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Coach Name</IonLabel>
            <IonInput value={coachName} onIonChange={e => setCoachName(e.detail.value!)}></IonInput>
          </IonItem>
        </IonList>
        {error && <IonText color="danger"><p>{error}</p></IonText>}
        {success && <IonText color="success"><p>{success}</p></IonText>}
        <IonButton expand="block" onClick={handleAddTeam}>Add Team</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AddTeamPage; 