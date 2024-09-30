/* eslint-disable react/prop-types */
export const Input = ({
    field,
    label,
    value,
    onChangeHandler,
    type,
    showErrorMessage,
    validationMessage,
    onBlurHandler,
    textarea,
  }) => {
    const handleValueChange = (event) => {
      onChangeHandler(event.target.value, field);
    };
  
    const handleInputBlur = (event) => {
      onBlurHandler(event.target.value, field);
    };
  
    return (
      <>
        <div className="auth-form-label">
          <span>{label}</span>
        </div>
        {textarea ? (
          <textarea
            type={type}
            value={value}
            onChange={handleValueChange}
            onBlur={handleInputBlur}
            rows={5}
            style={{ maxWidth: '400px' }}
            className={showErrorMessage ? "input-error-field" : ""}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={handleValueChange}
            onBlur={handleInputBlur}
            className={showErrorMessage ? "input-error-field" : ""}
          />
        )}
        {showErrorMessage && (
          <span className="auth-form-validations-message">
            {validationMessage}
          </span>
        )}
      </>
    );
  };
  