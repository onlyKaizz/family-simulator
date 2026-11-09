export type Gender = 'male' | 'female';
export type Orientation = 'straight' | 'lgbt';

export interface Stats {
  health: number;      // Sức khỏe (0 - 100)
  smarts: number;      // Trí tuệ (0 - 100)
  happiness: number;   // Hạnh phúc (0 - 100)
  looks: number;       // Ngoại hình (0 - 100)
  karma: number;       // Đạo đức / Nhân quả (-100 đến 100)
}

export interface Traits {
  ambition: number;    // Ý chí, tham vọng
  riskTolerance: number;// Chấp nhận rủi ro
  sociability: number; // Hướng ngoại / giao tiếp
  diligence: number;   // Chăm chỉ, kiên trì
}

export interface Parent {
  name: string;
  role: 'Bố' | 'Mẹ' | 'Người giám hộ';
  age: number;
  job: string;
  monthlyIncome: number; // VNĐ
  alive: boolean;
  relationship: number;  // 0 - 100
}

export interface Sibling {
  name: string;
  gender: Gender;
  age: number;
  relationship: number;
}

export interface Partner {
  name: string;
  gender: Gender;
  age: number;
  job: string;
  monthlyIncome: number;
  relationship: number;  // 0 - 100
  yearsTogether: number;
  isMarried: boolean;
}

export interface Child {
  name: string;
  gender: Gender;
  age: number;
  relationship: number;
  talent?: string;
}

export interface Pet {
  id: string;
  name: string;
  species: 'Chó' | 'Mèo' | 'Cá' | 'Chim' | 'Rùa' | 'Thỏ';
  age: number;
  maxAge: number;
  monthlyCost: number;
  health: number;
}

export interface Job {
  id: string;
  title: string;
  field: string;
  level: number;
  monthlySalary: number; // VNĐ
  stress: number;        // 0 - 100
  experienceYears: number;
}

export interface Education {
  level: 'Chưa đi học' | 'Mầm non' | 'Tiểu học' | 'THCS' | 'THPT' | 'Trung cấp / Nghề' | 'Đại học' | 'Thạc sĩ / Tiến sĩ';
  schoolName?: string;
  major?: string;
  gpa: number;           // Điểm trung bình (thang 10)
  examGrade10Score?: number;
  universityScore?: number;
}

export interface FinancialAssets {
  cash: number;          // Tiền mặt / tài khoản (VNĐ)
  savings: number;       // Tiền gửi tiết kiệm ngân hàng (lãi suất năm)
  gold: number;          // Vàng (chỉ vàng)
  stocks: number;        // Cổ phiếu
  realEstate: {
    name: string;
    value: number;
    debt: number;
  }[];
  vehicles: {
    name: string;
    type: 'Xe máy' | 'Ô tô';
    value: number;
  }[];
}

export interface LifeLogItem {
  id: string;
  age: number;
  year: number;
  text: string;
  category: 'birth' | 'childhood' | 'school' | 'career' | 'romance' | 'finance' | 'health' | 'family' | 'senior' | 'death' | 'life';
  statChanges?: Partial<Stats>;
}

export interface Character {
  id: string;
  name: string;
  gender: Gender;
  birthYear: number;
  age: number;
  alive: boolean;
  deathReason?: string;
  
  // Nguồn gốc & Văn hóa
  province: string;
  region: 'Bắc Bộ' | 'Trung Bộ' | 'Nam Bộ' | 'Tây Nguyên';
  ethnicity: string;
  religion: string;
  zodiac: string;
  birthHourCanChi: string;
  
  // Gia đình & Hoàn cảnh
  houseType: string;
  parents: Parent[];
  siblings: Sibling[];
  partner?: Partner;
  children: Child[];
  pets: Pet[];
  
  // Chỉ số cốt lõi
  stats: Stats;
  traits: Traits;
  talent: string;
  
  // Học vấn, Công việc & Tài chính
  education: Education;
  job?: Job;
  finances: FinancialAssets;
  
  // Nhật ký cuộc đời
  logs: LifeLogItem[];
  memories: string[];
}
