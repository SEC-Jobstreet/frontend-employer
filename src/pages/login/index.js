import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import CustomButton from "../../components/custombutton";
import { loginAccount } from "../../store/user";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = () => {
    // Handle the form submission
    // After verify
    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRoYW5oIFF1eSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJlbWFpbCI6ImNhbmRpZGF0ZWpvYnN0cmVldEBnbWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZyZWVwaWsuY29tLzI1Ni8xMDc3LzEwNzcxMTQucG5nIiwiZXhwIjoxNzI2Mjk5OTIyfQ.bspjeO6l3cKFvmzbozZCMutaT-shlVmDuKCKE3ql68w";
    localStorage.setItem("access-token", accessToken);
    const data = jwtDecode(accessToken);
    dispatch(loginAccount(data));
    navigate("/home");
  };
  return (
    <div>
      This is login
      <CustomButton type="submit" color="green" onClick={() => handleLogin()}>
        Đăng nhập
      </CustomButton>
      <CustomButton type="button" onClick={() => navigate("/register")}>
        Đăng ký
      </CustomButton>
    </div>
  );
}

export default Login;
