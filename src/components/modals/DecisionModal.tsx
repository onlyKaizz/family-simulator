import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { Sparkles, ArrowRight } from 'lucide-react';

export const DecisionModal: React.FC = () => {
  const { pendingDecision, makeChoice } = useGameStore();

  if (!pendingDecision) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl text-left space-y-5">
        
        {/* Tiêu đề & Mô tả */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> Ngã Rẽ Cuộc Đời
          </div>
          <h2 className="text-xl font-extrabold text-white">
            {pendingDecision.title}
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            {pendingDecision.description}
          </p>
        </div>

        {/* Danh sách lựa chọn */}
        <div className="space-y-2.5 pt-1">
          {pendingDecision.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => makeChoice(index)}
              className="w-full p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-750 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500/60 text-left transition-all duration-200 group flex items-center justify-between gap-3 shadow-md"
            >
              <div className="space-y-0.5">
                <span className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors block">
                  {choice.text}
                </span>
                {choice.description && (
                  <span className="text-xs text-slate-400 block font-normal">
                    {choice.description}
                  </span>
                )}
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all shrink-0" />
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
