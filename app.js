const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "public");
const app = express();

const server = http.createServer(app);
const io = socketIO(server);
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
app.use(express.static(publicPath));

io.on("connection", (socket) => {
  console.log("A new user just connected");

  socket.emit("newMessage", {
    from: "admin",
    text: "Welcome to the chat app",
    createdAt: formattedDate, // Using full timestamp
  });

  socket.broadcast.emit("newMessage", {
    from: "admin",
    text: "New User Joined!",
    createdAt: formattedDate, // Using full timestamp
  });

  socket.on("createMessage", (message) => {
    console.log("createMessage:", message);
    io.emit("newMessage", {
      from: message.from,
      text: message.text,
      createdAt: formattedDate, // Using full timestamp
    });
  });

  socket.on("disconnect", () => {
    console.log("User was disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
