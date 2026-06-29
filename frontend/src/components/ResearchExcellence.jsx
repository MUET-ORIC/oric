import React, { useState, useRef, useEffect } from "react";
import KPI1ResearchGrantForm from "../components/ResearchExcellence/KPI1ResearchGrantForm";
import KPI2ResearchGrantForm from "../components/ResearchExcellence/KPI2ResearchGrantForm";
import KPI3ResearchGrantForm from "../components/ResearchExcellence/KPI3ResearchGrantForm";
import KPI4ResearchGrantForm from "../components/ResearchExcellence/KPI4ResearchGrantForm";
import KPI5ResearchGrantForm from "../components/ResearchExcellence/KPI5ResearchGrantForm";
import KPI6ResearchGrantForm from "../components/ResearchExcellence/KPI6ResearchGrantForm";
import KPI7ResearchGrantForm from "../components/ResearchExcellence/KPI7ResearchGrantForm";
import KPI8ResearchGrantForm from "../components/ResearchExcellence/KPI8ResearchGrantForm";
import KPI9ResearchGrantForm from "../components/ResearchExcellence/KPI9ResearchGrantForm";
import KPI10ResearchGrantForm from "../components/ResearchExcellence/KPI10ResearchGrantForm";
import KPI11ResearchGrantForm from "../components/ResearchExcellence/KPI11ResearchGrantForm";
import KPI12ResearchGrantForm from "../components/ResearchExcellence/KPI12ResearchGrantForm";
import KPI13ResearchGrantForm from "../components/ResearchExcellence/KPI13ResearchGrantForm";
import KPI14ResearchGrantForm from "../components/ResearchExcellence/KPI14ResearchGrantForm";
import KPI15ResearchGrantForm from "../components/ResearchExcellence/KPI15ResearchGrantForm";
import KPI16ResearchGrantForm from "../components/ResearchExcellence/KPI16ResearchGrantForm";
import KPI17ResearchGrantForm from "../components/ResearchExcellence/KPI17ResearchGrantForm";
import KPI18ResearchGrantForm from "../components/ResearchExcellence/KPI18ResearchGrantForm";

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
        <div className="p-4 md:p-6 space-y-4 max-w-7xl mx-auto">
            <div className="bg-white border border-blue-100 rounded-2xl shadow-sm p-5">
                <h1 className="text-blue-900 font-bold text-xl flex items-center gap-3">
                    <i className="fas fa-microscope text-blue-600"></i> Research Excellence
                    <span className="text-sm font-normal text-slate-400 ml-1">(18 KPIs)</span>
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