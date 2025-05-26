import { IonImg } from '@ionic/react';
import { useEffect, useState } from 'react';
import './RotatingLogo.css';

const RotatingLogo: React.FC = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 360) % 360);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rotating-logo">
      <IonImg 
        src="/src/pages/images/logo.png" 
        alt="Namibia Hockey Logo"
        style={{ transform: `rotate(${rotation}deg)` }}
      />
    </div>
  );
};

export default RotatingLogo; 