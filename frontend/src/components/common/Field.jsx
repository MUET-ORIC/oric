import React from "react";

const Field = ({ label, name, type = "text", value, onChange, placeholder, accept, required, options = [], disabled = false }) => {
    const id = `field-${name}`;

    const baseClass = `
        w-full px-4 py-3 rounded-xl border border-slate-200 
        bg-white text-sm text-slate-700 placeholder:text-slate-400 
        focus:ring-2 focus:ring-blue-500 focus:border-transparent 
        transition-all duration-200 hover:border-blue-300
        disabled:bg-slate-50 disabled:cursor-not-allowed
    `;

    return (
        <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor={id} className="text-sm font-semibold text-slate-700 tracking-wide flex items-center gap-1">
                {label}
                {required && <span className="text-red-500 text-base">*</span>}
            </label>

            {type === "select" ? (
                <select
                    id={id}
                    name={name}
                    value={value || ""}
                    onChange={onChange}
                    className={baseClass}
                    required={required}
                    disabled={disabled}
                >
                    <option value="">Select {label}</option>
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
                    rows={4}
                    className={`${baseClass} resize-y min-h-[80px]`}
                    required={required}
                />
            ) : type === "file" ? (
                <div className="relative">
                    <input
                        id={id}
                        type="file"
                        name={name}
                        accept={accept || ".pdf,application/pdf"}
                        onChange={onChange}
                        className={`${baseClass} file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:text-sm file:font-medium hover:file:bg-blue-100 transition-colors`}
                        required={required}
                    />
                </div>
            ) : (
                <input
                    id={id}
                    type={type}
                    name={name}
                    value={value || ""}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={baseClass}
                    required={required}
                />
            )}
        </div>
    );
};

export default Field;