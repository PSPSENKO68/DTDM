import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from '../services/emailService';
import { CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Vui lòng nhập địa chỉ email của bạn');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Địa chỉ email không hợp lệ');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Gọi hàm gửi email đặt lại mật khẩu
      const result = await sendPasswordResetEmail(email);
      
      if (!result.success) {
        setError(result.message);
        setIsSubmitting(false);
        return;
      }
      
      setIsSubmitted(true);
      setIsSubmitting(false);
    } catch (err) {
      console.error('Error requesting password reset:', err);
      setError('Đã xảy ra lỗi khi xử lý yêu cầu. Vui lòng thử lại sau.');
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
              <h1 className="text-2xl font-bold mb-2">Quên mật khẩu?</h1>
              
              {!isSubmitted ? (
                <>
                  <p className="text-gray-600 mb-6">
                    Nhập địa chỉ email của bạn dưới đây và chúng tôi sẽ gửi cho bạn liên kết để đặt lại mật khẩu.
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
                        Email của bạn
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-field"
                        placeholder="example@gmail.com"
                        required
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary w-full"
                    >
                      {isSubmitting ? 'Đang xử lý...' : 'Gửi liên kết đặt lại mật khẩu'}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-success-50 rounded-full mb-4">
                    <CheckCircle2 size={32} className="text-success-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Kiểm tra email của bạn</h3>
                  <p className="text-gray-600 mb-6">
                    Chúng tôi đã gửi email chứa liên kết đặt lại mật khẩu đến <strong>{email}</strong>. 
                    Vui lòng kiểm tra hộp thư (và thư mục spam nếu cần) để tiếp tục.
                  </p>
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        setEmail('');
                        setIsSubmitted(false);
                      }}
                      className="btn btn-outline w-full"
                    >
                      Yêu cầu lại liên kết
                    </button>
                    <Link to="/login" className="btn btn-primary w-full">
                      Quay lại đăng nhập
                    </Link>
                  </div>
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