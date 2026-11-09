import React from 'react';
import { THEMES, applyTheme } from '../../utils/theme';
import { X, Check, Palette, Sparkles } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: string;
  onSelectTheme: (themeId: string) => void;
}

export const ThemeSelectorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentTheme,
  onSelectTheme,
}) => {
  if (!isOpen) return null;

  const handleSelect = (themeId: string) => {
    applyTheme(themeId);
    onSelectTheme(themeId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#102131] border border-[#22394d] rounded-3xl p-5 sm:p-7 shadow-2xl flex flex-col gap-5 text-left max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#22394d]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                Bản Sắc Thị Giác
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                Bộ Sưu Tập Màu Web
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#17293b] transition cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Intro */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Chọn phong cách thị giác phù hợp với tâm trạng hoặc không gian trải nghiệm của bạn. Toàn bộ nền, thẻ, viền và chữ sẽ đổi màu ngay lập tức và được lưu lại trên thiết bị.
        </p>

        {/* Theme Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {THEMES.map((theme) => {
            const isSelected = currentTheme === theme.id;
            return (
              <div
                key={theme.id}
                onClick={() => handleSelect(theme.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative group flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'border-amber-400 ring-2 ring-amber-400/30 shadow-lg'
                    : 'border-[#22394d] hover:border-slate-500 hover:shadow-md'
                }`}
                style={{ backgroundColor: theme.colors.card }}
              >
                {/* Active Badge */}
                {isSelected && (
                  <span className="absolute top-3 right-3 flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 shadow">
                    <Check className="w-3 h-3 stroke-[3]" />
                    Đang dùng
                  </span>
                )}

                {/* Theme Name & Subtitle */}
                <div>
                  <h3
                    className="font-extrabold text-base"
                    style={{ color: theme.colors.text }}
                  >
                    {theme.name}
                  </h3>
                  <p
                    className="text-xs font-semibold mt-0.5 opacity-80"
                    style={{ color: theme.colors.accent }}
                  >
                    {theme.subtitle}
                  </p>
                </div>

                {/* Theme Description */}
                <p
                  className="text-xs leading-relaxed opacity-75 line-clamp-2"
                  style={{ color: theme.colors.text }}
                >
                  {theme.description}
                </p>

                {/* Color Palette Preview Swatches */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-5 h-5 rounded-full border border-black/20 shadow-sm"
                      style={{ backgroundColor: theme.colors.bg }}
                      title="Màu nền"
                    />
                    <span
                      className="w-5 h-5 rounded-full border border-black/20 shadow-sm"
                      style={{ backgroundColor: theme.colors.card }}
                      title="Màu thẻ"
                    />
                    <span
                      className="w-5 h-5 rounded-full border border-black/20 shadow-sm"
                      style={{ backgroundColor: theme.colors.accent }}
                      title="Điểm nhấn"
                    />
                    <span
                      className="w-5 h-5 rounded-full border border-black/20 shadow-sm flex items-center justify-center text-[9px] font-bold"
                      style={{
                        backgroundColor: theme.colors.text,
                        color: theme.colors.bg,
                      }}
                      title="Màu chữ"
                    >
                      A
                    </span>
                  </div>

                  <span
                    className="text-[11px] font-semibold flex items-center gap-1 group-hover:underline"
                    style={{ color: theme.colors.accent }}
                  >
                    {isSelected ? '✓ Đang kích hoạt' : 'Chọn giao diện ›'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="pt-3 border-t border-[#22394d] flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Có thể đổi chủ đề bất cứ lúc nào trong quá trình trải nghiệm
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition cursor-pointer"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
};
