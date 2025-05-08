-- Insert sample instructors
INSERT INTO instructors (id, name, image, qualification)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'ThS. Nguyễn Văn A', 'https://images.pexels.com/photos/5212339/pexels-photo-5212339.jpeg', 'IELTS 8.5, 10 năm kinh nghiệm giảng dạy'),
  ('22222222-2222-2222-2222-222222222222', 'ThS. Trần Thị B', 'https://images.pexels.com/photos/8617841/pexels-photo-8617841.jpeg', 'IELTS 8.0, Chuyên gia luyện thi IELTS Writing'),
  ('33333333-3333-3333-3333-333333333333', 'ThS. Phạm Văn C', 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg', 'TOEIC 990, 8 năm kinh nghiệm luyện thi TOEIC');

-- Insert sample courses
INSERT INTO courses (
  id, title, description, full_description, image, category, 
  level, duration, schedule, price, rating, num_reviews
)
VALUES
  (
    '44444444-4444-4444-4444-444444444444',
    'Luyện thi IELTS',
    'Khóa học cung cấp phương pháp học tập hiệu quả và luyện thi chuyên sâu cho kỳ thi IELTS. Học viên sẽ được luyện tập đầy đủ 4 kỹ năng Nghe, Nói, Đọc, Viết với giáo viên có chứng chỉ IELTS 8.0+.',
    '<p>Khóa học Luyện thi IELTS tại EduCare Center được thiết kế dành riêng cho những học viên mong muốn đạt điểm số IELTS cao trong thời gian ngắn. Với phương pháp giảng dạy tiên tiến và đội ngũ giáo viên giàu kinh nghiệm, chúng tôi cam kết mang đến trải nghiệm học tập hiệu quả nhất.</p><p>Trong khóa học, học viên sẽ được:</p><ul><li>Làm quen với cấu trúc và yêu cầu của kỳ thi IELTS</li><li>Phát triển toàn diện 4 kỹ năng: Nghe, Nói, Đọc, Viết</li><li>Học các chiến lược làm bài thi hiệu quả</li><li>Thực hành với nhiều đề thi thực tế</li><li>Nhận phản hồi chi tiết và hướng dẫn cá nhân từ giáo viên</li></ul>',
    'https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg',
    'exam-prep',
    'intermediate-advanced',
    '3 tháng',
    'Thứ 2, 4, 6 (18:00 - 20:00)',
    '6,500,000 VND',
    4.8,
    125
  ),
  (
    '55555555-5555-5555-5555-555555555555',
    'Luyện thi TOEIC',
    'Phương pháp học tập hiệu quả giúp học viên đạt điểm TOEIC cao trong thời gian ngắn. Khóa học tập trung vào các chiến lược làm bài thi và bí quyết đạt điểm cao cho cả 2 phần Listening và Reading.',
    '<p>Khóa học Luyện thi TOEIC tại EduCare Center giúp học viên nâng cao trình độ tiếng Anh và chinh phục điểm số TOEIC cao một cách nhanh chóng và hiệu quả. Với phương pháp giảng dạy đặc biệt, chúng tôi tập trung vào việc phát triển kỹ năng làm bài thi và cung cấp các chiến lược thiết thực.</p><p>Khóa học mang đến cho học viên:</p><ul><li>Phương pháp làm bài thi TOEIC hiệu quả</li><li>Kỹ thuật nghe và đọc hiểu nâng cao</li><li>Từ vựng và ngữ pháp trọng tâm cho TOEIC</li><li>Nhiều bài tập thực hành với đề thi thực tế</li><li>Theo dõi tiến độ học tập và đánh giá định kỳ</li></ul>',
    'https://images.pexels.com/photos/5212339/pexels-photo-5212339.jpeg',
    'exam-prep',
    'beginner-intermediate',
    '2 tháng',
    'Thứ 3, 5, 7 (18:00 - 20:00)',
    '4,800,000 VND',
    4.7,
    156
  ),
  (
    '66666666-6666-6666-6666-666666666666',
    'Tiếng Anh thương mại',
    'Trang bị kỹ năng tiếng Anh chuyên ngành phục vụ công việc trong môi trường doanh nghiệp. Học viên sẽ học cách viết email, báo cáo, thuyết trình và đàm phán bằng tiếng Anh một cách chuyên nghiệp.',
    '<p>Khóa học Tiếng Anh thương mại tại EduCare Center được thiết kế dành cho những học viên đang làm việc hoặc chuẩn bị làm việc trong môi trường doanh nghiệp quốc tế. Với nội dung thực tế và cập nhật, học viên sẽ được trang bị đầy đủ những kỹ năng cần thiết để giao tiếp hiệu quả trong công việc.</p><p>Khóa học tập trung vào:</p><ul><li>Từ vựng và thuật ngữ chuyên ngành kinh doanh</li><li>Kỹ năng viết email và báo cáo chuyên nghiệp</li><li>Kỹ năng thuyết trình và họp hành bằng tiếng Anh</li><li>Kỹ năng đàm phán và giải quyết vấn đề</li><li>Kỹ năng giao tiếp qua điện thoại và trực tuyến</li></ul>',
    'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
    'specialized',
    'intermediate-advanced',
    '2.5 tháng',
    'Thứ 2, 4, 6 (19:00 - 21:00)',
    '5,200,000 VND',
    4.6,
    98
  );

-- Link instructors to courses
INSERT INTO course_instructors (course_id, instructor_id)
VALUES
  ('44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111'),
  ('44444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222'),
  ('55555555-5555-5555-5555-555555555555', '33333333-3333-3333-3333-333333333333');

-- Add curriculum for IELTS course
INSERT INTO curriculum (course_id, week, title, content)
VALUES
  ('44444444-4444-4444-4444-444444444444', 1, 'Làm quen với IELTS và Kỹ năng Nghe', 'Giới thiệu về cấu trúc kỳ thi IELTS, Chiến lược làm bài thi Nghe, Thực hành với các dạng bài Nghe cơ bản'),
  ('44444444-4444-4444-4444-444444444444', 2, 'Kỹ năng Đọc hiểu', 'Kỹ thuật đọc lướt và đọc hiểu, Chiến lược làm các dạng bài trong IELTS Reading, Thực hành với các bài đọc thực tế'),
  ('44444444-4444-4444-4444-444444444444', 3, 'Kỹ năng Viết Task 1', 'Cấu trúc bài viết Task 1, Cách mô tả biểu đồ, bảng biểu, Từ vựng học thuật cho Task 1'),
  ('44444444-4444-4444-4444-444444444444', 4, 'Kỹ năng Viết Task 2', 'Cấu trúc bài luận Task 2, Phân tích đề bài, Cách phát triển ý tưởng, Từ vựng và cấu trúc ngữ pháp nâng cao'),
  ('44444444-4444-4444-4444-444444444444', 5, 'Kỹ năng Nói', 'Chiến lược trả lời các phần thi Nói, Phát triển từ vựng chuyên đề, Thực hành phỏng vấn'),
  ('44444444-4444-4444-4444-444444444444', 6, 'Ôn tập và Luyện đề', 'Luyện tập với đề thi đầy đủ, Phản hồi và đánh giá, Chiến lược làm bài thi hiệu quả');

-- Add curriculum for TOEIC course
INSERT INTO curriculum (course_id, week, title, content)
VALUES
  ('55555555-5555-5555-5555-555555555555', 1, 'Giới thiệu và Đánh giá', 'Làm quen với cấu trúc bài thi TOEIC, Bài kiểm tra đánh giá trình độ, Xây dựng lộ trình học tập cá nhân'),
  ('55555555-5555-5555-5555-555555555555', 2, 'TOEIC Listening cơ bản', 'Các dạng câu hỏi trong phần Listening, Chiến lược nghe hiểu, Thực hành với Part 1-4'),
  ('55555555-5555-5555-5555-555555555555', 3, 'TOEIC Reading cơ bản', 'Các dạng câu hỏi trong phần Reading, Kỹ thuật đọc hiểu nhanh, Thực hành với Part 5-7'),
  ('55555555-5555-5555-5555-555555555555', 4, 'Từ vựng và Ngữ pháp trọng tâm', 'Từ vựng chuyên đề theo chủ điểm TOEIC, Ngữ pháp trọng tâm, Bài tập ứng dụng'),
  ('55555555-5555-5555-5555-555555555555', 5, 'Luyện đề và Phản hồi', 'Thực hành với đề thi đầy đủ, Phân tích lỗi sai và cách khắc phục, Chiến lược quản lý thời gian'),
  ('55555555-5555-5555-5555-555555555555', 6, 'Ôn tập và Mô phỏng thi', 'Ôn tập toàn diện, Mô phỏng kỳ thi thực tế, Đánh giá và tư vấn cải thiện');

-- Add features for IELTS course
INSERT INTO course_features (course_id, feature)
VALUES
  ('44444444-4444-4444-4444-444444444444', 'Lớp học tối đa 15 học viên'),
  ('44444444-4444-4444-4444-444444444444', 'Tài liệu học tập chất lượng cao'),
  ('44444444-4444-4444-4444-444444444444', 'Hỗ trợ học tập 24/7'),
  ('44444444-4444-4444-4444-444444444444', 'Bài tập về nhà sau mỗi buổi học'),
  ('44444444-4444-4444-4444-444444444444', 'Mô phỏng kỳ thi thực tế'),
  ('44444444-4444-4444-4444-444444444444', 'Chứng chỉ hoàn thành khóa học');

-- Add features for TOEIC course
INSERT INTO course_features (course_id, feature)
VALUES
  ('55555555-5555-5555-5555-555555555555', 'Lớp học tối đa 20 học viên'),
  ('55555555-5555-5555-5555-555555555555', 'Tài liệu học được cập nhật thường xuyên'),
  ('55555555-5555-5555-5555-555555555555', 'Ngân hàng đề thi phong phú'),
  ('55555555-5555-5555-5555-555555555555', 'Bài kiểm tra hàng tuần'),
  ('55555555-5555-5555-5555-555555555555', 'Luyện tập online tại nhà'),
  ('55555555-5555-5555-5555-555555555555', 'Tư vấn học tập cá nhân');

-- Add features for Business English course
INSERT INTO course_features (course_id, feature)
VALUES
  ('66666666-6666-6666-6666-666666666666', 'Lớp học tối đa 15 học viên'),
  ('66666666-6666-6666-6666-666666666666', 'Giáo trình được biên soạn bởi chuyên gia'),
  ('66666666-6666-6666-6666-666666666666', 'Thực hành với tình huống thực tế'),
  ('66666666-6666-6666-6666-666666666666', 'Hỗ trợ soạn CV và phỏng vấn bằng tiếng Anh'),
  ('66666666-6666-6666-6666-666666666666', 'Chứng chỉ được công nhận bởi các doanh nghiệp'); 