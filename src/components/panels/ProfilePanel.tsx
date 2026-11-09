import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { 
  Home, Users, Sparkles, Moon, Sun, Compass, Heart, Baby 
} from 'lucide-react';

export const ProfilePanel: React.FC = () => {
  const { character } = useGameStore();

  if (!character) return null;

  return (
    <div className="space-y-4 text-left pb-8">
      
      {/* Thẻ nguồn gốc & Văn hóa */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
        <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
          <Compass className="w-4 h-4" /> Nguồn Gốc & Văn Hóa
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-800/40 p-2.5 rounded-xl border border-slate-700/40">
            <span className="text-slate-400 block mb-1">Quê quán</span>
            <span className="font-semibold text-slate-100">{character.province}</span>
          </div>
          <div className="bg-slate-800/40 p-2.5 rounded-xl border border-slate-700/40">
            <span className="text-slate-400 block mb-1">Vùng miền</span>
            <span className="font-semibold text-slate-100">{character.region}</span>
          </div>
          <div className="bg-slate-800/40 p-2.5 rounded-xl border border-slate-700/40">
            <span className="text-slate-400 block mb-1">Dân tộc</span>
            <span className="font-semibold text-slate-100">{character.ethnicity}</span>
          </div>
          <div className="bg-slate-800/40 p-2.5 rounded-xl border border-slate-700/40">
            <span className="text-slate-400 block mb-1">Tín ngưỡng / Tôn giáo</span>
            <span className="font-semibold text-slate-100">{character.religion}</span>
          </div>
          <div className="bg-slate-800/40 p-2.5 rounded-xl border border-slate-700/40">
            <span className="text-slate-400 block mb-1">Cung hoàng đạo</span>
            <span className="font-semibold text-slate-100 flex items-center gap-1">
              <Sun className="w-3.5 h-3.5 text-amber-400" /> {character.zodiac}
            </span>
          </div>
          <div className="bg-slate-800/40 p-2.5 rounded-xl border border-slate-700/40">
            <span className="text-slate-400 block mb-1">Giờ sinh Can Chi</span>
            <span className="font-semibold text-slate-100 flex items-center gap-1">
              <Moon className="w-3.5 h-3.5 text-indigo-400" /> Giờ {character.birthHourCanChi}
            </span>
          </div>
        </div>
      </div>

      {/* Gia đình ruột thịt */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
        <h3 className="text-sm font-bold text-sky-400 flex items-center gap-2">
          <Users className="w-4 h-4" /> Bố Mẹ & Hoàn Cảnh Gia Đình
        </h3>
        <p className="text-xs text-slate-400 flex items-center gap-1.5">
          <Home className="w-3.5 h-3.5 text-amber-400" /> Nơi ở thời thơ ấu: <span className="text-slate-200 font-medium">{character.houseType}</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {character.parents.map((p, idx) => (
            <div key={idx} className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/40 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-100 text-sm block">{p.name} ({p.role})</span>
                <span className="text-slate-400 block mt-0.5">{p.job}</span>
                <span className="text-slate-500 block text-[11px] mt-0.5">
                  {p.alive ? `${p.age} tuổi • ${(p.monthlyIncome / 1e6).toFixed(1)} tr đ/tháng` : 'Đã qua đời'}
                </span>
              </div>
              <div className="text-right">
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  p.alive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-700 text-slate-400'
                }`}>
                  {p.alive ? 'Còn sống' : 'Đã mất'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vợ chồng & Con cái */}
      {(character.partner || character.children.length > 0) && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
          <h3 className="text-sm font-bold text-pink-400 flex items-center gap-2">
            <Heart className="w-4 h-4 fill-pink-500/20" /> Tổ Ấm Nhỏ Của Bạn
          </h3>

          {character.partner && (
            <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/40 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-100 text-sm block">
                  {character.partner.name} ({character.partner.isMarried ? 'Vợ / Chồng' : 'Người yêu'})
                </span>
                <span className="text-slate-400 block mt-0.5">{character.partner.job} • {character.partner.age} tuổi</span>
                <span className="text-emerald-400 block text-[11px] mt-0.5">
                  Thu nhập: {(character.partner.monthlyIncome / 1e6).toFixed(1)} triệu đ/tháng
                </span>
              </div>
              <span className="text-pink-400 font-semibold bg-pink-500/10 border border-pink-500/20 px-2 py-1 rounded-lg">
                Gắn bó {character.partner.yearsTogether} năm
              </span>
            </div>
          )}

          {character.children.length > 0 && (
            <div className="space-y-2 pt-2">
              <span className="text-xs text-slate-400 block">Con cái ({character.children.length} người con):</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {character.children.map((c, idx) => (
                  <div key={idx} className="bg-slate-800/30 p-2.5 rounded-xl border border-slate-700/30 flex items-center gap-2 text-xs">
                    <Baby className="w-4 h-4 text-sky-400" />
                    <div>
                      <span className="font-semibold text-slate-100">{c.name}</span>
                      <span className="text-slate-400 block text-[11px]">{c.gender === 'male' ? 'Con trai' : 'Con gái'} • {c.age} tuổi</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Năng khiếu & Thiên bẩm */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2">
        <h3 className="text-sm font-bold text-purple-400 flex items-center gap-2">
          <Sparkles className="w-4 h-4" /> Thiên Bẩm & Tính Cách
        </h3>
        <p className="text-xs text-slate-300">
          Năng khiếu nổi trội: <span className="font-bold text-purple-300">{character.talent}</span>
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
          <div className="bg-slate-800/40 p-2 rounded-lg border border-slate-700/40">
            <span className="text-slate-400 block">Ý chí phấn đấu</span>
            <span className="font-bold text-amber-400">{character.traits.ambition}%</span>
          </div>
          <div className="bg-slate-800/40 p-2 rounded-lg border border-slate-700/40">
            <span className="text-slate-400 block">Chấp nhận rủi ro</span>
            <span className="font-bold text-sky-400">{character.traits.riskTolerance}%</span>
          </div>
          <div className="bg-slate-800/40 p-2 rounded-lg border border-slate-700/40">
            <span className="text-slate-400 block">Giao tiếp xã hội</span>
            <span className="font-bold text-emerald-400">{character.traits.sociability}%</span>
          </div>
          <div className="bg-slate-800/40 p-2 rounded-lg border border-slate-700/40">
            <span className="text-slate-400 block">Cần cù, chăm chỉ</span>
            <span className="font-bold text-purple-400">{character.traits.diligence}%</span>
          </div>
        </div>
      </div>

    </div>
  );
};
