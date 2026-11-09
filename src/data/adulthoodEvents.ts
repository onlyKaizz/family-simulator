import type { InteractiveDecision, RandomAnnualEvent } from '../types/event';

export const ADULTHOOD_DECISIONS: InteractiveDecision[] = [
  {
    id: 'tot_nghiep_di_lam',
    title: 'Tốt nghiệp & Chọn nghề nghiệp (22 tuổi)',
    description: 'Sau những năm miệt mài trên giảng đường, bạn cầm tấm bằng tốt nghiệp trong tay và chuẩn bị bước vào thị trường lao động.',
    category: 'career',
    minAge: 22,
    maxAge: 22,
    condition: (c) => c.education.level === 'Đại học' && !c.job,
    choices: [
      {
        text: '🏢 Ứng tuyển vào Tập đoàn lớn / Công ty công nghệ',
        description: 'Lương thưởng cạnh tranh, lộ trình thăng tiến rõ ràng nhưng KPI gắt gao.',
        effect: (char) => {
          char.job = {
            id: 'corp_staff',
            title: 'Kỹ sư / Chuyên viên Tập đoàn',
            field: 'Công nghệ & Dịch vụ',
            level: 1,
            monthlySalary: 16000000,
            stress: 50,
            experienceYears: 0
          };
          char.traits.ambition += 8;
          return {
            statChanges: { smarts: 5 },
            traitChanges: { ambition: 8 },
            logText: 'Bạn vượt qua 3 vòng phỏng vấn gắt gao và chính thức trở thành nhân viên tại một tập đoàn lớn với mức lương khởi điểm 16 triệu đ/tháng.'
          };
        }
      },
      {
        text: '🏛️ Thi tuyển Công chức / Viên chức nhà nước',
        description: 'Công việc ổn định lâu dài, môi trường chuẩn mực, uy tín gia đình.',
        effect: (char) => {
          char.job = {
            id: 'state_officer',
            title: 'Chuyên viên Cơ quan Nhà nước',
            field: 'Hành chính công',
            level: 1,
            monthlySalary: 8500000,
            stress: 30,
            experienceYears: 0
          };
          return {
            statChanges: { happiness: 4, karma: 5 },
            logText: 'Bạn thi đỗ kỳ thi công chức cấp tỉnh. Bố mẹ ở quê đi đâu cũng nở mày nở mặt với bà con lối xóm.'
          };
        }
      },
      {
        text: '☕ Khởi nghiệp / Mở tiệm kinh doanh riêng',
        description: 'Tự làm chủ cuộc đời mình, chấp nhận rủi ro để bứt phá.',
        effect: (char) => {
          char.job = {
            id: 'startup_owner',
            title: 'Chủ cơ sở kinh doanh',
            field: 'Kinh doanh tự do',
            level: 1,
            monthlySalary: 22000000,
            stress: 65,
            experienceYears: 0
          };
          char.traits.riskTolerance += 15;
          return {
            traitChanges: { riskTolerance: 15 },
            moneyChange: -50000000,
            logText: 'Bạn vay mượn thêm vốn mở cửa hàng kinh doanh riêng. Những ngày đầu lăn lộn vất vả nhưng tràn đầy nhiệt huyết tuổi trẻ.'
          };
        }
      }
    ]
  },
  {
    id: 'lap_gia_dinh',
    title: 'Quyết định Hôn Nhân & Lập Gia Đình (26 - 32 tuổi)',
    description: 'Bạn đã gặp được người bạn đời tâm đầu ý hợp sau thời gian tìm hiểu. Hai bên gia đình giục tính chuyện trăm năm.',
    category: 'romance',
    minAge: 26,
    maxAge: 32,
    condition: (c) => !c.partner?.isMarried,
    choices: [
      {
        text: '💍 Tổ chức Lễ Cưới ấm cúng & Đăng ký kết hôn',
        description: 'Mời họ hàng, bạn bè thân thiết về chung vui.',
        effect: (char) => {
          const partnerName = char.gender === 'male' ? 'Nguyễn Mai Anh' : 'Trần Minh Quân';
          char.partner = {
            name: partnerName,
            gender: char.gender === 'male' ? 'female' : 'male',
            age: char.age,
            job: 'Nhân viên văn phòng',
            monthlyIncome: 14000000,
            relationship: 95,
            yearsTogether: 1,
            isMarried: true
          };
          char.stats.happiness += 15;
          return {
            statChanges: { happiness: 15 },
            moneyChange: 30000000,
            logText: `Đám cưới của bạn và ${partnerName} diễn ra rộn ràng trong tiếng chúc phúc của hai họ. Bạn chính thức bước vào cuộc sống hôn nhân!`
          };
        }
      },
      {
        text: '🕊️ Tiếp tục độc thân, tập trung toàn lực cho sự nghiệp',
        description: 'Chưa vội ràng buộc, muốn tự do phấn đấu thêm vài năm.',
        effect: (char) => {
          char.traits.ambition += 6;
          return {
            traitChanges: { ambition: 6 },
            logText: 'Bạn xin phép bố mẹ hoãn chuyện cưới xin để dồn 100% tâm sức cho sự nghiệp và các dự định tài chính cá nhân.'
          };
        }
      }
    ]
  },
  {
    id: 'sinh_con_dau_long',
    title: 'Thiên thần nhỏ chào đời (28 - 35 tuổi)',
    description: 'Hai vợ chồng đón nhận tin vui lớn nhất cuộc đời: Em bé đầu lòng chuẩn bị chào đời!',
    category: 'family',
    minAge: 28,
    maxAge: 35,
    condition: (c) => !!c.partner?.isMarried && c.children.length === 0,
    choices: [
      {
        text: '👶 Hạnh phúc đón con và đặt cho con một cái tên thật ý nghĩa',
        effect: (char) => {
          const childGender = Math.random() < 0.5 ? 'male' : 'female';
          const childName = childGender === 'male' ? 'Bảo An' : 'Nhã Uyên';
          char.children.push({
            name: childName,
            gender: childGender,
            age: 0,
            relationship: 100
          });
          char.stats.happiness += 20;
          return {
            statChanges: { happiness: 20 },
            logText: `Tiếng khóc chào đời của bé ${childName} làm sáng bừng căn nhà. Giây phút bế con trên tay, bạn cảm nhận được trọn vẹn trách nhiệm thiêng liêng của đấng sinh thành.`
          };
        }
      }
    ]
  }
];

