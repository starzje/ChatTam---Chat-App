const Form = ({ email, password, setEmail, setPassword }) => {
  return (
    <>
      <label
        className="text-white text-md font-light pl-4 mb-2"
        htmlFor="email">
        Email
      </label>
      <input
        className="bg-[#2D2A46] text-white placeholder:opacity-50 rounded-full px-4 py-2 mb-4 outline-none "
        placeholder="john.doe@gmail.com"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label
        className="text-white text-md  font-light pl-4 mb-2"
        htmlFor="password">
        Password
      </label>
      <input
        className="bg-[#2D2A46] placeholder:opacity-50  text-white rounded-full px-4 py-2 mb-4 outline-none"
        placeholder="********"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </>
  );
};

export default Form;
