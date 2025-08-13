import React from "react";
import { Box, Button, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import bg from "../../Images/bg.png";

function Games() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        color: "white",
        display: "flex",
        flexDirection: "column",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        paddingTop: "20px",
        // Remove bottom padding to avoid gap above fixed footer
        paddingBottom: 0,
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontFamily: "Poppins",
          fontSize: "48px",
          fontWeight: "700",
          marginBottom: "40px",
          textAlign: "center",
        }}
      >
        Welcome to Spin Game
      </Typography>
      
      <Typography
        variant="h6"
        sx={{
          fontFamily: "Poppins",
          fontSize: "24px",
          fontWeight: "400",
          marginBottom: "60px",
          textAlign: "center",
          maxWidth: "600px",
          padding: "0 20px",
        }}
      >
        Experience the thrill of our roulette-style spin game. Place your bets and test your luck!
      </Typography>

      <Button
        variant="contained"
        onClick={() => navigate("/game")}
        sx={{
          backgroundColor: "#4CAF50",
          color: "white",
          fontFamily: "Poppins",
          fontWeight: "600",
          fontSize: "24px",
          textTransform: "none",
          width: "300px",
          height: "80px",
          borderRadius: "20px",
          "&:hover": {
            backgroundColor: "#45a049",
          },
        }}
      >
        🎰 Play Spin Game
      </Button>

      <Typography
        variant="body1"
        sx={{
          fontFamily: "Poppins",
          fontSize: "16px",
          fontWeight: "400",
          marginTop: "60px",
          textAlign: "center",
          maxWidth: "600px",
          padding: "0 20px",
          opacity: 0.8,
        }}
      >
        Choose your game and start playing! Check your profile to see hot and cold numbers statistics.
      </Typography>
    </Box>
  );
}

export default Games;
