// src/services/api.jsx

const API_URL = 'https://api.example.com'; // Reemplaza con tu API real

export const fetchRecords = async () => {
    try {
        const response = await fetch(`${API_URL}/records`);
        if (!response.ok) throw new Error('Error fetching records');
        return response.json();
    } catch (error) {
        console.error('API fetch error:', error);
        throw error;
    }
};
