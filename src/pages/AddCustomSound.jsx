import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ArrowLeft, Play, Navigation, CheckCircle2 } from 'lucide-react';
import * as Icons from 'lucide-react';

export default function AddCustomSound() {
  const navigate = useNavigate();
  const { addAlert } = useAppContext();
  
  const [settings, setSettings] = useState({
    name: '',
    iconName: 'BellRing',
    enabled: true,
    priority: 'Medium',
    intensity: 'Medium',
    frequency: 50,
    pulses: 2,
    pattern: 'Single Pulse',
    directionEnabled: true
  });

  const availableIcons = ['BellRing', 'Zap', 'AlarmClock', 'AlertTriangle', 'Radio', 'Speaker', 'Volume2'];

  const handleSave = () => {
    if (!settings.name) return alert('Please enter a sound name');
    addAlert(settings);
    navigate('/alerts');
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/alerts')} className="p-2 bg-white dark:bg-slate-900 rounded-full shadow-sm text-slate-700 dark:text-slate-300">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-slate-800 dark:text-white flex-1">Add Custom Sound</h1>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-sm font-bold text-slate-500 uppercase tracking-wider block mb-3">Sound Name</label>
          <input 
            type="text" 
            placeholder="e.g. Microwave Beep"
            value={settings.name}
            onChange={(e) => setSettings({...settings, name: e.target.value})}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 font-bold text-slate-800 dark:text-white outline-none focus:border-secondary"
          />
        </div>

        <div>
          <label className="text-sm font-bold text-slate-500 uppercase tracking-wider block mb-3">Choose Icon</label>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {availableIcons.map(icon => {
              const IconComp = Icons[icon];
              return (
                <button 
                  key={icon}
                  onClick={() => setSettings({...settings, iconName: icon})}
                  className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all ${settings.iconName === icon ? 'border-primary bg-primary/10 text-primary' : 'border-slate-100 bg-white text-slate-400 dark:bg-slate-900 dark:border-slate-800'}`}
                >
                  <IconComp size={24} />
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="text-sm font-bold text-slate-500 uppercase tracking-wider block mb-3">Priority</label>
          <div className="flex gap-2">
            {['High', 'Medium', 'Low'].map(p => (
              <button 
                key={p} onClick={() => setSettings({...settings, priority: p})}
                className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-colors ${settings.priority === p ? 'bg-slate-800 text-white border-slate-800 dark:bg-white dark:text-slate-900' : 'bg-white text-slate-600 border-slate-200 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400'}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Similar Vibration Settings */}
        <div>
          <label className="text-sm font-bold text-slate-500 uppercase tracking-wider block mb-3">Vibration Intensity</label>
          <div className="flex gap-2">
            {['Light', 'Medium', 'Strong'].map(i => (
              <button 
                key={i} onClick={() => setSettings({...settings, intensity: i})}
                className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-colors ${settings.intensity === i ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-slate-200 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400'}`}
              >
                {i}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 text-blue-500 rounded-full">
              <Navigation size={18} />
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200">Direction Alerts</span>
          </div>
          <button 
            onClick={() => setSettings({...settings, directionEnabled: !settings.directionEnabled})}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${settings.directionEnabled ? 'bg-secondary' : 'bg-slate-200 dark:bg-slate-700'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${settings.directionEnabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </button>
        </div>
      </div>

      <button 
        onClick={handleSave}
        className="w-full bg-primary hover:bg-primary/90 text-white rounded-2xl p-4 font-bold shadow-lg shadow-primary/25 transition-all mt-8"
      >
        Save Custom Sound
      </button>
    </div>
  );
}
