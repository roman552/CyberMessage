import Navigation from "../../components/navigation/navigation";

export default function Contacts() {
  return (
    <div class="grid">
      <header class="header">
        <div class="wrapper">
          <i class="bi bi-list"></i>
          <input type="text" placeholder="find people" />
          <i class="bi bi-plus-circle-fill"></i>
        </div>
      </header>

      <div class="wrapper">
        <div class="contacts">
          <div class="contact">
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
            </div>
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  );
}
