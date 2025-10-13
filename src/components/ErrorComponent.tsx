import React from 'react';
import Link from 'next/link';

const ErrorComponent = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <p className="text-xl text-gray-600 mt-4">Oops! The page you are looking for doesn't exist.</p>
            <p className="text-lg text-gray-500 mt-2">It might have been moved or deleted.</p>
        </div>
    );
};

export default ErrorComponent;
