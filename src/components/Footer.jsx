// Footer.jsx
// Semantic <footer> with contact and hours information.
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer__inner">
        <section className="footer__col" aria-labelledby="footer-brand">
          <h2 id="footer-brand" className="footer__brand">Little Lemon</h2>
          <p>Mediterranean cuisine with a modern twist.</p>
        </section>

        <section className="footer__col" aria-labelledby="footer-contact">
          <h3 id="footer-contact">Contact</h3>
          <address>
            123 Lemon Street<br />
            Chicago, IL 60601<br />
            <a href="tel:+13125550123">(312) 555-0123</a><br />
            <a href="mailto:hello@littlelemon.com">hello@littlelemon.com</a>
          </address>
        </section>

        <section className="footer__col" aria-labelledby="footer-hours">
          <h3 id="footer-hours">Hours</h3>
          <p>Mon–Sun: 5:00 PM – 10:00 PM</p>
        </section>
      </div>
      <p className="footer__copy">
        &copy; {new Date().getFullYear()} Little Lemon. All rights reserved.
      </p>
    </footer>
  );
}
