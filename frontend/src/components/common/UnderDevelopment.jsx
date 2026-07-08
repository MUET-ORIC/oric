import React from "react";
import { FiCode, FiClock, FiArrowRight, FiZap } from "react-icons/fi";
import { motion } from "framer-motion";
import logo from "../../assets/oric-muet-eesd2026.jpeg";

export default function UnderDevelopment({ kpiName }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative bg-white rounded-2xl shadow-xl border border-gray-100/80 p-8 md:p-12 max-w-md w-full text-center overflow-hidden"
            >
                {/* ─── Subtle Gradient Background ────────────────────── */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-white to-indigo-50/20" />

                {/* ─── Decorative Blurs ──────────────────────────────── */}
                <div className="absolute -top-32 -right-32 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl" />

                {/* ─── Content ────────────────────────────────────────── */}
                <div className="relative z-10">
                    {/* Logo / Branding */}
                    <div className="flex justify-center mb-6">
                        <div className="p-2.5 bg-white rounded-xl shadow-sm border border-gray-100">
                            <img
                                src={logo}
                                alt="ORIC MUET"
                                className="w-14 h-14 rounded-lg object-contain"
                            />
                        </div>
                    </div>

                    {/* Animated Icon */}
                    <motion.div
                        className="flex justify-center mb-5"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-500/15 rounded-full blur-xl animate-pulse" />
                            <div className="relative w-16 h-16 bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl flex items-center justify-center shadow-lg">
                                <FiCode className="w-8 h-8 text-white" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-gray-800 mb-2 tracking-tight">
                        Under Development
                    </h2>

                    {/* Description */}
                    <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                        {kpiName ? (
                            <>
                                <span className="font-semibold text-gray-700">{kpiName}</span>
                                <span className="text-gray-400"> is currently being built.</span>
                            </>
                        ) : (
                            "This feature is currently being developed."
                        )}
                    </p>

                    {/* Status Badge */}
                    <div className="flex items-center justify-center mt-5">
                        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 text-xs font-medium text-blue-700">
                            <FiClock className="w-3.5 h-3.5" />
                            <span>Coming Soon</span>
                            <FiArrowRight className="w-3.5 h-3.5" />
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center justify-center gap-3 mt-6">
                        <div className="w-12 h-px bg-gradient-to-r from-transparent to-blue-200" />
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                        <div className="w-12 h-px bg-gradient-to-l from-transparent to-blue-200" />
                    </div>

                    {/* Footer Message */}
                    <p className="text-gray-400 text-xs mt-4">
                        No ORIC data available for this KPI yet.
                    </p>

                    {/* Progress Dots */}
                    <div className="flex justify-center gap-1.5 mt-4">
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                className="w-1.5 h-1.5 rounded-full bg-blue-600/60 animate-pulse"
                                style={{ animationDelay: `${i * 0.15}s` }}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* ─── Decorative Element ────────────────────────────────── */}
            <div className="fixed bottom-8 right-8 opacity-5 hidden lg:block pointer-events-none">
                <FiZap className="w-32 h-32 text-blue-900" />
            </div>
        </div>
    );
}