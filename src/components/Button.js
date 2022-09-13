const Button = ({ text, icon, handleClick }) => (
  <button onClick={handleClick} className="btn-purple tracking-wider uppercase">
    {text}
    {icon}
  </button>
);

export default Button;
