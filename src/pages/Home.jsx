import { useState, useEffect } from 'react';
import { Battery, SignalHigh, ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Mic, MicOff, MessageSquare } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useMicrophone } from '../hooks/useMicrophone';
import * as Icons from 'lucide-react';

export default function Home() {
  const { userName, language, alerts } = useAppContext();
  const { 
    isListening, 
    transcript, 
    volume, 
    error, 
    permissionState, 
    soundPrediction,
    startListening, 
    stopListening
  } = useMicrophone(language);
  
  const handleMicToggle = () => {
    if (isListening) stopListening();
    else startListening();
  };

  const getPriorityColors = (priority) => {
    switch (priority) {
      case 'High': return { bg: 'bg-white dark:bg-slate-900', border: 'border-red-100 dark:border-red-500/20', text: 'text-red-600 dark:text-red-400', iconBg: 'bg-red-50 dark:bg-red-500/10 text-red-500', badge: 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300', shadow: 'shadow-red-500/10' };
      case 'Medium': return { bg: 'bg-white dark:bg-slate-900', border: 'border-orange-100 dark:border-orange-500/20', text: 'text-orange-600 dark:text-orange-400', iconBg: 'bg-orange-50 dark:bg-orange-500/10 text-orange-500', badge: 'bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300', shadow: 'shadow-orange-500/10' };
      case 'Low': return { bg: 'bg-white dark:bg-slate-900', border: 'border-blue-100 dark:border-blue-500/20', text: 'text-blue-600 dark:text-blue-400', iconBg: 'bg-blue-50 dark:bg-blue-500/10 text-blue-500', badge: 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300', shadow: 'shadow-blue-500/10' };
      default: return { bg: 'bg-white dark:bg-slate-900', border: 'border-slate-100', text: 'text-slate-800', iconBg: 'bg-slate-50 text-slate-500', badge: 'bg-slate-100 text-slate-600', shadow: 'shadow-slate-200/50' };
    }
  };

  const colors = soundPrediction ? getPriorityColors(soundPrediction.priority) : null;
  const AlertIcon = soundPrediction ? (Icons[soundPrediction.iconName] || Icons.BellRing) : null;

  return (
    <div className="p-6 h-full flex flex-col relative">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-4 mt-2">
        <div className="flex flex-col">
          <h1 
            className="text-3xl font-black text-slate-800 dark:text-white tracking-tight"
          >
            Hi, {userName} 👋
          </h1>
          <span className={`text-sm font-semibold mt-1 ${error && !isListening ? 'text-red-500' : 'text-slate-500'}`}>
             {error && !isListening ? error : (permissionState === 'denied' ? 'Mic permission denied' : isListening ? 'Listening...' : 'Microphone Off')}
          </span>
        </div>
        <div className="flex items-center gap-2 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 px-3 py-1.5 rounded-full text-xs font-bold">
          <SignalHigh size={14} />
          Connected
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center gap-4 mb-6">
        
        {/* Transcript Bubble (Live Transcript) */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-100 dark:border-slate-800 rounded-3xl p-5 shadow-sm transition-all duration-300 flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-50 text-blue-500 dark:bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0">
            <MessageSquare size={18} />
          </div>
          <div className="flex flex-col w-full">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Live Transcript</span>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200 italic line-clamp-2">
              {transcript ? `"${transcript}"` : (isListening ? '...' : '')}
            </p>
          </div>
        </div>

        {/* Central Alert Card (Environmental Sound) */}
        {soundPrediction && soundPrediction.confidence > 0 ? (
          <div className={`${colors.bg} border ${colors.border} rounded-[2.5rem] p-8 relative shadow-2xl ${colors.shadow} flex flex-col items-center text-center transition-all duration-300 h-64 justify-center`}>
            
            <div className={`absolute top-5 right-5 flex items-center gap-1.5 ${colors.badge} px-3 py-1.5 rounded-full text-[10px] font-black tracking-wider uppercase`}>
              <div className={`w-1.5 h-1.5 rounded-full ${colors.text.replace('text-', 'bg-')} animate-pulse`}></div>
              {soundPrediction.priority} ({soundPrediction.confidence}%)
            </div>

            <div className={`w-20 h-20 ${colors.iconBg} rounded-full flex items-center justify-center mb-4`}>
              <AlertIcon size={32} />
            </div>

            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 leading-tight">
              {soundPrediction.soundName} Detected
            </h2>
            
            <span className="text-xs mt-4 font-bold text-slate-400 uppercase tracking-widest">Environmental Sound</span>
          </div>
        ) : (
          <div className="bg-primary/5 dark:bg-primary/10 border-2 border-primary/20 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center shadow-lg shadow-primary/10 h-64 transition-all">
            {isListening ? (
              <div className="flex items-center justify-center gap-2 mb-4 h-16">
                <div className="w-2 h-8 bg-primary rounded-full animate-[bounce_1s_infinite]"></div>
                <div className="w-2 h-16 bg-primary rounded-full animate-[bounce_1.2s_infinite]"></div>
                <div className="w-2 h-10 bg-primary rounded-full animate-[bounce_0.8s_infinite]"></div>
                <div className="w-2 h-12 bg-primary rounded-full animate-[bounce_1.1s_infinite]"></div>
                <div className="w-2 h-6 bg-primary rounded-full animate-[bounce_0.9s_infinite]"></div>
              </div>
            ) : (
              <MicOff size={40} className="text-primary/40 mb-4" />
            )}
            <h2 className="text-xl font-black text-primary dark:text-secondary">
              {isListening 
                ? (alerts.some(a => a.enabled) ? 'No Environmental Sound Detected' : 'All alerts are off') 
                : 'Microphone Off'}
            </h2>
          </div>
        )}
      </div>

      {/* Hardware Status Cards */}
      <div className="grid grid-cols-2 gap-4 mb-20">
        <div className="bg-slate-50 dark:bg-slate-900 rounded-[2rem] p-6 flex flex-col items-center justify-center text-center border border-slate-100 dark:border-slate-800">
          <div className="p-3 bg-white dark:bg-slate-800 rounded-full text-slate-700 dark:text-slate-300 mb-3 shadow-sm">
            <Battery size={24} />
          </div>
          <span className="block text-xl font-black text-slate-900 dark:text-white">84%</span>
          <span className="text-xs font-bold text-slate-500 mt-1">Band Battery</span>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900 rounded-[2rem] p-6 flex flex-col items-center justify-center text-center border border-slate-100 dark:border-slate-800">
          <div className="p-3 bg-white dark:bg-slate-800 rounded-full text-slate-700 dark:text-slate-300 mb-3 shadow-sm">
            <SignalHigh size={24} />
          </div>
          <span className="block text-xl font-black text-slate-900 dark:text-white">Strong</span>
          <span className="text-xs font-bold text-slate-500 mt-1">Connected</span>
        </div>
      </div>

      {/* Floating Detection Button */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20">
        <button 
          onClick={handleMicToggle}
          className={`px-6 py-4 rounded-full flex items-center justify-center gap-3 shadow-2xl transition-all ${isListening ? 'bg-red-500 text-white scale-105 shadow-red-500/40 animate-pulse' : 'bg-primary text-white hover:scale-105 shadow-primary/40'}`}
        >
          {isListening ? <MicOff size={24} /> : <Mic size={24} />}
          <span className="font-bold whitespace-nowrap">
             {isListening ? 'Stop' : 'Start'}
          </span>
        </button>
      </div>
    </div>
  );
}
