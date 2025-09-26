import { FeatureCard } from '@/components/ui/FeatureCard';
import { fetchPostsByCategory } from '@/lib/api/posts';
import { getCategoryBySlug } from '@/lib/data/categoryMapper';
import { slugify } from '@/lib/utils/slugify';
import React from 'react'

export default async function CategoryPage({ params }: { params: { category: string } }) {
    const { category } = await params;
    const fetchCategoryData = await getCategoryBySlug(category);
    const url = process.env.BASE_URL || "";

    const categoryId = fetchCategoryData?.id;

    if (!categoryId) {
        return <p className='text-center min-h-[600px]'>No category found</p>;
    }

    const posts = await fetchPostsByCategory(categoryId);

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
                {posts.length ? (

                    posts.map((post, idx) => {
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
                    })) : <p>No posts found in this category.</p>

                }
            </div>
        </div>
    );
}