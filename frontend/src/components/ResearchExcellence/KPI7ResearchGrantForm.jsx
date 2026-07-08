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
    { id: "grantName", title: "Name of Research Grant and Funding Body" },
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

export default function KPI7ResearchGrantForm() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [form, setForm] = useState({
        grantName: "", completionDate: "", piName: "", designation: "", department: user.department || "",
        thematic: "", title: "", startDate: "", endDate: "", status: "", fundingUtilized: "",
        fundingReleased: "", deliverables: "", outcomes: "", document: null,
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
        const loadingToast = showLoading('Submitting...', 'Please wait...');
        try {
            const { document, department, ...fields } = form;
            await submitKpi('ResearchExcellence', 'KPI7', user.department || department, fields, document);
            dismissToast(loadingToast);
            showSuccess('Submission Successful!', 'KPI 7 has been submitted successfully.');
            setForm({
                grantName: "", completionDate: "", piName: "", designation: "", department: user.department || "",
                thematic: "", title: "", startDate: "", endDate: "", status: "", fundingUtilized: "",
                fundingReleased: "", deliverables: "", outcomes: "", document: null,
            });
            setShowReview(false);
        } catch (err) {
            dismissToast(loadingToast);
            showError('Submission Failed', err.response?.data?.message || 'Something went wrong.');
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
                <Field label="Name of Research Grant and Funding Body" name="grantName" value={form.grantName} onChange={handleChange} placeholder="e.g. NRPU-2024" required />
                <Field label="Date of Project Completion" name="completionDate" type="date" value={form.completionDate} onChange={handleChange} required />
                <Field label="Name of PI" name="piName" value={form.piName} onChange={handleChange} placeholder="Dr. John Doe" required />
                <Field label="Designation of PI" name="designation" value={form.designation} onChange={handleChange} />
                <Field label="Department of PI" name="department" type="select" value={form.department} onChange={handleChange} options={departments} required disabled />
                <Field label="Thematic Area" name="thematic" value={form.thematic} onChange={handleChange} placeholder="e.g. AI" required />
                <Field label="Title of Research Proposal" name="title" value={form.title} onChange={handleChange} placeholder="Enter title" required />
                <Field label="Duration (Starting Date)" name="startDate" type="date" value={form.startDate} onChange={handleChange} />
                <Field label="Duration (Ending Date)" name="endDate" type="date" value={form.endDate} onChange={handleChange} />
                <Field label="Status of Project" name="status" value={form.status} onChange={handleChange} />
                <Field label="Total Funding Utilized (Rs.)" name="fundingUtilized" value={form.fundingUtilized} onChange={handleChange} placeholder="e.g. 1,500,000" required />
                <Field label="Total Funding Released (PKR Million)" name="fundingReleased" value={form.fundingReleased} onChange={handleChange} />
                <Field label="Key Project Deliverables" name="deliverables" value={form.deliverables} onChange={handleChange} />
                <Field label="Key Project Outcomes" name="outcomes" value={form.outcomes} onChange={handleChange} />
            </div>

            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <div className="flex flex-col gap-3">
                    <Field
                        label="Annex Page Ref. (Completion Letter Copy)"
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