import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BusinessIcon from "../../../../assets/svg/business_icon.svg";
import PositionIcon from "../../../../assets/svg/location_icon.svg";
import {
  employerRoles,
  fields,
  sizes,
} from "../../../../utils/createenterprise";
import { DUMMY_DATA } from "../..";

import "./styles.css";

function DetailsBusiness() {
  const { businessId } = useParams();
  const [businessDetails, setBusinessDetails] = useState();

  useEffect(() => {
    // fetch data using business id
    const currentIndex = DUMMY_DATA.findIndex((item) => item.id === businessId);
    setBusinessDetails({ ...DUMMY_DATA[currentIndex] });
  }, []);

  const indexField = businessDetails
    ? fields.findIndex((item) => item.id === businessDetails.field)
    : 0;
  const indexSize = businessDetails
    ? sizes.findIndex((item) => item.id === businessDetails.size)
    : 0;
  const indexRole = businessDetails
    ? employerRoles.findIndex((item) => item.id === businessDetails.role)
    : 0;
  if (businessDetails) {
    return (
      <div className="center-item-container">
        <div className="content-container" id="details-business">
          <h3 className="heading-details">Doanh nghiệp của tôi</h3>
          <div className="content" id="content-details-business">
            {/* name */}
            <div className="title-details">
              <div className="business-icon-container">
                <img
                  src={BusinessIcon}
                  alt="business-icon"
                  style={{ width: "22px", height: "22px" }}
                />
              </div>
              <span style={{ fontSize: "20px" }}>{businessDetails.name}</span>
            </div>

            {/* address */}
            <div className="desciption-details">
              <span>Địa chỉ kinh doanh</span>
              <div
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <img src={PositionIcon} alt="position-icon" />
                <span style={{ fontWeight: "300" }}>
                  {businessDetails.address}
                </span>
              </div>
            </div>
            {/* feild */}
            <div className="desciption-details">
              <span>Lĩnh vực của doanh nghiệp</span>
              <span style={{ fontWeight: "300" }}>
                {fields[indexField].label}
              </span>
            </div>
            {/* size */}
            <div className="desciption-details">
              <span>Quy mô của doanh nghiệp</span>
              <span style={{ fontWeight: "300" }}>
                {sizes[indexSize].label}
              </span>
            </div>
            {/* role */}
            <div className="desciption-details">
              <span>Vai trò của bạn trong doanh nghiệp này</span>
              <span style={{ fontWeight: "300" }}>
                {employerRoles[indexRole].label}
              </span>
            </div>
            {/* address */}
            {indexRole.toString() === "3" && (
              <div className="desciption-details">
                <span>Tên công ty tuyển dụng</span>
                <span style={{ fontWeight: "300" }}>
                  {businessDetails.company}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default DetailsBusiness;
