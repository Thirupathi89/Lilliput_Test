import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Paper,
  Grid,
  Modal,
} from "@mui/material";
import { useState, useContext } from "react";
import { MyContext } from "../../context/Mycontext";
import bg from "../../Images/bg.png";
import img1 from "../../Images/img1.png";
import img2 from "../../Images/img2.png";
import img3 from "../../Images/img3.png";
import img4 from "../../Images/img4.png";
import img5 from "../../Images/img5.png";
import img6 from "../../Images/img6.png";
import img7 from "../../Images/img7.png";
import img8 from "../../Images/img8.png";
import img9 from "../../Images/img9.png";

// Custom component for the balance icon (img2)
const BalanceIcon = ({ size }) => (
  <img
    src={img7}
    alt="Balance Icon"
    style={{
      width: size,
      height: size,
      mixBlendMode: "normal",
    }}
  />
);

// Chips numbers
const chips = [1, 5, 10, 1000];
const numbers = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [10, 11, 12],
  [13, 14, 15],
  [16, 17, 18],
  [19, 20, 21],
  [22, 23, 24],
  [25, 26, 27],
  [28, 29, 30],
  [31, 32, 33],
  [34, 35, 36],
];

function Game() {
  const { winningNumberHistory, setWinningNumberHistory } = useContext(MyContext);
  const [balance, setBalance] = useState(1000); // Initial balance set to 1000 for testing
  const [betAmount, setBetAmount] = useState(0);
  const [customBetAmount, setCustomBetAmount] = useState(0);
  // const [selectedChip, setSelectedChip] = useState(0);
  // const [selectMultipleChips, setSelectMultipleChips] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [showBalanceIcon, setShowBalanceIcon] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [selectedBet, setSelectedBet] = useState(null);
  const [selectedNumbers, setSelectedNumbers] = useState([]); // New state for selected numbers
  const [openWheel, setOpenWheel] = useState(false);
  const [winningNumber, setWinningNumber] = useState(null);
  const [openWinPopup, setOpenWinPopup] = useState(false);

  // Config to drive side-bet layout so future changes are simple data edits
  const sideBetsColumnLeft = [
    { label: "1-18", key: "1-18", rows: 2, baseBg: "#49785d" },
    { label: "EVEN", key: "EVEN", rows: 2, baseBg: "#49785d" },
    { label: "RED", key: "RED", rows: 2, baseBg: "#AE272D" },
    { label: "BLACK", key: "BLACK", rows: 2, baseBg: "#000000" },
    { label: "ODD", key: "ODD", rows: 2, baseBg: "#49785d" },
    { label: "19-36", key: "19-36", rows: 2, baseBg: "#49785d" },
  ];

  const sideBetsColumnRight = [
    { label: "1-12", key: "1-12", rows: 4, baseBg: "#49785d" },
    { label: "13-24", key: "13-24", rows: 4, baseBg: "#49785d" },
    { label: "25-36", key: "25-36", rows: 4, baseBg: "#49785d" },
  ];

  const handleColumnClick = (columnIndex) => {
    // Clear any previous selections
    setSelectedNumbers([]);

    // Map through the numbers array and select the numbers in the clicked column
    const columnNumbers = numbers.map((row) => row[columnIndex]);
    setSelectedNumbers(columnNumbers);

    // Update the selected column state
    setSelectedColumn(columnIndex);

    // Clear any selected number or bet
    setSelectedNumber(null);
    setSelectedBet(null);
  };

  const handleNumberClick = (number) => {
    // Check if the number is already selected
    if (selectedNumbers.includes(number)) {
      // If selected, remove it from the list
      setSelectedNumbers(selectedNumbers.filter((num) => num !== number));
    } else {
      // If not selected, add it to the list
      setSelectedNumbers([...selectedNumbers, number]);
    }

    // Clear any selected column or bet
    setSelectedColumn(null);
    setSelectedBet(null);
  };

  const handleBetSelection = (bet) => {
    setSelectedBet(bet);
    setSelectedColumn(null);
    setSelectedNumber(null);

    // Reset selected numbers and update based on bet type
    let newSelectedNumbers = [];

    switch (bet) {
      case "1-12":
        newSelectedNumbers = numbers.slice(0, 4).flat(); // First 4 rows (1-12)
        break;
      case "13-24":
        newSelectedNumbers = numbers.slice(4, 8).flat(); // Next 4 rows (13-24)
        break;
      case "25-36":
        newSelectedNumbers = numbers.slice(8, 12).flat(); // Last 4 rows (25-36)
        break;
      case "EVEN":
        newSelectedNumbers = numbers.flat().filter((num) => isEven(num));
        break;
      case "ODD":
        newSelectedNumbers = numbers.flat().filter((num) => isOdd(num));
        break;
      case "RED":
        newSelectedNumbers = numbers.flat().filter((num) => isRed(num));
        break;
      case "BLACK":
        newSelectedNumbers = numbers.flat().filter((num) => isBlack(num));
        break;
      case "1-18":
        newSelectedNumbers = numbers.flat().filter((num) => num <= 18);
        break;
      case "19-36":
        newSelectedNumbers = numbers.flat().filter((num) => num >= 19);
        break;
      default:
        newSelectedNumbers = [];
    }

    setSelectedNumbers(newSelectedNumbers);
  };

  const isEven = (num) => num % 2 === 0;
  const isInRange = (num, range) => {
    const [start, end] = range.split("-").map(Number);
    return num >= start && num <= end;
  };

  const isOdd = (num) => num % 2 !== 0;
  const isRed = (num) => {
    return num % 2 !== 0;
  };
  const isBlack = (num) => {
    return num % 2 === 0;
  };

  // Updated handleSpin function with betting logic
  const handleSpin = () => {
    // Check if the user has placed a valid bet
    if (betAmount < 1) {
      alert("Minimum bet amount is 1.");
      return;
    }

    // Check if the user has selected at least one number or bet
  if (selectedNumbers.length === 0 && !selectedBet) {
    alert("Please select at least one number or bet before spinning the wheel.");
    return;
  }
    // Check if the user has enough balance to place the bet
    if (balance < betAmount) {
      alert("Insufficient balance to place the bet.");
      return;
    }

   
    // Start the wheel spin animation
    setOpenWheel(true);

    setTimeout(() => {
      // Generate a random winning number
      const randomNumber = Math.floor(Math.random() * 37);
      setWinningNumber(randomNumber);
      
      // Update the winning number history
      setWinningNumberHistory([...winningNumberHistory, randomNumber]);

      // Check if the winning number matches any selected number
      const isWin = selectedNumbers.includes(randomNumber);

      // Update balance based on win or loss
      if (isWin) {
        const winnings = betAmount * 2; // Double the bet amount
        setBalance((prevBalance) => prevBalance + winnings);
      }

      // Close the wheel and show the winning popup
      setOpenWheel(false);
      setOpenWinPopup(true);

      // Reset the selected numbers and bet amount after the spin
      setSelectedNumbers([]);
      setBetAmount(0);

      // Close the winning popup after 3 seconds and show the win/lose alert
      setTimeout(() => {
        setOpenWinPopup(false);

        // Display win or lose alert after the winning number popup is closed
        if (isWin) {
          alert(
            `You won! Winning number: ${randomNumber}. You earned ${
              betAmount * 2
            }.`
          );
        } else {
          alert(
            `You lost. Winning number: ${randomNumber}. You lost ${betAmount}.`
          );
        }
      }, 3000); // Simulate a 3-second delay for the winning popup
    }, 3000); // Simulate a 3-second wheel spin
  };

  
  // Function to handle placing a bet
  const handlePlaceBet = (amount) => {
    const betAmountToPlace = amount || customBetAmount; // Use customBetAmount if no chip is selected
    if (balance >= amount && amount >= 1) {
      setBalance((prevBalance) => prevBalance - amount);
      // Accumulate the bet amount
      setBetAmount((prevBetAmount) => prevBetAmount + amount);
      // setBetAmount(amount);
    } else {
      alert("Invalid bet amount or insufficient balance.");
    }
  };

  // Function Double all bets
  const handleDoubleAllBets = () => {
    //check if there any selected number os bets
    if (selectedNumbers.length === 0 && !selectedBet) {
      alert(" No bets to double.");
      return;
    }

    // check if the user have enough balance to double the bets
    if (balance < betAmount * 2) {
      alert("Insufficient balance to double bets.");
      return;
    }

    //double all bets
    setBetAmount((prevBetAmount) => prevBetAmount * 2);

    // Deduct additional bet amount from  balance
    setBalance((prevBalance) => prevBalance - betAmount);
  };

  //Function to Undo the last bet placed by the user
  const handleUndoBet = () => {
    //check is there bet to undo
    if (betAmount === 0) {
      alert(" No bet to Undo");
      return;
    }

    //Reset the bet amount and add it back to the balance
    setBalance((prevBalance) => prevBalance + betAmount);
    setBetAmount(0);

    //clear all selected numbers and bets
    setSelectedNumbers([]);
    setSelectedBet(null);
    setSelectedColumn(null);
  };

  //Function for reset all bets
  const handleResetAllBets = () => {
    // check is there any bet placed or not by user
    if (betAmount === 0) {
      alert("No bets to reset");
      return;
    }

    //Reset the bet amount add it back to balance
    setBalance((prevBalance) => prevBalance + betAmount);
    setBetAmount(0);

    //clear all selected number, bets and columns
    setSelectedNumbers([]);
    setSelectedBet(null);
    setSelectedColumn(null);
  };

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
        // paddingBottom: "90px",
        boxSizing: "border-box",
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      {/* Header Balance section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginLeft: "10px",
          marginRight: "10px",
        }}
      >
        {/* Balance Section */}
        <Grid
          display="flex"
          width="160px"
          backgroundColor="#000000"
          borderRadius="20px"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            variant="h6"
            sx={{
              color: "white",
              fontFamily: "Poppins",
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            Balance:
            <img src={img1} alt="img1" width="14px" />
            {balance}
          </Typography>
        </Grid>

        {/* Bet Section */}
        <Grid
          display="flex"
          width="150px"
          backgroundColor="#000000"
          borderRadius="20px"
          alignItems="center"
          justifyContent="center"
        >
          {/* Always display "Bet:" and the icon */}
          <Typography
            variant="h6"
            sx={{
              color: "white",
              fontFamily: "Poppins",
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginLeft: "10px",
            }}
          >
            Bet:
            <img src={img1} alt="img1" width="14px" />
          </Typography>

          {/* Input field for bet amount */}
          <input
            type="number"
            value={betAmount === 0 ? "" : betAmount} // Display empty string if betAmount is 0
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              if (!isNaN(value)) {
                // Ensure the value is not negative
                const newBetAmount = value >= 0 ? value : 0;

                // Check if the user has enough balance to place the bet
                if (balance >= newBetAmount && newBetAmount >= 1) {
                  // Deduct the bet amount from the balance immediately
                  setBalance((prevBalance) => prevBalance - newBetAmount);
                  // Update the bet amount state
                  setBetAmount(newBetAmount);
                } else {
                  alert("Invalid bet amount or insufficient balance.");
                }
              }
            }}
            min="1" // Minimum bet amount
            max={balance} // Maximum bet amount cannot exceed the balance
            style={{
              width: "80px",
              backgroundColor: "transparent",
              border: "none",
              color: "white",
              fontFamily: "Poppins",
              fontSize: "18px",
              textAlign: "center",
              outline: "none",
              marginLeft: "8px", // Add some spacing between the icon and input
            }}
          />
        </Grid>
      </Box>

      {/* Bet Options */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "10px",
          height: "100%",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Grid
            item
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              width: "100px",
            }}
          >
            <img src={img2} alt="" width="55px" onClick={handleSpin} />
            <Typography
              variant="h6"
              sx={{ color: "white", fontSize: "16px", fontFamily: "Poppins" }}
              onClick={handleSpin}
            >
              Spin the Wheel
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              width: "80px",
            }}
          >
            <img src={img3} alt="" width="55px" onClick={handleDoubleAllBets} />
            <Typography
              variant="h6"
              sx={{ color: "white", fontSize: "16px", fontFamily: "Poppins" }}
              onClick={handleDoubleAllBets}
            >
              Double All Bets
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              width: "100px",
            }}
          >
            <img src={img4} alt="" width="55px" onClick={handleUndoBet} />
            <Typography
              variant="h6"
              sx={{ color: "white", fontSize: "16px", fontFamily: "Poppins" }}
              onClick={handleUndoBet}
            >
              Undo Bet
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              width: "80px",
            }}
          >
            <img src={img5} alt="" width="55px" onClick={handleResetAllBets} />
            <Typography
              variant="h6"
              sx={{ color: "white", fontSize: "16px", fontFamily: "Poppins" }}
              onClick={handleResetAllBets}
            >
              Reset All Bets
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Chips and Table sections */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {/* Chips Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: "10px",
            marginLeft: "10px",
            flexShrink: 0,
            overflow: "visible",
          }}
        >
          {chips.map((chip) => (
            <Box
              key={chip}
              sx={{
                position: "relative",
                width: "60px",
                height: "60px",
                cursor: "pointer",
                overflow: "hidden",
                "&:hover": {
                  opacity: 0.8,
                },
              }}
              onClick={() => handlePlaceBet(chip)}
            >
              {/* Chip Image */}
              <img
                src={
                  chip === 1
                    ? img6
                    : chip === 5
                    ? img7
                    : chip === 10
                    ? img8
                    : img9
                }
                alt={`Chip ${chip}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  display: "block",
                }}
              />
              {/* Chip Number */}
              <Typography
                variant="h6"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "#000000",
                  fontFamily: "Poppins",
                  fontWeight: 700,
                  fontSize: "16px",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                }}
              >
                {chip}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Game Tables */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: 0, // Remove gap between zero and main table
            flex: 1,
            minWidth: 0,
          }}
        >
          {/* Top header for single 0 above the main board */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "5px",
              width: "100%",
              marginBottom: 0, // Remove bottom margin
            }}
          >
            <TableContainer
              component={Paper}
              sx={{
                bgcolor: "transparent",
                width: "100%",
                maxWidth: "180px", // match main grid width
              }}
            >
              <Table>
                <TableBody>
                  <TableRow
                    sx={{
                      display: "flex",
                      gap: 0,
                      justifyContent: "space-between",
                    }}
                  >
                    {[0].map((zeroNumber) => (
                      <TableCell
                        key={zeroNumber}
                        align="center"
                        sx={{
                          padding: 0,
                          border: "none",
                          minWidth: "unset",
                          flex: 1, // single pentagon spans full width
                        }}
                      >
                        {/* Pentagon with border using ::before */}
                        <Box
                          sx={{
                            width: "100%",
                            height: "50px",
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            fontWeight: "bold",
                            color: "white",
                            borderBottom: "3px solid #ffffff", // Add bottom border to connect with main table
                            "&::before": {
                              content: '""',
                              position: "absolute",
                              width: "100%",
                              height: "100%",
                              backgroundColor: "#ffffff",
                              clipPath:
                                "polygon(50% 0%, 100% 40%, 100% 100%, 0% 100%, 0% 40%)",
                              zIndex: 0,
                            },
                          }}
                          onClick={() => handleNumberClick(zeroNumber)}
                        >
                          {/* Inner box for actual number */}
                          <Box
                            sx={{
                              width: "calc(100% - 6px)",
                              height: "44px",
                              backgroundColor:
                                selectedNumbers.includes(zeroNumber)
                                  ? "#3d3aa5"
                                  : "#49785d",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              clipPath:
                                "polygon(50% 0%, 100% 40%, 100% 100%, 0% 100%, 0% 40%)",
                              position: "relative",
                              zIndex: 1,
                            }}
                          >
                            {zeroNumber}
                          </Box>
                        </Box>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Bet table container and Main number grid using CSS Grid with exact sizing */}
          {(() => {
            const boardHeight = 336; // total height so all sub-grids line up
            const gridWidth = 180; // main number grid width (3 columns of 60px)
            const sideWidth = 120; // side bets total width (2 columns of 60px)
            return (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginRight: "5px",
                    width: "100%",
                    gap: 0,
                    marginTop: 0, // Remove top margin to connect with zero area
                  }}
                >
                  {/* Left side bets (2 columns) */}
                  <Box
                    sx={{
                      width: `${sideWidth}px`,
                      height: `${boardHeight}px`,
                      display: "grid",
                      gridTemplateColumns: "60px 60px",
                      gridTemplateRows: "repeat(12, 1fr)",
                      border: "3px solid #ffffff",
                      borderRight: 0,
                      boxSizing: "border-box",
                    }}
                  >
                    {/* First column: 1-18, EVEN, RED, BLACK, ODD, 19-36 */}
                    <Box
                      onClick={() => handleBetSelection("1-18")}
                      sx={{
                        gridColumn: "1 / 2",
                        gridRow: "1 / 3",
                        color: "white",
                        textAlign: "center",
                        borderRight: "3px solid #ffffff",
                        borderBottom: "3px solid #ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        bgcolor: selectedBet === "1-18" ? "#3d3aa5" : "#49785d",
                        fontWeight: 700,
                        fontFamily: "Poppins",
                        writingMode: "vertical-rl",
                        textOrientation: "mixed",
                        whiteSpace: "nowrap",
                        lineHeight: 1,
                        fontSize: "12px",
                        padding: "4px 0",
                      }}
                    >
                      1-18
                    </Box>
                    <Box
                      onClick={() => handleBetSelection("EVEN")}
                      sx={{
                        gridColumn: "1 / 2",
                        gridRow: "3 / 5",
                        color: "white",
                        textAlign: "center",
                        borderRight: "3px solid #ffffff",
                        borderBottom: "3px solid #ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        bgcolor: selectedBet === "EVEN" ? "#3d3aa5" : "#49785d",
                        fontWeight: 700,
                        fontFamily: "Poppins",
                        writingMode: "vertical-rl",
                        textOrientation: "mixed",
                        whiteSpace: "nowrap",
                        lineHeight: 1,
                        fontSize: "12px",
                        padding: "4px 0",
                      }}
                    >
                      EVEN
                    </Box>
                    <Box
                      onClick={() => handleBetSelection("RED")}
                      sx={{
                        gridColumn: "1 / 2",
                        gridRow: "5 / 7",
                        color: "white",
                        textAlign: "center",
                        borderRight: "3px solid #ffffff",
                        borderBottom: "3px solid #ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        bgcolor: selectedBet === "RED" ? "#3d3aa5" : "#AE272D",
                        fontWeight: 700,
                        fontFamily: "Poppins",
                        writingMode: "vertical-rl",
                        textOrientation: "mixed",
                        whiteSpace: "nowrap",
                        lineHeight: 1,
                        fontSize: "12px",
                        padding: "4px 0",
                      }}
                    >
                      RED
                    </Box>
                    <Box
                      onClick={() => handleBetSelection("BLACK")}
                      sx={{
                        gridColumn: "1 / 2",
                        gridRow: "7 / 9",
                        color: "white",
                        textAlign: "center",
                        borderRight: "3px solid #ffffff",
                        borderBottom: "3px solid #ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        bgcolor: selectedBet === "BLACK" ? "#3d3aa5" : "#000000",
                        fontWeight: 700,
                        fontFamily: "Poppins",
                        writingMode: "vertical-rl",
                        textOrientation: "mixed",
                        whiteSpace: "nowrap",
                        lineHeight: 1,
                        fontSize: "12px",
                        padding: "4px 0",
                      }}
                    >
                      BLACK
                    </Box>
                    <Box
                      onClick={() => handleBetSelection("ODD")}
                      sx={{
                        gridColumn: "1 / 2",
                        gridRow: "9 / 11",
                        color: "white",
                        textAlign: "center",
                        borderRight: "3px solid #ffffff",
                        borderBottom: "3px solid #ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        bgcolor: selectedBet === "ODD" ? "#3d3aa5" : "#49785d",
                        fontWeight: 700,
                        fontFamily: "Poppins",
                        writingMode: "vertical-rl",
                        textOrientation: "mixed",
                        whiteSpace: "nowrap",
                        lineHeight: 1,
                        fontSize: "12px",
                        padding: "4px 0",
                      }}
                    >
                      ODD
                    </Box>
                    <Box
                      onClick={() => handleBetSelection("19-36")}
                      sx={{
                        gridColumn: "1 / 2",
                        gridRow: "11 / 13",
                        color: "white",
                        textAlign: "center",
                        borderRight: "3px solid #ffffff",
                        borderBottom: "3px solid #ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        bgcolor: selectedBet === "19-36" ? "#3d3aa5" : "#49785d",
                        fontWeight: 700,
                        fontFamily: "Poppins",
                        writingMode: "vertical-rl",
                        textOrientation: "mixed",
                        whiteSpace: "nowrap",
                        lineHeight: 1,
                        fontSize: "12px",
                        padding: "4px 0",
                      }}
                    >
                      19-36
                    </Box>

                    {/* Second column: 1-12, 13-24, 25-36 */}
                    <Box
                      onClick={() => handleBetSelection("1-12")}
                      sx={{
                        gridColumn: "2 / 3",
                        gridRow: "1 / 5",
                        color: "white",
                        textAlign: "center",
                        borderLeft: "3px solid #ffffff",
                        borderBottom: "3px solid #ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        bgcolor: selectedBet === "1-12" ? "#3d3aa5" : "#49785d",
                        fontWeight: 700,
                        fontFamily: "Poppins",
                        writingMode: "vertical-rl",
                        textOrientation: "mixed",
                        whiteSpace: "nowrap",
                        lineHeight: 1,
                        fontSize: "12px",
                        padding: "4px 0",
                      }}
                    >
                      1-12
                    </Box>
                    <Box
                      onClick={() => handleBetSelection("13-24")}
                      sx={{
                        gridColumn: "2 / 3",
                        gridRow: "5 / 9",
                        color: "white",
                        textAlign: "center",
                        borderLeft: "3px solid #ffffff",
                        borderBottom: "3px solid #ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        bgcolor: selectedBet === "13-24" ? "#3d3aa5" : "#49785d",
                        fontWeight: 700,
                        fontFamily: "Poppins",
                        writingMode: "vertical-rl",
                        textOrientation: "mixed",
                        whiteSpace: "nowrap",
                        lineHeight: 1,
                        fontSize: "12px",
                        padding: "4px 0",
                      }}
                    >
                      13-24
                    </Box>
                    <Box
                      onClick={() => handleBetSelection("25-36")}
                      sx={{
                        gridColumn: "2 / 3",
                        gridRow: "9 / 13",
                        color: "white",
                        textAlign: "center",
                        borderLeft: "3px solid #ffffff",
                        borderBottom: "3px solid #ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        bgcolor: selectedBet === "25-36" ? "#3d3aa5" : "#49785d",
                        fontWeight: 700,
                        fontFamily: "Poppins",
                        writingMode: "vertical-rl",
                        textOrientation: "mixed",
                        whiteSpace: "nowrap",
                        lineHeight: 1,
                        fontSize: "12px",
                        padding: "4px 0",
                      }}
                    >
                      25-36
                    </Box>
                  </Box>

                  {/* Main numbers grid 1-36 */}
                  <Box
                    sx={{
                      width: `${gridWidth}px`,
                      height: `${boardHeight}px`,
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gridTemplateRows: "repeat(12, 1fr)",
                      border: "3px solid #ffffff",
                      borderTop: "none", // Remove top border to connect with zero area
                      boxSizing: "border-box",
                    }}
                  >
                    {numbers.flat().map((num, idx) => {
                      const colIndex = idx % 3;
                      const isSelected =
                        selectedColumn === colIndex ||
                        (selectedBet === "EVEN" && isEven(num)) ||
                        (selectedBet === "ODD" && !isEven(num)) ||
                        (selectedBet === "RED" && !isEven(num)) ||
                        (selectedBet === "BLACK" && isEven(num)) ||
                        (selectedBet && isInRange(num, selectedBet));
                      const baseBg = num % 2 === 0 ? "black" : "#AE272D";
                      return (
                        <Box
                          key={num}
                          onClick={() => handleNumberClick(num)}
                          sx={{
                            position: "relative",
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderLeft: "3px solid #ffffff",
                            borderBottom: "3px solid #ffffff",
                            bgcolor: isSelected ? "#3d3aa5" : baseBg,
                            fontWeight: 700,
                            fontFamily: "Poppins",
                            userSelect: "none",
                            cursor: "pointer",
                          }}
                        >
                          {num}
                          {selectedNumbers.includes(num) && (
                            <Box sx={{ position: "absolute", top: "40%", left: "23%" }}>
                              <BalanceIcon size="20px" />
                            </Box>
                          )}
                        </Box>
                      );
                    })}
                  </Box>
                </Box>

                {/* Bottom 1st / 2nd / 3rd row under main grid */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginRight: "6px",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      width: `${gridWidth}px`,
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      border: "3px solid #ffffff",
                      borderTop: "none",
                      boxSizing: "border-box",
                    }}
                  >
                    {["1st", "2nd", "3rd"].map((label, colIndex) => (
                      <Box
                        key={label}
                        onClick={() => handleColumnClick(colIndex)}
                        sx={{
                          textAlign: "center",
                          color: "white",
                          borderLeft: colIndex === 0 ? "3px solid #ffffff" : "3px solid #ffffff",
                          borderBottom: "3px solid #ffffff",
                          fontWeight: 700,
                          fontFamily: "Poppins",
                          cursor: "pointer",
                          bgcolor: selectedColumn === colIndex ? "#3d3aa5" : "transparent",
                          paddingY: "6px",
                        }}
                      >
                        {label}
                        {selectedColumn === colIndex && showBalanceIcon && (
                          <Box sx={{ position: "absolute" }}>
                            <BalanceIcon size="30px" />
                          </Box>
                        )}
                      </Box>
                    ))}
                  </Box>
                </Box>
              </>
            );
          })()}
        </Box>
      </Box>
      {/* selected Number display sections */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginTop: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            minHeight: "70px",
            backgroundColor: "#000000",
            borderRadius: "20px",
            alignItems: "center",
            width: "90%",
            paddingLeft: "15px",
            paddingRight: "15px",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              width: "50px",
              color: "white",
              marginRight: "15px",
              fontFamily: "Poppins",
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
            }}
          >
            Selected Chips:
          </Typography>
          <Grid
            item
            display="flex"
            justifyContent="flex-start"
            minHeight="60px"
            borderRadius="10px"
            alignItems="center"
            width="80%"
            margin="6px"
            sx={{ overflowX: "auto", position: "relative" }}
            marginLeft={2}
          >
            {/* Pseudo-element for the background color */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                borderRadius: "10px",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(255,255,255,0.7)",
                zIndex: 1,
              }}
            />
            <Box
              sx={{
                display: "flex",
                gap: "8px",
                padding: "8px",
                overflowX: "auto",
                whiteSpace: "nowrap",
                width: "100%",
                position: "relative",
                zIndex: 2,
                "&::-webkit-scrollbar": {
                  height: "4px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "2px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "rgba(255,255,255,0.3)",
                  borderRadius: "2px",
                },
              }}
            >
              {selectedNumbers.map((num) => (
                <Box
                  key={num}
                  sx={{
                    backgroundColor: isRed(num) ? "#AE272D" : "black",
                    color: "white",
                    borderRadius: "10px",
                    width: "60px",
                    height: "40px",
                    display: "flex",
                    marginRight: "2px",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Poppins",
                    fontSize: "18px",
                    fontWeight: "bold",
                    flexShrink: 0, // Prevent shrinking of the number boxes
                  }}
                >
                  {num}
                </Box>
              ))}
            </Box>
          </Grid>
        </Box>
      </Box>

      {/* Wheel Popup */}
      <Modal open={openWheel} onClose={() => setOpenWheel(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            outline: "none", // Remove outline
            border: "none", // Remove border
          }}
        >
          <Box sx={{ position: "relative" }}>
            <img
              src={img2}
              alt="Wheel"
              style={{
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                mixBlendMode: "hard-light",
                animation: "wheel 3s linear infinite",
                outline: "none", // Remove outline
                border: "none", // Remove border
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: "60px",
                left: "50px",
                width: "10px",
                height: "10px",
                bgcolor: "#ffffff",
                borderRadius: "50%",
                transform: "translateX(-50%)",
                animation: "chooserSpin 3s linear infinite",
                outline: "none", // Remove outline
                border: "none", // Remove border
              }}
            />
          </Box>
        </Box>
      </Modal>

      {/* Winning Popup */}
      <Modal open={openWinPopup} onClose={() => setOpenWinPopup(false)}>
        <Box
          sx={{
            position: "relative",
            width: { xs: "70%", sm: "300px" },
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "#000000",
            p: 4,
            borderRadius: "10px",
            textAlign: "center",
            animation: "fadeOut 2s ease-in-out forwards",
            outline: "none", // Remove outline
            border: "none", // Remove border
          }}
        >
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              outline: "none", // Remove outline
              border: "none", // Remove border
            }}
          >
            {/* Winning Number text */}
            <Typography
              variant="h6"
              sx={{
                color: "#ffffff",
                fontFamily: "Poppins",
                fontWeight: 700,
                fontSize: "24px",
              }}
            >
              Winning Number: {winningNumber}
            </Typography>
          </Box>
        </Box>
      </Modal>

      {/*Inline CSS for the animation*/}
      <style>
        {`
        @keyframes wheel {
        from {
        transform: rotate(0deg);
        }
        to {
        transform: rotate(360deg);
        }
        }
        @keyframes chooserSpin {
        from {
        transform: translateX(-50%) rotate(0deg);
        }
        to {
        transform: translateX(-50%) rotate(360deg);
        }
        }
        @keyframes fadeOut {
          0% {
              opacity: 1;
                }
          100% {
              opacity: 0;
              }
            }

        .MuiModal-backdrop {
        outline: none !important;
        border: none !important;
        }
        `}
      </style>
    </Box>
  );
}

export default Game;
