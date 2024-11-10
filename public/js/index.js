const socket = io();

socket.on("connect", function () {
  console.log("connected to the server");
});

socket.on("disconnect", function () {
  console.log("disconnected from server");
});

// Correcting the typo from "newMassage" to "newMessage"
socket.on("newMessage", function(message) {
  console.log("newMessage", message);
});
