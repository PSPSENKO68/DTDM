import { useState } from 'react';
import { Search, Filter, Clock, Users, BookOpen, Award, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const courses = [
  {
    id: 'ielts-prep',
    title: 'Luyện thi IELTS',
    image: 'https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg',
    category: 'exam-prep',
    level: 'intermediate-advanced',
    duration: '3 tháng',
    schedule: 'Thứ 2, 4, 6 (18:00 - 20:00)',
    price: '6,500,000 VND',
    rating: 4.8,
    numReviews: 125,
    description: 'Khóa học cung cấp phương pháp học tập hiệu quả và luyện thi chuyên sâu cho kỳ thi IELTS. Học viên sẽ được luyện tập đầy đủ 4 kỹ năng Nghe, Nói, Đọc, Viết với giáo viên có chứng chỉ IELTS 8.0+.',
  },
  {
    id: 'toeic-prep',
    title: 'Luyện thi TOEIC',
    image: 'https://images.pexels.com/photos/5212339/pexels-photo-5212339.jpeg',
    category: 'exam-prep',
    level: 'beginner-intermediate',
    duration: '2 tháng',
    schedule: 'Thứ 3, 5, 7 (18:00 - 20:00)',
    price: '4,800,000 VND',
    rating: 4.7,
    numReviews: 156,
    description: 'Phương pháp học tập hiệu quả giúp học viên đạt điểm TOEIC cao trong thời gian ngắn. Khóa học tập trung vào các chiến lược làm bài thi và bí quyết đạt điểm cao cho cả 2 phần Listening và Reading.',
  },
  {
    id: 'business-english',
    title: 'Tiếng Anh thương mại',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
    category: 'specialized',
    level: 'intermediate-advanced',
    duration: '2.5 tháng',
    schedule: 'Thứ 2, 4, 6 (19:00 - 21:00)',
    price: '5,200,000 VND',
    rating: 4.6,
    numReviews: 98,
    description: 'Trang bị kỹ năng tiếng Anh chuyên ngành phục vụ công việc trong môi trường doanh nghiệp. Học viên sẽ học cách viết email, báo cáo, thuyết trình và đàm phán bằng tiếng Anh một cách chuyên nghiệp.',
  },
  {
    id: 'english-kids',
    title: 'Tiếng Anh cho trẻ em',
    image: 'https://images.pexels.com/photos/8617841/pexels-photo-8617841.jpeg',
    category: 'children',
    level: 'beginner',
    duration: '3 tháng',
    schedule: 'Thứ 7, Chủ nhật (9:00 - 11:00)',
    price: '4,500,000 VND',
    rating: 4.9,
    numReviews: 210,
    description: 'Phương pháp học vui nhộn, phù hợp với lứa tuổi giúp trẻ phát triển kỹ năng ngôn ngữ tự nhiên. Lớp học sử dụng trò chơi, âm nhạc và hoạt động tương tác để tạo hứng thú học tập cho trẻ.',
  },
  {
    id: 'general-english',
    title: 'Tiếng Anh giao tiếp',
    image: 'https://images.pexels.com/photos/7516363/pexels-photo-7516363.jpeg',
    category: 'general',
    level: 'all-levels',
    duration: '3 tháng',
    schedule: 'Thứ 2, 4, 6 (17:30 - 19:30)',
    price: '4,200,000 VND',
    rating: 4.7,
    numReviews: 178,
    description: 'Khóa học giúp học viên phát triển kỹ năng giao tiếp tiếng Anh tự tin trong các tình huống hàng ngày. Tập trung vào phát âm, từ vựng thông dụng và các mẫu câu giao tiếp thực tế.',
  },
  {
    id: 'academic-english',
    title: 'Tiếng Anh học thuật',
    image: 'https://images.pexels.com/photos/3769981/pexels-photo-3769981.jpeg',
    category: 'specialized',
    level: 'intermediate-advanced',
    duration: '4 tháng',
    schedule: 'Thứ 3, 5, 7 (17:30 - 19:30)',
    price: '5,800,000 VND',
    rating: 4.5,
    numReviews: 87,
    description: 'Khóa học cung cấp các kỹ năng tiếng Anh học thuật cần thiết cho sinh viên đại học và sau đại học. Tập trung vào kỹ năng viết luận, thuyết trình và nghiên cứu học thuật bằng tiếng Anh.',
  },
  {
    id: 'english-pronunciation',
    title: 'Tiếng Anh phát âm',
    image: 'https://images.pexels.com/photos/9906272/pexels-photo-9906272.jpeg',
    category: 'general',
    level: 'all-levels',
    duration: '1.5 tháng',
    schedule: 'Thứ 2, 4, 6 (17:30 - 19:00)',
    price: '3,500,000 VND',
    rating: 4.8,
    numReviews: 92,
    description: 'Khóa học chuyên sâu về phát âm tiếng Anh, giúp học viên nói tiếng Anh tự nhiên và rõ ràng. Tập trung vào ngữ điệu, âm tiết, và các kỹ thuật phát âm chuyên nghiệp.',
  },
  {
    id: 'english-conversation',
    title: 'Tiếng Anh đàm thoại',
    image: 'https://images.pexels.com/photos/7516362/pexels-photo-7516362.jpeg',
    category: 'general',
    level: 'beginner-intermediate',
    duration: '2 tháng',
    schedule: 'Thứ 3, 5, 7 (19:00 - 21:00)',
    price: '4,000,000 VND',
    rating: 4.6,
    numReviews: 124,
    description: 'Khóa học giúp học viên tự tin giao tiếp tiếng Anh trong mọi tình huống. Tập trung vào các chủ đề đàm thoại thực tế như du lịch, công việc, giao tiếp xã hội.',
  },
];

const categories = [
  { id: 'all', name: 'Tất cả khóa học' },
  { id: 'general', name: 'Tiếng Anh tổng quát' },
  { id: 'exam-prep', name: 'Luyện thi chứng chỉ' },
  { id: 'specialized', name: 'Tiếng Anh chuyên ngành' },
  { id: 'children', name: 'Tiếng Anh cho trẻ em' },
];

const levels = [
  { id: 'all-levels', name: 'Tất cả trình độ' },
  { id: 'beginner', name: 'Sơ cấp' },
  { id: 'beginner-intermediate', name: 'Sơ cấp - Trung cấp' },
  { id: 'intermediate-advanced', name: 'Trung cấp - Cao cấp' },
];

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all-levels');
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all-levels' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Khóa học</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Khám phá các khóa học chất lượng cao tại EduCare Center. Từ tiếng Anh cơ bản đến luyện thi chuyên sâu cho các chứng chỉ quốc tế.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="w-full md:w-2/3 relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm khóa học..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="input-field pl-12"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
              <button
                onClick={toggleFilters}
                className="md:hidden btn btn-outline w-full flex items-center justify-center gap-2"
              >
                <Filter size={18} />
                Bộ lọc
              </button>
              <div className="hidden md:flex gap-4 items-center">
                <div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="input-field py-2"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="input-field py-2"
                  >
                    {levels.map((level) => (
                      <option key={level.id} value={level.id}>
                        {level.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {showFilters && (
              <div className="md:hidden mt-4 pt-4 border-t">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Danh mục
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="input-field"
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Trình độ
                    </label>
                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="input-field"
                    >
                      {levels.map((level) => (
                        <option key={level.id} value={level.id}>
                          {level.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">
              {filteredCourses.length} khóa học 
              {selectedCategory !== 'all' && (
                <span> trong {categories.find(c => c.id === selectedCategory)?.name.toLowerCase()}</span>
              )}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <div key={course.id} className="card group h-full flex flex-col">
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <span className="px-3 py-1 text-xs font-medium text-white bg-primary-600 rounded-full">
                        {levels.find(l => l.id === course.level)?.name}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Clock size={16} className="flex-shrink-0" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <BookOpen size={16} className="flex-shrink-0" />
                      <span>{course.schedule}</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-5 mt-auto">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
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
                        <span className="text-sm text-gray-600 ml-1">({course.numReviews})</span>
                      </div>
                      <span className="font-semibold text-primary-700">{course.price}</span>
                    </div>
                    
                    <Link
                      to={`/courses/${course.id}`}
                      className="flex items-center justify-center gap-2 text-white bg-primary-600 hover:bg-primary-700 py-2 px-4 rounded-lg transition-colors"
                    >
                      Xem chi tiết
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="flex flex-col items-center">
                  <Award size={64} className="text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Không tìm thấy khóa học</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Không tìm thấy khóa học phù hợp với tiêu chí tìm kiếm. Vui lòng thử lại với từ khóa khác hoặc thay đổi bộ lọc.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-16 bg-primary-50 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-semibold mb-3">
                  Không tìm thấy khóa học phù hợp?
                </h3>
                <p className="text-gray-600 max-w-xl">
                  Liên hệ với chúng tôi để được tư vấn khóa học phù hợp nhất với nhu cầu và trình độ của bạn.
                </p>
              </div>
              <Link to="/contact" className="btn btn-primary whitespace-nowrap">
                Liên hệ tư vấn
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;