import { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { Landmark, RotateCcw, Check } from 'lucide-react';
import { CharacterAvatar } from '../avatar/CharacterAvatar';

export const GameOverModal = () => {
  const { character, obituary, isGameOver, startNewLife, saveToMemorial } = useGameStore();
  const [saved, setSaved] = useState(false);

  if (!isGameOver || !character || !obituary) return null;

  const handleSave = () => {
    saveToMemorial();
    setSaved(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl text-left space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header cáo phó */}
        <div className="flex items-center gap-4 border-b border-slate-800 pb-5">
          <CharacterAvatar character={character} size={72} />
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              Khép lại một kiếp người
            </span>
            <h2 className="text-2xl font-black text-white mt-0.5">{character.name}</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Hưởng thọ <b className="text-amber-300">{character.age} tuổi</b> • {character.province}
            </p>
          </div>
        </div>

        {/* Nội dung Điếu Văn / Tóm tắt cuộc đời */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Điếu Văn Tưởng Nhớ
          </h3>
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-5 text-sm text-slate-200 leading-relaxed font-serif whitespace-pre-line italic shadow-inner">
            {obituary}
          </div>
        </div>

        {/* Các nút hành động */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={handleSave}
            disabled={saved}
            className={`w-full sm:w-1/2 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition border ${
              saved
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 cursor-default'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700'
            }`}
          >
            {saved ? <Check className="w-4 h-4 text-emerald-400" /> : <Landmark className="w-4 h-4 text-amber-400" />}
            <span>{saved ? 'Đã lưu vào Đài tưởng niệm' : 'Lưu vào Đài tưởng niệm'}</span>
          </button>

          <button
            onClick={() => startNewLife()}
            className="w-full sm:w-1/2 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 transition hover:scale-[1.02] active:scale-[0.98]"
          >
            <RotateCcw className="w-4 h-4 fill-current" />
            <span>Đầu thai kiếp mới</span>
          </button>
        </div>

      </div>
    </div>
  );
};
