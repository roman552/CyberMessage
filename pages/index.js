import Link from 'next/link'

export default function SignIn() {
  return (
    <form className="welcome">
      <img src="/wave.svg" alt="" />

      <div className="wrapper">
        <div className="welcome__heading">
          <h1>Cyber<br />Message<i className="bi bi-chevron-double-down"></i></h1>
        </div>
        <div className="welcome__inputs">
          <h2>Sign in</h2>
          <input type="text" placeholder="username" />
          <input type="password" placeholder="password" />
        </div>
        <div className="welcome__buttons">
          <Link href="/home">
            <button><h2>sign in</h2></button>
          </Link>
          <p>or</p>
          <Link href="/signup">
            <a>sign up</a>
          </Link>
          </div>
      </div>
    </form>
  )
}
