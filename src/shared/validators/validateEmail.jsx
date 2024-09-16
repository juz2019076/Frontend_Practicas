
export const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/
    
    return regex.test(email)
}

export const emailValidationMessage = 'Por favor ingrese una dirección de correo valida'