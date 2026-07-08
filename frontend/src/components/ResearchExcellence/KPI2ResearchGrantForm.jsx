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
    { id: "grantName", title: "Name of Research Grant" },
    { id: "approvalDate", title: "Date of Proposal Approval" },
    { id: "piName", title: "Name of PI with Designation and Department" },
    { id: "designation", title: "Designation of PI" },
    { id: "department", title: "Department of PI" },
    { id: "thematic", title: "Thematic Area" },
    { id: "title", title: "Title of Research Proposal" },
    { id: "startDate", title: "Duration (Starting Date)" },
    { id: "endDate", title: "Duration (Ending Date)" },
    { id: "fundingApproved", title: "Total Funding Approved (PKR Million)" },
    { id: "collaborators", title: "Collaborating Partner(s) Details" },
    { id: "coFunding", title: "Co Funding Partner(s) Details" },
    { id: "oricOverhead", title: "ORIC Overhead in Approved Funding" },
    { id: "dateOfApproval", title: "Date of Approval" },
    { id: "status", title: "Status" },
    { id: "remarks", title: "Remarks / Any other information" },
];

const requiredFields = ["grantName", "approvalDate", "piName", "department", "thematic", "title", "fundingApproved"];

export default function KPI2ResearchGrantForm() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [form, setForm] = useState({
        grantName: "", approvalDate: "", piName: "", designation: "", department: user.department || "",
        thematic: "", title: "", startDate: "", endDate: "", fundingApproved: "", collaborators: "",
        coFunding: "", oricOverhead: "", dateOfApproval: "", status: "", remarks: "", document: null,
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
            await submitKpi('ResearchExcellence', 'KPI2', user.department || department, fields, document);
            dismissToast(loadingToast);
            showSuccess('Submission Successful!', 'KPI 2 has been submitted successfully.');
            setForm({
                grantName: "", approvalDate: "", piName: "", designation: "", department: user.department || "",
                thematic: "", title: "", startDate: "", endDate: "", fundingApproved: "", collaborators: "",
                coFunding: "", oricOverhead: "", dateOfApproval: "", status: "", remarks: "", document: null,
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
                <Field label="Name of Research Grant" name="grantName" value={form.grantName} onChange={handleChange} placeholder="e.g. NRPU-2024" required />
                <Field label="Date of Proposal Approval" name="approvalDate" type="date" value={form.approvalDate} onChange={handleChange} required />
                <Field label="Name of PI" name="piName" value={form.piName} onChange={handleChange} placeholder="Dr. John Doe" required />
                <Field label="Designation of PI" name="designation" value={form.designation} onChange={handleChange} placeholder="Professor" />
                <Field label="Department of PI" name="department" type="select" value={form.department} onChange={handleChange} options={departments} required disabled />
                <Field label="Thematic Area" name="thematic" value={form.thematic} onChange={handleChange} placeholder="e.g. AI" required />
                <Field label="Title of Research Proposal" name="title" value={form.title} onChange={handleChange} placeholder="Enter title" required />
                <Field label="Duration (Starting Date)" name="startDate" type="date" value={form.startDate} onChange={handleChange} />
                <Field label="Duration (Ending Date)" name="endDate" type="date" value={form.endDate} onChange={handleChange} />
                <Field label="Total Funding Approved (PKR Million)" name="fundingApproved" value={form.fundingApproved} onChange={handleChange} placeholder="e.g. 2.0" required />
                <Field label="Collaborating Partner(s) Details" name="collaborators" value={form.collaborators} onChange={handleChange} />
                <Field label="Co Funding Partner(s) Details" name="coFunding" value={form.coFunding} onChange={handleChange} />
                <Field label="ORIC Overhead in Approved Funding" name="oricOverhead" value={form.oricOverhead} onChange={handleChange} />
                <Field label="Date of Approval" name="dateOfApproval" type="date" value={form.dateOfApproval} onChange={handleChange} />
                <Field label="Status" name="status" value={form.status} onChange={handleChange} />
            </div>

            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <div className="flex flex-col gap-3">
                    <Field
                        label="Annex Page Ref. No. (Award Letter Copy)"
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

            <div className="grid grid-cols-1">
                <Field label="Remarks / Any other information" name="remarks" type="textarea" value={form.remarks} onChange={handleChange} placeholder="Any additional information..." />
            </div>

            <button onClick={goToReview} disabled={loading} className="w-full py-4 bg-blue-900 text-white rounded-2xl font-semibold hover:bg-blue-800 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-3 group disabled:opacity-70">
                {loading ? <><FiLoader className="w-5 h-5 animate-spin" /> Processing...</> : <><FiSend className="w-5 h-5 group-hover:translate-x-1 transition-transform" /> Review & Submit</>}
            </button>
        </div>
    );
}