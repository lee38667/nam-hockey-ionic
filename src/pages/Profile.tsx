import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  useIonToast
} from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getAuth, updateEmail, updatePassword } from 'firebase/auth';
// import './Profile.css';

const Profile: React.FC = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [presentToast] = useIonToast();
  const history = useHistory();
  const auth = getAuth();

  useEffect(() => {
    if (auth.currentUser) {
      setEmail(auth.currentUser.email || '');
    }
  }, [auth]);

  const handleUpdateProfile = async () => {
    if (!auth.currentUser) return;

    try {
      if (newPassword) {
        if (newPassword !== confirmPassword) {
          presentToast({
            message: 'Passwords do not match',
            duration: 2000,
            position: 'bottom',
            color: 'danger'
          });
          return;
        }
        await updatePassword(auth.currentUser, newPassword);
      }

      if (email !== auth.currentUser.email) {
        await updateEmail(auth.currentUser, email);
      }

      presentToast({
        message: 'Profile updated successfully',
        duration: 2000,
        position: 'bottom',
        color: 'success'
      });
    } catch (error: any) {
      presentToast({
        message: error.message || 'Failed to update profile',
        duration: 2000,
        position: 'bottom',
        color: 'danger'
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton fill="clear" onClick={() => history.goBack()}>
            <IonIcon icon={arrowBackOutline} />
          </IonButton>
          <IonTitle>Edit Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Email</IonLabel>
          <IonInput
            type="email"
            value={email}
            onIonChange={e => setEmail(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">New Password</IonLabel>
          <IonInput
            type="password"
            value={newPassword}
            onIonChange={e => setNewPassword(e.detail.value!)}
            placeholder="Leave blank to keep current password"
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Confirm New Password</IonLabel>
          <IonInput
            type="password"
            value={confirmPassword}
            onIonChange={e => setConfirmPassword(e.detail.value!)}
            placeholder="Confirm new password"
          />
        </IonItem>

        <IonButton expand="block" onClick={handleUpdateProfile} className="ion-margin-top">
          Update Profile
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Profile; 