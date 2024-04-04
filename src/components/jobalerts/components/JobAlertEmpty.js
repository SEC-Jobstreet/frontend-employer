import Email from "../../../assets/svg/email_icon.svg";

export default function JobAlertEmpty() {
  return (
    <div className="email-alerts">
      <h3 className="heading-large text-label">
        <img src={Email} alt="email-icon" className="mail-label" />
        Bạn không có thông báo việc làm nào.
      </h3>
      <p>
        Tạo thư báo bằng cách thực hiện tìm kiếm và nhập email của bạn trên
        trang kết quả tìm kiếm.
      </p>
    </div>
  );
}
