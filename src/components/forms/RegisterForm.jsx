const RegisterForm = () => {
  return (
    <form action="ToDo: backend url">
      <label htmlFor="username">Username</label>
      <input type="text" name="username" required />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" required />
      <label htmlFor="passwordRpt">Repeat Password</label>
      <input type="password" name="passwordWdh" required />
    </form>
  );
};

export default RegisterForm;
