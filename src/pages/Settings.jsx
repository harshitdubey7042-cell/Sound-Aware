import { Link } from 'react-router-dom';
import { Bluetooth, BellRing, Vibrate, Map, SunMoon, Mic, Languages, FileAudio } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Settings() {
  const { language, setLanguage } = useAppContext();

  const menuItems = [
    { icon: Bluetooth, label: 'Bluetooth Connection', path: '/bluetooth' },
    { icon: Mic, label: 'Name & Phrase Detection', path: '/voice-triggers' },
    { icon: BellRing, label: 'Phone Notifications', path: '/notifications' },
    { icon: Vibrate, label: 'Vibration Settings', path: '/vibration' },
    { icon: Map, label: 'Direction Settings', path: '/direction' },
    { icon: SunMoon, label: 'Theme Settings', path: '/theme' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-100">Settings</h1>
      
      {/* Language Selector */}
      <div className="mb-6 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/10 text-primary dark:bg-secondary/20 dark:text-secondary rounded-full">
            <Languages size={20} />
          </div>
          <span className="font-medium text-slate-700 dark:text-slate-300">Transcript Translation</span>
        </div>
        
        <select 
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2 font-bold outline-none"
        >
          <option value="Original">Original</option>
          <option value="Hinglish">Hinglish</option>
          <option value="Hindi">Hindi</option>
          <option value="English">English</option>
        </select>
      </div>

      {/* Main Settings Menu */}
      <div className="flex flex-col gap-3">
        {menuItems.map((item, index) => (
          <Link 
            key={index} 
            to={item.path}
            className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <div className="p-2 bg-primary/10 text-primary dark:bg-secondary/20 dark:text-secondary rounded-full">
              <item.icon size={20} />
            </div>
            <span className="font-medium text-slate-700 dark:text-slate-300 flex-1">{item.label}</span>
            <div className="text-slate-400">→</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
