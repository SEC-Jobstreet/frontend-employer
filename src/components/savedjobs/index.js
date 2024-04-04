import JobCard from "./job";

import "./index.css";

function SavedJobs() {
  const check = true; // check API my list job null
  return (
    <div className="contJobCard">
      <p className="title">Việc đã lưu</p>
      {check ? (
        <div>
          <p className="titleTwo">Bạn chưa lưu việc làm nào</p>
          <p className="txtTitle">
            Lưu công việc bạn thích bằng cách sử dụng nút Lưu trên trang kết quả
            tìm kiếm hoặc chi tiết công việc.
          </p>
        </div>
      ) : (
        <div>
          <JobCard />
          <JobCard />
        </div>
      )}
    </div>
  );
}

export default SavedJobs;
