import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { sendPasswordResetEmail } from '../services/emailService';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email.trim()) {
      setError('Vui lòng nhập địa chỉ email');
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Vui lòng nhập địa chỉ email hợp lệ');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Gọi API để gửi email đặt lại mật khẩu
      const response = await sendPasswordResetEmail(email);
      
      if (response.success) {
        setIsSubmitted(true);
        
        // Sau 2 giây, chuyển đến trang OTP để nhập mã
        setTimeout(() => {
          navigate('/otp-verification', { state: { email } });
        }, 2000);
      } else {
        setError(response.message || 'Không thể gửi email đặt lại mật khẩu. Vui lòng thử lại sau.');
      }
    } catch (error) {
      console.error('Error sending reset email:', error);
      setError('Đã xảy ra lỗi khi gửi email đặt lại mật khẩu. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <div className="max-w-md mx-auto">
          <Link 
            to="/login" 
            className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-primary-600 mb-6"
          >
            <ArrowLeft size={16} /> Quay lại trang đăng nhập
          </Link>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <h1 className="text-2xl font-bold mb-2">Quên mật khẩu</h1>
              
              {!isSubmitted ? (
                <>
                  <p className="text-gray-600 mb-6">
                    Nhập địa chỉ email của bạn và chúng tôi sẽ gửi mã xác thực để đặt lại mật khẩu.
                  </p>
                
                  {error && (
                    <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg flex items-start gap-2 mb-4">
                      <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                      <p>{error}</p>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Địa chỉ email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        className="input-field"
                        placeholder="email@example.com"
                        required
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary w-full"
                    >
                      {isSubmitting ? 'Đang gửi...' : 'Gửi mã xác thực'}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-success-50 rounded-full mb-4">
                    <CheckCircle2 size={32} className="text-success-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Kiểm tra email của bạn</h3>
                  <p className="text-gray-600">
                    Chúng tôi đã gửi mã xác thực đến {email}. Vui lòng kiểm tra và nhập mã để tiếp tục.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage; 