import React, { useState, useEffect } from 'react';
import { getSubmissions, deleteSubmission } from '../../api/admin';
import EditSubmissionModal from '../../components/admin/EditSubmissionModal';
import FilterBar from '../../components/common/FilterBar';
import { FiEdit2, FiTrash2, FiEye, FiFile, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function ManageSubmissions() {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSubmission, setSelectedSubmission] = useState(null); // ✅ Track selected submission
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    // ─── Filters ──────────────────────────────────────────────
    const [filters, setFilters] = useState({
        page: 1,
        limit: 10,
        module: '',
        kpi: '',
        department: '',
        startDate: '',
        endDate: '',
        search: '',
        submittedBy: '',
    });
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);

    // ─── Fetch Submissions ──────────────────────────────────
    const fetchSubmissions = async () => {
        setLoading(true);
        try {
            const res = await getSubmissions(filters);
            setSubmissions(res.data.submissions || []);
            setTotal(res.data.total || 0);
            setTotalPages(res.data.totalPages || 1);
        } catch (err) {
            console.error('Fetch error:', err);
            toast.error('Failed to load submissions');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubmissions();
    }, [filters]);

    // ─── Handle Edit Click ───────────────────────────────────
    const handleEditClick = (submission) => {
        setSelectedSubmission(submission); // ✅ Pass the clicked submission
        setShowEditModal(true);
    };

    // ─── Handle Delete Click ─────────────────────────────────
    const handleDeleteClick = (id) => {
        setDeletingId(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteSubmission(deletingId);
            toast.success('Deleted successfully');
            setShowDeleteModal(false);
            fetchSubmissions();
        } catch {
            toast.error('Failed to delete');
        }
    };

    // ─── Pagination ──────────────────────────────────────────
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setFilters({ ...filters, page });
        }
    };

    // ─── Loading ─────────────────────────────────────────────
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="inline-block w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
                <span className="ml-3 text-gray-500">Loading submissions...</span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* ─── Header ──────────────────────────────────────────── */}
            <div>
                <h1 className="text-2xl font-bold text-blue-900">Manage Submissions</h1>
                <p className="text-sm text-gray-500">View, edit, and delete all KPI submissions</p>
            </div>

            {/* ─── Filter Bar ──────────────────────────────────────── */}
            <FilterBar filters={filters} setFilters={setFilters} />

            {/* ─── Submissions Table ──────────────────────────────── */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 overflow-hidden">
                {submissions.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        <p>No submissions found</p>
                        <p className="text-sm">Try adjusting your filters</p>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-600">KPI</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-600">Module</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-600">Department</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-600">Submitted By</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-600">Date</th>
                                        <th className="px-4 py-3 text-center font-semibold text-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {submissions.map((sub) => (
                                        <tr key={sub._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                                            <td className="px-4 py-3 font-medium text-gray-800">{sub.kpi}</td>
                                            <td className="px-4 py-3 text-gray-600">
                                                {sub.module.replace(/([A-Z])/g, ' $1').trim()}
                                            </td>
                                            <td className="px-4 py-3 text-gray-600">{sub.department}</td>
                                            <td className="px-4 py-3 text-gray-600">
                                                {sub.submittedBy?.username || 'Unknown'}
                                            </td>
                                            <td className="px-4 py-3 text-gray-600">
                                                {new Date(sub.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-center gap-2">
                                                    {/* View Button */}
                                                    <button
                                                        onClick={() => window.location.href = `/admin/submissions/${sub._id}`}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                        title="View"
                                                    >
                                                        <FiEye className="w-4 h-4" />
                                                    </button>
                                                    {/* Edit Button */}
                                                    <button
                                                        onClick={() => handleEditClick(sub)} // ✅ Passes the correct submission
                                                        className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition"
                                                        title="Edit"
                                                    >
                                                        <FiEdit2 className="w-4 h-4" />
                                                    </button>
                                                    {/* Delete Button */}
                                                    <button
                                                        onClick={() => handleDeleteClick(sub._id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                                        title="Delete"
                                                    >
                                                        <FiTrash2 className="w-4 h-4" />
                                                    </button>
                                                    {/* PDF Button */}
                                                    {sub.pdfPath && (
                                                        <a
                                                            href={sub.pdfPath}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                                                            title="View PDF"
                                                        >
                                                            <FiFile className="w-4 h-4" />
                                                        </a>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* ─── Pagination ──────────────────────────────── */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
                                <span className="text-sm text-gray-500">
                                    Showing {submissions.length} of {total} submissions
                                </span>
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => goToPage(filters.page - 1)}
                                        disabled={filters.page <= 1}
                                        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <FiChevronLeft className="w-4 h-4" />
                                    </button>
                                    <span className="px-3 py-2 text-sm font-medium">
                                        Page {filters.page} of {totalPages}
                                    </span>
                                    <button
                                        onClick={() => goToPage(filters.page + 1)}
                                        disabled={filters.page >= totalPages}
                                        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <FiChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* ─── Edit Modal ────────────────────────────────────────── */}
            {showEditModal && selectedSubmission && (
                <EditSubmissionModal
                    submission={selectedSubmission} // ✅ The clicked submission
                    onClose={() => {
                        setShowEditModal(false);
                        setSelectedSubmission(null);
                    }}
                    onUpdate={fetchSubmissions}
                />
            )}

            {/* ─── Delete Confirmation Modal ──────────────────────────── */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
                        <h3 className="text-lg font-bold text-gray-800">Delete Submission</h3>
                        <p className="text-gray-600 mt-2 text-sm">
                            Are you sure you want to delete this submission? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}