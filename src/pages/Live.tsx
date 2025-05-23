import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

const Live: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Live</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <h2>Live Updates</h2>
      <p>Real-time information will be shared here.</p>
    </IonContent>
  </IonPage>
);

export default Live; 