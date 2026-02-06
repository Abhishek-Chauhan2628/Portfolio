import React, { useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { styles } from "../style";
import { SectionWrapper } from "../hoc";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const formRef = useRef();
  const containerRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Reveal Animation for the entire card
      gsap.from(".contact-card", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      // 2. Magnetic Button Logic
      const btn = document.querySelector(".submit-btn");
      const handleMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4 });
      };
      const handleLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.4 });

      btn.addEventListener("mousemove", handleMove);
      btn.addEventListener("mouseleave", handleLeave);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

const handleSubmit = (e) => {
  e.preventDefault();
  setLoading(true);

  emailjs
    .send(
      'service_r0hp7dn', // Replace with your Service ID
      'template_nz8et94', // Replace with your Template ID
      {
        from_name: form.name,
        to_name: "Abhishek", // Or your name
        from_email: form.email,
        to_email: "rahulaverma16@gmail.com",
        message: form.message,
      },
      'LtV42ei0aJU-Ufa8I' // Replace with your Public Key
    )
    .then(
      () => {
        setLoading(false);
        alert("Thank you. I will get back to you as soon as possible.");

        // Success Animation
        gsap.to(".contact-card", {
          scale: 0.95,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
        });

        setForm({ name: "", email: "", message: "" });
      },
      (error) => {
        setLoading(false);
        console.error(error);
        alert("Ahh, something went wrong. Please try again.");
      }
    );
};

  return (
    <section 
      ref={containerRef}
      id="contact" 
      className="w-full max-w-4xl mx-auto px-6 py-24"
    >
      <div className="contact-card bg-white/5 backdrop-blur-xl p-8 sm:p-12 rounded-3xl shadow-2xl border border-white/10 relative overflow-hidden">
        
        {/* Background Glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-pink-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="mb-12 text-center sm:text-left">
          <p className={`${styles.sectionSubText} text-orange-400 font-mono tracking-widest uppercase`}>
            Get in Touch //
          </p>
          <h2 className={`${styles.sectionHeadText} text-white font-black text-5xl sm:text-7xl`}>
            Contact.
          </h2>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Input: Name */}
            <div className="group relative">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border-b border-white/20 text-white px-0 py-4 focus:outline-none focus:border-orange-500 transition-colors peer placeholder-transparent"
                placeholder="Name"
              />
              <label className="absolute left-0 top-4 text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-orange-400 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
                YOUR NAME
              </label>
            </div>

            {/* Input: Email */}
            <div className="group relative">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border-b border-white/20 text-white px-0 py-4 focus:outline-none focus:border-orange-500 transition-colors peer placeholder-transparent"
                placeholder="Email"
              />
              <label className="absolute left-0 top-4 text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-orange-400 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
                EMAIL ADDRESS
              </label>
            </div>
          </div>

          {/* Input: Message */}
          <div className="group relative">
            <textarea
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border-b border-white/20 text-white px-0 py-4 focus:outline-none focus:border-orange-500 transition-colors peer placeholder-transparent resize-none"
              placeholder="Message"
            />
            <label className="absolute left-0 top-4 text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-orange-400 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
              YOUR MESSAGE
            </label>
          </div>

          {/* Magnetic Button */}
          <div className="flex justify-center sm:justify-end mt-10">
            <button
              type="submit"
              disabled={loading}
              className="submit-btn relative group px-12 py-4 bg-transparent border border-white/20 rounded-full overflow-hidden transition-all"
            >
              <span className="relative z-10 font-bold text-sm tracking-[0.2em] group-hover:text-black transition-colors">
                {loading ? "SENDING..." : "SEND MESSAGE"}
              </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SectionWrapper(Contact, "contact");