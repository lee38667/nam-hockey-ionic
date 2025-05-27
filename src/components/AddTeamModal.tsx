import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonLabel,
  IonList,
  IonIcon,
  IonFab,
  IonFabButton,
  IonModal,
  IonGrid,
  IonRow,
  IonCol,
  IonTextarea
} from '@ionic/react';
import { add, close, personAdd, create, trash } from 'ionicons/icons';
import { useState } from 'react';
import { addTeam } from '../firebase/teamService';
import { addPlayer } from '../firebase/playerService';

interface AddTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTeamModal: React.FC<AddTeamModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [division, setDivision] = useState('');
  const [status, setStatus] = useState<'active' | 'champion' | 'promoted'>('active');
  const [imageUrl, setImageUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [description, setDescription] = useState('');
  const [players, setPlayers] = useState<Array<{
    name: string;
    number: number;
    position: 'Forward' | 'Defense' | 'Goalie';
    age: number;
    height: string;
    weight: number;
    dateOfBirth: string;
    stats: {
      goals: number;
      assists: number;
      points: number;
      gamesPlayed: number;
      penaltyMinutes: number;
    };
  }>>([]);
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [editingPlayerIndex, setEditingPlayerIndex] = useState<number | null>(null);
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    number: 0,
    position: 'Forward' as 'Forward' | 'Defense' | 'Goalie',
    age: 0,
    height: '',
    weight: 0,
    dateOfBirth: '',
    stats: {
      goals: 0,
      assists: 0,
      points: 0,
      gamesPlayed: 0,
      penaltyMinutes: 0
    }
  });

  const handleSubmit = async () => {
    try {
      // Add team first
      const teamId = await addTeam({
        name,
        division,
        status,
        playerCount: players.length,
        imageUrl: imageUrl || undefined,
        bannerUrl: bannerUrl || undefined,
        description: description || undefined
      });

      // Add all players
      for (const player of players) {
        await addPlayer(teamId, {
          ...player,
          status: 'active'
        });
      }

      onClose();
      // Reset form
      setName('');
      setDivision('');
      setStatus('active');
      setImageUrl('');
      setBannerUrl('');
      setDescription('');
      setPlayers([]);
    } catch (error) {
      console.error('Error adding team:', error);
    }
  };

  const handleAddPlayer = () => {
    if (editingPlayerIndex !== null) {
      // Update existing player
      const updatedPlayers = [...players];
      updatedPlayers[editingPlayerIndex] = newPlayer;
      setPlayers(updatedPlayers);
      setEditingPlayerIndex(null);
    } else {
      // Add new player
      setPlayers([...players, newPlayer]);
    }
    setNewPlayer({
      name: '',
      number: 0,
      position: 'Forward',
      age: 0,
      height: '',
      weight: 0,
      dateOfBirth: '',
      stats: {
        goals: 0,
        assists: 0,
        points: 0,
        gamesPlayed: 0,
        penaltyMinutes: 0
      }
    });
    setShowAddPlayer(false);
  };

  const handleEditPlayer = (index: number) => {
    setNewPlayer(players[index]);
    setEditingPlayerIndex(index);
    setShowAddPlayer(true);
  };

  const handleDeletePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add New Team</IonTitle>
          <IonButton slot="end" fill="clear" onClick={onClose}>
            <IonIcon icon={close} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonInput
          label="Team Name"
          labelPlacement="floating"
          value={name}
          onIonChange={e => setName(e.detail.value!)}
        />
        <IonInput
          label="Division"
          labelPlacement="floating"
          value={division}
          onIonChange={e => setDivision(e.detail.value!)}
        />
        <IonSelect
          label="Status"
          labelPlacement="floating"
          value={status}
          onIonChange={e => setStatus(e.detail.value)}
        >
          <IonSelectOption value="active">Active</IonSelectOption>
          <IonSelectOption value="champion">Champion</IonSelectOption>
          <IonSelectOption value="promoted">Promoted</IonSelectOption>
        </IonSelect>
        <IonInput
          label="Team Image URL"
          labelPlacement="floating"
          value={imageUrl}
          onIonChange={e => setImageUrl(e.detail.value!)}
        />
        <IonInput
          label="Banner Image URL"
          labelPlacement="floating"
          value={bannerUrl}
          onIonChange={e => setBannerUrl(e.detail.value!)}
        />
        <IonTextarea
          label="Description"
          labelPlacement="floating"
          value={description}
          onIonChange={e => setDescription(e.detail.value!)}
        />

        {/* Players List */}
        <IonList>
          <IonItem>
            <IonLabel>Players ({players.length})</IonLabel>
          </IonItem>
          {players.map((player, index) => (
            <IonItem key={index}>
              <IonLabel>
                <h2>#{player.number} {player.name}</h2>
                <p>{player.position} • {player.age} years • {player.height}</p>
                <p>DOB: {player.dateOfBirth}</p>
                <p>Stats: G: {player.stats.goals} A: {player.stats.assists} P: {player.stats.points}</p>
              </IonLabel>
              <IonButton fill="clear" onClick={() => handleEditPlayer(index)}>
                <IonIcon icon={create} />
              </IonButton>
              <IonButton fill="clear" color="danger" onClick={() => handleDeletePlayer(index)}>
                <IonIcon icon={trash} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>

        {/* Add Player FAB */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setShowAddPlayer(true)}>
            <IonIcon icon={personAdd} />
          </IonFabButton>
        </IonFab>

        {/* Add/Edit Player Modal */}
        <IonModal isOpen={showAddPlayer} onDidDismiss={() => setShowAddPlayer(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>{editingPlayerIndex !== null ? 'Edit Player' : 'Add Player'}</IonTitle>
              <IonButton slot="end" fill="clear" onClick={() => setShowAddPlayer(false)}>
                <IonIcon icon={close} />
              </IonButton>
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
              label="Date of Birth"
              labelPlacement="floating"
              type="date"
              value={newPlayer.dateOfBirth}
              onIonChange={e => setNewPlayer({...newPlayer, dateOfBirth: e.detail.value!})}
            />
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

            {/* Player Stats */}
            <IonItem>
              <IonLabel>Player Statistics</IonLabel>
            </IonItem>
            <IonInput
              label="Goals"
              labelPlacement="floating"
              type="number"
              value={newPlayer.stats.goals}
              onIonChange={e => setNewPlayer({
                ...newPlayer,
                stats: { ...newPlayer.stats, goals: parseInt(e.detail.value!) }
              })}
            />
            <IonInput
              label="Assists"
              labelPlacement="floating"
              type="number"
              value={newPlayer.stats.assists}
              onIonChange={e => setNewPlayer({
                ...newPlayer,
                stats: { ...newPlayer.stats, assists: parseInt(e.detail.value!) }
              })}
            />
            <IonInput
              label="Games Played"
              labelPlacement="floating"
              type="number"
              value={newPlayer.stats.gamesPlayed}
              onIonChange={e => setNewPlayer({
                ...newPlayer,
                stats: { ...newPlayer.stats, gamesPlayed: parseInt(e.detail.value!) }
              })}
            />
            <IonInput
              label="Penalty Minutes"
              labelPlacement="floating"
              type="number"
              value={newPlayer.stats.penaltyMinutes}
              onIonChange={e => setNewPlayer({
                ...newPlayer,
                stats: { ...newPlayer.stats, penaltyMinutes: parseInt(e.detail.value!) }
              })}
            />

            <IonButton expand="block" onClick={handleAddPlayer} className="ion-margin-top">
              {editingPlayerIndex !== null ? 'Update Player' : 'Add Player'}
            </IonButton>
          </IonContent>
        </IonModal>

        <IonButton expand="block" onClick={handleSubmit} className="ion-margin-top">
          Add Team
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default AddTeamModal; 