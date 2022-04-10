export default function ContactSm(props) {
  return (
    <div id={props.contact.id} className="contact-sm">
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
          <i
            className="bi bi-check-square-fill"
            style={{ color: "#7ebd7e" }}
            onClick={(event) => {
              fadeAway(
                event.currentTarget.parentElement.parentElement.parentElement,
                0.5
              );
              acceptFriendRequest(event);
            }}
          ></i>
          <i
            className="bi bi-x-square-fill"
            style={{ color: "#b94f4f" }}
            onClick={(event) => {
              fadeAway(
                event.currentTarget.parentElement.parentElement.parentElement,
                0.5
              );
              declineFriendRequest(event);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
}
