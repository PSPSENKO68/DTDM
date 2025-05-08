import LoginForm from '../components/LoginForm';
import { Shield, BookOpen, UserCircle, FileCheck, Settings } from 'lucide-react';

const accountFeatures = [
  {
    icon: <BookOpen size={36} className="text-primary-600" />,
    title: 'Quản lý khóa học',
    description: 'Truy cập các khóa học đã đăng ký và theo dõi tiến độ học tập',
  },
  {
    icon: <FileCheck size={36} className="text-primary-600" />,
    title: 'Kết quả học tập',
    description: 'Xem điểm số, đánh giá và chứng chỉ đã đạt được',
  },
  {
    icon: <UserCircle size={36} className="text-primary-600" />,
    title: 'Thông tin cá nhân',
    description: 'Cập nhật hồ sơ và thông tin liên hệ của bạn',
  },
  {
    icon: <Settings size={36} className="text-primary-600" />,
    title: 'Cài đặt tài khoản',
    description: 'Quản lý cài đặt bảo mật và thông báo',
  },
];

const AccountPage = () => {
  return (
    <div className="pt-24 pb-16 bg-gray-50">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Tài khoản học viên</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Đăng nhập để truy cập khóa học, theo dõi tiến độ học tập và quản lý thông tin cá nhân của bạn.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <LoginForm />

              <div className="mt-8 bg-primary-50 rounded-xl p-6 border border-primary-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <Shield size={20} className="text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Bảo mật thông tin</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn. Tất cả dữ liệu được mã hóa và lưu trữ an toàn theo chính sách bảo mật của chúng tôi.
                </p>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-semibold mb-6">Quản lý học tập dễ dàng</h2>
                <p className="text-gray-600 mb-8">
                  Tài khoản học viên cung cấp cho bạn toàn quyền kiểm soát trải nghiệm học tập tại EduCare Center. Đăng nhập để truy cập các tính năng độc quyền.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {accountFeatures.map((feature, index) => (
                    <div key={index} className="border border-gray-100 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary-50 mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-secondary-50 to-accent-50 rounded-lg border border-secondary-100">
                  <h3 className="text-lg font-semibold mb-3">Ứng dụng di động sắp ra mắt</h3>
                  <p className="text-gray-700">
                    Trải nghiệm học tập mọi lúc, mọi nơi với ứng dụng di động EduCare sắp ra mắt. Đăng ký nhận thông báo khi ứng dụng được phát hành.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;