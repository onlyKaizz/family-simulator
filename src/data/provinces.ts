export interface ProvinceData {
  name: string;
  region: 'Bắc Bộ' | 'Trung Bộ' | 'Nam Bộ' | 'Tây Nguyên';
  weight: number; // Tỉ lệ dân số tương đối
  livingCostIndex: number; // 1.0 = chuẩn, 1.3 = TP.HCM / Hà Nội
  features: string;
}

export const PROVINCES: ProvinceData[] = [
  // Các đô thị lớn
  { name: 'Hà Nội', region: 'Bắc Bộ', weight: 8.5, livingCostIndex: 1.35, features: 'thủ đô nghìn năm văn hiến, phố phường nhộn nhịp' },
  { name: 'TP. Hồ Chí Minh', region: 'Nam Bộ', weight: 9.3, livingCostIndex: 1.4, features: 'trung tâm kinh tế sầm uất bậc nhất' },
  { name: 'Đà Nẵng', region: 'Trung Bộ', weight: 1.3, livingCostIndex: 1.15, features: 'thành phố biển đáng sống' },
  { name: 'Hải Phòng', region: 'Bắc Bộ', weight: 2.1, livingCostIndex: 1.1, features: 'thành phố hoa phượng đỏ, cảng biển tấp nập' },
  { name: 'Cần Thơ', region: 'Nam Bộ', weight: 1.3, livingCostIndex: 1.05, features: 'thủ phủ miền Tây sông nước gạo trắng nước trong' },

  // Miền Bắc
  { name: 'Quảng Ninh', region: 'Bắc Bộ', weight: 1.4, livingCostIndex: 1.1, features: 'vùng đất mỏ và kỳ quan vịnh Hạ Long' },
  { name: 'Bắc Ninh', region: 'Bắc Bộ', weight: 1.5, livingCostIndex: 1.05, features: 'miền quan họ và các khu công nghiệp công nghệ cao' },
  { name: 'Hải Dương', region: 'Bắc Bộ', weight: 1.9, livingCostIndex: 0.95, features: 'vùng đất địa linh nhân kiệt' },
  { name: 'Hưng Yên', region: 'Bắc Bộ', weight: 1.3, livingCostIndex: 0.95, features: 'đất nhãn lồng trứ danh' },
  { name: 'Nam Định', region: 'Bắc Bộ', weight: 1.8, livingCostIndex: 0.9, features: 'vùng đất học truyền thống' },
  { name: 'Thái Bình', region: 'Bắc Bộ', weight: 1.9, livingCostIndex: 0.9, features: 'quê hương năm tấn bên những cánh đồng thẳng cánh cò bay' },
  { name: 'Ninh Bình', region: 'Bắc Bộ', weight: 1.0, livingCostIndex: 0.95, features: 'cố đô Hoa Lư với non nước Tràng An hùng vĩ' },
  { name: 'Hà Nam', region: 'Bắc Bộ', weight: 0.9, livingCostIndex: 0.9, features: 'vùng châu thổ yên bình bên sông Đáy' },
  { name: 'Vĩnh Phúc', region: 'Bắc Bộ', weight: 1.2, livingCostIndex: 1.0, features: 'vùng bán sơn địa với dãy Tam Đảo mờ sương' },
  { name: 'Phú Thọ', region: 'Bắc Bộ', weight: 1.5, livingCostIndex: 0.9, features: 'vùng đất Tổ Hùng Vương' },
  { name: 'Thái Nguyên', region: 'Bắc Bộ', weight: 1.3, livingCostIndex: 0.95, features: 'thủ phủ trà xanh Tân Cương ngút ngàn' },
  { name: 'Bắc Giang', region: 'Bắc Bộ', weight: 1.8, livingCostIndex: 0.95, features: 'vùng đất vải thiều Lục Ngạn ngọt lành' },
  { name: 'Lạng Sơn', region: 'Bắc Bộ', weight: 0.8, livingCostIndex: 0.9, features: 'xứ Lạng bên ải Chi Lăng và phố chợ Kỳ Lừa' },
  { name: 'Cao Bằng', region: 'Bắc Bộ', weight: 0.6, livingCostIndex: 0.85, features: 'non nước Cao Bằng cùng thác Bản Giốc hùng tráng' },
  { name: 'Hà Giang', region: 'Bắc Bộ', weight: 0.9, livingCostIndex: 0.85, features: 'cao nguyên đá Đồng Văn kỳ vĩ nơi địa đầu Tổ quốc' },
  { name: 'Lào Cai', region: 'Bắc Bộ', weight: 0.8, livingCostIndex: 0.95, features: 'xứ sở mây mù Sa Pa và đỉnh Fansipan nóc nhà Đông Dương' },
  { name: 'Yên Bái', region: 'Bắc Bộ', weight: 0.8, livingCostIndex: 0.85, features: 'những bậc thang vàng Mù Cang Chải rực rỡ' },
  { name: 'Sơn La', region: 'Bắc Bộ', weight: 1.3, livingCostIndex: 0.85, features: 'cao nguyên Mộc Châu xanh mướt đồi chè' },
  { name: 'Điện Biên', region: 'Bắc Bộ', weight: 0.6, livingCostIndex: 0.85, features: 'mảnh đất lịch sử Điện Biên Phủ lừng lẫy' },
  { name: 'Lai Châu', region: 'Bắc Bộ', weight: 0.5, livingCostIndex: 0.85, features: 'những đỉnh núi quanh năm chìm trong mây phủ' },
  { name: 'Hòa Bình', region: 'Bắc Bộ', weight: 0.9, livingCostIndex: 0.9, features: 'cửa ngõ Tây Bắc rộn rã tiếng cồng chiêng Mường' },
  { name: 'Bắc Kạn', region: 'Bắc Bộ', weight: 0.4, livingCostIndex: 0.85, features: 'hồ Ba Bể trong xanh biếc giữa núi rừng' },
  { name: 'Tuyên Quang', region: 'Bắc Bộ', weight: 0.8, livingCostIndex: 0.85, features: 'thủ đô kháng chiến bên dòng sông Lô' },

  // Miền Trung
  { name: 'Thanh Hóa', region: 'Trung Bộ', weight: 3.7, livingCostIndex: 0.9, features: 'mảnh đất địa linh nhân kiệt rộng lớn bên bờ sông Mã' },
  { name: 'Nghệ An', region: 'Trung Bộ', weight: 3.4, livingCostIndex: 0.9, features: 'quê hương Bác Hồ mộc mạc và kiên cường' },
  { name: 'Hà Tĩnh', region: 'Trung Bộ', weight: 1.3, livingCostIndex: 0.88, features: 'vùng quê bên dòng sông La và dãy Hồng Lĩnh' },
  { name: 'Quảng Bình', region: 'Trung Bộ', weight: 0.9, livingCostIndex: 0.9, features: 'vương quốc hang động Phong Nha - Kẻ Bàng' },
  { name: 'Quảng Trị', region: 'Trung Bộ', weight: 0.7, livingCostIndex: 0.88, features: 'vùng đất nghĩa tình bên dòng sông Bến Hải' },
  { name: 'Thừa Thiên Huế', region: 'Trung Bộ', weight: 1.2, livingCostIndex: 0.95, features: 'cố đô trầm mặc bên dòng sông Hương thơ mộng' },
  { name: 'Quảng Nam', region: 'Trung Bộ', weight: 1.5, livingCostIndex: 0.95, features: 'phố cổ Hội An hoài niệm và thánh địa Mỹ Sơn' },
  { name: 'Quảng Ngãi', region: 'Trung Bộ', weight: 1.3, livingCostIndex: 0.9, features: 'vùng đất quế Trà Bồng và biển đảo Lý Sơn' },
  { name: 'Bình Định', region: 'Trung Bộ', weight: 1.5, livingCostIndex: 0.9, features: 'miền đất võ Tây Sơn hào khí' },
  { name: 'Phú Yên', region: 'Trung Bộ', weight: 0.9, livingCostIndex: 0.9, features: 'xứ hoa vàng trên cỏ xanh bên bờ gành Đá Đĩa' },
  { name: 'Khánh Hòa', region: 'Trung Bộ', weight: 1.3, livingCostIndex: 1.1, features: 'thành phố biển Nha Trang cát trắng nắng vàng' },
  { name: 'Ninh Thuận', region: 'Trung Bộ', weight: 0.6, livingCostIndex: 0.88, features: 'vùng đất của nắng, gió, vườn nho và tháp Chăm' },
  { name: 'Bình Thuận', region: 'Trung Bộ', weight: 1.3, livingCostIndex: 0.95, features: 'những đồi cát bay Mũi Né tuyệt đẹp' },

  // Tây Nguyên
  { name: 'Đắk Lắk', region: 'Tây Nguyên', weight: 1.9, livingCostIndex: 0.9, features: 'thủ phủ cà phê Buôn Ma Thuột vang bóng đại ngàn' },
  { name: 'Lâm Đồng', region: 'Tây Nguyên', weight: 1.4, livingCostIndex: 1.05, features: 'thành phố sương mù Đà Lạt rực rỡ muôn sắc hoa' },
  { name: 'Gia Lai', region: 'Tây Nguyên', weight: 1.5, livingCostIndex: 0.88, features: 'biển hồ Tơ Nưng xanh ngắt giữa đại ngàn' },
  { name: 'Kon Tum', region: 'Tây Nguyên', weight: 0.6, livingCostIndex: 0.85, features: 'nhà rông Bahnar sừng sững bên sông Đăk Bla' },
  { name: 'Đắk Nông', region: 'Tây Nguyên', weight: 0.7, livingCostIndex: 0.88, features: 'vùng đất bazan màu mỡ bên hồ Tà Đùng' },

  // Miền Nam & ĐBSCL
  { name: 'Bình Dương', region: 'Nam Bộ', weight: 2.6, livingCostIndex: 1.15, features: 'thủ phủ công nghiệp phát triển sôi động' },
  { name: 'Đồng Nai', region: 'Nam Bộ', weight: 3.2, livingCostIndex: 1.1, features: 'cửa ngõ giao thương sầm uất miền Đông Nam Bộ' },
  { name: 'Bà Rịa – Vũng Tàu', region: 'Nam Bộ', weight: 1.2, livingCostIndex: 1.15, features: 'thành phố dầu khí và biển xanh vẫy gọi' },
  { name: 'Tây Ninh', region: 'Nam Bộ', weight: 1.2, livingCostIndex: 0.95, features: 'đất thánh Cao Đài và ngọn núi Bà Đen hùng vĩ' },
  { name: 'Bình Phước', region: 'Nam Bộ', weight: 1.0, livingCostIndex: 0.9, features: 'bạt ngàn rừng cao su và vườn điều trĩu quả' },
  { name: 'Long An', region: 'Nam Bộ', weight: 1.7, livingCostIndex: 1.0, features: 'vùng đất nối liền Đông Nam Bộ và đồng bằng sông Cửu Long' },
  { name: 'Tiền Giang', region: 'Nam Bộ', weight: 1.8, livingCostIndex: 0.95, features: 'vùng cây trái miệt vườn trù phú ven sông Tiền' },
  { name: 'Bến Tre', region: 'Nam Bộ', weight: 1.3, livingCostIndex: 0.9, features: 'xứ dừa thơ mộng với những rặng dừa xanh soi bóng' },
  { name: 'Đồng Tháp', region: 'Nam Bộ', weight: 1.6, livingCostIndex: 0.9, features: 'vùng đất sen hồng Tháp Mười thơm ngát' },
  { name: 'Vĩnh Long', region: 'Nam Bộ', weight: 1.0, livingCostIndex: 0.9, features: 'vùng cù lao tươi tốt cây trái bốn mùa' },
  { name: 'An Giang', region: 'Nam Bộ', weight: 1.9, livingCostIndex: 0.9, features: 'vùng đất Thất Sơn huyền bí và miếu Bà Chúa Xứ' },
  { name: 'Kiên Giang', region: 'Nam Bộ', weight: 1.7, livingCostIndex: 1.05, features: 'đảo ngọc Phú Quốc biển xanh cát trắng' },
  { name: 'Hậu Giang', region: 'Nam Bộ', weight: 0.8, livingCostIndex: 0.88, features: 'chợ nổi Ngã Bảy tấp nập ghe xuồng' },
  { name: 'Trà Vinh', region: 'Nam Bộ', weight: 1.0, livingCostIndex: 0.88, features: 'xứ sở cổ kính với những ngôi chùa Khmer rực rỡ' },
  { name: 'Sóc Trăng', region: 'Nam Bộ', weight: 1.2, livingCostIndex: 0.88, features: 'lễ hội đua ghe Ngo rộn rã khúc ca mừng mùa' },
  { name: 'Bạc Liêu', region: 'Nam Bộ', weight: 0.9, livingCostIndex: 0.9, features: 'quê hương Dạ Cổ Hoài Lang và giai thoại Công tử Bạc Liêu' },
  { name: 'Cà Mau', region: 'Nam Bộ', weight: 1.2, livingCostIndex: 0.9, features: 'mũi Cà Mau cuối trời Tổ quốc rợp bóng rừng đước ngập mặn' },
];
