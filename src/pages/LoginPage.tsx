import LoginForm from '../components/LoginForm';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Kiểm tra xem có thông báo từ URL không
    const success = searchParams.get('success');
    const error = searchParams.get('error');
    const reset = searchParams.get('reset');
    
    if (success === 'verified') {
      setSuccessMessage('Email của bạn đã được xác thực thành công. Bạn có thể đăng nhập.');
    } else if (success === 'reset') {
      setSuccessMessage('Mật khẩu của bạn đã được đặt lại thành công. Bạn có thể đăng nhập bằng mật khẩu mới.');
    }
    
    if (error === 'session') {
      setErrorMessage('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
    } else if (error === 'verification') {
      setErrorMessage('Vui lòng xác thực email của bạn trước khi đăng nhập.');
    }

    if (reset === 'success') {
      setSuccessMessage('Mật khẩu của bạn đã được đặt lại thành công.');
    }
  }, [searchParams]);

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <div className="max-w-md mx-auto">
          {successMessage && (
            <div className="mb-6 bg-success-50 border border-success-200 text-success-700 px-4 py-3 rounded-lg flex items-start gap-2">
              <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5" />
              <p>{successMessage}</p>
            </div>
          )}
          
          {errorMessage && (
            <div className="mb-6 bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg flex items-start gap-2">
              <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
              <p>{errorMessage}</p>
            </div>
          )}
          
          <LoginForm />
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Bạn là học viên mới?{' '}
              <Link to="/registration" className="text-primary-600 hover:underline font-medium">
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 