import type { 
  Character, Gender, Talent, HighSchoolRecord, PathBranchOption 
} from '../types/game';
import { generateFamilyBackground } from '../data/parentsData';
import { SURNAMES, MALE_GIVEN_NAMES, FEMALE_GIVEN_NAMES, MALE_MIDDLE_NAMES, FEMALE_MIDDLE_NAMES } from '../data/names';
import { PROVINCES } from '../data/provinces';
import { ETHNICITIES } from '../data/ethnicities';

const TALENTS: Talent[] = [
  'Logic toán học',
  'Ngoại ngữ',
  'Giao tiếp thuyết phục',
  'Khéo tay kỹ thuật',
  'Nghệ thuật & Âm nhạc',
  'Thể lực & Vận động',
  'Kinh doanh nhạy bén'
];

function pickRandom<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

export function generate18yoCharacter(preferredGender?: Gender): Character {
  const gender: Gender = preferredGender || (Math.random() < 0.5 ? 'male' : 'female');
  const isMale = gender === 'male';

  const provinceObj = pickRandom(PROVINCES);
  const homeTown = provinceObj.name;
  const family = generateFamilyBackground(homeTown);

  // Họ lấy theo họ của Bố nếu có, hoặc random
  const father = family.parents.find(p => p.role === 'Bố');
  const surname = father ? father.name.split(' ')[0] : pickRandom(SURNAMES);
  const middleName = isMale ? pickRandom(MALE_MIDDLE_NAMES) : pickRandom(FEMALE_MIDDLE_NAMES);
  const givenName = isMale ? pickRandom(MALE_GIVEN_NAMES) : pickRandom(FEMALE_GIVEN_NAMES);
  const fullName = `${surname} ${middleName} ${givenName}`;

  // Dân tộc
  const ethRoll = Math.random();
  const ethnicity = ethRoll < 0.88 ? 'Kinh' : pickRandom(ETHNICITIES).name;

  // Học lực & Điểm thi tốt nghiệp THPT
  const scoreRoll = Math.random();
  let academicTier: HighSchoolRecord['academicTier'] = 'Khá';
  let graduationScore = 21.5;

  if (scoreRoll < 0.15) {
    academicTier = 'Xuất sắc';
    graduationScore = +(26.5 + Math.random() * 3).toFixed(1); // 26.5 - 29.5
  } else if (scoreRoll < 0.45) {
    academicTier = 'Giỏi';
    graduationScore = +(23.5 + Math.random() * 2.8).toFixed(1); // 23.5 - 26.3
  } else if (scoreRoll < 0.80) {
    academicTier = 'Khá';
    graduationScore = +(19.0 + Math.random() * 4).toFixed(1); // 19.0 - 23.0
  } else if (scoreRoll < 0.95) {
    academicTier = 'Trung bình';
    graduationScore = +(15.0 + Math.random() * 3.8).toFixed(1); // 15.0 - 18.8
  } else {
    academicTier = 'Kém';
    graduationScore = +(11.0 + Math.random() * 3.5).toFixed(1); // 11.0 - 14.5
  }

  const subjectGroup = pickRandom<HighSchoolRecord['subjectGroup']>([
    'Khối A (Toán-Lý-Hóa)',
    'Khối A1 (Toán-Lý-Anh)',
    'Khối B (Toán-Hóa-Sinh)',
    'Khối C (Văn-Sử-Địa)',
    'Khối D (Toán-Văn-Anh)'
  ]);

  const highSchool: HighSchoolRecord = {
    academicTier,
    graduationScore,
    subjectGroup,
    conduct: academicTier === 'Kém' ? 'Khá' : 'Tốt'
  };

  // Tiền túi cá nhân tuổi 18 tùy theo tầng lớp
  let personalCash = 1500000;
  if (family.tier === 'Hộ nghèo') personalCash = 300000;
  else if (family.tier === 'Bình dân đủ ăn') personalCash = 1200000;
  else if (family.tier === 'Khá giả trung lưu') personalCash = 4500000;
  else if (family.tier === 'Thượng lưu giàu có') personalCash = 15000000;
  else personalCash = 50000000;

  return {
    id: `char_18_${Date.now()}_${Math.random()}`,
    name: fullName,
    gender,
    age: 18,
    birthYear: 2008,
    alive: true,
    province: homeTown,
    ethnicity,
    talent: pickRandom(TALENTS),
    stats: {
      health: 80 + Math.floor(Math.random() * 18),
      smarts: academicTier === 'Xuất sắc' ? 88 : academicTier === 'Giỏi' ? 78 : academicTier === 'Khá' ? 68 : 55,
      happiness: family.debt > 0 ? 55 : 75,
      looks: 65 + Math.floor(Math.random() * 25)
    },
    highSchool,
    family,
    personalCash,
    personalDebt: 0,
    relationshipStatus: 'Độc thân',
    children: []
  };
}

