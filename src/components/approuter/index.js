import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import Account from "../../pages/account/account";
import Homepage from "../../pages/homepage";
import Login from "../../pages/login";
import NotFound from "../../pages/notfound";
import Register from "../../pages/register";
import { selectUser } from "../../store/user";
import JobsAlerts from "../jobalerts";
import SavedJobs from "../savedjobs";
import Setting from "../setting";

import ProtectedRoute from "./protectedroute";

function AppRouter() {
  const user = useSelector(selectUser);

  return (
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route exact path="login" element={<Login />} />
      <Route exact path="register" element={<Register />} />
      <Route element={<ProtectedRoute isAllowed={!!user?.email} />}>
        <Route path="account" element={<Account />}>
          <Route index element={<Setting />} />
          <Route path="job_alerts" element={<JobsAlerts />} />
          <Route path="saved_jobs" element={<SavedJobs />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;
