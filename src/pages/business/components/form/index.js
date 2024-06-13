import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { decodeJWT, getCurrentUser } from "aws-amplify/auth";

import ErrorIcon from "../../../../assets/svg/error-icon.svg";
import SearchBarIcon from "../../../../assets/svg/search-icon.svg";
import DropdownButton from "../../../../components/customdropdown";
import CustomInput from "../../../../components/custominput/input";
import SuggestionInfo from "../../../../components/suggestioninfo";
import {
  createEnterprise,
  updateEnterpriseInfo,
} from "../../../../services/configAPI";
import {
  countries,
  employerRoles,
  fields,
  sizes,
} from "../../../../utils/createenterprise";

import "./styles.css";

function BusinessForm({
  type,
  enterpriseName,
  setEnterpriseName,
  errorEnterpriseName,
  setErrorEnterpriseName,
  country,
  setCountry,
  enterpriseAddress,
  setEnterpriseAddress,
  errorEnterpriseAddress,
  setErrorEnterpriseAddress,
  enterpriseField,
  setEnterpriseField,
  errorEnterpriseField,
  setErrorEnterpriseField,
  enterpriseSize,
  setEnterpriseSize,
  errorEnterpriseSize,
  setErrorEnterpriseSize,
  employerRole,
  setEmployerRole,
  errorEmployerRole,
  setErrorEmployerRole,
  company,
  setCompany,
  errorCompany,
  setErrorCompany,
  enterpriseURL,
  setEnterpriseURL,
  enterpriseLicense,
  setEnterpriseLicense,
}) {
  const errorSubmitForm =
    errorEnterpriseName === "" &&
    errorEnterpriseAddress === "" &&
    !errorEnterpriseField &&
    !errorEnterpriseSize &&
    !errorEmployerRole &&
    (employerRole.toString() !== "3" ||
      (employerRole.toString() === "3" && errorCompany === ""));

  const navigate = useNavigate();
  const { businessId } = useParams();

  const onCancelHandler = () => {
    navigate("/business");
  };
  const onSubmitHandler = async () => {
    // check validate when load form first time
    if (enterpriseName === "") {
      setErrorEnterpriseName("Vui lòng nhập tên doanh nghiệp.");
    }
    if (enterpriseAddress === "") {
      setErrorEnterpriseAddress("Vui lòng nhập tên địa chỉ của doanh nghiệp");
    }
    if (enterpriseField.toString() === "0") {
      setErrorEnterpriseField(true);
    }
    if (enterpriseSize.toString() === "0") {
      setErrorEnterpriseSize(true);
    }
    if (employerRole.toString() === "0") {
      setErrorEmployerRole(true);
    }
    if (employerRole.toString() === "3" && company === "") {
      setErrorCompany("Vui lòng nhập tên công ty tuyển dụng");
    }
    if (!errorSubmitForm && enterpriseName !== "") {
      console.log({
        enterpriseName,
        country,
        enterpriseAddress,
        enterpriseField,
        enterpriseSize,
        employerRole,
        company,
        enterpriseURL,
        enterpriseLicense,
      });
    }
    console.log(errorSubmitForm);
    // successful
    if (errorSubmitForm) {
      if (type === "EDIT") {
        const respone = await updateEnterpriseInfo({
          id: businessId,
          name: enterpriseName,
          country,
          address: enterpriseAddress,
          field: enterpriseField,
          size: enterpriseSize,
          employer_role: employerRole,
          company,
          url: enterpriseURL,
          license: enterpriseLicense,
        });
        if (respone.status === 200) {
          console.log(respone);
        }
      }
      if (type === "CREATE") {
        const res = await getCurrentUser();
        if (res.userId) {
          console.log(res);
          const accessToken = localStorage.getItem(
            `CognitoIdentityServiceProvider.${process.env.REACT_APP_COGNITO_USER_POOL_CLIENT_ID}.${res.username}.accessToken`
          );
          const data = decodeJWT(accessToken);
          const respone = await createEnterprise({
            name: enterpriseName,
            country,
            address: enterpriseAddress,
            field: enterpriseField,
            size: enterpriseSize,
            employer_role: employerRole,
            company,
            enterprise_url: enterpriseURL,
            enterprise_license: enterpriseLicense,
            employer_id: data.payload.username,
          });
          if (respone.status === 200) {
            console.log(respone);
          }
        }
      }
      navigate("/business");
    }
  };
  return (
    <div className="center-item-container">
      <div className="content-container">
        <h3 className="heading-details">
          {type === "CREATE"
            ? "Thêm doanh nghiệp mới"
            : "Chỉnh sửa thông tin doanh nghiệp"}
        </h3>
        <div className="content" id="edit-new-business">
          <div className="field">
            <CustomInput
              input={enterpriseName}
              error={errorEnterpriseName}
              setInput={(e) => {
                if (e.target.value === "")
                  setErrorEnterpriseName("Vui lòng nhập tên doanh nghiệp.");
                else if (e.target.value.length < 2)
                  setErrorEnterpriseName(
                    "Vui lòng nhập tên doanh nghiệp hợp lệ."
                  );
                else setErrorEnterpriseName("");
                setEnterpriseName(e.target.value);
              }}
              setBlur={() => {
                if (enterpriseName === "")
                  setErrorEnterpriseName("Vui lòng nhập tên doanh nghiệp.");
                else if (enterpriseName.length < 2)
                  setErrorEnterpriseName(
                    "Vui lòng nhập tên doanh nghiệp hợp lệ."
                  );
              }}
              type="text"
              label="Tên doanh nghiệp"
              name="enterprise-name"
            />
          </div>
          <div className="field dropdown">
            <DropdownButton
              name="Quốc gia"
              title={
                countries.find((e) => e.id.toString() === country.toString())
                  .label
              }
              options={countries}
              onSelect={setCountry}
              value={country}
              autoClose
            />
          </div>
          <div className="field">
            <CustomInput
              input={enterpriseAddress}
              error={errorEnterpriseAddress}
              setInput={(e) => {
                setErrorEnterpriseAddress("");
                setEnterpriseAddress(e.target.value);
              }}
              setBlur={() => {
                if (enterpriseAddress === "")
                  setErrorEnterpriseAddress(
                    "Vui lòng nhập tên địa chỉ của doanh nghiệp"
                  );
              }}
              type="text"
              label="Địa chỉ kinh doanh"
              name="enterprise-address"
            >
              <div className="enterprise-address-icon">
                <img src={SearchBarIcon} alt="icon" />
              </div>
            </CustomInput>
            <div className="small-text" style={{ marginBottom: "10px" }}>
              Ví dụ: 41 Nguyễn Thị Minh Khai, Phường Bến Nghé, Quận 1, Hồ Chí
              Minh (không bao gồm thông tin về số tầng cụ thể)
            </div>
            <SuggestionInfo type="suggestion">
              Đừng lo, chúng tôi chỉ hiển thị thành phố và tỉnh trong địa chỉ
              doanh nghiệp của bạn Ví dụ Quận 1, Hồ Chí Minh.
            </SuggestionInfo>
          </div>
          <div className="field dropdown">
            <DropdownButton
              name="Lĩnh vực của doanh nghiệp"
              error={errorEnterpriseField}
              title={
                fields.find(
                  (e) => e.id.toString() === enterpriseField.toString()
                )?.label
              }
              options={fields}
              onSelect={(e) => {
                setEnterpriseField(e);
              }}
              onBlur={() => {
                if (enterpriseField.toString() === "0")
                  setErrorEnterpriseField(true);
                else setErrorEnterpriseField(false);
              }}
              value={enterpriseField}
              autoClose
            />
            {errorEnterpriseField && (
              <div className="invalid-feedback-input">
                <img src={ErrorIcon} alt="error-icon" />
                Vui lòng chọn một ngành.
              </div>
            )}
          </div>
          <div className="field dropdown">
            <DropdownButton
              name="Quy mô của doanh nghiệp"
              error={errorEnterpriseSize}
              title={
                sizes.find((e) => e.id.toString() === enterpriseSize.toString())
                  ?.label
              }
              options={sizes}
              onSelect={(e) => {
                setEnterpriseSize(e);
              }}
              onBlur={() => {
                if (enterpriseSize.toString() === "0")
                  setErrorEnterpriseSize(true);
                else setErrorEnterpriseSize(false);
              }}
              value={enterpriseSize}
              autoClose
            />
            {errorEnterpriseSize && (
              <div className="invalid-feedback-input">
                <img src={ErrorIcon} alt="error-icon" />
                Vui lòng chọn quy mô doanh nghiệp.
              </div>
            )}
          </div>
          <div className="field dropdown">
            <DropdownButton
              name="Vai trò của bạn trong doanh nghiệp này"
              error={errorEmployerRole}
              title={
                employerRoles.find(
                  (e) => e.id.toString() === employerRole.toString()
                )?.label
              }
              options={employerRoles}
              onSelect={(e) => {
                setEmployerRole(e);
              }}
              onBlur={() => {
                if (employerRole.toString() === "0") setErrorEmployerRole(true);
                else setErrorEmployerRole(false);
              }}
              value={employerRole}
              autoClose
            />
            {errorEmployerRole && (
              <div className="invalid-feedback-input">
                <img src={ErrorIcon} alt="error-icon" />
                Vui lòng chọn vai trò trong doanh nghiệp.
              </div>
            )}
          </div>
          {/* company nếu người đăng là nhà tuyển dụng */}
          <div className="field" hidden={employerRole !== "3"}>
            <CustomInput
              input={company}
              error={errorCompany}
              setInput={(e) => {
                setErrorCompany("");
                setCompany(e.target.value);
              }}
              setBlur={() => {
                if (company === "")
                  setErrorCompany("Vui lòng nhập tên công ty tuyển dụng");
              }}
              type="text"
              label="Công ty tuyển dụng"
              name="company"
            />
          </div>

          <div className="field">
            <CustomInput
              input={enterpriseURL}
              setInput={(e) => {
                setEnterpriseURL(e.target.value);
              }}
              type="text"
              label="Trang web hoặc trang mạng xã hội của doanh nghiệp"
              name="enterprise-url"
            />
            <div className="small-text">
              Ví dụ https://www.jobstreet.vn hoặc www.facebook.com/jobstreetvn
            </div>
          </div>
          <div className="field">
            <CustomInput
              input={enterpriseLicense}
              setInput={(e) => {
                setEnterpriseLicense(e.target.value);
              }}
              type="text"
              label="Số giấy phép kinh doanh (GPKD)"
              name="enterprise-license"
            />
          </div>
          {type === "EDIT" && (
            <SuggestionInfo type="info">
              Những thay đổi về tên và địa điểm kinh doanh của bạn sẽ được cập
              nhật trên tất cả các vị trí tuyển dụng được đăng cho doanh nghiệp
              này.
            </SuggestionInfo>
          )}
          <div className="group-button">
            <Button
              type="button"
              className="-primary"
              id="create-button"
              onClick={onSubmitHandler}
            >
              {type === "CREATE"
                ? "Thêm doanh nghiệp mới"
                : "Cập nhật thông tin doanh nghiệp"}
            </Button>
            {type === "EDIT" && (
              <Button
                type="button"
                className="-secondary"
                id="cancel-button"
                onClick={onCancelHandler}
              >
                Huỷ bỏ
              </Button>
            )}
          </div>

          {!errorSubmitForm && (
            <div className="invalid-feedback-input">
              <img src={ErrorIcon} alt="error-icon" />
              Có lỗi trên trang này. Xin vui lòng sửa lại lỗi được đánh dấu.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BusinessForm;
