// src/validators/index.js

export const validateField = (field, value) => {
    if (!value || value.trim() === '') {
        return `${field} no puede estar vacío.`;
    }
    return '';
};
