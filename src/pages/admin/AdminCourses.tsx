import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Pencil, Trash2, MoreVertical } from 'lucide-react';

const courses = [
  {
    id: 'ielts-prep',
    title: 'Luyện thi IELTS',
    category: 'Luyện thi chứng chỉ',
    level: 'Trung cấp - Cao cấp',
    students: 120,
    status: 'active',
  },
  {
    id: 'toeic-prep',
    title: 'Luyện thi TOEIC',
    category: 'Luyện thi chứng chỉ',
    level: 'Sơ cấp - Trung cấp',
    students: 150,
    status: 'active',
  },
  // More courses...
];

const AdminCourses = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa khóa học này?')) {
      console.log('Delete course:', id);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Quản lý khóa học</h1>
          <p className="text-gray-600">Quản lý thông tin các khóa học</p>
        </div>
        <Link
          to="/admin/courses/new"
          className="btn btn-primary inline-flex items-center gap-2"
        >
          <Plus size={20} />
          Thêm khóa học
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <div className="flex gap-4">
            <div className="flex-grow">
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Tìm kiếm khóa học..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 input-field"
                />
              </div>
            </div>
            <select className="input-field py-2">
              <option value="">Tất cả danh mục</option>
              <option value="exam-prep">Luyện thi chứng chỉ</option>
              <option value="general">Tiếng Anh tổng quát</option>
              <option value="business">Tiếng Anh thương mại</option>
            </select>
            <select className="input-field py-2">
              <option value="">Tất cả trạng thái</option>
              <option value="active">Đang mở</option>
              <option value="draft">Nháp</option>
              <option value="archived">Đã lưu trữ</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Tên khóa học
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Danh mục
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Trình độ
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Học viên
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div>
                        <div className="font-medium text-gray-900">
                          {course.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {course.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {course.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {course.level}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {course.students}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                      Đang mở
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/courses/${course.id}`}
                        className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-lg"
                      >
                        <Pencil size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="p-2 text-gray-500 hover:text-error-600 hover:bg-gray-100 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Hiển thị 1-10 trong tổng số 20 khóa học
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50">
                Trước
              </button>
              <button className="px-3 py-1 border rounded bg-primary-50 text-primary-600 font-medium">
                1
              </button>
              <button className="px-3 py-1 border rounded hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1 border rounded hover:bg-gray-50">
                Sau
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCourses;