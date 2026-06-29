// src/components/SustainabilityCapacity.jsx
import React, { useState, useRef, useEffect } from "react";
import KPI1_SustainabilityForm from "./Sustainability/KPI1_SustainabilityForm";
import KPI2_SustainabilityForm from "./Sustainability/KPI2_SustainabilityForm";
import KPI3_SustainabilityForm from "./Sustainability/KPI3_SustainabilityForm";
import KPI4_SustainabilityForm from "./Sustainability/KPI4_SustainabilityForm";
import KPI5_SustainabilityForm from "./Sustainability/KPI5_SustainabilityForm";
import KPI6_SustainabilityForm from "./Sustainability/KPI6_SustainabilityForm";
import KPI7_SustainabilityForm from "./Sustainability/KPI7_SustainabilityForm";

const kpis = [
    "Five-Year Strategic Plan",
    "Annual Research Revenue Generated",
    "Yearly Revenue from Licensing / Royalties / Policy Advocacy",
    "Trainings / Workshops / Seminars Arranged by ORIC",
    "Trainings / Workshops / Seminars by other HEIs / Entities",
    "Exhibitions / Showcasing Events / Industry Linkages Fair Arranged by ORIC",
    "Trainings / Workshops for ORIC Personnel"
];

export default function SustainabilityCapacity() {
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
            case 0: return <KPI1_SustainabilityForm />;
            case 1: return <KPI2_SustainabilityForm />;
            case 2: return <KPI3_SustainabilityForm />;
            case 3: return <KPI4_SustainabilityForm />;
            case 4: return <KPI5_SustainabilityForm />;
            case 5: return <KPI6_SustainabilityForm />;
            case 6: return <KPI7_SustainabilityForm />;
            default: return null;
        }
    };

    return (
        <div className="p-4 md:p-6 space-y-4 max-w-7xl mx-auto">
            <div className="bg-white border border-blue-100 rounded-2xl shadow-sm p-5">
                <h1 className="text-blue-900 font-bold text-xl flex items-center gap-3">
                    <i className="fas fa-seedling text-blue-600"></i> Sustainability & Capacity Building
                    <span className="text-sm font-normal text-slate-400 ml-1">(7 KPIs)</span>
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