import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const initialFormData: LoginFormData = {
  email: '',
  password: '',
  rememberMe: false,
};

const LoginForm = () => {
  const [formData, setFormData] = useState<LoginFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Clear error when field is edited
    if (errors[name as keyof LoginFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
    
    // Clear general login error
    if (loginError) {
      setLoginError(null);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
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
    
    // Simulate login API call
    setTimeout(() => {
      console.log('Login attempt:', formData);
      
      // For demo purposes, always show login error
      // In a real app, this would check credentials and redirect to dashboard
      setLoginError('Email hoặc mật khẩu không đúng. Vui lòng thử lại.');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập tài khoản học viên</h2>
      
      {loginError && (
        <div className="mb-6 p-4 bg-error-50 text-error-700 rounded-lg">
          {loginError}
        </div>
      )}
      
      <div className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
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
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Mật khẩu
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`input-field pr-12 ${errors.password ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-error-500">{errors.password}</p>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
              Ghi nhớ đăng nhập
            </label>
          </div>
          
          <div className="text-sm">
            <Link to="/forgot-password" className="font-medium text-primary-600 hover:text-primary-500">
              Quên mật khẩu?
            </Link>
          </div>
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full"
          >
            {isSubmitting ? 'Đang xử lý...' : 'Đăng nhập'}
          </button>
        </div>
        
        <div className="text-center mt-5">
          <p className="text-sm text-gray-600">
            Chưa có tài khoản?{' '}
            <Link to="/registration" className="font-medium text-primary-600 hover:text-primary-500">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;