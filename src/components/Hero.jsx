import { useLayoutEffect, useRef } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const container = useRef(null);
  const cursorRef = useRef(null);
  const cursorFollowerRef = useRef(null);
  const progressRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Create a master timeline for the entrance
      const entranceTl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // 1. Entrance Animation
      entranceTl.from(".hero-content > *", {
        y: 80,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
      })
      .from(".visual-element", {
        scale: 0,
        opacity: 0,
        duration: 2,
        ease: "elastic.out(1, 0.5)",
      }, "-=1");

      // 2. Scroll Animations (Wrapped in a ScrollTrigger)
      // We use .to() with immediateRender: false so it doesn't break the entrance
      gsap.to(".hero-content", {
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: -100,
        opacity: 0,
        immediateRender: false, // CRITICAL FIX
      });

      gsap.to(".visual-element", {
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        scale: 1.3,
        opacity: 0,
        immediateRender: false, // CRITICAL FIX
      });

      // 3. Section Indicator (Remains the same)
      gsap.to(progressRef.current, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });

      // 4. Mouse Logic
      const moveCursor = (e) => {
        const { clientX, clientY } = e;
        gsap.to(cursorRef.current, { x: clientX, y: clientY, duration: 0.1 });
        gsap.to(cursorFollowerRef.current, { x: clientX, y: clientY, duration: 0.5, ease: "power2.out" });

        const xPos = (clientX / window.innerWidth - 0.5) * 30;
        const yPos = (clientY / window.innerHeight - 0.5) * 30;
        gsap.to(".visual-inner", { x: xPos, y: yPos, duration: 1 });
      };

      window.addEventListener("mousemove", moveCursor);
      return () => window.removeEventListener("mousemove", moveCursor);
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="relative w-full h-screen bg-[#020012] text-white flex items-center justify-center px-6 overflow-hidden cursor-none"
    >
      {/* Scroll Indicator */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 w-[2px] h-32 bg-white/10 z-[100] hidden md:block">
        <div ref={progressRef} className="w-full bg-gradient-to-b from-pink-500 to-orange-400 h-0" />
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] tracking-tighter opacity-30 rotate-90 origin-center">SCROLL</div>
      </div>

      <div ref={cursorRef} className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2" />
      <div ref={cursorFollowerRef} className="fixed top-0 left-0 w-10 h-10 border border-white/50 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100" />

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center z-10">
        <div className="hero-content text-center md:text-left">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 uppercase">
            Abhishek
            <span className="block text-2xl md:text-3xl font-light tracking-widest text-gray-400 normal-case mt-2">
              data analyst
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-sm mx-auto md:mx-0 mb-8 border-l-2 border-pink-500 pl-4">
           Bridging the gap between raw data and business growth through rigorous statistical analysis.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-8 justify-center md:justify-start">
            <button className="group relative px-8 py-4 bg-transparent border border-white/20 rounded-sm overflow-hidden">
              <span className="relative z-10 font-bold group-hover:text-black transition-colors duration-300">ESTABLISH CONNECTION</span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-circ" />
            </button>
            <div className="flex gap-8 text-xl">
              {[FaGithub, FaLinkedin, FaTwitter].map((Icon, i) => (
                <a key={i} href="#" className="opacity-50 hover:opacity-100 transition-opacity cursor-none"><Icon /></a>
              ))}
            </div>
          </div>
        </div>

        {/* Visual Element with Inner Wrapper for Parallax */}
        <div className="visual-element relative hidden md:flex justify-center items-center">
          <div className="visual-inner relative flex justify-center items-center">
            <div className="w-80 h-80 border border-white/10 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute w-64 h-64 border-t-2 border-pink-500 rounded-full animate-[spin_10s_linear_infinite_reverse]" />
            <div className="absolute text-7xl opacity-10 font-black tracking-tighter select-none">DATA</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;