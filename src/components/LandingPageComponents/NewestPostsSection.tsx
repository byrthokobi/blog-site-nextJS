import React from 'react';
import Link from 'next/link';
import {
    Filter,
    Search,
    Calendar,
} from 'lucide-react';
import { SectionHeader } from '../ui/CustomHeader';
import { fetchPostsBySearch } from '@/lib/api/posts';
import SearchBar from '../ui/SearchBar';

interface NewestPostsSectionProps {
    searchParams?: { query?: string };
}

export default async function NewestPostsSection({ searchParams }: NewestPostsSectionProps) {
    const url = process.env.BASE_URL;
    const searchText = await searchParams;
    const searchTerm = searchText?.query ?? "";

    const posts = await fetchPostsBySearch(searchTerm);
    const totalPosts = posts.length;

    return (
        <div>
            <SectionHeader
                title="Newest Blogs!"
                variant="orange"
            />
            <div className="max-w-7xl mx-auto pb-8 px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="flex gap-2 w-full">
                            <button
                                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                            >
                                <Filter size={16} />
                                Filter
                            </button>

                            <div className="w-full relative">
                                <div className="w-full relative">
                                    <SearchBar />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results count */}
                    <p className="text-sm text-gray-600 mb-6">
                        Displaying {posts.length} of {totalPosts} posts
                    </p>
                </div>

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