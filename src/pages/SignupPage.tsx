// src/pages/SignupPage.tsx
import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonItem, IonLabel } from '@ionic/react';
import { signup } from '../firebase/firebaseAuth';
import { useHistory } from 'react-router-dom';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();


  const handleSignup = async () => {
    try {
      await signup(email, password);
      // Handle successful signup (e.g., navigate to login page or home)
      console.log("User signed up successfully!");
      history.push('/login');
    } catch (error) {
      // Handle signup errors
      console.error("Signup failed:", error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput type="email" value={email} onIonChange={e => setEmail(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value!)}></IonInput>
        </IonItem>
        <IonButton expand="block" onClick={handleSignup}>Sign Up</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SignupPage; 