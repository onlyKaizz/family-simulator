import { useState, useEffect } from 'react';
import { generate18yoCharacter, getAvailableBranches } from './engine/originGenerator';
import type { Character, Gender, PathBranchOption } from './types/game';
import type { FilterCategory } from './data/parentsData';
import { CharacterAvatar } from './components/avatar/CharacterAvatar';
import { ThemeSelectorModal } from './components/modals/ThemeSelectorModal';
import { getStoredTheme, applyTheme } from './utils/theme';
import { 
  RotateCcw, Palette, GraduationCap, 
  Briefcase, Wrench, Plane, Shield, Store
} from 'lucide-react';

export function App() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [selectedGender, setSelectedGender] = useState<Gender | 'random'>('random');
  const [character, setCharacter] = useState<Character>(() => 
    generate18yoCharacter({ filterOption: 'all' })
  );
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(() => getStoredTheme());
  const [selectedBranch, setSelectedBranch] = useState<PathBranchOption | null>(null);
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);

  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  const handleReroll = (filter = activeFilter, gender = selectedGender) => {
    const preferredGender = gender === 'random' ? undefined : gender;
    setCharacter(generate18yoCharacter({ filterOption: filter, preferredGender }));
    setSelectedBranch(null);
  };

  const handleSelectFilter = (filter: FilterCategory) => {
    const nextFilter = activeFilter === filter ? 'all' : filter;
    setActiveFilter(nextFilter);
    handleReroll(nextFilter, selectedGender);
  };

  const handleGenderChange = (gender: Gender | 'random') => {
    setSelectedGender(gender);
    handleReroll(activeFilter, gender);
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

  // Format concise parents summary like in reference screenshot
  const familySummary = character.family.parents
    .map(p => `${p.role} ${p.occupation}`)
    .join(' · ');

  return (
    <div className="min-h-screen bg-[#07131e] text-[#f2e8d5] flex flex-col justify-between selection:bg-amber-500/20 selection:text-amber-300">
      
      {/* Top Header */}
      <header className="border-b border-[#1b2f42] bg-[#07131e]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-slate-950 text-sm shadow">
              M
            </div>
            <div>
              <h1 className="font-extrabold text-sm sm:text-base text-white tracking-wide">
                Làm Cha Mẹ
              </h1>
              <p className="text-[10px] text-slate-400">
                Mô phỏng gia đình Việt Nam · Bắt đầu tuổi 18
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Gender Switch */}
            <div className="flex items-center bg-[#0d1d2c] border border-[#1b2f42] rounded-xl p-0.5 text-xs font-semibold">
              <button
                onClick={() => handleGenderChange('random')}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  selectedGender === 'random' ? 'bg-[#1e3b56] text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Ngẫu nhiên
              </button>
              <button
                onClick={() => handleGenderChange('male')}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  selectedGender === 'male' ? 'bg-sky-500/30 text-sky-300 border border-sky-500/40' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                ♂ Nam
              </button>
              <button
                onClick={() => handleGenderChange('female')}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  selectedGender === 'female' ? 'bg-pink-500/30 text-pink-300 border border-pink-500/40' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                ♀ Nữ
              </button>
            </div>

            <button
              onClick={() => setThemeModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl border border-[#1b2f42] bg-[#0d1d2c] hover:border-amber-400/80 hover:text-white text-xs font-semibold transition cursor-pointer"
              title="Đổi chủ đề màu sắc"
            >
              <Palette className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-4xl mx-auto p-4 sm:p-6 flex flex-col items-center justify-center">
        
        {/* Profile Card Container (matching reference image) */}
        <div className="w-full max-w-lg bg-[#0e1d2c] border border-[#1b3145] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 text-left">
          
          {/* Header Subtitle */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#d89745] block">
              MỘT LƯỢT MÔ PHỎNG CÓ THỂ BẮT ĐẦU NHƯ SAU
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#f7f4ee] mt-1 tracking-tight">
              Hồ sơ xuất phát
            </h2>
          </div>

          {/* Profile Header (Avatar + Name + Subtitle) */}
          <div className="flex items-center gap-4 py-2 border-b border-[#1b3145]/80 pb-5">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#152a3d] border border-[#27445f] flex-shrink-0 flex items-center justify-center shadow-inner">
              <CharacterAvatar character={character} size={64} />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-xl sm:text-2xl text-white truncate">
                {character.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#87a5be] mt-0.5 truncate font-medium">
                {character.gender === 'male' ? 'Nam thanh niên' : 'Nữ thanh niên'} · {character.province} · Việt Nam
              </p>
            </div>
          </div>

          {/* Attribute Rows Table */}
          <div className="space-y-0 text-xs sm:text-[13px] border-b border-[#1b3145]/80 divide-y divide-[#1b3145]/60">
            
            {/* NƠI SINH */}
            <div className="grid grid-cols-[130px_1fr] sm:grid-cols-[140px_1fr] gap-3 py-3 items-center">
              <span className="uppercase tracking-wider text-[#6b859b] font-bold text-[11px]">
                NƠI SINH
              </span>
              <span className="text-white font-medium">
                {character.province} · Việt Nam
              </span>
            </div>

            {/* GIA ĐÌNH */}
            <div className="grid grid-cols-[130px_1fr] sm:grid-cols-[140px_1fr] gap-3 py-3 items-start">
              <span className="uppercase tracking-wider text-[#6b859b] font-bold text-[11px]">
                GIA ĐÌNH
              </span>
              <span className="text-white font-medium leading-relaxed">
                {familySummary}
              </span>
            </div>

            {/* THU NHẬP NHÀ */}
            <div className="grid grid-cols-[130px_1fr] sm:grid-cols-[140px_1fr] gap-3 py-3 items-start">
              <span className="uppercase tracking-wider text-[#6b859b] font-bold text-[11px]">
                THU NHẬP NHÀ
              </span>
              <div>
                <p className="text-white font-bold text-sm sm:text-base">
                  {(character.family.totalMonthlyIncome).toLocaleString('vi-VN')} đ/tháng
                </p>
                <p className="text-[11px] text-[#7d98ae] mt-0.5">
                  {character.family.parents.map(p => `${p.role.toLowerCase()} ${(p.monthlyIncome).toLocaleString('vi-VN')} đ`).join(' · ')}
                  {character.family.debt > 0 && ` · Nợ: -${(character.family.debt / 1e6).toFixed(0)} triệu đ`}
                </p>
              </div>
            </div>

            {/* BỐI CẢNH GIA ĐÌNH */}
            <div className="grid grid-cols-[130px_1fr] sm:grid-cols-[140px_1fr] gap-3 py-3 items-start">
              <span className="uppercase tracking-wider text-[#6b859b] font-bold text-[11px]">
                BỐI CẢNH GIA ĐÌNH
              </span>
              <p className="text-[#e2edf5] font-medium leading-relaxed">
                {character.family.summaryText}
              </p>
            </div>

            {/* NĂNG KHIẾU */}
            <div className="grid grid-cols-[130px_1fr] sm:grid-cols-[140px_1fr] gap-3 py-3 items-center">
              <span className="uppercase tracking-wider text-[#6b859b] font-bold text-[11px]">
                NĂNG KHIẾU
              </span>
              <span className="text-white font-bold">
                {character.talent}
              </span>
            </div>

          </div>

          {/* Filter Pill Buttons (matching the screenshot pills) */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              onClick={() => handleSelectFilter('richest')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer ${
                activeFilter === 'richest'
                  ? 'border-amber-400 bg-amber-400/20 text-amber-300'
                  : 'border-[#223d54] bg-[#0c1824] text-slate-300 hover:border-slate-500'
              }`}
            >
              Gia đình giàu nhất
            </button>

            <button
              onClick={() => handleSelectFilter('rural')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer ${
                activeFilter === 'rural'
                  ? 'border-amber-400 bg-amber-400/20 text-amber-300'
                  : 'border-[#223d54] bg-[#0c1824] text-slate-300 hover:border-slate-500'
              }`}
            >
              Nông thôn
            </button>

            <button
              onClick={() => handleSelectFilter('urban')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer ${
                activeFilter === 'urban'
                  ? 'border-amber-400 bg-amber-400/20 text-amber-300'
                  : 'border-[#223d54] bg-[#0c1824] text-slate-300 hover:border-slate-500'
              }`}
            >
              Thành thị
            </button>

            <button
              onClick={() => handleSelectFilter('genius')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer ${
                activeFilter === 'genius'
                  ? 'border-amber-400 bg-amber-400/20 text-amber-300'
                  : 'border-[#223d54] bg-[#0c1824] text-slate-300 hover:border-slate-500'
              }`}
            >
              Học bá xuất chúng
            </button>

            <button
              onClick={() => handleSelectFilter('poor')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer ${
                activeFilter === 'poor'
                  ? 'border-amber-400 bg-amber-400/20 text-amber-300'
                  : 'border-[#223d54] bg-[#0c1824] text-slate-300 hover:border-slate-500'
              }`}
            >
              Vượt khó nợ nần
            </button>
          </div>

          {/* Action Buttons (Xuất phát điểm khác & Sống đời này) */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => handleReroll()}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border border-[#233f57] bg-[#10202e] hover:bg-[#162a3d] text-slate-200 text-xs sm:text-sm font-semibold transition cursor-pointer shadow"
            >
              <RotateCcw className="w-4 h-4 text-slate-400" />
              <span>Xuất phát điểm khác</span>
            </button>

            <button
              onClick={() => setIsBranchModalOpen(true)}
              className="flex-[1.2] flex items-center justify-center py-3 px-6 rounded-2xl bg-gradient-to-r from-[#e7b169] to-[#d89745] hover:from-[#f0be79] hover:to-[#e0a050] text-[#1c1308] font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Sống đời này</span>
            </button>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-[#1b2f42] py-3 text-center text-[11px] text-slate-400 px-4">
        Làm Cha Mẹ © 2026 · Mô phỏng hành trình hôn nhân & nuôi con trưởng thành
      </footer>

      {/* Modal: Quyết Định Ngã Rẽ Tuổi 18 */}
      {isBranchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-3xl bg-[#0e1d2c] border border-[#1b3145] rounded-3xl p-5 sm:p-7 shadow-2xl flex flex-col gap-5 text-left max-h-[92vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#1b3145]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#d89745] block">
                  Ngã Rẽ Sinh Tử Tuổi 18 · {character.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  Sau khi tốt nghiệp THPT, bạn sẽ bước tiếp con đường nào?
                </h3>
              </div>
              <button
                onClick={() => setIsBranchModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#162a3d] transition cursor-pointer"
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
                        ? 'opacity-50 border-slate-800 bg-[#091522] cursor-not-allowed'
                        : isSelected
                        ? 'border-amber-400 bg-[#162a3d] ring-2 ring-amber-400/40 shadow-lg cursor-pointer'
                        : 'border-[#1b3145] bg-[#112335] hover:border-slate-500 cursor-pointer'
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

                    <div className="text-[11px] space-y-1 pt-2 border-t border-[#1b3145]/60">
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
            <div className="pt-3 border-t border-[#1b3145] flex items-center justify-between">
              <span className="text-xs text-slate-400">
                {selectedBranch 
                  ? `Đã chọn: ${selectedBranch.title}`
                  : 'Vui lòng chọn 1 ngã rẽ để bắt đầu cuộc đời'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsBranchModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#1b3145] text-slate-300 hover:text-white text-xs font-bold transition cursor-pointer"
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
