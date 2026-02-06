import React, { useState, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const navRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Entrance Animation
      gsap.from(".nav-item", {
        y: -20,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.5,
      });

      // 2. Hide Navbar on Scroll Down, Show on Scroll Up
      const showAnim = gsap.from(navRef.current, { 
        yPercent: -100,
        paused: true,
        duration: 0.2
      }).progress(1);

      ScrollTrigger.create({
        start: "top top",
        end: 99999,
        onUpdate: (self) => {
          self.direction === -1 ? showAnim.play() : showAnim.reverse();
        }
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <nav 
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-xl shadow-md border-b border-white/10 px-6 py-3"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
          className="nav-item flex items-center gap-2 group"
        >
          <img src={logo} alt="Logo" className="w-9 h-9 bg-orange-600 object-contain group-hover:rotate-[360deg] transition-transform duration-700" />
          <span className="text-white text-xl font-bold tracking-wide bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
            Abhishek Chauhan
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden sm:flex gap-10">
          {navLinks.map((link) => (
            <li key={link.id} className="nav-item relative group">
              <a
                href={`#${link.id}`}
                onClick={() => setActive(link.title)}
                className={`text-[15px] uppercase tracking-widest font-medium transition-all duration-300 ${
                  active === link.title ? "text-orange-400" : "text-white/70"
                }`}
              >
                {link.title}
              </a>
              {/* Animated Underline */}
              <span className={`absolute -bottom-1 left-0 h-[1px] bg-orange-400 transition-all duration-300 ${active === link.title ? "w-full" : "w-0 group-hover:w-full"}`} />
            </li>
          ))}
        </ul>

        {/* Mobile Menu Icon */}
        <div className="sm:hidden flex items-center nav-item">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-7 h-7 cursor-pointer hover:scale-110 transition-transform"
            onClick={() => setToggle(!toggle)}
          />
        </div>

        {/* Mobile Nav Overlay */}
        <div
          className={`fixed top-0 right-0 w-full h-screen bg-[#020012]/95 backdrop-blur-2xl p-10 transition-all duration-500 z-40 flex flex-col items-center justify-center ${
            toggle ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          } sm:hidden`}
        >
          <img
            src={close}
            alt="close"
            className="absolute top-6 right-6 w-8 h-8 cursor-pointer"
            onClick={() => setToggle(false)}
          />
          <ul className="flex flex-col gap-8 text-center">
            {navLinks.map((link, index) => (
              <li 
                key={link.id}
                className={`transition-all duration-500 delay-${index * 100} ${toggle ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              >
                <a
                  href={`#${link.id}`}
                  onClick={() => {
                    setToggle(false);
                    setActive(link.title);
                  }}
                  className={`text-3xl font-bold tracking-tighter hover:text-orange-400 transition ${
                    active === link.title ? "text-orange-500" : "text-white"
                  }`}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;