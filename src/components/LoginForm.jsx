import { Link, Navigate } from "react-router-dom";
import { formPostRequest } from "../apiRequests/formPostRequest";
import { useContext } from "react";
import { ApiContext } from "../Contexts";

/**Login Form. Saves Access Token, Refresh Token and User Id into localStorage on successful login */
const LoginForm = () => {
  const apiContext = useContext(ApiContext);

  const handleFormSubmission = async (event) => {
    const result = await formPostRequest(
      event,
      `https://pnp-backend.fly.dev/api/v1/login`,
    );

    if (result[0]) {
      //ToDo: form error handling
      console.error(result[0].msg);
    } else {
      localStorage.setItem("accessToken", "Bearer " + result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);
      localStorage.setItem("userId", result.user._id);
      apiContext.setLoggedIn(true);
    }
  };

  if (apiContext.isLoggedIn) {
    return <Navigate to="/notes" />;
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
  }
};

export default LoginForm;
