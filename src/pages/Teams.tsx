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
  IonSearchbar,
  IonRefresher,
  IonRefresherContent,
  IonGrid,
  IonRow,
  IonCol,
  IonChip,
  IonAvatar,
  IonIcon,
  RefresherCustomEvent
} from '@ionic/react';
import { trophyOutline, peopleOutline, statsChartOutline } from 'ionicons/icons';
import './Teams.css';

const Teams: React.FC = () => {
  const handleRefresh = (event: RefresherCustomEvent) => {
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Teams</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {/* Featured Team */}
        <IonCard className="featured-team">
          <div className="team-banner">
            <img src="/src/pages/images/CloseUpHockey.jpg" alt="Team Banner" />
            <div className="team-overlay">
              <h2>National Team</h2>
              <p>Premier League Champions</p>
            </div>
          </div>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="5">
                  <div className="stat-item">
                    <IonIcon icon={trophyOutline} />
                    <span>3</span>
                    <small>Titles</small>
                  </div>
                </IonCol>
                <IonCol size="7">
                  <div className="stat-item">
                    <IonIcon icon={peopleOutline} />
                    <span>25</span>
                    <small>Players</small>
                  </div>
                </IonCol>
              
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* Teams List */}
        <IonList>
          <IonItem className="team-item">
            <IonAvatar slot="start">
              <img src="/src/pages/images/CloseUpHockey.jpg" alt="Team A" />
            </IonAvatar>
            <IonLabel>
              <h2>Team A</h2>
              <p>Division 1 • 15 Players</p>
            </IonLabel>
            <IonChip className='colorWhite' slot="end">Active</IonChip>
          </IonItem>

          <IonItem className="team-item">
            <IonAvatar slot="start">
              <img src="/src/pages/images/CloseUpHockey.jpg" alt="Team B" />
            </IonAvatar>
            <IonLabel>
              <h2>Team B</h2>
              <p>Premier League • 20 Players</p>
            </IonLabel>
            <IonChip color="success" className='colorWhite' slot="end">Champion</IonChip>
          </IonItem>

          <IonItem className="team-item">
            <IonAvatar slot="start">
              <img src="/src/pages/images/CloseUpHockey.jpg" alt="Team C" />
            </IonAvatar>
            <IonLabel>
              <h2>Team C</h2>
              <p>Division 2 • 18 Players</p>
            </IonLabel>
            <IonChip color="warning" slot="end">Promoted</IonChip>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Teams;