import { useGameStore } from '../../store/gameStore';
import { GraduationCap, Briefcase, TrendingUp, AlertCircle } from 'lucide-react';

export const CareerPanel = () => {
  const { character } = useGameStore();

  if (!character) return null;

  return (
    <div className="space-y-4 text-left pb-8">
      
      {/* Học vấn */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
        <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
          <GraduationCap className="w-4 h-4" /> Học Vấn & Bằng Cấp
        </h3>
        <div className="bg-slate-800/40 p-3.5 rounded-xl border border-slate-700/40 space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-100 text-sm">
              Trình độ: {character.education.level}
            </span>
            {character.education.gpa > 0 && (
              <span className="bg-amber-500/10 text-amber-400 font-bold px-2 py-0.5 rounded border border-amber-500/20">
                GPA: {character.education.gpa} / 10
              </span>
            )}
          </div>
          {character.education.schoolName && (
            <p className="text-slate-300">
              Trường: <span className="font-semibold text-white">{character.education.schoolName}</span>
            </p>
          )}
          {character.education.major && (
            <p className="text-slate-400">
              Chuyên ngành: <span className="text-slate-200">{character.education.major}</span>
            </p>
          )}
        </div>
      </div>

      {/* Công việc & Sự nghiệp */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
        <h3 className="text-sm font-bold text-sky-400 flex items-center gap-2">
          <Briefcase className="w-4 h-4" /> Nghề Nghiệp & Vị Trí
        </h3>

        {character.job ? (
          <div className="space-y-3">
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/40 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-white">{character.job.title}</h4>
                  <span className="text-slate-400">Lĩnh vực: {character.job.field}</span>
                </div>
                <div className="text-right">
                  <span className="text-base font-bold text-emerald-400 block">
                    {(character.job.monthlySalary / 1e6).toFixed(1)} tr đ
                  </span>
                  <span className="text-[11px] text-slate-400">mỗi tháng</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-700/40 text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
                  Kinh nghiệm: <b>{character.job.experienceYears} năm</b>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                  Áp lực công việc: <b>{character.job.stress}%</b>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-xs text-sky-300">
              💡 <b>Mẹo:</b> Điểm <i>Trí tuệ</i> và <i>Ý chí phấn đấu</i> càng cao, bạn càng có nhiều cơ hội được cất nhắc lên các vị trí Trưởng phòng, Giám đốc hoặc tăng lương.
            </div>
          </div>
        ) : (
          <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700/30 text-center text-xs text-slate-400 space-y-1">
            <p className="font-medium text-slate-300">Hiện tại bạn chưa có việc làm chính thức.</p>
            <p>Khi đạt 18 hoặc 22 tuổi, bạn sẽ có các ngã rẽ học tập, xuất khẩu lao động hoặc ứng tuyển việc làm.</p>
          </div>
        )}
      </div>

    </div>
  );
};
