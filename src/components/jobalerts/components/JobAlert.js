import { NavLink } from "react-router-dom";

export default function JobAlert(props) {
  const { id, title, status, onChangeJobAlertHandler } = props;
  const onChangeHandler = (identifier) => {
    onChangeJobAlertHandler(id, identifier);
  };
  return (
    <div className="alert-item">
      <NavLink to="/" className="alert-title -link-highlight">
        {title}
      </NavLink>
      <div className="alert-info">
        <span className="alert-frequency">Hằng ngày</span>
        <span className="divider">-</span>
        <span className="alert-status">Kích hoạt</span>
      </div>
      <div className="actions-container">
        <button type="button" className="tertiary">
          Thay đổi
        </button>
        <button
          type="button"
          className="tertiary"
          onClick={() => onChangeHandler("status")}
        >
          {status ? "Kích hoạt" : "Dừng"}
        </button>
        <button
          type="button"
          className="tertiary"
          onClick={() => onChangeHandler("discard")}
        >
          Huỷ
        </button>
      </div>
    </div>
  );
}
