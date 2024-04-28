import { ReactComponent as ErrorIcon } from "../../assets/svg/error_icon.svg";
import { ReactComponent as SearchBarIcon } from "../../assets/svg/searchbar_icon.svg";
import {
  countries,
  employerRoles,
  fields,
  sizes,
} from "../../utils/createenterprise";
import DropdownButton from "../customdropdown";
import CustomInput from "../custominput/input";
import SuggestionInfo from "../suggestioninfo";

import "./index.css";

function EnterpriseCreating({
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
  enterpriseURL,
  setEnterpriseURL,
  enterpriseLicense,
  setEnterpriseLicense,
}) {
  return (
    <>
      <CustomInput
        input={enterpriseName}
        error={errorEnterpriseName}
        setInput={(e) => {
          if (e.target.value === "")
            setErrorEnterpriseName("Vui lòng nhập tên doanh nghiệp.");
          else if (e.target.value.length < 2)
            setErrorEnterpriseName("Vui lòng nhập tên doanh nghiệp hợp lệ.");
          else setErrorEnterpriseName("");
          setEnterpriseName(e.target.value);
        }}
        setBlur={() => {
          if (enterpriseName === "")
            setErrorEnterpriseName("Vui lòng nhập tên doanh nghiệp.");
          else if (enterpriseName.length < 2)
            setErrorEnterpriseName("Vui lòng nhập tên doanh nghiệp hợp lệ.");
        }}
        type="text"
        label="Tên doanh nghiệp"
        name="enterprise-name"
      />

      <div style={{ marginTop: "10px" }}>
        <DropdownButton
          name="Quốc gia"
          title={
            countries.find((e) => e.id.toString() === country.toString()).label
          }
          options={countries}
          onSelect={setCountry}
          value={country}
          autoClose
        />
      </div>

      {/* Change into Google-Auto-Complete when needed */}
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
          <SearchBarIcon />
        </div>
      </CustomInput>
      <div className="small-text" style={{ marginBottom: "20px" }}>
        Ví dụ: 41 Nguyễn Thị Minh Khai, Phường Bến Nghé, Quận 1, Hồ Chí Minh
        (không bao gồm thông tin về số tầng cụ thể)
      </div>
      <SuggestionInfo type="suggestion">
        Đừng lo, chúng tôi chỉ hiển thị thành phố và tỉnh trong địa chỉ doanh
        nghiệp của bạn Ví dụ Quận 1, Hồ Chí Minh.
      </SuggestionInfo>

      <div style={{ marginTop: "20px", marginBottom: "15px" }}>
        <DropdownButton
          name="Lĩnh vực của doanh nghiệp"
          error={errorEnterpriseField}
          title={
            fields.find((e) => e.id.toString() === enterpriseField.toString())
              ?.label
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
            <ErrorIcon />
            Vui lòng chọn một ngành.
          </div>
        )}
      </div>

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
          if (enterpriseSize.toString() === "0") setErrorEnterpriseSize(true);
          else setErrorEnterpriseSize(false);
        }}
        value={enterpriseSize}
        autoClose
      />
      {errorEnterpriseSize && (
        <div className="invalid-feedback-input">
          <ErrorIcon />
          Vui lòng chọn quy mô doanh nghiệp.
        </div>
      )}

      <div style={{ marginBlock: "15px" }}>
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
            <ErrorIcon />
            Vui lòng chọn vai trò trong doanh nghiệp.
          </div>
        )}
      </div>

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

      <CustomInput
        input={enterpriseLicense}
        setInput={(e) => {
          setEnterpriseLicense(e.target.value);
        }}
        type="text"
        label="Số giấy phép kinh doanh (GPKD)"
        name="enterprise-license"
      />
    </>
  );
}

export default EnterpriseCreating;
