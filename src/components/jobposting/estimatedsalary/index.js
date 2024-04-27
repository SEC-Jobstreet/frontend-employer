import { Fragment, useState } from "react";
import Modal from "react-bootstrap/Modal";
import CurrencyInput from "react-currency-input-field";

import { ReactComponent as ErrorIcon } from "../../../assets/svg/error_icon.svg";
import CustomDropdown from "../../customdropdown";
import CustomRadio from "../../customradio";
import SuggestionInfo from "../../suggestioninfo";

import "./index.css";

const salaryLevels = [
  { label: "Chính xác", id: 1 },
  { label: "Khoảng lương", id: 2 },
];

const timeOptions = [
  { label: "giờ", id: 1 },
  { label: "ngày", id: 2 },
  { label: "tuần", id: 3 },
  { label: "tháng", id: 4 },
  { label: "năm", id: 5 },
];

const currencyOptions = [
  { label: "$", id: "AUD" },
  { label: "£", id: "GBP" },
  { label: "$", id: "HKD" },
  { label: "Rp", id: "IDR" },
  { label: "RM", id: "MYR" },
  { label: "$", id: "NZD" },
  { label: "₱", id: "PHP" },
  { label: "$", id: "SGD" },
  { label: "฿", id: "THB" },
  { label: "₫", id: "VND" },
];

function EstimatedSalary({
  currency,
  setCurrency,
  salaryLevelDisplay,
  setSalaryLevelDisplay,
  salary,
  setSalary,
  salaryRange,
  setSalaryRange,
  paidPeriod,
  setPaidPeriod,
  errorSalaryRange,
  setErrorSalaryRange,
}) {
  const [showModal, setShowModal] = useState(false);
  const currentCurrency = currencyOptions.find((e) => e.id === currency);

  return (
    <div className="estimated-salary-wrapper">
      <button
        type="button"
        className="change-currency-btn"
        onClick={() => setShowModal(true)}
      >
        Thay đổi tiền tệ: {currentCurrency.label} {currentCurrency.id}
      </button>
      <div className="estimated-salary">
        <CustomDropdown
          name="Hiển thị mức lương"
          options={salaryLevels}
          onSelect={setSalaryLevelDisplay}
          value={salaryLevelDisplay}
          title={salaryLevels[salaryLevelDisplay - 1].label}
        />

        <div>
          <div>Mức lương</div>
          {salaryLevelDisplay.toString() === "1" ? (
            <CurrencyInput
              prefix={`${currentCurrency.label} `}
              id="input-salary"
              name="Mức lương"
              placeholder={`${currentCurrency.label} Tổng cộng`}
              defaultValue={salary}
              decimalsLimit={0}
              onValueChange={(value) => setSalary(value)}
            />
          ) : (
            <>
              <CurrencyInput
                prefix={`${currentCurrency.label} `}
                id="input-salary-range1"
                name="Mức lương 1"
                placeholder={`${currentCurrency.label} Tối thiểu`}
                defaultValue={salaryRange[0]}
                decimalsLimit={0}
                onValueChange={(value) => {
                  setErrorSalaryRange(false);
                  const temp = [value, salaryRange[1]];
                  setSalaryRange(temp);
                }}
                onBlur={() => {
                  if (
                    parseInt(salaryRange[0], 10) > parseInt(salaryRange[1], 10)
                  )
                    setErrorSalaryRange(true);
                }}
              />
              <CurrencyInput
                prefix={`${currentCurrency.label} `}
                id="input-salary-range2"
                name="Mức lương 2"
                placeholder={`${currentCurrency.label} Tối đa`}
                defaultValue={salaryRange[1]}
                decimalsLimit={0}
                onValueChange={(value) => {
                  setErrorSalaryRange(false);
                  const temp = [salaryRange[0], value];
                  setSalaryRange(temp);
                }}
                onBlur={() => {
                  if (
                    parseInt(salaryRange[0], 10) > parseInt(salaryRange[1], 10)
                  )
                    setErrorSalaryRange(true);
                }}
              />
            </>
          )}
        </div>

        <CustomDropdown
          name="Lương tính theo"
          options={timeOptions}
          onSelect={setPaidPeriod}
          value={paidPeriod}
          title={timeOptions[paidPeriod - 1].label}
        />
      </div>
      {errorSalaryRange && (
        <div className="invalid-feedback-input">
          <ErrorIcon />
          Hãy đảm bảo mức lương tối đa cao hơn mức lương tối thiểu.
        </div>
      )}
      <SuggestionInfo type="suggestion">
        {salaryLevelDisplay.toString() === "1" ? (
          <p>
            Nhập số tiền chính xác sẽ hiển thị &quot;Mức lương dự kiến:{" "}
            {currentCurrency.label}{" "}
            {salary === undefined || salary === "" ? "[Total]" : salary}
            cho mỗi {timeOptions[paidPeriod - 1].label}&quot; trong mẩu tin
            quảng cáo việc làm.
          </p>
        ) : (
          <p>
            Nhập một khoảng lương sẽ hiển thị &quot;Mức lương dự kiến:{" "}
            {currentCurrency.label}{" "}
            {salaryRange[0] === undefined || salaryRange[0] === ""
              ? "[Total]"
              : salaryRange[0]}
            – {currentCurrency.label}{" "}
            {salaryRange[1] === undefined || salaryRange[1] === ""
              ? "[Total]"
              : salaryRange[1]}{" "}
            cho mỗi {timeOptions[paidPeriod - 1].label}&quot; trong mẩu tin
            quảng cáo việc làm.
          </p>
        )}
      </SuggestionInfo>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        className="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Thay đổi tiền tệ</Modal.Title>
        </Modal.Header>
        <Modal.Body className="row">
          {currencyOptions.map((e) => (
            <div key={e.id} className="col-6">
              <CustomRadio
                value={currency}
                checkedValue={e.id}
                setValue={setCurrency}
                id={`currency${e.id}`}
              >
                <div>
                  {e.label} {e.id}
                </div>
              </CustomRadio>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default EstimatedSalary;
