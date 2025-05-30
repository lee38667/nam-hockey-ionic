import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonAvatar,
  IonButton,
  IonToggle,
  IonItemDivider,
  useIonToast
} from '@ionic/react';
import {
  personCircleOutline,
  logOutOutline,
  moonOutline
} from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import './More.css';

const More: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [presentToast] = useIonToast();
  const history = useHistory();
  const auth = getAuth();

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    document.body.classList.toggle('dark', prefersDark);

    if (auth.currentUser) {
      setUserEmail(auth.currentUser.email || '');
    }
  }, [auth]);

  const toggleDarkMode = (e: CustomEvent) => {
    const isDark = e.detail.checked;
    setIsDarkMode(isDark);
    document.body.classList.toggle('dark', isDark);
    presentToast({
      message: `${isDark ? 'Dark' : 'Light'} mode enabled`,
      duration: 2000,
      position: 'bottom'
    });
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      history.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>More</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* User Profile Section */}
        <div className="profile-section">
          <IonAvatar className="profile-avatar">
            <img src="/src/pages/images/CloseUpHockey.jpg" alt="Profile" />
          </IonAvatar>
          <h2>{userEmail}</h2>
          <p>Hockey Fan</p>
          <IonButton fill="outline" size="small" onClick={() => history.push('/profile')}>
            Edit Profile
          </IonButton>
        </div>

        {/* Settings List */}
        <IonList>
          <IonItem onClick={() => history.push('/profile')}>
            <IonIcon icon={personCircleOutline} slot="start" />
            <IonLabel>My Profile</IonLabel>
          </IonItem>

          <IonItem>
            <IonIcon icon={moonOutline} slot="start" />
            <IonLabel>Dark Mode</IonLabel>
            <IonToggle 
              slot="end" 
              checked={isDarkMode}
              onIonChange={toggleDarkMode}
            />
          </IonItem>

          <IonItem className="logout-item" onClick={handleLogout}>
            <IonIcon icon={logOutOutline} slot="start" color="danger" />
            <IonLabel color="danger">Log Out</IonLabel>
          </IonItem>
        </IonList>

        {/* App Version */}
        <div className="app-version">
          <p>Version 1.0.5</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default More; 