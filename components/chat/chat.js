export default function Chat(props) {
  return (
    <div className="grid" id="chat">
      <header className="header">
        <div className="wrapper">
          <div className="header__avatar">
            <i
              className="bi bi-arrow-left"
              onClick={() => {
                hideChat();
              }}
            ></i>

            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt=""
            />
            <h3>{props.contact.firstname + " " + props.contact.lastname}</h3>
          </div>
          <i className="bi bi-three-dots-vertical"></i>
        </div>
      </header>

      <div className="wrapper">
        <div className="chat">
          {props.messages.map((message, key) => {
            return (
              <div
                key={key}
                className={`message ${
                  message.senderID === props.contact.id
                    ? "message-left"
                    : "message-right"
                }`}
              >
                <div className="message-content">
                  <p>{message.message}</p>
                </div>
                <div className="message-time">
                  <p>{message.date.slice(11, 16)}</p>
                </div>
              </div>
            );
          })}

          {/* <div className="message message-right">
            <div className="message-content">
              <img
                src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTShz27AtrgldCTA-4s12WbyqyujWUiozEwYsnjQwtQCA27ffBD"
                alt=""
              />
            </div>
            <div className="message-time">
              <p>13:00</p>
            </div>
          </div> */}
        </div>
      </div>

      <nav className="navigation">
        <div className="wrapper">
          <div className="navigation__input">
            <input
              type="text"
              placeholder="type your message"
              maxLength="150"
            />
            <div className="input-buttons">
              <i className="bi bi-sticky-fill"></i>
              <i className="bi bi-send-fill"></i>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
