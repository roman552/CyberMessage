import Link from 'next/link'

export default function SingUp() {
    return(
        <form class="welcome">
        <img src="../wave.svg" alt="" />
  
        <div class="wrapper">
          <div class="welcome__heading">
            <h1>Cyber<br />Message<i class="bi bi-chevron-double-down"></i></h1>
          </div>
          <div class="welcome__inputs">
            <h2>Sign up</h2>
            <div class="signup-progress">
              <div class="step green">1 step</div>
              <div class="step">2 step</div>
              <div class="step">finish</div>
            </div>
            <input type="text" placeholder="firstname" />
            <input type="text" placeholder="lastname" />
          </div>
          <div class="welcome__buttons">
            <button disabled><h2>next step</h2></button>
            <p>or</p>
            <Link href="/">
            <a>sign in</a>
            </Link>
          </div>
        </div>
      </form>
    )
}