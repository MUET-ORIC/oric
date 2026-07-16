import React, { useState, useEffect } from 'react';
import { getSubmissions, deleteSubmission } from '../../api/admin';
import FilterBar from '../../components/admin/FilterBar';
import SubmissionsTable from '../../components/admin/SubmissionsTable';
import CsvExportButton from '../../components/admin/CsvExportButton';
import EditSubmissionModal from '../../components/admin/EditSubmissionModal';
import { FiRefreshCw } from 'react-icons/fi';
import { showSuccess, showError } from '../../utils/toast';

export default function ManageSubmissions() {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
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
    const [total, setTotal] = useState(0);
    const [editingSubmission, setEditingSubmission] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const cleanFilters = Object.fromEntries(
                Object.entries(filters).filter(([_, value]) => value !== '')
            );
            const res = await getSubmissions(cleanFilters);
            setSubmissions(res.data.submissions);
            setTotal(res.data.total);
        } catch (err) {
            console.error(err);
            showError('Failed to load submissions');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [filters]);

    const handleDelete = async (id) => {
        if (window.confirm('Delete this submission?')) {
            try {
                await deleteSubmission(id);
                showSuccess('Deleted successfully');
                fetchData();
            } catch {
                showError('Failed to delete');
            }
        }
    };

    const handleEditClick = (submission) => {
        console.log('📝 Editing submission:', submission._id, submission.kpi);
        setEditingSubmission(submission);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-blue-900">All Submissions</h1>
                    <button
                        onClick={fetchData}
                        className="p-2 text-gray-500 hover:text-blue-900 hover:bg-blue-50 rounded-full transition"
                        title="Refresh"
                    >
                        <FiRefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
                <CsvExportButton filters={filters} />
            </div>

            <FilterBar filters={filters} setFilters={setFilters} />

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <SubmissionsTable
                    data={submissions}
                    loading={loading}
                    onDelete={handleDelete}
                    onPageChange={(page) => setFilters({ ...filters, page })}
                    total={total}
                    page={filters.page}
                    limit={filters.limit}
                    onEdit={handleEditClick}
                />
            </div>


            {editingSubmission && (
                <EditSubmissionModal
                    key={editingSubmission._id}
                    submission={editingSubmission}
                    onClose={() => setEditingSubmission(null)}
                    onUpdate={fetchData}
                />
            )}
        </div>
    );
}