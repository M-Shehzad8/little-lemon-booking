// Header.jsx
// Semantic <header> matching the Little Lemon mobile mockup:
// white top bar with a hamburger menu (left), logo (center),
// and a cart/basket icon (right).
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header__bar">
        {/* Hamburger menu (left) */}
        <button
          type="button"
          className="header__icon-btn"
          aria-label="Open menu"
          aria-expanded="false"
        >
          <span className="header__hamburger" aria-hidden="true"></span>
          <span className="header__hamburger" aria-hidden="true"></span>
          <span className="header__hamburger" aria-hidden="true"></span>
        </button>

        {/* Logo (center) */}
        <a className="header__brand" href="#main" aria-label="Little Lemon home">
          <img
            className="header__logo"
            src="/images/Little_Lemon_Logo.jpg"
            alt="Little Lemon"
            width="40"
            height="40"
          />
        </a>

        {/* Cart / basket with plus (right) */}
        <button
          type="button"
          className="header__icon-btn header__cart"
          aria-label="Cart"
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="#495E57"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="9" cy="20" r="1.4" />
            <circle cx="18" cy="20" r="1.4" />
            <path d="M2 3h3l2.4 12.2a1.5 1.5 0 0 0 1.5 1.2h8.7a1.5 1.5 0 0 0 1.5-1.2L22 7H6" />
            <line x1="14" y1="10" x2="14" y2="14" />
            <line x1="12" y1="12" x2="16" y2="12" />
          </svg>
        </button>
      </div>

      <nav className="header__nav" aria-label="Primary">
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#booking">Reservations</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}
