import { Users, BookOpen, TrendingUp, Calendar } from 'lucide-react';

const stats = [
  {
    label: 'Tổng số học viên',
    value: '1,234',
    icon: <Users size={24} className="text-primary-600" />,
    trend: '+12%',
  },
  {
    label: 'Khóa học đang mở',
    value: '15',
    icon: <BookOpen size={24} className="text-secondary-600" />,
    trend: '+3',
  },
  {
    label: 'Đăng ký mới',
    value: '48',
    icon: <TrendingUp size={24} className="text-accent-600" />,
    trend: '+8%',
  },
  {
    label: 'Lớp học hôm nay',
    value: '6',
    icon: <Calendar size={24} className="text-success-500" />,
    trend: null,
  },
];

const AdminDashboard = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Tổng quan</h1>
        <p className="text-gray-600">Xem thống kê và báo cáo hoạt động</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gray-50 rounded-lg">
                {stat.icon}
              </div>
              {stat.trend && (
                <span className="text-sm font-medium text-success-600">
                  {stat.trend}
                </span>
              )}
            </div>
            <h3 className="text-2xl font-semibold mb-1">{stat.value}</h3>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Đăng ký gần đây</h2>
          <div className="space-y-4">
            {/* Placeholder for recent registrations */}
            <p className="text-gray-600">Chức năng đang được phát triển...</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Lịch học hôm nay</h2>
          <div className="space-y-4">
            {/* Placeholder for today's schedule */}
            <p className="text-gray-600">Chức năng đang được phát triển...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;