import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  IonContent,
  IonHeader,
  IonToolbar
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {
  homeOutline,
  calendarOutline,
  peopleOutline,
  newspaperOutline,
  menuOutline
} from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import RotatingLogo from './components/RotatingLogo';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
/* import '@ionic/react/css/palettes/dark.system.css'; */

/* Theme variables */
import './theme/variables.css';
import './theme/global.css';

/* Pages */
import Home from './pages/Home';
import Matches from './pages/Matches';
import Teams from './pages/Teams';
import News from './pages/News';
import More from './pages/More';
import LoginPage from './pages/LoginPage';
import RegisterTeam from './pages/RegisterTeam';
import RegisterPlayer from './pages/RegisterPlayer';
import AddNews from './pages/AddNews';
import TeamDetails from './pages/TeamDetails';
import Register from './pages/Register';
import Profile from './pages/Profile';

setupIonicReact({
  mode: 'ios'
});

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-theme');
    }

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <IonApp>
        <IonContent className="ion-padding">
          <div className="ion-text-center">
            <h2>Loading...</h2>
          </div>
        </IonContent>
      </IonApp>
    );
  }

  return (
    <IonApp>
     
      <IonReactRouter>
        {isAuthenticated ? (
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/teams">
                <Teams />
              </Route>
              <Route exact path="/team/:id">
                <TeamDetails />
              </Route>
              <Route exact path="/matches">
                <Matches />
              </Route>
              <Route exact path="/news">
                <News />
              </Route>
              <Route exact path="/more">
                <More />
              </Route>
              <Route exact path="/register-team">
                <RegisterTeam />
              </Route>
              <Route exact path="/register-player">
                <RegisterPlayer />
              </Route>
              <Route exact path="/add-news">
                <AddNews />
              </Route>
              <Route exact path="/profile">
                <Profile />
              </Route>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              <Route>
                <Redirect to="/home" />
              </Route>
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={homeOutline} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>

              <IonTabButton tab="teams" href="/teams">
                <IonIcon icon={peopleOutline} />
                <IonLabel>Teams</IonLabel>
              </IonTabButton>

              <IonTabButton tab="matches" href="/matches">
                <IonIcon icon={calendarOutline} />
                <IonLabel>Matches</IonLabel>
              </IonTabButton>

              <IonTabButton tab="news" href="/news">
                <IonIcon icon={newspaperOutline} />
                <IonLabel>News</IonLabel>
              </IonTabButton>

              <IonTabButton tab="more" href="/more">
                <IonIcon icon={menuOutline} />
                <IonLabel>More</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        ) : (
          <IonRouterOutlet>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route>
              <Redirect to="/login" />
            </Route>
          </IonRouterOutlet>
        )}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
