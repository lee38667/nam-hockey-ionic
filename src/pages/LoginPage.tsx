// src/pages/LoginPage.tsx
import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonItem, IonLabel } from '@ionic/react';
import { login } from '../firebase/firebaseAuth';
import { useHistory } from 'react-router-dom';
import { SplashScreen } from '@capacitor/splash-screen';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    try {
      await login(email, password);
      // Handle successful login (Navigate to Home page)
      console.log("User logged in successfully!");
      history.push('/app/home');
    } catch (error) {
      // Handle login errors
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    // Hide the splash screen after the app is ready
    SplashScreen.hide();
  }, []); // Run once on component mount

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
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
        <IonButton expand="block" onClick={handleLogin}>Login</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage; 