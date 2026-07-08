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
    { id: "linkageType", title: "Type of Linkage" },
    { id: "mouDate", title: "Date of MoU/Agreement" },
    { id: "nationalInternational", title: "National or International" },
    { id: "hostInstitution", title: "Host Institution (Name & Address)" },
    { id: "collaboratingAgency", title: "Collaborating Agency/Institution" },
    { id: "fieldOfStudy", title: "Field of Study / Research Broader Areas" },
    { id: "scope", title: "Scope of Collaboration" },
    { id: "salientFeatures", title: "Salient Features of Linkage" },
];

const requiredFields = ["linkageType", "mouDate", "hostInstitution"];

export default function KPI12ResearchGrantForm() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [form, setForm] = useState({
        linkageType: "", mouDate: "", nationalInternational: "", hostInstitution: "",
        collaboratingAgency: "", fieldOfStudy: "", scope: "", salientFeatures: "", document: null,
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
            await submitKpi('ResearchExcellence', 'KPI12', user.department, fields, document);
            dismissToast(loadingToast);
            showSuccess('Submission Successful!', 'KPI 12 has been submitted successfully.');
            setForm({
                linkageType: "", mouDate: "", nationalInternational: "", hostInstitution: "",
                collaboratingAgency: "", fieldOfStudy: "", scope: "", salientFeatures: "", document: null,
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
                <Field label="Type of Linkage (Academic/Research)" name="linkageType" value={form.linkageType} onChange={handleChange} placeholder="e.g. Academic" required />
                <Field label="Date of MoU/Agreement" name="mouDate" type="date" value={form.mouDate} onChange={handleChange} required />
                <Field label="National or International" name="nationalInternational" value={form.nationalInternational} onChange={handleChange} />
                <Field label="Host Institution (Name & Address)" name="hostInstitution" value={form.hostInstitution} onChange={handleChange} placeholder="e.g. NUST, Islamabad" required />
                <Field label="Collaborating Agency/Institution" name="collaboratingAgency" value={form.collaboratingAgency} onChange={handleChange} />
                <Field label="Field of Study / Research Broader Areas" name="fieldOfStudy" value={form.fieldOfStudy} onChange={handleChange} />
                <Field label="Scope of Collaboration" name="scope" value={form.scope} onChange={handleChange} />
                <Field label="Salient Features of Linkage" name="salientFeatures" value={form.salientFeatures} onChange={handleChange} />
            </div>

            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <div className="flex flex-col gap-3">
                    <Field
                        label="Annex Page Ref. (MoU Copy)"
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