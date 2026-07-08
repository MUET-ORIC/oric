import React from 'react';
import { exportCsv } from '../../api/admin';
import { FiDownload } from 'react-icons/fi';
import { showSuccess, showError } from '../../utils/toast';

export default function CsvExportButton({ filters }) {
    const handleExport = async () => {
        try {
            // ─── Clean filters (remove empty values) ──────────────────
            const cleanFilters = Object.fromEntries(
                Object.entries(filters).filter(([_, value]) => value !== '')
            );

            const res = await exportCsv(cleanFilters);

            // ─── Trigger download ──────────────────────────────────────
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'submissions.csv');
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

            showSuccess('CSV downloaded successfully');
        } catch (err) {
            console.error(err);
            showError('Failed to export CSV');
        }
    };

    return (
        <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
        >
            <FiDownload className="w-4 h-4" />
            Export CSV
        </button>
    );
}