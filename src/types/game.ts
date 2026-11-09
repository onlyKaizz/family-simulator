export type Gender = 'male' | 'female';

export interface ParentProfile {
  id: string;
  role: 'Bố' | 'Mẹ';
  name: string;
  age: number;
  occupation: string;       // Nghề nghiệp: Giáo viên, Kỹ sư, Nông dân...
  workplace: string;        // Nơi công tác: Bệnh viện tỉnh, UBND phường, Sạp chợ...
  position: string;         // Chức vụ: Trưởng phòng, Bác sĩ điều trị, Chủ sạp...
  monthlyIncome: number;    // Thu nhập hàng tháng (VNĐ)
  alive: boolean;
  health: 'Tốt' | 'Bình thường' | 'Yếu / Bệnh mãn tính';
}

export type SocioeconomicTier = 
  | 'Hộ nghèo' 
  | 'Bình dân đủ ăn' 
  | 'Khá giả trung lưu' 
  | 'Thượng lưu giàu có' 
  | 'Đại gia tinh hoa';

export interface FamilyBackground {
  status: 'Trọn vẹn êm ấm' | 'Bố mẹ ly hôn' | 'Mẹ đơn thân' | 'Bố đơn thân' | 'Mồ côi ở với ông bà' | 'Vỡ nợ sa sút';
  tier: SocioeconomicTier;
  totalMonthlyIncome: number; // Tổng thu nhập Bố + Mẹ
  debt: number;               // Nợ gia đình (nếu có)
  summaryText: string;        // Đoạn văn miêu tả hoàn cảnh gia đình
  parents: ParentProfile[];
  homeTown: string;
  siblingsCount: number;
}

export type Talent = 
  | 'Logic toán học' 
  | 'Ngoại ngữ' 
  | 'Giao tiếp thuyết phục' 
  | 'Khéo tay kỹ thuật' 
  | 'Nghệ thuật & Âm nhạc' 
  | 'Thể lực & Vận động' 
  | 'Kinh doanh nhạy bén';

export interface HighSchoolRecord {
  academicTier: 'Xuất sắc' | 'Giỏi' | 'Khá' | 'Trung bình' | 'Kém';
  graduationScore: number;    // Điểm thi tốt nghiệp THPT (thang điểm 30)
  subjectGroup: 'Khối A (Toán-Lý-Hóa)' | 'Khối B (Toán-Hóa-Sinh)' | 'Khối C (Văn-Sử-Địa)' | 'Khối D (Toán-Văn-Anh)' | 'Khối A1 (Toán-Lý-Anh)';
  conduct: 'Tốt' | 'Khá' | 'Trung bình';
}

export interface CharacterStats {
  health: number;      // 0 - 100
  smarts: number;      // 0 - 100
  happiness: number;   // 0 - 100
  looks: number;       // 0 - 100
}

export interface Character {
  id: string;
  name: string;
  gender: Gender;
  age: number;             // Mặc định khởi đầu = 18
  birthYear: number;
  alive: boolean;
  province: string;
  ethnicity: string;
  talent: Talent;
  stats: CharacterStats;
  highSchool: HighSchoolRecord;
  family: FamilyBackground;
  
  // Công việc & Tài chính cá nhân
  personalCash: number;    // Tiền túi cá nhân
  personalDebt: number;    // Nợ sinh viên / nợ riêng
  job?: { id: string; field?: string };
  flags?: { inJailUntil?: number };
  
  // Trạng thái tình cảm
  relationshipStatus: 'Độc thân' | 'Đang hẹn hò' | 'Đã đính hôn' | 'Đã kết hôn';
  partner?: PartnerProfile;
  children: ChildProfile[];
}

export interface PartnerProfile {
  id: string;
  name: string;
  gender: Gender;
  age: number;
  province: string;
  occupation: string;
  monthlyIncome: number;
  personality: string;
  familyBackground: string;
  affinity: number;       // 0 - 100 (Độ gắn kết)
  relationshipYears: number;
}

export interface ChildProfile {
  id: string;
  name: string;
  gender: Gender;
  age: number;
  health: number;
  smarts: number;
  happiness: number;
  talent: Talent;
  schoolGrade?: string;
}

export interface PathBranchOption {
  id: string;
  title: string;
  category: 'university' | 'vocational' | 'work_now' | 'export_labor' | 'military' | 'family_business';
  description: string;
  requirements: string;
  pros: string;
  cons: string;
  initialCost: number;     // Học phí hoặc chi phí ban đầu
  isAvailable: boolean;
}
