/* eslint-disable react/prop-types */
import { useState } from "react";
import { Input } from "./Input";
import {
  emailValidationMessage,
  passwordValidationMessage,
  validateEmail,
  validatePassword,
} from "../shared/validators";
import { useLogin } from "../shared/hooks";

export const Login = ({ switchAuthHandler }) => {
  const { login, isLoading } = useLogin();

  const [formState, setFormState] = useState({
    email: {
      value: "",
      isValid: false,
      showError: false,
    },
    password: {
      value: "",
      isValid: false,
      showError: false,
    },
  });

  const handleInputValueChange = (value, field) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        value,
      },
    }));
  };

  const handleInputValidationOnBlur = (value, field) => {
    let isValid = false;
    switch (field) {
      case "email":
        isValid = validateEmail(value);
        break;
      case "password":
        isValid = validatePassword(value);
        break;
      default:
        break;
    }
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        isValid,
        showError: !isValid,
      },
    }));
  };

  const handleLogin = (event) => {
    event.preventDefault();
    login(formState.email.value, formState.password.value);
  };

  const isSubmitButtonDisabled =
    isLoading || !formState.password.isValid || !formState.email.isValid;

  return (
    <div className="container">
      <div className="login-box">
        <div className="login-box-title">
          <img src="/src/assets/img/techlogix.png" alt="Logo" className="login-logo" />
        </div>
        <form>
          <h1 className="login-title">¡Bienvenido de nuevo!</h1>
          <div className="input-group">
            <Input
              field="email"
              label="Correo electrónico"
              value={formState.email.value}
              onChangeHandler={handleInputValueChange}
              type="text"
              onBlurHandler={handleInputValidationOnBlur}
              showErrorMessage={formState.email.showError}
              validationMessage={emailValidationMessage}
            />
          </div>
          <div className="input-group">
            <Input
              field="password"
              label="Contraseña"
              value={formState.password.value}
              onChangeHandler={handleInputValueChange}
              type="password"
              onBlurHandler={handleInputValidationOnBlur}
              showErrorMessage={formState.password.showError}
              validationMessage={passwordValidationMessage}
            />
          </div>
          <button
            className="submit"
            onClick={handleLogin}
            disabled={isSubmitButtonDisabled}
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};
