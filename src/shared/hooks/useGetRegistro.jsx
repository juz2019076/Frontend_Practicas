import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getRegistros } from '../../services/api';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return 'Fecha Inválida'; 
    }
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('es-ES', options);
};
export const useGetRegistros = ({ orden, campo }) => {
    const [registros, setRegistros] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchRegistros = async () => {
        try {
            setIsFetching(true);
            const response = await getRegistros({ orden, campo });

            console.log('Respuesta de la API:', response);

            if (response.error) {
                throw new Error(response.e?.message || 'Error en la solicitud');
            }

            const { data } = response;
            const registrosObtenidos = data?.registro || [];

            const registrosFormateados = registrosObtenidos.map(registro => {
                console.log('Fecha original:', registro.fecha_creacion); 
                return {
                    ...registro,
                    fecha_creacion: formatDate(registro.fecha_creacion)
                };
            });

            setRegistros(registrosFormateados);
            toast.success('Datos cargados exitosamente');
        } catch (error) {
            setErrorMessage('Error al obtener los registros.');
            toast.error(error.message || 'Error al obtener los datos');
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchRegistros();
    }, [orden, campo]);

    return {
        registros,
        isFetching,
        errorMessage,
    };
};