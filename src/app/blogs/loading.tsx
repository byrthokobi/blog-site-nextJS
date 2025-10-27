export default function Loading() {
    return (
        <div className='p-5 mx-auto'>
            <div className='bg-amber-100 py-5 mb-10 rounded-3xl'>
                <div className="h-10 bg-gray-300 animate-pulse rounded-xl w-1/2 mx-auto"></div>
            </div>
            <div className="max-w-4xl mx-auto pb-8 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {Array(4).fill(0).map((_, index) => (
                        <article
                            key={index}
                            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200 animate-pulse"
                        >
                            <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
                                    <div className="w-20 h-4 bg-gray-300 rounded"></div>
                                </div>
                                <span className="h-4 w-4 bg-gray-300 rounded-full"></span>
                                <div className="w-20 h-4 bg-gray-300 rounded"></div>
                            </div>
                            <div className="h-6 w-3/4 bg-gray-300 animate-pulse rounded mb-4"></div>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                                <div className="w-20 h-4 bg-gray-300 rounded"></div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
