import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonTextarea,
  IonButton,
  IonItem,
  IonLabel,
  IonToast,
  IonBackButton,
  IonButtons
} from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addNews } from '../firebase/newsService';
// import './AddNews.css';

const AddNews: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const history = useHistory();

  const handleSubmit = async () => {
    try {
      if (!title || !content) {
        setToastMessage('Please fill in all required fields');
        setShowToast(true);
        return;
      }

      await addNews({
        title,
        content,
        imageUrl: imageUrl || undefined,
        author: 'Admin'
      });

      setToastMessage('News added successfully!');
      setShowToast(true);
      
      // Reset form
      setTitle('');
      setContent('');
      setImageUrl('');
      
      // Navigate back after a short delay
      setTimeout(() => {
        history.push('/news');
      }, 1500);
    } catch (error) {
      console.error('Error adding news:', error);
      setToastMessage('Error adding news. Please try again.');
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/news" />
          </IonButtons>
          <IonTitle>Add News</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Title *</IonLabel>
          <IonInput
            value={title}
            onIonChange={e => setTitle(e.detail.value!)}
            placeholder="Enter news title"
            required
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Content *</IonLabel>
          <IonTextarea
            value={content}
            onIonChange={e => setContent(e.detail.value!)}
            placeholder="Enter news content"
            rows={6}
            required
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Image URL</IonLabel>
          <IonInput
            value={imageUrl}
            onIonChange={e => setImageUrl(e.detail.value!)}
            placeholder="Enter image URL (optional)"
          />
        </IonItem>

        <IonButton expand="block" onClick={handleSubmit} className="ion-margin-top">
          Add News
        </IonButton>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          position="bottom"
        />
      </IonContent>
    </IonPage>
  );
};

export default AddNews; 