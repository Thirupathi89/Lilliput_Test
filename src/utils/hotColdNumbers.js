// Function to calculate hot and cold numbers
export const calculateHotColdNumbers = (winningNumberHistory = []) => {
  // For now, use static data since we don't have a backend
  // In the future, this will use the actual winningNumberHistory from the backend
  
  // Static winning numbers history for demonstration
  const staticWinningNumbers = [
    7, 23, 15, 3, 19, 11, 27, 5, 31, 13, 9, 25, 17, 1, 29, 21, 7, 33, 15, 3,
    19, 11, 27, 5, 31, 13, 9, 25, 17, 1, 29, 21, 7, 33, 15, 3, 19, 11, 27, 5
  ];

  // Use static data if no history is provided
  const numbersToAnalyze = winningNumberHistory.length > 0 ? winningNumberHistory : staticWinningNumbers;
  
  const frequencyMap = {};

  // Count the frequency of each number
  numbersToAnalyze.forEach((num) => {
    frequencyMap[num] = (frequencyMap[num] || 0) + 1;
  });

  // Convert the frequency map to an array of { number, frequency } objects
  const frequencyArray = Object.keys(frequencyMap).map((num) => ({
    number: parseInt(num),
    frequency: frequencyMap[num],
  }));

  // Sort by frequency in descending order
  frequencyArray.sort((a, b) => b.frequency - a.frequency);

  // Get the top 3 most frequent numbers (Hot Numbers)
  const hotNumbers = frequencyArray.slice(0, 3).map((item) => item.number);

  // Get the last 3 least frequent numbers (Cold Numbers)
  const coldNumbers = frequencyArray
    .slice(-3)
    .map((item) => item.number)
    .reverse();

  return { hotNumbers, coldNumbers };
};

// Function to get static hot and cold numbers (for immediate use)
export const getStaticHotColdNumbers = () => {
  return calculateHotColdNumbers();
};
