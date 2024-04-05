function CandidateEmployer() {
  return (
    <div
      className="role-selection-container"
      style={{ position: "absolute", display: "block" }}
    >
      <h3 className="login-title">Đăng nhập</h3>
      <p className="mb-24">Bạn là ứng viên tìm việc hay nhà tuyển dụng?</p>
      <button
        type="button"
        className="rounded-button-primary btn-sign-up mb-24"
        onClick={() => {
          const temp = document.querySelector(".role-selection-container");
          if (temp) temp.style.display = "none";
        }}
      >
        Ứng Viên
      </button>
      <button
        type="button"
        className="rounded-button-primary btn-forgot-pw"
        onClick={() => {
          window.open("https://employer.jobstreet.vn/", "_blank").focus();
        }}
      >
        Nhà Tuyển Dụng
      </button>
    </div>
  );
}

export default CandidateEmployer;
