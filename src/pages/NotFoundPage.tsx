import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-200">404</h1>
        <h2 className="text-3xl font-semibold mt-4 mb-6">Trang không tồn tại</h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển đến địa chỉ khác.
        </p>
        <Link
          to="/"
          className="btn btn-primary inline-flex items-center gap-2"
        >
          <Home size={20} />
          Trở về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;