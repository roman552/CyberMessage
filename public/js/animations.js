function showChat() {
  let blackout = document.getElementsByClassName("blackout")[0];
  let chat = document.getElementById("chat");

  chat.style.display = "grid";
  blackout.style.display = "block";

  chat.style.animationName = "showUp";
  chat.style.animationDuration = ".5s";
}

function hideChat() {
  let blackout = document.getElementsByClassName("blackout")[0];
  let chat = document.getElementById("chat");

  chat.style.animationName = "hideRight";
  chat.style.animationDuration = ".5s";
  chat.style.animationFillMode = "forward";

  setTimeout(() => (chat.style.display = "none"), 400);

  blackout.style.display = "none";
}

function fadeAway(element, duration) {
  element.style.animationName = "fadeAway";
  element.style.animationDuration = `${duration}s`;
  setTimeout(() => (element.style.display = "none"), duration * 980);
}
