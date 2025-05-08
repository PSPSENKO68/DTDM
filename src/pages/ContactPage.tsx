import ContactForm from '../components/ContactForm';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const contactInfo = [
  {
    icon: <MapPin size={24} className="text-primary-600" />,
    title: 'Địa chỉ',
    description: '123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',
  },
  {
    icon: <Phone size={24} className="text-primary-600" />,
    title: 'Điện thoại',
    description: '0585677225',
    link: 'tel:+84585677225',
  },
  {
    icon: <Mail size={24} className="text-primary-600" />,
    title: 'Email',
    description: 'nduy6374@gmail.com',
    link: 'mailto:nduy6374@gmail.com',
  },
  {
    icon: <Clock size={24} className="text-primary-600" />,
    title: 'Giờ làm việc',
    description: 'Thứ 2 - Thứ 7: 8:00 - 21:00\nChủ nhật: 8:00 - 17:00',
  },
];

const ContactPage = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Liên hệ với chúng tôi</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Bạn có thắc mắc hoặc cần hỗ trợ? Hãy liên hệ với chúng tôi qua các kênh dưới đây hoặc gửi tin nhắn trực tiếp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {contactInfo.map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary-50 mr-4">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  {item.link ? (
                    <a href={item.link} className="text-primary-600 hover:underline">
                      {item.description}
                    </a>
                  ) : (
                    <p className="text-gray-600 whitespace-pre-line">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 bg-primary-700 text-white p-8 rounded-xl">
              <h2 className="text-xl font-semibold mb-6">Liên hệ trực tiếp</h2>
              <p className="mb-8">
                Hãy ghé thăm trung tâm của chúng tôi để trải nghiệm môi trường học tập chuyên nghiệp và gặp gỡ đội ngũ giảng viên.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin size={20} className="text-primary-300 mr-3 mt-1" />
                  <p>123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</p>
                </div>
                <div className="flex items-start">
                  <Phone size={20} className="text-primary-300 mr-3 mt-1" />
                  <a href="tel:+84901234567" className="hover:underline">
                    090 123 4567
                  </a>
                </div>
                <div className="flex items-start">
                  <Mail size={20} className="text-primary-300 mr-3 mt-1" />
                  <a href="mailto:info@educare.vn" className="hover:underline">
                    info@educare.vn
                  </a>
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <ContactForm />
            </div>
          </div>

          <div className="mt-12">
            <div className="aspect-[16/9] rounded-xl overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5201952559787!2d106.70044867465224!3d10.771412989387894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4b3330bcc7%3A0x4db964d76bf6e18e!2zMTIzIMSQxrDhu51uZyBOZ3V54buFbiBI4bulLCBC4bq_biBOZ2jDqSwgUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1698987021186!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="EduCare Center Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;