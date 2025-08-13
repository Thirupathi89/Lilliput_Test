import React, { useEffect } from "react";
// import "./App.css";
import ReactGA from 'react-ga';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import TelegramIcon from "@mui/icons-material/Telegram";
import { Box, Button, Typography, Paper, CssBaseline } from "@mui/material";
import { UserProvider } from "./context/UserContext";
import { MyProvider } from "./context/Mycontext";
import { useTelegram } from "./Components/Hooks/useTelegram";
import Footer from "./Components/Footer/Footer";
import Games from "./Components/Games/Games";
import Profile from "./Components/Profile/Profile";
import Game from "./Components/Game/Game";
import Deposit from "./Components/Deposit/Deposit";
import Withdraw from "./Components/Withdraw/Withdraw";
import Earn from "./Components/Earn/Earn";
import ToastPortal from "./Components/ToastPortal/ToastPortal";
import tg from "./Components/telgramExpand/Telegramwebapp";
import { useAdBlockerDetector } from "./Components/Hooks/useAdBlockerDetector";
import AdBlockerPopup from "./Components/AdBlockerPopup/AdBlockerPopup";
import { useAdAndTelegramControl } from "./Components/Hooks/useAdAndTelegramControl";


function AppContent() {
   const { showPopup, setShowPopup, checkAdBlocker } = useAdBlockerDetector();

  const handleRetry = async () => {
    setShowPopup(false);
    await checkAdBlocker(); // Re-check when user clicks retry
  };

  const location = useLocation();

  //google analytics
  useEffect(() => {
    // Initialize Google Analytics
    ReactGA.initialize('G-K9GJH23MN3');
 
    // Track page view
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  useAdAndTelegramControl();


  // const { isValidTelegram } = useTelegram();
  const { isValidTelegram } = useTelegram();
  // debug
  // where to hide footer - removed game page restriction
  const showFooter = true; // Show footer on all pages

  // Telegram WebApp init
  useEffect(() => {
    tg.ready();
    tg.BackButton.onClick(() => window.history.back());
    location.pathname !== "/" ? tg.BackButton.show() : tg.BackButton.hide();
    return () => { tg.BackButton.offClick(); };
  }, [location]);

  const renderNotMobileDevice = () => {
    return (
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          p: 2,
        }}
      >
        <Paper elevation={4} sx={{ p: 4, textAlign: "center", maxWidth: 320, width: "100%" }}>
          <TelegramIcon sx={{ fontSize: 64, color: "primary.main", mb: 1 }} />
          <Typography variant="h5" color="primary" gutterBottom>
            🚀 Play on Telegram App
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Open this in the Telegram mobile app to unlock the full experience.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            href="https://t.me/Tetris_Testt_Bot"
            target="_blank"
            rel="noopener"
            sx={{ mt: 3 }}
            startIcon={<TelegramIcon />}
          >
            Open in Telegram
          </Button>
        </Paper>
      </Box>
    );
  };

  // if (!isValidTelegram) {
  //   return renderNotMobileDevice();
  // }

  return (
    <>
      <CssBaseline />
      {showPopup && <AdBlockerPopup onClose={handleRetry} />}
      <Box sx={{ 
        minHeight: "100vh", 
        position: "relative"
      }}>
        <Routes>
          <Route path="/" element={<Games />} />
          <Route path="/game" element={<Game />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/earn" element={<Earn />} />
        </Routes>
        {showFooter && <Footer />}
      </Box>
      <ToastPortal />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <UserProvider>
        <MyProvider>
          <AppContent />
        </MyProvider>
      </UserProvider>
    </Router>
  );
}
