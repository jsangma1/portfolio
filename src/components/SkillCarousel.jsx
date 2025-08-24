import { useEffect, useRef, useState } from "react";

export default function SkillCarousel() {
  const containerRef = useRef(null);
  const [skills, setSkills] = useState([]);
  const [isPaused, setIsPaused] = useState(false);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const scrollSpeed = 0.5;

  // Fetch skills from backend
  useEffect(() => {
    fetch("http://localhost:8080/api/skills")
      .then((res) => res.json())
      .then((data) => setSkills(data))
      .catch((err) => console.error("Failed to fetch skills:", err));
  }, []);

  // Continuous scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Duplicate content for seamless scroll
    container.innerHTML += container.innerHTML;

    let animationFrame;
    const scroll = () => {
      if (!isPaused && !isDragging.current) {
        container.scrollLeft += scrollSpeed;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrame);
  }, [isPaused]);

  // Drag handlers
  const startDrag = (x) => {
    isDragging.current = true;
    setIsPaused(true);
    startX.current = x - containerRef.current.offsetLeft;
    scrollLeftStart.current = containerRef.current.scrollLeft;
    containerRef.current.style.cursor = "grabbing";
  };

  const moveDrag = (x) => {
    if (!isDragging.current) return;
    const walk = x - startX.current;
    containerRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const endDrag = () => {
    isDragging.current = false;
    setIsPaused(false);
    containerRef.current.style.cursor = "grab";
  };

  return (
    <div
      ref={containerRef}
      className="flex items-center overflow-hidden whitespace-nowrap cursor-grab"
      style={{ width: "100%", height: "80px" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={endDrag}
      onMouseDown={(e) => startDrag(e.pageX)}
      onMouseMove={(e) => moveDrag(e.pageX)}
      onMouseUp={endDrag}
      onTouchStart={(e) => startDrag(e.touches[0].pageX)}
      onTouchMove={(e) => moveDrag(e.touches[0].pageX)}
      onTouchEnd={endDrag}
    >
      {skills.map((skill, index) => (
        <img
          key={index}
          src={`http://localhost:8080/${skill.path}`} // adjust path if needed
          alt={skill.name}
          className="h-16 w-auto object-contain"
          style={{ marginRight: "32px" }}
          draggable={false}
        />
      ))}
    </div>
  );
}
