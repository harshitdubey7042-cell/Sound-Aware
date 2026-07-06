import { useState } from 'react';
import { Mic, ArrowLeft, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function VoiceTrigger() {
  const [triggers, setTriggers] = useState([
    { id: 1, text: 'Hello', enabled: true, sensitivity: 70, pattern: 'Single Pulse', directionEnabled: true },
    { id: 2, text: 'Hey Karan', enabled: true, sensitivity: 85, pattern: 'Double Pulse', directionEnabled: true },
    { id: 3, text: 'Excuse me', enabled: true, sensitivity: 60, pattern: 'Single Pulse', directionEnabled: true },
    { id: 4, text: 'Karan', enabled: true, sensitivity: 80, pattern: 'Continuous', directionEnabled: true },
    { id: 5, text: 'Listen', enabled: false, sensitivity: 50, pattern: 'Double Pulse', directionEnabled: false },
  ]);

  const [expandedId, setExpandedId] = useState(null);

  const toggleTrigger = (id) => {
    setTriggers(triggers.map(t => t.id === id ? { ...t, enabled: !t.enabled } : t));
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/settings" className="p-2 bg-white dark:bg-slate-900 rounded-full shadow-sm text-slate-700 dark:text-slate-300">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Name & Phrase Detection</h1>
      </div>

      <div className="bg-primary text-white p-6 rounded-3xl mb-8 shadow-lg shadow-primary/20 flex items-center gap-4 relative overflow-hidden">
        <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
          <Mic size={28} />
        </div>
        <div>
          <h3 className="font-bold text-lg">Name Wake-Up</h3>
          <p className="text-xs text-white/80 mt-1">Band reacts when it hears your name</p>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        {triggers.map(trigger => (
          <div key={trigger.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-all">
            <div 
              className="p-5 flex items-center justify-between cursor-pointer"
              onClick={() => setExpandedId(expandedId === trigger.id ? null : trigger.id)}
            >
              <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg">"{trigger.text}"</h4>
              <button 
                onClick={(e) => { e.stopPropagation(); toggleTrigger(trigger.id); }}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${trigger.enabled ? 'bg-secondary' : 'bg-slate-200 dark:bg-slate-700'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${trigger.enabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
            </div>

            {expandedId === trigger.id && (
              <div className="px-5 pb-5 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-5 bg-slate-50 dark:bg-slate-900/50">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">Sensitivity</span>
                    <span className="text-xs font-bold text-primary dark:text-secondary">{trigger.sensitivity}%</span>
                  </div>
                  <input type="range" min="0" max="100" value={trigger.sensitivity} readOnly className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none accent-primary" />
                </div>
                
                <div className="flex justify-between items-center text-sm font-bold text-slate-700 dark:text-slate-300">
                  <span>Pattern</span>
                  <select className="bg-white dark:bg-slate-800 border-none rounded-lg p-1 outline-none text-primary dark:text-secondary">
                    <option>{trigger.pattern}</option>
                    <option>Single Pulse</option><option>Double Pulse</option><option>Continuous</option>
                  </select>
                </div>

                <div className="flex justify-between items-center text-sm font-bold text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <Navigation size={16} className="text-blue-500" />
                    <span>Direction Alert</span>
                  </div>
                  <input type="checkbox" checked={trigger.directionEnabled} readOnly className="w-5 h-5 accent-secondary" />
                </div>
              </div>
            )}
          </div>
        ))}
        <button className="w-full py-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-slate-500 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          + Add New Phrase
        </button>
      </div>
    </div>
  );
}
