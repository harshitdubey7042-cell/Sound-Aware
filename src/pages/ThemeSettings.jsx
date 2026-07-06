import { ArrowLeft, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ThemeSettings({ theme, setTheme }) {
  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/settings" className="p-2 bg-white dark:bg-slate-900 rounded-full shadow-sm text-slate-700 dark:text-slate-300">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Appearance</h1>
      </div>

      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Theme Preference</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Light Mode */}
        <div 
          onClick={() => setTheme('light')}
          className={`cursor-pointer rounded-3xl p-5 border-2 transition-all flex flex-col items-center gap-4 ${theme === 'light' ? 'border-primary bg-primary/5 shadow-sm' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'}`}
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${theme === 'light' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
            <Sun size={28} />
          </div>
          <span className={`font-semibold ${theme === 'light' ? 'text-primary' : 'text-slate-600 dark:text-slate-400'}`}>Light Mode</span>
        </div>

        {/* Dark Mode */}
        <div 
          onClick={() => setTheme('dark')}
          className={`cursor-pointer rounded-3xl p-5 border-2 transition-all flex flex-col items-center gap-4 ${theme === 'dark' ? 'border-secondary bg-secondary/5 shadow-sm' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'}`}
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-slate-900 text-secondary shadow-lg shadow-secondary/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
            <Moon size={28} />
          </div>
          <span className={`font-semibold ${theme === 'dark' ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>Dark Mode</span>
        </div>
      </div>
    </div>
  );
}
