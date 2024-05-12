import { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  getApplicationListAPI,
  getCandidateProfileAPI,
} from "../../services/configAPI";

import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";

function timeSince(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return `Đã ứng tuyển ${Math.floor(interval)} năm trước`;
  interval = seconds / 2592000;
  if (interval > 1) return `Đã ứng tuyển ${Math.floor(interval)} tháng trước`;
  interval = seconds / 86400;
  if (interval > 1) return `Đã ứng tuyển ${Math.floor(interval)} ngày trước`;
  interval = seconds / 3600;
  if (interval > 1) return `Đã ứng tuyển ${Math.floor(interval)} giờ trước`;
  interval = seconds / 60;
  if (interval > 1) return `Đã ứng tuyển ${Math.floor(interval)} phút trước`;
  return `Đã ứng tuyển ${Math.floor(seconds)} giây trước`;
}

function displayWorkTimes(workShift, workWhenever) {
  const days = [
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
    "Chủ nhật",
  ];
  const slots = ["Sáng", "Chiều", "Tối"];

  if (workWhenever) {
    return (
      <ul>
        {days.map((day) => (
          <li key={day}>{`${day}: Sáng, Chiều, Tối`}</li>
        ))}
      </ul>
    );
  }
  return (
    <ul>
      {days.map((day, dayIndex) => {
        const times = slots
          .filter((slot) => workShift[slots.indexOf(slot)][dayIndex])
          .join(", ");
        return times.length > 0 ? (
          <li key={day}>{`${day}: ${times}`}</li>
        ) : null;
      })}
    </ul>
  );
}

function CandidateProfile({ data }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getCandidateProfile = async () => {
      const response = await getCandidateProfileAPI(data.CandidateID);
      console.log(response);
      if (response.status === 200) {
        setProfile(response.data);
      }
    };
    getCandidateProfile();
  }, []);

  if (profile)
    return (
      <div className="card mb-3">
        <div className="card-body">
          <div className="card-info">
            <h5 className="card-title">
              {profile.first_name} {profile.last_name}
            </h5>
            <p className="card-text">Địa chỉ: {profile.Address}</p>
            <p className="card-text">
              Số điện thoại: {profile.CountryPhone + profile.Phone}
            </p>
            {profile.CurrentPosition && (
              <p className="card-text">
                Công việc hiện tại: {profile.CurrentPosition}
              </p>
            )}
            {profile.StartDate && (
              <p className="card-text">
                Ngày bắt đầu công việc:{" "}
                {new Date(profile.StartDate * 1000).toLocaleDateString()}
              </p>
            )}
            {profile.Description && (
              <p className="card-text">
                Lý do nên tuyển dụng: {profile.Description}
              </p>
            )}
            <p className="card-text" style={{ fontWeight: "bold" }}>
              Ca làm việc có thể
            </p>
            {displayWorkTimes(
              JSON.parse(profile.WorkShift),
              profile.WorkWhenever
            )}
            <a
              href={profile.ResumeLink}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-success card-btn"
            >
              <i className="bi bi-file-earmark-text" />
              Sơ yếu lý lịch
            </a>
          </div>
          <div className="card-actions">
            <p className="card-text">
              {timeSince(new Date(profile.CreatedAt * 1000))}
            </p>
            <button type="button" className="btn btn-outline-success">
              <i className="bi bi-check-circle" />
              Phê duyệt hồ sơ
            </button>
          </div>
        </div>
      </div>
    );
}

function Candidates() {
  const [searchParams] = useSearchParams();
  const [applicationList, setApplicationList] = useState(null);

  useEffect(() => {
    const getApplicationList = async () => {
      const request = {
        id: searchParams.get("job_id"),
        pageId: 1,
        pageSize: 10,
      };
      const res = await getApplicationListAPI(request);
      console.log(res);
      if (res.status === 200) {
        setApplicationList(res.data.applications);
      }
    };
    getApplicationList();
  }, []);
  return (
    <div className="candidates-container">
      {" "}
      {applicationList &&
        applicationList.map((ele) => (
          <Fragment key={ele.ID}>
            <CandidateProfile data={ele} />
          </Fragment>
        ))}
    </div>
  );
}

export default Candidates;
