import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

import NavBar from "./components/appnav";
import AppRouter from "./components/approuter";
import Footer from "./components/footer";
import { loginAccount, logoutAccount } from "./store/user";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [rehydrated, setReHyddated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkToken = () => {
      const accessToken = localStorage.getItem("access-token");

      if (accessToken) {
        const exp = new Date(jwtDecode(accessToken).exp);
        if (new Date() > new Date(exp * 1000)) {
          localStorage.removeItem("access-token");
          dispatch(logoutAccount());
        }
        const data = jwtDecode(accessToken);
        dispatch(loginAccount(data));
      }
    };
    checkToken();
    setReHyddated(true);
  }, []);

  return (
    rehydrated && (
      <div className="App">
        <NavBar />
        <div className="app-content">
          <AppRouter />
        </div>
        <Footer />
      </div>
    )
  );
}

export default App;
