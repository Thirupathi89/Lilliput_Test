import React, { useContext } from "react";
import {
  Box,
  Button,
  LinearProgress,
  Grid,
  Avatar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import bg from "../../Images/bg.png";
import img22 from "../../Images/img22.jpeg";
import { BsWalletFill } from "react-icons/bs";
import img21 from "../../Images/img21.png";
import img23 from "../../Images/img23.png";
import img24 from "../../Images/img24.png";
import img25 from "../../Images/img25.png";
import { calculateHotColdNumbers } from "../../utils/hotColdNumbers";
import { MyContext } from "../../context/Mycontext";

function Profile() {
  const { winningNumberHistory } = useContext(MyContext);
  const { hotNumbers, coldNumbers } = calculateHotColdNumbers(winningNumberHistory);
  const navigate = useNavigate();

  // Sample statistics data for different cards
  const statisticData = [
    [
      { label: "Red", value: 50, percentage: 45 },
      { label: "Block", value: 75, percentage: 75 },
    ],
    [
      { label: "Even", value: 60, percentage: 60 },
      { label: "Odd", value: 40, percentage: 40 },
    ],
    [
      { label: "High(19-36)", value: 80, percentage: 80 },
      { label: "Low(1-18)", value: 20, percentage: 20 },
    ],
    [
      { label: "Even", value: 55, percentage: 55 },
      { label: "Odd", value: 45, percentage: 45 },
    ],
  ];

  // Card component to display two progress bars in one card
  const Card = ({ data }) => (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      sx={{
        width: "90%",
        height: "120px",
        backgroundColor: "#000000",
        borderRadius: "10px",
        padding: "10px",
      }}
    >
      {data.map((item, index) => (
        <Box key={index}>
          {/* Label and Percentage */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ color: "white" }}>{item.label}</Typography>
            <Typography sx={{ color: "white" }}>{item.percentage} %</Typography>
          </Box>
          {/* Progress Bar */}
          <Box sx={{ flexGrow: 1, position: "relative" }}>
            <LinearProgress
              variant="determinate"
              value={item.value}
              sx={{
                height: 12,
                borderRadius: 6,
                backgroundColor: "#ddd",
                "& .MuiLinearProgress-bar": {
                  backgroundColor:
                    item.label === "Red"
                      ? "#E72D00"
                      : item.label === "Block"
                      ? "#000000"
                      : item.label === "Even"
                      ? "#4CAF50"
                      :item.label === "Odd"
                      ? "#FFC107"
                      : item.label === "High(19-36)"
                      ? "#FFD700"
                      : item.label === "Low(1-18)"
                      ? "#1266AA"
                      : item.label === "Even"
                      ? "#4CAF50"
                      :"#FFC107"
                },
              }}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        color: "white",
        width: "100%",
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
        boxSizing: "border-box",
        // paddingX: "20px",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontFamily: "Poppins", fontSize: "36px", fontWeight: "700" }}
      >
        Profile
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
          width: "86%",
          marginTop: 1,
        }}
      >
        Solana Wallet Address
      </Button>
      <Typography
        sx={{
          marginTop: 1,
          fontSize: "16px",
          fontFamily: "Poppins",
          fontWeight: "600",
          color: "#F44336",
        }}
      >
        Solana Wallet Address is Mandatory
      </Typography>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#938a7a",
          fontFamily: "Poppins",
          fontWeight: "600",
          fontSize: "18px",
          color: "#352505",
          textTransform: "none",
          width: "80%",
          height: "70px",
          borderRadius: "20px",
          marginTop: 1,
        }}
      >
        <BsWalletFill size={30} /> Register Wallet Address
      </Button>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#252b36",
          borderRadius: "10px",
          padding: "10px",
          marginTop: "10px",
          width: "86%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "90%",
            padding: "10px",
          }}
        >
          <Box
            sx={{
              width: "130px",
              padding: "10px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#A2A8B4",
                fontFamily: "Poppins",
                fontSize: "16px",
                fontWeight: "700",
              }}
            >
              Games Played {winningNumberHistory.length}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "110px",
              padding: "10px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#A2A8B4",
                fontFamily: "Poppins",
                fontSize: "16px",
                fontWeight: "700",
              }}
            >
              Games Won {Math.floor(winningNumberHistory.length * 0.3)}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: "80%", borderTop: "2px solid #A2A8B4" }} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "90%",
            padding: "10px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#A2A8B4",
              fontFamily: "Poppins",
              fontSize: "16px",
              fontWeight: "700",
            }}
          >
            Token Balance
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#A2A8B4",
              fontFamily: "Poppins",
              fontSize: "16px",
              fontWeight: "700",
            }}
          >
            <img src={img21} alt="Token" width="25px"  style={{ marginRight: "10px" }}  />
            1470 Tokens
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "80%",
          height: "80px",
          padding: "10px",
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#00B302",
            color: "#ffffff",
            textTransform: "none",
            width: "45%",
            height: "50px",
            borderRadius: "20px",
            fontSize: "16px",
            fontWeight: "500",
          }}
          onClick={() => navigate("/deposit")}
        >
          <img
            src={img23}
            alt="Token"
            width="25px"
            style={{ marginRight: "10px" }}
            
          />
          Deposit
        </Button>
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
          }}
          onClick={() => navigate("/withdraw")}
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
      {/* Statistics section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          width: "90%",
          marginTop: "20px",
          backgroundColor: "#252b36",
          borderRadius: "10px",
          marginBottom: "80px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#A2A8B4",
            fontFamily: "Poppins",
            fontSize: "20px",
            fontWeight: "700",
            padding: "10px",
          }}
        >
          Statistics
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "10px",
              flexGrow: 1,
              marginRight: "10px",
            }}
          >
            <Typography
              sx={{
                width: "100px",
                color: "#A2A8B4",
                fontFamily: "Poppins",
                fontSize: "16px",
                fontWeight: "700",
              }}
            >
              Hot <span style={{ fontSize: "24px" }}>🔥</span>
              {hotNumbers.join(", ")}
            </Typography>
            <Typography
              sx={{
                color: "#A2A8B4",
                fontFamily: "Poppins",
                fontSize: "16px",
                fontWeight: "700",
              }}
            >
              Cold <span style={{ fontSize: "24px" }}>❄️</span>
              {coldNumbers.join(", ")}{" "}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" sx={{ padding: "10px" }}>
            <img
              src={img25}
              alt="Token"
              width="150px"
              style={{ marginRight: "10px" }}
            />
          </Box>
        </Box>
        {/* // Progress bars section */}
        <Box sx={{ padding: "20px" }}>
          <Grid container spacing={4}>
            {statisticData.map((data, index) => (
              <Grid item xs={6} key={index}>
                <Card data={data} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default Profile;
