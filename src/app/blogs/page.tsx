import { SectionHeader } from '@/components/ui/CustomHeader';
import { fetchAllPosts } from '@/lib/api/posts';
import { Calendar } from 'lucide-react';
import React from 'react';
import Link from 'next/link';

export default async function AllBlogsPage() {
    const url = process.env.BASE_URL;

    const posts = await fetchAllPosts();

    return (
        <div className='p-5 mx-auto'>
            <div className='bg-amber-100 py-5 mb-10 rounded-3xl'>
                <SectionHeader
                    title="All Blogs!"
                    variant="orange"
                />
            </div>
            <div className="max-w-4xl mx-auto pb-8 px-4 sm:px-6 lg:px-8">

                {/* Posts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {posts.map((post) => (
                        <article
                            key={post.id}
                            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
                        >
                            {/* Post Meta */}
                            <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <Calendar size={14} />
                                    <span>{post.publishedAt}</span>
                                </div>
                                <span>•</span>
                                <span>{post.categories?.name}</span>
                            </div>

                            {/* Post Title */}
                            <Link href={`/blog/${post.categories?.name}`}>
                                <h3 className="text-xl font-semibold text-blue-600 hover:text-blue-800 cursor-pointer mb-3 line-clamp-2">
                                    {post.title}
                                </h3>
                            </Link>


                            <div className="flex items-center gap-2">
                                <img
                                    src={post.author?.avatar
                                        ? `${url}${post.author.avatar.url}`
                                        : `/default-avatar.png`}
                                    alt={`${post.author?.firstName} ` +
                                        `${post.author?.lastName}`}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <span className="text-sm font-medium text-gray-700">
                                    {`${post.author?.firstName} ` +
                                        `${post.author?.lastName}`}
                                </span>
                            </div>
                        </article>
                    ))}
                </div>

            </div>
        </div>
    );
};
