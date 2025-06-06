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
  RefresherCustomEvent,
  IonSpinner,
  IonFab,
  IonFabButton
} from '@ionic/react';
import { trophyOutline, peopleOutline, statsChartOutline, add } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { Team, subscribeToTeams } from '../firebase/teamService';
import { getPlayerStats } from '../firebase/playerService';
import './Teams.css';
import { useHistory } from 'react-router-dom';
import AddTeamModal from '../components/AddTeamModal';

const Teams: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [teamStats, setTeamStats] = useState<{[key: string]: any}>({});
  const [statusCounts, setStatusCounts] = useState({
    champion: 0,
    promoted: 0,
    active: 0
  });
  const history = useHistory();
  const [showAddTeam, setShowAddTeam] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToTeams(async (teamsData) => {
      setTeams(teamsData);
      // Get stats for each team
      const stats: {[key: string]: any} = {};
      const counts = {
        champion: 0,
        promoted: 0,
        active: 0
      };

      for (const team of teamsData) {
        if (team.id) {
          stats[team.id] = await getPlayerStats(team.id);
          // Count teams by status
          const status = team.status || 'active';
          counts[status as keyof typeof counts]++;
        }
      }
      setTeamStats(stats);
      setStatusCounts(counts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleRefresh = (event: RefresherCustomEvent) => {
    event.detail.complete();
  };

  const handleTeamClick = (teamId: string) => {
    history.push(`/team/${teamId}`);
  };

  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchText.toLowerCase()) ||
    team.division.toLowerCase().includes(searchText.toLowerCase())
  );

  const featuredTeam = teams.find(team => team.status === 'champion');

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

        <IonSearchbar
          value={searchText}
          onIonChange={e => setSearchText(e.detail.value!)}
          placeholder="Search teams"
          className="team-search"
        />

        {loading ? (
          <div className="loading-container">
            <IonSpinner name="crescent" />
          </div>
        ) : (
          <>
            {/* Team Status Stats */}
            <IonCard className="status-stats-card darkText">
              <IonCardContent>
                <IonGrid>
                  <IonRow>
                    <IonCol size="4">
                      <div className="stat-item">
                        <IonChip color="success" className="status-chip">
                          <span>{statusCounts.champion}</span>
                        </IonChip>
                        <small>Champions</small>
                      </div>
                    </IonCol>
                    <IonCol size="4">
                      <div className="stat-item">
                        <IonChip color="warning" className="status-chip">
                          <span>{statusCounts.promoted}</span>
                        </IonChip>
                        <small>Promoted</small>
                      </div>
                    </IonCol>
                    <IonCol size="4">
                      <div className="stat-item">
                        <IonChip color="primary" className="status-chip">
                          <span>{statusCounts.active}</span>
                        </IonChip>
                        <small>Active</small>
                      </div>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>

            {/* Featured Team */}
            {featuredTeam && (
              <IonCard className="featured-team">
                <div className="team-banner">
                  <img 
                    src={featuredTeam.bannerUrl || "https://niiha.com/wp-content/uploads/2023/08/363755499_867501525377062_5106207238678423081_n-1.jpg"} 
                    alt={`${featuredTeam.name} Banner`} 
                  />
                  <div className="team-overlay">
                    <h2>{featuredTeam.name}</h2>
                    <p>{featuredTeam.description || `${featuredTeam.division} Champions`}</p>
                  </div>
                </div>
               
              </IonCard>
            )}

            {/* Teams List */}
            <IonList>
              {filteredTeams.map(team => (
                <IonItem 
                  key={team.id} 
                  className="team-item"
                  onClick={() => team.id && handleTeamClick(team.id)}
                  button
                >
                  <IonAvatar slot="start">
                    <img 
                      src={team.imageUrl || "https://niiha.com/wp-content/uploads/2023/08/363755499_867501525377062_5106207238678423081_n-1.jpg"} 
                      alt={team.name} 
                    />
                  </IonAvatar>
                  <IonLabel>
                    <h2>{team.name}</h2>
                    <p>{team.division} • {teamStats[team.id!]?.totalPlayers || 0} Players</p>
                  </IonLabel>
                  <IonChip 
                    color={
                      team.status === 'champion' ? 'success' : 
                      team.status === 'promoted' ? 'warning' : 
                      'primary'
                    } 
                    className='colorWhite' 
                    slot="end"
                  >
                    {(team.status || 'active').charAt(0).toUpperCase() + (team.status || 'active').slice(1)}
                  </IonChip>
                </IonItem>
              ))}
            </IonList>
          </>
        )}

        {/* Add Team FAB */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setShowAddTeam(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        {/* Add Team Modal */}
        <AddTeamModal 
          isOpen={showAddTeam} 
          onClose={() => setShowAddTeam(false)} 
        />
      </IonContent>
    </IonPage>
  );
};

export default Teams;