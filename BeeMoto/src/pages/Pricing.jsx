import React, { useState, useRef, useEffect } from "react";
import "./Pricing.css";

const services = [
  { title: "Detailing", description: "Premium motorcycle detailing services.", image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=1960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { title: "Ceramic Coating", description: "Advanced protection for your bike.", image: "https://images.unsplash.com/photo-1614165936126-2ed18e471b3b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { title: "Polishing", description: "Enhance the shine of your motorcycle.", image: "polish.jpg" }
];

const Pricing = () => {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollLeft = containerRef.current.scrollLeft;
      const sectionWidth = containerRef.current.clientWidth;
      const index = Math.round(scrollLeft / sectionWidth);
      setActiveIndex(index);
    };

    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToService = (index) => {
    if (index >= 0 && index < services.length) {
      sectionsRef.current[index].scrollIntoView({ behavior: "smooth" });
      setActiveIndex(index);
    }
  };

  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    setTouchEndX(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    if (touchStartX === null || touchEndX === null) return;
    const swipeDistance = touchStartX - touchEndX;

    if (swipeDistance > 50 && activeIndex < services.length - 1) {
      scrollToService(activeIndex + 1);
    } else if (swipeDistance < -50 && activeIndex > 0) {
      scrollToService(activeIndex - 1);
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <div className="services-wrapper">
      <button className="nav-arrow left" onClick={() => scrollToService(activeIndex - 1)} disabled={activeIndex === 0}>
        &#9665;
      </button>
      <div
        className="services-container"
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {services.map((service, index) => (
          <div
            key={index}
            className={`service-section ${index === activeIndex ? "active" : ""}`}
            ref={(el) => (sectionsRef.current[index] = el)}
          >
            <div className="service-content">
              <img src={service.image} alt={service.title} className="service-image" />
              <div className="service-info">
                <h2>{service.title}</h2>
                <p>{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="nav-arrow right" onClick={() => scrollToService(activeIndex + 1)} disabled={activeIndex === services.length - 1}>
        &#9655;
      </button>
      <div className="indicators">
        {services.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === activeIndex ? "active-dot" : ""}`}
            onClick={() => scrollToService(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Pricing;
