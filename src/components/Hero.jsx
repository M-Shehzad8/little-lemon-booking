// Hero.jsx
// Hero section matching the Little Lemon mobile mockup:
// dark green background, "Little Lemon" (yellow) + "Chicago" (white),
// descriptive paragraph, a food photo, and a yellow "Reserve a table" button.
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="about" aria-labelledby="hero-title">
      <div className="hero__text">
        <h1 id="hero-title" className="hero__title">
          Little Lemon
        </h1>
        <p className="hero__subtitle">Chicago</p>
        <p className="hero__body">
          We are a family owned Mediterranean restaurant, focused on
          traditional recipes served with a modern twist.
        </p>
        <a className="hero__cta" href="#booking">
          Reserve a table
        </a>
      </div>

      <div className="hero__media">
        <img
          src="/images/Fish_on_Grill.jpg"
          alt="Grilled fish and vegetables cooking on a barbecue grill"
          className="hero__img"
        />
      </div>
    </section>
  );
}
