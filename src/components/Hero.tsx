import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative pt-24 pb-20 overflow-hidden md:pt-40 md:pb-28 bg-gradient-to-r from-primary-900 to-primary-800">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg')] bg-cover bg-center"></div>
      </div>
      <div className="container relative z-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
          <div className="text-white animate-fade-in">
            <h1 className="text-4xl font-bold leading-tight mb-4 md:text-5xl md:leading-tight">
              Mở Rộng Tầm Nhìn <br />
              <span className="text-secondary-400">Nâng Cao Tương Lai</span>
            </h1>
            <p className="mb-8 text-lg text-gray-100 max-w-lg">
              Trung tâm đào tạo EduCare cung cấp các khóa học chất lượng cao nhằm phát triển kỹ năng và mở rộng cơ hội nghề nghiệp cho học viên.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/courses" className="btn btn-secondary">
                Khám phá khóa học
              </Link>
              <Link to="/registration" className="btn bg-white text-primary-700 hover:bg-gray-100">
                Đăng ký ngay
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
          <div className="animate-slide-up">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary-500 rounded-lg opacity-20"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent-500 rounded-lg opacity-20"></div>
              <div className="relative overflow-hidden rounded-xl shadow-2xl aspect-video">
                <img
                  src="https://images.pexels.com/photos/8199562/pexels-photo-8199562.jpeg"
                  alt="Học viên EduCare"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;