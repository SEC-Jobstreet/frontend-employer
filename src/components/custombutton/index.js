import "./index.css";

function CustomButton({
  type = "button",
  color = "white", // green or white button
  className = "", // custom classname to add more css
  onClick,
  width = "auto",
  height = "auto",
  children,
  disabled,
}) {
  return (
    <button
      type={type === "button" ? "button" : "submit"}
      className={`${color === "white" ? "white-css" : "green-css"} ${className}`}
      style={{ width: `${width}`, height: `${height}` }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default CustomButton;
