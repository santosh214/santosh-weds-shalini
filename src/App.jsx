import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

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
            <p>
              Let’s dance, sing, and bless the couple as they begin their
              journey together.
            </p>
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
          <p>Under the starlit skies, two hearts become one.</p>
          <h2>Santosh Singh 💍 Shalini Chourey</h2>
          <div className="event">
            <h3>The Wedding Ceremony</h3>
            <p>
              📅 22nd November 2025 | 🕖 From 7:00 PM onwards <br />
              📍 Royal Marriage Garden, Sironj
            </p>
            <p>
              Join us for a regal evening of love, laughter, and lifelong
              memories.
            </p>
          </div>
        </>
      ),
      bgImage:
        "https://images.unsplash.com/photo-1603015077423-1b9e38f60c09?auto=format&fit=crop&w=1600&q=80",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // auto-change every 5 sec
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="app">
      <div
        key={slides[currentSlide].id}
        className="slide fade-in"
        style={{ backgroundImage: `url(${slides[currentSlide].bgImage})` }}
      >
        <div className="overlay" />

        {/* Floating petals */}
        <div className="petals">
          {[...Array(14)].map((_, i) => (
            <div
              key={i}
              className="petal"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
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
