import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formPostRequest } from "../../utility/apiRequests/formPostRequest";
import { apiRequest } from "../../utility/apiRequests/apiRequest";
import formErrorMessages from "../../utility/globalConstants/formErrorMessages";
import useUserId from "../../utility/hooks/useUserId";
import useCampaignId from "../../utility/hooks/useCampaignId";

/**Login Form. Saves Access Token, Refresh Token and User Id into localStorage on successful login */
const LoginForm = () => {
  const navigate = useNavigate();
  const saveUserId = useUserId()[1];
  const saveCampaignId = useCampaignId()[1];
  const [nameLength, setNameLength] = useState(0);
  const [passwordLength, setPasswordLength] = useState(0);
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleFormSubmission = async (event) => {
    const userResult = await formPostRequest(
      event,
      `https://pnp-backend.fly.dev/api/v1/login`,
    );

    if (userResult.success) {
      localStorage.setItem(
        "accessToken",
        "Bearer " + userResult.data.accessToken,
      );
      localStorage.setItem("refreshToken", userResult.data.refreshToken);
      saveUserId(userResult.data.user);

      console.log(
        `https://pnp-backend.fly.dev/api/v1/${userResult.data.user._id}/campaigns`,
      );
      const campaignResult = await apiRequest(
        "GET",
        `https://pnp-backend.fly.dev/api/v1/${userResult.data.user}/campaigns`,
      );

      if (campaignResult.success) {
        const defaultCampaign = campaignResult.data[0];
        if (defaultCampaign) saveCampaignId(defaultCampaign._id);
      }
      navigate("/notes");
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
    if (passwordLength === 0) {
      pwError = formErrorMessages.requiredField;
    } else if (passwordLength < 8) {
      pwError = formErrorMessages.shortPassword;
    } else if (passwordLength === 60) {
      pwError = formErrorMessages.maxLengthReached;
    }
    setPasswordError(pwError);
  }, [nameLength, passwordLength]);

  const handleNameChange = (e) => {
    setNameLength(e.target.value.length);
  };

  const handlePasswordChange = (e) => {
    setPasswordLength(e.target.value.length);
  };

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <form
        className="flex flex-col rounded-xl shadow-md gap-5 bg-wgray-300 max-w-prose p-5"
        action=""
        onSubmit={handleFormSubmission}
      >
        <div className="flex gap-5 leading-9 mb-3">
          <div className="flex flex-col gap-7">
            <div className="flex justify-between items-center w-full gap-3">
              <label htmlFor="username">Username</label>
              <div className="relative">
                <input
                  className={`input-base ${nameError !== "" ? "input-error" : ""}`}
                  type="text"
                  name="username"
                  id="username"
                  onChange={handleNameChange}
                  maxLength={50}
                  required
                />
                <div className="error-message">
                  {nameError ? nameError : ""}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center w-full gap-3">
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
          </div>
        </div>
        <div className="flex justify-end w-full gap-5">
          <button
            className="rounded-full bg-wgray-500 hover:bg-wgray-600 w-full h-10 shadow-md"
            type="submit"
          >
            Sign In
          </button>
        </div>
        <div>
          Not signed up yet?
          <Link
            className="text-wgray-700 hover:text-wgray-800 underline ml-3"
            to="/register"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
