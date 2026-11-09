import { useEffect, useRef } from 'react';
import { useGameStore } from '../../store/gameStore';
import { 
  Baby, GraduationCap, Briefcase, Heart, 
  DollarSign, Users, ShieldAlert, Sparkles 
} from 'lucide-react';

export const TimelinePanel = () => {
  const { character } = useGameStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [character?.logs.length]);

  if (!character) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'birth':
      case 'childhood':
        return <Baby className="w-4 h-4 text-sky-400" />;
      case 'school':
        return <GraduationCap className="w-4 h-4 text-amber-400" />;
      case 'career':
        return <Briefcase className="w-4 h-4 text-blue-400" />;
      case 'romance':
        return <Heart className="w-4 h-4 text-pink-400 fill-pink-500/20" />;
      case 'finance':
        return <DollarSign className="w-4 h-4 text-emerald-400" />;
      case 'family':
        return <Users className="w-4 h-4 text-purple-400" />;
      case 'death':
        return <ShieldAlert className="w-4 h-4 text-rose-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-3 pb-8">
      {character.logs.map((log, index) => (
        <div 
          key={log.id || index}
          className="relative flex items-start gap-3.5 bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-4 transition-all duration-200 text-left shadow-sm"
        >
          {/* Huy hiệu tuổi & Icon */}
          <div className="flex flex-col items-center gap-1.5 shrink-0 pt-0.5">
            <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shadow-inner">
              {getCategoryIcon(log.category)}
            </div>
            <span className="text-[11px] font-bold text-amber-400/90 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
              {log.age}t
            </span>
          </div>

          {/* Nội dung dòng đời */}
          <div className="flex-1 space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Năm {log.year}</span>
              <span className="text-[11px] uppercase tracking-wider text-slate-500">
                {log.category}
              </span>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed font-normal">
              {log.text}
            </p>

            {/* Hiển thị thay đổi chỉ số nếu có */}
            {log.statChanges && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {Object.entries(log.statChanges).map(([key, val]) => {
                  if (!val) return null;
                  const isPositive = val > 0;
                  return (
                    <span 
                      key={key} 
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                        isPositive 
                          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' 
                          : 'bg-rose-500/10 text-rose-300 border-rose-500/20'
                      }`}
                    >
                      {key}: {isPositive ? `+${val}` : val}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};
