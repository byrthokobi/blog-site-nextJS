export default function Loading() {
    return (
        <div className="min-h-screen text-center flex flex-col">
            <section className="relative bg-gray-900 text-white w-full h-64">
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <div className="relative max-w-7xl mx-auto py-20 px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gray-300 animate-pulse h-12 w-3/4 mx-auto"></h1>
                    <p className="mt-4 text-lg text-gray-300 bg-gray-300 animate-pulse h-6 w-1/2 mx-auto"></p>
                </div>
            </section>
            <div className="w-[75%] grid md:grid-cols-1 lg:grid-cols-2 p-8 mx-auto gap-8">
                <div className="bg-gray-300 animate-pulse h-80 rounded-lg"></div>
                <div className="bg-gray-300 animate-pulse h-80 rounded-lg"></div>
                <div className="bg-gray-300 animate-pulse h-80 rounded-lg"></div>
                <div className="bg-gray-300 animate-pulse h-80 rounded-lg"></div>
            </div>
        </div>
    );
}
