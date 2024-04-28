import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { decodeJWT, getCurrentUser } from "aws-amplify/auth";

import NavBar from "./components/appnav";
import AppRouter from "./components/approuter";
import Footer from "./components/footer";
import { loginAccount } from "./store/user";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [rehydrated, setReHyddated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await getCurrentUser();
        let userinfo = {
          username: res.username,
        };
        try {
          const idToken = localStorage.getItem(
            `CognitoIdentityServiceProvider.${process.env.REACT_APP_COGNITO_USER_POOL_CLIENT_ID}.${res.username}.idToken`
          );

          const data = decodeJWT(idToken);
          userinfo = {
            ...userinfo,
            email: data.payload.email,
          };
        } catch (err) {
          console.log(err);
        }
        dispatch(loginAccount(userinfo));
      } catch (err) {
        console.log(err);
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
