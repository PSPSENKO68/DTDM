import Hero from '../components/Hero';
import FeatureSection from '../components/FeatureSection';
import CourseSection from '../components/CourseSection';
import TestimonialSection from '../components/TestimonialSection';
import VideoSection from '../components/VideoSection';
import GallerySection from '../components/GallerySection';
import StatSection from '../components/StatSection';

const HomePage = () => {
  return (
    <>
      <Hero />
      <FeatureSection />
      <CourseSection />
      <StatSection />
      <TestimonialSection />
      <VideoSection />
      <GallerySection />
    </>
  );
};

export default HomePage;