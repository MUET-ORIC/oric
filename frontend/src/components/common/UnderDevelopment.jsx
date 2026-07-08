import React from "react";
import { FiCode, FiClock, FiArrowRight, FiCalendar, FiZap } from "react-icons/fi";
import logo from "../../assets/oric-muet-eesd2026.jpeg";

export default function UnderDevelopment({ kpiName }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-8">
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-100/80 p-8 md:p-12 max-w-lg w-full text-center relative overflow-hidden animate-fadeIn">
                {/* ─── Decorative Background Elements ─────────────────── */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-50/40 rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-50/30 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl" />

                {/* ─── Content ──────────────────────────────────────────── */}
                <div className="relative z-10">
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <div className="p-3 bg-white rounded-2xl shadow-md border border-slate-100">
                            <img
                                src={logo}
                                alt="ORIC MUET"
                                className="w-16 h-16 rounded-xl object-contain"
                            />
                        </div>
                    </div>

                    {/* Icon with Animation */}
                    <div className="flex justify-center mb-5">
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
                            <div className="relative w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg animate-float">
                                <FiCode className="w-10 h-10 text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Heading */}
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2 tracking-tight">
                        Under Development
                    </h2>

                    {/* Description */}
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-sm mx-auto">
                        {kpiName ? (
                            <>
                                <span className="font-medium text-slate-700">{kpiName}</span>
                                <span className="text-slate-400"> is currently being built.</span>
                            </>
                        ) : (
                            "This feature is currently being built."
                        )}
                    </p>

                    {/* Status Badge */}
                    <div className="flex items-center justify-center gap-2 mt-5">
                        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200/70 rounded-full px-4 py-1.5 text-xs font-medium text-amber-700">
                            <FiClock className="w-3.5 h-3.5" />
                            <span>Coming soon</span>
                            <FiArrowRight className="w-3.5 h-3.5" />
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center justify-center gap-3 mt-6">
                        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-blue-200 rounded-full" />
                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                        <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-blue-200 rounded-full" />
                    </div>

                    {/* Footer Message */}
                    <p className="text-slate-400 text-xs mt-5">
                        No ORIC data available for this KPI yet.
                    </p>

                    {/* Progress Indicator */}
                    <div className="mt-4 flex justify-center gap-1.5">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                    </div>
                </div>
            </div>

            {/* ─── Floating Decorations ───────────────────────────────── */}
            <div className="fixed bottom-8 right-8 opacity-10 hidden lg:block">
                <FiZap className="w-24 h-24 text-blue-900" />
            </div>
        </div>
    );
}