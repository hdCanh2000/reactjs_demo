import { Input } from "antd";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { postLogin } from "../../services/LoginService";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  const handelLogin = async () => {
    if (email || password) {
      let dataLogin = { email: email.trim(), password: password.trim() };
      setLoadingLogin(!loadingLogin);
      let response = await postLogin(dataLogin);
      console.log(response);
      if (response && response.token) {
        localStorage.setItem("token", response.token);
        toast.success("Login Success!!!");
        navigate("/");
      }
      if (response && response.status === 400) {
        toast.error(response.data.error);
      }
    } else {
      toast.error("Email/Password is required!!!");
    }
    setLoadingLogin(false);
  };

  const handlePressEnter = (event) => {
    if (event.keyCode === 13) {
      handelLogin();
    }
  };

  return (
    <>
      <div className="login-container col-12 col-lg-4">
        <div className="title">Log In</div>
        <div className="text">Email ( eve.holt@reqres.in )</div>
        <Input
          className="text-input"
          type="text"
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="text">Password( cityslicka )</div>
        <div className="input-pass">
          <Input
            className="text-input"
            type={showPassword === true ? "text" : "password"}
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => handlePressEnter(e)}
          />
          <i
            className={
              showPassword === true
                ? "fa-solid fa-eye"
                : "fa-solid fa-eye-slash"
            }
            onClick={() => setShowPassword(!showPassword)}
          ></i>
        </div>
        <Button
          className="btn-login"
          disabled={!email || !password || loadingLogin ? true : false}
          variant="outline-primary"
          onClick={() => handelLogin()}
        >
          {loadingLogin === true ? (
            <i className="fa-solid fa-sync fa-spin"></i>
          ) : (
            "Login"
          )}
        </Button>
        <div className="btn-go-back">
          <Link className="btn btn-success" to="/">
            <i className="fa-solid fa-arrow-left"></i> Go Back Home
          </Link>
          {/* <Button className="btn btn-success">
            <i className="fa-solid fa-arrow-right"></i> Go To Register
          </Button> */}
        </div>
      </div>
    </>
  );
};

export default Login;
