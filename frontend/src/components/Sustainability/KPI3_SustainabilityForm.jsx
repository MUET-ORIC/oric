import React, { useState, useCallback } from "react";
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
    { id: "name", title: "Name, Designation and Department" },
    { id: "title", title: "Title" },
    { id: "nationalInternational", title: "National / International" },
    { id: "agreementDate", title: "Date and Duration of Agreement" },
    { id: "licensee", title: "Licensee Details (Name, Organization)" },
    { id: "royaltyShare", title: "Fee / Royalty Share Percentages" },
    { id: "totalAmount", title: "Total Amount (PKR Millions)" },
    { id: "oricApprovedShare", title: "ORIC Approved Share (PKR Millions)" },
    { id: "oricReceivedShare", title: "ORIC Received Share (PKR Millions)" },
    { id: "remarks", title: "Remarks" },
];

const requiredFields = ["name", "title", "totalAmount"];

export default function KPI3_SustainabilityForm() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [form, setForm] = useState({
        name: "", title: "", nationalInternational: "", agreementDate: "", licensee: "",
        royaltyShare: "", totalAmount: "", oricApprovedShare: "", oricReceivedShare: "", remarks: "", document: null,
    });
    const [loading, setLoading] = useState(false);
    const [showReview, setShowReview] = useState(false);

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
            await submitKpi('SustainabilityCapacityBuilding', 'KPI3', user.department, fields, document);
            dismissToast(loadingToast);
            showSuccess('Submission Successful!', 'KPI 3 has been submitted successfully.');
            setForm({
                name: "", title: "", nationalInternational: "", agreementDate: "", licensee: "",
                royaltyShare: "", totalAmount: "", oricApprovedShare: "", oricReceivedShare: "", remarks: "", document: null,
            });
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
                <Field label="Name, Designation and Department" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Dr. John Doe, Professor, Software Engineering" required />
                <Field label="Title" name="title" value={form.title} onChange={handleChange} placeholder="Title of activity" required />
                <Field label="National / International" name="nationalInternational" value={form.nationalInternational} onChange={handleChange} placeholder="National / International" />
                <Field label="Date and Duration of Agreement" name="agreementDate" value={form.agreementDate} onChange={handleChange} placeholder="e.g. 2024-01-01 to 2024-12-31" />
                <Field label="Licensee Details (Name, Organization)" name="licensee" value={form.licensee} onChange={handleChange} placeholder="Licensee name and organization" />
                <Field label="Fee / Royalty Share Percentages" name="royaltyShare" value={form.royaltyShare} onChange={handleChange} placeholder="e.g. 10%" />
                <Field label="Total Amount (PKR Millions)" name="totalAmount" value={form.totalAmount} onChange={handleChange} placeholder="e.g. 5.0" required />
                <Field label="ORIC Approved Share (PKR Millions)" name="oricApprovedShare" value={form.oricApprovedShare} onChange={handleChange} placeholder="e.g. 0.5" />
                <Field label="ORIC Received Share (PKR Millions)" name="oricReceivedShare" value={form.oricReceivedShare} onChange={handleChange} placeholder="e.g. 0.5" />
                <Field label="Remarks" name="remarks" value={form.remarks} onChange={handleChange} placeholder="Any remarks" />
            </div>

            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <div className="flex flex-col gap-3">
                    <Field
                        label="Annex Page Ref. No. (Audited Statement)"
                        name="document"
                        type="file"
                        accept=".pdf,application/pdf"
                        onChange={handleChange}
                        required
                        maxSize={0.4 * 1024 * 1024}
                    />
                    <div className="flex items-center gap-2">
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
                    <p className="text-xs text-slate-400 mt-1">Only .PDF files accepted (max 0.4 MB).</p>
                </div>
            </div>

            <button onClick={goToReview} disabled={loading} className="w-full py-4 bg-blue-900 text-white rounded-2xl font-semibold hover:bg-blue-800 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-3 group disabled:opacity-70">
                {loading ? <><FiLoader className="w-5 h-5 animate-spin" /> Processing...</> : <><FiSend className="w-5 h-5 group-hover:translate-x-1 transition-transform" /> Review & Submit</>}
            </button>
        </div>
    );
}