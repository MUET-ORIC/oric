import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getKpiDefinitions } from '../../api/kpiDefinitions';
import DynamicKpiForm from '../../components/department/DynamicKpiForm';
import { FiArrowLeft } from 'react-icons/fi';

export default function SubmitKpiPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [definitions, setDefinitions] = useState(null);
    const [selectedModule, setSelectedModule] = useState('ResearchExcellence');
    const [selectedKpi, setSelectedKpi] = useState('KPI1');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getKpiDefinitions()
            .then(data => {
                setDefinitions(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="inline-block w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
                <span className="ml-3 text-gray-500">Loading KPI definitions...</span>
            </div>
        );
    }

    if (!definitions) {
        return <div className="text-center py-10 text-red-500">Failed to load KPI definitions</div>;
    }

    const modules = Object.keys(definitions);
    const kpis = definitions[selectedModule] ? Object.keys(definitions[selectedModule]) : [];

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-3">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 text-gray-500 hover:text-blue-900 hover:bg-blue-50 rounded-xl transition"
                    aria-label="Go back"
                >
                    <FiArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-2xl font-bold text-blue-900">Submit KPI</h1>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Module</label>
                        <select
                            value={selectedModule}
                            onChange={(e) => {
                                setSelectedModule(e.target.value);
                                setSelectedKpi('KPI1');
                            }}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-900 focus:border-transparent transition"
                        >
                            {modules.map((m) => (
                                <option key={m} value={m}>
                                    {m.replace(/([A-Z])/g, ' $1').trim()}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">KPI</label>
                        <select
                            value={selectedKpi}
                            onChange={(e) => setSelectedKpi(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-900 focus:border-transparent transition"
                        >
                            {kpis.map((k) => (
                                <option key={k} value={k}>
                                    {k}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <DynamicKpiForm
                module={selectedModule}
                kpi={selectedKpi}
                department={user.department}
                definitions={definitions}
            />
        </div>
    );
}