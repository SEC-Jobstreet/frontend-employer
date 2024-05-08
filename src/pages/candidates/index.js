/* eslint-disable import/no-extraneous-dependencies */
import { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  getApplicationListAPI,
  getCandidateProfileAPI,
} from "../../services/configAPI";

import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";

function CandidateProfile({ data }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getCandidateProfile = async () => {
      const response = await getCandidateProfileAPI(data.CandidateID);
      console.log(response);
      if (response.status === 200) {
        setProfile(response.data);
      } else {
        setProfile({
          first_name: "John",
          last_name: "Doe",
          Address: "123 Example St",
          CountryPhone: "+1",
          Phone: "234567890",
          ResumeLink: "https://example.com/resume",
        });
      }
    };
    getCandidateProfile();
  }, []);

  if (profile)
    return (
      <div className="card mb-3" style={{ cursor: "pointer" }}>
        <div className="card-body">
          <div className="card-info">
            <h5 className="card-title">
              {profile.first_name} {profile.last_name}
            </h5>
            <p className="card-text">{profile.Address}</p>
            <p className="card-text">{profile.CountryPhone + profile.Phone}</p>
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
            <p className="card-text">Đã ứng tuyển 2 giờ trước</p>
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
      } else {
        setApplicationList([
          { ID: "1", CandidateID: "101", Name: "Alice Johnson" },
          { ID: "2", CandidateID: "102", Name: "Bob Smith" },
        ]);
      }
    };
    getApplicationList();
  }, []);
  return (
    <div className="candidates-container">
      {" "}
      <h2>Danh sách ứng viên</h2>
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
