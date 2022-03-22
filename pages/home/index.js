import Chat from "../../components/chat/chat";
import Navigation from "../../components/navigation/navigation";

export default function Home() {
  return (
    <>
      <div class="grid" id="home">
        <div className="blackout"></div>
        <header class="header">
          <div class="wrapper">
            <i class="bi bi-list"></i>
            <input type="text" placeholder="search" />
          </div>
        </header>

        <div class="wrapper">
          <div class="contacts">
            <div class="contact" onClick={() => showChat()}>
              <div class="contact__avatar">
                <img
                  src="https://images.unsplash.com/photo-1640622304326-db5e15903ab4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                  alt=""
                />
              </div>
              <div class="contact__info">
                <div class="contact__name">
                  <h3>Roman</h3>
                </div>
                <div class="contact__last-message">
                  <p>how its going?</p>
                  <p>12:12</p>
                </div>
              </div>
            </div>
            <div class="contact">
              <div class="contact__avatar">
                <img
                  src="https://images.unsplash.com/photo-1646602141523-5f1ca4361ee7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
                  alt=""
                />
              </div>
              <div class="contact__info">
                <div class="contact__name">
                  <h3>David</h3>
                </div>
                <div class="contact__last-message">
                  <p class="not-read">Hello!</p>
                  <p>12:30</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Navigation />
      </div>
      <Chat />
    </>
  );
}
