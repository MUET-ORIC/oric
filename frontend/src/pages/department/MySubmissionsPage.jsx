import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMySubmissions } from '../../hooks/useSubmissions';
import MySubmissionsList from '../../components/department/MySubmissionsList';
import { FiArrowLeft } from 'react-icons/fi';

export default function MySubmissionsPage() {
    const navigate = useNavigate();
    const { submissions, loading } = useMySubmissions();

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
                <button onClick={() => navigate(-1)} className="p-2 text-gray-500 hover:text-blue-900 hover:bg-blue-50 rounded-xl transition" aria-label="Go back">
                    <FiArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-2xl font-bold text-blue-900">My Submissions</h1>
            </div>
            <MySubmissionsList submissions={submissions} loading={loading} />
        </div>
    );
}