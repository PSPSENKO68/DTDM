import RegistrationForm from '../components/RegistrationForm';
import { Clock, Users, GraduationCap } from 'lucide-react';

const registrationSteps = [
  {
    icon: <Clock size={36} className="text-primary-600" />,
    title: 'Đăng ký trực tuyến',
    description: 'Điền thông tin vào biểu mẫu đăng ký bên dưới',
  },
  {
    icon: <Users size={36} className="text-primary-600" />,
    title: 'Nhận tư vấn',
    description: 'Đội ngũ tư vấn sẽ liên hệ với bạn để tư vấn chi tiết',
  },
  {
    icon: <GraduationCap size={36} className="text-primary-600" />,
    title: 'Bắt đầu học tập',
    description: 'Hoàn tất đăng ký và tham gia các khóa học',
  },
];

const RegistrationPage = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Đăng ký khóa học</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Điền thông tin vào biểu mẫu dưới đây để đăng ký khóa học. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {registrationSteps.map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-50 mb-4">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-primary-700 text-white p-6">
              <h2 className="text-xl font-semibold">Đăng ký khóa học ngay hôm nay</h2>
              <p className="text-primary-100 mt-1">
                Điền đầy đủ thông tin để nhận tư vấn miễn phí
              </p>
            </div>
            <RegistrationForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;