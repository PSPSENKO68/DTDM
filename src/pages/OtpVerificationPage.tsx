import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { verifyOTP } from '../services/authService';

const OtpVerificationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  useEffect(() => {
    // Lấy email từ state của location (được chuyển từ trang ForgotPassword)
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    } else {
      // Nếu không có email, chuyển về trang quên mật khẩu
      navigate('/forgot-password');
    }
  }, [location, navigate]);

  // Xử lý khi người dùng nhập từng chữ số OTP
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Chỉ cho phép nhập số và tối đa 6 chữ số
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
      setError(null);
    }
  };

  // Xử lý khi người dùng submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      setError('Vui lòng nhập đủ 6 chữ số mã xác thực');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Gọi API để xác minh OTP
      const isValid = await verifyOTP(email, otp);
      
      if (isValid) {
        setIsVerified(true);
        
        // Sau 2 giây, chuyển đến trang đặt lại mật khẩu
        setTimeout(() => {
          navigate('/verify-reset-password', { state: { email, otp } });
        }, 2000);
      } else {
        setError('Mã xác thực không đúng hoặc đã hết hạn. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError('Đã xảy ra lỗi khi xác minh mã. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <div className="max-w-md mx-auto">
          <Link 
            to="/forgot-password" 
            className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-primary-600 mb-6"
          >
            <ArrowLeft size={16} /> Quay lại
          </Link>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <h1 className="text-2xl font-bold mb-2">Xác minh mã OTP</h1>
              
              {!isVerified ? (
                <>
                  <p className="text-gray-600 mb-6">
                    Vui lòng nhập mã 6 chữ số đã được gửi đến email {email}
                  </p>
                
                  {error && (
                    <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg flex items-start gap-2 mb-4">
                      <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                      <p>{error}</p>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                        Mã xác thực
                      </label>
                      <input
                        type="text"
                        id="otp"
                        value={otp}
                        onChange={handleOtpChange}
                        placeholder="Nhập mã 6 chữ số"
                        className="input-field text-center text-xl tracking-wider"
                        maxLength={6}
                        autoComplete="off"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Mã xác thực có hiệu lực trong 15 phút
                      </p>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary w-full"
                    >
                      {isSubmitting ? 'Đang xác minh...' : 'Xác minh mã'}
                    </button>
                  </form>
                  
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                      Không nhận được mã?{' '}
                      <Link to="/forgot-password" className="text-primary-600 hover:text-primary-700">
                        Gửi lại mã
                      </Link>
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-success-50 rounded-full mb-4">
                    <CheckCircle2 size={32} className="text-success-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Xác minh thành công</h3>
                  <p className="text-gray-600">
                    Bạn sẽ được chuyển đến trang đặt lại mật khẩu.
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

export default OtpVerificationPage; 