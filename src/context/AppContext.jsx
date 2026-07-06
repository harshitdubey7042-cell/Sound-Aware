import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [userName, setUserName] = useState('Karan');
  const [language, setLanguage] = useState('Hinglish');
  const [alerts, setAlerts] = useState([
    { id: '1', name: 'Car Horn', iconName: 'Car', enabled: true, priority: 'High', directionEnabled: true, intensity: 'Strong', frequency: 80, pulses: 3, pattern: 'Double Pulse' },
    { id: '2', name: 'Doorbell', iconName: 'BellRing', enabled: true, priority: 'Medium', directionEnabled: true, intensity: 'Medium', frequency: 50, pulses: 2, pattern: 'Single Pulse' },
    { id: '3', name: 'Fire Alarm', iconName: 'Flame', enabled: true, priority: 'High', directionEnabled: false, intensity: 'Strong', frequency: 100, pulses: 5, pattern: 'SOS Pattern' },
    { id: '5', name: 'Dog Bark', iconName: 'Dog', enabled: true, priority: 'Low', directionEnabled: true, intensity: 'Light', frequency: 40, pulses: 1, pattern: 'Single Pulse' },
    { id: '7', name: 'Siren', iconName: 'Megaphone', enabled: true, priority: 'High', directionEnabled: true, intensity: 'Strong', frequency: 90, pulses: 5, pattern: 'SOS Pattern' },
    { id: '8', name: 'Announcement', iconName: 'Mic', enabled: true, priority: 'Medium', directionEnabled: false, intensity: 'Medium', frequency: 50, pulses: 1, pattern: 'Continuous' },
  ]);

  const updateAlert = (id, newSettings) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, ...newSettings } : a));
  };

  const addAlert = (newAlert) => {
    setAlerts([...alerts, { ...newAlert, id: Date.now().toString() }]);
  };

  return (
    <AppContext.Provider value={{ alerts, updateAlert, addAlert, userName, setUserName, language, setLanguage }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
