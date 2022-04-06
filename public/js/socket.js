const socket = io();

socket.on("connect", () => {
  console.log("connected");
});

socket.on("find-people-response", (args) => {
  args.map((user) => {
    document.getElementById("found-people").innerHTML += `<div id=${
      user.id
    } class="contact" onclick = "sendFriendRequest(event)">
  <div class="contact__avatar">
    <img
      src="https://images.unsplash.com/photo-1640622304326-db5e15903ab4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
      alt=""
    />
  </div>
  <div class="contact__info">
    <div class="contact__name">
      <h3>${user.firstname + " " + user.lastname}</h3>
    </div>
    <div class="contact__last-message">
      <i class="bi bi-person-plus-fill"></i>
    </div>
  </div>
</div>`;
  });
});

function sendFriendRequest(event) {
  let foundUserID = event.currentTarget.id;
  socket.emit("send-friend-request", foundUserID);
}

document.getElementById("search-people").onkeydown = (event) => {
  document.getElementById("found-people").innerHTML = "";
  if (event.key === "Enter" && event.currentTarget.value !== "") {
    socket.emit("find-people", { login: event.currentTarget.value });
  }
};
