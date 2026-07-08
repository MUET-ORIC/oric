import React, { useState, useEffect } from 'react';
import { updateSubmission } from '../../api/admin';
import { FiSave, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function EditSubmissionModal({ submission, onClose, onUpdate }) {
    const [fields, setFields] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => { if (submission) setFields(submission.fields || {}); }, [submission]);

    const handleSave = async () => {
        setLoading(true);
        try {
            await updateSubmission(submission._id, { fields });
            toast.success('Updated');
            onUpdate();
            onClose();
        } catch { toast.error('Update failed'); } finally { setLoading(false); }
    };

    if (!submission) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Edit Submission</h2>
                {Object.keys(fields).map(key => (
                    <div key={key} className="mb-2"><label className="block text-sm font-medium">{key}</label><input type="text" value={fields[key] || ''} onChange={(e) => setFields({ ...fields, [key]: e.target.value })} className="w-full p-2 border rounded" /></div>
                ))}
                <div className="flex gap-2 mt-4">
                    <button onClick={handleSave} disabled={loading} className="px-4 py-2 bg-blue-900 text-white rounded-xl"><FiSave className="inline mr-2" />{loading ? 'Saving...' : 'Save'}</button>
                    <button onClick={onClose} className="px-4 py-2 border rounded-xl"><FiX className="inline mr-2" />Cancel</button>
                </div>
            </div>
        </div>
    );
}