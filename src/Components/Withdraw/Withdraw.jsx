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
import { useNavigate } from "react-router-dom";
import bg from "../../Images/bg.png";
import img22 from "../../Images/img22.jpeg";
import img24 from "../../Images/img24.png";

function Withdraw() {
  const navigate = useNavigate();
  const [withdrawalAmount, setWithdrawalAmount] = useState(""); // State to track withdrawal amount
  const [error, setError] = useState(""); // State to handle errors

  // Handle withdrawal amount input change
  const handleAmountChange = (event) => {
    const value = event.target.value;
    setWithdrawalAmount(value);
    setError(""); // Clear any previous errors
  };

  // Handle withdrawal logic
  const handleWithdraw = () => {
    const amount = parseFloat(withdrawalAmount);

    // Validate the withdrawal amount
    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid withdrawal amount.");
      return;
    }

    // Check minimum withdrawal amount (1,000,000 tokens)
    const MIN_WITHDRAWAL = 1000000;
    if (amount < MIN_WITHDRAWAL) {
      setError(`Minimum withdrawal amount is ${MIN_WITHDRAWAL} tokens.`);
      return;
    }

    // Calculate platform fee (25%)
    const platformFee = amount * 0.25;
    const finalAmount = amount - platformFee;

    // Convert tokens to SOL (assuming 100,000 tokens = 1 SOL)
    const conversionRate = 100000;
    const solAmount = finalAmount / conversionRate;

    // Display withdrawal details (you can replace this with actual withdrawal logic)
    alert(
      `Withdrawal successful!\n` +
        `Withdrawal Amount: ${amount} tokens\n` +
        `Platform Fee: ${platformFee} tokens\n` +
        `Final Amount: ${finalAmount} tokens\n` +
        `Amount in SOL: ${solAmount.toFixed(6)} SOL`
    );

    // Reset the form
    setWithdrawalAmount("");
    setError("");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        color: "white",
        display: "flex",
        width: "100%",
        position: "relative",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        paddingTop: "20px",
        // Remove bottom padding to avoid gap above fixed footer
        paddingBottom: 0,
        // paddingX: "20px",
        boxSizing: "border-box",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontFamily: "Poppins", fontSize: "36px", fontWeight: "700" }}
      >
        Withdraw
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
          width: "81%",
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
            2. Platform Fee: A platform fee of <b>25%</b> will be deducted from
            the withdrawal amount.
          </Typography>
          <Typography variant="body2" textAlign="left" mt={1}>
            3. Minimum Withdrawal: The minimum withdrawal amount is{" "}
            <b>1,000,000</b> tokens.
          </Typography>
          <Typography variant="h6" fontWeight={600} textAlign="left" mt={2}>
            Enter Withdrawal Amount
          </Typography>
          <TextField
            placeholder="Enter the amount here..."
            fullWidth
            value={withdrawalAmount}
            onChange={handleAmountChange}
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
              "& .MuiInputBase-input": {
                 
                color: "#ffffff", // Set text color to white
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#ffffff",
                opacity: 1,
              },
            }}
          />
          {error && (
            <Typography variant="body2" color="error" mt={1}>
              {error}
            </Typography>
          )}
          <Typography variant="body2" color="white" mt={1}>
            = {withdrawalAmount ? (withdrawalAmount / 100000).toFixed(6) : "0"}{" "}
            SOL
          </Typography>
        </CardContent>
      </Card>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#F44336",
          color: "#ffffff",
          textTransform: "none",
          width: "45%",
          height: "50px",
          borderRadius: "20px",
          fontSize: "16px",
          fontWeight: "500",
          marginTop: "10px",
        }}
        onClick={handleWithdraw}
      >
        <img
          src={img24}
          alt="Token"
          width="25px"
          style={{ marginRight: "10px" }}
        />
        Withdraw
      </Button>
    </Box>
  );
}

export default Withdraw;
