import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

const Players: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Players</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <h2>Player Registration & Management</h2>
      <p>Register and manage players here.</p>
    </IonContent>
  </IonPage>
);

export default Players; 