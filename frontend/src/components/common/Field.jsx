import React from "react";

const Field = ({ label, name, type = "text", value, onChange, placeholder, accept, required, options = [] }) => {
    const id = `field-${name}`;
    return (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={id} className="text-xs font-semibold text-slate-700 tracking-wide">
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
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

export default Field;