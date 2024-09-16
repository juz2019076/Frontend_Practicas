
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login as loginRequest } from "../../services/api"
import toast from "react-hot-toast"

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const login = async (email, password) => {
        setIsLoading(true)

        const response = await loginRequest({
            email,
            password
        })
        console.log(response)

        setIsLoading(false)
        if (response.error) {
            return toast.error(
                response.e?.response?.data || 'Error al iniciar sesión'
            )
        }

        const { user } = response.data
        if (user) {
            
            localStorage.setItem('user', JSON.stringify(user))
        }else {
            localStorage.removeItem('user')
        }
        

        navigate('/')
    }
    return {
        login,
        isLoading
    }
}