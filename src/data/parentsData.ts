import type { ParentProfile, SocioeconomicTier, FamilyBackground } from '../types/game';
import { SURNAMES, MALE_GIVEN_NAMES, FEMALE_GIVEN_NAMES, MALE_MIDDLE_NAMES, FEMALE_MIDDLE_NAMES } from './names';

export interface OccupationTemplate {
  occupation: string;
  workplace: string;
  position: string;
  minIncome: number;
  maxIncome: number;
  genderPref?: 'male' | 'female';
  sector: 'public' | 'corporate' | 'trade' | 'agriculture' | 'worker' | 'retired';
  notes: string;
}

export const OCCUPATION_TEMPLATES: OccupationTemplate[] = [
  // 1. Khối Nhà nước & Sự nghiệp công
  {
    occupation: 'Công chức xã / phường',
    workplace: 'UBND Xã / Phường địa phương',
    position: 'Cán bộ Địa chính - Xây dựng',
    minIncome: 8000000,
    maxIncome: 12000000,
    sector: 'public',
    notes: 'Lương ổn định, am hiểu thủ tục đất đai tại địa phương'
  },
  {
    occupation: 'Công chức cấp huyện',
    workplace: 'UBND Huyện / Thị xã',
    position: 'Phó Phòng Giáo dục & Đào tạo',
    minIncome: 15000000,
    maxIncome: 24000000,
    sector: 'public',
    notes: 'Nếp nhà gia giáo, nề nếp kỷ cương'
  },
  {
    occupation: 'Lãnh đạo cơ quan nhà nước',
    workplace: 'Sở Kế hoạch & Đầu tư tỉnh',
    position: 'Trưởng phòng Nghiệp vụ',
    minIncome: 28000000,
    maxIncome: 55000000,
    sector: 'public',
    notes: 'Quan hệ rộng, gia thế có tiếng tăm tại địa phương'
  },
  {
    occupation: 'Giáo viên mầm non',
    workplace: 'Trường Mầm non Công lập',
    position: 'Giáo viên phụ trách lớp',
    minIncome: 7000000,
    maxIncome: 10500000,
    genderPref: 'female',
    sector: 'public',
    notes: 'Yêu thương chăm sóc con chu đáo, tiết kiệm chi tiêu'
  },
  {
    occupation: 'Giáo viên THPT',
    workplace: 'Trường THPT Chuyên tỉnh',
    position: 'Tổ trưởng chuyên môn Toán',
    minIncome: 20000000,
    maxIncome: 38000000,
    sector: 'public',
    notes: 'Rất chú trọng học bạ và điểm số tốt nghiệp của con'
  },
  {
    occupation: 'Bác sĩ đa khoa',
    workplace: 'Bệnh viện Đa khoa huyện',
    position: 'Bác sĩ điều trị',
    minIncome: 14000000,
    maxIncome: 22000000,
    sector: 'public',
    notes: 'Trực đêm liên miên, tính tình điềm đạm cẩn thận'
  },
  {
    occupation: 'Bác sĩ chuyên khoa',
    workplace: 'Bệnh viện Đa khoa tỉnh',
    position: 'Phó Trưởng khoa Nội (+ Phòng mạch tư)',
    minIncome: 45000000,
    maxIncome: 90000000,
    sector: 'public',
    notes: 'Kinh tế vững vàng, mong muốn con nối nghiệp Y khoa'
  },
  {
    occupation: 'Sĩ quan quân đội',
    workplace: 'Bộ Chỉ huy Quân sự tỉnh',
    position: 'Trung tá Tham mưu trưởng',
    minIncome: 20000000,
    maxIncome: 32000000,
    genderPref: 'male',
    sector: 'public',
    notes: 'Kỷ luật nghiêm khắc, dạy con tự lập từ nhỏ'
  },
  {
    occupation: 'Công an nhân dân',
    workplace: 'Công an Thành phố trực thuộc tỉnh',
    position: 'Đội trưởng Cảnh sát Giao thông',
    minIncome: 22000000,
    maxIncome: 38000000,
    genderPref: 'male',
    sector: 'public',
    notes: 'Nghiêm túc, coi trọng danh dự gia đình'
  },

  // 2. Khối Doanh nghiệp tư nhân & FDI
  {
    occupation: 'Kỹ sư phần mềm',
    workplace: 'Công ty Công nghệ Phần mềm',
    position: 'Trưởng nhóm Lập trình (Tech Lead)',
    minIncome: 35000000,
    maxIncome: 65000000,
    sector: 'corporate',
    notes: 'Tư duy logic, sẵn sàng hỗ trợ con cái học công nghệ'
  },
  {
    occupation: 'Kế toán trưởng',
    workplace: 'Công ty Xuất nhập khẩu Quốc tế',
    position: 'Kế toán trưởng',
    minIncome: 28000000,
    maxIncome: 45000000,
    genderPref: 'female',
    sector: 'corporate',
    notes: 'Quản lý tài chính gia đình chặt chẽ, chu toàn'
  },
  {
    occupation: 'Nhân viên ngân hàng',
    workplace: 'Ngân hàng TMCP Ngoại thương',
    position: 'Chuyên viên Tín dụng Doanh nghiệp',
    minIncome: 18000000,
    maxIncome: 30000000,
    sector: 'corporate',
    notes: 'Áp lực chỉ tiêu, am hiểu vay vốn và đầu tư'
  },
  {
    occupation: 'Quản lý nhà máy FDI',
    workplace: 'Tập đoàn Điện tử Hàn Quốc',
    position: 'Trưởng phòng Quản lý Chất lượng',
    minIncome: 38000000,
    maxIncome: 65000000,
    sector: 'corporate',
    notes: 'Tác phong công nghiệp, đúng giờ và chuẩn mực'
  },

  // 3. Khối Hộ kinh doanh & Tiểu thương
  {
    occupation: 'Tiểu thương sạp rau củ',
    workplace: 'Chợ Dân sinh truyền thống',
    position: 'Chủ sạp rau củ sạch',
    minIncome: 12000000,
    maxIncome: 20000000,
    sector: 'trade',
    notes: 'Dậy từ 3h sáng lấy hàng, tần tảo nuôi con ăn học'
  },
  {
    occupation: 'Tiểu thương sạp vải',
    workplace: 'Chợ Đầu mối bán buôn',
    position: 'Chủ sạp phân phối vải',
    minIncome: 40000000,
    maxIncome: 85000000,
    sector: 'trade',
    notes: 'Dòng tiền mặt dồi dào, tháo vát giao thương'
  },
  {
    occupation: 'Chủ tiệm tạp hóa',
    workplace: 'Mặt phố trung tâm thị trấn',
    position: 'Chủ tiệm bán lẻ tổng hợp',
    minIncome: 16000000,
    maxIncome: 30000000,
    sector: 'trade',
    notes: 'Kinh tế gia đình ổn định, sống chan hòa với lối xóm'
  },
  {
    occupation: 'Chủ quán phở gia truyền',
    workplace: 'Quán ăn mặt tiền phố cổ',
    position: 'Chủ quán kiêm đầu bếp chính',
    minIncome: 35000000,
    maxIncome: 70000000,
    sector: 'trade',
    notes: 'Đông khách từ sáng sớm, có sẵn cơ ngơi gia truyền'
  },
  {
    occupation: 'Chủ xưởng gỗ mỹ nghệ',
    workplace: 'Làng nghề mộc truyền thống',
    position: 'Chủ xưởng sản xuất gỗ',
    minIncome: 60000000,
    maxIncome: 140000000,
    sector: 'trade',
    notes: 'Gia thế giàu có bề thế, muốn con nối nghiệp gia đình'
  },

  // 4. Khối Nông nghiệp & Thôn quê
  {
    occupation: 'Nông dân trồng lúa',
    workplace: 'Cánh đồng Hợp tác xã Nông nghiệp',
    position: 'Nông dân canh tác (4 sào lúa)',
    minIncome: 5000000,
    maxIncome: 8500000,
    sector: 'agriculture',
    notes: 'Phụ thuộc thời tiết, mỗi hạt gạo là giọt mồ hôi'
  },
  {
    occupation: 'Chủ vườn sầu riêng',
    workplace: 'Nhà vườn sinh thái miền Tây',
    position: 'Chủ trang trại 2 hecta sầu riêng',
    minIncome: 45000000,
    maxIncome: 120000000,
    sector: 'agriculture',
    notes: 'Trúng vụ tiền tỷ, cuộc sống nhà vườn phóng khoáng'
  },
  {
    occupation: 'Trồng cà phê & hồ tiêu',
    workplace: 'Nông trường đất đỏ Tây Nguyên',
    position: 'Chủ vườn cà phê',
    minIncome: 22000000,
    maxIncome: 45000000,
    sector: 'agriculture',
    notes: 'Lao động chăm chỉ, nhà cửa khang trang giữa đồi chè'
  },
  {
    occupation: 'Chủ đầm tôm sú',
    workplace: 'Khu đầm nuôi tôm duyên hải',
    position: 'Chủ vuông tôm bán công nghiệp',
    minIncome: 35000000,
    maxIncome: 90000000,
    sector: 'agriculture',
    notes: 'Rủi ro dịch bệnh cao nhưng khi trúng vụ thì rất khá'
  },
  {
    occupation: 'Ngư dân tàu đánh cá',
    workplace: 'Hạm đội tàu cá đánh bắt xa bờ',
    position: 'Lao động biển (Bạn thuyền)',
    minIncome: 8000000,
    maxIncome: 15000000,
    genderPref: 'male',
    sector: 'agriculture',
    notes: 'Sóng gió trùng khơi, một năm về nhà vài chuyến'
  },

  // 5. Khối Công nhân & Lao động phổ thông
  {
    occupation: 'Công nhân may mặc',
    workplace: 'Khu Công nghiệp tập trung',
    position: 'Công nhân may dây chuyền',
    minIncome: 7500000,
    maxIncome: 11000000,
    sector: 'worker',
    notes: 'Tăng ca liên miên, chi tiêu tằn tiện vì tương lai của con'
  },
  {
    occupation: 'Tài xế công nghệ',
    workplace: 'Ứng dụng xe công nghệ đô thị',
    position: 'Tài xế xe ôm / giao hàng',
    minIncome: 10000000,
    maxIncome: 16000000,
    genderPref: 'male',
    sector: 'worker',
    notes: 'Dãi nắng dầm mưa từ sáng đến đêm muộn'
  },
  {
    occupation: 'Thợ xây dựng chính',
    workplace: 'Đội thi công công trình dân dụng',
    position: 'Thợ nề bậc 4',
    minIncome: 12000000,
    maxIncome: 19000000,
    genderPref: 'male',
    sector: 'worker',
    notes: 'Công việc nặng nhọc, đôi bàn tay chai sạn nuôi con'
  },
  {
    occupation: 'Bán hàng rong vỉa hè',
    workplace: 'Khu vực chợ và cổng trường học',
    position: 'Bán bánh mì / nước giải khát',
    minIncome: 5000000,
    maxIncome: 8500000,
    sector: 'worker',
    notes: 'Bấp bênh mưa nắng, không có bảo hiểm hay lương hưu'
  },

  // 6. Khối Hưu trí
  {
    occupation: 'Cán bộ hưu trí',
    workplace: 'Nghỉ hưu theo chế độ BHXH',
    position: 'Nguyên cán bộ cơ quan huyện',
    minIncome: 6500000,
    maxIncome: 11000000,
    sector: 'retired',
    notes: 'Thanh nhàn, chăm sóc cây cảnh và dạy bảo con cháu'
  }
];

