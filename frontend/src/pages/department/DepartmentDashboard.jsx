import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiFolder, FiUser, FiBarChart2, FiClock, FiCheckCircle, FiArrowRight } from 'react-icons/fi';

export default function DepartmentDashboard() {
    const { user } = useAuth();

    const getDepartmentShort = (dept) => {
        if (!dept) return '??';
        const parts = dept.split(' ');
        if (parts.length === 1) return dept.slice(0, 2).toUpperCase();
        const initials = parts.map((p) => p[0]).join('');
        return initials.slice(0, 2).toUpperCase();
    };

    const actions = [
        {
            to: '/research',
            icon: FiBarChart2,
            title: 'Research Excellence',
            description: 'Submit Research KPIs',
            color: 'blue',
        },
        {
            to: '/innovation',
            icon: FiBarChart2,
            title: 'Innovation & Commercialization',
            description: 'Submit Innovation KPIs',
            color: 'green',
        },
        {
            to: '/sustainability',
            icon: FiBarChart2,
            title: 'Sustainability & Capacity Building',
            description: 'Submit Sustainability KPIs',
            color: 'purple',
        },
        {
            to: '/my-submissions',
            icon: FiFolder,
            title: 'My Submissions',
            description: 'View your submitted KPIs',
            color: 'orange',
        },
    ];

    const stats = [
        { label: 'Total Submissions', value: '--', icon: FiBarChart2 },
        { label: 'Pending Review', value: '--', icon: FiClock },
        { label: 'Completed', value: '--', icon: FiCheckCircle },
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="bg-white rounded-xl border border-gray-100/80 shadow-sm p-6 md:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 text-white flex items-center justify-center text-2xl font-bold shadow-md flex-shrink-0">
                            {getDepartmentShort(user?.department)}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
                                Welcome, {user?.username || 'User'}
                            </h1>
                            <p className="text-sm text-gray-500 flex items-center gap-2">
                                <FiUser className="w-4 h-4" />
                                {user?.department || 'Department'}
                            </p>
                        </div>
                    </div>
                    <div className="sm:ml-auto text-sm text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg">
                        {user?.role === 'admin' ? 'Administrator' : 'Department User'}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white rounded-xl border border-gray-100/80 p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{stat.label}</p>
                                <p className="text-xl font-bold text-gray-800">{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {actions.map((action) => {
                    const colorClasses = {
                        blue: 'hover:border-blue-300 hover:shadow-blue-100/50',
                        green: 'hover:border-green-300 hover:shadow-green-100/50',
                        purple: 'hover:border-purple-300 hover:shadow-purple-100/50',
                        orange: 'hover:border-orange-300 hover:shadow-orange-100/50',
                    };
                    return (
                        <Link
                            key={action.to}
                            to={action.to}
                            className={`bg-white rounded-xl border border-gray-100/80 p-6 shadow-sm hover:shadow-lg transition-all duration-300 ${colorClasses[action.color] || colorClasses.blue} group`}
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="p-4 bg-blue-50 rounded-2xl group-hover:bg-blue-100 transition-colors duration-200">
                                    <action.icon className="w-8 h-8 text-blue-900" />
                                </div>
                                <h3 className="font-semibold text-gray-800 mt-4">{action.title}</h3>
                                <p className="text-sm text-gray-500 mt-1">{action.description}</p>
                                <div className="mt-4 text-xs font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1">
                                    Click to proceed <FiArrowRight className="w-3 h-3" />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100/30 rounded-xl border border-blue-200/50 p-6">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-white/80 rounded-xl text-blue-700">
                        <FiUser className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800 text-sm">Department Information</h3>
                        <p className="text-sm text-gray-600 mt-1"><strong>Name:</strong> {user?.department || 'Not assigned'}</p>
                        <p className="text-sm text-gray-600"><strong>Role:</strong> {user?.role === 'admin' ? 'Administrator' : 'Department User'}</p>
                        <p className="text-sm text-gray-600"><strong>Username:</strong> {user?.username}</p>
                        <p className="text-xs text-gray-400 mt-2">For any issues, please contact the ORIC administrator.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}