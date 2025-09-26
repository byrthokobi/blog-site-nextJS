import NewestPostsSection from "../components/LandingPageComponents/NewestPostsSection";
import FeaturedPostsSection from "@/components/LandingPageComponents/FeaturedPostsSection";
import HeroSection from "@/components/LandingPageComponents/HeroSection";


export default async function Home({ searchParams }: { searchParams?: { query?: string } }) {

  return (
    <div className="max-w-[90%] mx-auto h-full space-y-12">
      <HeroSection />
      <FeaturedPostsSection />
      <NewestPostsSection searchParams={searchParams} />
    </div>
  );
}