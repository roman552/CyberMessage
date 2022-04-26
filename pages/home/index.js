import { useState, useEffect } from "react";

import Chat from "../../components/chat/chat";
import Navigation from "../../components/navigation/navigation";
import Contact from "../../components/contact/contact";

import { contactsModel } from "../../server/models/contacts";

import socket from "socket.io-client";

const client = socket();

function Home(props) {
  let [chatWith, setChatWith] = useState({});
  let [messages, setMessages] = useState([]);

  let fetchMessages = (friendID) => {
    client.emit("fetch-messages", friendID);
  };

  let sendMessage = (friendID, messageText) => {
    client.emit("send-message", { friendID, messageText });
  };

  useEffect(() => {
    client.on("added-friend", (user) => {
      setContacts([...contacts, user]);
    });

    client.on("receive-messages", (messages) => {
      setMessages(messages);
      document
        .getElementsByClassName("chat")[0]
        .scrollTo(0, document.getElementsByClassName("chat")[0].scrollHeight);
    });

    client.on("receive-new-message", (message) => {
      setMessages((messages) => [...messages, message]);
      document
        .getElementsByClassName("chat")[0]
        .scrollTo(0, document.getElementsByClassName("chat")[0].scrollHeight);
    });
  }, []);
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
                  fetchMessages={fetchMessages}
                  contact={contact}
                  key={key}
                />
              );
            })}
          </div>
        </div>
        <Navigation />
      </div>
      <Chat contact={chatWith} messages={messages} sendMessage={sendMessage} />
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
