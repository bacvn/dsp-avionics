# DSP Avionics — hướng dẫn cho coding agent

- Nội dung và giao diện chính dùng tiếng Việt, thuật ngữ tiếng Anh được giữ khi phổ biến trong ngành.
- Công thức toán viết bằng LaTeX trong Markdown/MDX.
- Mỗi bài học mới cần có `title`, `description`, mục tiêu, phần lý thuyết, ví dụ hoặc hoạt động, và câu hỏi tự kiểm tra.
- Ưu tiên trực giác kỹ thuật trước khi trình bày phép biến đổi dài.
- Không thêm backend, đăng nhập hoặc cơ sở dữ liệu nếu chưa có yêu cầu rõ ràng.
- Thành phần tương tác phải dùng được bằng bàn phím, trên thiết bị di động và không phụ thuộc dịch vụ bên ngoài.
- Không đổi URL của bài đã xuất bản nếu chưa có kế hoạch redirect.
- Sau khi chỉnh sửa phải chạy `pnpm check` và `pnpm build`.

## Tiết kiệm context và tool output

- Chỉ đọc đúng đoạn file cần thiết bằng `rg -n`, `Select-String` hoặc truy vấn có phạm vi; không đọc toàn bộ file lớn nếu chưa cần.
- Gom các thay đổi liên quan vào một patch hoàn chỉnh thay vì thực hiện nhiều patch nhỏ tuần tự.
- Không chạy `pnpm check` hoặc `pnpm build` sau từng chỉnh sửa nhỏ. Chạy `pnpm check` sau một cụm thay đổi và chạy `pnpm build` một lần khi hoàn tất.
- Giới hạn output của lệnh ở mức đủ để chẩn đoán; không đưa warning hoặc log lặp lại vào context nếu không liên quan đến thay đổi hiện tại.
- Khi kiểm tra giao diện, ưu tiên truy vấn DOM trả về object nhỏ gồm các chỉ số cần thiết. Chỉ lấy accessibility tree đầy đủ hoặc screenshot khi cần đánh giá trực quan.
- Tái sử dụng tab, browser session và trạng thái tool hiện có; tránh khởi tạo lại công cụ nếu không cần.
- Gộp các kiểm tra độc lập vào cùng một lượt khi an toàn và hợp lý.
- Không kiểm tra lại trạng thái đã được xác nhận nếu không có thay đổi có thể ảnh hưởng đến trạng thái đó.
- Báo cáo tiến độ và kết quả ngắn gọn, không lặp lại nội dung đã biết.
- Quy trình mặc định: đọc có mục tiêu → gom một cụm thay đổi → `pnpm check` → một lượt QA giao diện có mục tiêu → `pnpm build` cuối cùng → báo cáo ngắn.
