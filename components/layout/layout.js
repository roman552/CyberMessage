import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head></Head>
      {children}
      <script src="js/validation.js"></script>
      <script src="/js/animations.js"></script>
      <script
        src="https://cdn.socket.io/4.4.1/socket.io.min.js"
        integrity="sha384-fKnu0iswBIqkjxrhQCTZ7qlLHOFEgNkRmK2vaO/LbTZSXdJfAu6ewRBdwHPhBo/H"
        crossOrigin="anonymous"
      ></script>
      <script src="/js/socket.js"></script>
    </>
  );
}
