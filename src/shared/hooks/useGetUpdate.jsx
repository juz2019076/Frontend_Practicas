import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getUpdates } from '../../services/api';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return 'Fecha Inválida';
    }
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    return date.toLocaleString('es-ES', options);
};

export const useGetUpdate = ({ orden = 'desc', campo = 'Nombre_Tabla' }) => {

    const [updates, setUpdates] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchUpdates = async () => {
        try {
            setIsFetching(true);
            const response = await getUpdates({ orden, campo });


            if (response.error) {
                throw new Error(response.e?.message || 'Error en la solicitud');
            }

            const updatesData = response.data.logupdate || [];


            if (Array.isArray(updatesData) && updatesData.length > 0) {
                const formattedUpdates = updatesData.map(update => ({
                    ...update,
                    Fecha_de_Registro: formatDate(update.Fecha_de_Registro)
                }));

                setUpdates(formattedUpdates);
            } else {
                console.warn('No se encontraron actualizaciones.');
                setUpdates([]);
            }
        } catch (error) {
            setErrorMessage('Error al obtener las actualizaciones.');
            toast.error(error.message || 'Error al obtener los datos');
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchUpdates();
    }, [orden, campo]);

    return { updates, isFetching, errorMessage };
};