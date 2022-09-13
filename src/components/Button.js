const Button = ({ text, icon, handleClick }) => (
  <button onClick={handleClick} className="tracking-wider uppercase btn-purple">
    {text}
    {icon}
  </button>
);

export default Button;
