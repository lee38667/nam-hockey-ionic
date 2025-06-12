import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useUserRole } from '../hooks/useUserRole';
import { UserRole } from '../firebase/userRoles';
import { IonSpinner, IonPage, IonContent } from '@ionic/react';

interface ProtectedRouteProps extends RouteProps {
  requiredRole?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  requiredRole,
  ...rest 
}) => {
  const { role, loading } = useUserRole();

  if (loading) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100%' 
          }}>
            <IonSpinner />
          </div>
        </IonContent>
      </IonPage>
    );
  }

  // After loading, check if user is authenticated by role (fan is default for unauthenticated)
  if (role === 'fan' && requiredRole && !requiredRole.includes('fan')) {
    return <Redirect to="/login" />;
  }

  if (requiredRole && !requiredRole.includes(role)) {
    return <Redirect to="/home" />;
  }

  return <Route {...rest} />;
};

export default ProtectedRoute;
