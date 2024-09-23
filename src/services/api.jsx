// src/services/api.jsx
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:3000/v1',
    timeout: 5000
})

apiClient.interceptors.request.use(
    (config) => {
        const userDetails = localStorage.getItem('user');

        if (userDetails) {
            const token = JSON.parse(userDetails).token;
            config.headers.Authorization = `${token}`; 
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.data && error.response.data.token) {
            console.log('Nuevo token recibido:', error.response.data.token); 

            try {
                localStorage.setItem('user', JSON.stringify({ token: error.response.data.token }));
                console.log('Token guardado en localStorage');
            } catch (e) {
                console.error('Error al guardar el token en localStorage:', e);
            }
        } else {
            console.log('No se recibió un token en la respuesta de error');
        }
        return Promise.reject(error);
    }
);

export const login = async (data) => {
    try {
        console.log({data})
        return await apiClient.post('/usuarios/login', data)
        
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}


export const uploadFile = async (fileData) => {
    try {
        return await apiClient.post('/upload', fileData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    } catch (e) {
        return {
            error: true,
            e,
        };
    }
};

export const getPersonales = async ({ orden, campo }) => {
    try {
        const response = await apiClient.get('/personal', {
            params: { orden, campo }
        });
        return response;
    } catch (e) {
        return {
            error: true,
            e
        };
    }
}