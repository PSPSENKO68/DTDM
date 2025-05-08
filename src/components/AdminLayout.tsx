import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Users, Settings, LogOut } from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Tổng quan' },
    { path: '/admin/courses', icon: <BookOpen size={20} />, label: 'Khóa học' },
    { path: '/admin/students', icon: <Users size={20} />, label: 'Học viên' },
    { path: '/admin/settings', icon: <Settings size={20} />, label: 'Cài đặt' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
        <div className="flex items-center gap-2 px-6 py-4 border-b">
          <BookOpen className="text-primary-600" size={24} />
          <span className="text-lg font-semibold">Admin Dashboard</span>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="pt-4 mt-4 border-t">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-50"
            >
              <LogOut size={20} />
              <span>Đăng xuất</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <main className="ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;