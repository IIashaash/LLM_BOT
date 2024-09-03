import React,{useState,useEffect} from 'react'
import Logo from '../Images/logo.png'
// import AddIcon from '@material-ui/icons/Add';

const Menu = ({ showFileAtRAg  , clearHistory}) => {
  const [chatType, setChatType] = useState("");
  
  const handleChatTypeChange = (e) => {
    const selectedChatType = e.target.value;
    setChatType(selectedChatType);
    // Call the showFileAtRAg prop to show/hide the file input
    showFileAtRAg(selectedChatType === "Rag Evaluation");
  };


  return (
    <>
        <aside className="sidebar">
          <div className="app-logo">
            <img className="clogo" src={Logo} alt="logo" />
          </div>
          <div className="right">
            
            <div className="form-group">
              <select
                className="selectmodel"
                onChange={handleChatTypeChange}
                value={chatType}
              >
                <option value="">Choose Chat Type</option>
                <option value="Rag Evaluation">Rag Evaluation</option>
                <option value="Chat Bot">Chat Bot</option>
              </select>
            </div>
            <div className='addicon'>
              <button onClick={clearHistory} >Clear chat</button>
            </div>

            {/* <div className="form-group">
              <select className="selectmodel">
                <option value="">Choose Model</option>
                <option value="">Rag</option>
                <option value="">Chat Bot</option>
              </select>
            </div>                      
            <div className="form-group">
              <label>Select your file Type?</label>
              <select defaultValue="pdf">
                <option value="pdf">pdf</option>
              </select>
            </div>
            <div className="form-group">
              <label>Select your file Type?</label>
              <select defaultValue="recursive">
                <option value="recursive">recursive</option>
              </select>
            </div>
            <div className="form-group">
              <label>Enter Chunk Size</label>
              <input type="number" defaultValue="1000" />
            </div>
            <div className="form-group">
              <label>Enter Chunk Overlap Size</label>
              <input type="number" defaultValue="100" />
            </div>
            <div className="form-group">
              <label>Evaluation Type</label>
              <select defaultValue="single">
                <option value="single">single</option>
                <option value="double">Double</option>
              </select>
            </div> */}
            {/* <div className='addicon'>
              History 
            </div> */}
          </div>
        </aside>
        </>
  )
}

export default Menu