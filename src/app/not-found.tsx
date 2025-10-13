import React from 'react';
import Link from 'next/link';
import ErrorComponent from '@/components/ErrorComponent';

const NotFound = () => {
    return (
        <>
            <ErrorComponent />
            <Link href="/" className="mt-6 px-6 py-3 text-white bg-blue-600 rounded-full hover:bg-blue-700 transition duration-300">
                Go Back to Home
            </Link>
        </>
    );
};

export default NotFound;
