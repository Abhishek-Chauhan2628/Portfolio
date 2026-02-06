import React, { useLayoutEffect, useRef } from "react";
import { github } from "../assets"; 
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { styles } from "../style";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ index, name, description, tags, image, source_code_link }) => {
  const cardRef = useRef(null);
  const iconRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Magnetic GitHub Icon
      const handleMove = (e) => {
        const rect = iconRef.current.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        gsap.to(iconRef.current, { x: x * 0.5, y: y * 0.5, duration: 0.3 });
      };
      const handleLeave = () => gsap.to(iconRef.current, { x: 0, y: 0, duration: 0.3 });

      iconRef.current.addEventListener("mousemove", handleMove);
      iconRef.current.addEventListener("mouseleave", handleLeave);
    }, cardRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className="project-item relative w-full h-[450px] rounded-3xl overflow-hidden bg-[#0a0a0a] border border-white/5 group shadow-2xl"
    >
      {/* Background Image with Zoom & Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020012] via-transparent to-transparent" />
      </div>

      {/* Content Layer */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <div className="translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-3xl font-black text-white tracking-tighter uppercase">{name}</h3>
            <button
              ref={iconRef}
              onClick={() => window.open(source_code_link, "_blank")}
              className="bg-orange-600 p-3 rounded-full hover:bg-orange-400 transition-colors duration-300"
            >
              <img src={github} alt="git" className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-gray-400 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">
            {description}
          </p>

          <div className="flex flex-wrap gap-3">
        {tags.map((tag, i) => (
  <span 
    key={`${name}-${tag.name}`} 
    className={`text-[12px] font-bold ${tag.color} tracking-wider`}
  >
    #{tag.name}
  </span>
))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Works = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Heading Decode/Fade
      gsap.from(".header-text", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
      });

      // 2. 3D Assembly Animation for Cards
      gsap.from(".project-item", {
        scrollTrigger: {
          trigger: ".projects-container",
          start: "top 75%",
        },
        opacity: 0,
        y: 100,
        z: -500,
        rotationX: 45,
        rotationY: -15,
        duration: 1.5,
        stagger: {
          amount: 0.8,
          from: "start",
        },
        ease: "expo.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="work" className="py-24 px-6 sm:px-16 bg-[#020012]">
      <div className="max-w-7xl mx-auto">
        <div className="header-text mb-20 text-center sm:text-left">
          <p className={`${styles.sectionSubText} text-orange-400`}>Portfolio //</p>
          <h2 className={`${styles.sectionHeadText} text-white font-black`}>Case Studies.</h2>
          <p className="mt-4 text-gray-500 max-w-2xl text-lg">
            A selection of projects where I've combined technical architecture with creative design.
          </p>
        </div>

        {/* 3D Perspective Grid */}
        <div className="projects-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 [perspective:2000px]">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionWrapper(Works, "work");