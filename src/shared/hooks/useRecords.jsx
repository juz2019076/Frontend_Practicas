// src/shared/hooks/useRecords.jsx
import { useState, useEffect } from 'react';
import { fetchRecords } from '../../services/api';

export const useRecords = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadRecords = async () => {
            try {
                const data = await fetchRecords();
                setRecords(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadRecords();
    }, []);

    return { records, loading, error };
};
