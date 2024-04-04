import { Outlet } from "react-router-dom";

import MyAccount from "../../components/myaccount/myaccount";

function Account() {
  return (
    <MyAccount>
      <Outlet />
    </MyAccount>
  );
}

export default Account;
