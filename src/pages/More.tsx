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
  IonItemDivider
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
import './More.css';

const More: React.FC = () => {
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
            <IonToggle slot="end" />
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

          <IonItem className="logout-item">
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