export function getAvailableBranches(char: Character): PathBranchOption[] {
  const isPoor = char.family.tier === 'Hộ nghèo' || char.family.debt > 0;
  const isRich = char.family.tier === 'Thượng lưu giàu có' || char.family.tier === 'Đại gia tinh hoa';
  const score = char.highSchool.graduationScore;

  return [
    {
      id: 'branch_university',
      title: 'Học Đại Học Top Đầu',
      category: 'university',
      description: 'Theo học trường Đại học danh tiếng (Bách Khoa, Y Dược, Ngoại Thương, Kinh Tế...). Mở rộng tri thức và vòng quan hệ chất lượng cao.',
      requirements: score >= 23.5 ? 'Đủ điểm trúng tuyển nguyện vọng 1' : 'Điểm thấp, phải đóng tiền học trường tư hoặc chương trình liên kết',
      pros: 'Lương khởi điểm cao, cơ hội thăng tiến rộng mở',
      cons: isPoor ? 'Học phí 4 - 6 năm rất nặng, phải vừa học vừa cày làm thêm dạy kèm' : 'Áp lực học tập cạnh tranh rất lớn',
      initialCost: isRich ? 35000000 : 15000000,
      isAvailable: score >= 17.0
    },
    {
      id: 'branch_vocational',
      title: 'Học Nghề Thực Chiến (Cao đẳng / Nghề)',
      category: 'vocational',
      description: 'Học nghề kỹ thuật thực tiễn: Cơ khí ô tô, điện lạnh, đầu bếp, pha chế, làm đẹp (Spa/Nails) hoặc CNTT ứng dụng.',
      requirements: 'Xét tuyển học bạ hoặc điểm tốt nghiệp từ 15 điểm',
      pros: 'Thời gian học ngắn (1.5 - 2 năm), tay nghề thực chiến, ra trường có việc làm ngay',
      cons: 'Ít cơ hội bước vào giới lãnh đạo cấp cao của các tập đoàn lớn',
      initialCost: 8000000,
      isAvailable: true
    },
    {
      id: 'branch_work_now',
      title: 'Thôi Học Đi Làm Ngay (Mưu sinh tự lập)',
      category: 'work_now',
      description: 'Lên thành phố lớn làm việc ngay: Công nhân xưởng may/điện tử, phục vụ quán ăn, nhân viên bán hàng hoặc chạy xe công nghệ.',
      requirements: 'Không yêu cầu bằng cấp cao, cần sức khỏe và sự dẻo dai',
      pros: 'Có tiền mặt gửi về cho gia đình ngay tháng đầu tiên, tự lập sớm, dạn dày kinh nghiệm đời',
      cons: 'Vất vả thể lực, tích lũy sự nghiệp chậm nếu không tự học thêm',
      initialCost: 0,
      isAvailable: true
    },
    {
      id: 'branch_export_labor',
      title: 'Vay Vốn Đi Xuất Khẩu Lao Động',
      category: 'export_labor',
      description: 'Gia đình vay mượn 150 - 200 triệu chi phí môi giới để sang Nhật Bản, Hàn Quốc hoặc Đài Loan làm việc 3 - 5 năm.',
      requirements: 'Cần gia đình có khả năng vay vốn và vượt qua kỳ khám sức khỏe',
      pros: 'Mỗi tháng gửi về 25 - 40 triệu VNĐ, trả hết nợ sau 2 năm và tích lũy vốn lớn',
      cons: 'Xa gia đình, mùa đông lạnh giá, rào cản ngôn ngữ, cô đơn nơi xứ người',
      initialCost: 150000000,
      isAvailable: true
    },
    {
      id: 'branch_military',
      title: 'Nhập Ngũ Đi Nghĩa Vụ Quân Sự',
      category: 'military',
      description: 'Khoác ba lô lên đường thực hiện nghĩa vụ quân sự 2 năm bảo vệ Tổ quốc. Tôi luyện tính kỷ luật và bản lĩnh đàn ông.',
      requirements: char.gender === 'male' ? 'Đủ tiêu chuẩn sức khỏe thanh niên' : 'Tự nguyện viết đơn xin nhập ngũ',
      pros: 'Sức khỏe dẻo dai, tính kỷ luật thép, xuất ngũ được trợ cấp tiền mặt và thẻ học nghề miễn phí',
      cons: 'Mất 2 năm gián đoạn việc học/làm ăn ngoài xã hội',
      initialCost: 0,
      isAvailable: true
    },
    {
      id: 'branch_family_business',
      title: 'Ở Nhà Nối Nghiệp Kinh Doanh Gia Đình',
      category: 'family_business',
      description: 'Ở lại phụ giúp bố mẹ quán xuyến tiệm tạp hóa, xưởng sản xuất, sạp chợ hoặc trang trại gia đình.',
      requirements: 'Gia đình phải có cơ sở buôn bán, xưởng mộc hoặc nhà vườn',
      pros: 'Kinh tế vững chắc, không lo thất nghiệp, thừa kế cơ ngơi sẵn có',
      cons: 'Dưới sự quản lý chặt chẽ của bố mẹ, ít cơ hội vùng vẫy ở môi trường bên ngoài',
      initialCost: 0,
      isAvailable: char.family.tier !== 'Hộ nghèo'
    }
  ];
}
