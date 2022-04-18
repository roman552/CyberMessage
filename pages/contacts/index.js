import { useState } from "react";
import socket from "socket.io-client";

import Navigation from "../../components/navigation/navigation";
import Contact from "../../components/contact/contact";
import Chat from "../../components/chat/chat";
import ContactSm from "../../components/contact/contact-sm";

import { contactsModel } from "../../server/models/contacts";
const client = socket();

function Contacts(props) {
  let [contacts, setContacts] = useState(Object.values(props.contacts));
  let [friendRequests, setFriendRequests] = useState(
    Object.values(props.friendRequests)
  );
  let [chatWith, setChatWith] = useState({});

  client.on("new-friend-request", (user) => {
    let uniqueRequests = [...friendRequests, user];
    uniqueRequests = Array.from(
      new Set(uniqueRequests.map(JSON.stringify))
    ).map(JSON.parse);
    setFriendRequests([...uniqueRequests]);
  });

  client.on("added-friend", (user) => {
    setContacts([...contacts, user]);
  });

  return (
    <>
      <div className="grid">
        <div className="blackout"></div>

        <header className="header">
          <div className="wrapper">
            <i className="bi bi-list"></i>
            <input type="text" id="search-people" placeholder="find people" />
            <i
              className="bi bi-search"
              onClick={() => {
                searchPeople();
              }}
            ></i>
          </div>
        </header>

        <div className="wrapper">
          <div id="found-people">
            {friendRequests.map((contact, key) => {
              return <ContactSm contact={contact} key={key} />;
            })}
          </div>

          <div id="contacts" className="contacts">
            <h1>Contacts</h1>
            {contacts.map((contact, key) => {
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

  let friendRequests = await contactsModel.getAllUnacceptedContacts(id);
  let contacts = await contactsModel.getAllAcceptedContacts(id);
  return {
    props: { id, friendRequests, contacts },
  };
}

export default Contacts;
