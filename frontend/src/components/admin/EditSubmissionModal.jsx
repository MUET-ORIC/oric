import React, { useState, useEffect } from 'react';
import { updateSubmission } from '../../api/admin';
import { FiSave, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function EditSubmissionModal({ submission, onClose, onUpdate }) {
    const [fields, setFields] = useState({});
    const [loading, setLoading] = useState(false);

    // ✅ Reset fields when submission changes
    useEffect(() => {
        if (submission) {
            console.log('📄 Modal received submission:', submission._id, submission.kpi); // Debug log
            setFields(submission.fields || {});
        }
    }, [submission]);  // ✅ Dependency ensures update on change

    const handleSave = async () => {
        setLoading(true);
        try {
            await updateSubmission(submission._id, { fields });
            toast.success('Updated successfully');
            onUpdate();
            onClose();
        } catch {
            toast.error('Failed to update');
        } finally {
            setLoading(false);
        }
    };

    if (!submission) return null;

    const fieldKeys = Object.keys(fields);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800">
                        Edit Submission: {submission.kpi}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
                    >
                        <FiX className="w-5 h-5" />
                    </button>
                </div>

                <div className="text-sm text-gray-500 mb-4">
                    <span className="font-medium">ID:</span> {submission._id} •
                    <span className="ml-2 font-medium">Department:</span> {submission.department}
                </div>

                <div className="space-y-3">
                    {fieldKeys.length === 0 ? (
                        <p className="text-gray-500 text-sm">No fields to edit</p>
                    ) : (
                        fieldKeys.map((key) => (
                            <div key={key}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                </label>
                                <input
                                    type="text"
                                    value={fields[key] || ''}
                                    onChange={(e) =>
                                        setFields({ ...fields, [key]: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent transition"
                                />
                            </div>
                        ))
                    )}
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-xl hover:bg-blue-800 transition disabled:opacity-50"
                    >
                        <FiSave className="w-4 h-4" />
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                        onClick={onClose}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
                    >
                        <FiX className="w-4 h-4" /> Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}