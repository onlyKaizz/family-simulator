import { useState, useEffect } from 'react';
import { useGameStore } from '../../store/gameStore';
import { PROVINCES } from '../../data/provinces';
import { ETHNICITIES } from '../../data/ethnicities';
import { Sparkles, Dices, Landmark, ChevronDown } from 'lucide-react';

export const StartScreen = () => {
  const { startNewLife, memorials, setActiveTab } = useGameStore();

  const [customName, setCustomName] = useState('');
  const [customGender, setCustomGender] = useState<'male' | 'female' | 'random'>('random');
  const [customProvince, setCustomProvince] = useState('');
  const [customEthnicity, setCustomEthnicity] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [vnBirths, setVnBirths] = useState(1);
  const [worldBirths, setWorldBirths] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setVnBirths(prev => prev + (Math.random() < 0.25 ? 1 : 0));
      setWorldBirths(prev => prev + Math.floor(Math.random() * 4) + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleStart = (isQuick = true) => {
    if (isQuick) {
      startNewLife();
    } else {
      startNewLife({
        customName: customName.trim() || undefined,
        customGender: customGender === 'random' ? undefined : customGender,
        customProvince: customProvince || undefined,
        customEthnicity: customEthnicity || undefined,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between py-10 px-4 max-w-3xl mx-auto text-center">
      
      {/* Header Logo */}
      <div className="space-y-3 pt-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-wide">
          <Sparkles className="w-3.5 h-3.5" /> Mô Phỏng Cuộc Đời Việt Nam Hiện Đại
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
          Kiếp <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">Nhân Sinh</span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Một lần sinh ra, vạn ngã rẽ. Bạn sẽ sống cuộc đời như thế nào giữa đất nước Việt Nam trăm nẻo phong ba và nghĩa tình?
        </p>
      </div>

      {/* Thẻ thống kê sinh ra theo thời gian thực */}
      <div className="grid grid-cols-2 gap-3 py-6 max-w-md mx-auto w-full">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-center">
          <span className="text-2xl font-black text-amber-400 font-mono">+{vnBirths}</span>
          <span className="block text-[11px] text-slate-400 mt-0.5">Em bé chào đời ở VN từ lúc bạn vào trang</span>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-center">
          <span className="text-2xl font-black text-sky-400 font-mono">+{worldBirths}</span>
          <span className="block text-[11px] text-slate-400 mt-0.5">Em bé chào đời trên thế giới</span>
        </div>
      </div>

      {/* Box bắt đầu cuộc đời */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md max-w-lg mx-auto w-full space-y-5">
        
        <button
          onClick={() => handleStart(true)}
          className="w-full py-4 px-6 rounded-2xl font-black text-base bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-xl shadow-amber-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5"
        >
          <Dices className="w-5 h-5 fill-current" />
          <span>Chào đời ngẫu nhiên (Số phận an bài)</span>
        </button>

        {/* Nút bật tùy chỉnh */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-xs text-slate-400 hover:text-amber-400 flex items-center justify-center gap-1 mx-auto transition"
        >
          <span>Tự chọn xuất phát điểm (Tên, Tỉnh thành, Dân tộc)</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
        </button>

        {/* Form tùy chọn xuất phát điểm */}
        {showAdvanced && (
          <div className="space-y-3.5 pt-3 border-t border-slate-800 text-left animate-in fade-in duration-200">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Họ và tên nhân vật</label>
              <input
                type="text"
                placeholder="Để trống nếu muốn quay ngẫu nhiên..."
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Giới tính sinh học</label>
                <select
                  value={customGender}
                  onChange={(e) => setCustomGender(e.target.value as any)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="random">🎲 Ngẫu nhiên</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Dân tộc (54 dân tộc)</label>
                <select
                  value={customEthnicity}
                  onChange={(e) => setCustomEthnicity(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="">🎲 Ngẫu nhiên theo dân số</option>
                  {ETHNICITIES.map(e => (
                    <option key={e.name} value={e.name}>{e.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Tỉnh / Thành phố sinh ra</label>
              <select
                value={customProvince}
                onChange={(e) => setCustomProvince(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="">🎲 Ngẫu nhiên theo dân số thực tế</option>
                {PROVINCES.map(p => (
                  <option key={p.name} value={p.name}>{p.name} ({p.region})</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => handleStart(false)}
              className="w-full py-3 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition"
            >
              Bắt đầu với hồ sơ này
            </button>
          </div>
        )}

      </div>

      {/* Footer & Đài tưởng niệm */}
      <div className="pt-6 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-900 mt-8">
        <span>© 2026 Kiếp Nhân Sinh • Dự án mã nguồn mở phục vụ học tập</span>
        {memorials.length > 0 && (
          <button
            onClick={() => setActiveTab('memorial')}
            className="flex items-center gap-1.5 text-amber-400/90 hover:text-amber-300 font-medium transition"
          >
            <Landmark className="w-3.5 h-3.5" /> Đài tưởng niệm ({memorials.length} cuộc đời)
          </button>
        )}
      </div>

    </div>
  );
};
