import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonText, IonGrid, IonRow, IonCol } from '@ionic/react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

interface Player {
  id: string;
  name: string;
}

interface MatchResult {
  id: string;
  opponent: string;
  score: string;
  date: string;
}

interface UpcomingFixture {
  id: string;
  opponent: string;
  date: string;
  time: string;
}

interface TeamStats {
  gamesPlayed: number;
  wins: number;
  losses: number;
  draws: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

interface Team {
  id: string;
  name: string;
  roster: Player[];
  recentResults: MatchResult[];
  upcomingFixtures: UpcomingFixture[];
  stats: TeamStats;
}

const TeamDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      if (!id) {
        setError("No team ID provided.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const teamDocRef = doc(db, 'teams', id);
        const teamDocSnap = await getDoc(teamDocRef);

        if (teamDocSnap.exists()) {
          const teamData = teamDocSnap.data() as Team;
          setTeam({ ...teamData, id: teamDocSnap.id });
        } else {
          setError(`No team found with ID: ${id}`);
        }
      } catch (err) {
        console.error("Error fetching team data:", err);
        setError("Failed to fetch team data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();

  }, [id]);

  if (loading) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Loading...</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonText>Loading team details...</IonText>
        </IonContent>
      </IonPage>
    );
  }

  if (error) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Error</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonText color="danger">{error}</IonText>
        </IonContent>
      </IonPage>
    );
  }

  if (!team) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Not Found</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonText>Team not found.</IonText>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{team.name} Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="ion-padding">
          {/* Team Roster Section */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Roster</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                {team.roster && team.roster.map((player) => (
                  <IonItem key={player.id}>
                    <IonLabel>{player.name}</IonLabel>
                  </IonItem>
                ))}
                {!team.roster || team.roster.length === 0 && <IonText><p>No roster information available.</p></IonText>}
              </IonList>
            </IonCardContent>
          </IonCard>

          {/* Recent Results Section */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Recent Results</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
               <IonList>
                {team.recentResults && team.recentResults.map((result) => (
                  <IonItem key={result.id}>
                     <IonLabel>{result.date}: {result.opponent} - {result.score}</IonLabel>
                  </IonItem>
                ))}
                 {!team.recentResults || team.recentResults.length === 0 && <IonText><p>No recent results available.</p></IonText>}
              </IonList>
            </IonCardContent>
          </IonCard>

           {/* Upcoming Fixtures Section */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Upcoming Fixtures</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
               <IonList>
                {team.upcomingFixtures && team.upcomingFixtures.map((fixture) => (
                  <IonItem key={fixture.id}>
                     <IonLabel>{fixture.date} {fixture.time}: vs {fixture.opponent}</IonLabel>
                  </IonItem>
                ))}
                 {!team.upcomingFixtures || team.upcomingFixtures.length === 0 && <IonText><p>No upcoming fixtures available.</p></IonText>}
              </IonList>
            </IonCardContent>
          </IonCard>

          {/* Team Statistics Section */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Statistics</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              {team.stats ? (
              <IonGrid>
                <IonRow>
                  <IonCol>Games Played:</IonCol>
                  <IonCol>{team.stats.gamesPlayed}</IonCol>
                </IonRow>
                 <IonRow>
                  <IonCol>Wins:</IonCol>
                  <IonCol>{team.stats.wins}</IonCol>
                </IonRow>
                 <IonRow>
                  <IonCol>Losses:</IonCol>
                  <IonCol>{team.stats.losses}</IonCol>
                </IonRow>
                 <IonRow>
                  <IonCol>Draws:</IonCol>
                  <IonCol>{team.stats.draws}</IonCol>
                </IonRow>
                 <IonRow>
                  <IonCol>Goals For:</IonCol>
                  <IonCol>{team.stats.goalsFor}</IonCol>
                </IonRow>
                 <IonRow>
                  <IonCol>Goals Against:</IonCol>
                  <IonCol>{team.stats.goalsAgainst}</IonCol>
                </IonRow>
                 <IonRow>
                  <IonCol>Goal Difference:</IonCol>
                  <IonCol>{team.stats.goalDifference}</IonCol>
                </IonRow>
                 <IonRow>
                  <IonCol>Points:</IonCol>
                  <IonCol>{team.stats.points}</IonCol>
                </IonRow>
              </IonGrid>
               ) : (
                 <IonText><p>No statistics available.</p></IonText>
               )}
            </IonCardContent>
          </IonCard>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default TeamDetails; 