import type { InteractiveDecision, RandomAnnualEvent } from '../types/event';

export const SCHOOL_DECISIONS: InteractiveDecision[] = [
  {
    id: 'thi_vao_10',
    title: 'Kỳ thi Tuyển sinh vào Lớp 10 (15 tuổi)',
    description: 'Một trong những kỳ thi căng thẳng đầu đời. Bạn và gia đình phải đưa ra quyết định đăng ký nguyện vọng vào trường THPT.',
    category: 'school',
    minAge: 15,
    maxAge: 15,
    choices: [
      {
        text: '🏆 Đăng ký thi vào Trường Chuyên tỉnh (Áp lực cao)',
        description: 'Đòi hỏi điểm Trí tuệ cao và nỗ lực vượt bậc.',
        effect: (char) => {
          const pass = char.stats.smarts >= 75 || Math.random() < 0.4;
          if (pass) {
            char.education.schoolName = `Trường THPT Chuyên ${char.province}`;
            char.education.gpa = 8.8;
            char.stats.smarts += 10;
            char.stats.happiness += 10;
            return {
              statChanges: { smarts: 10, happiness: 10 },
              logText: `Bạn xuất sắc đỗ vào ${char.education.schoolName}! Cả gia đình mở tiệc liên hoan, họ hàng ai cũng tấm tắc khen ngợi.`
            };
          } else {
            char.education.schoolName = `Trường THPT Công lập ${char.province}`;
            char.education.gpa = 7.5;
            char.stats.happiness -= 5;
            return {
              statChanges: { happiness: -5 },
              logText: `Bạn thiếu 0.5 điểm để vào trường chuyên và chuyển sang nguyện vọng 2 tại ${char.education.schoolName}. Bạn hơi buồn nhưng quyết tâm học tập.`
            };
          }
        }
      },
      {
        text: '🏫 Đăng ký Trường THPT Công lập gần nhà',
        description: 'Vừa sức, môi trường thân quen cùng bạn bè thời cấp 2.',
        effect: (char) => {
          char.education.schoolName = `Trường THPT ${char.province}`;
          char.education.gpa = 7.8;
          return {
            statChanges: { happiness: 5, smarts: 4 },
            logText: `Bạn đỗ thủng thẳng vào ${char.education.schoolName}. Bạn bè cùng lớp cấp 2 lại tiếp tục chung trường thêm 3 năm cấp 3 vui vẻ.`
          };
        }
      },
      {
        text: '🔧 Học Trường Trung cấp nghề (Vừa học văn hóa vừa học nghề)',
        description: 'Ra trường sớm, nhanh có tay nghề nuôi sống bản thân.',
        effect: (char) => {
          char.education.level = 'Trung cấp / Nghề';
          char.education.schoolName = 'Trường Cao đẳng Nghề Kỹ thuật';
          char.education.gpa = 7.0;
          char.traits.diligence += 8;
          return {
            statChanges: { smarts: 3 },
            traitChanges: { diligence: 8 },
            logText: 'Bạn chọn học nghề kỹ thuật thực tế để phụ giúp kinh tế gia đình sớm, không ngại tay lấm chân bùn.'
          };
        }
      }
    ]
  },
  {
    id: 'nga_re_18_tuoi',
    title: 'Ngã rẽ cuộc đời ở tuổi 18',
    description: 'Tốt nghiệp THPT, đứng trước ngưỡng cửa trưởng thành. Đây là ngã rẽ quyết định quỹ đạo tương lai của bạn.',
    category: 'career',
    minAge: 18,
    maxAge: 18,
    choices: [
      {
        text: '🎓 Thi Đại học Khối A / D (Kỹ thuật, Công nghệ & Kinh tế)',
        description: 'Lên thành phố lớn (Hà Nội / TP.HCM) học đại học 4 năm.',
        effect: (char) => {
          char.education.level = 'Đại học';
          char.education.schoolName = char.region === 'Bắc Bộ' ? 'Đại học Bách Khoa Hà Nội' : 'Đại học Quốc gia TP.HCM';
          char.education.major = 'Công nghệ Thông tin & Kinh tế';
          char.stats.smarts += 8;
          return {
            statChanges: { smarts: 8 },
            logText: `Bạn nhận giấy báo trúng tuyển vào ${char.education.schoolName}. Tạm biệt quê nhà ${char.province}, bạn khoác balo lên thành phố bắt đầu đời sinh viên.`
          };
        }
      },
      {
        text: '🩺 Thi Đại học Khối B (Y Đa khoa / Dược)',
        description: 'Học 6 năm kiên trì, tương lai khoác áo blouse cứu người.',
        effect: (char) => {
          char.education.level = 'Đại học';
          char.education.schoolName = char.region === 'Bắc Bộ' ? 'Đại học Y Hà Nội' : 'Đại học Y Dược TP.HCM';
          char.education.major = 'Bác sĩ Đa khoa';
          char.stats.smarts += 12;
          char.stats.karma += 10;
          return {
            statChanges: { smarts: 12, karma: 10 },
            logText: `Bạn thi đỗ điểm cao chót vót vào ${char.education.schoolName}! Bố mẹ mừng rơi nước mắt vì gia đình sắp có một người bác sĩ.`
          };
        }
      },
      {
        text: '✈️ Đăng ký Xuất khẩu lao động (Nhật Bản / Hàn Quốc)',
        description: 'Vay mượn học tiếng, đi làm 3 - 5 năm gửi tiền về quê xây nhà.',
        effect: (char) => {
          char.education.level = 'THPT';
          char.traits.diligence += 10;
          char.job = {
            id: 'xkld',
            title: 'Lao động xuất khẩu tại Nhật Bản',
            field: 'Sản xuất công nghiệp',
            level: 1,
            monthlySalary: 35000000,
            stress: 55,
            experienceYears: 0
          };
          return {
            traitChanges: { diligence: 10 },
            moneyChange: -20000000,
            logText: 'Gia đình gom góp tiền cho bạn học tiếng và bay sang Nhật Bản theo diện tu nghiệp sinh. Công việc vất vả nhưng thu nhập gửi về rất đều đặn.'
          };
        }
      },
      {
        text: '🪖 Viết đơn tình nguyện nhập ngũ (Nghĩa vụ quân sự)',
        description: 'Rèn luyện kỷ luật thép trong quân ngũ 2 năm.',
        effect: (char) => {
          char.stats.health += 15;
          char.traits.diligence += 15;
          return {
            statChanges: { health: 15 },
            traitChanges: { diligence: 15 },
            logText: 'Bạn lên đường tòng quân. Môi trường quân ngũ trui rèn cho bạn một thể lực phi thường, tính kỷ luật và tình đồng chí thắm thiết.'
          };
        }
      },
      {
        text: '💼 Đi làm ngay / Khởi nghiệp buôn bán',
        description: 'Lăn lộn trường đời sớm, tích lũy vốn kinh doanh.',
        effect: (char) => {
          char.traits.riskTolerance += 10;
          char.job = {
            id: 'freelance_entry',
            title: 'Kinh doanh tự do & Bán hàng',
            field: 'Thương mại',
            level: 1,
            monthlySalary: 9000000,
            stress: 40,
            experienceYears: 0
          };
          return {
            traitChanges: { riskTolerance: 10 },
            logText: 'Bạn quyết định va chạm sớm với thương trường, bắt đầu từ những phi vụ buôn bán nhỏ để tự lập tài chính.'
          };
        }
      }
    ]
  }
];

export const SCHOOL_RANDOM_EVENTS: RandomAnnualEvent[] = [
  {
    id: 'moi_tinh_dau',
    minAge: 16,
    maxAge: 17,
    weight: 1.0,
    execute: () => ({
      text: `Những lá thư ngăn bàn và chiếc xe đạp chở nhau dưới tán cây phượng vĩ. Bạn rung động với một người bạn cùng trường — mối tình đầu ngây thơ khó quên.`,
      category: 'romance',
      statChanges: { happiness: 10, looks: 4 }
    })
  },
  {
    id: 'hoc_sinh_gioi',
    minAge: 12,
    maxAge: 17,
    weight: 0.8,
    condition: (c) => c.stats.smarts >= 70,
    execute: () => ({
      text: 'Bạn đạt giải trong kỳ thi Học sinh giỏi cấp tỉnh, được nhà trường trao học bổng và tuyên dương trước toàn trường dưới cờ.',
      category: 'school',
      statChanges: { smarts: 6, happiness: 8 },
      moneyChange: 1500000
    })
  }
];
