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
        // Kiểm tra các tham số trong URL
        // Supabase có thể gửi 'code', 'token', 'type', 'access_token', hoặc 'refresh_token'
        const code = searchParams.get('code');
        const token = searchParams.get('token');
        const type = searchParams.get('type');
        const accessToken = searchParams.get('access_token');
        const refreshToken = searchParams.get('refresh_token');
        
        console.log("URL params:", { code, token, type, accessToken, refreshToken });
        
        // Nếu có code (Supabase thường dùng parameter này)
        if (code) {
          setTokenValid(true);
          setValidatingToken(false);
          return;
        }
        
        // Nếu có token
        if (token) {
          setTokenValid(true);
          setValidatingToken(false);
          return;
        }
        
        // Nếu có access_token và refresh_token (recovery flow)
        if (type === 'recovery' && accessToken && refreshToken) {
          try {
            // Thiết lập session từ URL callback
            const { error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken
            });
            
            if (error) {
              console.error('Error setting session from URL:', error);
              setTokenValid(false);
            } else {
              setTokenValid(true);
            }
          } catch (err) {
            console.error('Error setting session:', err);
            setTokenValid(false);
          }
          setValidatingToken(false);
          return;
        }
        
        // Không tìm thấy tham số nào hợp lệ
        setTokenValid(false);
        setValidatingToken(false);
      } catch (error) {
        console.error('Error validating reset parameters:', error);
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
      // Supabase có thể gửi 'code', 'token', hoặc các tham số khác
      const code = searchParams.get('code');
      const token = searchParams.get('token');
      
      // Log để debug
      console.log("Attempting password reset with:", { code, token });
      
      // Cập nhật mật khẩu - Không cần truyền token/code, Supabase tự đọc từ URL
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
        navigate('/login?success=reset');
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