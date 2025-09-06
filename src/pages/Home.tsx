import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { RoadmapSection } from '@/components/dashboard/RoadmapSection';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <div id="roadmap">
        <RoadmapSection />
      </div>
      <Footer />
    </div>
  );
};

export default Home;