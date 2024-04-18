import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import MyAccount from "../../components/myaccount/myaccount";

function Account() {
  const location = useLocation();
  const [showMainAccount, setShowMainAccount] = useState(true);

  useEffect(() => {
    setShowMainAccount(location.pathname === "/account");
  }, [location]);

  return (
    <>
      {showMainAccount && <MyAccount />}
      <Outlet />
    </>
  );
}

export default Account;
