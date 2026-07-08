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
    { id: "thematicTitle", title: "Thematic Areas and Title of Research Proposal" },
    { id: "contractDate", title: "Date of Contract Signed" },
    { id: "piName", title: "Name of PI with Designation, Department" },
    { id: "coPiName", title: "Name of Co-PI with Designation, Department & University" },
    { id: "sponsoringAgency", title: "Sponsoring Agency Name and Address & Country" },
    { id: "nationalInternational", title: "National / International" },
    { id: "industryCounterpart", title: "Counterpart from Industry (address with country)" },
    { id: "startDate", title: "Duration (Starting Date)" },
    { id: "endDate", title: "Duration (Ending Date)" },
    { id: "fundingApproved", title: "Total Amount Approved (PKR Millions)" },
    { id: "deliverables", title: "Project Expected Deliverables and Outcomes" },
    { id: "contractDateSigned", title: "Date of Contract" },
];

const requiredFields = ["thematicTitle", "contractDate", "piName", "fundingApproved"];

export default function KPI14ResearchGrantForm() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [form, setForm] = useState({
        thematicTitle: "", contractDate: "", piName: "", coPiName: "", sponsoringAgency: "",
        nationalInternational: "", industryCounterpart: "", startDate: "", endDate: "",
        fundingApproved: "", deliverables: "", contractDateSigned: "", document: null,
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
            await submitKpi('ResearchExcellence', 'KPI14', user.department, fields, document);
            dismissToast(loadingToast);
            showSuccess('Submission Successful!', 'KPI 14 has been submitted successfully.');
            setForm({
                thematicTitle: "", contractDate: "", piName: "", coPiName: "", sponsoringAgency: "",
                nationalInternational: "", industryCounterpart: "", startDate: "", endDate: "",
                fundingApproved: "", deliverables: "", contractDateSigned: "", document: null,
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
                <Field label="Thematic Areas & Title of Research Proposal" name="thematicTitle" value={form.thematicTitle} onChange={handleChange} placeholder="e.g. AI, Renewable Energy" required />
                <Field label="Date of Contract Signed" name="contractDate" type="date" value={form.contractDate} onChange={handleChange} required />
                <Field label="Name of PI (with Designation, Department)" name="piName" value={form.piName} onChange={handleChange} placeholder="Dr. John Doe" required />
                <Field label="Name of Co-PI (if any)" name="coPiName" value={form.coPiName} onChange={handleChange} placeholder="Dr. Jane Smith" />
                <Field label="Sponsoring Agency (Name, Address, Country)" name="sponsoringAgency" value={form.sponsoringAgency} onChange={handleChange} placeholder="e.g. HEC, Islamabad, Pakistan" />
                <Field label="National / International" name="nationalInternational" value={form.nationalInternational} onChange={handleChange} placeholder="National / International" />
                <Field label="Industry Counterpart (address with country)" name="industryCounterpart" value={form.industryCounterpart} onChange={handleChange} placeholder="e.g. Industry X, Lahore" />
                <Field label="Start Date" name="startDate" type="date" value={form.startDate} onChange={handleChange} />
                <Field label="End Date" name="endDate" type="date" value={form.endDate} onChange={handleChange} />
                <Field label="Total Amount Approved (PKR Millions)" name="fundingApproved" value={form.fundingApproved} onChange={handleChange} placeholder="e.g. 2.5" required />
                <Field label="Project Expected Deliverables & Outcomes" name="deliverables" value={form.deliverables} onChange={handleChange} placeholder="List expected deliverables" />
                <Field label="Date of Contract" name="contractDateSigned" type="date" value={form.contractDateSigned} onChange={handleChange} />
            </div>

            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                        Annex Page Ref. (Contract Research Agreement Copy)
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