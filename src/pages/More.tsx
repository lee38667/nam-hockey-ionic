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
  useIonAlert,
  useIonToast
} from '@ionic/react';
import {
  personCircleOutline,
  informationCircleOutline,
  logOutOutline,
  moonOutline,
  peopleOutline,
  personAddOutline,
  newspaperOutline
} from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import './More.css';

const More: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [presentAlert] = useIonAlert();
  const [presentToast] = useIonToast();
  const history = useHistory();
  const auth = getAuth();

  useEffect(() => {
    // Check system preference for dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    document.body.classList.toggle('dark', prefersDark);
  }, []);

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
          <h2>John Doe</h2>
          <p>Hockey Fan</p>
          <IonButton fill="outline" size="small">
            Edit Profile
          </IonButton>
        </div>

        {/* Settings List */}
        <IonList>
          <IonItemDivider>Account</IonItemDivider>
          
          <IonItem>
            <IonIcon icon={personCircleOutline} slot="start" />
            <IonLabel>My Profile</IonLabel>
          </IonItem>

          <IonItemDivider>Preferences</IonItemDivider>

          <IonItem>
            <IonIcon icon={moonOutline} slot="start" />
            <IonLabel>Dark Mode</IonLabel>
            <IonToggle 
              slot="end" 
              checked={isDarkMode}
              onIonChange={toggleDarkMode}
            />
          </IonItem>

          <IonItem>
            <IonIcon icon={informationCircleOutline} slot="start" />
            <IonLabel>About</IonLabel>
          </IonItem>

          <IonItemDivider>Account Actions</IonItemDivider>

          <IonItem button onClick={() => history.push('/register-team')}>
            <IonIcon icon={peopleOutline} slot="start" />
            <IonLabel>Register Team</IonLabel>
          </IonItem>

          <IonItem button onClick={() => history.push('/register-player')}>
            <IonIcon icon={personAddOutline} slot="start" />
            <IonLabel>Register Player</IonLabel>
          </IonItem>

          <IonItem button onClick={() => history.push('/add-news')}>
            <IonIcon icon={newspaperOutline} slot="start" />
            <IonLabel>Add News/Event</IonLabel>
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