import React from "react";
import Review from "./Review"; // Adjust path as needed

// Custom testimonials data
const customTestimonials = [
  {
    tempId: 0,
    testimonial:
      "Battling depression was lonely. The video sessions are so empathetic, and the blogs relatable. True hope found here.",
    by: "Aparna K.",
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
    by: "Emily R.",
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
    by: "Angelina W.",
    imgSrc: "https://i.pravatar.cc/150?img=30",
  },
];

const Testimonial = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center relative">
      {/* Section Header */}
      <div className="absolute h-[100vh] w-[96vw] rr tt2 rrCenter flex flex-col justify-center items-center overflow-y-auto">
        <div className="text-center mb-4 mt-10">
          <h2 className="text-5xl font-bold mb-4">Testimonials</h2>
          <p className="special-font text-xl max-w-2xl mx-auto opacity-70">
            We believe in{" "}
            <b>
              <ss>quality</ss>
            </b>
          </p>
        </div>

        {/* Reviews Component */}
        <Review
          testimonials={customTestimonials}
          autoSwitchInterval={3000} // 4 seconds
          showControls={true}
          height={600}
        />
      </div>
    </div>
  );
};

export default Testimonial;
