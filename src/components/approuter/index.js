import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import Account from "../../pages/account/account";
import Business from "../../pages/business";
import CreateBusiness from "../../pages/business/pages/create";
import DetailsBusiness from "../../pages/business/pages/details";
import EditBusiness from "../../pages/business/pages/edit";
import Candidates from "../../pages/candidates";
import CloseJobSuccess from "../../pages/closejobsuccess";
import DeletionConfirmation from "../../pages/deletionconfirm";
import EditJob from "../../pages/editjob";
import Homepage from "../../pages/homepage";
import HomepageLogin from "../../pages/homepagelogin";
import Login from "../../pages/login";
import NotFound from "../../pages/notfound";
import PostJob from "../../pages/postjob";
import PostJobSuccess from "../../pages/postjobsuccess";
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
      <Route path="verify-email" element={<VerifyEmail />} />
      <Route
        element={
          <ProtectedRoute isAllowed={user.email === ""} redirectPath="/home" />
        }
      >
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="login" element={<Login />} />
        <Route exact path="register" element={<Register />} />
      </Route>

      <Route element={<ProtectedRoute isAllowed={user.email !== ""} />}>
        <Route path="home" element={<HomepageLogin />} />
        <Route path="business" element={<Business />} />
        <Route path="post-job" element={<PostJob />} />
        <Route path="post-job-success" element={<PostJobSuccess />} />
        <Route path="candidates" element={<Candidates />} />

        <Route path="business/create" element={<CreateBusiness />} />
        <Route path="business/:businessId/edit" element={<EditBusiness />} />
        <Route
          path="business/:businessId/details"
          element={<DetailsBusiness />}
        />

        <Route path="account" element={<Account />}>
          <Route path="settings" element={<Setting />} />
          <Route path="update-profile" element={<UpdateProfile />} />
          <Route path="update-password" element={<UpdatePassword />} />
          <Route
            path="deletion_confirmation"
            element={<DeletionConfirmation />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="close-job-success" element={<CloseJobSuccess />} />
        <Route path="edit-job/:id" element={<EditJob />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;
