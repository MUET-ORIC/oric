// src/components/InnovationCommercialization.jsx
import React, { useState, useRef, useEffect } from "react";
import KPI1_InnovationForm from "./Innovation/KPI1_InnovationForm";
import KPI2_InnovationForm from "./Innovation/KPI2_InnovationForm";
import KPI3_InnovationForm from "./Innovation/KPI3_InnovationForm";
import KPI4_InnovationForm from "./Innovation/KPI4_InnovationForm";
import KPI5_InnovationForm from "./Innovation/KPI5_InnovationForm";
import KPI6_InnovationForm from "./Innovation/KPI6_InnovationForm";
import KPI7_InnovationForm from "./Innovation/KPI7_InnovationForm";
import KPI8_InnovationForm from "./Innovation/KPI8_InnovationForm";
import KPI9_InnovationForm from "./Innovation/KPI9_InnovationForm";
import KPI10_InnovationForm from "./Innovation/KPI10_InnovationForm";
import KPI11_InnovationForm from "./Innovation/KPI11_InnovationForm";
import KPI12_InnovationForm from "./Innovation/KPI12_InnovationForm";
import KPI13_InnovationForm from "./Innovation/KPI13_InnovationForm";
import KPI14_InnovationForm from "./Innovation/KPI14_InnovationForm";
import KPI15_InnovationForm from "./Innovation/KPI15_InnovationForm";
import KPI16_InnovationForm from "./Innovation/KPI16_InnovationForm";
import KPI17_InnovationForm from "./Innovation/KPI17_InnovationForm";

const kpis = [
    "Research Policy of the HEI",
    "Intellectual Property Rights Policy of the HEI",
    "Research Ethics / Technology Transfer / Conflict of Interest Policy",
    "Number of IP Disclosures Made (National / International)",
    "Patents / Trademarks FILED (National)",
    "Patents / Trademarks GRANTED (National)",
    "Patents / Trademarks FILED (International)",
    "Patents / Trademarks GRANTED (International)",
    "IP Licensing Negotiations Initiated (National)",
    "Non-Exclusive / Exclusive Licenses Signed (National)",
    "IP Licensing Negotiations Initiated (International)",
    "Non-Exclusive / Exclusive Licenses Signed (International)",
    "Research products / prototypes gone into prefeasibility / testing",
    "Science / Arts Products or Creative Activities Displayed",
    "Visits by Industry / Community Representatives",
    "Agreements Signed for Collaboration",
    "National / International Honors or Awards Won"
];

export default function InnovationCommercialization() {
    const [active, setActive] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const renderForm = () => {
        switch (active) {
            case 0: return <KPI1_InnovationForm />;
            case 1: return <KPI2_InnovationForm />;
            case 2: return <KPI3_InnovationForm />;
            case 3: return <KPI4_InnovationForm />;
            case 4: return <KPI5_InnovationForm />;
            case 5: return <KPI6_InnovationForm />;
            case 6: return <KPI7_InnovationForm />;
            case 7: return <KPI8_InnovationForm />;
            case 8: return <KPI9_InnovationForm />;
            case 9: return <KPI10_InnovationForm />;
            case 10: return <KPI11_InnovationForm />;
            case 11: return <KPI12_InnovationForm />;
            case 12: return <KPI13_InnovationForm />;
            case 13: return <KPI14_InnovationForm />;
            case 14: return <KPI15_InnovationForm />;
            case 15: return <KPI16_InnovationForm />;
            case 16: return <KPI17_InnovationForm />;
            default: return null;
        }
    };

    return (
        <div className="p-4 md:p-6 space-y-4 max-w-7xl mx-auto">
            <div className="bg-white border border-blue-100 rounded-2xl shadow-sm p-5">
                <h1 className="text-blue-900 font-bold text-xl flex items-center gap-3">
                    <i className="fas fa-lightbulb text-blue-600"></i> Innovation & Commercialization
                    <span className="text-sm font-normal text-slate-400 ml-1">(17 KPIs)</span>
                </h1>
            </div>

            {/* ─── Custom Dropdown ─── */}
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="
                        w-full flex items-center justify-between
                        px-4 py-3 md:py-3.5
                        bg-white border border-slate-200 rounded-2xl
                        text-sm md:text-base font-medium text-slate-700
                        hover:border-blue-300 transition-all
                        focus:ring-2 focus:ring-blue-900 focus:border-transparent
                        shadow-sm
                    "
                >
                    <span className="truncate">
                        KPI {active + 1} - {kpis[active]}
                    </span>
                    <svg
                        className={`w-5 h-5 ml-2 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {/* Dropdown menu */}
                {isOpen && (
                    <div
                        className="
                            absolute left-0 right-0 top-full mt-1
                            max-h-60 overflow-y-auto
                            bg-white border border-slate-200 rounded-2xl shadow-lg
                            z-50
                        "
                    >
                        {kpis.map((k, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    setActive(i);
                                    setIsOpen(false);
                                }}
                                className={`
                                    w-full text-left px-4 py-3 text-sm
                                    hover:bg-blue-50 transition-colors
                                    ${active === i ? "bg-blue-50 text-blue-900 font-medium" : "text-slate-700"}
                                    border-b border-slate-100 last:border-0
                                `}
                            >
                                KPI {i + 1} - {k}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="bg-white border border-blue-100 rounded-2xl shadow-sm p-5 md:p-6">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-1.5 h-6 bg-blue-900 rounded-full"></div>
                    <h2 className="text-blue-900 font-semibold text-lg">KPI {active + 1}</h2>
                </div>
                <p className="text-slate-600 text-sm mb-5 leading-relaxed">{kpis[active]}</p>
                {renderForm()}
            </div>
        </div>
    );
}