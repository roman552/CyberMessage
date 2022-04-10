export default function Contact(props) {
  return (
    <div
      id={props.contact.id}
      className="contact"
      onClick={() => {
        props.setChatWith(props.contact);
        showChat();
      }}
    >
      <div className="contact__avatar">
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          alt=""
        />
      </div>
      <div className="contact__info">
        <div className="contact__name">
          <h3>{props.contact.firstname + " " + props.contact.lastname}</h3>
        </div>
        <div className="contact__last-message">
          <p>how its going?</p>
          <p>12:12</p>
        </div>
      </div>
    </div>
  );
}
