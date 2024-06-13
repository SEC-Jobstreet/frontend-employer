import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BusinessIcon from "../../../../assets/svg/business_icon.svg";
import PositionIcon from "../../../../assets/svg/location_icon.svg";
import { getEnterpriseInfo } from "../../../../services/configAPI";
import {
  employerRoles,
  fields,
  sizes,
} from "../../../../utils/createenterprise";

import "./styles.css";

function DetailsBusiness() {
  const { businessId } = useParams();
  const [businessDetails, setBusinessDetails] = useState(null);

  useEffect(() => {
    // fetch data using business id
    const loadEnterpriseInfo = async () => {
      const res = await getEnterpriseInfo(businessId);
      if (res.status === 200) {
        console.log(res);
        setBusinessDetails(res.data);
      }
    };

    loadEnterpriseInfo();
  }, []);

  console.log(businessDetails);

  // const indexField = businessDetails
  //   ? fields.findIndex((item) => toString(item.id) === businessDetails.field)
  //   : 0;
  // const indexSize = businessDetails
  //   ? sizes.findIndex((item) => item.id === businessDetails.size)
  //   : 0;
  // const indexRole = businessDetails
  //   ? employerRoles.findIndex((item) => item.id === businessDetails.role)
  //   : 0;
  let field = "";
  let size = "";
  let role = "";
  if (businessDetails) {
    field = fields.find((item) => item.id.toString() === businessDetails.field);
    size = sizes.find((item) => item.id.toString() === businessDetails.size);
    role = employerRoles.find(
      (item) => item.id.toString() === businessDetails.employer_role
    );
  }

  return (
    businessDetails && (
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
                  {businessDetails.country} | {businessDetails.address}
                </span>
              </div>
            </div>
            {/* feild */}
            <div className="desciption-details">
              <span>Lĩnh vực của doanh nghiệp</span>
              <span style={{ fontWeight: "300" }}>{field.label}</span>
            </div>
            {/* size */}
            <div className="desciption-details">
              <span>Quy mô của doanh nghiệp</span>
              <span style={{ fontWeight: "300" }}>{size.label}</span>
            </div>
            {/* role */}
            <div className="desciption-details">
              <span>Vai trò của bạn trong doanh nghiệp này</span>
              <span style={{ fontWeight: "300" }}>{role.label}</span>
            </div>
            {/* address */}
            {businessDetails.role === "3" && (
              <div className="desciption-details">
                <span>Tên công ty tuyển dụng</span>
                <span style={{ fontWeight: "300" }}>
                  {businessDetails.company}
                </span>
              </div>
            )}
            {businessDetails.url && (
              <div className="desciption-details">
                <span>Trang web của doanh nghiệp</span>
                <span style={{ fontWeight: "300" }}>{businessDetails.url}</span>
              </div>
            )}
            {businessDetails.license && (
              <div className="desciption-details">
                <span>Số giấy phép kinh doanh</span>
                <span style={{ fontWeight: "300" }}>
                  {businessDetails.license}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default DetailsBusiness;
