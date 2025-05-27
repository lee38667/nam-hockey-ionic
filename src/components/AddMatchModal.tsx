import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonModal,
  IonItem,
  IonLabel,
  IonInput,
  IonDatetime,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonList,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import { useState } from 'react';
import { addMatch } from '../firebase/matchService';
import { Timestamp } from 'firebase/firestore';

interface AddMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddMatchModal: React.FC<AddMatchModalProps> = ({ isOpen, onClose }) => {
  const [league, setLeague] = useState('');
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState<'upcoming' | 'live' | 'past'>('upcoming');
  const [homeTeamImage, setHomeTeamImage] = useState('');
  const [awayTeamImage, setAwayTeamImage] = useState('');
  const [homeScore, setHomeScore] = useState<number>(0);
  const [awayScore, setAwayScore] = useState<number>(0);

  const handleSubmit = async () => {
    try {
      if (!date) {
        throw new Error('Date is required');
      }

      const matchData = {
        league,
        homeTeam,
        awayTeam,
        date: Timestamp.fromDate(new Date(date)),
        location,
        status,
        ...(homeTeamImage && { homeTeamImage }),
        ...(awayTeamImage && { awayTeamImage }),
        ...(status === 'live' && { homeScore, awayScore })
      };

      await addMatch(matchData);
      onClose();
      // Reset form
      setLeague('');
      setHomeTeam('');
      setAwayTeam('');
      setDate('');
      setLocation('');
      setStatus('upcoming');
      setHomeTeamImage('');
      setAwayTeamImage('');
      setHomeScore(0);
      setAwayScore(0);
    } catch (error) {
      console.error('Error adding match:', error);
    }
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add New Match</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">League</IonLabel>
            <IonInput
              value={league}
              onIonChange={e => setLeague(e.detail.value!)}
              placeholder="Enter league name"
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Home Team</IonLabel>
            <IonInput
              value={homeTeam}
              onIonChange={e => setHomeTeam(e.detail.value!)}
              placeholder="Enter home team name"
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Away Team</IonLabel>
            <IonInput
              value={awayTeam}
              onIonChange={e => setAwayTeam(e.detail.value!)}
              placeholder="Enter away team name"
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Date & Time</IonLabel>
            <IonDatetime
              value={date}
              onIonChange={e => setDate(e.detail.value as string)}
              presentation="date-time"
              showDefaultButtons
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Location</IonLabel>
            <IonInput
              value={location}
              onIonChange={e => setLocation(e.detail.value!)}
              placeholder="Enter match location"
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Status</IonLabel>
            <IonSelect
              value={status}
              onIonChange={e => setStatus(e.detail.value)}
            >
              <IonSelectOption value="upcoming">Upcoming</IonSelectOption>
              <IonSelectOption value="live">Live</IonSelectOption>
              <IonSelectOption value="past">Past</IonSelectOption>
            </IonSelect>
          </IonItem>

          {status === 'live' && (
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="stacked">Home Score</IonLabel>
                    <IonInput
                      type="number"
                      value={homeScore}
                      onIonChange={e => setHomeScore(parseInt(e.detail.value!) || 0)}
                      min={0}
                    />
                  </IonItem>
                </IonCol>
                <IonCol>
                  <IonItem>
                    <IonLabel position="stacked">Away Score</IonLabel>
                    <IonInput
                      type="number"
                      value={awayScore}
                      onIonChange={e => setAwayScore(parseInt(e.detail.value!) || 0)}
                      min={0}
                    />
                  </IonItem>
                </IonCol>
              </IonRow>
            </IonGrid>
          )}

          <IonItem>
            <IonLabel position="stacked">Home Team Image URL</IonLabel>
            <IonInput
              value={homeTeamImage}
              onIonChange={e => setHomeTeamImage(e.detail.value!)}
              placeholder="Enter image URL (optional)"
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Away Team Image URL</IonLabel>
            <IonInput
              value={awayTeamImage}
              onIonChange={e => setAwayTeamImage(e.detail.value!)}
              placeholder="Enter image URL (optional)"
            />
          </IonItem>
        </IonList>

        <div className="ion-padding">
          <IonButton expand="block" onClick={handleSubmit}>
            Add Match
          </IonButton>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default AddMatchModal; 