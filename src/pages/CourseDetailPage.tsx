import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Users, BookOpen, Award, Calendar, DollarSign, GraduationCap, MessageCircle, ArrowLeft } from 'lucide-react';
import { getCourseById, CourseWithDetails } from '../services/courseService';

// Map for level names
const levelNames = {
  'beginner': 'Sơ cấp',
  'beginner-intermediate': 'Sơ cấp - Trung cấp',
  'intermediate-advanced': 'Trung cấp - Cao cấp',
  'all-levels': 'Tất cả trình độ'
};

// Map for category names
const categoryNames = {
  'general': 'Tiếng Anh tổng quát',
  'exam-prep': 'Luyện thi chứng chỉ',
  'specialized': 'Tiếng Anh chuyên ngành',
  'children': 'Tiếng Anh cho trẻ em'
};

// Define interfaces for our data structures
interface Instructor {
  id: string;
  name: string;
  image: string;
  qualification: string;
}

interface CurriculumWeek {
  id: string;
  course_id: string;
  week: number;
  title: string;
  content: string;
}

const CourseDetailPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<CourseWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [relatedCourses, setRelatedCourses] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!courseId) {
          setError('Mã khóa học không hợp lệ');
          setLoading(false);
          return;
        }
        
        // Fetch course details from Supabase
        const courseData = await getCourseById(courseId);
        
        if (!courseData) {
          setError('Không tìm thấy khóa học');
          setLoading(false);
          return;
        }
        
        setCourse(courseData);
        
        // For now, use mock data for related courses (will be updated later)
        // TODO: Fetch related courses from same category
        setRelatedCourses([]);
        
      } catch (err) {
        console.error('Error fetching course:', err);
        setError('Không thể tải thông tin khóa học. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourseData();
  }, [courseId]);
  
  if (loading) {
    return (
      <div className="pt-24 pb-16">
        <div className="container max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-96 bg-gray-200 rounded mb-6"></div>
            <div className="h-4 bg-gray-200 rounded mb-2.5"></div>
            <div className="h-4 bg-gray-200 rounded mb-2.5"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !course) {
    return (
      <div className="pt-24 pb-16">
        <div className="container max-w-6xl mx-auto text-center">
          <Award size={64} className="text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Không tìm thấy khóa học</h2>
          <p className="text-gray-600 mb-8">{error || 'Khóa học bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.'}</p>
          <Link to="/courses" className="btn btn-primary">
            Quay lại trang khóa học
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6">
            <div className="flex items-center text-sm text-gray-500">
              <Link to="/" className="hover:text-primary-600">Trang chủ</Link>
              <span className="mx-2">/</span>
              <Link to="/courses" className="hover:text-primary-600">Khóa học</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-700">{course.title}</span>
            </div>
          </div>
          
          {/* Course header */}
          <div className="mb-8">
            <Link 
              to="/courses" 
              className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-primary-600 mb-4"
            >
              <ArrowLeft size={16} /> Quay lại danh sách khóa học
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="badge badge-outline">
                {categoryNames[course.category as keyof typeof categoryNames] || course.category}
              </span>
              <span className="badge badge-outline">
                {levelNames[course.level as keyof typeof levelNames] || course.level}
              </span>
              <div className="flex items-center gap-1 text-secondary-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(course.rating) ? 'text-secondary-500 fill-secondary-500' : 'text-gray-300'
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
                <span className="text-gray-700 ml-1">
                  {course.rating} ({course.num_reviews} đánh giá)
                </span>
              </div>
            </div>
          </div>
          
          {/* Course image and info cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="rounded-xl overflow-hidden mb-8">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-auto object-cover aspect-video"
                />
              </div>
              
              {/* Course tabs navigation */}
              <div className="border-b mb-8">
                <nav className="flex gap-4 -mb-px">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'overview' 
                        ? 'border-primary-600 text-primary-600' 
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Tổng quan
                  </button>
                  <button
                    onClick={() => setActiveTab('curriculum')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'curriculum' 
                        ? 'border-primary-600 text-primary-600' 
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Nội dung khóa học
                  </button>
                  <button
                    onClick={() => setActiveTab('instructors')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'instructors' 
                        ? 'border-primary-600 text-primary-600' 
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Giảng viên
                  </button>
                </nav>
              </div>
              
              {/* Tab content */}
              <div className="mb-8">
                {activeTab === 'overview' && (
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Giới thiệu khóa học</h2>
                    <div 
                      className="prose max-w-none mb-8"
                      dangerouslySetInnerHTML={{ __html: course.full_description }}
                    />

                    <h3 className="text-xl font-semibold mb-4">Đặc điểm nổi bật</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                      {course.features?.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <svg
                            className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {activeTab === 'curriculum' && (
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Nội dung khóa học</h2>
                    <p className="text-gray-600 mb-6">
                      Khóa học kéo dài {course.duration} với lịch học {course.schedule}.
                      Dưới đây là nội dung chi tiết của từng tuần học.
                    </p>
                    
                    <div className="space-y-4">
                      {course.curriculum?.map((week: CurriculumWeek) => (
                        <div 
                          key={week.id} 
                          className="border border-gray-200 rounded-lg overflow-hidden"
                        >
                          <div className="bg-gray-50 p-4 flex justify-between items-center">
                            <h3 className="font-medium">Tuần {week.week}: {week.title}</h3>
                          </div>
                          <div className="p-4 border-t border-gray-200">
                            <p className="text-gray-600">{week.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeTab === 'instructors' && (
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Giảng viên</h2>
                    <p className="text-gray-600 mb-6">
                      Đội ngũ giảng viên EduCare Center với trình độ chuyên môn cao và 
                      phương pháp giảng dạy hiện đại sẽ đồng hành cùng bạn trong suốt khóa học.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {course.instructors?.length > 0 ? course.instructors.map((instructor: Instructor) => (
                        <div key={instructor.id} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                          <img 
                            src={instructor.image} 
                            alt={instructor.name}
                            className="w-20 h-20 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-semibold text-lg">{instructor.name}</h3>
                            <p className="text-sm text-gray-600">{instructor.qualification}</p>
                          </div>
                        </div>
                      )) : (
                        <p className="text-gray-600 col-span-2">Đang cập nhật thông tin giảng viên.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="card p-6 mb-6">
                  <div className="flex items-center justify-between text-xl font-bold mb-6">
                    <span>Học phí</span>
                    <span className="text-primary-600">{course.price}</span>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Thời lượng</p>
                        <p className="font-medium">{course.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Lịch học</p>
                        <p className="font-medium">{course.schedule}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <GraduationCap className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Trình độ</p>
                        <p className="font-medium">
                          {levelNames[course.level as keyof typeof levelNames] || course.level}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Link
                    to={`/registration?course=${course.id}`}
                    className="btn btn-primary w-full mb-3"
                  >
                    Đăng ký ngay
                  </Link>
                  
                  <Link
                    to="/contact"
                    className="btn btn-outline w-full"
                  >
                    Tư vấn thêm
                  </Link>
                </div>
                
                <div className="bg-primary-50 rounded-xl p-6">
                  <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                    <MessageCircle className="w-5 h-5" />
                    Bạn cần giúp đỡ?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Liên hệ với chúng tôi để được tư vấn về khóa học phù hợp với nhu cầu của bạn.
                  </p>
                  <div className="space-y-3">
                    <a href="tel:+84901234567" className="flex items-center gap-2 text-primary-600 font-medium">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                      0901 234 567
                    </a>
                    <a href="mailto:info@educenter.vn" className="flex items-center gap-2 text-primary-600 font-medium">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      info@educenter.vn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related courses */}
          {relatedCourses.length > 0 && (
            <div className="border-t pt-12">
              <h2 className="text-2xl font-semibold mb-8">Khóa học liên quan</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedCourses.slice(0, 3).map((relatedCourse) => (
                  <div key={relatedCourse.id} className="card group">
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <img
                        src={relatedCourse.image}
                        alt={relatedCourse.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4">
                        <span className="px-2 py-1 text-xs font-medium text-white bg-primary-600 rounded-full">
                          {levelNames[relatedCourse.level as keyof typeof levelNames] || relatedCourse.level}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                        {relatedCourse.title}
                      </h3>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(relatedCourse.rating) ? 'text-secondary-500 fill-secondary-500' : 'text-gray-300'
                              }`}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          ))}
                          <span className="text-sm text-gray-600 ml-1">({relatedCourse.num_reviews})</span>
                        </div>
                        <span className="font-semibold text-primary-600">{relatedCourse.price}</span>
                      </div>
                      <Link
                        to={`/courses/${relatedCourse.id}`}
                        className="btn btn-outline btn-sm w-full"
                      >
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage; 