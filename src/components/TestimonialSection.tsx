import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Nguyễn Thị Minh',
    role: 'Học viên IELTS',
    photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    rating: 5,
    content:
      'Tôi đã đạt được band điểm IELTS 7.5 sau khóa học tại EduCare Center. Các giảng viên rất tận tâm và phương pháp giảng dạy rất hiệu quả. Tôi đặc biệt hài lòng với phần luyện thi Speaking và Writing.',
  },
  {
    id: 2,
    name: 'Trần Văn Hùng',
    role: 'Học viên Business English',
    photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    rating: 5,
    content:
      'Khóa học Tiếng Anh thương mại đã giúp tôi tự tin hơn rất nhiều trong các cuộc họp và thuyết trình bằng tiếng Anh. Giáo viên có nhiều kinh nghiệm thực tế và chia sẻ những tình huống công việc hữu ích.',
  },
  {
    id: 3,
    name: 'Lê Thị Hương',
    role: 'Phụ huynh học viên',
    photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    rating: 5,
    content:
      'Con tôi rất thích học tại EduCare Center. Phương pháp giảng dạy sinh động, lớp học ít người nên giáo viên có thể quan tâm đến từng học viên. Sau 6 tháng, khả năng giao tiếp tiếng Anh của con đã tiến bộ rõ rệt.',
  },
  {
    id: 4,
    name: 'Phạm Thanh Tùng',
    role: 'Học viên TOEIC',
    photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg',
    rating: 4,
    content:
      'Tôi đã cải thiện điểm TOEIC từ 550 lên 850 sau khóa học 2 tháng. Giáo viên cung cấp nhiều mẹo làm bài hiệu quả và tài liệu phong phú. Hệ thống ôn tập và thi thử rất hữu ích.',
  },
];

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={18}
        className={index < rating ? 'text-secondary-500 fill-secondary-500' : 'text-gray-300'}
      />
    ));
  };

  return (
    <section className="section bg-primary-900 text-white">
      <div className="container">
        <div className="max-w-xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Học viên nói gì về chúng tôi?</h2>
          <p className="text-primary-100">
            Phản hồi từ các học viên là động lực giúp chúng tôi không ngừng cải thiện chất lượng giảng dạy
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-primary-800/50 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3">
                <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mx-auto">
                    <img
                      src={testimonials[currentIndex].photo}
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex justify-center mt-3">
                    {renderStars(testimonials[currentIndex].rating)}
                  </div>
                  <div className="text-center mt-4">
                    <h4 className="font-semibold text-lg">{testimonials[currentIndex].name}</h4>
                    <p className="text-primary-200 text-sm">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </div>
              <div className="md:w-2/3">
                <blockquote>
                  <p className="text-lg leading-relaxed italic">
                    "{testimonials[currentIndex].content}"
                  </p>
                </blockquote>
              </div>
            </div>

            <div className="flex justify-center mt-8 md:mt-12 gap-4">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-primary-700 hover:bg-primary-600 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-primary-700 hover:bg-primary-600 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;