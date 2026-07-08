import React, { useState, useRef, useEffect } from "react";
import { FiRefreshCw, FiChevronDown } from "react-icons/fi";

// ─── Import all 7 Sustainability KPI Forms ──────────────────────────
import KPI1_SustainabilityForm from "../../components/Sustainability/KPI1_SustainabilityForm";
import KPI2_SustainabilityForm from "../../components/Sustainability/KPI2_SustainabilityForm";
import KPI3_SustainabilityForm from "../../components/Sustainability/KPI3_SustainabilityForm";
import KPI4_SustainabilityForm from "../../components/Sustainability/KPI4_SustainabilityForm";
import KPI5_SustainabilityForm from "../../components/Sustainability/KPI5_SustainabilityForm";
import KPI6_SustainabilityForm from "../../components/Sustainability/KPI6_SustainabilityForm";
import KPI7_SustainabilityForm from "../../components/Sustainability/KPI7_SustainabilityForm";

export default function SustainabilityCapacityBuilding() {
    const [active, setActive] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const kpis = [
        "Five-Year Strategic Plan",
        "Annual Research Revenue Generated",
        "Yearly Revenue from Licensing / Royalties / Policy Advocacy",
        "Trainings / Workshops / Seminars Arranged by ORIC",
        "Trainings / Workshops / Seminars by other HEIs / Entities",
        "Exhibitions / Showcasing Events / Industry Linkages Fair Arranged by ORIC",
        "Trainings / Workshops for ORIC Personnel"
    ];

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
        <div className="w-full max-w-full overflow-x-hidden">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-5 flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-xl text-blue-900 flex-shrink-0">
                        <FiRefreshCw className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 truncate">
                            Sustainability & Capacity Building
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500">7 KPIs</p>
                    </div>
                </div>

                <div className="relative w-full" ref={dropdownRef}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 bg-white border border-slate-200 rounded-xl sm:rounded-2xl shadow-sm hover:border-blue-300 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <span className="text-xs sm:text-sm md:text-base font-medium text-slate-700 pr-2 whitespace-normal break-words text-left">
                            KPI {active + 1} – {kpis[active]}
                        </span>
                        <FiChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isOpen && (
                        <div className="absolute left-0 right-0 top-full mt-1 sm:mt-2 max-h-56 sm:max-h-72 overflow-y-auto bg-white border border-slate-200 rounded-xl sm:rounded-2xl shadow-xl z-50 animate-fadeIn">
                            {kpis.map((k, i) => (
                                <button
                                    key={i}
                                    onClick={() => { setActive(i); setIsOpen(false); }}
                                    className={`w-full text-left px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm transition-colors duration-150 ${active === i ? 'bg-blue-50 text-blue-900 font-medium' : 'text-slate-600 hover:bg-slate-50'} border-b border-slate-100 last:border-0`}
                                    style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
                                >
                                    KPI {i + 1} – {k}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-100 p-3 sm:p-4 md:p-5 lg:p-8 overflow-x-auto animate-slideUp">
                    <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-3 sm:mb-4">
                            <div className="w-1 h-6 sm:h-8 bg-blue-900 rounded-full flex-shrink-0" />
                            <h2 className="text-base sm:text-lg font-bold text-slate-700 truncate">
                                KPI {active + 1}
                            </h2>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 mb-4 sm:mb-6 leading-relaxed break-words">
                            {kpis[active]}
                        </p>
                        <div className="w-full">
                            {renderForm()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}