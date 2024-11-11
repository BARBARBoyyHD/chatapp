const date = new Date(); // current date

// Get day, month, year separately
const day = String(date.getDate()).padStart(2, "0"); // Day of the month (01-31)
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const monthName = monthNames[date.getMonth()];
const year = date.getFullYear(); // Year (e.g., 2024)

// Customize the date format
const formattedDate = `${day}-${monthName}-${year}`;

let generateMessage = (from, text) =>{
  return {
    from,
    text,
    createdAt: formattedDate,
  };
}

module.exports = { generateMessage };
