import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonSegment,
  IonSegmentButton,
  IonSearchbar,
  IonRefresher,
  IonRefresherContent,
  RefresherCustomEvent,
  IonIcon
} from '@ionic/react';
import { calendarOutline, locationOutline, timeOutline } from 'ionicons/icons';
import './Matches.css';

const Matches: React.FC = () => {
  const handleRefresh = (event: RefresherCustomEvent) => {
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Matches</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {/* Search and Filter Section */}
        <div className="matches-header">
        
          <IonSegment value="upcoming" className="matches-segment">
            <IonSegmentButton value="upcoming">
              <IonLabel>Upcoming</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="live">
              <IonLabel>Live</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="past">
              <IonLabel>Past</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </div>

        {/* Matches List */}
        <IonList>
          {/* Live Match */}
          <IonCard className="match-card live">
            <IonCardHeader>
              <IonCardTitle>
                <div className="match-header">
                  <span>Premier League</span>
                  <IonBadge color="danger">LIVE</IonBadge>
                </div>
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <div className="match-content">
                <div className="team">
                  <img src="/src/pages/images/CloseUpHockey.jpg" alt="Team A" />
                  <span>Team A</span>
                </div>
                <div className="score">
                  <span>2</span>
                  <span>-</span>
                  <span>1</span>
                </div>
                <div className="team">
                  <img src="/src/pages/images/CloseUpHockey.jpg" alt="Team B" />
                  <span>Team B</span>
                </div>
              </div>
              <div className="match-details">
                <IonItem lines="none">
                  <IonLabel>
                    <div className="detail-item">
                      <IonIcon icon={calendarOutline} />
                      <span>Today, 15:00</span>
                    </div>
                  </IonLabel>
                </IonItem>
                <IonItem lines="none">
                  <IonLabel>
                    <div className="detail-item">
                      <IonIcon icon={locationOutline} />
                      <span>National Hockey Stadium</span>
                    </div>
                  </IonLabel>
                </IonItem>
              </div>
            </IonCardContent>
          </IonCard>

          {/* Upcoming Match */}
          <IonCard className="match-card">
            <IonCardHeader>
              <IonCardTitle>
                <div className="match-header">
                  <span>Division 1</span>
                  <IonBadge color="primary">Tomorrow</IonBadge>
                </div>
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <div className="match-content">
                <div className="team">
                  <img src="/src/pages/images/CloseUpHockey.jpg" alt="Team C" />
                  <span>Team C</span>
                </div>
                <div className="time">
                  <IonIcon icon={timeOutline} />
                  <span>14:00</span>
                </div>
                <div className="team">
                  <img src="/src/pages/images/CloseUpHockey.jpg" alt="Team D" />
                  <span>Team D</span>
                </div>
              </div>
              <div className="match-details">
                <IonItem lines="none">
                  <IonLabel>
                    <div className="detail-item">
                      <IonIcon icon={locationOutline} />
                      <span>City Sports Complex</span>
                    </div>
                  </IonLabel>
                </IonItem>
              </div>
            </IonCardContent>
          </IonCard>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Matches; 