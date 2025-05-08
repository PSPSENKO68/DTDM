import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, ChevronRight } from 'lucide-react';

const courses = [
  {
    id: 'ielts-prep',
    title: 'Luyện thi IELTS',
    image: 'https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg',
    duration: '3 tháng',
    level: 'Trung cấp - Cao cấp',
    students: 120,
    description: 'Khóa học cung cấp phương pháp học tập hiệu quả và luyện thi chuyên sâu cho kỳ thi IELTS',
  },
  {
    id: 'toeic-prep',
    title: 'Luyện thi TOEIC',
    image: 'https://images.pexels.com/photos/5212339/pexels-photo-5212339.jpeg',
    duration: '2 tháng',
    level: 'Sơ cấp - Trung cấp',
    students: 150,
    description: 'Phương pháp học tập hiệu quả giúp học viên đạt điểm TOEIC cao trong thời gian ngắn',
  },
  {
    id: 'business-english',
    title: 'Tiếng Anh thương mại',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
    duration: '2.5 tháng',
    level: 'Trung cấp - Cao cấp',
    students: 90,
    description: 'Trang bị kỹ năng tiếng Anh chuyên ngành phục vụ công việc trong môi trường doanh nghiệp',
  },
  {
    id: 'english-kids',
    title: 'Tiếng Anh cho trẻ em',
    image: 'https://images.pexels.com/photos/8617841/pexels-photo-8617841.jpeg',
    duration: 'Linh hoạt',
    level: 'Nhập môn - Sơ cấp',
    students: 200,
    description: 'Phương pháp học vui nhộn, phù hợp với lứa tuổi giúp trẻ phát triển kỹ năng ngôn ngữ tự nhiên',
  },
];

const CourseSection = () => {
  const [visibleCourses, setVisibleCourses] = useState(3);

  const showMoreCourses = () => {
    setVisibleCourses(courses.length);
  };

  return (
    <section className="section">
      <div className="container">
        <div className="max-w-xl mb-16">
          <div className="heading-with-line">
            <h2 className="text-3xl font-bold">Các khóa học nổi bật</h2>
          </div>
          <p className="text-gray-600 mt-4">
            Khám phá các khóa học chất lượng cao được thiết kế phù hợp với mọi đối tượng học viên
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.slice(0, visibleCourses).map((course) => (
            <div key={course.id} className="card group">
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="px-3 py-1 text-xs font-medium text-white bg-primary-600 rounded-full">
                    {course.level}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-5">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users size={16} className="mr-1" />
                    <span>{course.students} học viên</span>
                  </div>
                </div>
                <Link
                  to={`/courses/${course.id}`}
                  className="flex items-center text-primary-600 font-medium hover:text-primary-700"
                >
                  Xem chi tiết
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {visibleCourses < courses.length && (
          <div className="text-center mt-12">
            <button
              onClick={showMoreCourses}
              className="btn btn-outline"
            >
              Xem thêm khóa học
            </button>
          </div>
        )}

        <div className="mt-16 bg-primary-50 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-semibold mb-3">
                Bạn đã sẵn sàng để nâng cao kỹ năng của mình?
              </h3>
              <p className="text-gray-600 max-w-xl">
                Đăng ký ngay hôm nay để nhận tư vấn miễn phí và ưu đãi đặc biệt dành cho học viên mới
              </p>
            </div>
            <Link to="/registration" className="btn btn-primary whitespace-nowrap">
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseSection;