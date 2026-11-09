# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Người dùng trẻ và game thủ Việt Nam tìm kiếm trải nghiệm game mô phỏng cuộc đời giàu cảm xúc, hoài niệm văn hóa Việt Nam và có giá trị chơi lại cao qua từng ngã rẽ quyết định.

## Product Purpose

Mô phỏng chân thực từng năm cuộc đời của một con người sinh ra và lớn lên trong bối cảnh xã hội, văn hóa Việt Nam từ tiếng khóc chào đời, qua tuổi thơ, trường học, lập nghiệp, tình duyên cho đến lúc về già. Giúp người chơi trải nghiệm nhiều số phận khác nhau và chiêm nghiệm thông điệp nhân văn về giá trị của mỗi lựa chọn trong cuộc sống.

## Positioning

Trải nghiệm nhập vai thuần cốt truyện nhiều nhánh rẽ (Interactive Fiction) gắn liền với hiện thực đời sống và văn hóa Việt Nam sâu sắc (63 tỉnh thành, 54 dân tộc anh em, kỳ thi vào 10, tốt nghiệp THPT, nghề nghiệp đặc thù, phong vị địa phương) kết hợp avatar lão hóa theo độ tuổi và nhiều kết cục giàu tính nhân văn, tạo nên bản sắc độc bản mà các game mô phỏng quốc tế không thể mang lại.

## Operating Context

Chơi trực tiếp trên trình duyệt web cả máy tính và thiết bị di động trong các phiên chơi cá nhân từ 10 - 30 phút một kiếp người. Hoàn toàn không cần cài đặt hay đăng nhập tài khoản.

## Capabilities and Constraints

- Khởi tạo ngẫu nhiên nhân vật dựa trên thống kê thực tế về phân bố dân số, tỉnh thành, dân tộc, tên họ và gia cảnh xuất thân.
- Tiến trình thời gian theo từng năm (Aging System) với các sự kiện thích ứng theo từng giai đoạn lứa tuổi (nhi đồng, học đường, trưởng thành, lão niên).
- Hệ thống chỉ số nhân vật (Sức khỏe, Trí tuệ, Hạnh phúc, Tài chính) biến động dựa trên lựa chọn và biến cố đời sống.
- Avatar nhân vật biến đổi trực quan phản ánh đúng giai đoạn tuổi tác.
- Hệ thống nhánh rẽ sự kiện phong phú với nhiều kết cục đa dạng.
- Ràng buộc kỹ thuật: Thuần Client-side web application (React 19 + TypeScript + Tailwind CSS v4 + Zustand Store), lưu trữ cục bộ qua LocalStorage; vận hành mượt mà không phụ thuộc vào backend.

## Brand Commitments

- Tên dự án: Kiếp Nhân Sinh (Vietnamese Life Simulator).
- Thông điệp chủ đạo: "Một lần sinh ra. Vạn ngã rẽ. Mỗi lựa chọn, một số phận."
- Giọng điệu: Giàu chất tự sự, hoài niệm, ấm áp, chân thành, tôn trọng sự đa dạng văn hóa vùng miền và dân tộc.

## Evidence on Hand

- Dữ liệu 63 tỉnh thành và tỉ lệ dân số tại `src/data/provinces.ts`.
- Dữ liệu 54 dân tộc Việt Nam tại `src/data/ethnicities.ts`.
- Thư viện tên họ phổ biến tại `src/data/names.ts`.
- Kho sự kiện phân tầng theo lứa tuổi tại `src/data/childhoodEvents.ts`, `src/data/schoolEvents.ts`, `src/data/adulthoodEvents.ts`, `src/data/seniorEvents.ts`.
- Engine mô phỏng và tạo nhân vật tại `src/engine/`.

## Product Principles

1. **Thấm đẫm hồn Việt:** Mọi cột mốc, sự kiện, chi tiết đời sống đều bắt nguồn từ thực tế văn hóa và tâm lý con người Việt Nam.
2. **Nhân văn & Chiều sâu:** Ưu tiên chiều sâu tự sự và ý nghĩa nhân sinh của từng ngã rẽ hơn là những tình huống giật gân, hời hợt.
3. **Mượt mà & Tiếp cận tức thì:** Không rào cản đăng nhập, giao diện phản hồi nhanh chóng, tối ưu mượt mà trên cả điện thoại và máy tính.
4. **Tôn trọng sự đa dạng:** Phản ánh công bằng, chân thực và tôn trọng bản sắc của các dân tộc và vùng miền từ miền núi, đồng bằng đến đô thị.

## Accessibility & Inclusion

- Thiết kế đáp ứng tối ưu (Mobile-first & Desktop-friendly).
- Độ tương phản chữ và kích thước hiển thị thân thiện cho việc đọc các đoạn tự sự dài mà không gây mỏi mắt.
