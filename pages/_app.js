import "../styles/globals.css";
import "../styles/signIn.css";
import "../styles/signUp.css";
import "../styles/home.css";
import "../styles/chat.css";
import "../styles/animations.css";

import Layout from "../components/layout/layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
