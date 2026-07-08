import React, { useState } from 'react';
import { departments, modules } from '../../utils/constants';
import { FiSearch, FiX, FiCalendar } from 'react-icons/fi';

export default function FilterBar({ filters, setFilters }) {
    const depts = ['All Departments', ...departments];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value === 'All Departments' ? '' : value,
            page: 1,
        }));
    };

    const clearFilters = () => {
        setFilters({
            page: 1,
            limit: 10,
            module: '',
            kpi: '',
            department: '',
            startDate: '',
            endDate: '',
            search: '',
            submittedBy: '',
        });
    };

    // Count active filters
    const activeCount = () => {
        let count = 0;
        if (filters.module) count++;
        if (filters.kpi) count++;
        if (filters.department) count++;
        if (filters.startDate) count++;
        if (filters.endDate) count++;
        if (filters.search) count++;
        if (filters.submittedBy) count++;
        return count;
    };

    const totalActive = activeCount();

    // Quick date presets
    const setDateRange = (days) => {
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - days);
        setFilters((prev) => ({
            ...prev,
            startDate: start.toISOString().split('T')[0],
            endDate: end.toISOString().split('T')[0],
            page: 1,
        }));
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 overflow-hidden">
            {/* ─── Top Bar ────────────────────────────────────────────── */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-gray-50/30 border-b border-gray-100/60">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="font-medium text-gray-700">Filters</span>
                    {totalActive > 0 && (
                        <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-medium text-white bg-blue-600 rounded-full">
                            {totalActive}
                        </span>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                    {/* Quick date presets */}
                    <div className="flex items-center gap-0.5">
                        {['Today', 'Week', 'Month', 'Year'].map((label, i) => {
                            const days = [1, 7, 30, 365][i];
                            return (
                                <button
                                    key={label}
                                    onClick={() => setDateRange(days)}
                                    className="px-2.5 py-1 text-xs font-medium text-gray-500 hover:bg-gray-200 rounded-md transition"
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>

                    {totalActive > 0 && (
                        <button
                            onClick={clearFilters}
                            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-red-500 hover:bg-red-50 rounded-md transition"
                        >
                            <FiX className="w-3.5 h-3.5" />
                            Clear
                        </button>
                    )}
                </div>
            </div>

            {/* ─── Main Filter Area ──────────────────────────────────── */}
            <div className="p-4 space-y-3">
                {/* ─── Row 1: Search ──────────────────────────────────── */}
                <div className="relative">
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        name="search"
                        value={filters.search || ''}
                        onChange={handleChange}
                        placeholder="Search by KPI or username..."
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm bg-white placeholder:text-gray-400"
                    />
                </div>

                {/* ─── Row 2: Dropdowns ────────────────────────────────── */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Module</label>
                        <select
                            name="module"
                            value={filters.module || ''}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm bg-white"
                        >
                            <option value="">All</option>
                            {Object.values(modules).map((m) => (
                                <option key={m} value={m}>
                                    {m.replace(/([A-Z])/g, ' $1').trim()}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">KPI</label>
                        <select
                            name="kpi"
                            value={filters.kpi || ''}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm bg-white"
                        >
                            <option value="">All</option>
                            {Array.from({ length: 18 }, (_, i) => `KPI${i + 1}`).map((k) => (
                                <option key={k} value={k}>{k}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Department</label>
                        <select
                            name="department"
                            value={filters.department || ''}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm bg-white"
                        >
                            {depts.map((d) => (
                                <option key={d} value={d === 'All Departments' ? '' : d}>
                                    {d}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1 flex items-center gap-1">
                            <FiCalendar className="w-3.5 h-3.5" />
                            From
                        </label>
                        <input
                            type="date"
                            name="startDate"
                            value={filters.startDate || ''}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm bg-white"
                        />
                    </div>
                </div>

                {/* ─── Row 3: Extra ────────────────────────────────────── */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1 flex items-center gap-1">
                            <FiCalendar className="w-3.5 h-3.5" />
                            To
                        </label>
                        <input
                            type="date"
                            name="endDate"
                            value={filters.endDate || ''}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm bg-white"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Submitted By</label>
                        <input
                            type="text"
                            name="submittedBy"
                            value={filters.submittedBy || ''}
                            onChange={handleChange}
                            placeholder="Username"
                            className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm bg-white placeholder:text-gray-400"
                        />
                    </div>
                </div>

                {/* ─── Active Filters ──────────────────────────────────── */}
                {totalActive > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-100/60">
                        {filters.module && <Chip label={`Module: ${filters.module}`} onRemove={() => setFilters((p) => ({ ...p, module: '', page: 1 }))} />}
                        {filters.kpi && <Chip label={`KPI: ${filters.kpi}`} onRemove={() => setFilters((p) => ({ ...p, kpi: '', page: 1 }))} />}
                        {filters.department && <Chip label={`Dept: ${filters.department}`} onRemove={() => setFilters((p) => ({ ...p, department: '', page: 1 }))} />}
                        {filters.startDate && <Chip label={`From: ${filters.startDate}`} onRemove={() => setFilters((p) => ({ ...p, startDate: '', page: 1 }))} />}
                        {filters.endDate && <Chip label={`To: ${filters.endDate}`} onRemove={() => setFilters((p) => ({ ...p, endDate: '', page: 1 }))} />}
                        {filters.search && <Chip label={`Search: ${filters.search}`} onRemove={() => setFilters((p) => ({ ...p, search: '', page: 1 }))} />}
                        {filters.submittedBy && <Chip label={`User: ${filters.submittedBy}`} onRemove={() => setFilters((p) => ({ ...p, submittedBy: '', page: 1 }))} />}
                    </div>
                )}

                {/* ─── Hint ────────────────────────────────────────────── */}
                <div className="text-xs text-gray-400 pt-0.5">
                    {totalActive === 0 ? (
                        <span>💡 Use filters to narrow down results.</span>
                    ) : (
                        <span>{totalActive} filter{totalActive > 1 ? 's' : ''} applied.</span>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── Chip ───────────────────────────────────────────────────────────
function Chip({ label, onRemove }) {
    return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
            {label}
            <button
                onClick={onRemove}
                className="hover:text-blue-900 transition"
                aria-label="Remove filter"
            >
                <FiX className="w-3.5 h-3.5" />
            </button>
        </span>
    );
}