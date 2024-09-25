import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getLogins } from '../../services/api'; 

const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return 'Fecha Inválida';
    }
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    return date.toLocaleString('es-ES', options);
};

export const useGetLogins = ({ orden = 'desc', campo = 'file' }) => {

    const [logins, setLogins] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchLogins = async () => {

        try {
            setIsFetching(true);
            const response = await getLogins({ orden, campo });

            if (response.error) {
                throw new Error(response.e?.message || 'Error en la solicitud');
            }

            const loginsData = response.data.loglogin || [];

            if (Array.isArray(loginsData) && loginsData.length > 0) {
                const formattedLogins = loginsData.map(login => ({
                    ...login,
                    loginTime: formatDate(login.loginTime),
                    logoutTime: formatDate(login.logoutTime) 
                }));

                setLogins(formattedLogins);
                toast.success('Logins cargados exitosamente');
            } else {
                console.warn('No se encontraron registros de login.');
                setLogins([]);
            }
        } catch (error) {
            setErrorMessage('Error al obtener los registros de login.');
            console.error(error); 
            toast.error(error.message || 'Error al obtener los datos');
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchLogins();
    }, [orden, campo]);

    return { logins, isFetching, errorMessage };
};