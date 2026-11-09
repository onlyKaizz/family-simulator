import { useGameStore } from '../../store/gameStore';
import { Landmark, Calendar, MapPin } from 'lucide-react';
import { CharacterAvatar } from '../avatar/CharacterAvatar';

export const MemorialPanel = () => {
  const { memorials } = useGameStore();

  return (
    <div className="space-y-4 text-left pb-8">
      <div className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl p-5">
        <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
          <Landmark className="w-5 h-5 text-amber-400" /> Đài Tưởng Niệm & Dấu Ấn Đời Người
        </h3>
        <p className="text-xs text-slate-300 mt-1">
          Nơi lưu giữ vĩnh cửu những kiếp nhân sinh đã từng bước qua cuộc đời trên thiết bị này.
        </p>
      </div>

      {memorials.length === 0 ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-10 text-center space-y-2">
          <Landmark className="w-8 h-8 text-slate-600 mx-auto" />
          <h4 className="text-sm font-semibold text-slate-300">Đài tưởng niệm còn trống</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Khi một cuộc đời hoàn thành và nhân vật qua đời, bạn có thể lưu điếu văn và cuộc đời ấy vào đây để tưởng nhớ mãi mãi.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {memorials.map((entry) => (
            <div 
              key={entry.id}
              className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-slate-700 transition"
            >
              <div className="flex items-start gap-4">
                <CharacterAvatar character={entry.character} size={56} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-white">{entry.character.name}</h4>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Hưởng thọ {entry.character.age} tuổi
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" /> {entry.character.province}
                    </span>
                    <span>•</span>
                    <span>Dân tộc {entry.character.ethnicity}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-sky-400" /> 
                      {new Date(entry.timestamp).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Lời điếu văn */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 text-xs text-slate-300 leading-relaxed whitespace-pre-line font-serif italic">
                {entry.obituary}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
