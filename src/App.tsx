import { useGameStore } from './store/gameStore';
import { StartScreen } from './components/screens/StartScreen';
import { Header } from './components/panels/Header';
import { TimelinePanel } from './components/panels/TimelinePanel';
import { ProfilePanel } from './components/panels/ProfilePanel';
import { CareerPanel } from './components/panels/CareerPanel';
import { AssetsPanel } from './components/panels/AssetsPanel';
import { MemorialPanel } from './components/panels/MemorialPanel';
import { DecisionModal } from './components/modals/DecisionModal';
import { GameOverModal } from './components/modals/GameOverModal';
import { ScrollText, User, Briefcase, Landmark, Coins } from 'lucide-react';

export function App() {
  const { character, activeTab, setActiveTab } = useGameStore();

  if (!character) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center">
        <StartScreen />
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header cố định */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 pb-24">
        {activeTab === 'timeline' && <TimelinePanel />}
        {activeTab === 'profile' && <ProfilePanel />}
        {activeTab === 'career' && <CareerPanel />}
        {activeTab === 'assets' && <AssetsPanel />}
        {activeTab === 'memorial' && <MemorialPanel />}
      </main>

      {/* Thanh điều hướng Tab phía dưới (Mobile-friendly) */}
      <nav className="fixed bottom-0 inset-x-0 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 z-30 px-3 py-2 shadow-2xl">
        <div className="max-w-md mx-auto grid grid-cols-5 gap-1 text-[11px] font-semibold">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex flex-col items-center gap-1 py-1.5 rounded-xl transition ${
              activeTab === 'timeline' 
                ? 'text-amber-400 bg-amber-500/10' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ScrollText className="w-4 h-4" />
            <span>Dòng đời</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 py-1.5 rounded-xl transition ${
              activeTab === 'profile' 
                ? 'text-amber-400 bg-amber-500/10' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Hồ sơ</span>
          </button>

          <button
            onClick={() => setActiveTab('career')}
            className={`flex flex-col items-center gap-1 py-1.5 rounded-xl transition ${
              activeTab === 'career' 
                ? 'text-amber-400 bg-amber-500/10' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Sự nghiệp</span>
          </button>

          <button
            onClick={() => setActiveTab('assets')}
            className={`flex flex-col items-center gap-1 py-1.5 rounded-xl transition ${
              activeTab === 'assets' 
                ? 'text-amber-400 bg-amber-500/10' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Coins className="w-4 h-4" />
            <span>Tài chính</span>
          </button>

          <button
            onClick={() => setActiveTab('memorial')}
            className={`flex flex-col items-center gap-1 py-1.5 rounded-xl transition ${
              activeTab === 'memorial' 
                ? 'text-amber-400 bg-amber-500/10' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>Tưởng niệm</span>
          </button>
        </div>
      </nav>

      {/* Modals */}
      <DecisionModal />
      <GameOverModal />
    </div>
  );
}

export default App;
