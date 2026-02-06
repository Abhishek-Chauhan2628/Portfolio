import React, { useLayoutEffect, useRef } from 'react';
import { styles } from '../style';
import { SectionWrapper } from '../hoc';
import { ComputersCanvas } from './canvas';
import { FaDownload } from 'react-icons/fa';
import { HiOutlineBriefcase } from 'react-icons/hi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Button = ({ title, icon, href, download = false }) => {
  const btnRef = useRef(null);

  // Magnetic Button Logic
  useLayoutEffect(() => {
    const btn = btnRef.current;
    const handleMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4 });
    };
    const handleLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.4 });

    btn.addEventListener('mousemove', handleMove);
    btn.addEventListener('mouseleave', handleLeave);
    return () => {
      btn.removeEventListener('mousemove', handleMove);
      btn.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <a
      ref={btnRef}
      href={href}
      target={download ? '_self' : '_blank'}
      rel={download ? undefined : 'noopener noreferrer'}
      download={download}
      className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white transition-all text-sm sm:text-base font-bold shadow-lg hover:shadow-orange-500/20"
    >
      {icon && <span className="mr-2 text-lg">{icon}</span>}
      {title}
    </a>
  );
};

const About = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Entrance Stagger on Scroll
      gsap.from(".about-reveal", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out"
      });

      // 2. Card 3D Tilt Effect on Mouse Move
      const card = cardRef.current;
      const handleTilt = (e) => {
        const { clientX, clientY } = e;
        const rect = card.getBoundingClientRect();
        const x = (clientX - rect.left) / rect.width - 0.5;
        const y = (clientY - rect.top) / rect.height - 0.5;

        gsap.to(card, {
          rotateY: x * 10,
          rotateX: -y * 10,
          transformPerspective: 1000,
          duration: 0.5,
          ease: "power2.out"
        });
      };

      const resetTilt = () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: 1 });

      card.addEventListener('mousemove', handleTilt);
      card.addEventListener('mouseleave', resetTilt);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="flex flex-col-reverse lg:flex-row items-center justify-between gap-16 max-w-7xl mx-auto px-4 sm:px-8 py-20 overflow-hidden"
    >
      {/* Text Section */}
      <div className="flex-1 w-full">
        <div className="about-reveal">
          <p className={`${styles.sectionSubText} mb-2 text-orange-400 font-mono tracking-widest`}>Who Am I?</p>
          <h2 className={`${styles.sectionHeadText} text-white text-4xl sm:text-6xl font-black`}>
            A Quick Overview
          </h2>
        </div>

        <div 
          ref={cardRef}
          className="about-reveal mt-8 bg-white/5 p-8 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/10 text-white relative group"
        >
          {/* Decorative Corner Glow */}
          <div className="absolute -top-1 -left-1 w-20 h-20 bg-orange-500/10 blur-2xl group-hover:bg-orange-500/30 transition-colors" />

          <p className="text-base sm:text-lg leading-relaxed text-gray-300">
            I’m a Data Analyst skilled in 
            <span className="text-white font-bold"> Excel, PowerBI, SQL and Python</span>. 
          My role is to take the millions of data points a business generates and distill them into a narrative that answers three critical questions: What happened? Why did it happen? And what should we do next?
            
          </p>

          <p className="mt-6 text-base sm:text-lg font-medium text-white/90">
            📧 Email:{" "}
            <a
              href="mailto:rahulaverma16@gmail.com"
              className="underline text-orange-400 hover:text-orange-500 transition-colors duration-300"
            >
              abhshekchauhab2628@gmail.com
            </a>
          </p>

          <div className="flex flex-wrap gap-6 mt-10">
            <Button
              title="Hire Me"
              href="mailto:abhshekchauhab2628@gmail.com"
              icon={<HiOutlineBriefcase />}
            />
            <Button
              title="Download Resume"
              href="#"
              icon={<FaDownload />}
              download
            />
          </div>
        </div>
      </div>

      {/* Visual Section */}
      <div className="about-reveal w-full lg:w-1/2 h-[450px]">
        <ComputersCanvas />
      </div>
    </section>
  );
};

export default SectionWrapper(About, "about");