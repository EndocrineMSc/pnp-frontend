import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formPostRequest } from "../../utility/apiRequests/formPostRequest";
import useUserId from "../../utility/hooks/useUserId";
import formErrorMessages from "../../utility/globalConstants/formErrorMessages";

/**Form to register new user, will also login new user immediatly, saving Access Token, Refresh Token and user id to localStorage */
const RegisterForm = () => {
  const navigate = useNavigate();
  const saveUserId = useUserId()[1];
  const [nameLength, setNameLength] = useState(0);
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordRptError, setPasswordRptError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRpt, setPasswordRpt] = useState("");

  const handleFormSubmission = async (event) => {
    const signupResult = await formPostRequest(
      event,
      `https://pnp-backend.fly.dev/api/v1/signup`,
    );

    if (signupResult.success) {
      const loginResult = await formPostRequest(
        event,
        `https://pnp-backend.fly.dev/api/v1/login`,
      );

      if (!loginResult.success) {
        setNameError(loginResult.data.message);
      } else {
        localStorage.setItem(
          "accessToken",
          "Bearer " + loginResult.data.accessToken,
        );
        localStorage.setItem("refreshToken", loginResult.data.refreshToken);
        saveUserId(loginResult.data.user);
        navigate("/campaigns");
      }
    }
  };

  useEffect(() => {
    let nError = "";
    if (nameLength === 0) {
      nError = formErrorMessages.requiredField;
    } else if (nameLength === 50) {
      nError = formErrorMessages.maxLengthReached;
    }
    setNameError(nError);

    let pwError = "";
    if (password.length === 0) {
      pwError = formErrorMessages.requiredField;
    } else if (password.length < 8) {
      pwError = formErrorMessages.shortPassword;
    } else if (password.length === 60) {
      pwError = formErrorMessages.maxLengthReached;
    } else if (password !== passwordRpt) {
      pwError = formErrorMessages.unequalPasswords;
    }
    setPasswordError(pwError);

    let pwRptError = "";
    if (password === passwordRpt) {
      pwRptError = pwError;
    } else {
      pwRptError = formErrorMessages.unequalPasswords;
    }
    setPasswordRptError(pwRptError);
  }, [nameLength, password, passwordRpt]);

  const handleNameChange = (e) => {
    setNameLength(e.target.value.length);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordRptChange = (e) => {
    setPasswordRpt(e.target.value);
  };

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <form
        className="flex flex-col rounded-xl shadow-md gap-5 bg-wgray-300 max-w-prose p-5"
        action=""
        onSubmit={handleFormSubmission}
      >
        <div className="flex gap-5 leading-9">
          <div className="flex flex-col gap-7 w-full mb-3">
            <div className="flex justify-between items-center w-full gap-5">
              <label htmlFor="username">Username</label>
              <div className="relative">
                <input
                  className={`input-base ${nameError !== "" ? "input-error" : ""}`}
                  type="text"
                  name="username"
                  id="username"
                  maxLength={50}
                  onChange={handleNameChange}
                  required
                />
                <div className="error-message">
                  {nameError ? nameError : ""}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center w-full gap-5">
              <label htmlFor="password">Password</label>
              <div className="relative">
                <input
                  className={`input-base ${passwordError !== "" ? "input-error" : ""}`}
                  type="password"
                  name="password"
                  id="password"
                  maxLength={60}
                  onChange={handlePasswordChange}
                  required
                />
                <div className="error-message">
                  {passwordError ? passwordError : ""}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center w-full gap-5">
              <label htmlFor="passwordRpt">Repeat Password</label>
              <div className="relative">
                <input
                  className={`input-base ${passwordRptError !== "" ? "input-error" : ""}`}
                  type="password"
                  name="passwordRpt"
                  id="passwordRpt"
                  onChange={handlePasswordRptChange}
                  required
                />
                <div className="error-message">
                  {passwordRptError ? passwordRptError : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end w-full gap-5">
          <button
            className="rounded-full bg-wgray-500 hover:bg-wgray-600 w-full h-10 shadow-md"
            type="submit"
          >
            Register
          </button>
        </div>
        <div>
          Already signed up?
          <Link
            className="text-wgray-700 hover:text-wgray-800 underline ml-3"
            to="/login"
          >
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
