import { useState, useEffect } from 'react';
import { generate18yoCharacter, getAvailableBranches } from './engine/originGenerator';
import type { Character, PathBranchOption } from './types/game';
import { CharacterAvatar } from './components/avatar/CharacterAvatar';
import { ThemeSelectorModal } from './components/modals/ThemeSelectorModal';
import { getStoredTheme, applyTheme } from './utils/theme';
import { 
  RotateCcw, Palette, ArrowRight, GraduationCap, 
  Briefcase, Wrench, Plane, Shield, Store
} from 'lucide-react';

export function App() {
  const [character, setCharacter] = useState<Character>(() => generate18yoCharacter());
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(() => getStoredTheme());
  const [selectedBranch, setSelectedBranch] = useState<PathBranchOption | null>(null);
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);

  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  const handleReroll = () => {
    setCharacter(generate18yoCharacter());
    setSelectedBranch(null);
  };

  const branches = getAvailableBranches(character);

  const getBranchIcon = (cat: PathBranchOption['category']) => {
    switch (cat) {
      case 'university': return <GraduationCap className="w-5 h-5 text-sky-400" />;
      case 'vocational': return <Wrench className="w-5 h-5 text-amber-400" />;
      case 'work_now': return <Briefcase className="w-5 h-5 text-emerald-400" />;
      case 'export_labor': return <Plane className="w-5 h-5 text-purple-400" />;
      case 'military': return <Shield className="w-5 h-5 text-red-400" />;
      case 'family_business': return <Store className="w-5 h-5 text-orange-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1520] text-[#f2e8d5] flex flex-col justify-between selection:bg-amber-500/20 selection:text-amber-300">
      
      {/* Top Navigation */}
      <header className="border-b border-[#22394d] bg-[#0a1520]/95 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-slate-950 text-base shadow-md">
              M
            </div>
            <div>
              <h1 className="font-extrabold text-base sm:text-lg text-white tracking-wide">
                Làm Cha Mẹ
              </h1>
              <p className="text-[11px] text-slate-400">
                Mô phỏng gia đình Việt Nam · Bắt đầu từ tuổi 18
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setThemeModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#22394d] bg-[#102131] hover:border-amber-400/80 hover:text-white text-xs font-semibold transition cursor-pointer"
              title="Đổi màu sắc giao diện"
            >
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span>Giao diện</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center">
        
        {/* Starting Profile Card (.pcard) */}
        <div className="w-full max-w-xl bg-[#102131] border border-[#22394d] rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5 text-left transition-all">
          
          {/* Header Title */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400/90 block">
              MỘT LƯỢT MÔ PHỎNG CÓ THỂ BẮT ĐẦU NHƯ SAU
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-white mt-1">
              Hồ sơ xuất phát
            </h2>
          </div>

          {/* Profile Head */}
          <div className="flex items-center gap-4 py-1 border-b border-[#22394d]/80 pb-4">
            <CharacterAvatar character={character} size={68} />
            <div className="min-w-0">
              <h3 className="font-bold text-xl text-white truncate">
                {character.name}
              </h3>
              <p className="text-xs text-slate-300 mt-0.5 truncate">
                {character.gender === 'male' ? 'Nam thanh niên' : 'Nữ thanh niên'} · 18 tuổi · {character.province}
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {character.family.tier}
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Dân tộc {character.ethnicity}
                </span>
              </div>
            </div>
          </div>

          {/* Key Value Attribute Rows (.prow) */}
          <div className="space-y-0 text-xs border-b border-[#22394d]/80 divide-y divide-[#22394d]/60">
            
            {/* Nơi sinh */}
            <div className="grid grid-cols-[120px_1fr] gap-2.5 py-2.5 items-center">
              <span className="uppercase tracking-wider text-slate-400 font-bold text-[11px]">Nơi sinh</span>
              <span className="text-white font-medium">{character.province}</span>
            </div>

            {/* Gia đình */}
            <div className="grid grid-cols-[120px_1fr] gap-2.5 py-2.5 items-start">
              <span className="uppercase tracking-wider text-slate-400 font-bold text-[11px]">Gia đình</span>
              <div className="space-y-1">
                {character.family.parents.map(p => (
                  <p key={p.id} className="text-white font-medium">
                    <b className="text-amber-300">{p.role}:</b> {p.occupation} ({p.position}) · {p.workplace}
                  </p>
                ))}
              </div>
            </div>

            {/* Thu nhập nhà */}
            <div className="grid grid-cols-[120px_1fr] gap-2.5 py-2.5 items-start">
              <span className="uppercase tracking-wider text-slate-400 font-bold text-[11px]">Thu nhập nhà</span>
              <div>
                <p className="text-emerald-400 font-bold text-sm">
                  {(character.family.totalMonthlyIncome / 1e6).toLocaleString('vi-VN')} triệu đ/tháng
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {character.family.parents.map(p => `${p.role}: ${(p.monthlyIncome / 1e6).toFixed(1)} tr`).join(' · ')}
                  {character.family.debt > 0 && ` · Nợ: -${(character.family.debt / 1e6).toFixed(0)} triệu đ`}
                </p>
              </div>
            </div>

            {/* Bối cảnh gia đình */}
            <div className="grid grid-cols-[120px_1fr] gap-2.5 py-2.5 items-start">
              <span className="uppercase tracking-wider text-slate-400 font-bold text-[11px]">Bối cảnh</span>
              <span className="text-slate-200 leading-relaxed font-normal">
                {character.family.summaryText}
              </span>
            </div>

            {/* Học lực cấp 3 */}
            <div className="grid grid-cols-[120px_1fr] gap-2.5 py-2.5 items-start">
              <span className="uppercase tracking-wider text-slate-400 font-bold text-[11px]">Học lực cấp 3</span>
              <div>
                <span className="text-white font-bold">
                  Học lực {character.highSchool.academicTier}
                </span>
                <span className="text-slate-300 ml-1.5">
                  (Điểm thi tốt nghiệp: <b className="text-amber-300">{character.highSchool.graduationScore} đ</b> · {character.highSchool.subjectGroup})
                </span>
              </div>
            </div>

            {/* Năng khiếu */}
            <div className="grid grid-cols-[120px_1fr] gap-2.5 py-2.5 items-center">
              <span className="uppercase tracking-wider text-slate-400 font-bold text-[11px]">Năng khiếu</span>
              <span className="text-amber-300 font-bold">{character.talent}</span>
            </div>

          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={handleReroll}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border border-[#22394d] bg-[#17293b] hover:bg-[#1f374e] text-slate-200 text-xs font-bold transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-slate-400" />
              <span>Xuất phát điểm khác</span>
            </button>

            <button
              onClick={() => setIsBranchModalOpen(true)}
              className="w-full sm:w-auto flex-[1.4] flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Chọn ngã rẽ tuổi 18</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-[#22394d] py-4 text-center text-xs text-slate-400 px-4">
        Làm Cha Mẹ © 2026 · Mô phỏng hành trình hôn nhân & nuôi con trưởng thành
      </footer>

      {/* Modal: Quyết Định Ngã Rẽ Tuổi 18 */}
      {isBranchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-3xl bg-[#102131] border border-[#22394d] rounded-3xl p-5 sm:p-7 shadow-2xl flex flex-col gap-5 text-left max-h-[92vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#22394d]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                  Ngã Rẽ Sinh Tử Tuổi 18
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  Sau khi tốt nghiệp THPT, bạn sẽ bước tiếp con đường nào?
                </h3>
              </div>
              <button
                onClick={() => setIsBranchModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#17293b] transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* List of 6 Paths */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {branches.map(b => {
                const isSelected = selectedBranch?.id === b.id;
                return (
                  <div
                    key={b.id}
                    onClick={() => b.isAvailable && setSelectedBranch(b)}
                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                      !b.isAvailable 
                        ? 'opacity-50 border-slate-800 bg-[#0d1b29] cursor-not-allowed'
                        : isSelected
                        ? 'border-amber-400 bg-[#17293b] ring-2 ring-amber-400/40 shadow-lg cursor-pointer'
                        : 'border-[#22394d] bg-[#142333] hover:border-slate-500 cursor-pointer'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getBranchIcon(b.category)}
                          <h4 className="font-bold text-sm text-white">{b.title}</h4>
                        </div>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-xs font-bold">
                            ✓
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {b.description}
                      </p>
                    </div>

                    <div className="text-[11px] space-y-1 pt-2 border-t border-[#22394d]/60">
                      <p className="text-emerald-300">
                        <b>Ưu điểm:</b> {b.pros}
                      </p>
                      <p className="text-rose-300">
                        <b>Thách thức:</b> {b.cons}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Confirm CTA */}
            <div className="pt-3 border-t border-[#22394d] flex items-center justify-between">
              <span className="text-xs text-slate-400">
                {selectedBranch 
                  ? `Đã chọn: ${selectedBranch.title}`
                  : 'Vui lòng chọn 1 ngã rẽ để bắt đầu cuộc đời'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsBranchModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#22394d] text-slate-300 hover:text-white text-xs font-bold transition cursor-pointer"
                >
                  Quay lại
                </button>
                <button
                  disabled={!selectedBranch}
                  onClick={() => {
                    alert(`Bắt đầu hành trình với ngã rẽ: ${selectedBranch?.title}!`);
                    setIsBranchModalOpen(false);
                  }}
                  className={`px-5 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                    selectedBranch
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
                  }`}
                >
                  Xác nhận ngã rẽ ›
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Theme Selector Modal */}
      <ThemeSelectorModal
        isOpen={themeModalOpen}
        onClose={() => setThemeModalOpen(false)}
        currentTheme={currentTheme}
        onSelectTheme={setCurrentTheme}
      />

    </div>
  );
}

export default App;
