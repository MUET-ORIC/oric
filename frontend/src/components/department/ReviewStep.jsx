import React, { useState } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';

export default function ReviewStep({ formData, pdfFile, headers, onBack, onSubmit, submitting }) {
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleConfirm = () => {
        setShowConfirmModal(true);
    };

    const handleProceed = () => {
        setShowConfirmModal(false);
        onSubmit(); // triggers the actual submission
    };

    return (
        <>
            <div className="bg-white p-6 rounded-2xl shadow border border-gray-100 space-y-4">
                <h2 className="text-xl font-bold text-blue-900">Review Your Submission</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {headers.map((h) => (
                        <div key={h.id} className="border-b pb-2">
                            <span className="text-sm text-gray-500">{h.title}</span>
                            <p className="font-medium text-gray-800">{formData[h.id] || '-'}</p>
                        </div>
                    ))}
                    <div className="border-b pb-2">
                        <span className="text-sm text-gray-500">Evidence PDF</span>
                        <p className="font-medium text-gray-800">{pdfFile ? pdfFile.name : 'No file'}</p>
                    </div>
                </div>
                <div className="flex gap-3 pt-4 border-t">
                    <button
                        onClick={onBack}
                        className="px-6 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
                    >
                        Back
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={submitting}
                        className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition disabled:opacity-50"
                    >
                        {submitting ? 'Submitting...' : 'Confirm Submit'}
                    </button>
                </div>
            </div>

            {/* ─── Confirmation Modal ────────────────────────── */}
            {showConfirmModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
                        <h3 className="text-lg font-bold text-gray-800">Confirm Submission</h3>
                        <p className="text-gray-600 mt-2 text-sm">
                            Are you sure you want to submit this KPI? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition flex items-center gap-2"
                            >
                                <FiX className="w-4 h-4" />
                                Cancel
                            </button>
                            <button
                                onClick={handleProceed}
                                className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition flex items-center gap-2"
                            >
                                <FiCheck className="w-4 h-4" />
                                Yes, Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}