import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboardStats } from '../../api/admin';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {
    FiPieChart,
    FiArrowLeft,
    FiAward,
    FiBook,
    FiTrendingUp,
    FiUsers,
    FiBarChart2,
    FiRefreshCw,
    FiTable,
    FiDownload,
} from 'react-icons/fi';
import { showSuccess, showError } from '../../utils/toast';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        total: 0,
        research: 0,
        innovation: 0,
        sustainability: 0,
        byDepartment: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStats = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await getDashboardStats();
            if (res.data && res.data.stats) {
                setStats(res.data.stats);
            }
        } catch (err) {
            console.error('Dashboard error:', err);
            setError('Unable to load statistics. Please try refreshing.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const cards = [
        {
            label: 'Total Submissions',
            value: stats.total || 0,
            icon: FiAward,
            bg: 'bg-blue-50',
            text: 'text-blue-600',
        },
        {
            label: 'Research Excellence',
            value: stats.research || 0,
            icon: FiBook,
            bg: 'bg-green-50',
            text: 'text-green-600',
        },
        {
            label: 'Innovation & Commercialization',
            value: stats.innovation || 0,
            icon: FiTrendingUp,
            bg: 'bg-purple-50',
            text: 'text-purple-600',
        },
        {
            label: 'Sustainability & Capacity',
            value: stats.sustainability || 0,
            icon: FiUsers,
            bg: 'bg-orange-50',
            text: 'text-orange-600',
        },
    ];

    const hasChartData = stats.byDepartment && stats.byDepartment.length > 0;

    // Sort departments by count descending for better readability
    const sortedDepts = hasChartData
        ? [...stats.byDepartment].sort((a, b) => b.count - a.count)
        : [];

    // ─── Complete Department Abbreviation Map (all 22 departments) ────
    const deptAbbr = {
        'Architecture': 'ARCH',
        'Basic Sciences & Related Studies': 'BSRS',
        'Bio-Medical Engineering': 'BME',
        'Centre of English Language & Linguistics': 'CELL',
        'Chemical Engineering': 'CHE',
        'City & Regional Planning': 'CRP',
        'Civil Engineering': 'CE',
        'Computer Systems Engineering': 'CSE',
        'Electrical Engineering': 'EE',
        'Electronic Engineering': 'ELE',
        'Environmental Engineering': 'ENV',
        'Industrial Engineering & Management': 'IEM',
        'Institute of Water Resources Engineering & Management': 'USPCASW',
        'Mechanical Engineering': 'ME',
        'Mechatronic Engineering': 'MECH',
        'Metallurgy & Materials Engineering': 'MME',
        'Mehran University Institute of Science, Technology & Development': 'MUISTD',
        'Mining Engineering': 'MN',
        'Petroleum & Natural Gas Engineering': 'PG',
        'Software Engineering': 'SW',
        'Telecommunication Engineering': 'TL',
        'Textile Engineering': 'TXE',
    };

    // ─── Fallback abbreviation generator ──────────────────────────────
    const getAbbr = (fullName) => {
        if (deptAbbr[fullName]) return deptAbbr[fullName];
        // Generate a short code from first letters of each word
        const words = fullName.split(' ');
        if (words.length === 1) return fullName.substring(0, 4).toUpperCase();
        return words
            .filter(word => word.length > 0)
            .map(word => word[0].toUpperCase())
            .join('')
            .substring(0, 6);
    };

    const chartData = {
        labels: sortedDepts.map((d) => getAbbr(d._id)),
        datasets: [
            {
                label: 'Submissions',
                data: sortedDepts.map((d) => d.count),
                backgroundColor: [
                    '#1e3a8a', '#2563eb', '#3b82f6', '#60a5fa',
                    '#93c5fd', '#bfdbfe', '#7c3aed', '#8b5cf6', '#a78bfa'
                ],
                borderRadius: 6,
                borderSkipped: false,
                barPercentage: 0.7,
            },
        ],
    };

    const chartOptions = {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                left: 10,
                right: 10,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: '#1e293b',
                titleColor: '#f1f5f9',
                bodyColor: '#cbd5e1',
                padding: 12,
                cornerRadius: 8,
                callbacks: {
                    title: (tooltipItems) => {
                        const index = tooltipItems[0].dataIndex;
                        return sortedDepts[index]._id;   // full name in tooltip
                    },
                    label: (ctx) => `${ctx.parsed.x} submissions`,
                },
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0,0,0,0.05)',
                },
                ticks: {
                    stepSize: 1,
                },
            },
            y: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 12,
                        weight: '600',
                    },
                    color: '#1f2937',
                    maxRotation: 0,
                    autoSkip: false,
                },
            },
        },
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <div className="relative">
                    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-900 rounded-full animate-spin" />
                </div>
                <p className="text-sm text-gray-500 font-medium">Loading dashboard...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <div className="p-4 bg-red-50 rounded-full">
                    <FiBarChart2 className="w-12 h-12 text-red-500" />
                </div>
                <p className="text-sm text-red-600 font-medium">{error}</p>
                <button
                    onClick={fetchStats}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* ─── Header ──────────────────────────────────────────────── */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl text-white shadow-md">
                            <FiPieChart className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
                                Admin Dashboard
                            </h1>
                            <p className="text-sm text-gray-500">
                                Overview of all KPI submissions across departments
                            </p>
                        </div>
                    </div>
                </div>
                <button
                    onClick={fetchStats}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition"
                >
                    <FiRefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                </button>
            </div>

            {/* ─── Stats Cards ──────────────────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cards.map((card) => (
                    <div
                        key={card.label}
                        className="bg-white rounded-xl border border-gray-100/80 p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {card.label}
                                </p>
                                <p className="text-2xl font-bold text-gray-800 mt-1">
                                    {card.value}
                                </p>
                            </div>
                            <div className={`p-3 rounded-xl ${card.bg} ${card.text}`}>
                                <card.icon className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ─── Chart with reduced width ────────────────────────────── */}
            <div className="bg-white rounded-xl border border-gray-100/80 p-6 shadow-sm max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wider">
                        Submissions by Department
                    </h2>
                    <span className="text-xs text-gray-400">
                        {hasChartData ? `${sortedDepts.length} departments` : 'No data'}
                    </span>
                </div>
                <div className="h-72 sm:h-80 md:h-96 w-full">
                    {hasChartData ? (
                        <Bar data={chartData} options={chartOptions} />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <FiBarChart2 className="w-12 h-12 mb-3 text-gray-300" />
                            <p className="text-sm font-medium text-gray-500">
                                No submissions yet
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                Chart will appear once departments submit KPIs
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* ─── Quick Actions ────────────────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <QuickAction
                    icon={FiTable}
                    title="View All Submissions"
                    description="Manage and review all submitted KPIs"
                    onClick={() => navigate('/admin/submissions')}
                    color="blue"
                />
                <QuickAction
                    icon={FiDownload}
                    title="Export Data"
                    description="Download submissions as CSV"
                    onClick={() => navigate('/admin/submissions')}
                    color="green"
                />
                <QuickAction
                    icon={FiUsers}
                    title="Department Overview"
                    description="View submissions by department"
                    onClick={() => {
                        const chartElement = document.querySelector('.max-w-4xl');
                        if (chartElement) {
                            chartElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        } else {
                            showInfo('No chart data available yet');
                        }
                    }}
                    color="purple"
                />
            </div>
        </div>
    );
}

function QuickAction({ icon: Icon, title, description, onClick, color }) {
    const colors = {
        blue: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
        green: 'bg-green-50 text-green-700 hover:bg-green-100',
        purple: 'bg-purple-50 text-purple-700 hover:bg-purple-100',
        orange: 'bg-orange-50 text-orange-700 hover:bg-orange-100',
    };

    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-4 p-4 rounded-xl border border-gray-100/80 shadow-sm hover:shadow-md transition-all duration-200 ${colors[color] || colors.blue}`}
        >
            <div className="p-2 bg-white/80 rounded-lg">
                <Icon className="w-5 h-5" />
            </div>
            <div className="text-left">
                <p className="font-semibold text-sm text-gray-800">{title}</p>
                <p className="text-xs text-gray-500">{description}</p>
            </div>
        </button>
    );
}