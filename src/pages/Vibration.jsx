import { useState } from 'react';
import { ArrowLeft, Play, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Vibration() {
  const [intensity, setIntensity] = useState(2);
  const [pattern, setPattern] = useState('double');
  const [isPlaying, setIsPlaying] = useState(false);

  const patterns = [
    { id: 'single', name: 'Single Pulse', description: 'One sharp vibration' },
    { id: 'double', name: 'Double Pulse', description: 'Two quick vibrations' },
    { id: 'continuous', name: 'Continuous', description: 'Steady long vibration' },
    { id: 'sos', name: 'S.O.S', description: 'Urgent rhythm pattern' },
  ];

  const handlePreview = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 1500);
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/settings" className="p-2 bg-white dark:bg-slate-900 rounded-full shadow-sm text-slate-700 dark:text-slate-300">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Vibration Settings</h1>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm mb-8 flex flex-col items-center">
        <div className={`w-32 h-32 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${isPlaying ? 'border-primary scale-110 shadow-lg shadow-primary/40' : 'border-slate-100 dark:border-slate-800 scale-100'}`}>
          <div className={`w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center ${isPlaying ? 'animate-pulse' : ''}`}>
            <Activity size={40} className={isPlaying ? 'text-primary' : 'text-slate-400'} />
          </div>
        </div>
        
        <button 
          onClick={handlePreview}
          className="mt-6 flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-full font-semibold shadow-md active:scale-95 transition-transform"
        >
          <Play size={18} />
          Preview Pattern
        </button>
      </div>

      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Intensity</h3>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm mb-8">
        <div className="flex justify-between text-xs text-slate-500 mb-4 font-medium">
          <span>Light</span>
          <span>Medium</span>
          <span>Strong</span>
        </div>
        <input 
          type="range" 
          min="1" max="3" 
          value={intensity}
          onChange={(e) => setIntensity(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
        />
      </div>

      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Pattern Types</h3>
      <div className="space-y-3">
        {patterns.map(p => (
          <div 
            key={p.id}
            onClick={() => setPattern(p.id)}
            className={`flex flex-col p-4 rounded-2xl border cursor-pointer transition-all ${pattern === p.id ? 'bg-primary/5 border-primary shadow-sm' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800'}`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`font-semibold ${pattern === p.id ? 'text-primary dark:text-secondary' : 'text-slate-800 dark:text-slate-200'}`}>{p.name}</span>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${pattern === p.id ? 'border-primary' : 'border-slate-300 dark:border-slate-600'}`}>
                {pattern === p.id && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
              </div>
            </div>
            <p className="text-xs text-slate-500">{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
