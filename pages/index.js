import Link from "next/link";

export default function SignIn() {
  return (
    <form className="welcome" method="POST" action="/signin">
      <img src="/wave.svg" alt="" />

      <div className="wrapper">
        <div className="welcome__heading">
          <h1>
            Cyber
            <br />
            Message<i className="bi bi-chevron-double-down"></i>
          </h1>
        </div>
        <div className="welcome__inputs">
          <h2>Sign in</h2>
          <input
            type="text"
            placeholder="login"
            name="login"
            id="login"
            autoComplete="off"
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            id="password"
          />
        </div>
        <div className="welcome__buttons">
          <button type="submit">
            <h2>sign in</h2>
          </button>
          <p>or</p>
          <Link href="/signup">
            <a>sign up</a>
          </Link>
        </div>
      </div>
    </form>
  );
}
