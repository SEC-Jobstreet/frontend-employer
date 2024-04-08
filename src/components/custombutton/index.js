import "./index.css";

function CustomButton({
  type = "button",
  color = "while", // green or white button
  className = "", // custom classname to add more css
  onClick,
  width = "auto",
  height = "48px",
  children,
}) {
  return (
    <button
      type={type === "button" ? "button" : "submit"}
      className={`${color === "while" ? "while-css" : "green-css"} ${className}`}
      style={{ width: `${width}`, height: `${height}` }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default CustomButton;
