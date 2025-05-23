import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonItem, IonLabel, IonList, IonText } from '@ionic/react';
import { addEvent } from '../firebase/firestore';

const AddEventPage: React.FC = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAddEvent = async () => {
    setError('');
    setSuccess('');
    if (!eventName || !eventDate) {
      setError('Please fill in all fields.');
      return;
    }
    try {
      await addEvent({ name: eventName, date: eventDate });
      setSuccess('Event added successfully!');
      setEventName('');
      setEventDate('');
    } catch (e: any) {
      setError('Error adding event: ' + e.message);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Event</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="floating">Event Name</IonLabel>
            <IonInput value={eventName} onIonChange={e => setEventName(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Event Date</IonLabel>
            <IonInput type="date" value={eventDate} onIonChange={e => setEventDate(e.detail.value!)}></IonInput>
          </IonItem>
        </IonList>
        {error && <IonText color="danger"><p>{error}</p></IonText>}
        {success && <IonText color="success"><p>{success}</p></IonText>}
        <IonButton expand="block" onClick={handleAddEvent}>Add Event</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AddEventPage; 