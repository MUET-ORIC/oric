import React from 'react';
import { FiCheck, FiX, FiFile } from 'react-icons/fi';

export default function ReviewStep({ formData, pdfFile, headers, onBack, onSubmit, submitting }) {
    return (
        <div className="w-full max-w-full overflow-x-hidden">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 animate-fadeIn">
                {/* ─── Header ──────────────────────────────────────── */}
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3 sm:pb-4">
                    <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600 flex-shrink-0">
                        <FiCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <h2 className="text-lg sm:text-xl font-bold text-slate-800 truncate">
                            Review Submission
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 truncate">
                            Please verify all details before submitting.
                        </p>
                    </div>
                </div>

                {/* ─── Fields Grid ───────────────────────────────────── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {headers.map((h) => {
                        if (h.id === 'sr' || h.id === 'document') return null;
                        const value = formData[h.id] || 'NIL';
                        return (
                            <div
                                key={h.id}
                                className="bg-slate-50 rounded-xl p-3 border border-slate-100 min-w-0 overflow-hidden"
                            >
                                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block truncate">
                                    {h.title}
                                </span>
                                <p className="text-sm font-semibold text-slate-800 mt-1 break-words">
                                    {value}
                                </p>
                            </div>
                        );
                    })}
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 min-w-0 overflow-hidden">
                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block truncate">
                            Evidence PDF
                        </span>
                        <p className="text-sm font-semibold text-slate-800 mt-1 flex items-center gap-2 break-words">
                            <FiFile className="w-4 h-4 text-red-500 flex-shrink-0" />
                            <span className="break-all">{pdfFile ? pdfFile.name : 'NIL'}</span>
                        </p>
                    </div>
                </div>

                {/* ─── Buttons ───────────────────────────────────────── */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
                    <button
                        onClick={onBack}
                        className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 border border-slate-300 rounded-xl hover:bg-slate-50 transition-all duration-200 text-sm sm:text-base w-full sm:w-auto"
                    >
                        <FiX className="w-4 h-4" />
                        Back to Form
                    </button>
                    <button
                        onClick={onSubmit}
                        disabled={submitting}
                        className="flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 text-sm sm:text-base w-full sm:w-auto"
                    >
                        <FiCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                        {submitting ? 'Submitting...' : 'Confirm Submit'}
                    </button>
                </div>
            </div>
        </div>
    );
}