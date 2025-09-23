"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Filter,
    Search,
    Calendar,
    User,
    Tag,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

// Types
interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    author: {
        name: string;
        avatar: string;
    };
    readTime: string;
    tags: string[];
    slug: string;
}

interface BlogPostsSectionProps {
    posts?: BlogPost[];
    totalPosts?: number;
    currentPage?: number;
    totalPages?: number;
    onPageChange?: (page: number) => void;
}

// Sample data - replace with your actual data
const samplePosts: BlogPost[] = [
    {
        id: '1',
        title: 'How to build scalable React applications with modern architecture patterns',
        excerpt: 'Scalable applications require thoughtful analysis and disciplined persistence in both development and business contexts. Learn architecture patterns and best practices that will help scale your development to efficiently manage complexity in large systems.',
        date: 'Dec 18, 24',
        author: {
            name: 'Sarah Johnson',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face'
        },
        readTime: '8 min read',
        tags: ['React', 'Architecture', 'JavaScript', 'Frontend'],
        slug: 'scalable-react-applications'
    },
    {
        id: '2',
        title: 'Building resilient microservices with Node.js and TypeScript',
        excerpt: 'This blog post walks readers through patterns and strategies to enhance application resiliency through well-designed microservices. We explore how to implement service discovery patterns, circuit breakers, and monitoring solutions.',
        date: 'Dec 17, 24',
        author: {
            name: 'Michael Chen',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
        },
        readTime: '12 min read',
        tags: ['Node.js', 'TypeScript', 'Microservices', 'Backend'],
        slug: 'resilient-microservices'
    },
    {
        id: '3',
        title: 'A complete guide to modern CSS Grid and Flexbox layouts',
        excerpt: 'In this post, we explore how CSS Grid and Flexbox can solve complex layout problems. We cover practical examples and best practices for creating responsive, maintainable layouts.',
        date: 'Dec 16, 24',
        author: {
            name: 'Emily Davis',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face'
        },
        readTime: '10 min read',
        tags: ['CSS', 'Layout', 'Web Design', 'Frontend'],
        slug: 'css-grid-flexbox-guide'
    },
    {
        id: '4',
        title: 'Optimizing database performance with advanced indexing strategies',
        excerpt: 'Learn advanced database optimization techniques including composite indexes, partial indexes, and query optimization strategies that can dramatically improve your application performance.',
        date: 'Dec 15, 24',
        author: {
            name: 'David Rodriguez',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
        },
        readTime: '15 min read',
        tags: ['Database', 'Performance', 'SQL', 'Optimization'],
        slug: 'database-performance-optimization'
    }
];

const BlogPostsSection: React.FC<BlogPostsSectionProps> = ({
    posts = samplePosts,
    totalPosts = 148,
    currentPage = 1,
    totalPages = 25,
    onPageChange
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    const handlePageChange = (page: number) => {
        if (onPageChange) {
            onPageChange(page);
        }
    };

    const renderPagination = () => {
        const pages = [];
        const maxVisiblePages = 5;

        // Add first page
        pages.push(1);

        // Add ellipsis if needed
        if (currentPage > 3) {
            pages.push('...');
        }

        // Add current page and surrounding pages
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            if (!pages.includes(i)) {
                pages.push(i);
            }
        }

        // Add ellipsis if needed
        if (currentPage < totalPages - 2) {
            pages.push('...');
        }

        // Add last page
        if (totalPages > 1 && !pages.includes(totalPages)) {
            pages.push(totalPages);
        }

        return pages.map((page, index) => {
            if (page === '...') {
                return (
                    <span key={index} className="px-3 py-2 text-gray-500">
                        ...
                    </span>
                );
            }

            return (
                <button
                    key={page}
                    onClick={() => handlePageChange(page as number)}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    {page}
                </button>
            );
        });
    };

    return (
        <div className="max-w-7xl mx-auto pb-8 px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                {/* Search and Filter Controls */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex gap-2 w-full">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                        >
                            <Filter size={16} />
                            Filter
                        </button>

                        <div className="w-full relative">
                            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search posts..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 w-full pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
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
                                <span>{post.date}</span>
                            </div>
                            <span>•</span>
                            <span>{post.readTime}</span>
                        </div>

                        {/* Post Title */}
                        <Link href={`/blog/${post.slug}`}>
                            <h3 className="text-xl font-semibold text-blue-600 hover:text-blue-800 cursor-pointer mb-3 line-clamp-2">
                                {post.title}
                            </h3>
                        </Link>

                        {/* Post Excerpt */}
                        <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                            {post.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 4).map((tag, index) => (
                                <Link
                                    key={index}
                                    href={`/tags/${tag.toLowerCase()}`}
                                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full hover:bg-blue-200 transition-colors"
                                >
                                    <Tag size={10} />
                                    {tag}
                                </Link>
                            ))}
                        </div>

                        {/* Author */}
                        <div className="flex items-center gap-2">
                            <img
                                src={post.author.avatar}
                                alt={post.author.name}
                                className="w-8 h-8 rounded-full object-cover"
                            />
                            <span className="text-sm font-medium text-gray-700">
                                {post.author.name}
                            </span>
                        </div>
                    </article>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2">
                <button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 disabled:text-gray-400 hover:bg-gray-100 rounded-md transition-colors disabled:cursor-not-allowed"
                >
                    <ChevronLeft size={16} />
                    Previous
                </button>

                {renderPagination()}

                <button
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 disabled:text-gray-400 hover:bg-gray-100 rounded-md transition-colors disabled:cursor-not-allowed"
                >
                    Next
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
};

export default BlogPostsSection;