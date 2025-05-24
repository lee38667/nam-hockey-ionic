import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList } from '@ionic/react';

const Teams: React.FC = () => {
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
            <IonItem routerLink="/app/teams/team-details/1"> {/* Example routerLink, replace with actual team ID */}
              <IonLabel>Team Alpha</IonLabel>
            </IonItem>
            <IonItem routerLink="/app/teams/team-details/2"> {/* Example routerLink */}
              <IonLabel>Team Beta</IonLabel>
            </IonItem>
            <IonItem routerLink="/app/teams/team-details/3"> {/* Example routerLink */}
              <IonLabel>Team Gamma</IonLabel>
            </IonItem>
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Teams;