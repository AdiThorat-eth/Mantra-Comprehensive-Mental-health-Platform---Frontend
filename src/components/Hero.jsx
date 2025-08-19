import { LavaLamp } from "./AnimatedBack";

export default function Hero() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center relative">
      <LavaLamp />
      <h1 className="text-6xl md:text-8xl font-false tracking-tight mix-blend-exclusion whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:from-green-400 hover:to-lime-500 transition-all duration-700 ease-in-out">
        MANTRA
      </h1>
      {/* <h1 className="text-6xl md:text-8xl font-false tracking-tight mix-blend-exclusion whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-white to-white hover:from-green-400 hover:to-lime-500 transition duration-500">
        MANTRA
      </h1> */}

      <p className="text-lg md:text-xl text-center text-white mix-blend-exclusion max-w-2xl leading-relaxed">
        Your trusted companion on the journey to better mental health. Explore
        personalized guidance, and a safe space to grow emotionally and
        mentally.
      </p>
    </div>
  );
}
