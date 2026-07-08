import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    FiHome,
    FiChevronRight,
    FiBook,
    FiTrendingUp,
    FiAward,
    FiFolder,
    FiBarChart2,
    FiFileText,
    FiUser,
} from 'react-icons/fi';

export default function Navbar() {
    const { user } = useAuth();
    const location = useLocation();

    const getBreadcrumb = () => {
        const path = location.pathname;
        if (path === "/department") return { label: "Dashboard", icon: FiHome };
        if (path === "/research") return { label: "Research Excellence", icon: FiBook };
        if (path === "/innovation") return { label: "Innovation & Commercialization", icon: FiTrendingUp };
        if (path === "/sustainability") return { label: "Sustainability & Capacity Building", icon: FiAward };
        if (path === "/my-submissions") return { label: "My Submissions", icon: FiFolder };
        if (path === "/admin") return { label: "Admin Dashboard", icon: FiBarChart2 };
        if (path === "/admin/submissions") return { label: "All Submissions", icon: FiFileText };
        if (path.startsWith("/admin/submissions/")) return { label: "Submission Details", icon: FiFileText };
        return { label: "Dashboard", icon: FiHome };
    };

    const breadcrumb = getBreadcrumb();
    const Icon = breadcrumb.icon;

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
                <div className="flex items-center gap-1.5 min-w-0">
                    {/* Only one icon – the page icon */}
                    <Icon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-slate-400 hidden xs:inline">/</span>
                    <span className="text-xs sm:text-sm text-slate-500 hidden xs:inline">ORIC</span>
                    <FiChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-300 flex-shrink-0 hidden xs:inline" />
                    <span className="text-xs sm:text-sm font-medium text-slate-700 truncate">{breadcrumb.label}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500">
                        <FiUser className="w-3.5 h-3.5 text-slate-400" />
                        <span>{user?.username || 'User'}</span>
                    </div>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-900 to-blue-700 text-white flex items-center justify-center text-xs sm:text-sm font-bold shadow-sm ring-1 ring-white/20">
                        {deptShort}
                    </div>
                </div>
            </div>
        </header>
    );
}