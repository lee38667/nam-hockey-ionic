import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, people, person, calendar, radio, settings } from 'ionicons/icons';
import Home from './pages/Home';
import Teams from './pages/Teams';
import Players from './pages/Players';
import Events from './pages/Events';
import Live from './pages/Live';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AddTeamPage from './pages/AddTeamPage';
import AddEventPage from './pages/AddEventPage';
import SettingsPage from './pages/SettingsPage';

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

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        {/* Authentication Routes */}
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/signup">
          <SignupPage />
        </Route>

        {/* New Pages (Add Team, Add Event) */}
        <Route exact path="/add-team">
          <AddTeamPage />
        </Route>
        <Route exact path="/add-event">
          <AddEventPage />
        </Route>

        {/* Main Application Routes with Tabs */}
        <Route path="/app/">
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/app/home">
                <Home />
              </Route>
              <Route exact path="/app/teams">
                <Teams />
              </Route>
              <Route exact path="/app/players">
                <Players />
              </Route>
              <Route exact path="/app/events">
                <Events />
              </Route>
              <Route exact path="/app/live">
                <Live />
              </Route>
              <Route exact path="/app/settings">
                <SettingsPage />
              </Route>
              {/* Default redirect within tabs */}
              <Route exact path="/app/">
                <Redirect to="/app/home" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/app/home">
                <IonIcon aria-hidden="true" icon={home} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>
              <IonTabButton tab="teams" href="/app/teams">
                <IonIcon aria-hidden="true" icon={people} />
                <IonLabel>Teams</IonLabel>
              </IonTabButton>
              <IonTabButton tab="players" href="/app/players">
                <IonIcon aria-hidden="true" icon={person} />
                <IonLabel>Players</IonLabel>
              </IonTabButton>
              <IonTabButton tab="events" href="/app/events">
                <IonIcon aria-hidden="true" icon={calendar} />
                <IonLabel>Events</IonLabel>
              </IonTabButton>
              <IonTabButton tab="live" href="/app/live">
                <IonIcon aria-hidden="true" icon={radio} />
                <IonLabel>Live</IonLabel>
              </IonTabButton>
              <IonTabButton tab="settings" href="/app/settings">
                <IonIcon aria-hidden="true" icon={settings} />
                <IonLabel>Settings</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </Route>

        {/* Initial Redirect to Login */}
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
