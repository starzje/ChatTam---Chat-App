const Form = ({ email, password, setEmail, setPassword }) => {
  return (
    <>
      <label className="input-label" htmlFor="email">
        Email
      </label>
      <input
        className="input-field "
        placeholder="john.doe@gmail.com"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="input-label" htmlFor="password">
        Password
      </label>
      <input
        className="input-field "
        placeholder="********"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </>
  );
};

export default Form;
