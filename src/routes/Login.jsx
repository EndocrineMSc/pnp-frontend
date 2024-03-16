import { Link } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";

const Login = () => {
  return (
    <>
      <LoginForm />
      <Link to="/register">Register now!</Link>
    </>
  );
};

export default Login;
