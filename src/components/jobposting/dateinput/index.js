import { ReactComponent as ErrorIcon } from "../../../assets/svg/error_icon.svg";
import ValidateDate from "../../../utils/validator";

function DateInput({
  startDate,
  setStartDate,
  setErrorStartDate,
  errorStartDate,
}) {
  return (
    <>
      <label htmlFor="start-date">
        Ngày dự kiến bắt đầu công việc
        <input
          type="text"
          className="start-date-input"
          placeholder="DD/MM/YYYY"
          name="start-date"
          id="start-date"
          value={startDate}
          onChange={(e) => {
            setErrorStartDate("");
            const date = e.target.value;
            const ch = date.charAt(date.length - 1);
            if (date === "") {
              setStartDate("");
              return;
            }
            if (ch === "/") {
              if (date.length === 3 || date.length === 6) {
                setStartDate(date);
                return;
              }
            }
            const validatedDate = ValidateDate(date);
            if (!validatedDate) return;
            if (
              (date.length === 2 && startDate.length === 1) ||
              (date.length === 5 && startDate.length === 4)
            )
              setStartDate(`${date}/`);
            else if (date.length === 3 && startDate.length === 2)
              setStartDate(`${startDate}/${date[2]}`);
            else if (date.length === 6 && startDate.length === 5)
              setStartDate(`${startDate}/${date[5]}`);
            else setStartDate(date);
          }}
          onBlur={() => {
            if (startDate !== "") {
              const valid = startDate.match(
                /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
              );
              if (!valid) {
                setErrorStartDate("Vui lòng nhập ngày hợp lệ.");
                return;
              }
              const dateParts = startDate.split("/");
              const dateObject = new Date(
                +dateParts[2],
                dateParts[1] - 1,
                +dateParts[0]
              );
              if (dateObject < new Date())
                setErrorStartDate("Vui lòng nhập một ngày trong tương lai.");
            }
          }}
        />
      </label>
      {errorStartDate !== "" && (
        <div className="invalid-feedback-input">
          <ErrorIcon />
          {errorStartDate}
        </div>
      )}
    </>
  );
}

export default DateInput;
