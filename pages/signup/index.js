import Link from "next/link";

export default function SingUp() {
  return (
    <form
      className="welcome"
      method="POST"
      onInput={(event) => NextStep(event)}
      action="/signup"
    >
      <img src="../wave.svg" alt="" />
      <div className="wrapper">
        <div className="welcome__heading">
          <h1>
            Cyber
            <br />
            Message<i className="bi bi-chevron-double-down"></i>
          </h1>
        </div>
        <div className="welcome__inputs">
          <h2>Sign up</h2>
          <div className="signup-progress">
            <div className="step green">1 step</div>
            <div className="step">2 step</div>
            <div className="step">finish</div>
          </div>
          <div className="step-inputs">
            <div>
              <input
                type="text"
                placeholder="firstname"
                name="firstname"
                autocomplete="off"
              />
              <input
                type="text"
                placeholder="lastname"
                name="lastname"
                autocomplete="off"
              />
            </div>
            <div style={{ display: "none" }}>
              <input type="text" placeholder="login" name="login" />
              <input type="password" placeholder="password" name="password" />
            </div>
          </div>
        </div>
        <div className="welcome__buttons">
          <button type="button" id="submit" disabled>
            <h2>next step</h2>
          </button>
          <p>or</p>
          <Link href="/">
            <a>sign in</a>
          </Link>
        </div>
      </div>
    </form>
  );
}
