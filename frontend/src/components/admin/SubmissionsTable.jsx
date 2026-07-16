import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { FiEye, FiEdit2, FiTrash2, FiFileText } from 'react-icons/fi';

export default function SubmissionsTable({
    data,
    loading,
    onDelete,
    onPageChange,
    total,
    page,
    limit,
    onEdit,
}) {
    const navigate = useNavigate();

    if (loading) {
        return (
            <div className="text-center py-12">
                <div className="inline-block w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
                <p className="mt-2 text-gray-500 text-sm">Loading submissions...</p>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="flex justify-center mb-3">
                    <FiFileText className="w-12 h-12 text-gray-300" />
                </div>
                <p className="text-gray-500 text-sm">No submissions found</p>
                <p className="text-gray-400 text-xs mt-1">Try adjusting your filters</p>
            </div>
        );
    }

    const startIndex = (page - 1) * limit;
    const totalPages = Math.ceil(total / limit);

    return (
        <div className="overflow-x-auto">
            {/* ─── Table ──────────────────────────────────────────── */}
            <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">KPI</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted By</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {data.map((sub, i) => (
                        <tr key={sub._id} className="hover:bg-gray-50 transition">
                            <td className="px-4 py-3 text-gray-500">{startIndex + i + 1}</td>
                            <td className="px-4 py-3 font-medium text-gray-800">
                                {sub.module.replace(/([A-Z])/g, ' $1').trim()}
                            </td>
                            <td className="px-4 py-3">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {sub.kpi}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-gray-700">{sub.department}</td>
                            <td className="px-4 py-3 text-gray-700">
                                {sub.submittedBy?.username || 'Unknown'}
                            </td>
                            <td className="px-4 py-3 text-gray-500">
                                {format(new Date(sub.createdAt), 'dd MMM yyyy, hh:mm a')}
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex items-center justify-center gap-1">
                                    {/* ─── View Button ────────────────── */}
                                    <button
                                        onClick={() => navigate(`/admin/submissions/${sub._id}`)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                        title="View Details"
                                    >
                                        <FiEye className="w-4 h-4" />
                                    </button>


                                    <button
                                        onClick={() => onEdit(sub)}
                                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                                        title="Edit"
                                    >
                                        <FiEdit2 className="w-4 h-4" />
                                    </button>

                                    {/* ─── Delete Button ──────────────── */}
                                    <button
                                        onClick={() => onDelete(sub._id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                        title="Delete"
                                    >
                                        <FiTrash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* ─── Pagination ────────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 bg-gray-50 border-t border-gray-200">
                <span className="text-sm text-gray-500">
                    Showing <span className="font-medium">{data.length}</span> of{' '}
                    <span className="font-medium">{total}</span> entries
                </span>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onPageChange(page - 1)}
                        disabled={page === 1}
                        className={`px-4 py-2 text-sm border rounded-lg transition ${page === 1
                            ? 'border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50'
                            : 'border-gray-300 hover:bg-white text-gray-700 hover:border-blue-300'
                            }`}
                    >
                        Previous
                    </button>

                    <span className="px-4 py-2 text-sm font-medium text-gray-700">
                        Page {page} of {totalPages || 1}
                    </span>

                    <button
                        onClick={() => onPageChange(page + 1)}
                        disabled={page >= totalPages}
                        className={`px-4 py-2 text-sm border rounded-lg transition ${page >= totalPages
                            ? 'border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50'
                            : 'border-gray-300 hover:bg-white text-gray-700 hover:border-blue-300'
                            }`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}