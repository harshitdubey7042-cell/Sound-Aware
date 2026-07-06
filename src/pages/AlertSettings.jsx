import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ArrowLeft, Play, Navigation } from 'lucide-react';
import * as Icons from 'lucide-react';

export default function AlertSettings() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { alerts, updateAlert } = useAppContext();
  
  const alert = alerts.find(a => a.id === id);
  const [settings, setSettings] = useState(alert || {});

  useEffect(() => {
    if (!alert) navigate('/alerts');
  }, [alert, navigate]);

  if (!alert) return null;

  const IconComponent = Icons[alert.iconName] || Icons.BellRing;

  const handleSave = () => {
    updateAlert(id, settings);
    navigate('/alerts');
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/alerts')} className="p-2 bg-white dark:bg-slate-900 rounded-full shadow-sm text-slate-700 dark:text-slate-300">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-slate-800 dark:text-white flex-1">{settings.name} Settings</h1>
        <button 
          onClick={() => setSettings({...settings, enabled: !settings.enabled})}
          className={`w-12 h-6 rounded-full p-1 transition-colors ${settings.enabled ? 'bg-secondary' : 'bg-slate-200 dark:bg-slate-700'}`}
        >
          <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${settings.enabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
        </button>
      </div>

      <div className="bg-primary/5 dark:bg-primary/10 rounded-3xl p-6 flex flex-col items-center mb-8 border border-primary/10">
        <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center text-primary mb-4 shadow-sm">
          <IconComponent size={32} />
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md active:scale-95 transition-transform">
          <Play size={16} /> Test Vibration
        </button>
      </div>

      <div className="space-y-6">
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

        <div>
          <label className="text-sm font-bold text-slate-500 uppercase tracking-wider block mb-3">Vibration Speed (Frequency)</label>
          <input 
            type="range" min="0" max="100" 
            value={settings.frequency} onChange={(e) => setSettings({...settings, frequency: Number(e.target.value)})}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none accent-primary"
          />
          <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase mt-2">
            <span>Slow</span><span>Fast</span>
          </div>
        </div>

        <div>
          <label className="text-sm font-bold text-slate-500 uppercase tracking-wider block mb-3">Number of Pulses</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(num => (
              <button 
                key={num} onClick={() => setSettings({...settings, pulses: num})}
                className={`flex-1 py-2 rounded-xl text-sm font-bold border transition-colors ${settings.pulses === num ? 'bg-secondary text-white border-secondary' : 'bg-white text-slate-600 border-slate-200 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400'}`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-bold text-slate-500 uppercase tracking-wider block mb-3">Pattern Type</label>
          <select 
            value={settings.pattern} onChange={(e) => setSettings({...settings, pattern: e.target.value})}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 dark:text-white outline-none"
          >
            <option>Single Pulse</option>
            <option>Double Pulse</option>
            <option>Continuous</option>
            <option>SOS Pattern</option>
          </select>
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
        Save Settings
      </button>
    </div>
  );
}
