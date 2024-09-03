import React, { useState, useRef, useEffect, useContext } from "react";
import "./index.css";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import { generateText } from "../services/api.services";
import { ClipLoader } from "react-spinners";
import { FaArrowCircleDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import User from "./Usermenu";
import { AuthContext } from "../services/AuthContext"; // Adjust the path as needed
import axios from 'axios';

const RightSide = ({ showFileInput, clearHistory }) => {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const chatBoxRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser, initialLetter } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login"); // Redirect to login if not logged in
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const savedChatHistory =
      JSON.parse(localStorage.getItem("chatHistory")) || [];
    setChatHistory(savedChatHistory);
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      const { scrollHeight, clientHeight } = chatBoxRef.current;
      setShowScrollButton(scrollHeight > clientHeight);
    }
  }, [outputText, loading]);

  useEffect(() => {
    const handleScroll = () => {
      if (chatBoxRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = chatBoxRef.current;
        setShowScrollButton(scrollTop + clientHeight < scrollHeight - 10);
      }
    };

    const chatBox = chatBoxRef.current;
    if (chatBox) {
      chatBox.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (chatBox) {
        chatBox.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // const handleFile = (e) => {
  //   const files = e.target.files[0];
  //   setFile(files);
  //   setFilename(files.name);
  // };

  const fileUpload = async (e) => {
    const files = e.target.files[0];
    setFile(files);
    setFilename(files.name);;


    if (!files) {
      alert('Please select a file first');
      return;
    }
    const formData = new FormData();
    formData.append('file', files);

    try {
      const response = await axios.post('http://localhost:4000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert("File uploaded"); // Ensure the backend sends a message in response
      console.log("file uploaded");
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
    }
  };

  const removeFile = () => {
    setFile(null);
    setFilename("");
  };

  const handleSend = async () => {
    setLoading(true);
    setShowScrollButton(false);
    try {
      const response = await generateText(inputText);
      setOutputText(response.output);
      const newChat = {
        input: inputText,
        output: response.output,
        score: response.Evalution_scores,
      };
      const updatedChatHistory = [...chatHistory, newChat];
      setChatHistory(updatedChatHistory);
      localStorage.setItem("chatHistory", JSON.stringify(updatedChatHistory));
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setLoading(true);
      e.preventDefault();
      handleSend();
      setInputText("");
    }
  };

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  return (
    <main className="content">
      <div className="user-info">
        <User />
      </div>

      <div className="rightSide">
        <div className="chat-box-wrapper" ref={chatBoxRef}>
          <div className="output">
            {chatHistory.map((chat, index) => (
              <div key={index} className="chat-message">
                <div>
                  <p className="lastinput">{chat.input}</p>
                </div>
                <p className="response">{chat.output}</p>
                <div className="scoreTable">
                  <table className="table table-dark table-striped-columns">
                    <thead>
                      <tr>
                        <th scope="col">Faithfulness</th>
                        <th scope="col">Context Relevancy</th>
                        <th scope="col">Answer Relevancy</th>
                      </tr>
                    </thead>
                    {chat.score && (
                      <tbody>
                        <tr>
                          <td>{chat.score.faithfulness}</td>
                          <td>{chat.score.context_relevancy}</td>
                          <td>{chat.score.answer_relevancy}</td>
                        </tr>
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            ))}
            {loading && (
              <div className="loading-container">
                <ClipLoader color={"blue"} loading={loading} size={50} />
              </div>
            )}
            {showScrollButton && (
              <button onClick={scrollToBottom} className="scroll-to-bottom">
                <FaArrowCircleDown className="scrolllogo" />
              </button>
            )}
          </div>
        </div>

        <div className="inputmodel">
          {/* <div className="suggestion-boxes">
           <div className="suggestion-box box1">Smart</div>
            <div className="suggestion-box">Bot 2</div>
            <div className="suggestion-box">Research</div>
            <div className="suggestion-box">Creative</div>
            <div className="suggestion-box">More</div>
          </div> */}

          {/* {file && (
            <div className="inputFile">
              <p>{filename}</p>
              <CloseIcon className="closeBtn" onClick={removeFile} />
            </div>
          )} */}

          <div className="fixed-input-area">
            {showFileInput && (
              <>
                <AttachFileIcon
                  className="attach-icon"
                  onClick={() => document.getElementById("fileInput").click()}
                  style={{ cursor: "pointer" }}
                />
                <input
                  id="fileInput"
                  type="file"
                  accept=".pdf"
                  hidden
                  onChange={fileUpload}
                />
              </>
            )}
            <input
              type="text"
              className="chat-input"
              placeholder="Type here to chat."
              value={inputText}
              onChange={(e) => {
                if (e.target.value.length <= 1024) {
                  setInputText(e.target.value);
                }
              }}
              onKeyPress={handleKeyPress}
              maxLength={1024}
            />
            <button type="button" className="send-button" onClick={handleSend}>
              &#x27A4;
            </button>
           
          </div>
        </div>
      </div>
    </main>
  );
};

export default RightSide;
