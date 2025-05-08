import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmailVerificationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState<string>('Đang xác thực email của bạn...');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Lấy token từ URL
        const token = searchParams.get('token');
        
        if (!token) {
          setStatus('error');
          setMessage('Liên kết xác thực không hợp lệ. Token xác thực không được tìm thấy.');
          return;
        }

        // Xác thực email
        const { error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: 'email',
        });

        if (error) {
          console.error('Error verifying email:', error);
          setStatus('error');
          setMessage('Không thể xác thực email. Token không hợp lệ hoặc đã hết hạn.');
        } else {
          setStatus('success');
          setMessage('Email của bạn đã được xác thực thành công!');
          
          // Sau 3 giây, chuyển hướng người dùng đến trang tài khoản
          setTimeout(() => {
            navigate('/account');
          }, 3000);
        }
      } catch (error) {
        console.error('Error during email verification:', error);
        setStatus('error');
        setMessage('Đã xảy ra lỗi khi xác thực email. Vui lòng thử lại sau.');
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            {status === 'loading' && (
              <>
                <div className="flex justify-center mb-4">
                  <Loader2 size={48} className="text-primary-600 animate-spin" />
                </div>
                <h1 className="text-2xl font-bold mb-4">Xác thực email</h1>
                <p className="text-gray-600 mb-4">{message}</p>
              </>
            )}

            {status === 'success' && (
              <>
                <div className="flex justify-center mb-4">
                  <CheckCircle2 size={48} className="text-success-500" />
                </div>
                <h1 className="text-2xl font-bold mb-4">Xác thực thành công!</h1>
                <p className="text-gray-600 mb-6">{message}</p>
                <p className="text-gray-600 mb-6">Bạn sẽ được chuyển hướng tự động...</p>
                <Link to="/account" className="btn btn-primary w-full">
                  Đến trang tài khoản
                </Link>
              </>
            )}

            {status === 'error' && (
              <>
                <div className="flex justify-center mb-4">
                  <AlertCircle size={48} className="text-error-500" />
                </div>
                <h1 className="text-2xl font-bold mb-4">Xác thực thất bại</h1>
                <p className="text-gray-600 mb-6">{message}</p>
                <div className="space-y-3">
                  <Link to="/registration" className="btn btn-primary w-full">
                    Đăng ký lại
                  </Link>
                  <Link to="/contact" className="btn btn-outline w-full">
                    Liên hệ hỗ trợ
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage; 