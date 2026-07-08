import { useState, useEffect } from 'react';
import { getMySubmissions } from '../api/submissions';

export const useMySubmissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        setLoading(true);
        getMySubmissions()
            .then(res => setSubmissions(res.submissions || []))
            .catch(() => { })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { submissions, loading, refetch: fetchData };
};