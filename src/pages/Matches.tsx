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
  IonRefresher,
  IonRefresherContent,
  RefresherCustomEvent,
  IonIcon,
  IonSpinner,
  IonFab,
  IonFabButton
} from '@ionic/react';
import { locationOutline, timeOutline, addOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { Match, subscribeToMatches } from '../firebase/matchService';
import { useHistory } from 'react-router-dom';
import { Timestamp } from 'firebase/firestore';
import './Matches.css';

const Matches: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState<'upcoming' | 'live' | 'past'>('upcoming');
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    
    // Subscribe to matches for the selected status
    const unsubscribe = subscribeToMatches(selectedSegment, (matchesData) => {
      setMatches(matchesData);
      setLoading(false);
    });

    // Cleanup subscription on unmount or when segment changes
    return () => unsubscribe();
  }, [selectedSegment]);

  const handleRefresh = (event: RefresherCustomEvent) => {
    // The data will automatically refresh through the subscription
    event.detail.complete();
  };

  const formatDate = (timestamp: Timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

        <div className="matches-header">
          <IonSegment 
            value={selectedSegment} 
            onIonChange={e => setSelectedSegment(e.detail.value as 'upcoming' | 'live' | 'past')}
            className="matches-segment"
          >
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

        {loading ? (
          <div className="loading-container">
            <IonSpinner name="crescent" />
          </div>
        ) : (
          <IonList>
            {matches.map(match => (
              <IonCard key={match.id} className={`match-card ${match.status}`}>
                <IonCardHeader>
                  <IonCardTitle>
                    <div className="match-header">
                      <span>{match.league}</span>
                      {match.status === 'live' && (
                        <IonBadge color="danger">LIVE</IonBadge>
                      )}
                      {match.status === 'upcoming' && (
                        <IonBadge color="primary">{formatDate(match.date)}</IonBadge>
                      )}
                    </div>
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <div className="match-content">
                    <div className="team">
                      <img 
                        src={match.homeTeamImage || '/src/pages/images/CloseUpHockey.jpg'} 
                        alt={match.homeTeam} 
                      />
                      <span>{match.homeTeam}</span>
                    </div>
                    {match.status === 'live' || match.status === 'past' ? (
                      <div className="score">
                        <span>{match.homeScore}</span>
                        <span>-</span>
                        <span>{match.awayScore}</span>
                      </div>
                    ) : (
                      <div className="time">
                        <IonIcon icon={timeOutline} />
                        <span>{formatDate(match.date)}</span>
                      </div>
                    )}
                    <div className="team">
                      <img 
                        src={match.awayTeamImage || '/src/pages/images/CloseUpHockey.jpg'} 
                        alt={match.awayTeam} 
                      />
                      <span>{match.awayTeam}</span>
                    </div>
                  </div>
                  <div className="match-details">
                    <IonItem lines="none">
                      <IonLabel>
                        <div className="detail-item">
                          <IonIcon icon={locationOutline} />
                          <span>{match.location}</span>
                        </div>
                      </IonLabel>
                    </IonItem>
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
          </IonList>
        )}

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => history.push('/add-match')}>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Matches;