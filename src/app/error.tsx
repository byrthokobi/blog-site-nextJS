"use client"

import React from 'react';

interface ErrorProps {
    error: Error;
    reset: () => void;
}

const ErrorPage: React.FC<ErrorProps> = ({ error, reset }) => {
    return (
        <div className="error-container">
            <h1>Something went wrong</h1>
            <p>{error.message}</p>
            <button onClick={reset}>Try Again</button>
        </div>
    );
};

export default ErrorPage;