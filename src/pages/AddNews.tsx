import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  useIonToast
} from '@ionic/react';
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
// import './AddNews.css';

const AddNews: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('');
  const [present] = useIonToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'news'), {
        title,
        content,
        type,
        createdAt: new Date()
      });
      present({
        message: 'News/Event added successfully!',
        duration: 2000,
        color: 'success'
      });
      setTitle('');
      setContent('');
      setType('');
    } catch (error) {
      present({
        message: 'Error adding news/event',
        duration: 2000,
        color: 'danger'
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add News/Event</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardContent>
            <form onSubmit={handleSubmit}>
              <IonItem>
                <IonLabel position="stacked">Title</IonLabel>
                <IonInput value={title} onIonChange={e => setTitle(e.detail.value!)} required />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Type</IonLabel>
                <IonSelect value={type} onIonChange={e => setType(e.detail.value)} required>
                  <IonSelectOption value="news">News</IonSelectOption>
                  <IonSelectOption value="event">Event</IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Content</IonLabel>
                <IonTextarea
                  value={content}
                  onIonChange={e => setContent(e.detail.value!)}
                  rows={6}
                  required
                />
              </IonItem>
              <IonButton expand="block" type="submit" className="ion-margin-top">
                Add News/Event
              </IonButton>
            </form>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default AddNews; 