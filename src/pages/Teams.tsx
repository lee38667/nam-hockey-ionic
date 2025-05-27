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
  const history = useHistory();
  const [showAddTeam, setShowAddTeam] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToTeams(async (teamsData) => {
      setTeams(teamsData);
      // Get stats for each team
      const stats: {[key: string]: any} = {};
      for (const team of teamsData) {
        if (team.id) {
          stats[team.id] = await getPlayerStats(team.id);
        }
      }
      setTeamStats(stats);
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
            {/* Featured Team */}
            {featuredTeam && (
              <IonCard className="featured-team">
                <div className="team-banner">
                  <img 
                    src={featuredTeam.bannerUrl || "/src/pages/images/CloseUpHockey.jpg"} 
                    alt={`${featuredTeam.name} Banner`} 
                  />
                  <div className="team-overlay">
                    <h2>{featuredTeam.name}</h2>
                    <p>{featuredTeam.description || `${featuredTeam.division} Champions`}</p>
                  </div>
                </div>
                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                      <IonCol size="5">
                        <div className="stat-item">
                          <IonIcon icon={trophyOutline} />
                          <span>{featuredTeam.titles || 0}</span>
                          <small>Titles</small>
                        </div>
                      </IonCol>
                      <IonCol size="7">
                        <div className="stat-item">
                          <IonIcon icon={peopleOutline} />
                          <span>{teamStats[featuredTeam.id!]?.totalPlayers || 0}</span>
                          <small>Players</small>
                        </div>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
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
                      src={team.imageUrl || "/src/pages/images/CloseUpHockey.jpg"} 
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