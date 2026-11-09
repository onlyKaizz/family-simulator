import type { RandomAnnualEvent, InteractiveDecision } from '../types/event';

export const CHILDHOOD_DECISIONS: InteractiveDecision[] = [
  {
    id: 'thoi_noi',
    title: 'Lễ Thôi Nôi (1 tuổi)',
    description: 'Hôm nay là lễ thôi nôi 1 tuổi của bạn. Bố mẹ trải một chiếc chiếu hoa và đặt rất nhiều món đồ trước mặt để xem bạn bốc món gì!',
    category: 'life',
    minAge: 1,
    maxAge: 1,
    choices: [
      {
        text: '📖 Cuốn sách & Cây bút',
        description: 'Bé thích đọc sách và tìm hiểu tri thức.',
        effect: (char) => {
          char.stats.smarts = Math.min(100, char.stats.smarts + 8);
          return {
            statChanges: { smarts: 8 },
            logText: 'Trong lễ thôi nôi, bạn bò nhanh tới và nắm chặt cuốn sách cùng cây bút. Cả nhà reo hò, chúc bạn sau này học rộng tài cao.'
          };
        }
      },
      {
        text: '💰 Nén vàng & Tiền mừng',
        description: 'Bé có khiếu tính toán và nhạy bén với tiền bạc.',
        effect: (char) => {
          char.traits.ambition = Math.min(100, char.traits.ambition + 10);
          return {
            statChanges: { happiness: 5 },
            logText: 'Bạn không do dự vồ lấy xấp tiền lì xì màu đỏ. Bác trưởng họ cười ha hả: "Thằng/con bé này sau này làm ăn lớn, giàu nứt đố đổ vách!"'
          };
        }
      },
      {
        text: '🏸 Chiếc vợt thể thao mini',
        description: 'Bé hoạt bát, thích vận động và thể lực tốt.',
        effect: (char) => {
          char.stats.health = Math.min(100, char.stats.health + 8);
          return {
            statChanges: { health: 8 },
            logText: 'Bạn vung vẩy chiếc vợt con con cười khoái chí. Mẹ khen bạn có đôi chân cứng cáp, sau này ắt sẽ khỏe mạnh dẻo dai.'
          };
        }
      },
      {
        text: '🎤 Chiếc micro đồ chơi',
        description: 'Bé lanh lợi, dạn dĩ trước đám đông.',
        effect: (char) => {
          char.traits.sociability = Math.min(100, char.traits.sociability + 10);
          return {
            statChanges: { looks: 5 },
            logText: 'Bạn cầm micro ê a cất tiếng bi bô khiến cả họ phì cười. Dự báo một tâm hồn nghệ sĩ và khả năng giao tiếp duyên dáng.'
          };
        }
      }
    ]
  },
  {
    id: 'mau_giao_ngay_dau',
    title: 'Ngày đầu tiên đi mẫu giáo (3 tuổi)',
    description: 'Mẹ dẫn bạn đến lớp mầm non. Trước mắt là rất nhiều bạn nhỏ xa lạ và cô giáo đang mỉm cười đón bạn.',
    category: 'school',
    minAge: 3,
    maxAge: 3,
    choices: [
      {
        text: '😭 Ôm chặt chân mẹ khóc nức nở',
        effect: () => ({
          statChanges: { happiness: -3 },
          logText: 'Ngày đầu đến trường mầm non, bạn bám chặt lấy áo mẹ không chịu buông, khóc ướt cả má cô giáo mới dỗ được.'
        })
      },
      {
        text: '🎈 Tò mò chạy ngay vào góc đồ chơi cầu trượt',
        effect: (char) => {
          char.traits.sociability += 5;
          return {
            statChanges: { happiness: 5 },
            logText: 'Vừa thấy nhà bóng và cầu trượt, bạn vẫy tay chào mẹ rồi chạy tót vào chơi cùng các bạn mới.'
          };
        }
      }
    ]
  },
  {
    id: 'lop_1_vao_truong',
    title: 'Bước vào Lớp 1 (6 tuổi)',
    description: 'Hôm nay là lễ khai giảng đầu tiên trong đời. Bạn mặc đồng phục áo trắng tinh tươm, đeo cặp sách mới toanh.',
    category: 'school',
    minAge: 6,
    maxAge: 6,
    choices: [
      {
        text: 'Chăm chú lắng nghe tiếng trống khai trường giòn giã',
        effect: (char) => {
          char.education.level = 'Tiểu học';
          char.education.schoolName = `Trường Tiểu học ${char.province}`;
          char.education.gpa = 8.0;
          return {
            statChanges: { smarts: 5, happiness: 5 },
            logText: `Bạn chính thức bước vào lớp 1 tại ${char.education.schoolName}. Tiếng trống trường rộn rã mở ra một chương mới của tuổi học trò.`
          };
        }
      }
    ]
  }
];

export const CHILDHOOD_RANDOM_EVENTS: RandomAnnualEvent[] = [
  {
    id: 'chao_hanh',
    minAge: 4,
    maxAge: 8,
    weight: 1.0,
    execute: () => ({
      text: 'Một chiều mùa đông bị cảm, mẹ nấu cho bạn bát cháo hành tía tô nóng hổi, ngồi quạt cho bạn ngủ. Hương vị ấy bạn sẽ nhớ suốt đời.',
      category: 'childhood',
      statChanges: { happiness: 6, health: 4 }
    })
  },
  {
    id: 'nem_rang_mai_nha',
    minAge: 6,
    maxAge: 8,
    weight: 1.2,
    execute: () => ({
      text: 'Bạn bị lung lay và rụng chiếc răng sữa đầu tiên. Bố bế bạn ném chiếc răng lên mái nhà, miệng lẩm bẩm ước răng mới mọc đều tăm tắp.',
      category: 'childhood',
      statChanges: { happiness: 3 }
    })
  },
  {
    id: 'tha_dieu_ban_bi',
    minAge: 7,
    maxAge: 11,
    weight: 1.5,
    execute: (char) => ({
      text: `Những buổi chiều rủ lũ bạn trong xóm ${char.province} đi bắn bi, đánh khăng và thả diều no gió trên triền đê. Tuổi thơ êm đềm trôi qua.`,
      category: 'childhood',
      statChanges: { happiness: 8, health: 5 }
    })
  },
  {
    id: 'ket_nap_doi',
    minAge: 9,
    maxAge: 10,
    weight: 1.0,
    execute: () => ({
      text: 'Bạn vinh dự được kết nạp vào Đội Thiếu niên Tiền phong Hồ Chí Minh, tự hào đeo chiếc khăn quàng đỏ thắm tung bay trên vai.',
      category: 'school',
      statChanges: { smarts: 4, happiness: 5 }
    })
  }
];
