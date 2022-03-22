export default function Chat() {
  return(
    <div class="grid" id="chat">
      <header class="header">
        <div class="wrapper">
          <div class="header__avatar">
            <i class="bi bi-arrow-left" onClick={() => hideChat()}></i>

            <img
              src="https://images.unsplash.com/photo-1640622304326-db5e15903ab4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
              alt=""
            />
            <h3>Roman</h3>
          </div>
          <i class="bi bi-three-dots-vertical"></i>
        </div>
      </header>

      <div class="wrapper">
        <div class="chat">
          <div class="message message-left">
            <div class="message-content">
              <p>Hello friend!</p>
            </div>
            <div class="message-time">
              <p>12:55</p>
            </div>
          </div>
          <div class="message message-right">
            <div class="message-content">
              <p>
                Hi, what's up? Hi, what's up?Hi, what's up?Hi, what's up?Hi,
                what's up?Hi, what's up?Hi, what's up?
              </p>
            </div>
            <div class="message-time">
              <p>13:00</p>
            </div>
          </div>
          <div class="message message-right">
            <div class="message-content">
              <img
                src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTShz27AtrgldCTA-4s12WbyqyujWUiozEwYsnjQwtQCA27ffBD"
                alt=""
              />
            </div>
            <div class="message-time">
              <p>13:00</p>
            </div>
          </div>
          <div class="message message-right">
            <div class="message-content">
              <img
                src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTShz27AtrgldCTA-4s12WbyqyujWUiozEwYsnjQwtQCA27ffBD"
                alt=""
              />
            </div>
            <div class="message-time">
              <p>13:00</p>
            </div>
          </div>
          <div class="message message-right">
            <div class="message-content">
              <img
                src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTShz27AtrgldCTA-4s12WbyqyujWUiozEwYsnjQwtQCA27ffBD"
                alt=""
              />
            </div>
            <div class="message-time">
              <p>13:00</p>
            </div>
          </div>
          <div class="message message-right">
            <div class="message-content">
              <img
                src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTShz27AtrgldCTA-4s12WbyqyujWUiozEwYsnjQwtQCA27ffBD"
                alt=""
              />
            </div>
            <div class="message-time">
              <p>13:00</p>
            </div>
          </div>
        </div>
      </div>

      <nav class="navigation">
        <div class="wrapper">
          <div class="navigation__input">
            <input
              type="text"
              placeholder="type your message"
              maxlength="150"
            />
            <div class="input-buttons">
              <i class="bi bi-sticky-fill"></i>
              <i class="bi bi-send-fill"></i>
            </div>
          </div>
        </div>
      </nav>
    </div>)
}