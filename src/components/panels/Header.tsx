import { useGameStore } from '../../store/gameStore';
import { CharacterAvatar } from '../avatar/CharacterAvatar';
import { 
  Heart, Brain, Smile, Sparkles, Scale, 
  Wallet, FastForward, RotateCcw 
} from 'lucide-react';

export const Header = () => {
  const { character, nextYear, startNewLife, pendingDecision } = useGameStore();

  if (!character) return null;

  const currentYear = character.birthYear + character.age;

  return (
    <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30 px-4 py-3 shadow-md">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Avatar & Thông tin cơ bản */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <CharacterAvatar character={character} size={64} />
          <div className="text-left">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white tracking-wide">{character.name}</h1>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                character.gender === 'male' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' : 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
              }`}>
                {character.gender === 'male' ? 'Nam' : 'Nữ'}
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
              <span>{character.age} tuổi</span>
              <span>•</span>
              <span className="text-amber-400/90 font-medium">Năm {currentYear}</span>
              <span>•</span>
              <span>{character.province}</span>
            </p>
          </div>
        </div>

        {/* Nút hành động */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          <button
            onClick={() => startNewLife()}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title="Bắt đầu lại cuộc đời mới"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Đầu thai</span>
          </button>

          <button
            onClick={nextYear}
            disabled={!character.alive || !!pendingDecision}
            className={`flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl shadow-lg transition-all ${
              !character.alive || !!pendingDecision
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            <FastForward className="w-4 h-4 fill-current" />
            <span>Sống tiếp 1 tuổi</span>
          </button>
        </div>

      </div>

      {/* Thanh 6 chỉ số cốt lõi */}
      <div className="max-w-4xl mx-auto grid grid-cols-3 sm:grid-cols-6 gap-2 mt-3 pt-3 border-t border-slate-800/60 text-xs">
        
        {/* Sức khỏe */}
        <div className="bg-slate-800/50 rounded-lg p-1.5 border border-slate-700/50 flex flex-col gap-1">
          <div className="flex items-center justify-between text-rose-400">
            <span className="flex items-center gap-1 font-medium"><Heart className="w-3 h-3 fill-rose-500/30" /> Sức khỏe</span>
            <span className="font-bold">{character.stats.health}%</span>
          </div>
          <div className="w-full bg-slate-700/50 h-1.5 rounded-full overflow-hidden">
            <div className="bg-rose-500 h-full rounded-full transition-all duration-300" style={{ width: `${character.stats.health}%` }} />
          </div>
        </div>

        {/* Trí tuệ */}
        <div className="bg-slate-800/50 rounded-lg p-1.5 border border-slate-700/50 flex flex-col gap-1">
          <div className="flex items-center justify-between text-sky-400">
            <span className="flex items-center gap-1 font-medium"><Brain className="w-3 h-3 fill-sky-500/30" /> Trí tuệ</span>
            <span className="font-bold">{character.stats.smarts}%</span>
          </div>
          <div className="w-full bg-slate-700/50 h-1.5 rounded-full overflow-hidden">
            <div className="bg-sky-500 h-full rounded-full transition-all duration-300" style={{ width: `${character.stats.smarts}%` }} />
          </div>
        </div>

        {/* Hạnh phúc */}
        <div className="bg-slate-800/50 rounded-lg p-1.5 border border-slate-700/50 flex flex-col gap-1">
          <div className="flex items-center justify-between text-amber-400">
            <span className="flex items-center gap-1 font-medium"><Smile className="w-3 h-3 fill-amber-500/30" /> Hạnh phúc</span>
            <span className="font-bold">{character.stats.happiness}%</span>
          </div>
          <div className="w-full bg-slate-700/50 h-1.5 rounded-full overflow-hidden">
            <div className="bg-amber-400 h-full rounded-full transition-all duration-300" style={{ width: `${character.stats.happiness}%` }} />
          </div>
        </div>

        {/* Ngoại hình */}
        <div className="bg-slate-800/50 rounded-lg p-1.5 border border-slate-700/50 flex flex-col gap-1">
          <div className="flex items-center justify-between text-purple-400">
            <span className="flex items-center gap-1 font-medium"><Sparkles className="w-3 h-3 fill-purple-500/30" /> Ngoại hình</span>
            <span className="font-bold">{character.stats.looks}%</span>
          </div>
          <div className="w-full bg-slate-700/50 h-1.5 rounded-full overflow-hidden">
            <div className="bg-purple-500 h-full rounded-full transition-all duration-300" style={{ width: `${character.stats.looks}%` }} />
          </div>
        </div>

        {/* Đạo đức */}
        <div className="bg-slate-800/50 rounded-lg p-1.5 border border-slate-700/50 flex flex-col gap-1">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="flex items-center gap-1 font-medium"><Scale className="w-3 h-3" /> Karma</span>
            <span className="font-bold">{character.stats.karma}</span>
          </div>
          <div className="w-full bg-slate-700/50 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full transition-all duration-300" style={{ width: `${Math.min(100, Math.max(0, character.stats.karma + 50))}%` }} />
          </div>
        </div>

        {/* Tiền mặt */}
        <div className="bg-slate-800/50 rounded-lg p-1.5 border border-slate-700/50 flex flex-col justify-center">
          <div className="flex items-center gap-1 text-amber-300 font-medium text-[11px]">
            <Wallet className="w-3 h-3" /> Tài sản ví
          </div>
          <div className="text-sm font-bold text-emerald-400 truncate mt-0.5">
            {(character.finances.cash / 1e6).toLocaleString('vi-VN', { maximumFractionDigits: 1 })} tr đ
          </div>
        </div>

      </div>
    </header>
  );
};
