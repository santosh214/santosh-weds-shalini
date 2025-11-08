import { useState, useEffect, useRef } from "react";
import "./App.css";
import musicFile from "./assets/wedding-music.mp3";
import bgWedding from "./assets/wedding-image.jpg";

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

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
      title: "Santosh Weds Shalini",
      content: (
        <>
          <p className="fade-in fade-in-1">
            With the blessings of our elders and the grace of the divine,
          </p>
          <p className="fade-in fade-in-2">
            Two hearts unite to celebrate love, laughter, and togetherness.
          </p>
          <p className="fade-in fade-in-3">We invite you to be part of our special moments.</p>
        </>
      ),
      bgImage: bgWedding,
    },
    {
      id: 2,
      title: "Sangeet & Divine Blessing Ceremony",
      content: (
        <>
          <p className="fade-in fade-in-1">
            A night of melodies, devotion, and joyful dance.
          </p>
          <div className="event fade-in fade-in-2">
            <h2>Musical Evening & Divine Blessings</h2>
            <p className="fade-in fade-in-3">📅 20th & 21st November 2025</p>
            <p className="fade-in fade-in-4">📍 Bal Mukund ki Bagiya, Bhopal</p>
            <p className="fade-in fade-in-5">
              Join us for an evening filled with music, laughter, and blessings as we begin our new journey.
            </p>
          </div>
        </>
      ),
      bgImage: bgWedding,
    },
    {
      id: 3,
      title: "Wedding Ceremony",
      content: (
        <>
          <p className="fade-in fade-in-1">
            Under the starlit sky, as vows are exchanged and hearts unite forever.
          </p>
          <div className="event fade-in fade-in-2">
            <h2>The Wedding Night</h2>
            <p className="fade-in fade-in-3">
              📅 22nd November 2025 | 🕖 From 7:00 PM onwards
            </p>
            <p className="fade-in fade-in-4">📍 Royal Marriage Garden, Sironj</p>
            <p className="fade-in fade-in-5">
              Join us for a regal evening of love, laughter, and lifelong memories.
            </p>
          </div>
        </>
      ),
      bgImage: bgWedding,
    },
  ];

  // Auto-slide every 27 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 17000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Try autoplay on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => console.log("Play blocked:", err));
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const handleLoad = () => {
      document.body.classList.add("loaded");
    };
    window.addEventListener("load", handleLoad);
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  return (
    <div className="app">
      <audio ref={audioRef} src={musicFile} loop />
      <div
        key={slides[currentSlide].id}
        className="slide"
        style={{ backgroundImage: `url(${slides[currentSlide].bgImage})` }}
      >
        <div className="overlay" />
        <div className="content-container">
          <h1 className="fade-in tangerine-bold">{slides[currentSlide].title}</h1>
          {slides[currentSlide].content}
        </div>
      </div>
    </div>
  );
}

export default App;
