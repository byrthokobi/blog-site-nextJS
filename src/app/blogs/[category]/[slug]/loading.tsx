import React from 'react';

const Loading: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="relative w-full h-80 mb-6 bg-gray-300 animate-pulse rounded-xl"></div>

            <h1 className="text-3xl font-bold mb-4 bg-gray-300 animate-pulse rounded h-8 w-3/4"></h1>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-300 animate-pulse rounded-full"></div>
                    <div className="w-20 h-6 bg-gray-300 animate-pulse rounded"></div>
                </div>
                • <div className="w-20 h-6 bg-gray-300 animate-pulse rounded"></div>
            </div>

            {/* Blog Content */}
            <div className="prose prose-lg max-w-none text-justify">
                <div className="h-24 bg-gray-300 animate-pulse rounded mb-4"></div>
                <div className="h-24 bg-gray-300 animate-pulse rounded mb-4"></div>
                <div className="h-24 bg-gray-300 animate-pulse rounded mb-4"></div>
            </div>

            <div className="relative flex items-center my-10">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="px-4 text-gray-500 text-sm">The End</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="max-w-3xl mx-auto p-6">
                <h3 className="text-2xl font-bold mb-6 bg-gray-300 animate-pulse rounded h-6 w-3/4"></h3>
                {/* Comment Form */}
                <div className="mb-8 border-b pb-6">
                    <div className="w-full p-3 border border-gray-300 rounded mb-3 bg-gray-300 animate-pulse"></div>
                    <div className="px-4 py-2 bg-gray-300 animate-pulse rounded h-10 w-32"></div>
                </div>

                {/* Comments */}
                <div className="space-y-6">
                    <div className="border-b pb-4 bg-gray-300 animate-pulse rounded h-10"></div>
                    <div className="border-b pb-4 bg-gray-300 animate-pulse rounded h-10"></div>
                    <div className="border-b pb-4 bg-gray-300 animate-pulse rounded h-10"></div>
                </div>
            </div>
        </div>
    );
}


export default Loading;
