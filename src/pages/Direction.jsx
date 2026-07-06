import { ArrowLeft, Compass, ArrowUp, ArrowDown, ArrowLeft as ArrowLeftIcon, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Direction() {
  const [enabled, setEnabled] = useState(true);

  const directions = [
    { dir: 'Front', desc: 'Upward Arrow', pattern: 'Continuous', icon: <ArrowUp className="text-blue-500" /> },
    { dir: 'Behind', desc: 'Downward Arrow', pattern: 'Double Pulse', icon: <ArrowDown className="text-blue-500" /> },
    { dir: 'Left Side', desc: 'Left Arrow', pattern: 'Single Pulse', icon: <ArrowLeftIcon className="text-blue-500" /> },
    { dir: 'Right Side', desc: 'Right Arrow', pattern: 'Single Pulse', icon: <ArrowRight className="text-blue-500" /> },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/settings" className="p-2 bg-white dark:bg-slate-900 rounded-full shadow-sm text-slate-700 dark:text-slate-300">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Direction Settings</h1>
      </div>

      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 dark:bg-blue-500/10 text-blue-500 rounded-full">
            <Compass size={20} />
          </div>
          <div>
            <span className="block font-bold text-slate-800 dark:text-slate-200">Enable Direction Detection</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest">360° Spatial Awareness</span>
          </div>
        </div>
        <button 
          onClick={() => setEnabled(!enabled)}
          className={`w-12 h-6 rounded-full p-1 transition-colors ${enabled ? 'bg-secondary' : 'bg-slate-200 dark:bg-slate-700'}`}
        >
          <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${enabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
        </button>
      </div>

      {enabled && (
        <>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Direction Mapping</h3>
          <div className="space-y-4">
            {directions.map((d, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 rounded-full flex items-center justify-center">
                    {d.icon}
                  </div>
                  <div>
                    <span className="block font-black text-slate-800 dark:text-slate-200 text-lg">{d.dir}</span>
                    <span className="text-xs font-semibold text-slate-500">{d.desc}</span>
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Pattern:</span>
                  <select className="bg-transparent text-sm font-bold text-slate-800 dark:text-white outline-none">
                    <option>{d.pattern}</option>
                    <option>Single Pulse</option>
                    <option>Double Pulse</option>
                    <option>Continuous</option>
                    <option>SOS Pattern</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
