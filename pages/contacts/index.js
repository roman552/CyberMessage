import { useState } from "react";

import Navigation from "../../components/navigation/navigation";
import Contact from "../../components/contact/contact";
import Chat from "../../components/chat/chat";

import { userModel } from "../../server/models/user";

function Contacts(props) {
  let [chatWith, setChatWith] = useState({});
  return (
    <>
      <div className="grid">
        <div className="blackout"></div>

        <header className="header">
          <div className="wrapper">
            <i className="bi bi-list"></i>
            <input type="text" id="search-people" placeholder="find people" />
            <i className="bi bi-plus-circle-fill"></i>
          </div>
        </header>

        <div className="wrapper">
          <div id="found-people"></div>

          <div id="contacts" className="contacts">
            <h1>Contacts</h1>
            {Object.values(props.contacts).map((contact, key) => {
              if (typeof props.contacts === "string") return;
              return (
                <Contact
                  setChatWith={setChatWith}
                  contact={contact}
                  key={key}
                />
              );
            })}
          </div>
        </div>
        <Navigation />
      </div>
      <Chat contact={chatWith} />
    </>
  );
}
export async function getServerSideProps(context) {
  let contacts = await userModel.getUserContactsByID(context.query.id);

  return {
    props: { contacts }, // will be passed to the page component as props
  };
}

export default Contacts;
