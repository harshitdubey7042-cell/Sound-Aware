import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import * as Icons from 'lucide-react';
import { Plus, Navigation } from 'lucide-react';

export default function SoundAlerts() {
  const { alerts, updateAlert } = useAppContext();
  const navigate = useNavigate();

  const toggleAlert = (e, id, currentStatus) => {
    e.stopPropagation();
    updateAlert(id, { enabled: !currentStatus });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Sound Alerts</h1>

      <div className="space-y-3 mb-8">
        {alerts.map(alert => {
          const IconComponent = Icons[alert.iconName] || Icons.BellRing;
          
          return (
            <div 
              key={alert.id} 
              onClick={() => navigate(`/alerts/${alert.id}`)}
              className="flex flex-col gap-3 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm cursor-pointer hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${alert.enabled ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'}`}>
                  <IconComponent size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800 dark:text-slate-100 text-lg">{alert.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${alert.priority === 'High' ? 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400' : alert.priority === 'Medium' ? 'bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400'}`}>
                      {alert.priority}
                    </span>
                    {alert.directionEnabled && (
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                        <Navigation size={10} /> Dir
                      </span>
                    )}
                  </div>
                </div>
                <button 
                  onClick={(e) => toggleAlert(e, alert.id, alert.enabled)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${alert.enabled ? 'bg-secondary' : 'bg-slate-200 dark:bg-slate-700'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${alert.enabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <button 
        onClick={() => navigate('/alerts/new')}
        className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white rounded-2xl p-4 font-bold shadow-lg shadow-primary/25 transition-all"
      >
        <Plus size={20} />
        Add Custom Sound
      </button>
    </div>
  );
}
