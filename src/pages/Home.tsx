import React, { useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonIcon, IonLabel, IonItem, IonList, IonText } from '@ionic/react';
import { personCircleOutline, peopleOutline, calendarOutline, radio } from 'ionicons/icons';
import { SplashScreen } from '@capacitor/splash-screen';

const Home: React.FC = () => {

  useEffect(() => {
    // Hide the splash screen after the app is ready
    SplashScreen.hide();
  }, []); // Run once on component mount

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* Quick View Section */}
        <div className="ion-padding-top ion-padding-start ion-padding-end">
          <IonText color="medium">
            <h6>QUICK VIEW</h6>
          </IonText>
          <IonGrid>
            <IonRow>
              <IonCol size="6">
                <IonCard className="ion-text-center" routerLink="/app/players">
                  <IonCardContent>
                    <IonIcon icon={personCircleOutline} size="large" color="primary"></IonIcon>
                    <p>Players</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol size="6">
                <IonCard className="ion-text-center" routerLink="/app/teams">
                  <IonCardContent>
                    <IonIcon icon={peopleOutline} size="large" color="primary"></IonIcon>
                    <p>Teams</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="6">
                <IonCard className="ion-text-center" routerLink="/app/events">
                  <IonCardContent>
                    <IonIcon icon={calendarOutline} size="large" color="primary"></IonIcon>
                    <p>Events</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol size="6">
                <IonCard className="ion-text-center" routerLink="/app/live">
                  <IonCardContent>
                    <IonIcon icon={radio} size="large" color="primary"></IonIcon>
                    <p>Live</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

        {/* Posts Section */}
        <div className="ion-padding-start ion-padding-end">
           <IonText color="medium">
            <h6>POSTS</h6>
          </IonText>
          <IonCard>
            <div style={{ position: 'relative' }}>
              <img src="./images/hockey-players.jpg" alt="Hockey Players" style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', padding: '10px', background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))', color: 'white' }}>
                <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Welcome to your Club</div>
                <div style={{ fontSize: '0.9em' }}>Oct 18, 2021</div>
              </div>
            </div>
            {/* Add other post content here if needed */}
          </IonCard>
        </div>

        {/* Calendar Section */}
        <div className="ion-padding-start ion-padding-end ion-padding-bottom">
           <IonText color="medium">
            <h6>CALENDAR</h6>
          </IonText>
          <IonList inset={true}>
            <IonItem>
              <IonIcon icon={calendarOutline} slot="start" color="primary"></IonIcon>
              <IonLabel>
                <h2>Upcoming events</h2>
                <p>Ladies' 1st XI vs Opposition 7</p>
                <p>2022-02-21</p>
              </IonLabel>
            </IonItem>
          </IonList>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Home; 