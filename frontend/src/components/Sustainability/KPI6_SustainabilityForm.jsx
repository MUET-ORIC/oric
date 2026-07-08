import React, { useState, useCallback, useRef } from "react";
import { submitKpi } from "../../api/submissions";
import Field from "../common/Field";
import { departments } from "../../utils/constants";
import ReviewStep from "../common/ReviewStep";
import {
    showSuccess,
    showError,
    showWarning,
    showLoading,
    dismissToast,
} from "../../utils/toast";
import { FiSend, FiLoader } from "react-icons/fi";

const headers = [
    { id: "eventType", title: "Type of Event" },
    { id: "eventDate", title: "Date of Event" },
    { id: "participants", title: "No. of Participants" },
    { id: "focusArea", title: "Major Focus Area & Outcomes" },
    { id: "audienceType", title: "Audience Type (student/faculty/researchers)" },
    { id: "remarks", title: "Remarks" },
];

const requiredFields = ["eventType", "eventDate"];

export default function KPI6_SustainabilityForm() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [form, setForm] = useState({
        eventType: "", eventDate: "", participants: "", focusArea: "", audienceType: "", remarks: "", document: null,
    });
    const [loading, setLoading] = useState(false);
    const [showReview, setShowReview] = useState(false);
    const fileInputRef = useRef(null);

    const handleChange = useCallback((e) => {
        const { name, type, value, files } = e.target;
        if (type === "file") {
            const file = files && files[0];
            if (file && file.type !== "application/pdf") {
                showWarning('Invalid File', 'Please select a PDF document only.');
                e.target.value = "";
                return;
            }
            setForm((prev) => ({ ...prev, [name]: file || null }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    }, []);

    const validate = () => {
        for (let field of requiredFields) {
            if (!form[field]) {
                showWarning('Required Field', `${headers.find(h => h.id === field)?.title || field} is required.`);
                return false;
            }
        }
        if (!form.document) {
            showWarning('PDF Required', 'Please upload a PDF evidence file.');
            return false;
        }
        return true;
    };

    const submit = async () => {
        const loadingToast = showLoading('Submitting...', 'Please wait while your data is being saved.');
        try {
            const { document, department, ...fields } = form;
            await submitKpi('SustainabilityCapacityBuilding', 'KPI6', user.department, fields, document);
            dismissToast(loadingToast);
            showSuccess('Submission Successful!', 'KPI 6 has been submitted successfully.');
            setForm({
                eventType: "", eventDate: "", participants: "", focusArea: "", audienceType: "", remarks: "", document: null,
            });
            if (fileInputRef.current) fileInputRef.current.value = "";
            setShowReview(false);
        } catch (err) {
            dismissToast(loadingToast);
            showError('Submission Failed', err.response?.data?.message || 'Something went wrong. Please try again.');
        }
    };

    const goToReview = (e) => { e.preventDefault(); if (validate()) setShowReview(true); };
    const fileName = form.document ? form.document.name : "No file selected";

    if (showReview) {
        return <ReviewStep formData={form} pdfFile={form.document} headers={headers} onBack={() => setShowReview(false)} onSubmit={submit} submitting={loading} />;
    }

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Type of Event" name="eventType" value={form.eventType} onChange={handleChange} placeholder="e.g. Exhibition, Fair" required />
                <Field label="Date of Event" name="eventDate" type="date" value={form.eventDate} onChange={handleChange} required />
                <Field label="No. of Participants" name="participants" value={form.participants} onChange={handleChange} placeholder="e.g. 100" />
                <Field label="Major Focus Area & Outcomes" name="focusArea" value={form.focusArea} onChange={handleChange} placeholder="Key focus areas" />
                <Field label="Audience Type" name="audienceType" value={form.audienceType} onChange={handleChange} placeholder="student/faculty/researchers" />
                <Field label="Remarks" name="remarks" value={form.remarks} onChange={handleChange} placeholder="Any remarks" />
            </div>

            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                        Annex Page Ref. No. <span className="text-red-500 text-base">*</span>
                    </label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <input ref={fileInputRef} type="file" name="document" accept=".pdf,application/pdf" onChange={handleChange} className="w-full sm:w-auto px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:text-sm file:font-medium hover:file:bg-blue-100" required />
                        <span className="text-sm text-slate-500 truncate max-w-xs">
                            {fileName !== "No file selected" ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    {fileName}
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-slate-300 rounded-full" />
                                    No PDF selected
                                </span>
                            )}
                        </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Only .PDF files accepted (max 5MB).</p>
                </div>
            </div>

            <button onClick={goToReview} disabled={loading} className="w-full py-4 bg-blue-900 text-white rounded-2xl font-semibold hover:bg-blue-800 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-3 group disabled:opacity-70">
                {loading ? <><FiLoader className="w-5 h-5 animate-spin" /> Processing...</> : <><FiSend className="w-5 h-5 group-hover:translate-x-1 transition-transform" /> Review & Submit</>}
            </button>
        </div>
    );
}