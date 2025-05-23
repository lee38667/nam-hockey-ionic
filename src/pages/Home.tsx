import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

const Home: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Home</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <h2>Welcome to Namibia Hockey Union</h2>
      <p>Latest news and updates will appear here.</p>
    </IonContent>
  </IonPage>
);

export default Home; 