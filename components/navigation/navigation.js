import Link from "next/link";

export default function Navigation() {
  return (
    <nav class="navigation">
      <div class="wrapper">
        <div class="navigation-buttons">
          <div class="navigation-button">
            <Link href="/home">
              <a>
                <i class="bi bi-chat-fill active"></i>
              </a>
            </Link>
          </div>
          <div class="navigation-button">
            <Link href="/contacts">
              <a>
                <i class="bi bi-people-fill"></i>
              </a>
            </Link>
          </div>
          <div class="navigation-button">
            <Link href="/store">
              <a>
                <i class="bi bi-bag-fill"></i>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
