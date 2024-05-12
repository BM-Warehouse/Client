const Button = ({ buttonText, disabled }) => (
  <div className="border px-4 py-2" disabled={disabled}>
    {buttonText}
  </div>
);

export default Button;
