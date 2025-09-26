import { SectionHeader } from "@/components/ui/CustomHeader";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { fetchAllPosts } from "@/lib/api/posts";
import { slugify } from "@/lib/utils/slugify";


export default async function FeaturedPostsSection() {
    const url = process.env.BASE_URL;
    const posts = await fetchAllPosts();
    const featuredPosts = posts.slice(0, 4);

    return (
        <div>
            <SectionHeader variant="purple" title="Featured Blogs!" />
            <div className="w-full flex justify-center">
                <div className="grid md:grid-cols-1 lg:grid-cols-2 p-8 mx-auto gap-8">
                    {featuredPosts.map((post, idx) => {
                        const postLink = `/blogs/${slugify(post.categories?.name)}/${slugify(post.title)}-${post.id}`;
                        return (
                            <FeatureCard
                                key={idx}
                                imageSrc={
                                    post.featuredImage
                                        ? `${url}/${post.featuredImage.url}`
                                        : "/placeholder.jpg"
                                }
                                title={post.title}
                                link={postLink}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
