import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonDatetime,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonBackButton,
  IonButtons,
  useIonToast,
  IonCard,
  IonCardContent
} from '@ionic/react';
import React, { useState } from 'react';
import { addMatch } from '../firebase/matchService';
import { Timestamp } from 'firebase/firestore';
import { useHistory } from 'react-router-dom';

const AddMatchPage: React.FC = () => {
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
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const history = useHistory();
  const [present] = useIonToast();

  const handleAddMatch = async () => {
    setError('');
    setSuccess('');
    if (!league || !homeTeam || !awayTeam || !date || !location) {
      setError('Please fill in all required fields.');
      return;
    }
    try {
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
      setSuccess('Match added successfully!');
      present({
        message: 'Match added successfully!',
        duration: 1500,
        color: 'success',
        position: 'top',
        onDidDismiss: () => history.push('/home')
      });
      setTimeout(() => history.push('/home'), 1600);
    } catch (e) {
      setError('Error adding match.');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/matches" />
          </IonButtons>
          <IonTitle>Add Match</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardContent>
            <form onSubmit={e => { e.preventDefault(); handleAddMatch(); }}>
              <IonList lines="none">
                <IonItem>
                  <IonLabel position="stacked">League</IonLabel>
                  <IonInput value={league} onIonChange={e => setLeague(e.detail.value!)} placeholder="Enter league name" />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Home Team</IonLabel>
                  <IonInput value={homeTeam} onIonChange={e => setHomeTeam(e.detail.value!)} placeholder="Enter home team name" />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Away Team</IonLabel>
                  <IonInput value={awayTeam} onIonChange={e => setAwayTeam(e.detail.value!)} placeholder="Enter away team name" />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Date & Time</IonLabel>
                  <IonDatetime value={date} onIonChange={e => setDate(e.detail.value as string)} presentation="date-time" showDefaultButtons />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Location</IonLabel>
                  <IonInput value={location} onIonChange={e => setLocation(e.detail.value!)} placeholder="Enter match location" />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Status</IonLabel>
                  <IonSelect value={status} onIonChange={e => setStatus(e.detail.value)}>
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
                          <IonInput type="number" value={homeScore} onIonChange={e => setHomeScore(parseInt(e.detail.value!) || 0)} min={0} />
                        </IonItem>
                      </IonCol>
                      <IonCol>
                        <IonItem>
                          <IonLabel position="stacked">Away Score</IonLabel>
                          <IonInput type="number" value={awayScore} onIonChange={e => setAwayScore(parseInt(e.detail.value!) || 0)} min={0} />
                        </IonItem>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                )}
                <IonItem>
                  <IonLabel position="stacked">Home Team Image URL</IonLabel>
                  <IonInput value={homeTeamImage} onIonChange={e => setHomeTeamImage(e.detail.value!)} placeholder="Enter image URL (optional)" />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Away Team Image URL</IonLabel>
                  <IonInput value={awayTeamImage} onIonChange={e => setAwayTeamImage(e.detail.value!)} placeholder="Enter image URL (optional)" />
                </IonItem>
              </IonList>
              {error && <IonText color="danger"><p>{error}</p></IonText>}
              {success && <IonText color="success"><p>{success}</p></IonText>}
              <IonButton expand="block" type="submit" className="ion-margin-top">Add Match</IonButton>
            </form>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default AddMatchPage;
