import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Clock, Settings, Bell } from 'lucide-react';

export default function Layout() {
  const location = useLocation();

  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/alerts', icon: Bell, label: 'Alerts' },
    { path: '/history', icon: Clock, label: 'History' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex justify-center bg-slate-900 min-h-screen">
      <div className="w-full max-w-[400px] bg-slate-50 dark:bg-slate-950 min-h-screen relative shadow-2xl flex flex-col overflow-hidden">
        
        <main className="flex-1 overflow-y-auto pb-20">
          <Outlet />
        </main>

        <nav className="absolute bottom-0 w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-around p-3 z-50">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                  isActive 
                    ? 'text-primary dark:text-secondary' 
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
              >
                <item.icon size={24} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
