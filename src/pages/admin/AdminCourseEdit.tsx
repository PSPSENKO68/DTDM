import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';

interface CourseFormData {
  title: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  schedule: string;
  price: string;
  image: string;
  status: string;
}

const initialFormData: CourseFormData = {
  title: '',
  description: '',
  category: '',
  level: '',
  duration: '',
  schedule: '',
  price: '',
  image: '',
  status: 'draft',
};

const AdminCourseEdit = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState<CourseFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Save course:', formData);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => window.history.back()}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-semibold">
            {id === 'new' ? 'Thêm khóa học mới' : 'Chỉnh sửa khóa học'}
          </h1>
          <p className="text-gray-600">
            {id === 'new'
              ? 'Tạo một khóa học mới'
              : 'Cập nhật thông tin khóa học'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-4">Thông tin cơ bản</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên khóa học
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Nhập tên khóa học"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mô tả
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="input-field"
                    placeholder="Nhập mô tả khóa học"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hình ảnh
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Nhập URL hình ảnh"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-4">Chi tiết khóa học</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Danh mục
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Chọn danh mục</option>
                    <option value="exam-prep">Luyện thi chứng chỉ</option>
                    <option value="general">Tiếng Anh tổng quát</option>
                    <option value="business">Tiếng Anh thương mại</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Trình độ
                  </label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Chọn trình độ</option>
                    <option value="beginner">Sơ cấp</option>
                    <option value="intermediate">Trung cấp</option>
                    <option value="advanced">Cao cấp</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Thời lượng
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="VD: 3 tháng"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lịch học
                  </label>
                  <input
                    type="text"
                    name="schedule"
                    value={formData.schedule}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="VD: Thứ 2, 4, 6"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Học phí
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="VD: 4,500,000 VND"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Trạng thái
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="draft">Nháp</option>
                    <option value="active">Đang mở</option>
                    <option value="archived">Đã lưu trữ</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-4">Xuất bản</h2>
              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full"
                >
                  {isSubmitting ? (
                    'Đang lưu...'
                  ) : (
                    <>
                      <Save size={20} />
                      <span>Lưu khóa học</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-outline w-full"
                  onClick={() => window.history.back()}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminCourseEdit;