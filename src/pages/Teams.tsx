import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList, IonText } from '@ionic/react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

// Assuming a similar Team interface is used for the list view, but maybe simpler
interface TeamListItem {
  id: string;
  name: string;
  // Add other fields needed for the list view if any
}

const Teams: React.FC = () => {
  const [teams, setTeams] = useState<TeamListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const teamsCollectionRef = collection(db, 'teams');
        const q = query(teamsCollectionRef);
        const querySnapshot = await getDocs(q);

        const teamsList = querySnapshot.docs.map(doc => {
          const teamData = doc.data() as TeamListItem; // Cast data to the interface
          return {
            id: doc.id, // Use the document ID as the primary identifier
            name: teamData.name, // Explicitly take the name from the document data
            // Include any other fields needed for TeamListItem here
          };
        });

        setTeams(teamsList);
      } catch (err) {
        console.error("Error fetching teams:", err);
        setError("Failed to load teams.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Teams</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonText>Loading teams...</IonText>
        </IonContent>
      </IonPage>
    );
  }

  if (error) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Teams</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonText color="danger">{error}</IonText>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Teams</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="ion-padding">
          <h2>Teams</h2>
          <IonList>
            {teams.length > 0 ? (
              teams.map(team => (
                <IonItem key={team.id} routerLink={`/app/teams/team-details/${team.id}`}> {/* Use actual team ID in routerLink */}
                  <IonLabel>{team.name}</IonLabel>
                </IonItem>
              ))
            ) : (
              <IonText><p>No teams available.</p></IonText>
            )}
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Teams;