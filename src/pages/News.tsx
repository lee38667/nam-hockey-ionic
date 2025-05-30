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

        {/* Featured News */}
        {news.length > 0 && (
          <IonCard className="featured-news " color="primary-tint" >
            <img src={news[0].imageUrl || "https://niiha.com/wp-content/uploads/2023/08/363755499_867501525377062_5106207238678423081_n-1.jpg"} alt="Featured News" />
            <IonCardHeader>
              <IonChip color="primary">Latest</IonChip>
              <IonCardTitle>{news[0].title}</IonCardTitle>
              <IonCardSubtitle>
                <IonIcon icon={timeOutline} />
                <span>{news[0].createdAt?.toDate().toLocaleDateString()}</span>
              </IonCardSubtitle>
            </IonCardHeader>
          
          </IonCard>
        )}

        {/* News List */}
        <IonList>
          {news.slice(1).map((item) => (
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
                  <p>{item.createdAt?.toDate().toLocaleDateString()}</p>
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