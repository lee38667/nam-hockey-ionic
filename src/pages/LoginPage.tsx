// src/pages/LoginPage.tsx
import React, { useState, useEffect } from 'react';
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
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonIcon,
  IonText,
  useIonToast
} from '@ionic/react';
import { personCircleOutline, lockClosedOutline } from 'ionicons/icons';
import { login } from '../firebase/firebaseAuth';
import { useHistory } from 'react-router-dom';
import { SplashScreen } from '@capacitor/splash-screen';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [presentToast] = useIonToast();

  const handleLogin = async () => {
    if (!email || !password) {
      presentToast({
        message: 'Please enter both email and password',
        duration: 2000,
        position: 'bottom',
        color: 'warning'
      });
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      // Navigation will be handled by the auth state change in App.tsx
    } catch (error: any) {
      presentToast({
        message: error.message || 'Login failed. Please try again.',
        duration: 2000,
        position: 'bottom',
        color: 'danger'
      });
    } finally {
      setIsLoading(false);
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
          <IonTitle>Namibia Hockey</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid className="ion-padding">
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
              <IonCard className="login-card">
                <IonCardContent>
                  <div className="ion-text-center ion-padding">
                    <IonIcon
                      icon={personCircleOutline}
                      style={{ fontSize: '64px', color: 'var(--ion-color-primary)' }}
                    />
                    <h2>Welcome Back</h2>
                    <p>Please sign in to continue</p>
                  </div>

                  <IonItem className="ion-margin-bottom">
                    <IonLabel position="floating">
                      <IonIcon icon={personCircleOutline} className="ion-margin-end" />
                      Email
                    </IonLabel>
                    <IonInput
                      type="email"
                      value={email}
                      onIonChange={e => setEmail(e.detail.value!)}
                      placeholder="Enter your email"
                      disabled={isLoading}
                    />
                  </IonItem>

                  <IonItem className="ion-margin-bottom">
                    <IonLabel position="floating">
                      <IonIcon icon={lockClosedOutline} className="ion-margin-end" />
                      Password
                    </IonLabel>
                    <IonInput
                      type="password"
                      value={password}
                      onIonChange={e => setPassword(e.detail.value!)}
                      placeholder="Enter your password"
                      disabled={isLoading}
                    />
                  </IonItem>

                  <IonButton
                    expand="block"
                    onClick={handleLogin}
                    className="ion-margin-top"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </IonButton>

                  <div className="ion-text-center ion-margin-top">
                    <IonText color="medium">
                      <p>Don't have an account? Contact administrator</p>
                    </IonText>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage; 