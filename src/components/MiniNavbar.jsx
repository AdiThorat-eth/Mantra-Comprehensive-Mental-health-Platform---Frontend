// MiniNavbar.jsx
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import { CgMenu } from "react-icons/cg";

const MiniNavbar = () => {
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const contactRef = useRef(null);
  const timeline = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { name: "home", href: "#home" },
    { name: "services", href: "#services" },
    { name: "Testimonial", href: "#testimonial" },
    { name: "Buy", href: "#price" },
    { name: "about", href: "#about" },
    { name: "Register", href: "#register" },
    { name: "Log in", href: "#login" },
  ];

  useGSAP(() => {
    gsap.set(navRef.current, { xPercent: 100 });
    gsap.set([linksRef.current, contactRef.current], {
      autoAlpha: 0,
      x: -20,
    });

    timeline.current = gsap
      .timeline({ paused: true })
      .to(navRef.current, {
        xPercent: 0,
        duration: 1,
        ease: "power3.out",
      })
      .to(
        linksRef.current,
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        contactRef.current,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "<+0.2"
      );
  });

  const toggleMenu = () => {
    if (isOpen) {
      timeline.current.reverse();
    } else {
      timeline.current.play();
    }
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
    timeline.current.reverse();
  };

  return (
    <>
      {/* Menu Button - ONLY VISIBLE ON SMALLER SCREENS (hidden on lg and up) */}
      <div className="fixed right-10 top-7 flex items-center gap-3 flex-shrink-0 z-[101] lg:hidden">
        {" "}
        {/* Added lg:hidden */}
        <button
          className={`h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
            isOpen
              ? "bg-white text-black shadow-xl border-2 border-gray-200"
              : "bg-black text-white shadow-lg"
          }`}
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <CgMenu
            className={`text-lg transition-transform duration-300 ${
              isOpen ? "rotate-90" : ""
            }`}
          />
        </button>
      </div>

      {/* Navigation Menu */}
      <nav
        ref={navRef}
        className="fixed z-50 flex flex-col justify-between w-full h-full px-10 uppercase bg-black text-white/80 py-28 gap-y-10 md:w-1/2 md:left-1/2"
      >
        <div className="flex flex-col text-5xl gap-y-2 md:text-6xl lg:text-6xl">
          {navigationItems.map((item, index) => (
            <div key={index} ref={(ele) => (linksRef.current[index] = ele)}>
              <a
                className="transition-all duration-300 cursor-pointer hover:text-white block"
                href={item.href}
                onClick={closeMenu}
              >
                {item.name}
              </a>
            </div>
          ))}
        </div>
        <div
          ref={contactRef}
          className="flex flex-col flex-wrap justify-between gap-8 md:flex-row"
        >
          <div className="font-circular">
            <p className="tracking-wider text-white/50">Email</p>
            <p className="text-xl tracking-widest lowercase text-pretty">
              Mantra.care@xyz.com
            </p>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MiniNavbar;
