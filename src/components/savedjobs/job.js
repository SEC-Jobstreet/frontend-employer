import "./job.css";

function JobCard() {
  return (
    <div className="cardWork">
      <p className="workTitle">[HÓC MÔN - HCM] NHÂN VIÊN KINH DOANH (24039) </p>
      <p className="workCompany">CÔNG TY TNHH REERACOEN VIỆT NAM</p>
      <p className="workAddress">Quận 1, HCM</p>
      <p className="workStatus">
        <span>Nộp đơn nhanh</span>
      </p>
      <p className="workSummary">
        Có ít nhất 1 năm kinh nghiệm SALE ô tô - Kỹ năng cơ bản về máy tính:
        Work, Excel, PP,... - Có bằng lái xe B2(mô tả) - Quản lý...
      </p>
      <div className="workDes">
        <span>Đã đăng 4 ngày trước</span>
        <button type="button">
          <i className="fa fa-bookmark icon" />
          Đã lưu lại
        </button>
      </div>
    </div>
  );
}

export default JobCard;
