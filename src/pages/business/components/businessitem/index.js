import { Link } from "react-router-dom";

import BusinessIcon from "../../../../assets/svg/business_icon.svg";
import EditIcon from "../../../../assets/svg/edit_icon.svg";

import "./styles.css";

function BusinessItem(props) {
  const { info } = props;

  return (
    <Link to={`${info.id}/details`} className="content-container item">
      <div className="main-content">
        <div className="business-icon-container">
          <img
            src={BusinessIcon}
            alt="business-icon"
            style={{ width: "22px", height: "22px" }}
          />
        </div>
        <div className="text-item-container">
          <span style={{ fontWeight: "400" }}>{info.name}</span>
          <span style={{ fontSize: "14px" }}>{info.address}</span>
        </div>
      </div>
      <div className="edit-containter">
        <img
          src={EditIcon}
          alt="edit-icon"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
        <Link to={`${info.id}/edit`} className="edit-link">
          Chỉnh sửa
        </Link>
      </div>
    </Link>
  );
}

export default BusinessItem;
