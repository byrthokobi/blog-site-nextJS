import { NewestPostsSection } from "../components/LandingPageComponents/NewestPostsSection";
import FeaturedPostsSection from "@/components/LandingPageComponents/FeaturedPostsSection";
import HeroSection from "@/components/LandingPageComponents/HeroSection";


export default async function Home() {

  return (
    <div className="main-body h-full space-y-12">
      <HeroSection />
      <FeaturedPostsSection />
      <NewestPostsSection />
    </div>
  );
}