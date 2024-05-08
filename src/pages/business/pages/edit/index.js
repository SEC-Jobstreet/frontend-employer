import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BusinessForm from "../../components/form";
import { DUMMY_DATA } from "../../index";

function EditBusiness() {
  const { businessId } = useParams();

  const [enterpriseName, setEnterpriseName] = useState("");
  const [errorEnterpriseName, setErrorEnterpriseName] = useState("");

  const [country, setCountry] = useState("VN");

  const [enterpriseAddress, setEnterpriseAddress] = useState("");
  const [errorEnterpriseAddress, setErrorEnterpriseAddress] = useState("");

  const [enterpriseField, setEnterpriseField] = useState(0);
  const [errorEnterpriseField, setErrorEnterpriseField] = useState(false);

  const [enterpriseSize, setEnterpriseSize] = useState(0);
  const [errorEnterpriseSize, setErrorEnterpriseSize] = useState(false);

  const [employerRole, setEmployerRole] = useState(0);
  const [errorEmployerRole, setErrorEmployerRole] = useState(false);

  const [enterpriseURL, setEnterpriseURL] = useState("");
  const [enterpriseLicense, setEnterpriseLicense] = useState("");

  const [company, setCompany] = useState("");
  const [errorCompany, setErrorCompany] = useState("");

  useEffect(() => {
    const currentIndex = DUMMY_DATA.findIndex((item) => item.id === businessId);
    const businessInfo = DUMMY_DATA[currentIndex];

    setEnterpriseName(businessInfo.name);
    setEnterpriseAddress(businessInfo.address);
    setEnterpriseField(businessInfo.field);
    setEnterpriseSize(businessInfo.size);
    setEmployerRole(businessInfo.role);
    setEnterpriseURL(businessInfo.url);
    setEnterpriseLicense(businessInfo.license);
  }, []);
  return (
    <BusinessForm
      type="EDIT"
      enterpriseName={enterpriseName}
      setEnterpriseName={setEnterpriseName}
      errorEnterpriseName={errorEnterpriseName}
      setErrorEnterpriseName={setErrorEnterpriseName}
      country={country}
      setCountry={setCountry}
      enterpriseAddress={enterpriseAddress}
      setEnterpriseAddress={setEnterpriseAddress}
      errorEnterpriseAddress={errorEnterpriseAddress}
      setErrorEnterpriseAddress={setErrorEnterpriseAddress}
      enterpriseField={enterpriseField}
      setEnterpriseField={setEnterpriseField}
      errorEnterpriseField={errorEnterpriseField}
      setErrorEnterpriseField={setErrorEnterpriseField}
      enterpriseSize={enterpriseSize}
      setEnterpriseSize={setEnterpriseSize}
      errorEnterpriseSize={errorEnterpriseSize}
      setErrorEnterpriseSize={setErrorEnterpriseSize}
      employerRole={employerRole}
      setEmployerRole={setEmployerRole}
      errorEmployerRole={errorEmployerRole}
      setErrorEmployerRole={setErrorEmployerRole}
      company={company}
      setCompany={setCompany}
      errorCompany={errorCompany}
      setErrorCompany={setErrorCompany}
      enterpriseURL={enterpriseURL}
      setEnterpriseURL={setEnterpriseURL}
      enterpriseLicense={enterpriseLicense}
      setEnterpriseLicense={setEnterpriseLicense}
    />
  );
}

export default EditBusiness;
