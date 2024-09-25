
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login as loginRequest } from "../../services/api"
import toast from "react-hot-toast"

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const login = async (email, password) => {
        setIsLoading(true);

        try {
            const response = await loginRequest({ email, password });

            setIsLoading(false);

            if (response.error) {
                toast.error(response.e?.response?.data || 'Error al iniciar sesión');
                return;
            }

            const { token } = response.data;

            if (token) {
                localStorage.setItem('user', JSON.stringify({ token, email }));
            } else {
                localStorage.removeItem('user');
            }

            navigate('/home');
        } catch (error) {
            console.error('Error en la solicitud de inicio de sesión:', error);
            toast.error('Error al iniciar sesión');
            setIsLoading(false);
        }
    };

    return {
        login,
        isLoading
    };
};