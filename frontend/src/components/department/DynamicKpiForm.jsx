import React, { useState } from 'react';
import { submitKpi } from '../../api/submissions';
import toast from 'react-hot-toast';
import Field from '../common/Field';
import ReviewStep from './ReviewStep';

export default function DynamicKpiForm({ module, kpi, department, definitions }) {
    const [formData, setFormData] = useState({});
    const [pdfFile, setPdfFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [showReview, setShowReview] = useState(false);

    const def = definitions?.[module]?.[kpi];
    if (!def) return <div className="text-center py-10 text-red-500">KPI definition not found</div>;

    const headers = def.headers.filter(h => h.id !== 'sr' && h.id !== 'document');

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setPdfFile(files[0]);
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            await submitKpi(module, kpi, department, formData, pdfFile);
            toast.success('KPI submitted successfully');
            setFormData({});
            setPdfFile(null);
            setShowReview(false);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Submission failed');
        } finally {
            setSubmitting(false);
        }
    };

    if (showReview) {
        return (
            <ReviewStep
                formData={formData}
                pdfFile={pdfFile}
                headers={headers}
                onBack={() => setShowReview(false)}
                onSubmit={handleSubmit}
                submitting={submitting}
            />
        );
    }

    return (
        <form onSubmit={(e) => { e.preventDefault(); setShowReview(true); }} className="space-y-4">
            {headers.map((h) => (
                <Field
                    key={h.id}
                    label={h.title}
                    name={h.id}
                    type={h.id.includes('Date') || h.id.includes('date') ? 'date' : 'text'}
                    value={formData[h.id] || ''}
                    onChange={handleChange}
                    required
                />
            ))}
            <Field
                label="Upload Evidence (PDF)"
                name="pdf"
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleChange}
                required
            />
            <button type="submit" className="w-full py-3 bg-blue-900 text-white rounded-xl hover:bg-blue-800 transition">
                Review & Submit
            </button>
        </form>
    );
}