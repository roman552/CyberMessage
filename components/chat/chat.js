export default function Chat(props) {
  return (
    <div className="grid" id="chat">
      <header className="header">
        <div className="wrapper">
          <div className="header__avatar">
            <i className="bi bi-arrow-left" onClick={() => hideChat()}></i>

            <img
              src="https://images.unsplash.com/photo-1640622304326-db5e15903ab4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
              alt=""
            />
            <h3>{props.contact.firstname + " " + props.contact.lastname}</h3>
          </div>
          <i className="bi bi-three-dots-vertical"></i>
        </div>
      </header>

      <div className="wrapper">
        <div className="chat">
          <div className="message message-left">
            <div className="message-content">
              <p>Hello friend!</p>
            </div>
            <div className="message-time">
              <p>12:55</p>
            </div>
          </div>
          <div className="message message-right">
            <div className="message-content">
              <p>
                Hi, what's up? Hi, what's up?Hi, what's up?Hi, what's up?Hi,
                what's up?Hi, what's up?Hi, what's up?
              </p>
            </div>
            <div className="message-time">
              <p>13:00</p>
            </div>
          </div>
          <div className="message message-right">
            <div className="message-content">
              <img
                src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTShz27AtrgldCTA-4s12WbyqyujWUiozEwYsnjQwtQCA27ffBD"
                alt=""
              />
            </div>
            <div className="message-time">
              <p>13:00</p>
            </div>
          </div>
          <div className="message message-right">
            <div className="message-content">
              <img
                src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTShz27AtrgldCTA-4s12WbyqyujWUiozEwYsnjQwtQCA27ffBD"
                alt=""
              />
            </div>
            <div className="message-time">
              <p>13:00</p>
            </div>
          </div>
          <div className="message message-right">
            <div className="message-content">
              <img
                src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTShz27AtrgldCTA-4s12WbyqyujWUiozEwYsnjQwtQCA27ffBD"
                alt=""
              />
            </div>
            <div className="message-time">
              <p>13:00</p>
            </div>
          </div>
          <div className="message message-right">
            <div className="message-content">
              <img
                src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTShz27AtrgldCTA-4s12WbyqyujWUiozEwYsnjQwtQCA27ffBD"
                alt=""
              />
            </div>
            <div className="message-time">
              <p>13:00</p>
            </div>
          </div>
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