function pickRandom<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

function randRange(min: number, max: number, step = 500000): number {
  const steps = Math.floor((max - min) / step);
  return min + Math.floor(Math.random() * (steps + 1)) * step;
}

export function generateParent(
  role: 'Bố' | 'Mẹ', 
  familySurname: string, 
  forcedSector?: string
): ParentProfile {
  const isFather = role === 'Bố';
  const surname = isFather ? familySurname : pickRandom(SURNAMES);
  const middleName = isFather ? pickRandom(MALE_MIDDLE_NAMES) : pickRandom(FEMALE_MIDDLE_NAMES);
  const givenName = isFather ? pickRandom(MALE_GIVEN_NAMES) : pickRandom(FEMALE_GIVEN_NAMES);
  const fullName = `${surname} ${middleName} ${givenName}`;

  // Lọc template nghề phù hợp
  let filtered = OCCUPATION_TEMPLATES.filter(tpl => {
    if (tpl.genderPref === 'male' && !isFather) return false;
    if (tpl.genderPref === 'female' && isFather) return false;
    if (forcedSector && tpl.sector !== forcedSector) return false;
    return true;
  });

  if (filtered.length === 0) filtered = OCCUPATION_TEMPLATES;
  const tpl = pickRandom(filtered);

  return {
    id: `parent_${Date.now()}_${Math.random()}`,
    role,
    name: fullName,
    age: isFather ? 43 + Math.floor(Math.random() * 8) : 41 + Math.floor(Math.random() * 8),
    occupation: tpl.occupation,
    workplace: tpl.workplace,
    position: tpl.position,
    monthlyIncome: randRange(tpl.minIncome, tpl.maxIncome),
    alive: true,
    health: Math.random() < 0.15 ? 'Yếu / Bệnh mãn tính' : 'Tốt',
  };
}

