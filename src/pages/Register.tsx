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
  createAnimation,
  IonSelect,
  IonSelectOption
} from '@ionic/react';
import { lockClosedOutline, personOutline, mailOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebaseAuth';
import './Register.css';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('fan'); // Default role
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [presentToast] = useIonToast();

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      presentToast({
        message: 'Please fill in all fields',
        duration: 2000,
        position: 'bottom',
        color: 'warning'
      });
      return;
    }

    if (password !== confirmPassword) {
      presentToast({
        message: 'Passwords do not match',
        duration: 2000,
        position: 'bottom',
        color: 'danger'
      });
      return;
    }

    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name
      });
      // Save user role to Firestore
      await fetch('/api/saveUserRole', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: userCredential.user.uid, email, role })
      });

      presentToast({
        message: 'Account created successfully!',
        duration: 2000,
        position: 'bottom',
        color: 'success'
      });

      // Navigate to login after a short delay
      setTimeout(() => {
        handleNavigation('/login');
      }, 1500);
    } catch (error: any) {
      presentToast({
        message: error.message || 'Registration failed. Please try again.',
        duration: 2000,
        position: 'bottom',
        color: 'danger'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigation = (path: string) => {
    const card = document.querySelector('.register-card');
    if (card) {
      const animation = createAnimation()
        .addElement(card)
        .duration(300)
        .easing('ease-out')
        .fromTo('opacity', '1', '0')
        .fromTo('transform', 'translateY(0)', 'translateY(-20px)');

      animation.play().then(() => {
        history.push(path);
      });
    } else {
      history.push(path);
    }
  };

  useEffect(() => {
    const card = document.querySelector('.register-card');
    if (card) {
      const entranceAnimation = createAnimation()
        .addElement(card)
        .duration(500)
        .easing('ease-out')
        .fromTo('opacity', '0', '1')
        .fromTo('transform', 'translateY(20px)', 'translateY(0)');

      entranceAnimation.play();
    }
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid className="ion-padding">
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
              <IonCard className="register-card">
                <IonCardContent>
                  <div className="ion-text-center ion-padding">
                    <img 
                      src="https://d4f7y6nbupj5z.cloudfront.net/wp-content/uploads/2022/07/Namibiau20squad.jpg" 
                      alt="Namibia Hockey Logo" 
                      className="register-logo"
                    />
                    <h2>Create Account</h2>
                    <p>Join Namibia Hockey today</p>
                  </div>

                  <IonItem className="ion-margin-bottom custom-input">
                    <IonLabel position="stacked">Full Name</IonLabel>
                    <IonInput
                      type="text"
                      value={name}
                      onIonChange={e => setName(e.detail.value!)}
                      placeholder="Enter your full name"
                      disabled={isLoading}
                      className="custom-input-field"
                    />
                  </IonItem>

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
                      placeholder="Create a password"
                      disabled={isLoading}
                      className="custom-input-field"
                    />
                  </IonItem>

                  <IonItem className="ion-margin-bottom custom-input">
                    <IonLabel position="stacked">Confirm Password</IonLabel>
                    <IonInput
                      type="password"
                      value={confirmPassword}
                      onIonChange={e => setConfirmPassword(e.detail.value!)}
                      placeholder="Confirm your password"
                      disabled={isLoading}
                      className="custom-input-field"
                    />
                  </IonItem>

                  <IonItem className="ion-margin-bottom custom-input">
                    <IonLabel position="stacked">Role</IonLabel>
                    <IonSelect
                      value={role}
                      onIonChange={e => setRole(e.detail.value)}
                      disabled={isLoading}
                      className="custom-input-field"
                    >
                      <IonSelectOption value="fan">Fan</IonSelectOption>
                      <IonSelectOption value="player">Player</IonSelectOption>
                      <IonSelectOption value="coach">Coach</IonSelectOption>
                      <IonSelectOption value="admin">Admin</IonSelectOption>
                    </IonSelect>
                  </IonItem>

                  <IonButton
                    expand="block"
                    onClick={handleRegister}
                    className="ion-margin-top"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </IonButton>

                  <div className="ion-text-center ion-margin-top">
                    <IonText color="medium">
                      <p>Already have an account?</p>
                    </IonText>
                    <IonButton 
                      fill="clear" 
                      onClick={() => handleNavigation('/login')}
                      className="login-button"
                    >
                      Sign In
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

export default Register;