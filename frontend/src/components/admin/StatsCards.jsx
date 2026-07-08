import React from 'react';
import { FiAward, FiBook, FiTrendingUp, FiUsers } from 'react-icons/fi';

export default function StatsCards({ stats }) {
    const cards = [
        { label: 'Total Submissions', value: stats.total, icon: FiAward, color: 'blue' },
        { label: 'Research', value: stats.research, icon: FiBook, color: 'green' },
        { label: 'Innovation', value: stats.innovation, icon: FiTrendingUp, color: 'purple' },
        { label: 'Sustainability', value: stats.sustainability, icon: FiUsers, color: 'orange' },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card) => (
                <div key={card.label} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">{card.label}</p>
                            <p className="text-2xl font-bold text-gray-800 mt-1">{card.value}</p>
                        </div>
                        <div className={`p-3 rounded-full bg-${card.color}-50 text-${card.color}-600`}>
                            <card.icon className="w-6 h-6" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}