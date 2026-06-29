// KPI12ResearchGrantForm.jsx
import React, { useState, useCallback, useRef } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Field from "../common/Field";
import { departments } from "../common/departments";

export default function KPI12ResearchGrantForm() {
    const [form, setForm] = useState({
        linkageType: "",
        mouDate: "",
        nationalInternational: "",
        hostInstitution: "",
        collaboratingAgency: "",
        fieldOfStudy: "",
        scope: "",
        salientFeatures: "",
        document: null,
    });
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const handleChange = useCallback((e) => {
        const { name, type, value, files } = e.target;
        if (type === "file") {
            const file = files && files[0];
            if (file && file.type !== "application/pdf") {
                toast.error("⚠️ Please select a PDF document only.");
                e.target.value = "";
                return;
            }
            setForm((prev) => ({ ...prev, [name]: file || null }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    }, []);

    const submit = async () => {
        // ── Validate ALL required fields ──
        if (!form.linkageType || !form.mouDate || !form.hostInstitution) {
            toast.error("⚠️ Please fill in Linkage Type, MoU Date, and Host Institution.");
            return;
        }

        setLoading(true);
        try {
            const payload = new FormData();
            Object.keys(form).forEach((key) => {
                if (key === "document") {
                    if (form.document) payload.append("documentFile", form.document);
                } else {
                    payload.append(key, form[key] || "NIL");
                }
            });

            // ── CORRECT endpoint ──
            const res = await axios.post("http://localhost:5000/submit/research/kpi12", payload, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (res.data.success) {
                toast.success("✅ KPI 12 submitted successfully!");
                setForm({
                    linkageType: "",
                    mouDate: "",
                    nationalInternational: "",
                    hostInstitution: "",
                    collaboratingAgency: "",
                    fieldOfStudy: "",
                    scope: "",
                    salientFeatures: "",
                    document: null,
                });
                if (fileInputRef.current) fileInputRef.current.value = "";
            } else {
                toast.error("❌ Submission failed.");
            }
        } catch (err) {
            console.error(err);
            if (err.response?.status === 409) {
                toast.error("⚠️ The CSV file is currently open in another program. Please close it and try again.");
            } else {
                toast.error(err.response?.data?.message || "Server error.");
            }
        } finally {
            setLoading(false);
        }
    };

    const fileName = form.document ? form.document.name : "No file selected";

    return (
        <div className="bg-white rounded-2xl shadow-md border border-blue-100 overflow-hidden">
            <Toaster position="top-right" />
            <div className="bg-gradient-to-r from-blue-900 to-blue-600 text-white px-6 py-5">
                <h2 className="text-xl font-bold">Research Links Established</h2>
                <p className="text-blue-100 text-sm">HEIs / Corporate Sector / Industry / Community</p>
            </div>
            <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field label="Type of Linkage (Academic/Research)" name="linkageType" value={form.linkageType} onChange={handleChange} required />
                    <Field label="Date of MoU/Agreement" name="mouDate" type="date" value={form.mouDate} onChange={handleChange} required />
                    <Field label="National or International" name="nationalInternational" value={form.nationalInternational} onChange={handleChange} />
                    <Field label="Host Institution (Name & Address)" name="hostInstitution" value={form.hostInstitution} onChange={handleChange} required />
                    <Field label="Collaborating Agency/Institution" name="collaboratingAgency" value={form.collaboratingAgency} onChange={handleChange} />
                    <Field label="Field of Study / Research Broader Areas" name="fieldOfStudy" value={form.fieldOfStudy} onChange={handleChange} />
                    <Field label="Scope of Collaboration" name="scope" value={form.scope} onChange={handleChange} />
                    <Field label="Salient Features of Linkage" name="salientFeatures" value={form.salientFeatures} onChange={handleChange} />
                </div>

                <div className="mt-5">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-700 tracking-wide">
                            Annex Page Ref. (MoU Copy) <span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                            <input
                                ref={fileInputRef}
                                type="file"
                                name="document"
                                accept=".pdf,application/pdf"
                                onChange={handleChange}
                                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm transition-all input-focus-ring hover:border-slate-300 file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:text-sm file:font-medium hover:file:bg-blue-100"
                                required
                            />
                            <span className="text-xs text-slate-500 truncate max-w-xs">
                                {fileName !== "No file selected" ? (
                                    <><i className="fas fa-file-pdf text-red-500 mr-1.5"></i> {fileName}</>
                                ) : (
                                    <><i className="fas fa-info-circle text-slate-400 mr-1.5"></i> No PDF selected</>
                                )}
                            </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">
                            <i className="fas fa-shield-alt mr-1"></i> Only .PDF files accepted (max 5MB).
                        </p>
                    </div>
                </div>

                <button onClick={submit} disabled={loading} className="mt-6 w-full bg-blue-900 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-800 transition">
                    {loading ? "Submitting..." : "Submit KPI Data"}
                </button>
            </div>
        </div>
    );
}