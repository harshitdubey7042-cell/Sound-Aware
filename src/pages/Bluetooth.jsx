import { useState } from 'react';
import { ArrowLeft, Bluetooth as BluetoothIcon, RefreshCw, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Bluetooth() {
  const [scanning, setScanning] = useState(false);
  const [connected, setConnected] = useState(true);

  const scanDevices = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 2000);
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/settings" className="p-2 bg-white dark:bg-slate-900 rounded-full shadow-sm text-slate-700 dark:text-slate-300">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Bluetooth</h1>
      </div>

      {/* Connection Status Card */}
      <div className="bg-gradient-to-br from-primary to-secondary p-6 rounded-3xl shadow-lg shadow-primary/20 text-white mb-8 relative overflow-hidden">
        <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <BluetoothIcon size={24} />
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${connected ? 'bg-green-500/20 text-green-100' : 'bg-white/20 text-white'}`}>
            {connected ? 'CONNECTED' : 'DISCONNECTED'}
          </span>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-1">Sound Aware Band 2.0</h2>
          <p className="text-sm text-white/80">Battery: 84% • Left Wrist</p>
        </div>
        <button 
          onClick={() => setConnected(!connected)}
          className="mt-6 w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-semibold transition-colors"
        >
          {connected ? 'Disconnect Device' : 'Connect Device'}
        </button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Available Devices</h3>
        <button 
          onClick={scanDevices}
          className={`p-2 bg-white dark:bg-slate-900 rounded-full shadow-sm text-secondary ${scanning ? 'animate-spin' : ''}`}
        >
          <RefreshCw size={16} />
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500">
              <BluetoothIcon size={20} />
            </div>
            <div>
              <span className="block font-bold text-slate-800 dark:text-slate-200">Karan's AirPods</span>
              <span className="text-xs text-slate-500">Saved</span>
            </div>
          </div>
        </div>
        
        {scanning && (
          <div className="text-center p-6 text-sm text-slate-500 flex flex-col items-center gap-2">
            <RefreshCw size={20} className="animate-spin text-secondary" />
            Scanning for nearby bands...
          </div>
        )}
      </div>
    </div>
  );
}
