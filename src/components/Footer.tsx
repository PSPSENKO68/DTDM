import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Youtube, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <GraduationCap size={32} className="text-primary-400" />
              <span className="text-xl font-bold text-white">EduCare Center</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Cung cấp các khóa học chất lượng cao nhằm phát triển kỹ năng và mở rộng cơ hội nghề nghiệp cho học viên.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-4">Liên kết nhanh</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-400 hover:text-white transition-colors">
                  Khóa học
                </Link>
              </li>
              <li>
                <Link to="/registration" className="text-gray-400 hover:text-white transition-colors">
                  Đăng ký
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-4">Khóa học</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Tiếng Anh giao tiếp
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Tiếng Anh học thuật
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Luyện thi IELTS
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Luyện thi TOEIC
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Tiếng Anh cho trẻ em
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-4">Thông tin liên hệ</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={20} className="text-primary-400 flex-shrink-0" />
                <span className="text-gray-400">
                  123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh
                </span>
              </li>
              <li className="flex gap-3">
                <Phone size={20} className="text-primary-400 flex-shrink-0" />
                <a href="tel:+84901234567" className="text-gray-400 hover:text-white transition-colors">
                  090 123 4567
                </a>
              </li>
              <li className="flex gap-3">
                <Mail size={20} className="text-primary-400 flex-shrink-0" />
                <a href="mailto:info@educare.vn" className="text-gray-400 hover:text-white transition-colors">
                  info@educare.vn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} EduCare Center. Tất cả các quyền được bảo lưu.
            </p>
            <div className="flex gap-6">
              <Link to="/terms" className="text-gray-500 hover:text-white text-sm transition-colors">
                Điều khoản sử dụng
              </Link>
              <Link to="/privacy" className="text-gray-500 hover:text-white text-sm transition-colors">
                Chính sách bảo mật
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;