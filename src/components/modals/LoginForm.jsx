const LoginForm = () => {
  return (
    <form action="">
      <label htmlFor="username">User Name</label>
      <input type="text" name="username" id="username" required />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" required />
      <input type="submit" />
    </form>
  );
};

export default LoginForm;
