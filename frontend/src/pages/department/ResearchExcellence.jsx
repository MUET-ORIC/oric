import React, { useState, useRef, useEffect } from "react";
import { FiBook, FiChevronDown } from "react-icons/fi";

// ─── Import all 18 Research KPI Forms ──────────────────────────
import KPI1ResearchGrantForm from "../../components/ResearchExcellence/KPI1ResearchGrantForm";
import KPI2ResearchGrantForm from "../../components/ResearchExcellence/KPI2ResearchGrantForm";
import KPI3ResearchGrantForm from "../../components/ResearchExcellence/KPI3ResearchGrantForm";
import KPI4ResearchGrantForm from "../../components/ResearchExcellence/KPI4ResearchGrantForm";
import KPI5ResearchGrantForm from "../../components/ResearchExcellence/KPI5ResearchGrantForm";
import KPI6ResearchGrantForm from "../../components/ResearchExcellence/KPI6ResearchGrantForm";
import KPI7ResearchGrantForm from "../../components/ResearchExcellence/KPI7ResearchGrantForm";
import KPI8ResearchGrantForm from "../../components/ResearchExcellence/KPI8ResearchGrantForm";
import KPI9ResearchGrantForm from "../../components/ResearchExcellence/KPI9ResearchGrantForm";
import KPI10ResearchGrantForm from "../../components/ResearchExcellence/KPI10ResearchGrantForm";
import KPI11ResearchGrantForm from "../../components/ResearchExcellence/KPI11ResearchGrantForm";
import KPI12ResearchGrantForm from "../../components/ResearchExcellence/KPI12ResearchGrantForm";
import KPI13ResearchGrantForm from "../../components/ResearchExcellence/KPI13ResearchGrantForm";
import KPI14ResearchGrantForm from "../../components/ResearchExcellence/KPI14ResearchGrantForm";
import KPI15ResearchGrantForm from "../../components/ResearchExcellence/KPI15ResearchGrantForm";
import KPI16ResearchGrantForm from "../../components/ResearchExcellence/KPI16ResearchGrantForm";
import KPI17ResearchGrantForm from "../../components/ResearchExcellence/KPI17ResearchGrantForm";
import KPI18ResearchGrantForm from "../../components/ResearchExcellence/KPI18ResearchGrantForm";

export default function ResearchExcellence() {
    const [active, setActive] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const kpis = [
        "Number of Research Proposals Submitted for Funding from HEC (Proposals Submitted to PhD Faculty Ratio)",
        "Research Proposals Approved for Funding by HEC (Proposals Acceptance Ratio)",
        "Number of Research Projects (won from HEC) which were due to be Completed (in this year)",
        "Number of Research Projects (won from HEC) which were Completed (in this year)",
        "Number of Research Proposals Submitted for Funding (from non HEC source - National or International) (Proposals Submitted to PhD Faculty Ratio)",
        "Research Proposals Approved for Funding (from non HEC source - National or International) - (Proposals Acceptance Ratio)",
        "Number of Research Projects Completed (won through non-HEC source - National or International) (which were due to be completed)",
        "Joint Research Projects Approved for Funding (National / International Funding Agencies) - (Proposals Acceptance Ratio)",
        "Volume of R&D Funding Secured: National (HEC, Ignite, PSF, MOST, Joint Research Projects & others from federal or provincial government) / International",
        "Number of Research Proposals / Joint Research Proposals Reviewed by IRB, before Submission to Funding Bodies",
        "Number of Policy Advocacy or Case Studies Presented to Government Departments",
        "Number of Research Links Established with other HEIs / Corporate Sector / Industry / Community",
        "Number of Contract Research Awarded by Industry or Government Organizations (National)",
        "Number of Contract Research Awarded by Industry or Government Organizations (International)",
        "Volume of Contract Research Awarded by Industry or Government Organization (National or International)",
        "Number of Civic Engagement Events / Initiatives on Issues of Public Concern",
        "Consultancy Contracts Executed with Industry, Commerce or Government etc.",
        "Liaison Developed with University's Advance Studies & Research Board (AS&RB)"
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
            case 0: return <KPI1ResearchGrantForm />;
            case 1: return <KPI2ResearchGrantForm />;
            case 2: return <KPI3ResearchGrantForm />;
            case 3: return <KPI4ResearchGrantForm />;
            case 4: return <KPI5ResearchGrantForm />;
            case 5: return <KPI6ResearchGrantForm />;
            case 6: return <KPI7ResearchGrantForm />;
            case 7: return <KPI8ResearchGrantForm />;
            case 8: return <KPI9ResearchGrantForm />;
            case 9: return <KPI10ResearchGrantForm />;
            case 10: return <KPI11ResearchGrantForm />;
            case 11: return <KPI12ResearchGrantForm />;
            case 12: return <KPI13ResearchGrantForm />;
            case 13: return <KPI14ResearchGrantForm />;
            case 14: return <KPI15ResearchGrantForm />;
            case 15: return <KPI16ResearchGrantForm />;
            case 16: return <KPI17ResearchGrantForm />;
            case 17: return <KPI18ResearchGrantForm />;
            default: return null;
        }
    };

    return (
        <div className="w-full max-w-full overflow-x-hidden">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
                {/* ─── Header ──────────────────────────────────────── */}
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-5 flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-xl text-blue-900 flex-shrink-0">
                        <FiBook className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 truncate">
                            Research Excellence
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500">18 KPIs</p>
                    </div>
                </div>

                {/* ─── Dropdown ─────────────────────────────────────── */}
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

                {/* ─── Form Container ───────────────────────────────── */}
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