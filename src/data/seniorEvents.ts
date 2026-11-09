import type { RandomAnnualEvent } from '../types/event';

export const SENIOR_RANDOM_EVENTS: RandomAnnualEvent[] = [
  {
    id: 'nghi_huu_nhan_luong',
    minAge: 60,
    maxAge: 62,
    weight: 2.0,
    condition: (c) => !!c.job && !c.job.title.includes('nghỉ hưu'),
    execute: (c) => {
      if (c.job) {
        c.job.title = 'Cán bộ hưu trí (Đã nghỉ hưu)';
        c.job.monthlySalary = Math.round(c.job.monthlySalary * 0.75);
      }
      return {
        text: 'Bạn chính thức nhận quyết định nghỉ hưu sau hơn 35 năm cống hiến cho xã hội. Đồng nghiệp tổ chức buổi chia tay ấm cúng và đầy lưu luyến.',
        category: 'senior',
        statChanges: { happiness: 10, health: 5 }
      };
    }
  },
  {
    id: 'chuc_tho_70',
    minAge: 70,
    maxAge: 70,
    weight: 3.0,
    execute: () => ({
      text: `Con cháu và chính quyền địa phương tổ chức Lễ Mừng Thọ 70 tuổi cho bạn. Con cháu quây quần đông đủ, kính dâng bạn chén trà mừng đại thọ.`,
      category: 'senior',
      statChanges: { happiness: 20 }
    })
  },
  {
    id: 'chuc_tho_80_90',
    minAge: 80,
    maxAge: 95,
    weight: 0.8,
    execute: (c) => ({
      text: `Ở tuổi ${c.age}, bạn là cây cao bóng cả của cả gia tộc. Mỗi sáng tưới hoa, đánh cờ cùng bạn già, nhìn đàn cháu chắt khôn lớn mà lòng an yên.`,
      category: 'senior',
      statChanges: { happiness: 15 }
    })
  },
  {
    id: 'benh_tuoi_gia',
    minAge: 65,
    maxAge: 95,
    weight: 1.2,
    execute: () => ({
      text: 'Trái gió trở trời, xương khớp và huyết áp có phần bất ổn. Nhờ có Bảo hiểm Y tế và con cái chăm sóc chu đáo, sức khỏe bạn dần ổn định.',
      category: 'health',
      statChanges: { health: -6 }
    })
  }
];
