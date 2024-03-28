import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import Homepage from "../../pages/homepage";
import Profile from "../../pages/profile";
import Search from "../../pages/search/index";
import { selectUser } from "../../store/user";

function AppRouter() {
  const user = useSelector(selectUser);

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      {user.email !== "" && (
        <>
          <Route path="/profile" element={<Profile />} />
          <Route path="/job_alerts" element={<Search />} />
          <Route path="/saved_jobs" element={<Search />} />
        </>
      )}
    </Routes>
  );
}

export default AppRouter;
