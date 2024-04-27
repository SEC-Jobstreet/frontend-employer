import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import Account from "../../pages/account/account";
import Business from "../../pages/business";
import DeletionConfirmation from "../../pages/deletionconfirm";
import Homepage from "../../pages/homepage";
import HomepageLogin from "../../pages/homepagelogin";
import Login from "../../pages/login";
import NotFound from "../../pages/notfound";
import PostJob from "../../pages/postjob";
import Register from "../../pages/register";
import Setting from "../../pages/setting";
import UpdatePassword from "../../pages/updatepassword";
import UpdateProfile from "../../pages/updateprofile";
import VerifyEmail from "../../pages/verifyemail";
import { selectUser } from "../../store/user";

import ProtectedRoute from "./protectedroute";

function AppRouter() {
  const user = useSelector(selectUser);
  return (
    <Routes>
      <Route element={<ProtectedRoute isAllowed={!user?.email} />}>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="login" element={<Login />} />
        <Route exact path="register" element={<Register />} />
      </Route>

      <Route element={<ProtectedRoute isAllowed={!!user?.email} />}>
        <Route path="home" element={<HomepageLogin />} />
        <Route path="post_job" element={<PostJob />} />
        <Route path="business" element={<Business />} />
        <Route path="account" element={<Account />}>
          <Route path="verify-email" element={<VerifyEmail />} />
          <Route path="settings" element={<Setting />} />
          <Route path="update-profile" element={<UpdateProfile />} />
          <Route path="update-password" element={<UpdatePassword />} />
          <Route
            path="deletion_confirmation"
            element={<DeletionConfirmation />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;
