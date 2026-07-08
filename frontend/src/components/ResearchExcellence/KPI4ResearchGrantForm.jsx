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
    { id: "grantName", title: "Name of Research Grant" },
    { id: "completionDate", title: "Date of Project Completion" },
    { id: "piName", title: "Name of PI with Designation and Department" },
    { id: "designation", title: "Designation of PI" },
    { id: "department", title: "Department of PI" },
    { id: "thematic", title: "Thematic Area" },
    { id: "title", title: "Title of Research Proposal" },
    { id: "startDate", title: "Duration (Starting Date)" },
    { id: "endDate", title: "Duration (Ending Date)" },
    { id: "status", title: "Status of Project" },
    { id: "fundingUtilized", title: "Total Funding Utilized (Rs.)" },
    { id: "fundingReleased", title: "Total Funding Released (PKR Million)" },
    { id: "deliverables", title: "Key Project Deliverables" },
    { id: "outcomes", title: "Key Project Outcomes" },
];

const requiredFields = ["grantName", "completionDate", "piName", "department", "thematic", "title", "fundingUtilized"];

export default function KPI4ResearchGrantForm() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [form, setForm] = useState({
        grantName: "", completionDate: "", piName: "", designation: "", department: user.department || "",
        thematic: "", title: "", startDate: "", endDate: "", status: "", fundingUtilized: "",
        fundingReleased: "", deliverables: "", outcomes: "", document: null,
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
            await submitKpi('ResearchExcellence', 'KPI4', user.department || department, fields, document);
            dismissToast(loadingToast);
            showSuccess('Submission Successful!', 'KPI 4 has been submitted successfully.');
            setForm({
                grantName: "", completionDate: "", piName: "", designation: "", department: user.department || "",
                thematic: "", title: "", startDate: "", endDate: "", status: "", fundingUtilized: "",
                fundingReleased: "", deliverables: "", outcomes: "", document: null,
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
                <Field label="Name of Research Grant" name="grantName" value={form.grantName} onChange={handleChange} placeholder="e.g. NRPU-2024" required />
                <Field label="Date of Project Completion" name="completionDate" type="date" value={form.completionDate} onChange={handleChange} required />
                <Field label="Name of PI" name="piName" value={form.piName} onChange={handleChange} placeholder="Dr. John Doe" required />
                <Field label="Designation of PI" name="designation" value={form.designation} onChange={handleChange} placeholder="Professor / Associate Professor" />
                <Field label="Department of PI" name="department" type="select" value={form.department} onChange={handleChange} options={departments} required disabled />
                <Field label="Thematic Area" name="thematic" value={form.thematic} onChange={handleChange} placeholder="e.g. AI, Renewable Energy" required />
                <Field label="Title of Research Proposal" name="title" value={form.title} onChange={handleChange} placeholder="Enter full proposal title" required />
                <Field label="Duration (Starting Date)" name="startDate" type="date" value={form.startDate} onChange={handleChange} />
                <Field label="Duration (Ending Date)" name="endDate" type="date" value={form.endDate} onChange={handleChange} />
                <Field label="Status of Project" name="status" value={form.status} onChange={handleChange} placeholder="e.g. Completed, In Process" />
                <Field label="Total Funding Utilized (Rs.)" name="fundingUtilized" value={form.fundingUtilized} onChange={handleChange} placeholder="e.g. 1,500,000" required />
                <Field label="Total Funding Released (PKR Million)" name="fundingReleased" value={form.fundingReleased} onChange={handleChange} placeholder="e.g. 2.5" />
                <Field label="Key Project Deliverables" name="deliverables" value={form.deliverables} onChange={handleChange} placeholder="e.g. Report, Prototype" />
                <Field label="Key Project Outcomes" name="outcomes" value={form.outcomes} onChange={handleChange} placeholder="e.g. Published paper, Patent filed" />
            </div>

            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                        Annex Page Ref. No. (Completion Letter Copy)
                        <span className="text-red-500 text-base">*</span>
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