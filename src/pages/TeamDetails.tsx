import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonText, IonGrid, IonRow, IonCol, IonAvatar, IonChip, IonIcon, IonSpinner, IonFab, IonFabButton, IonFabList, IonModal, IonButton, IonInput, IonSelect, IonSelectOption, IonTextarea, IonRefresher, IonRefresherContent, RefresherCustomEvent } from '@ionic/react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Team } from '../firebase/teamService';
import { Player, subscribeToTeamPlayers, addPlayer, getPlayerStats } from '../firebase/playerService';
// import './TeamDetails.css';
import { 
  personAdd, 
  statsChart, 
  add 
} from 'ionicons/icons';

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

const TeamDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [teamStats, setTeamStats] = useState<any>(null);
  const [newPlayer, setNewPlayer] = useState<Partial<Player>>({
    name: '',
    number: 0,
    position: 'Forward',
    age: 0,
    height: '',
    weight: 0,
    status: 'active'
  });

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

  useEffect(() => {
    if (!id) return;

    const unsubscribe = subscribeToTeamPlayers(id, (playersData) => {
      setPlayers(playersData);
      setLoading(false);
    });

    // Load team stats
    getPlayerStats(id).then(setTeamStats);

    return () => unsubscribe();
  }, [id]);

  const handleAddPlayer = async () => {
    if (!id) return;
    try {
      await addPlayer(id, newPlayer as Omit<Player, 'id' | 'teamId'>);
      setShowAddPlayer(false);
      setNewPlayer({
        name: '',
        number: 0,
        position: 'Forward',
        age: 0,
        height: '',
        weight: 0,
        status: 'active'
      });
    } catch (error) {
      console.error('Error adding player:', error);
    }
  };

  const handleRefresh = (event: RefresherCustomEvent) => {
    // Re-fetch team data
    const unsubscribe = subscribeToTeamPlayers(id, (updatedPlayers) => {
      setPlayers(updatedPlayers);
      // Update team stats
      getPlayerStats(id).then(updatedStats => {
        setTeamStats(updatedStats);
        event.detail.complete();
      });
    });

    return () => unsubscribe();
  };

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
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <div className="ion-padding">
          {/* Team Roster Section */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Roster</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                {players.map(player => (
                  <IonItem key={player.id} className="player-item">
                    <IonAvatar slot="start">
                      <img 
                        src={player.imageUrl || "/src/pages/images/CloseUpHockey.jpg"} 
                        alt={player.name} 
                      />
                    </IonAvatar>
                    <IonLabel>
                      <h2>#{player.number} {player.name}</h2>
                      <p>{player.position} • {player.age} years • {player.height}</p>
                      {player.stats && (
                        <p>G: {player.stats.goals || 0} A: {player.stats.assists || 0} P: {player.stats.points || 0}</p>
                      )}
                    </IonLabel>
                    <IonChip 
                      color={
                        player.status === 'active' ? 'success' : 
                        player.status === 'injured' ? 'danger' : 
                        'warning'
                      } 
                      className='colorWhite' 
                      slot="end"
                    >
                      {player.status.charAt(0).toUpperCase() + player.status.slice(1)}
                    </IonChip>
                  </IonItem>
                ))}
                {!players || players.length === 0 && <IonText><p>No roster information available.</p></IonText>}
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
              {teamStats ? (
              <IonGrid>
                <IonRow>
                  <IonCol size="6">
                    <div className="stat-item">
                      <IonIcon icon={personAdd} />
                      <span>{teamStats.totalPlayers}</span>
                      <small>Total Players</small>
                    </div>
                  </IonCol>
                  <IonCol size="6">
                    <div className="stat-item">
                      <IonIcon icon={statsChart} />
                      <span>{teamStats.totalPoints}</span>
                      <small>Total Points</small>
                    </div>
                  </IonCol>
                </IonRow>
              </IonGrid>
               ) : (
                 <IonText><p>No statistics available.</p></IonText>
               )}
            </IonCardContent>
          </IonCard>

        </div>

        {/* Add Player FAB */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setShowAddPlayer(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        {/* Add Player Modal */}
        <IonModal isOpen={showAddPlayer} onDidDismiss={() => setShowAddPlayer(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Add New Player</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonInput
              label="Name"
              labelPlacement="floating"
              value={newPlayer.name}
              onIonChange={e => setNewPlayer({...newPlayer, name: e.detail.value!})}
            />
            <IonInput
              label="Number"
              labelPlacement="floating"
              type="number"
              value={newPlayer.number}
              onIonChange={e => setNewPlayer({...newPlayer, number: parseInt(e.detail.value!)})}
            />
            <IonSelect
              label="Position"
              labelPlacement="floating"
              value={newPlayer.position}
              onIonChange={e => setNewPlayer({...newPlayer, position: e.detail.value})}
            >
              <IonSelectOption value="Forward">Forward</IonSelectOption>
              <IonSelectOption value="Defense">Defense</IonSelectOption>
              <IonSelectOption value="Goalie">Goalie</IonSelectOption>
            </IonSelect>
            <IonInput
              label="Age"
              labelPlacement="floating"
              type="number"
              value={newPlayer.age}
              onIonChange={e => setNewPlayer({...newPlayer, age: parseInt(e.detail.value!)})}
            />
            <IonInput
              label="Height"
              labelPlacement="floating"
              value={newPlayer.height}
              onIonChange={e => setNewPlayer({...newPlayer, height: e.detail.value!})}
            />
            <IonInput
              label="Weight"
              labelPlacement="floating"
              type="number"
              value={newPlayer.weight}
              onIonChange={e => setNewPlayer({...newPlayer, weight: parseInt(e.detail.value!)})}
            />
            <IonButton expand="block" onClick={handleAddPlayer} className="ion-margin-top">
              Add Player
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default TeamDetails; 