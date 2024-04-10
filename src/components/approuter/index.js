import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import Account from "../../pages/account/account";
import ApplyPage from "../../pages/apply/appy";
import Homepage from "../../pages/homepage";
import JobDetail from "../../pages/jobdetail";
import LoginPage from "../../pages/login";
import NotFound from "../../pages/notfound";
import Register from "../../pages/register/register";
import Search from "../../pages/search";
import { selectUser } from "../../store/user";
import DeletionConfirmation from "../deletioncomfirmation";
import EditSetting from "../editsetting";
import JobsAlerts from "../jobalerts";
import CreateJobAlert from "../jobalerts/pages/CreateJobAlert";
import Profile from "../profile";
import SavedJobs from "../savedjobs";
import Setting from "../setting";

import ProtectedRoute from "./protectedroute";

import "../login/login-style.css";

function AppRouter() {
  const user = useSelector(selectUser);

  return (
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route path="search" element={<Search />} />
      <Route path="job-detail" element={<JobDetail />} />
      <Route element={<ProtectedRoute isAllowed={!user?.email} />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route element={<ProtectedRoute isAllowed={!!user?.email} />}>
        <Route path="apply" element={<ApplyPage />} />
        <Route path="account" element={<Account />}>
          <Route path="settings" element={<Setting />} />
          <Route path="profile" element={<Profile />} />
          <Route path="job-alerts" element={<JobsAlerts />} />
          <Route path="save-jobs" element={<SavedJobs />} />
          <Route path="edit-setting" element={<EditSetting />} />
          <Route
            path="deletion-confirmation"
            element={<DeletionConfirmation />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="account/job-alerts/new" element={<CreateJobAlert />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;
