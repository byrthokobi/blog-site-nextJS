import { FeatureCard } from '@/components/ui/FeatureCard';
import { slugify } from '@/lib/slugify';
import React from 'react'

interface Post {
    id: string;
    title: string;
    publishedAt: string;
    author: {
        firstName: string;
        lastName: string;
        avatar?: { url: string };
    };
    featuredImage?: { url: string };
    categories: { name: string };
}


export default async function CategoryPage({ params }: { params: { category: string } }) {
    const { category } = await params;
    const url = process.env.BASE_URL;

    function formatCategoryName(name: string) {
        return name
            .split("-")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize first letter
            .join(" ");
    }

    const formattedCategory = formatCategoryName(category);

    const categoryRes = await fetch(
        `${url}/api/categories?where[name][equals]=${encodeURIComponent(formattedCategory)}`,
        { cache: "no-store" }
    );

    const categoryData = await categoryRes.json();

    console.log(categoryData);
    const categoryId = categoryData.docs?.[0]?.id;

    console.log(categoryId);

    if (!categoryId) {
        return <p>No category found</p>;
    }

    const res = await fetch(
        `${url}/api/posts?where[categories][equals]=${categoryId}`,
        { cache: "no-store" }
    );
    const data = await res.json();
    const posts: Post[] = data.docs || [];

    console.log(posts);

    return (
        <div className="min-h-screen text-center flex flex-col">
            <section className="relative bg-gray-900 text-white w-full h-64">
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <div className="relative max-w-7xl mx-auto py-20 px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        {category.toUpperCase()}
                    </h1>
                    <p className="mt-4 text-lg text-gray-300">
                        Browse the latest posts in <span className="font-semibold">{category.toUpperCase()}</span>.
                    </p>
                </div>
            </section>
            <div className="w-[75%] grid md:grid-cols-1 lg:grid-cols-2 p-8 mx-auto gap-8">
                {posts.map((post, idx) => {
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
    );
}