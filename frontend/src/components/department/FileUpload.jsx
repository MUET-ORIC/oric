import React, { useRef } from 'react';

export default function FileUpload({ onFileSelect, accept = '.pdf,application/pdf', label = 'Upload PDF' }) {
    const ref = useRef();
    const handleChange = (e) => {
        if (e.target.files.length) onFileSelect(e.target.files[0]);
    };
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                type="file"
                accept={accept}
                ref={ref}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            />
        </div>
    );
}