export const ADULTHOOD_RANDOM_EVENTS: RandomAnnualEvent[] = [
  {
    id: 'mua_xe_may',
    minAge: 23,
    maxAge: 30,
    weight: 0.9,
    condition: (c) => c.finances.vehicles.length === 0 && c.finances.cash >= 40000000,
    execute: (c) => {
      c.finances.cash -= 38000000;
      c.finances.vehicles.push({ name: 'Xe máy Honda đời mới', type: 'Xe máy', value: 38000000 });
      return {
        text: 'Tích góp được khoản tiền lương đầu đời, bạn tự thưởng cho mình một chiếc xe máy mới tinh để thuận tiện đi lại làm việc.',
        category: 'finance',
        statChanges: { happiness: 10 }
      };
    }
  },
  {
    id: 'thang_tien_cong_viec',
    minAge: 27,
    maxAge: 45,
    weight: 0.8,
    condition: (c) => !!c.job,
    execute: (c) => {
      if (c.job) {
        c.job.monthlySalary = Math.round(c.job.monthlySalary * 1.3);
        c.job.title = 'Trưởng bộ phận / Quản lý cấp cao';
      }
      return {
        text: 'Nhờ nỗ lực không ngừng nghỉ và thành tích xuất sắc, bạn được ban giám đốc bổ nhiệm lên vị trí Trưởng bộ phận với mức lương tăng 30%.',
        category: 'career',
        statChanges: { smarts: 6, happiness: 12 }
      };
    }
  },
  {
    id: 'sot_dat_vung_ven',
    minAge: 32,
    maxAge: 55,
    weight: 0.7,
    execute: () => ({
      text: 'Tin tức kinh tế: Thị trường bất động sản vùng ven sốt đất kỷ lục, bà con lối xóm ai nấy đều xôn xao bàn tán chuyện đầu tư.',
      category: 'finance',
      statChanges: { smarts: 2 }
    })
  },
  {
    id: 'tet_sum_hop',
    minAge: 20,
    maxAge: 65,
    weight: 1.5,
    execute: (c) => ({
      text: `Tết Nguyên Đán lại về. Bạn thu xếp công việc, mang cành đào/chậu mai về quê ${c.province} ăn bữa cơm tất niên sum vầy bên gia đình.`,
      category: 'family',
      statChanges: { happiness: 12, health: 3 },
      moneyChange: -5000000
    })
  }
];
