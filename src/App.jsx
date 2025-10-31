import { useState, useEffect, useRef } from "react";
import "./App.css";
import musicFile from "./assets/wedding-music.mp3";

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const audioRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const targetDate = new Date("2025-11-22T19:00:00");
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const slides = [
    {
      id: 1,
      title: "Pre-Wedding Celebration",
      content: (
        <>
          <p>With divine blessings and our elders’ love,</p>
          <h2>Santosh Singh 💍 Shalini Chourey</h2>
          <p>joyfully invite you to the celebration of love and laughter.</p>
          <div className="event">
            <h3>Sangeet & Mata Pujan</h3>
            <p>
              📅 20th & 21st November 2025 <br />
              📍 Bal Mukund ki Bagiya, Bhopal
            </p>
            <p>Let’s dance, sing, and bless the couple as they begin their journey together.</p>
            <a
              href="https://maps.app.goo.gl/dK8VyuUtHY33ehav6"
              target="_blank"
              rel="noopener noreferrer"
              className="map-button"
            >
              📍 Get Directions
            </a>
            <p>📞 Contact: 9993024884 / 8966933600</p>
          </div>
        </>
      ),
      bgImage:
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1600&q=80",
    },
    {
      id: 2,
      title: "Wedding Ceremony",
      content: (
        <>
          <div className="countdown">
            <p>
              🕒 {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </p>
          </div>
          <p>Under the starlit skies, two hearts become one.</p>
          <h2>Santosh Singh 💍 Shalini Chourey</h2>
          <div className="event">
            <h3>The Wedding Ceremony</h3>
            <p>
              📅 22nd November 2025 | 🕖 From 7:00 PM onwards <br />
              📍 Royal Marriage Garden, Sironj
            </p>
            <p>Join us for a regal evening of love, laughter, and lifelong memories.</p>
            <a
              href="https://maps.app.goo.gl/3A3Hgx4CJXZbwf1r9"
              target="_blank"
              rel="noopener noreferrer"
              className="map-button"
            >
              📍 Get Directions
            </a>
            <p>📞 Contact: 9993024884 / 8966933600</p>
          </div>
        </>
      ),
      bgImage:
        "https://images.unsplash.com/photo-1603015077423-1b9e38f60c09?auto=format&fit=crop&w=1600&q=80",
    },
  ];

  // Slide change interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Autoplay music
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => console.log("Autoplay blocked:", err));
    }
  }, []);

  return (
    <div className="app">
      <audio ref={audioRef} src={musicFile} loop />
      <div
        key={slides[currentSlide].id}
        className="slide fade-in"
        style={{ backgroundImage: `url(${slides[currentSlide].bgImage})` }}
      >
        <div className="overlay" />
        <div className="petals">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="petal"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${10 + Math.random() * 5}s`,
              }}
            >
              🌸
            </div>
          ))}
        </div>
        <div className="content-container">
          <h1>{slides[currentSlide].title}</h1>
          {slides[currentSlide].content}
        </div>
      </div>
    </div>
  );
}

export default App;
