import { Link, Navigate } from "react-router-dom";
import { useState, useContext } from "react";
import { ApiContext } from "../Contexts";
import { formPostRequest } from "../hooks/formPostRequest";

const RegisterForm = () => {
  const [isRegistered, setRegistered] = useState(false);

  const handleFormSubmission = async (event) => {
    const result = await formPostRequest(
      event,
      `https://pnp-backend.fly.dev/api/v1/signup`,
    );

    if (result[0]) {
      //ToDo: form error handling
      console.error(result[0].msg);
    } else {
      localStorage.setItem("accessToken", "Bearer " + result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);
      localStorage.setItem("userId", result.user._id);
      setRegistered(true);
    }
  };

  if (isRegistered) {
    return <Navigate to="/login" />;
  } else {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <form
          className="flex flex-col rounded-xl shadow-md gap-5 bg-wgray-300 max-w-prose p-5"
          action=""
          onSubmit={handleFormSubmission}
        >
          <div className="flex gap-3 leading-9">
            <div className="flex flex-col gap-5">
              <label htmlFor="username">Username</label>
              <label htmlFor="password">Password</label>
              <label htmlFor="passwordRpt">Repeat Password</label>
            </div>
            <div className="flex flex-col gap-5">
              <input
                className="rounded"
                type="text"
                name="username"
                id="username"
                required
              />
              <input
                className="rounded"
                type="password"
                name="password"
                id="password"
                required
              />
              <input
                className="rounded"
                type="password"
                name="passwordRpt"
                id="passwordRpt"
                required
              />
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
  }
};

export default RegisterForm;
