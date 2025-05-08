# EduCare Center - Hệ thống đăng ký khóa học trực tuyến

EduCare Center là một ứng dụng web giúp người dùng dễ dàng tìm kiếm, tham khảo và đăng ký các khóa học tiếng Anh với quy trình xác nhận email đơn giản và hiệu quả.

## Tính năng

- Hiển thị danh sách khóa học với đầy đủ thông tin chi tiết
- Đăng ký khóa học với xác thực email
- Quản lý tài khoản người dùng
- Giao diện người dùng trực quan và thân thiện
- Tương thích với nhiều thiết bị (responsive design)

## Cài đặt

1. Clone repository:
```bash
git clone <repository-url>
cd educare-center
```

2. Cài đặt các dependencies:
```bash
npm install
```

3. Tạo file `.env` dựa trên file `.env.example` và cấu hình Supabase:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Khởi chạy ứng dụng ở môi trường phát triển:
```bash
npm run dev
```

## Cấu hình Supabase cho xác thực email

1. Tạo tài khoản Supabase tại [https://supabase.com/](https://supabase.com/)
2. Tạo một project mới
3. Cấu hình Email Auth:
   - Trong project dashboard, vào mục **Authentication** > **Providers**
   - Bật **Email** và cấu hình theo nhu cầu
   - Thêm domain website của bạn vào danh sách **Site URL** (vd: `http://localhost:5173` cho môi trường dev)
   - Thiết lập **Redirect URLs** thành `http://your-domain/verify-email`

4. Cấu hình SMTP (nếu cần):
   - Trong mục **Authentication** > **Email Templates**
   - Kết nối với dịch vụ email hoặc sử dụng Supabase SMTP mặc định
   - Tùy chỉnh mẫu email xác nhận theo nhu cầu

5. Tạo cơ sở dữ liệu:
   - Trong mục **Table Editor**, tạo các bảng cần thiết: 
     - users
     - courses
     - registrations
     - ...vv

## Quy trình đăng ký khóa học

1. Người dùng duyệt danh sách khóa học và chọn khóa học muốn đăng ký
2. Người dùng điền thông tin vào form đăng ký (họ tên, email, số điện thoại, khóa học, v.v.)
3. Hệ thống gửi email xác nhận đến địa chỉ email được cung cấp
4. Người dùng nhấp vào liên kết xác nhận trong email
5. Hệ thống xác nhận đăng ký và cập nhật trạng thái trong cơ sở dữ liệu
6. Người dùng được chuyển hướng đến trang xác nhận đăng ký thành công

## Cấu trúc dự án

```
src/
├── components/        # Các component UI
├── pages/             # Các trang chính của ứng dụng
├── services/          # Logic xử lý dữ liệu và API
├── lib/               # Thư viện, tiện ích
├── assets/            # Hình ảnh, font, v.v.
└── App.tsx            # Root component
```

## Công nghệ sử dụng

- React + TypeScript
- Vite
- TailwindCSS
- Supabase (Authentication & Database)
- React Router v6

## Người đóng góp

- [Tên của bạn](github-profile-link)

## Giấy phép

MIT 