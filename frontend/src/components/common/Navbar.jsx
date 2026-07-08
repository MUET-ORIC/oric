import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FiHome, FiChevronRight } from "react-icons/fi";

export default function Navbar() {
    const { user } = useAuth();
    const location = useLocation();

    // ─── Get breadcrumb from current path ──────────────────────────
    const getBreadcrumb = () => {
        const path = location.pathname;
        if (path === "/") return "Dashboard";
        if (path === "/research") return "Research Excellence";
        if (path === "/innovation") return "Innovation & Commercialization";
        if (path === "/sustainability") return "Sustainability & Capacity Building";
        if (path === "/my-submissions") return "My Submissions";
        if (path === "/admin") return "Admin Dashboard";
        if (path === "/admin/submissions") return "All Submissions";
        if (path.startsWith("/admin/submissions/")) return "Submission Details";
        return "Dashboard";
    };

    const breadcrumb = getBreadcrumb();

    // ─── Get department short form (initials) ──────────────────────
    const getDepartmentShort = (dept) => {
        if (!dept) return "??";
        const parts = dept.split(" ");
        if (parts.length === 1) return dept.slice(0, 2).toUpperCase();
        const initials = parts.map((p) => p[0]).join("");
        return initials.slice(0, 2).toUpperCase();
    };

    const deptShort = getDepartmentShort(user?.department);

    return (
        <header className="bg-white border-b border-slate-200/80 shadow-sm sticky top-0 z-40">
            <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 py-2.5 sm:py-3">
                {/* ─── Left: Breadcrumb ──────────────────────────────────── */}
                <div className="flex items-center gap-1.5 min-w-0">
                    <FiHome className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-slate-400 hidden xs:inline">/</span>
                    <span className="text-xs sm:text-sm text-slate-500 hidden xs:inline">ORIC</span>
                    <FiChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-300 flex-shrink-0 hidden xs:inline" />
                    <span className="text-xs sm:text-sm font-medium text-slate-700 truncate">
                        {breadcrumb}
                    </span>
                </div>

                {/* ─── Right: Department Avatar ──────────────────────────── */}
                <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-900 to-blue-700 text-white flex items-center justify-center text-xs sm:text-sm font-bold shadow-sm">
                        {deptShort}
                    </div>
                </div>
            </div>
        </header>
    );
}