import React, { useState, useEffect } from 'react';
import type { Character } from '../../types/game';

interface AvatarProps {
  character: Character;
  size?: number;
  className?: string;
  allowToggle?: boolean;
}

// Hàm băm tạo số ngẫu nhiên giả định (deterministic PRNG) dựa trên thông tin nhân vật
function getCharacterSeed(char: Character): number {
  const str = `${char.id || ''}_${char.name}_${char.birthYear}_${char.gender}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function rnd(seed: number, offset: number): number {
  const x = Math.sin((seed + offset * 7919) * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export const CharacterAvatar: React.FC<AvatarProps> = ({
  character,
  size = 64,
  className = '',
  allowToggle = true,
}) => {
  // Phong cách: 'anime' (Chân dung 2D nghệ thuật - mặc định) hoặc 'pixel' (Retro 16x16 web gốc)
  const [styleMode, setStyleMode] = useState<'anime' | 'pixel'>('anime');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('kns_avatar_style');
      if (saved === 'anime' || saved === 'pixel') {
        setStyleMode(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleStyle = (e: React.MouseEvent) => {
    if (!allowToggle) return;
    e.stopPropagation();
    const next = styleMode === 'anime' ? 'pixel' : 'anime';
    setStyleMode(next);
    try {
      localStorage.setItem('kns_avatar_style', next);
    } catch {
      // ignore
    }
  };

  const seed = getCharacterSeed(character);
  const age = character.age;
  const isFemale = character.gender === 'female';
  const isBaby = age < 2;
  const isChild = age >= 2 && age < 12;
  const isElder = age >= 60;
  const isVeryOld = age >= 75;
  const isAlive = character.alive;
  const happiness = character.stats?.happiness ?? 65;

  // 1. Màu da & Màu tóc
  const skinPalette = ['#f3d1b0', '#ebbf9d', '#f8d9be', '#dfad89', '#eed6c4'];
  const skinColor = isAlive ? skinPalette[Math.floor(rnd(seed, 11) * skinPalette.length)] : '#94a3b8';

  const hairColor = isVeryOld
    ? '#d9dddf'
    : isElder
    ? '#a2a6ad'
    : ['#242024', '#2c221e', '#3a2d27', '#1f1d22', '#352820'][
        Math.floor(rnd(seed, 21) * 5)
      ];

  // 2. Trang phục theo nghề nghiệp & học vấn
  const jobId = character.job?.id || '';
  const jobField = character.job?.field || '';
  const inJail =
    character.flags?.inJailUntil && character.flags.inJailUntil > age;
  const isStudent = age >= 6 && age < 18;

  let outfitColor = '#3b4d6b';
  let hasStripes = false;
  let hasTie = false;
  let hasRedScarf = false;
  let hasStethoscope = false;
  let hasApron = false;
  let hasCap = false;
  let capColor = '#243c32';

  if (inJail) {
    outfitColor = '#54657a';
    hasStripes = true;
  } else if (isStudent) {
    outfitColor = '#f1f5f9';
    hasRedScarf = age <= 14;
  } else if (jobId.includes('cong_an') || jobId.includes('canh_sat')) {
    outfitColor = '#2d4a3e';
    hasCap = true;
    capColor = '#1e382b';
  } else if (
    jobId.includes('quan_doi') ||
    jobId.includes('bo_doi') ||
    jobId.includes('si_quan')
  ) {
    outfitColor = '#3d4d33';
    hasCap = true;
    capColor = '#2d3b24';
  } else if (
    jobField.includes('Y tế') ||
    jobId.includes('bac_si') ||
    jobId.includes('duoc_si') ||
    jobId.includes('dieu_duong')
  ) {
    outfitColor = '#f8fafc';
    hasStethoscope = true;
  } else if (
    jobField.includes('Tài chính') ||
    jobField.includes('Kinh doanh') ||
    jobField.includes('Văn phòng') ||
    jobId.includes('giam_doc') ||
    jobId.includes('quan_ly')
  ) {
    outfitColor = '#2a3b53';
    hasTie = true;
  } else if (
    jobId.includes('barista') ||
    jobId.includes('dau_bep') ||
    jobId.includes('phuc_vu')
  ) {
    outfitColor = '#475569';
    hasApron = true;
  } else {
    const defaultColors = [
      '#334155',
      '#475569',
      '#1e3a5f',
      '#3f3956',
      '#5c3d4e',
      '#234e4a',
      '#63472c',
    ];
    outfitColor = defaultColors[Math.floor(rnd(seed, 33) * defaultColors.length)];
  }

  // Id cho gradient của từng nhân vật
  const gradId = `pgrad-${seed % 100000}`;

  return (
    <div
      onClick={toggleStyle}
      title={
        allowToggle
          ? `Nhấp để chuyển đổi phong cách avatar (${styleMode === 'anime' ? 'Anime 2D' : 'Pixel Art'})`
          : undefined
      }
      className={`relative flex items-center justify-center shrink-0 rounded-2xl bg-[#141e2b] border border-[#273e56] shadow-md overflow-hidden select-none transition-all duration-300 hover:border-amber-400/60 ${
        allowToggle ? 'cursor-pointer group' : ''
      } ${className}`}
      style={{ width: size, height: size }}
    >
      {styleMode === 'anime' ? (
        /* ============================================================ */
        /* PHONG CÁCH ANIME 2D NGHỆ THUẬT (160x160 Geometric Precision) */
        /* ============================================================ */
        <svg
          viewBox="0 0 160 160"
          width={size}
          height={size}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          shapeRendering="geometricPrecision"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#435574" />
              <stop offset="55%" stopColor="#37364f" />
              <stop offset="100%" stopColor="#b47d84" />
            </linearGradient>
          </defs>

          {/* Nền phong cảnh hoàng hôn / thiên thể */}
          <rect x="0" y="0" width="160" height="160" fill={`url(#${gradId})`} />

          {/* Quầng sáng dịu nhẹ */}
          <ellipse cx="126" cy="26" rx="52" ry="52" fill="#d4c79f" opacity="0.08" />
          <ellipse cx="26" cy="152" rx="62" ry="46" fill="#6c9b9c" opacity="0.12" />

          {/* Bụi ánh sáng lấp lánh (bokeh particles) */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <circle
              key={i}
              cx={rnd(seed, i + 710) * 160}
              cy={rnd(seed, i + 730) * 130}
              r={1.5 + rnd(seed, i + 750) * 3.5}
              fill="#ffe6bd"
              opacity="0.16"
            />
          ))}

          {/* Bóng mờ nền đáy */}
          <path d="M0 156 Q80 100 160 125 L160 160 H0 Z" fill="#dcc2bc" opacity="0.08" />

          {/* Thân & Trang phục */}
          {isBaby ? (
            /* Em bé trong tã cuốn ấm áp */
            <g>
              <path
                d="M34 157 Q27 119 56 105 Q79 91 106 109 Q133 123 126 160 Z"
                fill="#f1e3c8"
              />
              <path
                d="M40 124 Q82 135 118 113 M48 151 Q86 155 122 132"
                fill="none"
                stroke="#d8c6a7"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
          ) : (
            /* Trẻ em / Thiếu niên / Người lớn / Người già */
            <g>
              {/* Thân áo */}
              <path
                d="M24 160 L27 130 Q33 108 62 104 L98 104 Q128 108 133 130 L137 160 Z"
                fill={outfitColor}
              />
              {/* Bóng sườn trái */}
              <path
                d="M28 159 L34 130 Q42 116 60 111 L65 160 Z"
                fill="#1d263f"
                opacity="0.22"
              />
              {/* Nếp áo sáng vai phải */}
              <path
                d="M99 110 Q116 114 126 130 L130 159"
                fill="none"
                stroke="#fff0d5"
                strokeWidth="2.5"
                opacity="0.3"
                strokeLinecap="round"
              />
              {/* Cổ áo trắng / V-neck */}
              <path
                d="M63 105 L80 124 L97 105"
                fill="none"
                stroke="#fff5e8"
                strokeWidth="3"
                opacity="0.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Đường chỉ nếp vải */}
              <path
                d="M38 144 L48 133 M117 142 L110 132 M69 151 L70 136"
                fill="none"
                stroke="#25253d"
                strokeWidth="1"
                opacity="0.3"
                strokeLinecap="round"
              />

              {/* Cà vạt (doanh nhân/công sở) */}
              {hasTie && (
                <path
                  d="M77 121 L83 121 L87 151 L80 158 L73 151 Z"
                  fill="#d97706"
                />
              )}

              {/* Tạp dề */}
              {hasApron && (
                <g>
                  <path
                    d="M52 111 L60 111 L61 128 L100 128 L102 111 L110 114 L112 160 L49 160 Z"
                    fill="#334155"
                  />
                  <line
                    x1="66"
                    y1="145"
                    x2="96"
                    y2="145"
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                  />
                </g>
              )}

              {/* Khăn quàng đỏ học sinh */}
              {hasRedScarf && (
                <path
                  d="M60 109 L80 124 L100 109 L88 128 L89 147 L79 141 L75 126 Z"
                  fill="#dc2626"
                />
              )}

              {/* Ống nghe y tế */}
              {hasStethoscope && (
                <g>
                  <path
                    d="M59 112 L59 136 Q59 147 71 147 Q82 147 82 135 L82 115 M82 135 Q84 152 101 144"
                    fill="none"
                    stroke="#64748b"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="102" cy="144" r="3.5" fill="#94a3b8" />
                </g>
              )}

              {/* Áo tù sọc kẻ */}
              {hasStripes && (
                <path
                  d="M30 136 L130 136 M26 151 L135 151"
                  stroke="#e2e8f0"
                  strokeWidth="5"
                  opacity="0.65"
                />
              )}
            </g>
          )}

          {/* Đầu nhân vật (Anime Head) */}
          <g
            transform={`translate(80, ${isBaby ? 65 : isChild ? 68 : 61}) scale(${
              isBaby ? 1.03 : isChild ? 1.02 : 1.12
            })`}
          >
            {/* Tóc sau (cho nữ từ 3 tuổi trở lên) */}
            {isFemale && !isBaby && (
              <g>
                <path
                  d="M-24-7 Q-29-36-4-37 Q25-38 28-9 L30 37 L21 31 L17 43 Q0 37-21 43 L-26 32 L-31 37 Z"
                  fill={hairColor}
                  stroke="#343044"
                  strokeWidth="0.8"
                  strokeLinejoin="round"
                />
                <path
                  d="M-23-7 Q-26 17-21 32 M22-7 Q27 20 22 34"
                  fill="none"
                  stroke="#d9c8d9"
                  strokeWidth="1.1"
                  opacity="0.2"
                  strokeLinecap="round"
                />
              </g>
            )}

            {/* Cổ */}
            <path
              d="M-7 17 L-7 36 Q0 41 7 36 L7 17 Z"
              fill={skinColor}
              stroke="#343044"
              strokeWidth="0.65"
              strokeLinejoin="round"
            />
            {/* Bóng cổ */}
            <path
              d="M-7 23 Q0 32 7 23 L7 29 Q0 35-7 29 Z"
              fill="#a65d65"
              opacity="0.22"
            />

            {/* Tai trái & Tai phải */}
            <ellipse
              cx="-20"
              cy="4"
              rx="4"
              ry="6"
              fill={skinColor}
              stroke="#343044"
              strokeWidth="0.65"
            />
            <ellipse
              cx="20"
              cy="4"
              rx="4"
              ry="6"
              fill={skinColor}
              stroke="#343044"
              strokeWidth="0.65"
            />

            {/* Khuôn mặt */}
            {isBaby ? (
              <path
                d="M-20-11 Q0-34 20-11 L20 10 Q18 28 0 29 Q-18 28-20 10 Z"
                fill={skinColor}
                stroke="#343044"
                strokeWidth="0.8"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d="M-21-12 C-18-34 18-34 21-12 L20 8 Q18 19 9 25 L0 31 L-9 25 Q-18 19-20 8 Z"
                fill={skinColor}
                stroke="#343044"
                strokeWidth="0.8"
                strokeLinejoin="round"
              />
            )}

            {/* Đổ bóng cằm má */}
            <path
              d="M16-15 Q25 2 17 16 L0 31 L8 23 Q17 13 15 5 Z"
              fill="#bd7f80"
              opacity="0.18"
            />
            <path
              d="M-13-15 Q-4-24 9-18"
              fill="none"
              stroke="#fff5dc"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.3"
            />

            {/* Đôi mắt Anime có chiều sâu & phản quang */}
            {[-1, 1].map((sign) => {
              const eyeSize = isElder ? 3.5 : isBaby ? 5 : isFemale ? 6.5 : 5.3;
              return (
                <g
                  key={sign}
                  className="anime-eye"
                  transform={`translate(${sign * 9.5}, 4) scale(${sign}, 1)`}
                >
                  {/* Tròng trắng */}
                  <path
                    d={`M-5-1 Q0-${eyeSize + 3} 6-1 Q4 ${eyeSize + 3}-2 ${eyeSize} Q-5 3-5-1 Z`}
                    fill="#fff8f0"
                    stroke="#343044"
                    strokeWidth="0.5"
                    strokeLinejoin="round"
                  />
                  {/* Lớp tròng mắt chính */}
                  <ellipse cx="0.3" cy="0.7" rx="3.4" ry={eyeSize} fill="#3b4d6b" />
                  <ellipse
                    cx="0.3"
                    cy="2.6"
                    rx="2.8"
                    ry={Math.max(1, eyeSize - 2)}
                    fill="#85a3b5"
                  />
                  {/* Con ngươi */}
                  <ellipse
                    cx="0.3"
                    cy="-0.2"
                    rx="1.5"
                    ry={Math.max(2, eyeSize - 1)}
                    fill="#1e2033"
                  />
                  {/* Điểm sáng trắng chính (specular highlight) */}
                  <ellipse cx="-1" cy="-1.7" rx="1.25" ry="1.7" fill="#ffffff" />
                  {/* Điểm phản xạ vàng dịu phía dưới */}
                  <ellipse cx="1.9" cy="3" rx="0.7" ry="0.8" fill="#fff4d6" />
                  {/* Mi mắt trên & viền */}
                  <path
                    d={`M-6-1 Q0-${eyeSize + 3.5} 6-1 L8-3 M-4 ${eyeSize - 1} Q1 ${eyeSize + 2} 5 2`}
                    fill="none"
                    stroke="#343044"
                    strokeWidth={isFemale ? 1.4 : 1.1}
                    strokeLinecap="round"
                  />
                  {/* Đuôi mi mắt cong cho phái nữ */}
                  {isFemale && (
                    <path
                      d="M5-3 L7-5 M3-4 L4-6"
                      fill="none"
                      stroke="#343044"
                      strokeWidth="0.8"
                      strokeLinecap="round"
                    />
                  )}
                  {/* Lông mày */}
                  <path
                    d={`M-5-${eyeSize + 5} Q0-${eyeSize + 7} 5-${eyeSize + 4}`}
                    fill="none"
                    stroke={hairColor}
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </g>
              );
            })}

            {/* Má hồng (blush) */}
            <ellipse cx="-14" cy="13" rx="4.7" ry="2.6" fill="#f472b6" opacity="0.3" />
            <ellipse cx="14" cy="13" rx="4.7" ry="2.6" fill="#f472b6" opacity="0.3" />

            {/* Mũi anime nhỏ gọn */}
            <path
              d="M1 10 L-1 15 L2 15"
              fill="none"
              stroke="#aa6d74"
              strokeWidth="0.65"
              strokeLinecap="round"
            />

            {/* Miệng & Nụ cười phản ánh Hạnh phúc */}
            {happiness < 35 ? (
              <path
                d="M-4 22 Q0 19 4 22"
                fill="none"
                stroke="#975167"
                strokeWidth="1.1"
                strokeLinecap="round"
              />
            ) : happiness < 60 ? (
              <path
                d="M-3 21 Q0 22 3 21"
                fill="none"
                stroke="#975167"
                strokeWidth="1.1"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M-4 20 Q0 24 5 19"
                fill="none"
                stroke="#975167"
                strokeWidth="1.1"
                strokeLinecap="round"
              />
            )}
            {/* Điểm bóng môi */}
            <path
              d="M-2 24 L2 24"
              fill="none"
              stroke="#fff1df"
              strokeWidth="0.65"
              opacity="0.6"
              strokeLinecap="round"
            />

            {/* Tóc trước (Hairstyle) */}
            {isBaby ? (
              /* Lọn tóc tơ mềm mại của em bé */
              <path
                d="M-10-23 Q-12-35-1-33 Q8-32 3-25 Q-2-31-4-25 M1-30 Q15-36 17-23"
                fill="none"
                stroke={hairColor}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            ) : isFemale ? (
              /* Mái tóc nữ sinh động */
              <g>
                <path
                  d="M-24 4 Q-30-21-18-31 Q-6-42 13-33 Q31-29 25 3 L19-8 L16-21 Q11-8 5-5 L7-21 Q-1-8-8-4 L-5-20 Q-13-8-19-3 L-19-15 Z"
                  fill={hairColor}
                  stroke="#343044"
                  strokeWidth="0.8"
                  strokeLinejoin="round"
                />
                <path
                  d="M-19-22 Q-12-32 2-32 M5-31 Q16-30 20-20 M-17-19 L-13-23 M8-25 L5-19"
                  fill="none"
                  stroke="#d4c1d6"
                  strokeWidth="1.7"
                  opacity="0.25"
                  strokeLinecap="round"
                />
                <path
                  d="M-20-12 L-19-5 M21-12 L22-5"
                  fill="none"
                  stroke="#fff1da"
                  strokeWidth="0.8"
                  opacity="0.28"
                  strokeLinecap="round"
                />
              </g>
            ) : (
              /* Mái tóc nam cá tính, phân lớp */
              <g>
                <path
                  d="M-23 1 L-26-13 L-23-25 L-28-29 L-15-29 L-17-36 L-4-32 L4-39 L10-33 Q29-33 25-13 L21 4 L17-11 L12-21 L12-8 L3-17 L-2-8 L-10-16 L-18 2 L-18-13 Z"
                  fill={hairColor}
                  stroke="#343044"
                  strokeWidth="0.8"
                  strokeLinejoin="round"
                />
                <path
                  d="M-18-24 L-8-28 L-3-26 M2-30 L9-28 L17-23 M-11-22 L-7-20 M13-20 L17-16"
                  fill="none"
                  stroke="#d4c1d6"
                  strokeWidth="1.7"
                  opacity="0.25"
                  strokeLinecap="round"
                />
                <path
                  d="M-20-12 L-19-5 M21-12 L22-5"
                  fill="none"
                  stroke="#fff1da"
                  strokeWidth="0.8"
                  opacity="0.28"
                  strokeLinecap="round"
                />
              </g>
            )}

            {/* Chi tiết người cao tuổi (Kính lão & Nếp nhăn hiền hậu) */}
            {isElder && (
              <g>
                {/* Gọng kính mắt tròn thanh nhã */}
                <rect
                  x="-17"
                  y="-2"
                  width="14"
                  height="12"
                  rx="4"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="0.9"
                />
                <rect
                  x="3"
                  y="-2"
                  width="14"
                  height="12"
                  rx="4"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="0.9"
                />
                {/* Cầu kính & càng kính */}
                <path
                  d="M-3 2 Q0 0 3 2 M-17 2 L-21 0 M17 2 L21 0"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="0.9"
                  strokeLinecap="round"
                />
                {/* Nếp nhăn đuôi mắt & khóe cười */}
                <path
                  d="M-16 14 L-12 15 M12 15 L16 14 M-7 18 L-8 22 M7 18 L8 22"
                  fill="none"
                  stroke="#a67b78"
                  strokeWidth="0.6"
                  strokeLinecap="round"
                />
              </g>
            )}

            {/* Nếp nhăn trán người rất cao tuổi (>= 75) */}
            {isVeryOld && (
              <path
                d="M-7-8 Q0-10 7-8 M-6-12 Q0-14 6-12"
                fill="none"
                stroke="#b58f89"
                strokeWidth="0.65"
                strokeLinecap="round"
              />
            )}

            {/* Mũ kepi công an / quân đội */}
            {hasCap && (
              <g>
                <path
                  d="M-25-18 Q0-40 25-18 L22-10 L-22-10 Z"
                  fill={capColor}
                  stroke="#343044"
                  strokeWidth="0.8"
                />
                <path
                  d="M-25-11 Q0-5 25-11 L20-5 L-20-5 Z"
                  fill="#1e293b"
                  stroke="#343044"
                  strokeWidth="0.6"
                />
                {/* Huy hiệu vàng */}
                <circle cx="0" cy="-20" r="2.5" fill="#eab308" />
              </g>
            )}
          </g>

          {/* Màn mờ tưởng niệm khi đã qua đời */}
          {!isAlive && (
            <rect x="0" y="0" width="160" height="160" fill="#0f172a" opacity="0.4" />
          )}
        </svg>
      ) : (
        /* ============================================================ */
        /* PHONG CÁCH PIXEL ART RETRO (16x16 Crisp Edges Web Gốc)       */
        /* ============================================================ */
        <svg
          viewBox="0 0 16 16"
          width={size}
          height={size}
          className="w-full h-full object-cover"
          shapeRendering="crispEdges"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Nền xanh đen retro */}
          <rect x="0" y="0" width="16" height="16" fill="#17283a" />
          <rect x="0" y="11" width="16" height="5" fill="#1d3247" />

          {isBaby ? (
            /* Em bé pixel */
            <g>
              <rect x="3" y="11" width="10" height="5" fill="#f6e7c8" />
              <rect x="4" y="10" width="8" height="1" fill="#f6e7c8" />
              <rect x="4" y="4" width="8" height="7" fill={skinColor} />
              <rect x="5" y="3" width="6" height="1" fill={skinColor} />
              <rect x="7" y="2" width="2" height="2" fill={hairColor} />
              <rect x="6" y="7" width="1" height="1" fill="#1b1b1b" />
              <rect x="9" y="7" width="1" height="1" fill="#1b1b1b" />
              <rect x="5" y="8" width="1" height="1" fill="#f2a0a0" opacity="0.8" />
              <rect x="10" y="8" width="1" height="1" fill="#f2a0a0" opacity="0.8" />
              <rect x="7" y="9" width="2" height="1" fill="#c0605a" />
            </g>
          ) : (
            /* Nhân vật pixel theo tuổi & nghề */
            <g>
              {/* Thân áo */}
              <rect x="3" y="11" width="10" height="5" fill={outfitColor} />
              <rect x="4" y="10" width="8" height="1" fill={outfitColor} />

              {/* Phụ kiện pixel */}
              {hasRedScarf && (
                <g>
                  <rect x="6.5" y="10" width="3" height="1" fill="#dc2626" />
                  <rect x="7" y="11" width="2" height="2" fill="#dc2626" />
                </g>
              )}
              {hasTie && (
                <g>
                  <rect x="7.5" y="11" width="1" height="3" fill="#d97706" />
                  <rect x="6" y="11" width="1" height="1" fill="#ffffff" />
                  <rect x="9" y="11" width="1" height="1" fill="#ffffff" />
                </g>
              )}
              {hasStethoscope && (
                <g>
                  <rect x="5" y="12" width="1" height="2" fill="#94a3b8" />
                  <rect x="10" y="12" width="1" height="2" fill="#94a3b8" />
                  <rect x="6" y="14" width="4" height="1" fill="#94a3b8" />
                </g>
              )}

              {/* Tóc sau cho nữ */}
              {isFemale && !isElder && (
                <rect x="3" y="3" width="10" height="10" fill={hairColor} />
              )}

              {/* Khuôn mặt */}
              <rect x="4" y="4" width="8" height="7" fill={skinColor} />
              <rect x="5" y="3" width="6" height="1" fill={skinColor} />
              <rect x="7" y="10" width="2" height="1" fill={skinColor} />

              {/* Tóc trước */}
              <rect x="4" y="2" width="8" height="2" fill={hairColor} />
              <rect x="4" y="3" width="1" height="3" fill={hairColor} />
              <rect x="11" y="3" width="1" height="3" fill={hairColor} />

              {/* Mắt */}
              <rect x="6" y="7" width="1" height="1" fill="#1b1b1b" />
              <rect x="9" y="7" width="1" height="1" fill="#1b1b1b" />

              {/* Má hồng (trẻ em/nữ) */}
              {(isChild || isFemale) && (
                <g>
                  <rect x="5" y="8" width="1" height="1" fill="#f2a0a0" opacity="0.7" />
                  <rect x="10" y="8" width="1" height="1" fill="#f2a0a0" opacity="0.7" />
                </g>
              )}

              {/* Miệng */}
              {happiness >= 55 ? (
                <g>
                  <rect x="7" y="10" width="2" height="1" fill="#9c3d3a" />
                  <rect x="6" y="9" width="1" height="1" fill="#9c3d3a" />
                  <rect x="9" y="9" width="1" height="1" fill="#9c3d3a" />
                </g>
              ) : (
                <rect x="7" y="10" width="2" height="1" fill="#9c3d3a" />
              )}

              {/* Mũ công an/quân đội pixel */}
              {hasCap && (
                <g>
                  <rect x="3" y="1" width="10" height="2" fill={capColor} />
                  <rect x="3" y="3" width="10" height="1" fill="#14213a" />
                  <rect x="7" y="1" width="2" height="1" fill="#e0b84a" />
                </g>
              )}
            </g>
          )}

          {/* Tưởng niệm khi qua đời */}
          {!isAlive && (
            <rect x="0" y="0" width="16" height="16" fill="#000000" opacity="0.4" />
          )}
        </svg>
      )}

      {/* Nút chỉ báo chuyển đổi tinh tế ở góc khi hover */}
      {allowToggle && size >= 56 && (
        <span
          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-slate-900/90 text-amber-400 border border-amber-500/40 shadow-sm pointer-events-none"
        >
          {styleMode === 'anime' ? '✨' : '👾'}
        </span>
      )}
    </div>
  );
};