export type FilterCategory = 'all' | 'richest' | 'rural' | 'urban' | 'poor' | 'genius';

export function generateFamilyBackground(
  homeTown: string,
  filter: FilterCategory = 'all'
): FamilyBackground {
  const familySurname = pickRandom(SURNAMES);
  let status: FamilyBackground['status'] = 'Trọn vẹn êm ấm';
  const parents: ParentProfile[] = [];
  let debt = 0;

  if (filter === 'poor') {
    // Ép buộc hoàn cảnh khó khăn / nợ nần
    status = Math.random() < 0.5 ? 'Trọn vẹn êm ấm' : 'Mẹ đơn thân';
    if (status === 'Trọn vẹn êm ấm') {
      parents.push(generateParent('Bố', familySurname, 'worker'));
      parents.push(generateParent('Mẹ', familySurname, 'worker'));
    } else {
      parents.push(generateParent('Mẹ', familySurname, 'worker'));
    }
    if (Math.random() < 0.6) {
      debt = randRange(80000000, 350000000, 10000000);
    }
  } else if (filter === 'richest') {
    // Ép buộc gia cảnh thượng lưu / giàu có
    status = 'Trọn vẹn êm ấm';
    // Bố giám đốc hoặc chủ doanh nghiệp lớn
    const richTemplates = OCCUPATION_TEMPLATES.filter(t => t.maxIncome >= 60000000);
    const dadTpl = pickRandom(richTemplates);
    const dad = generateParent('Bố', familySurname);
    dad.occupation = dadTpl.occupation;
    dad.workplace = dadTpl.workplace;
    dad.position = dadTpl.position;
    dad.monthlyIncome = randRange(dadTpl.minIncome, dadTpl.maxIncome);
    parents.push(dad);

    const momTpl = pickRandom(OCCUPATION_TEMPLATES.filter(t => t.maxIncome >= 30000000));
    const mom = generateParent('Mẹ', familySurname);
    mom.occupation = momTpl.occupation;
    mom.workplace = momTpl.workplace;
    mom.position = momTpl.position;
    mom.monthlyIncome = randRange(momTpl.minIncome, momTpl.maxIncome);
    parents.push(mom);
  } else if (filter === 'rural') {
    // Nông thôn: làm nông, vườn tược hoặc tiểu thương chợ quê
    status = 'Trọn vẹn êm ấm';
    parents.push(generateParent('Bố', familySurname, 'agriculture'));
    parents.push(generateParent('Mẹ', familySurname, Math.random() < 0.5 ? 'agriculture' : 'trade'));
  } else if (filter === 'urban') {
    // Thành thị: công sở, ngân hàng hoặc công ty tư nhân
    status = 'Trọn vẹn êm ấm';
    parents.push(generateParent('Bố', familySurname, 'corporate'));
    parents.push(generateParent('Mẹ', familySurname, Math.random() < 0.5 ? 'corporate' : 'public'));
  } else {
    // Ngẫu nhiên tiêu chuẩn
    const statusRoll = Math.random();
    if (statusRoll < 0.70) {
      status = 'Trọn vẹn êm ấm';
      parents.push(generateParent('Bố', familySurname));
      parents.push(generateParent('Mẹ', familySurname));
    } else if (statusRoll < 0.82) {
      status = 'Mẹ đơn thân';
      parents.push(generateParent('Mẹ', familySurname));
    } else if (statusRoll < 0.90) {
      status = 'Bố đơn thân';
      parents.push(generateParent('Bố', familySurname));
    } else if (statusRoll < 0.96) {
      status = 'Mồ côi ở với ông bà';
      const grandPa = generateParent('Bố', familySurname, 'retired');
      grandPa.name = `${familySurname} Văn Ông`;
      grandPa.age = 70;
      parents.push(grandPa);
    } else {
      status = 'Vỡ nợ sa sút';
      parents.push(generateParent('Bố', familySurname, 'worker'));
      parents.push(generateParent('Mẹ', familySurname, 'worker'));
      debt = randRange(200000000, 800000000, 50000000);
    }
  }

  const totalMonthlyIncome = parents.reduce((sum, p) => sum + (p.alive ? p.monthlyIncome : 0), 0);
  const siblingsCount = Math.random() < 0.3 ? 0 : Math.random() < 0.7 ? 1 : 2;

  // Xác định tầng lớp
  let tier: SocioeconomicTier = 'Bình dân đủ ăn';
  if (debt > 300000000 || totalMonthlyIncome < 11000000) {
    tier = 'Hộ nghèo';
  } else if (totalMonthlyIncome < 28000000) {
    tier = 'Bình dân đủ ăn';
  } else if (totalMonthlyIncome < 70000000) {
    tier = 'Khá giả trung lưu';
  } else if (totalMonthlyIncome < 150000000) {
    tier = 'Thượng lưu giàu có';
  } else {
    tier = 'Đại gia tinh hoa';
  }

  // Tóm tắt văn bản
  let summaryText = '';
  if (tier === 'Hộ nghèo' || debt > 0) {
    summaryText = `Gia đình nghèo khó, ${debt > 0 ? 'đang gánh khoản nợ lớn; ' : ''}bố mẹ chắt chiu từng đồng ăn học; tuổi 18 của bạn đối mặt với nhiều lo toan cơm áo.`;
  } else if (tier === 'Bình dân đủ ăn') {
    summaryText = 'Gia đình bình dị, cơm no áo ấm; bố mẹ tần tảo làm lụng, mong con học hành thành tài để có tương lai sáng sủa hơn.';
  } else if (tier === 'Khá giả trung lưu') {
    summaryText = 'Gia cảnh khá giả, nếp nhà nề nếp; tài chính ổn định sẵn sàng chu cấp học đại học hoặc hỗ trợ nghề nghiệp tương lai.';
  } else {
    summaryText = 'Nhà rất dư dả, tiền sinh hoạt ít khi là nỗi lo; bố ấm áp, mẹ bao bọc; có anh chị em cùng lớn lên, vừa có bạn vừa phải học cách nhường nhịn.';
  }

  return {
    status,
    tier,
    totalMonthlyIncome,
    debt,
    summaryText,
    parents,
    homeTown,
    siblingsCount
  };
}
