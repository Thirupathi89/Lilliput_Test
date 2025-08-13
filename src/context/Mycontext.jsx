import React, { createContext, useState } from "react";

export const MyContext = createContext();

export function MyProvider({ children }) {
  const [data, setData] = useState(null);  // Your state to save
  const [winningNumberHistory, setWinningNumberHistory] = useState([]);  // Winning numbers history

  return (
    <MyContext.Provider value={{ 
      data, 
      setData, 
      winningNumberHistory, 
      setWinningNumberHistory 
    }}>
      {children}
    </MyContext.Provider>
  );
}
