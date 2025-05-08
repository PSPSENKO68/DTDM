import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { CheckCircle2, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validatingToken, setValidatingToken] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Kiểm tra xem token có hợp lệ không
        const token = searchParams.get('token');
        
        if (!token) {
          setTokenValid(false);
          setValidatingToken(false);
          return;
        }

        // Không cần xác thực token ngay, vì Supabase sẽ xử lý điều này khi đặt lại mật khẩu
        // Chỉ kiểm tra xem token có tồn tại không
        setTokenValid(true);
        setValidatingToken(false);
      } catch (error) {
        console.error('Error validating token:', error);
        setTokenValid(false);
        setValidatingToken(false);
      }
    };

    verifyToken();
  }, [searchParams]);

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
      // Lấy token từ URL
      const token = searchParams.get('token');
      
      if (!token) {
        setError('Không tìm thấy token xác thực trong URL');
        setIsSubmitting(false);
        return;
      }

      // Cập nhật mật khẩu
      const { error: updateError } = await supabase.auth.updateUser({
        password: password
      });
      
      if (updateError) {
        console.error('Error resetting password:', updateError);
        setError(updateError.message || 'Không thể đặt lại mật khẩu. Vui lòng thử lại sau.');
        setIsSubmitting(false);
        return;
      }
      
      // Cập nhật thành công
      setIsSubmitted(true);
      setIsSubmitting(false);
      
      // Sau 3 giây, chuyển hướng đến trang đăng nhập
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      console.error('Error during password reset:', err);
      setError('Đã xảy ra lỗi khi đặt lại mật khẩu. Vui lòng thử lại sau.');
      setIsSubmitting(false);
    }
  };

  // Đang kiểm tra token
  if (validatingToken) {
    return (
      <div className="pt-24 pb-16">
        <div className="container">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="flex justify-center mb-4">
                <Loader2 size={48} className="text-primary-600 animate-spin" />
              </div>
              <h1 className="text-2xl font-bold mb-4">Đang xác thực...</h1>
              <p className="text-gray-600">Vui lòng đợi trong giây lát.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Token không hợp lệ
  if (!tokenValid) {
    return (
      <div className="pt-24 pb-16">
        <div className="container">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="flex justify-center mb-4">
                <AlertCircle size={48} className="text-error-500" />
              </div>
              <h1 className="text-2xl font-bold mb-4">Liên kết không hợp lệ hoặc đã hết hạn</h1>
              <p className="text-gray-600 mb-6">
                Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn. Vui lòng yêu cầu liên kết mới.
              </p>
              <Link to="/forgot-password" className="btn btn-primary w-full">
                Yêu cầu liên kết mới
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Hiển thị form đặt lại mật khẩu
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
              <h1 className="text-2xl font-bold mb-2">Đặt lại mật khẩu</h1>
              
              {!isSubmitted ? (
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
                      <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-field"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Mật khẩu phải có ít nhất 6 ký tự
                      </p>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Xác nhận mật khẩu mới
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="input-field"
                        required
                      />
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

export default ResetPasswordPage; 