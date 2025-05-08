import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialFormData: ContactFormData = {
  fullName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when field is edited
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ và tên';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Vui lòng nhập nội dung tin nhắn';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call to save data (would connect to Salesforce in production)
    setTimeout(() => {
      console.log('Contact form submission data:', formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData(initialFormData);
      
      // Reset form state after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-md">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-success-50 rounded-full mb-4">
            <CheckCircle2 size={32} className="text-success-500" />
          </div>
          <h3 className="text-2xl font-semibold mb-2">Gửi tin nhắn thành công!</h3>
          <p className="text-gray-600 mb-6">
            Cảm ơn bạn đã liên hệ với chúng tôi. Đội ngũ hỗ trợ sẽ phản hồi cho bạn trong thời gian sớm nhất.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="btn btn-primary"
          >
            Gửi tin nhắn khác
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md">
      <div className="space-y-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            Họ và tên <span className="text-error-500">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`input-field ${errors.fullName ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
            placeholder="Nguyễn Văn A"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-error-500">{errors.fullName}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-error-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`input-field ${errors.email ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
              placeholder="example@gmail.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-error-500">{errors.email}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Số điện thoại
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input-field"
              placeholder="0901234567"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            Chủ đề
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="input-field"
            placeholder="Chủ đề tin nhắn của bạn"
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Nội dung tin nhắn <span className="text-error-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            className={`input-field resize-none ${errors.message ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
            placeholder="Vui lòng nhập nội dung tin nhắn của bạn..."
          ></textarea>
          {errors.message && (
            <p className="mt-1 text-sm text-error-500">{errors.message}</p>
          )}
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full"
          >
            {isSubmitting ? 'Đang xử lý...' : 'Gửi tin nhắn'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;