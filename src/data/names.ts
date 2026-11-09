export const SURNAMES = [
  'Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Phan', 'Vũ', 'Võ', 'Đặng', 
  'Bùi', 'Đỗ', 'Hồ', 'Ngô', 'Dương', 'Lý', 'Đinh', 'Đoàn', 'Lâm', 'Mai', 'Trịnh'
];

export const MALE_MIDDLE_NAMES = [
  'Văn', 'Hữu', 'Đức', 'Minh', 'Quang', 'Thành', 'Tuấn', 'Công', 'Gia', 'Hoàng', 'Bảo', 'Xuân', 'Đình'
];

export const FEMALE_MIDDLE_NAMES = [
  'Thị', 'Ngọc', 'Phương', 'Mai', 'Thanh', 'Khánh', 'Thu', 'Như', 'Bảo', 'Kim', 'Diệu', 'Tú', 'Yến'
];

export const MALE_GIVEN_NAMES = [
  'An', 'Bảo', 'Cường', 'Dũng', 'Đạt', 'Đức', 'Hải', 'Hiếu', 'Hoàng', 'Hùng',
  'Huy', 'Khoa', 'Kiên', 'Lâm', 'Long', 'Minh', 'Nam', 'Nghĩa', 'Nhật', 'Phong',
  'Phúc', 'Quân', 'Quang', 'Sơn', 'Tài', 'Tâm', 'Thắng', 'Thịnh', 'Trung', 'Tuấn',
  'Tùng', 'Việt', 'Vũ', 'Trọng', 'Khôi', 'Bách', 'Triết', 'Khánh', 'Nhân', 'Trí'
];

export const FEMALE_GIVEN_NAMES = [
  'Anh', 'Bình', 'Châu', 'Chi', 'Diệp', 'Dung', 'Duyên', 'Hà', 'Hân', 'Hằng',
  'Hiền', 'Hoa', 'Hương', 'Huyền', 'Khánh', 'Lan', 'Linh', 'Loan', 'Ly', 'Mai',
  'My', 'Nga', 'Ngân', 'Ngọc', 'Nhi', 'Như', 'Nhung', 'Phương', 'Quỳnh', 'Thảo',
  'Thu', 'Thủy', 'Thư', 'Trang', 'Trinh', 'Trúc', 'Tú', 'Uyên', 'Vân', 'Vy', 'Yến'
];

export const HOUSE_TYPES = [
  { name: 'nhà cấp bốn đơn sơ', cost: 0, minIncome: 0 },
  { name: 'nhà gỗ vách đất', cost: 0, minIncome: 0 },
  { name: 'nhà lá ven sông', cost: 0, minIncome: 0 },
  { name: 'căn nhà trong ngõ hẻm', cost: 0, minIncome: 8000000 },
  { name: 'nhà ống mặt phố', cost: 0, minIncome: 20000000 },
  { name: 'căn hộ chung cư ấm cúng', cost: 0, minIncome: 18000000 },
  { name: 'căn biệt thự khang trang', cost: 0, minIncome: 50000000 },
];

export const PARENT_JOBS = [
  { title: 'chạy xe ôm công nghệ', avgIncome: 7500000, category: 'lao động tự do' },
  { title: 'làm ruộng / trồng trọt', avgIncome: 5500000, category: 'nông nghiệp' },
  { title: 'buôn bán hàng rong / chợ nhỏ', avgIncome: 6500000, category: 'tiểu thương' },
  { title: 'công nhân khu công nghiệp', avgIncome: 8500000, category: 'lao động phổ thông' },
  { title: 'thợ mộc / thợ xây', avgIncome: 9000000, category: 'thợ thủ công' },
  { title: 'giáo viên trường làng', avgIncome: 9500000, category: 'viên chức' },
  { title: 'nhân viên văn phòng', avgIncome: 12000000, category: 'văn phòng' },
  { title: 'kỹ sư công nghệ', avgIncome: 25000000, category: 'chuyên môn cao' },
  { title: 'bác sĩ bệnh viện tỉnh', avgIncome: 22000000, category: 'y tế' },
  { title: 'chủ cửa hàng tạp hóa', avgIncome: 15000000, category: 'kinh doanh' },
  { title: 'cán bộ xã / phường', avgIncome: 10000000, category: 'công chức' },
  { title: 'doanh nhân kinh doanh tư nhân', avgIncome: 45000000, category: 'doanh nghiệp' },
];

export const TALENTS = [
  'Toán học & Logic',
  'Văn chương & Cảm xúc',
  'Hội họa & Mỹ thuật',
  'Âm nhạc & Ca hát',
  'Thể thao & Vận động',
  'Kinh doanh & Tài chính',
  'Giao tiếp & Thuyết phục',
  'Công nghệ & Lập trình'
];

export const ZODIAC_SIGNS = [
  'Bạch Dương', 'Kim Ngưu', 'Song Tử', 'Cự Giải', 
  'Sư Tử', 'Xử Nữ', 'Thiên Bình', 'Bọ Cạp', 
  'Nhân Mã', 'Ma Kết', 'Bảo Bình', 'Song Ngư'
];

export const CAN_CHI_HOURS = [
  'Tý (23h - 01h)', 'Sửu (01h - 03h)', 'Dần (03h - 05h)', 'Mão (05h - 07h)',
  'Thìn (07h - 09h)', 'Tỵ (09h - 11h)', 'Ngọ (11h - 13h)', 'Mùi (13h - 15h)',
  'Thân (15h - 17h)', 'Dậu (17h - 19h)', 'Tuất (19h - 21h)', 'Hợi (21h - 23h)'
];
