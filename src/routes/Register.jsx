import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
  return (
    <>
      <RegisterForm />
      <Link to="/login">Already have an Account? Sign in.</Link>
    </>
  );
};

export default Register;
