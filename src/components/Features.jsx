import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const Features = () => {
  const data = useMemo(
    () => ({
      sections: [
        {
          id: "pdf-1",
          title: "PDF Resources & Articles",
          description:
            "Downloadable worksheets, guides, and short articles to support mental health education and self‑help.",
          icon: "📄",
          color: "cyan",
          type: "pdfs",
          items: [
            {
              id: "pdf-101",
              title: "Daily Mood Tracker",
              format: "PDF",
              pages: 2,
              url: "#",
            },
            {
              id: "pdf-102",
              title: "CBT Thought Record",
              format: "PDF",
              pages: 1,
              url: "#",
            },
            {
              id: "pdf-103",
              title: "Sleep Hygiene Checklist",
              format: "PDF",
              pages: 1,
              url: "#",
            },
            {
              id: "pdf-104",
              title: "Managing Worry: Quick Guide",
              format: "PDF",
              pages: 4,
              url: "#",
            },
          ],
          actions: [
            { label: "Browse PDFs", type: "primary", action: "open_section" },
            {
              label: "Download Pack",
              type: "secondary",
              action: "download_pack",
            },
          ],
        },
        {
          id: "vid-1",
          title: "Video Resources",
          description:
            "Short videos covering anxiety, depression, and core coping skills with practical demonstrations.",
          icon: "🎥",
          color: "purple",
          type: "videos",
          items: [
            {
              id: "v-101",
              title: "Understanding Anxiety (Explainer)",
              duration: "9:45",
              level: "Beginner",
              url: "#",
            },
            {
              id: "v-102",
              title: "Grounding For Panic",
              duration: "7:10",
              level: "Beginner",
              url: "#",
            },
            {
              id: "v-103",
              title: "CBT: Catch, Check, Change",
              duration: "11:05",
              level: "Intermediate",
              url: "#",
            },
            {
              id: "v-104",
              title: "Stress vs. Burnout",
              duration: "8:02",
              level: "Beginner",
              url: "#",
            },
          ],
          actions: [
            { label: "Watch Videos", type: "primary", action: "open_section" },
            {
              label: "Video Library",
              type: "secondary",
              action: "open_section",
            },
          ],
        },
        {
          id: "med-1",
          title: "Basic Meditation & Breathing",
          description:
            "Beginner‑friendly meditations and simple breathing exercises to reduce stress and increase focus.",
          icon: "🧘",
          color: "green",
          type: "meditation",
          items: [
            {
              id: "m-101",
              title: "Box Breathing (4×4×4×4)",
              duration: "5:30",
              kind: "breathwork",
            },
            {
              id: "m-102",
              title: "5-Minute Mindful Check‑in",
              duration: "5:00",
              kind: "mindfulness",
            },
            {
              id: "m-103",
              title: "Body Scan (Short)",
              duration: "8:20",
              kind: "relaxation",
            },
            {
              id: "m-104",
              title: "Calm Countdown (5‑4‑3‑2‑1)",
              duration: "4:10",
              kind: "grounding",
            },
          ],
          actions: [
            {
              label: "Start Practice",
              type: "primary",
              action: "open_section",
            },
            { label: "View All", type: "secondary", action: "open_section" },
          ],
        },
        {
          id: "aud-1",
          title: "Audio Resources",
          description:
            "Listen to calming tracks, guided relaxations, and short talks on mental wellness.",
          icon: "🎧",
          color: "blue",
          type: "audio",
          items: [
            {
              id: "a-201",
              title: "Relaxed Breathing Loop",
              duration: "6:00",
              url: "#",
            },
            {
              id: "a-202",
              title: "Progressive Muscle Relaxation",
              duration: "12:15",
              url: "#",
            },
            {
              id: "a-203",
              title: "Wind‑Down for Sleep",
              duration: "10:40",
              url: "#",
            },
            {
              id: "a-204",
              title: "Morning Focus Tone",
              duration: "7:05",
              url: "#",
            },
          ],
          actions: [
            { label: "Listen Now", type: "primary", action: "open_section" },
            { label: "All Audio", type: "secondary", action: "open_section" },
          ],
        },
      ],
    }),
    []
  );

  const [selected, setSelected] = useState(null);

  const openSection = (section) => setSelected(section);
  const closeModal = () => setSelected(null);

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center relative text-white">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-20 -right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="absolute h-[96vh] w-[96vw] rr bc rrCenter flex flex-col justify-center items-center overflow-y-hidden">
        <div className="relative z-10 w-full h-full flex flex-col justify-center items-center px-4">
          {/* Header - Compact */}
          <header className="text-center mb-6 flex-shrink-0">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Mental Health Resources
            </h1> 
            <p className="text-sm text-gray-300 max-w-xl mx-auto">
              Explore PDFs, videos, meditation exercises, and audio resources.
            </p>
          </header>

          {/* 2x2 grid - Compact to fit without scrolling */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-4xl flex-1 max-h-[70vh]">
            {data.sections.map((s) => (
              <ResourceCard
                key={s.id}
                section={s}
                onOpen={() => openSection(s)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selected && <SectionModal section={selected} onClose={closeModal} />}
    </div>
  );
};

/* ---------- UI helpers ---------- */

const palette = {
  purple: { bar: "from-purple-500 to-purple-700", ring: "ring-purple-400/40" },
  green: { bar: "from-emerald-500 to-teal-600", ring: "ring-emerald-400/40" },
  blue: { bar: "from-blue-500 to-cyan-500", ring: "ring-blue-400/40" },
  cyan: { bar: "from-cyan-500 to-teal-600", ring: "ring-cyan-400/40" },
};

const ResourceCard = ({ section, onOpen }) => {
  const { title, description, icon, color, items, actions } = section;
  const c = palette[color] || palette.purple;

  return (
    <motion.div
      className={cn(
        "w-full rounded-md overflow-hidden",
        "border-transparent",
        "p-2",
        "relative group z-10 h-full"
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Layer 1: The Glass Effect Background */}
      <div
        className="absolute top-0 left-0 z-0 h-full w-full rounded-sm
            shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)]
        transition-all
        dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)] border-4 border-white/40"
      />

      {/* Layer 2: Backdrop Filter */}
      <div className="absolute top-0 left-0 isolate -z-10 h-full w-full rounded-md overflow-hidden" />

      {/* Layer 3: The Diagonal Lines Pattern and Gradient */}
      <div
        className={cn(
          "absolute inset-0 z-5 w-full h-full bg-repeat",
          "bg-[length:30px_30px]",
          "bg-lines-pattern-light dark:bg-lines-pattern"
        )}
      >
        <div
          className={cn(
            "w-full h-full bg-gradient-to-tr",
            "from-white/5 via-white/0 to-white/0",
            "dark:from-black/10 dark:via-black/0 dark:to-black/0"
          )}
        />
      </div>

      {/* Layer 4: Text Background for Readability */}
      <div className="absolute inset-0 z-10 bg-black/5 rounded-md backdrop-blur-[0px]" />

      {/* Layer 5: Actual Card Content */}
      <div className="relative z-20 p-3 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${c.bar}`} />
          <span className="text-lg">{icon}</span>
        </div>

        <h2 className="text-base font-semibold mb-2 text-white">{title}</h2>
        <p className="text-gray-300 mb-3 text-xs leading-tight flex-grow">
          {description}
        </p>

        {items?.length > 0 && (
          <ul className="space-y-0.5 mb-3">
            {items.slice(0, 2).map((it) => (
              <li
                key={it.id}
                className="text-xs text-gray-400 flex items-center"
              >
                <span className="text-indigo-400 mr-1.5">•</span>
                <span className="truncate">{it.title}</span>
              </li>
            ))}
            {items.length > 2 && (
              <li className="text-xs text-gray-500 italic flex items-center">
                <span className="text-indigo-400 mr-1.5">•</span>+
                {items.length - 2} more
              </li>
            )}
          </ul>
        )}

        <div className="mt-auto">
          {actions?.slice(0, 1).map((a, i) => (
            <Btn
              key={i}
              kind={a.type}
              onClick={onOpen}
              ring={c.ring}
              className="text-xs py-1.5 px-3 w-full"
            >
              {a.label}
            </Btn>
          ))}
        </div>
      </div>

      {/* SVG Filter Definition */}
      <svg className="hidden">
        <defs>
          <filter
            id="liquid-glass-filter"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.05 0.05"
              numOctaves="1"
              seed="1"
              result="turbulence"
            />
            <feGaussianBlur
              in="turbulence"
              stdDeviation="2"
              result="blurredNoise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="blurredNoise"
              scale="70"
              xChannelSelector="R"
              yChannelSelector="B"
              result="displaced"
            />
            <feGaussianBlur
              in="displaced"
              stdDeviation="4"
              result="finalBlur"
            />
            <feComposite in="finalBlur" in2="finalBlur" operator="over" />
          </filter>
        </defs>
      </svg>
    </motion.div>
  );
};

