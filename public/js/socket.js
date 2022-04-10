const socket = io();

socket.on("connect", () => {
  console.log("connected");
});

socket.on("find-people-response", (args) => {
  args.map((user) => {
    document.getElementById("found-people").innerHTML += `<div id=${
      user.id
    } class="contact-sm" onclick = "sendFriendRequest(event); fadeAway(this, 0.5)">
        <div class="contact__avatar">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt=""
          />
        </div>
        <div class="contact__info">
          <div class="contact__name">
            <h3>${user.firstname + " " + user.lastname}</h3>
          </div>
          <div class="contact__last-message">
            <i class="bi bi-plus-square-fill"></i>
          </div>
        </div>
      </div>`;
  });
});

function sendFriendRequest(event) {
  let foundUserID = event.currentTarget.id;
  socket.emit("send-friend-request", foundUserID);
}

function acceptFriendRequest(event) {
  let requester = event.currentTarget.parentElement.parentElement.parentElement;
  let requesterID = requester.id;
  socket.emit("accept-friend-request", requesterID);
}

function declineFriendRequest(event) {
  let requester = event.currentTarget.parentElement.parentElement.parentElement;
  let requesterID = requester.id;
  socket.emit("decline-friend-request", requesterID);
}

function searchPeople() {
  socket.emit("find-people", {
    login: document.getElementById("search-people").value,
  });
}

document.getElementById("search-people").onkeydown = (event) => {
  document.getElementById("found-people").innerHTML = "";
  if (event.key === "Enter" && event.currentTarget.value !== "") {
    socket.emit("find-people", { login: event.currentTarget.value });
  }
};
