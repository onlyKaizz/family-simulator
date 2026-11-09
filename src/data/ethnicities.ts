export interface EthnicityData {
  name: string;
  weight: number; // Tỉ lệ dân số
  traditionalReligion: string;
}

export const ETHNICITIES: EthnicityData[] = [
  { name: 'Kinh', weight: 85.3, traditionalReligion: 'Thờ cúng tổ tiên' },
  { name: 'Tày', weight: 1.9, traditionalReligion: 'Thờ cúng Then và tổ tiên' },
  { name: 'Thái', weight: 1.9, traditionalReligion: 'Tín ngưỡng bản mường' },
  { name: 'Mường', weight: 1.5, traditionalReligion: 'Tín ngưỡng dân gian Mường' },
  { name: 'H\'Mông', weight: 1.4, traditionalReligion: 'Thờ ma nhà và tổ tiên' },
  { name: 'Khmer', weight: 1.4, traditionalReligion: 'Phật giáo Nam tông' },
  { name: 'Nùng', weight: 1.1, traditionalReligion: 'Thờ cúng tổ tiên' },
  { name: 'Dao', weight: 0.9, traditionalReligion: 'Đạo giáo và thờ Bàn Vương' },
  { name: 'Hoa', weight: 0.8, traditionalReligion: 'Phật giáo & tín ngưỡng dân gian' },
  { name: 'Gia Rai', weight: 0.5, traditionalReligion: 'Tín ngưỡng Yang vạn vật' },
  { name: 'Ê Đê', weight: 0.4, traditionalReligion: 'Tín ngưỡng Mẫu hệ & Thần Yang' },
  { name: 'Ba Na', weight: 0.3, traditionalReligion: 'Tín ngưỡng cội nguồn núi rừng' },
  { name: 'Chăm', weight: 0.2, traditionalReligion: 'Bà-la-môn giáo hoặc Hồi giáo Bani' },
  { name: 'Sán Chay', weight: 0.2, traditionalReligion: 'Thờ cúng tổ tiên' },
  { name: 'Cơ Ho', weight: 0.2, traditionalReligion: 'Tín ngưỡng mẫu hệ thần linh' },
  { name: 'Xơ Đăng', weight: 0.2, traditionalReligion: 'Thần linh núi rừng' },
  { name: 'Sán Dìu', weight: 0.15, traditionalReligion: 'Thờ cúng tổ tiên' },
  { name: 'Hrê', weight: 0.15, traditionalReligion: 'Tín ngưỡng Yang' },
  { name: 'Mnông', weight: 0.12, traditionalReligion: 'Thần linh đại ngàn' },
  { name: 'Ra Glai', weight: 0.12, traditionalReligion: 'Tín ngưỡng thần linh' },
];
