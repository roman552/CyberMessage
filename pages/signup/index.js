import Link from "next/link";

export default function SingUp() {
  return (
    <form
      class="welcome"
      method="POST"
      onChange={(event) => validateRegistrationFormInputs(event)}
      action="/signup"
    >
      <img src="../wave.svg" alt="" />
      <div class="wrapper">
        <div class="welcome__heading">
          <h1>
            Cyber
            <br />
            Message<i class="bi bi-chevron-double-down"></i>
          </h1>
        </div>
        <div class="welcome__inputs">
          <h2>Sign up</h2>

          <input
            type="text"
            placeholder="firstname"
            id="firstname"
            name="firstname"
            autoComplete="off"
            maxLength="100"
          />
          <input
            type="text"
            placeholder="lastname"
            id="lastname"
            name="lastname"
            autoComplete="off"
            maxLength="100"
          />
          <input
            type="text"
            placeholder="login"
            id="login"
            name="login"
            autoComplete="off"
            maxLength="25"
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            name="password"
            autoComplete="off"
            maxLength="100"
          />
        </div>
        <div class="welcome__buttons">
          <button type="submit" id="submit" disabled>
            <h2>create account</h2>
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
