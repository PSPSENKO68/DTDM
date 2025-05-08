import { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { registerForCourse } from '../services/userService';
import { getAllCourses, Course } from '../services/courseService';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  courseId: string;
  password: string;
  confirmPassword: string;
  schedulePreference: string;
  hearAboutUs: string;
  message: string;
}

const initialFormData: FormData = {
  fullName: '',
  email: '',
  phone: '',
  courseId: '',
  password: '',
  confirmPassword: '',
  schedulePreference: '',
  hearAboutUs: '',
  message: '',
};

const RegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [searchParams] = useSearchParams();
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await getAllCourses();
        setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const courseIdFromUrl = searchParams.get('course');
    if (courseIdFromUrl) {
      setFormData(prev => ({
        ...prev,
        courseId: courseIdFromUrl
      }));
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }

    if (apiError) {
      setApiError(null);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ và tên';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }
    
    if (!formData.courseId) {
      newErrors.courseId = 'Vui lòng chọn khóa học';
    }

    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setApiError(null);
    
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          },
        },
      });

      if (authError) {
        console.error('Error signing up:', authError);
        setApiError(authError.message || 'Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại sau.');
        setIsSubmitting(false);
        return;
      }

      const registrationResult = await registerForCourse(
        {
          email: formData.email,
          full_name: formData.fullName,
          phone: formData.phone,
        },
        formData.courseId
      );

      if (!registrationResult.success) {
        setApiError(registrationResult.message);
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData(initialFormData);
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 10000);
    } catch (error) {
      console.error('Registration error:', error);
      setApiError('Đã xảy ra lỗi. Vui lòng thử lại sau.');
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-md">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-success-50 rounded-full mb-4">
            <CheckCircle2 size={32} className="text-success-500" />
          </div>
          <h3 className="text-2xl font-semibold mb-2">Đăng ký thành công!</h3>
          <p className="text-gray-600 mb-6">
            Cảm ơn bạn đã đăng ký khóa học tại EduCare Center. Vui lòng kiểm tra email để xác nhận tài khoản của bạn. Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ để xác nhận thông tin.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="btn btn-primary"
          >
            Đăng ký khóa học khác
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md">
      <div className="space-y-6">
        {apiError && (
          <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg flex items-start gap-2">
            <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
            <p>{apiError}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Số điện thoại <span className="text-error-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`input-field ${errors.phone ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
              placeholder="0901234567"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-error-500">{errors.phone}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="courseId" className="block text-sm font-medium text-gray-700 mb-1">
              Khóa học quan tâm <span className="text-error-500">*</span>
            </label>
            <select
              id="courseId"
              name="courseId"
              value={formData.courseId}
              onChange={handleChange}
              className={`input-field ${errors.courseId ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
            >
              <option value="">-- Chọn khóa học --</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
            {errors.courseId && (
              <p className="mt-1 text-sm text-error-500">{errors.courseId}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu <span className="text-error-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`input-field ${errors.password ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-error-500">{errors.password}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Xác nhận mật khẩu <span className="text-error-500">*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`input-field ${errors.confirmPassword ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-error-500">{errors.confirmPassword}</p>
            )}
          </div>
        </div>
        
        <div>
          <label htmlFor="schedulePreference" className="block text-sm font-medium text-gray-700 mb-1">
            Thời gian học mong muốn
          </label>
          <select
            id="schedulePreference"
            name="schedulePreference"
            value={formData.schedulePreference}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">-- Chọn thời gian --</option>
            <option value="weekday-morning">Sáng ngày thường (8:00 - 12:00)</option>
            <option value="weekday-afternoon">Chiều ngày thường (13:00 - 17:00)</option>
            <option value="weekday-evening">Tối ngày thường (18:00 - 21:00)</option>
            <option value="weekend-morning">Sáng cuối tuần (8:00 - 12:00)</option>
            <option value="weekend-afternoon">Chiều cuối tuần (13:00 - 17:00)</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="hearAboutUs" className="block text-sm font-medium text-gray-700 mb-1">
            Bạn biết đến chúng tôi qua đâu?
          </label>
          <select
            id="hearAboutUs"
            name="hearAboutUs"
            value={formData.hearAboutUs}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">-- Chọn nguồn --</option>
            <option value="social-media">Mạng xã hội</option>
            <option value="search-engine">Tìm kiếm Google</option>
            <option value="friend">Bạn bè giới thiệu</option>
            <option value="event">Sự kiện</option>
            <option value="other">Khác</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Ghi chú
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="input-field resize-none"
            placeholder="Câu hỏi hoặc yêu cầu đặc biệt..."
          ></textarea>
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full"
          >
            {isSubmitting ? 'Đang xử lý...' : 'Đăng ký ngay'}
          </button>
          <p className="text-sm text-gray-500 mt-4">
            Bằng cách đăng ký, bạn đồng ý với{' '}
            <a href="#" className="text-primary-600 hover:underline">Điều khoản</a>{' '}
            và{' '}
            <a href="#" className="text-primary-600 hover:underline">Chính sách bảo mật</a>{' '}
            của chúng tôi.
          </p>
        </div>
      </div>
    </form>
  );
};

export default RegistrationForm;