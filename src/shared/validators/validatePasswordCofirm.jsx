export const validatePasswordConfirm = (pass, confirmPass) => {
    return pass === confirmPass
}

export const passwordConfirmationMessage = 'Las contraseñas no coinciden'