import { Users, BookOpen, Trophy, Clock } from 'lucide-react';

const stats = [
  {
    icon: <Users size={36} className="text-white" />,
    value: '5,000+',
    label: 'Học viên',
  },
  {
    icon: <BookOpen size={36} className="text-white" />,
    value: '20+',
    label: 'Khóa học',
  },
  {
    icon: <Trophy size={36} className="text-white" />,
    value: '95%',
    label: 'Tỷ lệ thành công',
  },
  {
    icon: <Clock size={36} className="text-white" />,
    value: '10',
    label: 'Năm kinh nghiệm',
  },
];

const StatSection = () => {
  return (
    <section className="py-12 bg-primary-700">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary-600">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-primary-100">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatSection;