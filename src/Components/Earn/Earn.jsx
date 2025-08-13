import React from "react";
import { Box, Button, Card, CardContent, LinearProgress, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import TelegramIcon from "@mui/icons-material/Telegram";
import bg from "../../Images/bg.png";
import img19 from "../../Images/img19.png";
import img20 from "../../Images/img20.png";
import img21 from "./../../Images/img21.png";
import { MdGroups } from "react-icons/md";
import { FaCopy } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";




const Earn = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
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
        paddingX: "20px",
        boxSizing: "border-box",
      }}
    >
      {/* Title */}
      <Typography variant="h4" 
      sx={{
        fontFamily: "Poppins",
        fontSize: "36px",
        fontWeight: "700",
      }}
      >
        Earn Rewards
      </Typography>
      <Typography variant="body2"
      sx={{
        fontFamily: "Poppins",
        fontSize: "16px",
        fontWeight: "700",
      }}
      >
        Complete Tasks and Earn Rewards
    </Typography>

      {/* Stats Card */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#24344D",
          borderRadius: "10px",
          padding: "15px",
          width: "90%",
          marginTop: "15px",
        }}
      >
        <Box display="flex" alignItems="center" >
          <img src={img20} alt="Friends" width="50px" style={{mixBlendMode: "hard-light", borderRadius: "50%"}} />
          <Box>
            <Typography variant="h6" sx={{fontFamily: "Open sans", fontSize: "20px", fontWeight: "600" }}>30</Typography>
            <Typography variant="body2" sx={{fontFamily: "Open sans", fontSize: "16px", fontWeight: "600"}}>Friends Referred</Typography>
          </Box>
        </Box>

        <Box display="flex" alignItems="center">
          <img src={img19} alt="Tokens" width="50px" style={{mixBlendMode: "hard-light", borderRadius: "50%"}} />
          <Box>
            <Typography variant="h6" sx={{fontFamily: "Open sans", fontSize: "20px", fontWeight: "600" }}>300</Typography>
            <Typography variant="body2" sx={{fontFamily: "Open sans", fontSize: "16px", fontWeight: "600"}}>Tokens Earned</Typography>
          </Box>
        </Box>
      </Box>

      {/* Refer a Friend Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "90%",
          marginTop: "15px",
        }}
      >
        <Button
          variant="contained"
          sx={{
            display: "flex",
            backgroundColor: "#2c5f9e80",
            color: "white",
            height: "55px",
            flex: 1,
            textTransform: "none",
            fontFamily: "Poppins",
            fontSize: "20px",
            fontWeight: "400",
             marginRight: "10px",
             gap: "10px",
          }}
        >
          Refer a Friend <MdGroups size={48} />

        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#2c5f9e80",
            color: "white",
            marginLeft: "10px",
            minWidth: "50px",
          }}
        >
          <FaCopy  size={38} />
        </Button>
      </Box>

      {/* Progress Bar */}
      <Box sx={{ width: "90%", marginTop: "20px" }}>
        
        <Box display="flex" alignItems="center" justifyContent="space-between">
          
          <Typography variant="body2" sx={{fontFamily: "Roboto", fontWeight: "700", fontSize: "20px"}}>Task Progression</Typography>
          <Typography mr={2} sx={{fontFamily: "Roboto", fontWeight: "700", fontSize: "20px"}}>50/100</Typography>
        </Box>
        <LinearProgress
            variant="determinate"
            value={50}
            sx={{
              width: "100%",
              height: "14px",
              borderRadius: "5px",
              backgroundColor: "#ddd",
              "& .MuiLinearProgress-bar": { backgroundColor: "#FFC107" },
            }}
          />
      </Box>

      {/* Watch Ads Section */}
      <Box sx={{ width: "90%", marginTop: "20px" }}>
        <Typography variant="h6" display="flex" justifyContent="left">Watch Ads to Earn</Typography>

        {[1, 2].map((_, index) => (
          <Card
            key={index}
            sx={{
              backgroundColor: "#000000",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
                borderRadius: "15px",
              padding: "3px",
              marginTop: "10px",
            }}
          >
            <TelegramIcon sx={{ color: "#ffffff", width: "50px", height: "50px", backgroundColor: "#269cf4", borderRadius: "10px", fontSize: 30, marginLeft: "10px" }} />
            <CardContent sx={{ display: "flex", flexDirection: "column", }}>
              <Typography sx={{color: "#ffffff"}}>WATCH THE AD</Typography>
              <Box display="flex" alignItems="center">
                <img src={img21} alt="Token" width="25px" />
                <Typography variant="body2" sx={{ marginLeft: "5px", color: "#D88743", fontFamily: "Modum", fontWeight: "700", fontSize: "20px" }}>
                  100
                </Typography>
              </Box>
            </CardContent>
            <IoIosArrowForward size={40} color="#ffffff" />
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Earn;
