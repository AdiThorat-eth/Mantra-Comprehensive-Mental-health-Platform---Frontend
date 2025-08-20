import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// If you don't have cn utility, you can use this simple version:
const cn = (...classes) => classes.filter(Boolean).join(" ");

const SQRT_5000 = Math.sqrt(5000);

const defaultTestimonials = [
  {
    tempId: 0,
    testimonial:
      "Battling depression was lonely. The video sessions are so empathetic, and the blogs relatable. True hope found here.",
    by: "Priya K.",
    imgSrc: "https://i.pravatar.cc/150?img=25",
  },
  {
    tempId: 1,
    testimonial:
      "Anxiety felt overwhelming. This platform's audio sessions and chatbot are quick, real-time lifesavers. Highly recommend!",
    by: "Johnny S.",
    imgSrc: "https://i.pravatar.cc/150?img=6",
  },
  {
    tempId: 2,
    testimonial:
      "Busy mom life meant no time for me. This platform's audio and chatbot support is perfect for my schedule. A real help.",
    by: "Emily R",
    imgSrc: "https://i.pravatar.cc/150?img=27",
  },
  {
    tempId: 3,
    testimonial:
      "Online video here make getting support so easy and effective. The blogs are a bonus. Game changer!",
    by: "Ravi K.",
    imgSrc: "https://i.pravatar.cc/150?img=3",
  },
  {
    tempId: 4,
    testimonial:
      "Busy mom life meant no time for me. This platform's audio and chatbot support is perfect for my schedule. A real help.",
    by: " Sarah M.",
    imgSrc: "https://i.pravatar.cc/150?img=29",
  },
  {
    tempId: 5,
    testimonial:
      "Hesitant at first, but the chatbot helped me open up. Now I'm loving the video sessions. Prioritizing my mental health!",
    by: "Angelina W",
    imgSrc: "https://i.pravatar.cc/150?img=30",
  },
];

const TestimonialCard = ({ position, testimonial, handleMove, cardSize }) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out",
        isCenter
          ? "z-10 bg-black text-green-600 border-primary hover:border-green-600"
          : "z-0 bg-white text-gray-800 border-gray-300 hover:border-green-600"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter
          ? "0px 8px 0px 4px hsl(var(--border))"
          : "0px 0px 0px 0px transparent",
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-border"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2,
        }}
      />
      <img
        src={testimonial.imgSrc}
        alt={`${testimonial.by.split(",")[0]}`}
        className="mb-4 h-14 w-12 bg-muted object-cover object-top"
        style={{
          boxShadow: "3px 3px 0px hsl(var(--background))",
        }}
      />
      <h3
        className={cn(
          "text-base sm:text-xl font-medium",
          isCenter ? "gradient-text" : "text-foreground"
        )}
      >
        "{testimonial.testimonial}"
      </h3>
      <p
        className={cn(
          "absolute bottom-8 left-8 right-8 mt-2 text-sm italic",
          isCenter ? "text-primary-foreground/80" : "text-muted-foreground"
        )}
      >
        - {testimonial.by}
      </p>
    </div>
  );
};

const Review = ({
  testimonials = defaultTestimonials,
  autoSwitchInterval = 2000,
  showControls = true,
  height = 600,
}) => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);
  const [isPaused, setIsPaused] = useState(false);

  const handleMove = (steps) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  // Auto-switch functionality
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleMove(1);
    }, autoSwitchInterval);

    return () => clearInterval(interval);
  }, [testimonialsList, isPaused, autoSwitchInterval]);

  // Update testimonials when prop changes
  useEffect(() => {
    setTestimonialsList(testimonials);
  }, [testimonials]);

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden top-0"
      style={{ height }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {testimonialsList.map((testimonial, index) => {
        const position =
          testimonialsList.length % 2
            ? index - (testimonialsList.length + 1) / 2
            : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
    </div>
  );
};

export default Review;
