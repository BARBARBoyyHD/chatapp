const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const {generateMessage} = require("./utils/message")

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

  socket.emit("newMessage",generateMessage('admin','Welcome to the chat app!'));

  socket.broadcast.emit("newMessage",generateMessage('admin','new user joined'));

  socket.on("createMessage", (message,callback) => {
    console.log("createMessage:", message);
    io.emit("newMessage", generateMessage(message.from,message.text));
    callback("this is server")
  });

  socket.on("disconnect", () => {
    console.log("User was disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
