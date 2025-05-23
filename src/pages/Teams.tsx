import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

const Teams: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Teams</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <h2>Team Registration & Management</h2>
      <p>Register and manage teams here.</p>
    </IonContent>
  </IonPage>
);

export default Teams; 