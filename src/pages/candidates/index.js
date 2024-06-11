import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getApplicationListAPI } from "../../services/configAPI";

function CandidateProfile({ profile }) {
  return (
    profile && (
      <div>
        <h3>
          {profile.first_name} {profile.last_name}
        </h3>
        <p>{profile.Address}</p>
        <p>{profile.CountryPhone + profile.Phone}</p>
        <a
          target="_blank"
          href={profile.ResumeLink}
          rel="noreferrer"
          style={{ textDecoration: "none", color: "black" }}
        >
          Link CV
        </a>
      </div>
    )
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
    <div>
      {applicationList &&
        applicationList.map((info) => (
          <div key={info.username}>
            <CandidateProfile profile={info} />
          </div>
        ))}
    </div>
  );
}

export default Candidates;
