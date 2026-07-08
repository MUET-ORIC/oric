import React from 'react';
import { format } from 'date-fns';
import { FiFile, FiRefreshCw } from 'react-icons/fi';

export default function MySubmissionsList({ submissions, loading, onRefresh }) {
    if (loading) {
        return (
            <div className="text-center py-12">
                <div className="inline-block w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
                <p className="mt-2 text-gray-500 text-sm">Loading your submissions...</p>
            </div>
        );
    }

    if (!submissions || submissions.length === 0) {
        return (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex justify-center mb-4">
                    <FiFile className="w-16 h-16 text-gray-300" />
                </div>
                <p className="text-gray-500 text-sm font-medium">No submissions yet</p>
                <p className="text-gray-400 text-xs mt-1">You haven't submitted any KPIs. Go to Research, Innovation, or Sustainability to get started.</p>
                <button onClick={onRefresh} className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-xl transition">
                    <FiRefreshCw className="w-4 h-4" /> Refresh
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">KPI</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted On</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evidence</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {submissions.map((sub, i) => (
                            <tr key={sub._id} className="hover:bg-gray-50 transition">
                                <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                                <td className="px-4 py-3 font-medium text-gray-800">{sub.module.replace(/([A-Z])/g, ' $1').trim()}</td>
                                <td className="px-4 py-3"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{sub.kpi}</span></td>
                                <td className="px-4 py-3 text-gray-500">{format(new Date(sub.createdAt), 'dd MMM yyyy, hh:mm a')}</td>
                                <td className="px-4 py-3">
                                    {sub.pdfFilename ? <a href={`${import.meta.env.VITE_API_URL}/uploads/${sub.pdfFilename}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline text-sm">View PDF</a> : <span className="text-gray-400 text-sm">N/A</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                <p className="text-sm text-gray-500">Showing <span className="font-medium">{submissions.length}</span> submissions</p>
            </div>
        </div>
    );
}