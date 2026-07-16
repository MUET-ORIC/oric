import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSubmissionById, updateSubmission, deleteSubmission } from '../../api/admin';
import { FiArrowLeft, FiSave, FiX, FiTrash2, FiEdit2, FiFile, FiDownload } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function SubmissionDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [submission, setSubmission] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [editedFields, setEditedFields] = useState({});
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => { fetchSubmission(); }, [id]);

    const fetchSubmission = async () => {
        try {
            const res = await getSubmissionById(id);
            const sub = res.data.submission;
            if (!sub) {
                toast.error('Submission not found');
                navigate('/admin/submissions');
                return;
            }
            setSubmission(sub);
            setEditedFields(sub.fields || {});
        } catch {
            toast.error('Failed to load submission');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await deleteSubmission(id);
            toast.success('Deleted');
            navigate('/admin/submissions');
        } catch {
            toast.error('Failed to delete');
        } finally {
            setDeleting(false);
            setShowDeleteModal(false);
        }
    };

    const handleUpdate = async () => {
        setSaving(true);
        try {
            await updateSubmission(id, { fields: editedFields });
            toast.success('Updated');
            setEditing(false);
            fetchSubmission();
        } catch {
            toast.error('Failed to update');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="inline-block w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
                <span className="ml-3 text-gray-500">Loading...</span>
            </div>
        );
    }

    if (!submission) {
        return (
            <div className="text-center py-12">
                <p className="text-red-500">Not found</p>
                <button onClick={() => navigate('/admin/submissions')} className="mt-4 text-blue-600 hover:underline">
                    Back
                </button>
            </div>
        );
    }

    const fieldKeys = Object.keys(submission.fields || {});

    return (
        <div className="max-w-4xl mx-auto">
            {/* ─── Header ──────────────────────────────────────────────── */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 text-gray-500 hover:text-blue-900 hover:bg-blue-50 rounded-xl transition"
                    >
                        <FiArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-blue-900">
                            {submission.module.replace(/([A-Z])/g, ' $1').trim()} – {submission.kpi}
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Submitted by {submission.submittedBy?.username || 'Unknown'} •{' '}
                            {new Date(submission.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    {!editing ? (
                        <>
                            <button
                                onClick={() => setEditing(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                            >
                                <FiEdit2 className="w-4 h-4" /> Edit
                            </button>
                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
                            >
                                <FiTrash2 className="w-4 h-4" /> Delete
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => setEditing(false)}
                                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
                            >
                                <FiX className="w-4 h-4" /> Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                disabled={saving}
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition disabled:opacity-50"
                            >
                                <FiSave className="w-4 h-4" /> {saving ? 'Saving...' : 'Save'}
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* ─── PDF ──────────────────────────────────────────────────── */}
            {submission.pdfPath && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <FiFile className="w-5 h-5 text-blue-600" />
                        <span className="text-sm text-gray-700 truncate max-w-[200px] sm:max-w-sm">
                            {submission.pdfFilename || 'PDF file'}
                        </span>
                    </div>
                    <a
                        href={submission.pdfPath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                    >
                        <FiDownload className="w-4 h-4" /> View PDF
                    </a>
                </div>
            )}

            {/* ─── Metadata ────────────────────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Department</p>
                    <p className="font-medium text-gray-800">{submission.department}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Submitted By</p>
                    <p className="font-medium text-gray-800">{submission.submittedBy?.username || 'Unknown'}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Submitted On</p>
                    <p className="font-medium text-gray-800">
                        {new Date(submission.createdAt).toLocaleDateString(undefined, {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </p>
                </div>
            </div>

            {/* ─── Fields ────────────────────────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="font-semibold text-gray-800">Form Fields</h2>
                </div>
                <div className="p-6">
                    {fieldKeys.length === 0 ? (
                        <p className="text-gray-500 text-sm">No fields found</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {fieldKeys.map((key) => (
                                <div key={key} className="border-b border-gray-50 pb-3">
                                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                    </label>
                                    {editing ? (
                                        <input
                                            type="text"
                                            value={editedFields[key] || ''}
                                            onChange={(e) =>
                                                setEditedFields({ ...editedFields, [key]: e.target.value })
                                            }
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent transition"
                                        />
                                    ) : (
                                        <p className="text-gray-800 text-sm">{submission.fields[key] || '-'}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* ─── Delete Modal ──────────────────────────────────────────── */}
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
                                className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition flex items-center gap-2"
                            >
                                <FiX className="w-4 h-4" /> Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={deleting}
                                className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition flex items-center gap-2"
                            >
                                <FiTrash2 className="w-4 h-4" /> {deleting ? 'Deleting...' : 'Yes, Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}