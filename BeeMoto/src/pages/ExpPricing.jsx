import React, { useRef, useState, useEffect } from 'react';

const Pricing = () => {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || isScrolling) return;
      
      const scrollLeft = containerRef.current.scrollLeft;
      const sectionWidth = containerRef.current.clientWidth;
      const index = Math.round(scrollLeft / sectionWidth);
      
      if (index !== activeIndex) {
        setActiveIndex(index);
        console.log("Scroll event fired, new index:", index);
      }
    };

    // Enhanced wheel event handler for vertical scroll
    const handleWheel = (e) => {
      if (!containerRef.current) return;
      
      // Prevent the default scroll behavior
      e.preventDefault();
      
      // Determine the scroll amount (use a multiplier for sensitivity)
      const scrollAmount = e.deltaY * 1.5; // Adjust this multiplier as needed
      
      // Set a flag to avoid double-processing in the scroll handler
      setIsScrolling(true);
      
      // For smoother scrolling, use requestAnimationFrame
      requestAnimationFrame(() => {
        if (containerRef.current) {
          // Apply the scroll
          containerRef.current.scrollLeft += scrollAmount;
          
          // After scrolling, determine the current section
          const scrollLeft = containerRef.current.scrollLeft;
          const sectionWidth = containerRef.current.clientWidth;
          const newIndex = Math.round(scrollLeft / sectionWidth);
          
          // Update activeIndex if needed
          if (newIndex !== activeIndex && newIndex >= 0 && newIndex < services.length) {
            setActiveIndex(newIndex);
            console.log("Wheel scroll, new index:", newIndex);
          }
          
          // Clear the scrolling flag
          setTimeout(() => setIsScrolling(false), 50);
        }
      });
    };

    // Use a global wheel handler approach to catch all wheel events
    const preventDefaultScroll = (e) => {
      if (containerRef.current && containerRef.current.contains(e.target)) {
        e.preventDefault();
        return false;
      }
    };

    const container = containerRef.current;
    if (container) {
      // Add the scroll event listener
      container.addEventListener("scroll", handleScroll);
      
      // Add the wheel event listener directly to the container
      container.addEventListener("wheel", handleWheel, { passive: false });
      
      // Also add a wheel listener to the document to prevent page scrolling
      document.addEventListener("wheel", preventDefaultScroll, { passive: false });
      
      console.log("Event listeners attached");
      
      return () => {
        container.removeEventListener("scroll", handleScroll);
        container.removeEventListener("wheel", handleWheel);
        document.removeEventListener("wheel", preventDefaultScroll);
      };
    }
  }, [activeIndex, isScrolling]);

  // Manual navigation function that works independently of scroll events
  const scrollToService = (index) => {
    if (!containerRef.current || index < 0 || index >= services.length) return;
    
    console.log("Manually scrolling to index:", index);
    const container = containerRef.current;
    const sectionWidth = container.clientWidth;
    
    container.scrollTo({
      left: index * sectionWidth,
      behavior: "smooth"
    });
    
    setActiveIndex(index);
  };

  // Handle Swipe for Mobile
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  // Loop back functionality
  const goToNext = () => {
    const nextIndex = activeIndex === services.length - 1 ? 0 : activeIndex + 1;
    scrollToService(nextIndex);
  };

  const goToPrevious = () => {
    const prevIndex = activeIndex === 0 ? services.length - 1 : activeIndex - 1;
    scrollToService(prevIndex);
  };

  // Define your services array
  const services = [
    // Your services data here
    // Example: { title: 'Service 1', description: 'Description 1', image: '/image1.jpg' }
  ];

  return (
    <div className="services-wrapper">
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
            {/* Image & Text Side by Side */}
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

      {/* Navigation buttons */}
      <button 
        className="nav-arrow prev-arrow" 
        onClick={goToPrevious}
        aria-label="Previous service"
      >
        &larr;
      </button>
      
      <button 
        className="nav-arrow next-arrow" 
        onClick={goToNext}
        aria-label="Next service"
      >
        &rarr;
      </button>

      {/* Indicators */}
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