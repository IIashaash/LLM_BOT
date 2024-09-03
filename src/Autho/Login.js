import React, { useState, useContext, useEffect } from "react";
import swal from "sweetalert";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";
import { AuthContext } from "../services/AuthContext"; // Adjust the path as needed

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login ,currentUser} = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(()=>{
    if(currentUser){
      navigate('/')
    }
  },[currentUser,navigate])

  const handleLogin = async () => {
    try {
      const user = await login(email, password);
      if (user) {
        swal({
          title: "Success!",
          text: "Login Successful!",
          icon: "success",
          button: "Ok",
        });
        navigate("/");
      }
    } catch (error) {
      swal({
        title: "Login Failed!",
        text: "Username or Password are not matched",
        icon: "error",
        button: "Ok",
      });
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <div
      className="col-sm-3 col-lg-4 mx-auto"
      style={{
        position: 'fixed',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: "rgb(242 233 233 / 100%) 0px 0px 10px 0px",
        borderRadius: "10px",
        padding: "25px",
      }}
    >
      <h2 className="text-center mb-6">LOGIN</h2>
      <div className="col-md-8 mx-auto my-4">
        <input
          className="my-3 p-3 form-control fs-5 form_input"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="my-3 p-3 form-control fs-5 form_input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btn btn-danger w-100 p-3"
          id="submit_button"
          onClick={handleLogin}
        >
          Login
        </button>

        <Link to="/forgotpwd">
          <button className="btn btn-link">Forgot Password?</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
