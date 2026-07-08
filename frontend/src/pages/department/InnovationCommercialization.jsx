import React, { useState, useRef, useEffect } from "react";
import { FiTrendingUp, FiChevronDown } from "react-icons/fi";

// ─── Import all 17 Innovation KPI Forms ──────────────────────────
import KPI1_InnovationForm from "../../components/Innovation/KPI1_InnovationForm";
import KPI2_InnovationForm from "../../components/Innovation/KPI2_InnovationForm";
import KPI3_InnovationForm from "../../components/Innovation/KPI3_InnovationForm";
import KPI4_InnovationForm from "../../components/Innovation/KPI4_InnovationForm";
import KPI5_InnovationForm from "../../components/Innovation/KPI5_InnovationForm";
import KPI6_InnovationForm from "../../components/Innovation/KPI6_InnovationForm";
import KPI7_InnovationForm from "../../components/Innovation/KPI7_InnovationForm";
import KPI8_InnovationForm from "../../components/Innovation/KPI8_InnovationForm";
import KPI9_InnovationForm from "../../components/Innovation/KPI9_InnovationForm";
import KPI10_InnovationForm from "../../components/Innovation/KPI10_InnovationForm";
import KPI11_InnovationForm from "../../components/Innovation/KPI11_InnovationForm";
import KPI12_InnovationForm from "../../components/Innovation/KPI12_InnovationForm";
import KPI13_InnovationForm from "../../components/Innovation/KPI13_InnovationForm";
import KPI14_InnovationForm from "../../components/Innovation/KPI14_InnovationForm";
import KPI15_InnovationForm from "../../components/Innovation/KPI15_InnovationForm";
import KPI16_InnovationForm from "../../components/Innovation/KPI16_InnovationForm";
import KPI17_InnovationForm from "../../components/Innovation/KPI17_InnovationForm";

export default function InnovationCommercialization() {
    const [active, setActive] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

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
        <div className="w-full max-w-full overflow-x-hidden">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-5 flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-xl text-blue-900 flex-shrink-0">
                        <FiTrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 truncate">
                            Innovation & Commercialization
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500">17 KPIs</p>
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