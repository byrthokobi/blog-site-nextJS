import { SectionHeader } from "@/components/CustomHeader";
import { FeatureCard } from "@/components/FeatureCard";
import BlogPostsSection from "./NewestPostComponent";

interface PostProps {
  title: string;
  content?: string;
  url?: string;
  featuredImage?: {
    url?: string;
  };
}

export default async function Home() {

  const url = process.env.BASE_URL;
  const data = await fetch(`${url}/api/posts`, {
    cache: "no-store"
  });
  const posts = await data.json();
  const featuredPosts: PostProps[] = posts.docs.slice(0, 4);

  // console.log(posts);

  posts
  return (
    <div className="main-body h-full space-y-12">
      {/*Hero Heading Section*/}
      <div className="text-center p-6 md:p-10 h-96 flex justify-center items-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl leading-snug">
          Welcome to{" "}
          <span className="underline font-bold decoration-yellow-400 decoration-4">
            MrKnowItAll!
          </span>
          <br />
          Your ultimate guide to everything worth knowing.
        </h2>
      </div>

      {/*Feature-Card Section*/}
      <div>
        <SectionHeader
          variant="purple"
          title="Featured Blogs!"
        />
        <div className="w-full flex justify-center">
          <div className="grid md:grid-cols-1 lg:grid-cols-2 p-8 mx-auto gap-8">
            {featuredPosts.map((post) => (
              <FeatureCard
                imageSrc={post.featuredImage ? `${url}/${post.featuredImage.url}` : "/placeholder.jpg"}
                title={post.title}
                link="#"
              />
            ))}
          </div>
        </div>

      </div>

      {/*Newest-Post Section*/}

      <div>
        <SectionHeader
          title="Newest Blogs!"
          variant="orange"
        />
        <BlogPostsSection />
      </div>
    </div>
  );
}