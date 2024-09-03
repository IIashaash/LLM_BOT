import React, { useState, useEffect } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import RightSide from "./RightSide";
import Menu from "./Menu";
import Parse from "parse";
import { initializeParse } from "../services/parseConfig";

initializeParse();

const Index = () => {
  const navigate = useNavigate();
  const [showFileInput, setShowFileInput] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);


  const clearHistory = () => {
    localStorage.removeItem("chatHistory");
    setChatHistory([]);
    window.location.reload();
    console.log("Chat history cleared");

  }
  useEffect(() => {
    const currentUser = Parse.User.current();
    if (!currentUser) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="app">
      <div className="fullcontainer">
        
        <Menu showFileAtRAg={setShowFileInput} clearHistory={clearHistory} />
        <RightSide showFileInput={showFileInput} clearHistory={clearHistory} />
      </div>
    </div>
  );
};

export default Index;
