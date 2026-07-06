import { useNavigate } from 'react-router-dom';
import { Bluetooth } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Login() {
  const navigate = useNavigate();
  const { userName, setUserName } = useAppContext();

  const handleLogin = () => {
    if (userName.trim() === '') return;
    navigate('/home');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-[#091F74] to-[#169AD9] max-w-[400px] mx-auto relative shadow-2xl overflow-hidden">
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] rounded-full bg-white/10 blur-3xl"></div>
      <div className="absolute bottom-[-50px] left-[-50px] w-[200px] h-[200px] rounded-full bg-black/10 blur-3xl"></div>

      <div className="z-10 w-full flex flex-col items-center gap-10">
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 rounded-[2rem] bg-white/10 backdrop-blur-md flex items-center justify-center shadow-2xl border border-white/20 mb-6">
            <Bluetooth size={56} className="text-white" />
          </div>
          
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Sound Aware</h1>
          <p className="text-blue-100 font-medium">Connect to perceive your world</p>
        </div>

        <div className="w-full mt-4 space-y-3">
          <label className="block text-sm font-bold text-white mb-1">Band Owner Name</label>
          <input 
            type="text" 
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="e.g. Karan"
            className="w-full bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-2xl px-5 py-4 text-white placeholder:text-white/50 outline-none focus:border-white focus:bg-white/20 shadow-inner transition-all font-bold text-lg"
          />
          <p className="text-xs text-white/70 font-medium ml-1">Enter your name to personalize alerts</p>
        </div>

        <button 
          onClick={handleLogin}
          className="w-full bg-white text-[#091F74] hover:bg-slate-50 rounded-2xl px-5 py-4 font-black text-lg shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] transition-all flex items-center justify-center gap-3 mt-6"
        >
          <Bluetooth size={24} />
          Connect & Continue
        </button>
      </div>
    </div>
  );
}
