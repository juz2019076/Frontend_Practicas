import { useState } from 'react';
import { postLogVista } from '../../services/api'; 

export const useLogVista = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const logVista = async (usuario, pagina) => {
        setLoading(true);
        setError(null);

        const response = await postLogVista({ usuario, pagina });

        if (response.error) {
            setError(response.e);
        }

        setLoading(false);
        return response;
    };

    return { logVista, loading, error };
};

