import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import Account from "../../pages/account/account";
import Homepage from "../../pages/homepage";
import NotFound from "../../pages/notfound";
import Register from "../../pages/register/register";
import { selectUser } from "../../store/user";
import DeletionConfirmation from "../deletioncomfirmation";
import EditSetting from "../editsetting";
import JobsAlerts from "../jobalerts";
import CreateJobAlert from "../jobalerts/pages/CreateJobAlert";
import CandidateLogin from "../login/candidate-login";
import Profile from "../profile";
import SavedJobs from "../savedjobs";
import Search from "../searchresult/joblisting";
import Setting from "../setting";

import ProtectedRoute from "./protectedroute";

import "../login/login-style.css";

function AppRouter() {
  const user = useSelector(selectUser);

  return (
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route element={<ProtectedRoute isAllowed={!user?.email} />}>
        <Route exact path="login" element={<CandidateLogin isPage />} />
        <Route exact path="register" element={<Register />} />
      </Route>

      <Route exact path="search" element={<Search />} />
      <Route element={<ProtectedRoute isAllowed={!!user?.email} />}>
        <Route path="account" element={<Account />}>
          <Route index path="settings" element={<Setting />} />
          <Route path="profile" element={<Profile />} />
          <Route path="job_alerts" element={<JobsAlerts />} />
          <Route path="saved_jobs" element={<SavedJobs />} />
          <Route path="edit_setting" element={<EditSetting />} />
          <Route
            path="deletion_confirmation"
            element={<DeletionConfirmation />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="account/job_alerts/new" element={<CreateJobAlert />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;
