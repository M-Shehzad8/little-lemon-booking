// App.jsx
// Top-level component composing the semantic page structure.
import Header from './components/Header';
import Hero from './components/Hero';
import Menu from './components/Menu';
import BookingPage from './components/BookingPage';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Menu />
        <BookingPage />
      </main>
      <Footer />
    </>
  );
}
