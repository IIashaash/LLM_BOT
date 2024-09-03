import React, { useContext, useState } from "react";
import { AuthContext } from "../services/AuthContext"; // Adjust the path as needed
import { useNavigate, Link } from "react-router-dom";
import "./index.css"; // Adjust the path as needed
import LogoutIcon from "@mui/icons-material/Logout";

const UserMenu = () => {
  const { currentUser, initialLetter, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setShowLogout(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="user-info">
      <div className="position-relative">
      <div
        className="account" 
        onClick={toggleMenu}
        style={{ height: "50px", width: "50px", cursor: "pointer" }}
      > {initialLetter} </div>
      {menuOpen && currentUser !== null && (
        <div className="dropdown-menu position-absolute end-0 mt-2" style={{ zIndex: 1000 }}>

           <Link
              className="dropdown-item"
              to="/login"
              onClick={() => {
                handleLogout();
                // closeMenu();
              }}
            >
              <LogoutIcon className="logouticon" />
              Log out
            </Link>
        </div>
      )}
    </div>

    
    </div>
  );
};

export default UserMenu;
