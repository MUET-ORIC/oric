import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    FiHome,
    FiFileText,
    FiFolder,
    FiBarChart2,
    FiLogOut,
    FiChevronLeft,
    FiChevronRight,
    FiHelpCircle,
} from 'react-icons/fi';
import logo from '../../assets/oric-muet-eesd2026.jpeg';
import UsageGuide from './UsageGuide';

export default function Sidebar({ collapsed, toggleCollapse }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showUsageGuide, setShowUsageGuide] = useState(false);

    const navLinks =
        user?.role === 'admin'
            ? [
                { to: '/admin', label: 'Dashboard', icon: FiBarChart2, end: true },
                { to: '/admin/submissions', label: 'Submissions', icon: FiFolder },
            ]
            : [
                { to: '/research', label: 'Research', icon: FiBarChart2, end: true },
                { to: '/innovation', label: 'Innovation', icon: FiFileText },
                { to: '/sustainability', label: 'Sustainability', icon: FiFolder },
                { to: '/my-submissions', label: 'My Submissions', icon: FiFolder },
            ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getDepartmentShort = (dept) => {
        if (!dept) return '??';
        const parts = dept.split(' ');
        if (parts.length === 1) return dept.slice(0, 2).toUpperCase();
        const initials = parts.map((p) => p[0]).join('');
        return initials.slice(0, 2).toUpperCase();
    };

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    return (
        <aside
            className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 shadow-sm transition-all duration-300 z-50 flex flex-col ${collapsed ? 'w-16' : 'w-64'
                }`}
        >
            {/* ─── Header / Logo ──────────────────────────── */}
            <div
                className={`flex items-center h-16 px-3 border-b border-gray-100 ${collapsed ? 'justify-center' : 'justify-between'
                    }`}
            >
                <div className={`flex items-center gap-2 ${collapsed ? 'justify-center w-full' : ''}`}>
                    <img src={logo} className="w-10 h-10 rounded-lg flex-shrink-0" alt="ORIC MUET" />
                    {!collapsed && (
                        <span className="font-bold text-blue-900 text-lg whitespace-nowrap">
                            ORIC MUET
                        </span>
                    )}
                </div>

                {!collapsed && (
                    <button
                        onClick={toggleCollapse}
                        className="p-1 rounded-lg hover:bg-gray-100 text-gray-500"
                        aria-label="Collapse sidebar"
                    >
                        <FiChevronLeft className="w-5 h-5" />
                    </button>
                )}

                {collapsed && (
                    <button
                        onClick={toggleCollapse}
                        className="absolute -right-3 top-5 p-1 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 text-gray-500"
                        aria-label="Expand sidebar"
                    >
                        <FiChevronRight className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* ─── Navigation ────────────────────────────────── */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navLinks.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        end={link.end || false}
                        className={({ isActive }) =>
                            `relative flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 ${isActive
                                ? 'bg-blue-50 text-blue-900 font-medium shadow-sm'
                                : 'text-gray-600 hover:bg-gray-50'
                            } ${collapsed ? 'justify-center' : ''}`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-900 rounded-r-full" />
                                )}
                                <link.icon
                                    className={`w-5 h-5 ${isActive ? 'text-blue-900' : 'text-gray-400'}`}
                                />
                                {!collapsed && <span className="ml-3 text-sm">{link.label}</span>}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* ─── User Section ───────────────────────────────── */}
            <div className="p-3 border-t border-gray-100 space-y-1">
                {/* ─── Usage Guide Button ──────────────────────── */}
                <button
                    onClick={() => setShowUsageGuide(true)}
                    className={`flex items-center w-full px-3 py-2 rounded-lg transition-all duration-200 text-gray-500 hover:bg-blue-50 hover:text-blue-700 ${collapsed ? 'justify-center' : ''
                        }`}
                >
                    <FiHelpCircle className="w-5 h-5" />
                    {!collapsed && <span className="ml-3 text-sm font-medium">Usage Guide</span>}
                </button>

                {/* ─── User Profile / Dropdown ────────────────── */}
                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className={`flex items-center w-full px-3 py-2.5 rounded-lg transition-all duration-200 text-gray-600 hover:bg-gray-50 ${collapsed ? 'justify-center' : ''
                            }`}
                    >
                        <div
                            className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-sm flex-shrink-0 select-none overflow-hidden"
                            style={{ fontSize: '0.75rem', lineHeight: '1' }}
                        >
                            {getDepartmentShort(user?.department)}
                        </div>

                        {!collapsed && (
                            <>
                                <span className="ml-3 text-sm font-medium truncate">
                                    {user?.department || 'Department'}
                                </span>
                                <svg
                                    className={`w-6 h-6 ml-auto transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </>
                        )}
                    </button>

                    {/* ─── Dropdown Menu ──────────────────────────── */}
                    {dropdownOpen && (
                        <div
                            className={`
                                absolute z-50 bg-white border border-gray-200
                                rounded-xl shadow-xl py-2 min-w-[220px] transition-all duration-200
                                ${collapsed
                                    ? 'left-full ml-3 bottom-0 -translate-y-4'
                                    : 'bottom-full left-0 right-0 mb-2'
                                }
                            `}
                        >
                            {/* ─── Profile Card ───────────────────────── */}
                            <div className="flex flex-col items-center px-4 py-4 border-b border-gray-100 bg-gray-50/50 rounded-t-xl">
                                <div
                                    className="w-16 h-16 rounded-full bg-blue-900 text-white flex items-center justify-center text-2xl font-bold mb-2 shadow-md select-none overflow-hidden"
                                    style={{ fontSize: '1.5rem', lineHeight: '1' }}
                                >
                                    {getDepartmentShort(user?.department)}
                                </div>
                                <p className="text-sm font-semibold text-gray-800 text-center leading-tight">
                                    {user?.department || 'Department'}
                                </p>
                                <p className="text-xs text-gray-500 text-center mt-1">
                                    {user?.username} • {user?.role === 'admin' ? 'Admin' : 'Department'}
                                </p>
                            </div>

                            {/* ─── Logout Button ──────────────────────── */}
                            <button
                                onClick={handleLogout}
                                className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition rounded-b-lg font-medium"
                            >
                                <FiLogOut className="w-4 h-4 mr-3" />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* ─── Usage Guide Modal ──────────────────────────── */}
            {showUsageGuide && <UsageGuide onClose={() => setShowUsageGuide(false)} />}
        </aside>
    );
}