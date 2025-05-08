import { BookOpen, Users, AlignCenterVertical as Certificate, Globe } from 'lucide-react';

const features = [
  {
    icon: <BookOpen size={36} className="text-primary-600" />,
    title: 'Giáo trình chuẩn quốc tế',
    description: 'Giáo trình được biên soạn bởi các chuyên gia hàng đầu, tuân theo tiêu chuẩn quốc tế',
  },
  {
    icon: <Users size={36} className="text-primary-600" />,
    title: 'Giảng viên kinh nghiệm',
    description: 'Đội ngũ giảng viên giàu kinh nghiệm, tốt nghiệp từ các trường danh tiếng trong và ngoài nước',
  },
  {
    icon: <Certificate size={36} className="text-primary-600" />,
    title: 'Chứng chỉ được công nhận',
    description: 'Chứng chỉ hoàn thành khóa học được công nhận bởi các tổ chức giáo dục và doanh nghiệp',
  },
  {
    icon: <Globe size={36} className="text-primary-600" />,
    title: 'Môi trường học tập quốc tế',
    description: 'Cơ hội giao lưu và học tập trong môi trường đa văn hóa với học viên đến từ nhiều quốc gia',
  },
];

const FeatureSection = () => {
  return (
    <section className="section bg-gray-50">
      <div className="container">
        <div className="max-w-xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Tại sao chọn EduCare Center?
          </h2>
          <p className="text-gray-600">
            Chúng tôi cung cấp môi trường học tập chất lượng cao với nhiều ưu điểm vượt trội
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="mb-5 inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary-50">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;