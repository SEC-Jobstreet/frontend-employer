import {
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input/input";

function CountrySelect({ value, onChange, labels }) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value || undefined)}
    >
      <option value="">{labels.ZZ}</option>
      {getCountries().map((country) => (
        <option key={country} value={country}>
          {country} +{getCountryCallingCode(country)}
        </option>
      ))}
    </select>
  );
}

export default CountrySelect;
