import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="navigation">
      <div className="wrapper">
        <div className="navigation-buttons">
          <div className="navigation-button">
            <Link href="/home">
              <a>
                <i className="bi bi-chat-fill"></i>
              </a>
            </Link>
          </div>
          <div className="navigation-button">
            <Link href="/contacts">
              <a>
                <i className="bi bi-people-fill"></i>
              </a>
            </Link>
          </div>
          <div className="navigation-button">
            <Link href="/store">
              <a>
                <i className="bi bi-bag-fill"></i>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
