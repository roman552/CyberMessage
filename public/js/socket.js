const socket = io("ws://192.168.0.102:3000");

socket.on("connect", () => {
  console.log("connect");
});
