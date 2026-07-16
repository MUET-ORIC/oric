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
            console.log('📄 Modal received submission:', {
                id: submission._id,
                kpi: submission.kpi,
                fields: submission.fields
            });
            setFields(submission.fields || {});
        }
    }, [submission]);

    const handleSave = async () => {
        setLoading(true);
        try {
            await updateSubmission(submission._id, { fields });
            toast.success('Updated successfully');
            onUpdate();
            onClose();
        } catch (err) {
            console.error('Update error:', err);
            toast.error('Update failed');
        } finally {
            setLoading(false);
        }
    };

    if (!submission) return null;

    const fieldKeys = Object.keys(fields);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Edit Submission</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                        <FiX className="w-5 h-5" />
                    </button>
                </div>

                {/* ✅ Show which submission is being edited */}
                <div className="text-sm text-gray-500 mb-4">
                    Editing: <span className="font-medium text-gray-700">{submission.kpi}</span>
                    {' • '}
                    ID: <span className="font-mono text-xs">{submission._id}</span>
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

                <div className="flex gap-2 mt-4">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="px-4 py-2 bg-blue-900 text-white rounded-xl hover:bg-blue-800 transition disabled:opacity-50 flex items-center gap-2"
                    >
                        <FiSave className="inline" />
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded-xl hover:bg-gray-50 transition"
                    >
                        <FiX className="inline mr-2" /> Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}