import React, { useState, useCallback, useRef } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Field = ({ label, name, type = "text", value, onChange, placeholder, accept, required, options = [] }) => {
    const id = `field-${name}`;
    return (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={id} className="text-xs font-semibold text-slate-700 tracking-wide">
                {label} {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            {type === "select" ? (
                <select
                    id={id}
                    name={name}
                    value={value || ""}
                    onChange={onChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm transition-all input-focus-ring hover:border-slate-300"
                    required={required}
                >
                    <option value="">Select Department</option>
                    {options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            ) : type === "textarea" ? (
                <textarea
                    id={id}
                    name={name}
                    value={value || ""}
                    onChange={onChange}
                    placeholder={placeholder}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm transition-all input-focus-ring hover:border-slate-300 resize-y"
                    required={required}
                />
            ) : type === "file" ? (
                <input
                    id={id}
                    type="file"
                    name={name}
                    accept={accept || ".pdf,application/pdf"}
                    onChange={onChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm transition-all input-focus-ring hover:border-slate-300 file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:text-sm file:font-medium hover:file:bg-blue-100"
                    required={required}
                />
            ) : (
                <input
                    id={id}
                    type={type}
                    name={name}
                    value={value || ""}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm transition-all input-focus-ring hover:border-slate-300"
                    required={required}
                />
            )}
        </div>
    );
};

// ─── FULL DEPARTMENT LIST (matches Login) ──────────────────────────────
const departments = [
    "Architecture",
    "Basic Sciences & Related Studies",
    "Bio-Medical Engineering",
    "Centre of English Language & Linguistics",
    "Chemical Engineering",
    "City & Regional Planning",
    "Civil Engineering",
    "Computer Systems Engineering",
    "Electrical Engineering",
    "Electronic Engineering",
    "Environmental Engineering",
    "Industrial Engineering & Management",
    "Institute of Water Resources Engineering & Management",
    "Mechanical Engineering",
    "Mechatronic Engineering",
    "Metallurgy & Materials Engineering",
    "Mehran University Institute of Science, Technology & Development",
    "Mining Engineering",
    "Petroleum & Natural Gas Engineering",
    "Software Engineering",
    "Telecommunication Engineering",
    "Textile Engineering"
];

export default function KPI1ResearchGrantForm() {
    const [form, setForm] = useState({
        grantName: "",
        submissionDate: "",
        piName: "",
        designation: "",
        department: "",
        thematic: "",
        title: "",
        startDate: "",
        endDate: "",
        fundingRequested: "",
        collaborators: "",
        coFunding: "",
        status: "",
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
        if (!form.grantName || !form.submissionDate || !form.piName || !form.department ||
            !form.thematic || !form.title || !form.fundingRequested) {
            toast.error("⚠️ Please fill in all required fields.");
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

            const res = await axios.post("http://localhost:5000/submit/research/kpi1", payload, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (res.data.success) {
                toast.success("✅ KPI 1 submitted successfully!");
                setForm({
                    grantName: "",
                    submissionDate: "",
                    piName: "",
                    designation: "",
                    department: "",
                    thematic: "",
                    title: "",
                    startDate: "",
                    endDate: "",
                    fundingRequested: "",
                    collaborators: "",
                    coFunding: "",
                    status: "",
                    remarks: "",
                    document: null,
                });
                if (fileInputRef.current) fileInputRef.current.value = "";
            } else {
                toast.error("❌ Submission failed.");
            }
        } catch (err) {
            console.error(err);
            // ── Handle file‑lock error ──
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
            <Toaster position="top-right" reverseOrder={false} toastOptions={{ duration: 4000 }} />
            <div className="bg-gradient-to-r from-blue-900 to-blue-600 text-white px-6 py-5">
                <div className="flex items-center gap-3">
                    <div>
                        <h2 className="text-xl font-bold tracking-tight">Research Proposals Submitted for Funding from HEC</h2>
                        <p className="text-blue-100 text-sm mt-0.5">Proposals Submitted to PhD Faculty Ratio</p>
                    </div>
                </div>
            </div>

            <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field label="Name of Research Grant" name="grantName" value={form.grantName} onChange={handleChange} placeholder="e.g. NRPU-2024" required />
                    <Field label="Date of Proposal Submission" name="submissionDate" type="date" value={form.submissionDate} onChange={handleChange} required />
                    <Field label="Name of PI" name="piName" value={form.piName} onChange={handleChange} placeholder="Dr. John Doe" required />
                    <Field label="Designation of PI" name="designation" value={form.designation} onChange={handleChange} placeholder="Professor / Associate Professor" />
                    <Field label="Department of PI" name="department" type="select" value={form.department} onChange={handleChange} options={departments} required />

                    <Field
                        label="Thematic Area"
                        name="thematic"
                        value={form.thematic}
                        onChange={handleChange}
                        placeholder="e.g. AI, Renewable Energy"
                        required
                    />

                    <Field label="Title of Research Proposal" name="title" value={form.title} onChange={handleChange} placeholder="Enter full proposal title" required />
                    <Field label="Duration (Starting Date)" name="startDate" type="date" value={form.startDate} onChange={handleChange} />
                    <Field label="Duration (Ending Date)" name="endDate" type="date" value={form.endDate} onChange={handleChange} />

                    <Field
                        label="Total Funding Requested (PKR Million)"
                        name="fundingRequested"
                        value={form.fundingRequested}
                        onChange={handleChange}
                        placeholder="e.g. 2.5"
                        required
                    />

                    <Field label="Collaborating Partner(s) Details" name="collaborators" value={form.collaborators} onChange={handleChange} placeholder="e.g. NUST, Industry X" />
                    <Field label="Co Funding Partner(s) Details" name="coFunding" value={form.coFunding} onChange={handleChange} placeholder="e.g. HEC, PAK-UK" />
                    <Field label="Status" name="status" value={form.status} onChange={handleChange} placeholder="e.g. Submitted, Not Awarded" />
                </div>

                <div className="mt-5">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-700 tracking-wide">
                            Annex Page Ref. No. (Proposal Submission Email Copy) <span className="text-red-500 ml-0.5">*</span>
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

                <div className="mt-5">
                    <Field label="Remarks / Any other information" name="remarks" type="textarea" value={form.remarks} onChange={handleChange} placeholder="Any additional information or comments..." />
                </div>

                <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={submit}
                        disabled={loading}
                        className="mt-6 w-full bg-blue-900 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-800 transition"
                    >
                        {loading ? "Submitting..." : "Submit KPI Data"}
                    </button>
                </div>
            </div>
        </div>
    );
}