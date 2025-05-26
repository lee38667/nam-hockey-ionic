import React, { useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonLabel,
  IonItem,
  IonList,
  IonText,
  IonImg,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail
} from '@ionic/react';
import { personCircleOutline, peopleOutline, calendarOutline, radio } from 'ionicons/icons';
import { RefresherCustomEvent } from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
  const handleRefresh = (event: RefresherCustomEvent) => {
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Namibia Hockey</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {/* Hero Section */}
        <div className="hero-section">
          <IonImg src="/src/pages/images/hockey-players.jpg" alt="Hockey Players" />
          <div className="hero-overlay">
            <h1>Welcome to Namibia Hockey</h1>
            <p>Your source for Namibian hockey news, scores, and updates</p>
          </div>
        </div>

        {/* Quick Access Cards */}
        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeMd="6" sizeLg="4">
              <IonCard className="quick-access-card">
                <IonCardHeader>
                  <IonCardTitle className="colorWhite">Today's Matches</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <div className="match-preview" style={{ color: 'white' }}>
                    <div className="team" style={{ color: 'white' }}>Team A</div>
                    <div className="score" style={{ color: 'white' }}>2 - 1</div>
                    <div className="team" style={{ color: 'white' }}>Team B</div>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="12" sizeMd="6" sizeLg="4">
              <IonCard className="quick-access-card">
                <IonCardHeader>
                  <IonCardTitle className="colorWhite">Latest News</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <div className="news-preview" style={{ color: 'white' }}>
                    <h3>National Team Qualifies for Championship</h3>
                    <p>Read more about this exciting achievement...</p>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="12" sizeMd="6" sizeLg="4">
              <IonCard className="quick-access-card">
                <IonCardHeader>
                  <IonCardTitle className="colorWhite">League Standings</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <table className="league-table" style={{ color: 'white' }}>
                    <thead>
                      <tr>
                        <th>Pos</th>
                        <th>Team</th>
                        <th>Pts</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Team A</td>
                        <td>15</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Team B</td>
                        <td>12</td>
                      </tr>
                    </tbody>
                  </table>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home; 