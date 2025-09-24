import { SectionHeader } from "@/components/ui/CustomHeader";
import { FeatureCard } from "@/components/ui/FeatureCard";

interface PostProps {
    title: string;
    content?: string;
    url?: string;
    featuredImage?: {
        url?: string;
    };
}

export default async function FeaturedPostsSection() {
    const url = process.env.BASE_URL;
    const data = await fetch(`${url}/api/posts`, { cache: "no-store" });
    const posts = await data.json();
    const featuredPosts: PostProps[] = posts.docs.slice(0, 4);

    return (
        <div>
            <SectionHeader variant="purple" title="Featured Blogs!" />
            <div className="w-full flex justify-center">
                <div className="grid md:grid-cols-1 lg:grid-cols-2 p-8 mx-auto gap-8">
                    {featuredPosts.map((post, idx) => (
                        <FeatureCard
                            key={idx}
                            imageSrc={
                                post.featuredImage
                                    ? `${url}/${post.featuredImage.url}`
                                    : "/placeholder.jpg"
                            }
                            title={post.title}
                            link="#"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
