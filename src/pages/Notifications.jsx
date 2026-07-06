import { useState } from 'react';
import { ArrowLeft, Phone, MessageCircle, Camera, AlertTriangle, Calendar, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Notifications() {
  const [apps, setApps] = useState([
    { id: 1, name: 'Calls', icon: Phone, enabled: true, intensity: 'Strong', frequency: 80, pulses: 4, pattern: 'Continuous' },
    { id: 2, name: 'SMS / Messages', icon: MessageCircle, enabled: true, intensity: 'Medium', frequency: 50, pulses: 2, pattern: 'Single Pulse' },
    { id: 3, name: 'WhatsApp', icon: MessageCircle, enabled: true, intensity: 'Medium', frequency: 60, pulses: 2, pattern: 'Double Pulse' },
    { id: 4, name: 'Instagram', icon: Camera, enabled: false, intensity: 'Light', frequency: 40, pulses: 1, pattern: 'Single Pulse' },
    { id: 5, name: 'Emergency Alerts', icon: AlertTriangle, enabled: true, intensity: 'Strong', frequency: 100, pulses: 5, pattern: 'SOS Pattern' },
    { id: 6, name: 'Calendar Reminder', icon: Calendar, enabled: true, intensity: 'Medium', frequency: 50, pulses: 1, pattern: 'Long Pulse' },
  ]);

  const [expandedId, setExpandedId] = useState(null);

  const toggleApp = (id) => {
    setApps(apps.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a));
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/settings" className="p-2 bg-white dark:bg-slate-900 rounded-full shadow-sm text-slate-700 dark:text-slate-300">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Phone Notifications</h1>
      </div>

      <div className="space-y-4 mb-8">
        {apps.map(app => (
          <div key={app.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-all">
            <div 
              className="p-5 flex items-center gap-4 cursor-pointer"
              onClick={() => setExpandedId(expandedId === app.id ? null : app.id)}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${app.enabled ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'}`}>
                <app.icon size={24} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg">{app.name}</h4>
                <p className="text-xs font-semibold text-slate-500">{app.enabled ? 'Enabled' : 'Disabled'}</p>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); toggleApp(app.id); }}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${app.enabled ? 'bg-secondary' : 'bg-slate-200 dark:bg-slate-700'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${app.enabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
            </div>

            {expandedId === app.id && (
              <div className="px-5 pb-5 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-4 bg-slate-50 dark:bg-slate-900/50">
                <div className="flex justify-between items-center text-sm font-bold text-slate-700 dark:text-slate-300 mt-2">
                  <span>Intensity</span>
                  <select className="bg-white dark:bg-slate-800 border-none rounded-lg p-1 outline-none text-primary dark:text-secondary">
                    <option>{app.intensity}</option>
                    <option>Light</option><option>Medium</option><option>Strong</option>
                  </select>
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-slate-700 dark:text-slate-300">
                  <span>Pulses</span>
                  <select className="bg-white dark:bg-slate-800 border-none rounded-lg p-1 outline-none text-primary dark:text-secondary">
                    <option>{app.pulses}</option>
                    <option>1</option><option>2</option><option>3</option><option>4</option><option>5</option>
                  </select>
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-slate-700 dark:text-slate-300">
                  <span>Pattern</span>
                  <select className="bg-white dark:bg-slate-800 border-none rounded-lg p-1 outline-none text-primary dark:text-secondary">
                    <option>{app.pattern}</option>
                    <option>Single Pulse</option><option>Double Pulse</option><option>Continuous</option><option>SOS Pattern</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <button className="w-full flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-white rounded-2xl p-4 font-bold transition-all">
        <Plus size={20} />
        Add App
      </button>
    </div>
  );
}
