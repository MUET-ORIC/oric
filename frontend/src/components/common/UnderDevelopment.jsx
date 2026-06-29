import React from "react";
import logo from "../../assets/oric-muet-eesd2026.jpeg";

export default function UnderDevelopment({ kpiName }) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8 max-w-md w-full text-center">
                <img
                    src={logo}
                    alt="ORIC MUET"
                    className="w-24 h-24 rounded-xl shadow-md mx-auto mb-6"
                />
                <h2 className="text-2xl font-bold text-blue-900 mb-3">
                    Under Development
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-2">
                    {kpiName ? `${kpiName}` : "This KPI"} is currently being built.
                </p>
                <p className="text-gray-400 text-xs">
                    We're working hard to bring you this feature soon.
                </p>
                <div className="mt-6 w-16 h-1 bg-blue-900 rounded-full mx-auto" />
                <p className="text-gray-400 text-xs mt-4">
                    No ORIC data available yet.
                </p>
            </div>
        </div>
    );
}