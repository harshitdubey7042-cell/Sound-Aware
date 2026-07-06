import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';

// Layout
import Layout from './components/Layout';

// Pages
import Login from './pages/Login';
import Home from './pages/Home';
import Settings from './pages/Settings';
import VoiceTrigger from './pages/VoiceTrigger';
import SoundAlerts from './pages/SoundAlerts';
import AlertSettings from './pages/AlertSettings';
import AddCustomSound from './pages/AddCustomSound';
import Notifications from './pages/Notifications';
import Vibration from './pages/Vibration';
import Direction from './pages/Direction';
import History from './pages/History';
import Bluetooth from './pages/Bluetooth';
import ThemeSettings from './pages/ThemeSettings';

function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/alerts" element={<SoundAlerts />} />
            <Route path="/alerts/new" element={<AddCustomSound />} />
            <Route path="/alerts/:id" element={<AlertSettings />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<Settings />} />
            
            <Route path="/voice-triggers" element={<VoiceTrigger />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/vibration" element={<Vibration />} />
            <Route path="/direction" element={<Direction />} />
            <Route path="/bluetooth" element={<Bluetooth />} />
            <Route path="/theme" element={<ThemeSettings theme={theme} setTheme={setTheme} />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
