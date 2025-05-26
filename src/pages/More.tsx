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
  notificationsOutline,
  settingsOutline,
  helpCircleOutline,
  informationCircleOutline,
  logOutOutline,
  moonOutline,
  languageOutline
} from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './More.css';


const More: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [presentAlert] = useIonAlert();
  const [presentToast] = useIonToast();
  const history = useHistory();

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

  const handleLogout = () => {
    presentAlert({
      header: 'Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Logout',
          handler: () => {
            localStorage.clear();
            history.push('/login');
            presentToast({
              message: 'Logged out successfully',
              duration: 2000,
              position: 'bottom'
            });
          }
        }
      ]
    });
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

          <IonItem>
            <IonIcon icon={notificationsOutline} slot="start" />
            <IonLabel>Notifications</IonLabel>
            <IonToggle slot="end" />
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
            <IonIcon icon={languageOutline} slot="start" />
            <IonLabel>Language</IonLabel>
            <IonLabel slot="end" color="medium">English</IonLabel>
          </IonItem>

          <IonItemDivider>Support</IonItemDivider>

          <IonItem>
            <IonIcon icon={helpCircleOutline} slot="start" />
            <IonLabel>Help & Support</IonLabel>
          </IonItem>

          <IonItem>
            <IonIcon icon={informationCircleOutline} slot="start" />
            <IonLabel>About</IonLabel>
          </IonItem>

          <IonItemDivider>Account Actions</IonItemDivider>

          <IonItem>
            <IonIcon icon={settingsOutline} slot="start" />
            <IonLabel>Settings</IonLabel>
          </IonItem>

          <IonItem className="logout-item" onClick={handleLogout}>
            <IonIcon icon={logOutOutline} slot="start" color="danger" />
            <IonLabel color="danger">Log Out</IonLabel>
          </IonItem>
        </IonList>

        {/* App Version */}
        <div className="app-version">
          <p>Version 1.0.0</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default More; 