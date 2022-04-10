import { useState } from "react";

import Chat from "../../components/chat/chat";
import Navigation from "../../components/navigation/navigation";
import Contact from "../../components/contact/contact";

import { contactsModel } from "../../server/models/contacts";

function Home(props) {
  let [chatWith, setChatWith] = useState({});
  return (
    <>
      <div className="grid" id="home">
        <div className="blackout"></div>
        <header className="header">
          <div className="wrapper">
            <i className="bi bi-list"></i>
          </div>
        </header>

        <div className="wrapper">
          <div id="contacts" className="contacts">
            <h1>Latest messages</h1>
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
  let id = context.query.id;

  let contacts = await contactsModel.getAllAcceptedContacts(id);
  return {
    props: { id, contacts },
  };
}

export default Home;
