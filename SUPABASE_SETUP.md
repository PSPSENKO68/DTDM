# Hướng dẫn thiết lập Supabase cho EduCare Center

Dự án EduCare Center sử dụng Supabase làm nền tảng cơ sở dữ liệu. Tài liệu này hướng dẫn cách thiết lập và cấu hình Supabase cho dự án.

## Thông tin kết nối

Thông tin kết nối Supabase được lưu trữ trong file `.env` tại thư mục gốc của dự án:

```
VITE_SUPABASE_URL=https://vsjqmxrjzdhesjpyjyac.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzanFteHJqemRoZXNqcHlqeWFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2ODkwNzMsImV4cCI6MjA2MjI2NTA3M30.WnPIQdm4YGl7f7M-MMBgtSDw9AkKv3Hr_9u15tRQ658
VITE_SUPABASE_SERVICE_ROLE=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzanFteHJqemRoZXNqcHlqeWFjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjY4OTA3MywiZXhwIjoyMDYyMjY1MDczfQ.anQoC4SK6wKt3yzFDHaQVqOQXK3DewwgThhSbX_xk1U
```

## Cấu trúc cơ sở dữ liệu

Dự án sử dụng các bảng sau trong Supabase:

1. `courses` - Thông tin về các khóa học
2. `instructors` - Thông tin về giảng viên
3. `course_instructors` - Liên kết giữa khóa học và giảng viên
4. `curriculum` - Nội dung chi tiết của từng khóa học theo tuần
5. `course_features` - Các tính năng/đặc điểm nổi bật của khóa học
6. `categories` - Danh mục khóa học
7. `levels` - Cấp độ khóa học
8. `users` - Thông tin người dùng
9. `registrations` - Đăng ký khóa học
10. `contact_submissions` - Biểu mẫu liên hệ

## Thiết lập cơ sở dữ liệu

### Cách 1: Sử dụng giao diện Supabase

1. Đăng nhập vào [Supabase Dashboard](https://app.supabase.com)
2. Chọn dự án của bạn
3. Vào mục SQL Editor
4. Sao chép nội dung của file `scripts/create-tables.sql` và thực thi
5. Sao chép nội dung của file `scripts/seed-data.sql` và thực thi

### Cách 2: Sử dụng Supabase CLI

1. Cài đặt Supabase CLI theo hướng dẫn tại: https://supabase.com/docs/guides/cli/getting-started
2. Đăng nhập vào CLI: `supabase login`
3. Kết nối vào dự án:
   ```
   supabase link --project-ref vsjqmxrjzdhesjpyjyac
   ```
4. Chạy các lệnh SQL:
   ```
   supabase db execute --file ./scripts/create-tables.sql
   supabase db execute --file ./scripts/seed-data.sql
   ```

## Tích hợp vào ứng dụng

Dự án đã được cấu hình để sử dụng Supabase thông qua các file:

- `src/lib/supabase.ts` - Client Supabase và định nghĩa types
- `src/services/courseService.ts` - Service xử lý dữ liệu khóa học
- `src/services/userService.ts` - Service xử lý đăng ký và liên hệ

## Phát triển về sau

### Bổ sung chức năng xác thực

Để thêm chức năng xác thực vào ứng dụng, sử dụng Auth APIs của Supabase:

```typescript
// Đăng ký
const { data, error } = await supabase.auth.signUp({
  email: 'example@email.com',
  password: 'example-password',
});

// Đăng nhập
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'example@email.com',
  password: 'example-password',
});
```

### Storage cho tệp tin và hình ảnh

Sử dụng Storage APIs của Supabase để quản lý tệp tin và hình ảnh:

```typescript
// Tải lên ảnh khóa học
const { data, error } = await supabase.storage
  .from('course-images')
  .upload('public/course-123.jpg', file);
```

### Tích hợp Salesforce CRM

Trong tương lai, dự án sẽ tích hợp với Salesforce CRM. Khi đó, bạn có thể:

1. Đồng bộ dữ liệu đăng ký khóa học từ Supabase sang Salesforce
2. Kết nối API Salesforce để quản lý khách hàng
3. Tạo Lead và Opportunity trong Salesforce từ đăng ký khóa học

## Tài liệu tham khảo

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/installing)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase Storage](https://supabase.com/docs/guides/storage) 