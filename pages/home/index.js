import { useState } from "react";

import Chat from "../../components/chat/chat";
import Navigation from "../../components/navigation/navigation";
import Contact from "../../components/contact/contact";

import { userModel } from "../../server/models/user";

function Home(props) {
  let [chatWith, setChatWith] = useState({});
  return (
    <>
      <div className="grid" id="home">
        <div className="blackout"></div>
        <header className="header">
          <div className="wrapper">
            <i className="bi bi-list"></i>
            <input type="text" placeholder="search" />
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

  let contacts = await userModel.getUserContactsByID(id);
  return {
    props: { id, contacts }, // will be passed to the page component as props
  };
}

export default Home;
