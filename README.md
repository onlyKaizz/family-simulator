# Kiếp Nhân Sinh (Vietnamese Life Simulator)

> **"Một lần sinh ra. Vạn ngã rẽ. Mỗi lựa chọn, một số phận."**

**Kiếp Nhân Sinh** là tựa game web mô phỏng cuộc đời theo từng năm (Text-based RPG Life Simulator), lấy bối cảnh xã hội, văn hóa và con người Việt Nam hiện đại. Người chơi sẽ đồng hành cùng nhân vật từ tiếng khóc chào đời, qua tuổi thơ êm đềm, những kì thi bước ngoặt (vào lớp 10, đại học), chọn nghề lập nghiệp, tình duyên, gia đình cho đến những năm tháng tuổi già.

Dự án được xây dựng với mục tiêu nâng cấp toàn diện trải nghiệm thị giác (UI/UX), cấu trúc mã nguồn hiện đại và hệ thống mô phỏng thông minh.

---

## ✨ Điểm nổi bật & Cải tiến

1. **Bản sắc & Bối cảnh Việt Nam sâu sắc:**
   - Dữ liệu 63 tỉnh thành & vùng miền, tỉ lệ sinh theo dân số thực tế.
   - Đầy đủ 54 dân tộc anh em với tập quán và phong vị địa phương.
   - Ký ức tuổi thơ gần gũi: thôi nôi bốc đồ vật, kẹo kéo, tò he, ném răng lên mái nhà, kết nạp Đội...
   - Hệ thống thi cử Việt Nam: Kỳ thi vào lớp 10, Thi tốt nghiệp THPT & Đại học (Khối A, B, C, D...).
   - Nghề nghiệp đa dạng: Từ công chức, công an, bác sĩ, giáo viên, shipper đến streamer, tuyển thủ esports, kỳ thủ cờ vua.

2. **Cải tiến Công nghệ & Thị giác (Modern Tech Stack):**
   - **Framework:** React 19 + TypeScript + Vite (siêu nhanh, an toàn kiểu dữ liệu).
   - **Styling:** Tailwind CSS v4 với giao diện Glassmorphism / Dark Mode sang trọng, ấm cúng.
   - **Avatar Generator:** Avatar khuôn mặt tự động biến đổi theo từng độ tuổi (sơ sinh, nhi đồng, thiếu niên, trưởng thành, lão niên).
   - **Quản lý trạng thái:** Zustand Store dạng modular, dễ mở rộng và lưu trữ (Local Storage Autosave).
   - **Biểu đồ & Hiệu ứng:** Theo dõi biến động tài chính/chỉ số cuộc đời trực quan.

---

## 🛠️ Cài đặt & Chạy cục bộ

```bash
# Cài đặt thư viện
npm install

# Chạy môi trường phát triển (Dev server)
npm run dev

# Đóng gói xuất bản (Production build)
npm run build
```

---

## 📜 Lời cảm ơn & Ghi nhận (Attribution)
- Lấy cảm hứng từ thể loại Life Simulator và dự án [motdoi.site](https://motdoi.site/).
- Sử dụng dữ liệu dân số tham khảo từ Tổng cục Thống kê Việt Nam (GSO) và tập dữ liệu mã nguồn mở `Nemotron-Personas-Vietnam` (CC BY 4.0).
- Giấy phép: MIT License.
