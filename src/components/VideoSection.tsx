import { useState } from 'react';
import { Play, X } from 'lucide-react';

const VideoSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="max-w-xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Khám phá EduCare Center</h2>
          <p className="text-gray-600">
            Xem video giới thiệu về trung tâm, cơ sở vật chất và phương pháp giảng dạy
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg group">
            <img
              src="https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg"
              alt="Video thumbnail"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <button
                onClick={openModal}
                className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center transition-transform duration-300 hover:scale-110 group-hover:bg-white"
                aria-label="Play video"
              >
                <Play size={36} className="text-primary-600 ml-1" fill="currentColor" />
              </button>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="relative w-full max-w-5xl mx-auto">
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 text-white hover:text-gray-300"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
              <div className="relative pb-[56.25%] h-0">
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="EduCare Center Introduction"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoSection;