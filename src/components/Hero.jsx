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
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 2 } });

      // 1. Entrance: Materialize from Transparency (Static Position)
      tl.to(".hero-reveal", {
        opacity: 1,
        scale: 1,
        stagger: 0.2,
        delay: 0.5,
      })
      .from(".visual-element", {
        opacity: 0,
        scale: 0.9,
        duration: 2,
      }, "-=1.5");

      // 2. Global Scroll Indicator (Tracks the entire page)
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

      // 2. Data Nodes Animation: Floating effect
gsap.to(".data-node", {
  y: "random(-40, 40)", // Increased range for better visibility
  x: "random(-40, 40)",
  duration: "random(2, 4)",
  repeat: -1,
  yoyo: true,
  ease: "none", // Linear/none often feels more "data-like"
  stagger: {
    amount: 1.5,
    from: "random"
  }
});

      // 3. Hero Content Fade-out on Scroll
      gsap.to(".hero-content", {
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        opacity: 0,
        scale: 0.95,
      });

      // 4. FIXED: Radar Visibility (fromTo ensures it returns when scrolling up)
    // 5. FIXED: Stable Radar (Opacity no longer changes on scroll)
gsap.to(".visual-element", {
  scale: 1.1, // Keeps the subtle zoom without changing color/transparency
  scrollTrigger: {
    trigger: container.current,
    start: "top top",
    end: "bottom top",
    scrub: 1,
    invalidateOnRefresh: true,
  },
});

      // 5. Mouse Interaction
      const moveCursor = (e) => {
        const { clientX, clientY } = e;
        gsap.to(cursorRef.current, { x: clientX, y: clientY, duration: 0.1 });
        gsap.to(cursorFollowerRef.current, { x: clientX, y: clientY, duration: 0.6 });
        
        const xPos = (clientX / window.innerWidth - 0.5) * 25;
        const yPos = (clientY / window.innerHeight - 0.5) * 25;
        gsap.to(".visual-inner", { x: xPos, y: yPos, duration: 1.2 });
      };

      window.addEventListener("mousemove", moveCursor);
      return () => window.removeEventListener("mousemove", moveCursor);
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="relative w-full h-screen bg-[#020012] flex items-center justify-center px-6 overflow-hidden cursor-none">
      
      {/* Persistent Scroll Indicator */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 w-[2px] h-32 bg-white/10 z-[100] hidden md:block">
        <div ref={progressRef} className="scroll-bar-fill w-full bg-gradient-to-b from-orange-500 to-orange-400 h-0" />
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.2em] opacity-30 rotate-90 origin-center uppercase font-mono">
          Scroll
        </div>
      </div>

      {/* Custom Cursors */}
      <div ref={cursorRef} className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2" />
      <div ref={cursorFollowerRef} className="fixed top-0 left-0 w-12 h-12 border border-white/20 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
        <div className="hero-content flex flex-col items-start">
          <h1 className="hero-reveal text-7xl md:text-[120px] font-black uppercase leading-none tracking-tighter">
            Abhishek
          </h1>

          <span className="hero-reveal block text-xl md:text-3xl font-semibold text-orange-500 uppercase tracking-widest mt-4">
            // data analyst
          </span>
          
          <div className="hero-reveal border-l-2 border-orange-500/50 pl-8 py-4 my-8 max-w-lg">
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
              Bridging the gap between raw data and business growth through 
              <span className="text-white font-medium"> rigorous statistical analysis.</span>
            </p>
          </div>

          <div className="hero-reveal flex flex-wrap items-center gap-10 mt-6">
            <button className="group relative px-10 py-5 bg-white text-black font-bold text-[10px] tracking-[0.2em] uppercase overflow-hidden transition-transform hover:scale-105">
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">Establish Connection</span>
              <div className="absolute inset-0 bg-orange-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
            <div className="flex gap-6 text-2xl text-gray-600">
              <FaGithub className="hover:text-orange-500 transition-colors cursor-none" />
              <FaLinkedin className="hover:text-orange-500 transition-colors cursor-none" />
              <FaTwitter className="hover:text-orange-500 transition-colors cursor-none" />
            </div>
          </div>
        </div>

        {/* Right Side Visual Hub */}
        <div className="visual-element relative hidden lg:flex justify-center items-center opacity-40">
          <div className="visual-inner relative w-[500px] h-[500px] flex justify-center items-center">
            <div className="absolute w-full h-full rounded-full border border-white/10" />
            <div className="absolute w-full h-full radar-scan" />
            <div className="absolute w-[85%] h-[85%] border border-orange-500/10 rounded-full animate-[spin_25s_linear_infinite]" />
            
            {/* Generating 15 Data Nodes */}
            {[...Array(15)].map((_, i) => (
              <div 
                key={i} 
                className="data-node absolute w-1.5 h-1.5 bg-orange-500 rounded-full" 
                style={{ 
                  top: `${Math.random() * 80 + 10}%`, 
                  left: `${Math.random() * 80 + 10}%`, 
                  opacity: 0.4 
                }} 
              />
            ))}
            
            <div className="z-20 flex flex-col items-center">
              <h2 className="text-8xl font-black text-white/10 uppercase tracking-tighter select-none">Data</h2>
              <div className="mt-2 px-3 py-1 bg-orange-500/10 border border-orange-500 rounded-full animate-pulse-subtle">
                <span className="text-[10px] font-mono text-orange-500 tracking-[0.3em]">Data Analyst</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;