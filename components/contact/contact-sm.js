export default function ContactSm(props) {
  return (
    <div id={props.contact.id} className="contact">
      <div className="contact__avatar">
        <img
          src="https://images.unsplash.com/photo-1640622304326-db5e15903ab4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
          alt=""
        />
      </div>
      <div className="contact__info">
        <div className="contact__name">
          <h3>{props.contact.firstname + " " + props.contact.lastname}</h3>
        </div>
        <div className="contact__last-message">
          <i class="bi bi-person-plus-fill"></i>
        </div>
      </div>
    </div>
  );
}
