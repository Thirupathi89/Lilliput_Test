import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { QRCodeCanvas } from "qrcode.react"; // Import QR code generator
import { useNavigate } from "react-router-dom";
import bg from "../../Images/bg.png";
import img22 from "../../Images/img22.jpeg";
import img23 from "../../Images/img23.png";

function Deposit() {
  const navigate = useNavigate();
  const [depositUrl, setDepositUrl] = useState("");

  // Handle Generate QRCode for Solana
  const handleGenerateQRCode = () => {
    const generateUrl = "https://solana-wallet.com/deposit?amount=0.001";
    setDepositUrl(generateUrl); // Set Deposit URL
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        position: depositUrl ? "static":"fixed", // Adjust position based on QR code state
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        paddingTop: "20px",
        // Remove bottom padding to avoid gap above fixed footer
        paddingBottom: 0,
        overflowY: depositUrl ? "auto" : "hidden", // Adjust overflow based on QR code state
        boxSizing: "border-box",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontFamily: "Poppins", fontSize: "36px", fontWeight: "700" }}
      >
        Deposit
      </Typography>
      <Avatar src={img22} sx={{ width: 80, height: 80 }} />
      <Typography
        variant="h6"
        sx={{
          marginTop: 1,
          fontFamily: "Open sans",
          fontWeight: "600",
          fontSize: "24px",
        }}
      >
        Name
      </Typography>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#A2A8B4",
          fontFamily: "Poppins",
          fontWeight: "400",
          fontSize: "20px",
          color: "#ffffff",
          textTransform: "none",
          width: "85%",
          marginTop: 1,
        }}
      >
        Solana Wallet Address
      </Button>
      <Card
        sx={{
          width: 350,
          borderRadius: 4,
          textAlign: "center",
          backgroundColor: "#252B36",
          color: "white",
          paddingY: 2,
          marginTop: "10px",
        }}
      >
        <CardContent>
          <Typography variant="h6" fontWeight={600} textAlign="left">
            Important Information
          </Typography>
          <Typography variant="body2" textAlign="left" mt={1}>
            1. Conversion Rate: <b style={{ color: "#FFD700" }}>100,000</b>{" "}
            tokens are equivalent to <b style={{ color: "#FFD700" }}>US$1</b>.
          </Typography>
          <Typography variant="body2" textAlign="left" mt={1}>
            2. Minimum Deposit: The minimum deposit amount is{" "}
            <b style={{ color: "#FFD700" }}>0.001 SOL</b>
          </Typography>
          <Typography variant="h6" fontWeight={600} textAlign="left" mt={2}>
            Enter Deposit Amount
          </Typography>
          <TextField
            placeholder="Enter the amount here..."
            fullWidth
            sx={{
              mt: 1,
              borderRadius: 1,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#FFD700",
                },
                "&:hover fieldset": {
                  borderColor: "#FFD700",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#FFD700",
                },
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#ffffff",
                opacity: 1,
              },
            }}
          />
          <Typography variant="body2" color="white" mt={1}>
            = 0 Tokens
          </Typography>
        </CardContent>
      </Card>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#00B302",
          color: "#ffffff",
          textTransform: "none",
          width: "60%",
          height: "80px",
          borderRadius: "20px",
          fontSize: "20px",
          fontWeight: "500",
          marginTop: "10px",
        }}
        onClick={handleGenerateQRCode}
      >
        <img
          src={img23}
          alt="Token"
          width="40px"
          style={{ marginRight: "10px" }}
        />
        Generate Deposit URL
      </Button>

      {/* Show QR Code if deposit URL is generated */}
      {depositUrl && (
        <Card
          sx={{
            width: "350px",
            borderRadius: "10px",
            textAlign: "center",
            color: "white",
            paddingY: 2,
            backgroundColor: "#252B36",
            marginTop: "20px",
            marginBottom: "100px",
          }}
        >
          <CardContent>
            <Typography variant="h6" fontWeight={600} textAlign="center">
              Deposit Request
            </Typography>
            <Typography variant="body2" textAlign="center" mt={1}>
              Pay either by scanning the QR or Using Phantom Wallet.
            </Typography>
            <Box display="flex" justifyContent="center" mt={2}>
              <QRCodeCanvas value={depositUrl} size={200} />
            </Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#00B302",
                color: "#ffffff",
                textTransform: "none",
                width: "60%",
                height: "80px",
                borderRadius: "20px",
                fontSize: "20px",
                fontWeight: "500",
                marginTop: "10px",
              }}
              onClick={() => window.open(depositUrl, "_blank")}
            >
              Pay with Phantom
            </Button>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

export default Deposit;
