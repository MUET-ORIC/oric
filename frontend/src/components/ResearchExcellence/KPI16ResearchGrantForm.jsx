import React, { useState, useCallback, useRef } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Field from "../common/Field";
import { departments } from "../common/departments";

export default function KPI16ResearchGrantForm() {
    const [form, setForm] = useState({
        eventTitle: "",
        eventDate: "",
        communityComponent: "",
        outcome: "",
        collaboration: "",
        csos: "",
        sponsor: "",
        arrangedParticipated: "",
        dissemination: "",
        remarks: "",
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
        if (!form.eventTitle || !form.eventDate) {
            toast.error("⚠️ Please fill in Event Title and Date.");
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
            const res = await axios.post("/submit/research/kpi16", payload, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (res.data.success) {
                toast.success("✅ KPI 16 submitted successfully!");
                setForm({
                    eventTitle: "",
                    eventDate: "",
                    communityComponent: "",
                    outcome: "",
                    collaboration: "",
                    csos: "",
                    sponsor: "",
                    arrangedParticipated: "",
                    dissemination: "",
                    remarks: "",
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
                <h2 className="text-xl font-bold">Civic Engagement Events / Initiatives</h2>
                <p className="text-blue-100 text-sm">Issues of Public Concern</p>
            </div>
            <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field label="Title of Event / Initiative" name="eventTitle" value={form.eventTitle} onChange={handleChange} required />
                    <Field label="Date of Event" name="eventDate" type="date" value={form.eventDate} onChange={handleChange} required />
                    <Field label="Community Component Involved" name="communityComponent" value={form.communityComponent} onChange={handleChange} />
                    <Field label="Outcome (Case Study, Policy Advice)" name="outcome" value={form.outcome} onChange={handleChange} />
                    <Field label="Collaboration Developed" name="collaboration" value={form.collaboration} onChange={handleChange} />
                    <Field label="CSOs/NGOs Engaged" name="csos" value={form.csos} onChange={handleChange} />
                    <Field label="Sponsoring Agency (Grant Value)" name="sponsor" value={form.sponsor} onChange={handleChange} />
                    <Field label="Arranged / Participated" name="arrangedParticipated" value={form.arrangedParticipated} onChange={handleChange} />
                    <Field label="Dissemination Material" name="dissemination" value={form.dissemination} onChange={handleChange} />
                    <Field label="Remarks" name="remarks" value={form.remarks} onChange={handleChange} />
                </div>

                <div className="mt-5">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-700 tracking-wide">
                            Annex Page Ref. (Brief Event Report / Brochures) <span className="text-red-500 ml-0.5">*</span>
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