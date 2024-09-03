import React, {useEffect, useState } from "react";
import swal from "sweetalert";
import "./style.css";
import Parse from "parse";
import { useNavigate } from "react-router-dom";
import { initializeParse } from '../services/parseConfig';
initializeParse();


const Forgotpwd = () => {
  useEffect(() => {
    initializeParse();
  }, []);
  
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    try {
      // Send a password reset email to the entered email address
      await Parse.User.requestPasswordReset(email);
      swal({
        title: "Password Reset Request Sent!",
        text: "Please check your email for reset your password.",
        icon: "success",
        button: "Ok",
      });
      navigate("/login"); 
    } catch (error) {
      swal({
        title: "Password Reset Failed!",
        text: `Error sending password reset email: ${error.message}`,
        icon: "error",
        button: "Ok",
      });
      console.error("Error sending password reset email:", error.message);
    }
  };

  return (
    <div className="container col-sm-3 col-lg-4 mx-auto logintable">
      <div
        style={{
          boxShadow: " 0px 0px 5px 0px rgba(0,0,0,0.75)",
          borderRadius: "10px",
          padding: "30px",
          marginTop: "180px",
          marginBottom: "40px",
        }}
      >
        <input
          className="my-3 p-3 form-control fs-5 form_input"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="btn btn-danger w-100 p-3"
          id="submit_button"
          onClick={handleForgotPassword}
          >
          Send Reset Email
        </button>
      </div>
    </div>
  );
};

export default Forgotpwd;
