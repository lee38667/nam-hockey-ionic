import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonIcon, IonLabel, IonItem, IonList, IonText } from '@ionic/react';
import { personCircleOutline, gridOutline, peopleOutline, walletOutline, calendarOutline } from 'ionicons/icons';

const Home: React.FC = () => (
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
                  <p>My Profile</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="6">
              <IonCard className="ion-text-center">
                <IonCardContent>
                  <IonIcon icon={gridOutline} size="large" color="primary"></IonIcon>
                  <p>Selections</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="6">
              <IonCard className="ion-text-center" routerLink="/app/teams">
                <IonCardContent>
                  <IonIcon icon={peopleOutline} size="large" color="primary"></IonIcon>
                  <p>My Teams</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="6">
              <IonCard className="ion-text-center">
                <IonCardContent>
                  <IonIcon icon={walletOutline} size="large" color="primary"></IonIcon>
                  <p>Financial Activity</p>
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
          {/* Placeholder for image/background */}
          <div style={{ height: '150px', background: 'linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)', position: 'relative' }}>
             <div style={{ position: 'absolute', bottom: '10px', left: '10px', color: 'white', fontSize: '1.2em', fontWeight: 'bold' }}>Welcome to your Club</div>
             <div style={{ position: 'absolute', bottom: '10px', right: '10px', color: 'white' }}>Oct 18, 2021</div>
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

export default Home; 