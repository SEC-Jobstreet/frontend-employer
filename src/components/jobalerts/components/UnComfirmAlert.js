import Email from "../../../assets/svg/email_icon.svg";

export default function UnComfirmAlert(props) {
  const { uncomfirmHandler } = props;
  const onSubmitHanlder = (event) => {
    event.preventDefault();
    uncomfirmHandler(true);
  };
  return (
    <div id="unconfirm-email">
      <h3 className="heading-large text-label">
        <img src={Email} alt="email-icon" className="mail-label" />
        Địa chỉ email của bạn chưa được xác nhận
      </h3>
      <p>
        Xin bấm vào đường link trong email gửi đến{" "}
        <strong>hosiduc2002.chem@gmail.com</strong>
      </p>
      <form method="POST" onSubmit={onSubmitHanlder}>
        <input type="hidden" />
        <input type="hidden" name="authenticity-token" />
        <input
          type="submit"
          name="commit"
          value="Gửi lại email xác thức"
          className="button quinary resend-confirmation-button"
        />
      </form>
    </div>
  );
}
