import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    FiFolder,
    FiUser,
    FiArrowRight,
    FiFileText,
    FiTrendingUp,
    FiAward,
    FiBook,
    FiDollarSign,
    FiCalendar,
} from 'react-icons/fi';
import { useMySubmissions } from '../../hooks/useSubmissions';
import { motion } from 'framer-motion';

export default function DepartmentDashboard() {
    const { user } = useAuth();
    const { submissions, loading } = useMySubmissions();

    // ─── Compute counts by module ──────────────────────────────────
    const total = submissions?.length || 0;
    const researchCount = submissions?.filter(s => s.module === 'ResearchExcellence').length || 0;
    const innovationCount = submissions?.filter(s => s.module === 'InnovationCommercialization').length || 0;
    const sustainabilityCount = submissions?.filter(s => s.module === 'SustainabilityCapacityBuilding').length || 0;

    const getDepartmentShort = (dept) => {
        if (!dept) return '??';
        const parts = dept.split(' ');
        if (parts.length === 1) return dept.slice(0, 2).toUpperCase();
        const initials = parts.map((p) => p[0]).join('');
        return initials.slice(0, 2).toUpperCase();
    };

    // ─── Quick action cards ────────────────────────────────────────
    const actions = [
        {
            to: '/research',
            icon: FiBook,
            title: 'Research Excellence',
            description: 'Submit Research KPIs',
            color: 'blue',
            gradient: 'from-blue-500 to-blue-700',
        },
        {
            to: '/innovation',
            icon: FiTrendingUp,
            title: 'Innovation & Commercialization',
            description: 'Submit Innovation KPIs',
            color: 'emerald',
            gradient: 'from-emerald-500 to-emerald-700',
        },
        {
            to: '/sustainability',
            icon: FiAward,
            title: 'Sustainability & Capacity',
            description: 'Submit Sustainability KPIs',
            color: 'purple',
            gradient: 'from-purple-500 to-purple-700',
        },
        {
            to: '/my-submissions',
            icon: FiFolder,
            title: 'My Submissions',
            description: 'View all submitted KPIs',
            color: 'orange',
            gradient: 'from-orange-500 to-orange-700',
        },
    ];

    // ─── Animation variants ──────────────────────────────────────
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    // ─── Stats cards configuration ──────────────────────────────
    const stats = [
        {
            label: 'Total Submissions',
            value: total,
            icon: FiFileText,
            color: 'blue',
            gradient: 'from-blue-700 to-blue-900',
            progress: total > 0 ? 100 : 0,
        },
        {
            label: 'Research KPIs',
            value: researchCount,
            icon: FiBook,
            color: 'emerald',
            gradient: 'from-emerald-600 to-emerald-800',
            progress: total > 0 ? Math.round((researchCount / total) * 100) : 0,
        },
        {
            label: 'Innovation KPIs',
            value: innovationCount,
            icon: FiTrendingUp,
            color: 'purple',
            gradient: 'from-purple-600 to-purple-800',
            progress: total > 0 ? Math.round((innovationCount / total) * 100) : 0,
        },
        {
            label: 'Sustainability KPIs',
            value: sustainabilityCount,
            icon: FiAward,
            color: 'orange',
            gradient: 'from-orange-600 to-orange-800',
            progress: total > 0 ? Math.round((sustainabilityCount / total) * 100) : 0,
        },
    ];

    // ─── Loading state ────────────────────────────────────────────
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-900 rounded-full animate-spin" />
                <p className="text-sm text-gray-500 font-medium">Loading dashboard...</p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto space-y-8 px-4"
        >
            {/* ─── Welcome Section ──────────────────────────────────── */}
            <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900/10 via-blue-50/50 to-indigo-50/30 border border-blue-100/50 shadow-sm p-6 md:p-8"
            >
                {/* Decorative accent */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-900/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="flex items-center gap-5">
                        <div className="relative">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-900 to-indigo-700 text-white flex items-center justify-center text-3xl font-bold shadow-lg ring-4 ring-white/50">
                                {getDepartmentShort(user?.department)}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-400 rounded-full border-2 border-white shadow-sm" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                                Welcome back, <span className="text-blue-900">{user?.username || 'User'}</span>
                            </h1>
                            <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                <FiUser className="w-4 h-4 text-blue-600" />
                                {user?.department || 'Department'}
                            </p>
                        </div>
                    </div>
                    <div className="sm:ml-auto">
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-white/70 backdrop-blur-sm text-gray-600 border border-gray-200/50 shadow-sm">
                            {user?.role === 'admin' ? 'Administrator' : 'Department User'}
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* ─── Stats Grid ───────────────────────────────────────── */}
            <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="group bg-white rounded-xl border border-gray-100/80 shadow-sm hover:shadow-lg transition-all duration-300 p-6 hover:-translate-y-0.5"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                                    {stat.label}
                                </p>
                                <p className="text-3xl font-bold text-gray-800 mt-2">
                                    {stat.value}
                                </p>
                            </div>
                            <div className={`p-3 rounded-xl bg-${stat.color}-50 text-${stat.color}-600 group-hover:scale-110 transition-transform duration-300`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="mt-4 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full transition-all duration-1000`}
                                style={{ width: `${stat.progress}%` }}
                            />
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* ─── Quick Action Cards ────────────────────────────────── */}
            <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
                {actions.map((action) => {
                    const colorClasses = {
                        blue: 'bg-blue-50 text-blue-600 group-hover:bg-blue-100',
                        emerald: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100',
                        purple: 'bg-purple-50 text-purple-600 group-hover:bg-purple-100',
                        orange: 'bg-orange-50 text-orange-600 group-hover:bg-orange-100',
                    };
                    const borderColors = {
                        blue: 'border-blue-200 hover:border-blue-400',
                        emerald: 'border-emerald-200 hover:border-emerald-400',
                        purple: 'border-purple-200 hover:border-purple-400',
                        orange: 'border-orange-200 hover:border-orange-400',
                    };
                    return (
                        <Link
                            key={action.to}
                            to={action.to}
                            className={`group relative bg-white rounded-xl border ${borderColors[action.color]} shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden p-6`}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl`} />
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className={`p-4 rounded-2xl ${colorClasses[action.color]} transition-all duration-300 group-hover:scale-110`}>
                                    <action.icon className="w-8 h-8" />
                                </div>
                                <h3 className="font-semibold text-gray-800 mt-4 group-hover:text-blue-900 transition-colors">
                                    {action.title}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">{action.description}</p>
                                <div className="mt-4 text-xs font-medium text-blue-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                                    Click to proceed <FiArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </motion.div>

            {/* ─── Department Information ────────────────────────────── */}
            <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 rounded-xl border border-blue-100/50 p-6 shadow-sm"
            >
                <div className="flex flex-col sm:flex-row items-start gap-5">
                    <div className="p-3 bg-white/70 backdrop-blur-sm rounded-xl text-blue-900 shadow-sm ring-1 ring-blue-100/50">
                        <FiUser className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-sm">Department Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 mt-2 text-sm">
                            <p className="text-gray-600">
                                <span className="font-medium text-gray-700">Name:</span> {user?.department || 'Not assigned'}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium text-gray-700">Role:</span> {user?.role === 'admin' ? 'Administrator' : 'Department User'}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium text-gray-700">Username:</span> {user?.username}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium text-gray-700">Total Submissions:</span> {total}
                            </p>
                        </div>
                        <p className="text-xs text-gray-400 mt-3">For any issues, please contact the ORIC administrator.</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}