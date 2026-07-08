import React from 'react';

export default function Spinner({ size = 'w-8 h-8' }) {
    return (
        <div className="flex justify-center items-center">
            <div className={`${size} border-4 border-blue-900 border-t-transparent rounded-full animate-spin`} />
        </div>
    );
}