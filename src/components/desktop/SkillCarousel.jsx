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
    const fetchSkills = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/skills");
        const data = await res.json();
        setSkills(data); // data should be an array of {name, path}
      } catch (err) {
        console.error("Failed to fetch skills:", err);
      }
    };

    fetchSkills();
  }, []);

  // Continuous scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container || skills.length === 0) return;

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
  }, [isPaused, skills]);

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

  // Map skills to images
  const skillElements = skills.map((skill, index) => (
    <img
      key={index}
      src={`http://localhost:8080${skill.path}`}
      alt={skill.name}
      className="inline-block"
      style={{
        height: "33px", // carousel height
        width: "auto", // preserve original aspect ratio
        marginRight: "30px", // gap
      }}
      draggable={false}
    />
  ));

  return (
    <div
      ref={containerRef}
      className="flex items-center overflow-hidden whitespace-nowrap cursor-grab"
      style={{ width: "100%", height: "33px" }} // match carousel height
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={endDrag}
      onMouseDown={(e) => startDrag(e.pageX)}
      onMouseMove={(e) => moveDrag(e.pageX)}
      onMouseUp={endDrag}
      onTouchStart={(e) => startDrag(e.touches[0].pageX)}
      onTouchMove={(e) => moveDrag(e.touches[0].pageX)}
      onTouchEnd={endDrag}
    >
      {skillElements}
      {skillElements} {/* duplicate for seamless scroll */}
    </div>
  );
}
