import { Car, Phone, BellRing, CalendarDays, Activity } from 'lucide-react';

export default function History() {
  const historyData = [
    { id: 1, title: 'Car Horn', direction: 'Right Side', priority: 'High', time: '2 min ago', date: 'Today', icon: Car, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-500/10', pattern: 'Double Pulse' },
    { id: 2, title: 'Karan Called', direction: 'Left Side', priority: 'High', time: '5 min ago', date: 'Today', icon: Phone, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-500/10', pattern: 'Continuous' },
    { id: 3, title: 'Baby Crying', direction: 'Left Side', priority: 'Medium', time: '10 min ago', date: 'Today', icon: BellRing, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-500/10', pattern: 'Continuous' },
    { id: 4, title: 'Doorbell', direction: 'Front', priority: 'Low', time: '1 hour ago', date: 'Today', icon: BellRing, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10', pattern: 'Single Pulse' },
    { id: 5, title: 'Siren', direction: 'Behind', priority: 'High', time: 'Yesterday', date: 'Yesterday', icon: Car, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-500/10', pattern: 'SOS Pattern' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Activity History</h1>

      <div className="flex items-center gap-2 text-slate-500 mb-6">
        <CalendarDays size={16} />
        <span className="text-sm font-bold uppercase tracking-wider">Log Overview</span>
      </div>

      <div className="space-y-6">
        {/* Today */}
        <div>
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 ml-2">Today</h3>
          <div className="space-y-4">
            {historyData.filter(d => d.date === 'Today').map(item => (
              <div key={item.id} className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${item.bg}`}>
                      <item.icon size={20} className={item.color} />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-800 dark:text-slate-100 text-lg">{item.title}</h4>
                      <p className="text-xs font-semibold text-slate-500">from {item.direction}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{item.time}</span>
                </div>
                
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-full ${item.color.replace('text-', 'bg-').replace('500', '100')} ${item.color}`}>
                    {item.priority} Priority
                  </span>
                  <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                    <Activity size={10} /> {item.pattern}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
