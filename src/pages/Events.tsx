import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

const Events: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Events</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <h2>Event Entries & Management</h2>
      <p>Enter and manage events here.</p>
    </IonContent>
  </IonPage>
);

export default Events; 