import React, { useState, useEffect } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation hook
import img10 from "../../Images/img10.png";
import img11 from "../../Images/img11.png";
import img12 from "../../Images/img12.png";

const Footer = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Get current location
  
  // Determine active tab based on current route
  const getActiveTab = () => {
    switch (location.pathname) {
      case "/":
      case "/game":
        return 0; // Game tab
      case "/earn":
        return 1; // Earn tab
      case "/profile":
        return 2; // Profile tab
      default:
        return 0; // Default to Game tab
    }
  };

  const [value, setValue] = useState(getActiveTab());

  // Update value when location changes
  useEffect(() => {
    setValue(getActiveTab());
  }, [location.pathname]);

  return (
    <Paper
      className="footer-component"
      sx={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "90%",
        maxWidth: "400px",
        height: "70px", // Set consistent height
        backgroundColor: "#161b22",
        display: "flex",
        justifyContent: "space-around",
        padding: "8px 0",
        borderRadius: "12px 12px 0 0",
        zIndex: 9999, // Ensure footer is always on top
        boxShadow: "0px -4px 20px rgba(0, 0, 0, 0.3)", // Add shadow for better visibility
        border: "1px solid rgba(255, 255, 255, 0.1)", // Add subtle border
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => setValue(newValue)} // Update value state
        sx={{
          backgroundColor: "transparent",
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          "& .MuiBottomNavigationAction-root": {
            minWidth: "auto",
            padding: "6px 8px",
          },
        }}
      >
        {/* Game Icon */}
        <BottomNavigationAction
          label="Game"
          icon={
            <img
              src={img10}
              alt="Game"
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%", // Ensure the icon is circular
                transition: "all 0.3s ease", // Smooth transition for hover effect
                filter: value === 0 ? "drop-shadow(0px 0px 8px #ffcc00)" : "none", // Add glow effect for active state
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0px 0px 10px 5px #ffcc00";
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
          }
          onClick={() => navigate("/game")} // Navigate to /game on click
          sx={{
            color: value === 0 ? "#ffcc00" : "#ffffff",
            position: "relative",
            "& .MuiBottomNavigationAction-label": {
              fontSize: "12px",
              fontWeight: value === 0 ? "600" : "400",
              transition: "all 0.3s ease",
            },
            ...(value === 0 && {
              textShadow: "0px 0px 10px #ffcc00",
            }),
          }}
        />
        {/* Earn Icon */}
        <BottomNavigationAction
          label="Earn"
          icon={
            <img
              src={img11}
              alt="Earn"
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%", // Ensure the icon is circular
                transition: "all 0.3s ease", // Smooth transition for hover effect
                filter: value === 1 ? "drop-shadow(0px 0px 8px #ffcc00)" : "none", // Add glow effect for active state
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0px 0px 10px 5px #ffcc00";
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
          }
          onClick={() => navigate("/earn")} // Navigate to /earn on click
          sx={{
            color: value === 1 ? "#ffcc00" : "#ffffff",
            "& .MuiBottomNavigationAction-label": {
              fontSize: "12px",
              fontWeight: value === 1 ? "600" : "400",
              transition: "all 0.3s ease",
            },
            ...(value === 1 && {
              textShadow: "0px 0px 10px #ffcc00",
            }),
          }}
        />
        {/* Profile Icon */}
        <BottomNavigationAction
          label="Profile"
          icon={
            <img
              src={img12}
              alt="Profile"
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%", // Ensure the icon is circular
                transition: "all 0.3s ease", // Smooth transition for hover effect
                filter: value === 2 ? "drop-shadow(0px 0px 8px #ffcc00)" : "none", // Add glow effect for active state
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0px 0px 10px 5px #ffcc00";
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
          }
          onClick={() => navigate("/profile")} // Navigate to /profile on click
          sx={{
            color: value === 2 ? "#ffcc00" : "#ffffff",
            "& .MuiBottomNavigationAction-label": {
              fontSize: "12px",
              fontWeight: value === 2 ? "600" : "400",
              transition: "all 0.3s ease",
            },
            ...(value === 2 && {
              textShadow: "0px 0px 10px #ffcc00",
            }),
          }}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default Footer;