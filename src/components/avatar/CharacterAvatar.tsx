import React from 'react';
import type { Character } from '../../types/character';

interface AvatarProps {
  character: Character;
  size?: number;
}

export const CharacterAvatar: React.FC<AvatarProps> = ({ character, size = 120 }) => {
  const { age, gender, stats, alive } = character;
  const isMale = gender === 'male';

  // Nhóm tuổi
  const isBaby = age <= 3;
  const isChild = age > 3 && age <= 11;
  const isTeen = age > 11 && age <= 17;
  const isAdult = age > 17 && age <= 50;
  const isMiddleAge = age > 50 && age <= 65;
  const isSenior = age > 65;

  // Màu da & tóc
  const skinColor = !alive ? '#cbd5e1' : '#ffd7ba';
  const hairColor = isSenior ? '#e2e8f0' : isMiddleAge ? '#64748b' : '#1e1b18';

  // Cảm xúc theo Happiness
  const isHappy = stats.happiness >= 65;
  const isSad = stats.happiness < 40;

  return (
    <div 
      className="relative flex items-center justify-center rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/60 shadow-lg overflow-hidden group transition-all duration-300 hover:border-amber-500/50"
      style={{ width: size, height: size }}
    >
      <svg 
        viewBox="0 0 100 100" 
        width={size} 
        height={size}
        className="transition-transform duration-300 group-hover:scale-105"
      >
        {/* Nền quầng sáng */}
        <circle cx="50" cy="50" r="46" fill="rgba(255, 255, 255, 0.03)" />

        {/* 1. Phần tóc phía sau (cho nữ) */}
        {!isMale && !isBaby && (
          <path
            d={isSenior ? "M24,45 Q50,20 76,45 Q80,80 50,88 Q20,80 24,45 Z" : "M20,40 Q50,15 80,40 Q86,90 50,95 Q14,90 20,40 Z"}
            fill={hairColor}
          />
        )}

        {/* 2. Cổ & Vai áo */}
        <path d="M42,65 L58,65 L64,95 L36,95 Z" fill="#fca5a5" opacity="0.6" />
        {/* Áo */}
        <path
          d={
            isBaby 
              ? "M28,80 Q50,75 72,80 L76,100 L24,100 Z"
              : isChild 
                ? "M24,78 Q50,72 76,78 L80,100 L20,100 Z"
                : "M20,74 Q50,68 80,74 L86,100 L14,100 Z"
          }
          fill={
            isBaby ? "#38bdf8" : isTeen ? "#f8fafc" : isAdult ? (isMale ? "#3b82f6" : "#ec4899") : "#64748b"
          }
        />

        {/* Cà vạt hoặc khăn quàng đỏ (tuổi thiếu nhi / thiếu niên) */}
        {isChild && (
          <polygon points="50,72 45,95 50,100 55,95" fill="#ef4444" />
        )}
        {isTeen && isMale && (
          <polygon points="50,72 46,90 50,96 54,90" fill="#3b82f6" />
        )}

        {/* 3. Khuôn mặt */}
        <ellipse 
          cx="50" 
          cy={isBaby ? "48" : "46"} 
          rx={isBaby ? "24" : "21"} 
          ry={isBaby ? "24" : "25"} 
          fill={skinColor} 
        />

        {/* Má hồng (cho trẻ con hoặc nữ) */}
        {(isBaby || isChild || !isMale) && alive && (
          <>
            <circle cx="36" cy={isBaby ? "52" : "50"} r="4" fill="#fb7185" opacity="0.4" />
            <circle cx="64" cy={isBaby ? "52" : "50"} r="4" fill="#fb7185" opacity="0.4" />
          </>
        )}

        {/* 4. Tóc phía trước */}
        {isBaby ? (
          <path d="M48,24 Q50,16 54,20" stroke={hairColor} strokeWidth="3" strokeLinecap="round" fill="none" />
        ) : isMale ? (
          <path
            d="M28,40 Q32,20 50,20 Q68,20 72,40 Q62,28 50,30 Q38,28 28,40 Z"
            fill={hairColor}
          />
        ) : (
          <path
            d="M26,38 Q50,20 74,38 Q65,26 50,27 Q35,26 26,38 Z"
            fill={hairColor}
          />
        )}

        {/* 5. Mắt */}
        {alive ? (
          <>
            <circle cx="41" cy={isBaby ? "46" : "44"} r={isBaby ? "3.5" : "3"} fill="#1e293b" />
            <circle cx="59" cy={isBaby ? "46" : "44"} r={isBaby ? "3.5" : "3"} fill="#1e293b" />
            <circle cx="42" cy={isBaby ? "45" : "43"} r="1" fill="#ffffff" />
            <circle cx="60" cy={isBaby ? "45" : "43"} r="1" fill="#ffffff" />
          </>
        ) : (
          <>
            <path d="M38,44 L44,44" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
            <path d="M56,44 L62,44" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
          </>
        )}

        {/* Nếp nhăn người già */}
        {(isSenior || isMiddleAge) && (
          <>
            <path d="M44,28 Q50,26 56,28" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" fill="none" />
            <path d="M34,44 L31,43" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" />
            <path d="M66,44 L69,43" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" />
            <path d="M42,56 Q50,58 58,56" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" fill="none" />
          </>
        )}

        {/* Kính mắt cho người già */}
        {isSenior && (
          <>
            <circle cx="41" cy="44" r="7" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />
            <circle cx="59" cy="44" r="7" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />
            <line x1="48" y1="44" x2="52" y2="44" stroke="#cbd5e1" strokeWidth="1.5" />
          </>
        )}

        {/* 6. Miệng */}
        {isBaby ? (
          <ellipse cx="50" cy="55" rx="3" ry="4" fill="#e11d48" />
        ) : isHappy ? (
          <path d="M43,54 Q50,62 57,54" stroke="#b91c1c" strokeWidth="2" strokeLinecap="round" fill="none" />
        ) : isSad ? (
          <path d="M44,58 Q50,53 56,58" stroke="#64748b" strokeWidth="2" strokeLinecap="round" fill="none" />
        ) : (
          <line x1="45" y1="56" x2="55" y2="56" stroke="#b91c1c" strokeWidth="2" strokeLinecap="round" />
        )}
      </svg>

      {/* Huy hiệu tuổi */}
      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-slate-900/90 text-amber-400 border border-amber-500/30 shadow">
        {age} tuổi
      </span>
    </div>
  );
};
