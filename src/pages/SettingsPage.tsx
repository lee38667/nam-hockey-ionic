import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonToggle } from '@ionic/react';

const SettingsPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check initial dark mode setting
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(prefersDark.matches);

    // Listen for changes in system color scheme preference
    prefersDark.addEventListener('change', (mediaQuery) => {
      setIsDarkMode(mediaQuery.matches);
    });

    // Clean up event listener
    return () => {
      prefersDark.removeEventListener('change', (mediaQuery) => {
        setIsDarkMode(mediaQuery.matches);
      });
    };
  }, []);

  // Toggle the dark mode class on the body
  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const handleDarkModeToggle = (event: CustomEvent) => {
    setIsDarkMode(event.detail.checked);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel>Dark Mode</IonLabel>
            <IonToggle checked={isDarkMode} onIonChange={handleDarkModeToggle}></IonToggle>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage; 