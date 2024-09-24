import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getLogins } from '../../services/api'; 

const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return 'Fecha Inválida';
    }
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('es-ES', options);
};

export const useGetLogins = ({ orden = 'desc', campo = 'file' }) => {
    const [logins, setLogins] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchLogins = async () => {
        try {
            setIsFetching(true);
            const response = await getLogins({ orden, campo });

            console.log('Respuesta del servidor:', response); 

            if (response.error) {
                throw new Error(response.e?.message || 'Error en la solicitud');
            }

            const loginsData = response.data.loglogin || [];
            console.log('Datos de logins:', loginsData); 

            if (Array.isArray(loginsData) && loginsData.length > 0) {
                const formattedLogins = loginsData.map(login => ({
                    ...login,
                    fecha_creacion: formatDate(login.loginTime) 
                }));

                setLogins(formattedLogins);
                console.log('Logins formateados:', formattedLogins); 
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