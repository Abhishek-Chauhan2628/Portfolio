import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const Button = ({ title }) => {
  const btnRef = useRef(null);

  useLayoutEffect(() => {
    const btn = btnRef.current;

    const handleMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) * 0.4; // Sensitivity
      const y = (e.clientY - (rect.top + rect.height / 2)) * 0.4;

      gsap.to(btn, {
        x: x,
        y: y,
        rotateX: -y * 0.1, // This mimics the "Tilt" behavior
        rotateY: x * 0.1,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.3)", // Smooth spring back
      });
    };

    btn.addEventListener("mousemove", handleMove);
    btn.addEventListener("mouseleave", handleLeave);

    return () => {
      btn.removeEventListener("mousemove", handleMove);
      btn.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <button
      ref={btnRef}
      className="button_glow mt-4 relative overflow-hidden py-2 px-8 font-bold text-white text-lg rounded-md bg-gradient-to-r from-[#ed8a8a] to-[#eb4a4a] transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(237,138,138,0.5)]"
    >
      {title}
    </button>
  );
};

export default Button;