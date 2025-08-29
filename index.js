const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Replace with your details
const FULL_NAME = "bharath krishna siva sri sai kumar";  
const DOB = "13122004";             
const EMAIL = "yourmail@vitap.ac.in";
const ROLL_NUMBER = "22BCE9454";

// Utility: alternate caps reverse concat
function alternateCapsReverse(str) {
  let result = "";
  let toggle = true;
  for (let i = str.length - 1; i >= 0; i--) {
    let ch = str[i];
    if (/[a-zA-Z]/.test(ch)) {
      result += toggle ? ch.toUpperCase() : ch.toLowerCase();
      toggle = !toggle;
    }
  }
  return result;
}

// API route
app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data;

    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid input" });
    }

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;
    let allAlphabets = "";

    data.forEach((item) => {
      if (/^-?\d+$/.test(item)) { // check if integer
        let num = parseInt(item, 10);
        if (num % 2 === 0) {
          even_numbers.push(item);
        } else {
          odd_numbers.push(item);
        }
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) { // alphabets
        alphabets.push(item.toUpperCase());
        allAlphabets += item;
      } else { // special characters
        special_characters.push(item);
      }
    });

    res.json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string: alternateCapsReverse(allAlphabets)
    });
  } catch (error) {
    res.status(500).json({ is_success: false, message: error.message });
  }
});

// Default route (so "Cannot GET /" won't appear)
app.get("/", (req, res) => {
  res.send("BFHL API is running. Use POST /bfhl");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

