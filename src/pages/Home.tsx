import React, { useEffect, useState } from 'react';
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
import { subscribeToMatches } from '../firebase/matchService';
import { subscribeToNews } from '../firebase/newsService';
import { subscribeToTeams } from '../firebase/teamService';
import { Match } from '../firebase/matchService';
import { NewsItem } from '../firebase/newsService';
import { Team } from '../firebase/teamService';
import './Home.css';

const Home: React.FC = () => {
  const [liveMatches, setLiveMatches] = useState<Match[]>([]);
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    // Subscribe to live matches
    const unsubscribeMatches = subscribeToMatches('live', (matches) => {
      setLiveMatches(matches);
    });

    // Subscribe to latest news
    const unsubscribeNews = subscribeToNews((news) => {
      setLatestNews(news.slice(0, 1)); // Get only the latest news item
    });

    // Subscribe to teams for standings
    const unsubscribeTeams = subscribeToTeams((teamsData) => {
      // Sort teams by points (you might need to add points to your team model)
      const sortedTeams = teamsData.sort((a, b) => (b.points || 0) - (a.points || 0));
      setTeams(sortedTeams.slice(0, 5)); // Get top 5 teams
    });

    return () => {
      unsubscribeMatches();
      unsubscribeNews();
      unsubscribeTeams();
    };
  }, []);

  const handleRefresh = (event: RefresherCustomEvent) => {
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {/* Hero Section */}
        <div className="hero-section">
          <IonImg src="/src/pages/images/hockey-players.jpg" alt="Hockey Players" />
          <div className="hero-overlay ">
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
                  {liveMatches.length > 0 ? (
                    liveMatches.map(match => (
                      <div key={match.id} className="match-preview" style={{ color: 'white' }}>
                        <div className="team" style={{ color: 'white' }}>{match.homeTeam}</div>
                        <div className="score" style={{ color: 'white' }}>
                          {match.homeScore || 0} - {match.awayScore || 0}
                        </div>
                        <div className="team" style={{ color: 'white' }}>{match.awayTeam}</div>
                      </div>
                    ))
                  ) : (
                    <div className="no-matches" style={{ color: 'white' }}>
                      No live matches at the moment
                    </div>
                  )}
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="12" sizeMd="6" sizeLg="4">
              <IonCard className="quick-access-card">
                <IonCardHeader>
                  <IonCardTitle className="colorWhite">Latest News</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  {latestNews.length > 0 ? (
                    <div className="news-preview" style={{ color: 'white' }}>
                      <h3>{latestNews[0].title}</h3>
                      <p>{latestNews[0].content.substring(0, 100)}...</p>
                    </div>
                  ) : (
                    <div className="no-news" style={{ color: 'white' }}>
                      No news available
                    </div>
                  )}
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
                      {teams.map((team, index) => (
                        <tr key={team.id}>
                          <td>{index + 1}</td>
                          <td>{team.name}</td>
                          <td>{team.points || 0}</td>
                        </tr>
                      ))}
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