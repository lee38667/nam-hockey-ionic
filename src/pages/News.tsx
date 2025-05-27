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
  RefresherCustomEvent,
  IonFab,
  IonFabButton,
  IonText,
  IonAvatar
} from '@ionic/react';
import { timeOutline, shareOutline, bookmarkOutline, add } from 'ionicons/icons';
import './News.css';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { NewsItem, subscribeToNews } from '../firebase/newsService';


const News: React.FC = () => {
  const history = useHistory();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToNews((updatedNews) => {
      setNews(updatedNews);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleRefresh = (event: RefresherCustomEvent) => {
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>News & Events</IonTitle>
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
          {news.map((item) => (
            <IonItem key={item.id}>
              <IonLabel>
                <h2>{item.title}</h2>
                <p>{item.content}</p>
                <IonChip color="primary">
                  <IonAvatar>
                    <img src={item.authorPhotoURL || 'default-avatar.png'} alt="author" />
                  </IonAvatar>
                  <IonLabel>{item.authorName}</IonLabel>
                </IonChip>
                <IonText color="medium">
                  <p>{new Date(item.timestamp).toLocaleDateString()}</p>
                </IonText>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

        {/* Add News FAB */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => history.push('/add-news')}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default News; 