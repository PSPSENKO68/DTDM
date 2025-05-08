import { useState } from 'react';
import { X } from 'lucide-react';

const images = [
  {
    id: 1,
    src: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg',
    alt: 'Học viên trong lớp học',
  },
  {
    id: 2,
    src: 'https://images.pexels.com/photos/8199562/pexels-photo-8199562.jpeg',
    alt: 'Hoạt động nhóm',
  },
  {
    id: 3,
    src: 'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg',
    alt: 'Học viên trình bày',
  },
  {
    id: 4,
    src: 'https://images.pexels.com/photos/4145347/pexels-photo-4145347.jpeg',
    alt: 'Lớp học tiếng Anh',
  },
  {
    id: 5,
    src: 'https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg',
    alt: 'Thảo luận nhóm',
  },
  {
    id: 6,
    src: 'https://images.pexels.com/photos/5905448/pexels-photo-5905448.jpeg',
    alt: 'Môi trường học tập',
  },
];

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage === null) return;
    setSelectedImage((selectedImage + 1) % images.length);
  };

  const prevImage = () => {
    if (selectedImage === null) return;
    setSelectedImage((selectedImage - 1 + images.length) % images.length);
  };

  return (
    <section className="section bg-gray-50">
      <div className="container">
        <div className="max-w-xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Hình ảnh lớp học</h2>
          <p className="text-gray-600">
            Khám phá không gian học tập hiện đại và các hoạt động của học viên tại EduCare Center
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="overflow-hidden rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => openLightbox(index)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        {selectedImage !== null && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
              aria-label="Close lightbox"
            >
              <X size={30} />
            </button>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 text-white hover:bg-black/70"
              aria-label="Previous image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 text-white hover:bg-black/70"
              aria-label="Next image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
            <div className="max-w-5xl max-h-[90vh] flex items-center justify-center">
              <img
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="absolute bottom-4 left-0 right-0 text-center text-white">
              <p className="text-sm">
                {selectedImage + 1} / {images.length}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;