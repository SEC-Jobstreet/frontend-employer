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
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwicGljdHVyZSI6Imh0dHBzOi8vY2RuLWljb25zLXBuZy5mcmVlcGlrLmNvbS8yNTYvMTA3Ny8xMDc3MTE0LnBuZyIsImV4cCI6MTcyNjI5OTkyMiwiZW1haWwiOiJ0aGFuaHF1eTExMDVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJzdE5hbWUiOiJUaGFuaCIsImxhc3ROYW1lIjoiUXV5IiwicGhvbmUiOiIwODU4MzYzODQ4In0.FHPVfASkakGLPuZxxB9y9RU12FUuLD8KzLQqN_w1Nq8";
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
