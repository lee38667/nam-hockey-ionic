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
  IonCardSubtitle,
  IonList,
  IonItem,
  IonLabel,
  IonSearchbar,
  IonRefresher,
  IonRefresherContent,
  IonChip,
  IonIcon,
  RefresherCustomEvent
} from '@ionic/react';
import { timeOutline, shareOutline, bookmarkOutline } from 'ionicons/icons';
import './News.css';

const News: React.FC = () => {
  const handleRefresh = (event: RefresherCustomEvent) => {
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>News</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {/* Search Section */}
        <div className="news-header">
          <IonSearchbar
            placeholder="Search news..."
            className="news-search"
          />
        </div>

        {/* Featured News */}
        <IonCard className="featured-news" color="primary-tint" >
          <img src="/src/pages/images/hockey-players.jpg" alt="Featured News" />
          <IonCardHeader>
            <IonChip color="primary">Featured</IonChip>
            <IonCardTitle>National Team Qualifies for Championship</IonCardTitle>
            <IonCardSubtitle>
              <IonIcon icon={timeOutline} />
              <span>2 hours ago</span>
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              The Namibian national hockey team has secured their place in the upcoming
              international championship after an impressive performance in the qualifiers.
            </p>
            <div className="news-actions">
              <IonChip color="medium" outline>
                <IonIcon icon={shareOutline} />
                <span>Share</span>
              </IonChip>
              <IonChip color="medium" outline>
                <IonIcon icon={bookmarkOutline} />
                <span>Save</span>
              </IonChip>
            </div>
          </IonCardContent>
        </IonCard>

        {/* News List */}
        <IonList>
          <IonItem className="news-item">
            <IonLabel>
              <h2>League Season Kicks Off with Exciting Matches</h2>
              <p>
                The new season of the Namibian Hockey League has begun with some
                thrilling opening matches...
              </p>
              <div className="news-meta">
                <IonIcon icon={timeOutline} />
                <span>5 hours ago</span>
                <IonChip color="primary" className="small-chip">League</IonChip>
              </div>
            </IonLabel>
          </IonItem>

          <IonItem className="news-item">
            <IonLabel>
              <h2>Youth Development Program Launched</h2>
              <p>
                A new initiative to develop young hockey talent across Namibia has
                been announced...
              </p>
              <div className="news-meta">
                <IonIcon icon={timeOutline} />
                <span>1 day ago</span>
                <IonChip color="success" className="small-chip">Development</IonChip>
              </div>
            </IonLabel>
          </IonItem>

          <IonItem className="news-item">
            <IonLabel>
              <h2>New Training Facilities Open in Windhoek</h2>
              <p>
                State-of-the-art hockey training facilities have been inaugurated
                in the capital city...
              </p>
              <div className="news-meta">
                <IonIcon icon={timeOutline} />
                <span>2 days ago</span>
                <IonChip color="warning" className="small-chip">Facilities</IonChip>
              </div>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default News; 