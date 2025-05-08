import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AlertCircle, CheckCircle2, ArrowLeft, EyeIcon, EyeOffIcon } from 'lucide-react';
import { verifyOTP, resetPasswordWithOTP } from '../services/authService';

const VerifyResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isReset, setIsReset] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(true);

  useEffect(() => {
    // Kiểm tra xem có email và otp được truyền từ trang trước không
    if (location.state && location.state.email && location.state.otp) {
      const { email: stateEmail, otp: stateOtp } = location.state;
      setEmail(stateEmail);
      setOtp(stateOtp);
      
      // Xác minh lại OTP để đảm bảo
      verifyOTP(stateEmail, stateOtp).then(isValid => {
        if (!isValid) {
          // Nếu OTP không hợp lệ, quay lại trang xác minh OTP
          navigate('/otp-verification', { replace: true });
          return;
        }
        
        setIsVerifying(false);
      }).catch(error => {
        console.error('Error verifying OTP:', error);
        navigate('/otp-verification', { replace: true });
      });
    } else {
      // Nếu không có thông tin cần thiết, quay lại trang quên mật khẩu
      navigate('/forgot-password', { replace: true });
    }
  }, [location, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password
    if (!password.trim()) {
      setError('Vui lòng nhập mật khẩu mới');
      return;
    }
    
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Gọi API để đặt lại mật khẩu
      const result = await resetPasswordWithOTP(email, password);
      
      if (result.success) {
        setIsReset(true);
        
        // Sau 3 giây, chuyển đến trang đăng nhập
        setTimeout(() => {
          navigate('/login?success=reset');
        }, 3000);
      } else {
        setError(result.message || 'Không thể đặt lại mật khẩu. Vui lòng thử lại sau.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setError('Đã xảy ra lỗi khi đặt lại mật khẩu. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Đang xác minh OTP
  if (isVerifying) {
    return (
      <div className="pt-24 pb-16">
        <div className="container">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full"></div>
              </div>
              <h1 className="text-2xl font-bold mb-4">Đang xác minh...</h1>
              <p className="text-gray-600">Vui lòng đợi trong giây lát.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <div className="max-w-md mx-auto">
          <Link 
            to="/otp-verification" 
            state={{ email }}
            className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-primary-600 mb-6"
          >
            <ArrowLeft size={16} /> Quay lại
          </Link>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <h1 className="text-2xl font-bold mb-2">Đặt lại mật khẩu</h1>
              
              {!isReset ? (
                <>
                  <p className="text-gray-600 mb-6">
                    Nhập mật khẩu mới cho tài khoản của bạn.
                  </p>
                
                  {error && (
                    <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg flex items-start gap-2 mb-4">
                      <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                      <p>{error}</p>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Mật khẩu mới
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="input-field pr-10"
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Mật khẩu phải có ít nhất 6 ký tự
                      </p>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Xác nhận mật khẩu mới
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          id="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="input-field pr-10"
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          onClick={toggleConfirmPasswordVisibility}
                        >
                          {showConfirmPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                        </button>
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary w-full"
                    >
                      {isSubmitting ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-success-50 rounded-full mb-4">
                    <CheckCircle2 size={32} className="text-success-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Mật khẩu đã được đặt lại</h3>
                  <p className="text-gray-600 mb-6">
                    Mật khẩu của bạn đã được đặt lại thành công. Bạn sẽ được chuyển hướng đến trang đăng nhập.
                  </p>
                  <Link to="/login" className="btn btn-primary w-full">
                    Đăng nhập ngay
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyResetPasswordPage; 