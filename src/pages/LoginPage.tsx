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
  useIonToast,
  IonRouterOutlet,
  createAnimation
} from '@ionic/react';
import { lockClosedOutline } from 'ionicons/icons';
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
      history.push('/home');
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

  const handleNavigation = (path: string) => {
    const animation = createAnimation()
      .addElement(document.querySelector('.login-card')!)
      .duration(300)
      .easing('ease-out')
      .fromTo('opacity', '1', '0')
      .fromTo('transform', 'translateY(0)', 'translateY(-20px)');

    animation.play().then(() => {
      history.push(path);
    });
  };

  useEffect(() => {
    // Hide the splash screen after the app is ready
    SplashScreen.hide();

    // Add entrance animation
    const entranceAnimation = createAnimation()
      .addElement(document.querySelector('.login-card')!)
      .duration(500)
      .easing('ease-out')
      .fromTo('opacity', '0', '1')
      .fromTo('transform', 'translateY(20px)', 'translateY(0)');

    entranceAnimation.play();
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
                    <img 
                      src="/src/pages/images/SplashScreen.png" 
                      alt="Namibia Hockey Logo" 
                      className="login-logo"
                    />
                    <h2>Welcome Back</h2>
                    <p>Please sign in to continue</p>
                  </div>

                  <IonItem className="ion-margin-bottom custom-input">
                    <IonLabel position="stacked">Email</IonLabel>
                    <IonInput
                      type="email"
                      value={email}
                      onIonChange={e => setEmail(e.detail.value!)}
                      placeholder="Enter your email"
                      disabled={isLoading}
                      className="custom-input-field"
                    />
                  </IonItem>

                  <IonItem className="ion-margin-bottom custom-input">
                    <IonLabel position="stacked">Password</IonLabel>
                    <IonInput
                      type="password"
                      value={password}
                      onIonChange={e => setPassword(e.detail.value!)}
                      placeholder="Enter your password"
                      disabled={isLoading}
                      className="custom-input-field"
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
                      <p>Don't have an account?</p>
                    </IonText>
                    <IonButton 
                      fill="clear" 
                      onClick={() => handleNavigation('/register')}
                      className="signup-button"
                    >
                      Sign Up
                    </IonButton>
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