import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';

const Teams: React.FC = () => {
  const [teamName, setTeamName] = useState('');

  const handleAddTeam = () => {
    console.log('Adding team:', teamName);
    // TODO: Implement database integration here
    setTeamName(''); // Clear the input after submission
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Teams</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <h2>Team Registration & Management</h2>
        <p>Register and manage teams here.</p>

        <div className="ion-padding">
          <IonItem>
            <IonLabel position="floating">Team Name</IonLabel>
            <IonInput value={teamName} onIonChange={e => setTeamName(e.detail.value!)}></IonInput>
          </IonItem>
          <IonButton expand="block" className="ion-padding-top" onClick={handleAddTeam}>Add Team</IonButton>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Teams; 