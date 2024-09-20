// src/components/Input.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './Input.css'; // Importamos estilos

const Input = ({ field, label, value, onChangeHandler, type, onBlurHandler, textarea }) => {
    const handleValueChange = (event) => {
        onChangeHandler(event.target.value, field);
    };

    const handleInputBlur = (event) => {
        onBlurHandler(event.target.value, field);
    };

    return (
        <div className="input-container">
            {label && <label>{label}</label>}
            {textarea ? (
                <textarea
                    value={value}
                    onChange={handleValueChange}
                    onBlur={handleInputBlur}
                    rows={5}
                    className="input-textarea"
                />
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={handleValueChange}
                    onBlur={handleInputBlur}
                    className="input-field"
                />
            )}
        </div>
    );
};

Input.propTypes = {
    field: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChangeHandler: PropTypes.func.isRequired,
    type: PropTypes.string,
    onBlurHandler: PropTypes.func,
    textarea: PropTypes.bool
};

Input.defaultProps = {
    type: 'text',
    textarea: false
};

export default Input;