const Btn = ({ kind = "primary", onClick, children, className = "", ring }) => {
  const base =
    "rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 " +
    (ring || "ring-indigo-400/40");
  const variants = {
    primary:
      "bg-gradient-to-r from-indigo-400 to-purple-500 text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/30",
    secondary:
      "bg-white/10 text-white border border-white/20 hover:bg-white/15 hover:border-white/30",
  };
  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[kind]} ${className}`}
    >
      {children}
    </button>
  );
};

/* ---------- Modal renderer (per section type) ---------- */

const SectionModal = ({ section, onClose }) => {
  const wrap = (children) => (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        className={cn(
          "max-w-4xl w-full max-h-[80vh] rounded-md overflow-hidden",
          "border-transparent",
          "p-3",
          "relative group z-10"
        )}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Layer 1: The Glass Effect Background */}
        <div
          className="absolute top-0 left-0 z-0 h-full w-full rounded-sm
              shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)]
          transition-all
          dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)] border-4 border-white/40"
        />

        {/* Layer 2: Backdrop Filter */}
        <div className="absolute top-0 left-0 isolate -z-10 h-full w-full rounded-md overflow-hidden" />

        {/* Layer 3: The Diagonal Lines Pattern and Gradient */}
        <div
          className={cn(
            "absolute inset-0 z-5 w-full h-full bg-repeat",
            "bg-[length:30px_30px]",
            "bg-lines-pattern-light dark:bg-lines-pattern"
          )}
        >
          <div
            className={cn(
              "w-full h-full bg-gradient-to-tr",
              "from-white/5 via-white/0 to-white/0",
              "dark:from-black/10 dark:via-black/0 dark:to-black/0"
            )}
          />
        </div>

        {/* Layer 4: Text Background for Readability */}
        <div className="absolute inset-0 z-10 bg-black/5 rounded-md backdrop-blur-[0px]" />

        {/* Layer 5: Actual Modal Content */}
        <div className="relative z-20 h-full flex flex-col">
          <div className="flex justify-between items-center p-6 border-b border-white/20 flex-shrink-0">
            <h2 className="text-2xl font-semibold text-white">
              {section.title}
            </h2>
            <button
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              onClick={onClose}
            >
              <span className="text-2xl">×</span>
            </button>
          </div>
          <div className="p-6 flex-1 overflow-y-auto">{children}</div>
        </div>

        {/* SVG Filter Definition */}
        <svg className="hidden">
          <defs>
            <filter
              id="modal-liquid-glass-filter"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              colorInterpolationFilters="sRGB"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.05 0.05"
                numOctaves="1"
                seed="2"
                result="turbulence"
              />
              <feGaussianBlur
                in="turbulence"
                stdDeviation="2"
                result="blurredNoise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="blurredNoise"
                scale="70"
                xChannelSelector="R"
                yChannelSelector="B"
                result="displaced"
              />
              <feGaussianBlur
                in="displaced"
                stdDeviation="4"
                result="finalBlur"
              />
              <feComposite in="finalBlur" in2="finalBlur" operator="over" />
            </filter>
          </defs>
        </svg>
      </motion.div>
    </div>
  );

  if (section.type === "pdfs") {
    return wrap(
      <div className="space-y-3">
        {section.items.map((f) => (
          <div
            key={f.id}
            className="flex items-center gap-4 bg-white/5 rounded-lg p-4 hover:bg-white/10 transition"
          >
            <span className="text-2xl">📄</span>
            <span className="flex-grow text-gray-200">{f.title}</span>
            <span className="text-gray-500 text-xs">
              {f.format} • {f.pages}p
            </span>
            <button className="bg-indigo-400 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition">
              Download
            </button>
          </div>
        ))}
      </div>
    );
  }

  if (section.type === "videos") {
    return wrap(
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {section.items.map((v) => (
          <div
            key={v.id}
            className="bg-white/5 rounded-lg p-4 text-center hover:bg-white/10 transition cursor-pointer"
          >
            <div className="text-4xl mb-2">▶️</div>
            <div className="text-gray-200 font-medium">{v.title}</div>
            <div className="text-gray-400 text-sm mt-1">
              {v.duration} • {v.level}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (section.type === "meditation") {
    return wrap(
      <div className="space-y-3">
        {section.items.map((m) => (
          <div
            key={m.id}
            className="flex items-center gap-4 bg-white/5 rounded-lg p-4 hover:bg-white/10 transition"
          >
            <span className="text-2xl">🧘</span>
            <div className="flex-grow">
              <div className="text-white font-medium">{m.title}</div>
              <div className="text-gray-400 text-sm capitalize">{m.kind}</div>
            </div>
            <span className="text-gray-400 text-sm">{m.duration}</span>
            <button className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition">
              Start
            </button>
          </div>
        ))}
      </div>
    );
  }

  if (section.type === "audio") {
    return wrap(
      <div className="space-y-3">
        {section.items.map((a) => (
          <div
            key={a.id}
            className="flex items-center gap-4 bg-white/5 rounded-lg p-4 hover:bg-white/10 transition"
          >
            <span className="text-2xl">🎵</span>
            <span className="flex-grow text-gray-200">{a.title}</span>
            <span className="text-gray-400 text-sm">{a.duration}</span>
            <button className="bg-indigo-400 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition">
              Play
            </button>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default Features;
