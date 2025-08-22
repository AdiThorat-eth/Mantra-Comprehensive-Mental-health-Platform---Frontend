import React, { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";

// Expanded animated images for meditation, yoga, and breathing exercises
const meditationImages = [
  {
    src: "/img/animated-breathing-1.gif",
    alt: "Box Breathing Animation",
    label: "Box Breathing",
  },
  {
    src: "/img/animated-mindful-checkin.gif",
    alt: "Mindful Check-in Animation",
    label: "Mindful Check-in",
  },
  {
    src: "/img/animated-body-scan.gif",
    alt: "Body Scan Animation",
    label: "Body Scan",
  },
  {
    src: "/img/animated-calm-countdown.gif",
    alt: "Calm Countdown Animation",
    label: "Calm Countdown",
  },
  // Yoga and meditation poses
  {
    src: "/img/animated-yoga-mountain.gif",
    alt: "Yoga Mountain Pose Animation",
    label: "Mountain Pose",
  },
  {
    src: "/img/animated-yoga-tree.gif",
    alt: "Yoga Tree Pose Animation",
    label: "Tree Pose",
  },
  {
    src: "/img/animated-yoga-child.gif",
    alt: "Yoga Child's Pose Animation",
    label: "Child's Pose",
  },
  {
    src: "/img/animated-meditation-sitting.gif",
    alt: "Sitting Meditation Animation",
    label: "Sitting Meditation",
  },
];

const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const Features = () => {
  const data = useMemo(
    () => ({
      sections: [
        {
          id: "pdf-1",
          title: "Books & Articles for Difficult Times",
          description:
            "Download free, open-access books and articles that offer support, understanding, and practical guidance for those feeling sad or depressed.",
          icon: "📄",
          color: "cyan",
          type: "pdfs",
          items: [
            {
              id: "pdf-201",
              title: "Feeling Good: The New Mood Therapy (David D. Burns, MD) - Excerpt",
              format: "PDF",
              pages: 32,
              url: "https://www.feelinggood.com/wp-content/uploads/2014/01/Feeling-Good-Handbook-David-Burns.pdf",
            },
            {
              id: "pdf-202",
              title: "Depression: What You Need to Know (NIH Booklet)",
              format: "PDF",
              pages: 24,
              url: "https://www.nimh.nih.gov/sites/default/files/documents/health/publications/depression-what-you-need-to-know/21-mh-8079-depression-what-you-need-to-know_0.pdf",
            },
            {
              id: "pdf-203",
              title: "The Mindful Way Through Depression (Sample Chapter)",
              format: "PDF",
              pages: 18,
              url: "https://www.guilford.com/add/mindful-way-ch1.pdf",
            },
            {
              id: "pdf-204",
              title: "Coping with Depression (Royal College of Psychiatrists)",
              format: "PDF",
              pages: 8,
              url: "https://www.rcpsych.ac.uk/docs/default-source/improving-care/better-mh-policy/college-reports/college-report-cr225.pdf",
            },
            {
              id: "pdf-205",
              title: "How to Support a Friend with Depression (HelpGuide Article)",
              format: "PDF",
              pages: 6,
              url: "https://www.helpguide.org/articles/depression/helping-someone-with-depression.htm",
            },
            {
              id: "pdf-206",
              title: "The Science of Well-Being (Yale University) - Course Notes",
              format: "PDF",
              pages: 40,
              url: "https://static.coursera.org/asset/v1/1Qn2ATmNnS1QvA4k6QqvOB0fOkHnQ2m30IZHuZOKA3Jw6Q/asset/Notes_The_Science_of_Well-Being.pdf",
            },
          ],
          actions: [
            { label: "Browse Downloads", type: "primary", action: "open_section" },
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
              url: "https://www.youtube.com/embed/WWloIAQpMcQ",
            },
            {
              id: "v-102",
              title: "Grounding For Panic",
              duration: "7:10",
              level: "Beginner",
              url: "https://www.youtube.com/embed/9rLZYyMbJic",
            },
            {
              id: "v-103",
              title: "CBT: Catch, Check, Change",
              duration: "11:05",
              level: "Intermediate",
              url: "https://www.youtube.com/embed/9c_Bv_FBE-c",
            },
            {
              id: "v-104",
              title: "Stress vs. Burnout",
              duration: "8:02",
              level: "Beginner",
              url: "https://www.youtube.com/embed/4NQreLs8QpA",
            },
            {
              id: "v-105",
              title: "Progressive Muscle Relaxation (Guided)",
              duration: "12:00",
              level: "Relaxation",
              url: "https://www.youtube.com/embed/1nZEdqcGVzo",
              afterRelax: true,
            },
            {
              id: "v-106",
              title: "Guided Mindfulness Meditation for Calm",
              duration: "10:00",
              level: "Relaxation",
              url: "https://www.youtube.com/embed/inpok4MKVLM",
              afterRelax: true,
            },
            {
              id: "v-107",
              title: "Deep Breathing for Stress Relief",
              duration: "6:00",
              level: "Relaxation",
              url: "https://www.youtube.com/embed/odADwWzHR24",
              afterRelax: true,
            },
            {
              id: "v-108",
              title: "Managing Depression: Practical Steps",
              duration: "10:30",
              level: "Intermediate",
              url: "https://www.youtube.com/embed/1Evwgu369Jw",
            },
            {
              id: "v-109",
              title: "Coping with Social Anxiety",
              duration: "8:50",
              level: "Beginner",
              url: "https://www.youtube.com/embed/3QwvJWjAt6A",
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
            "Beginner-friendly meditations and simple breathing exercises to reduce stress and increase focus.",
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
              title: "5-Minute Mindful Check-in",
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
              title: "Calm Countdown (5-4-3-2-1)",
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
              url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            },
            {
              id: "a-202",
              title: "Progressive Muscle Relaxation",
              duration: "12:15",
              url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
            },
            {
              id: "a-203",
              title: "Wind-Down for Sleep",
              duration: "10:40",
              url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
            },
            {
              id: "a-204",
              title: "Morning Focus Tone",
              duration: "7:05",
              url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
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

      <div className="absolute h-screen w-[96vw] rr bc rrCenter flex flex-col justify-center items-center overflow-y-hidden">
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
          <div className="grid grid-cols-2 gap-3 w-full max-w-4xl flex-1 max-h-[70vh] overflow-y-auto">
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

// AudioPlayer component for playing audio
const AudioPlayer = ({ url, isPlaying, onPlay, onPause }) => {
  const audioRef = useRef(null);

  React.useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [isPlaying, url]);

  return (
    <audio
      ref={audioRef}
      src={url}
      onEnded={onPause}
      style={{ display: "none" }}
    />
  );
};

// VideoPlayer: Remove autoPlay, always show with autoPlay=false
const VideoPlayer = ({ url, onEnded }) => (
  <div className="w-full aspect-video rounded-lg overflow-hidden bg-black mb-2">
    <iframe
      src={url + "?rel=0"}
      title="Video Resource"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="w-full h-full"
      frameBorder="0"
      onEnded={onEnded}
    />
  </div>
);

const SectionModal = ({ section, onClose }) => {
  // For audio playback state
  const [playingAudioId, setPlayingAudioId] = useState(null);

  // For video playback state
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handlePlayAudio = (audioId) => {
    setPlayingAudioId(audioId);
  };

  const handlePauseAudio = () => {
    setPlayingAudioId(null);
  };

  // For video auto-play after relaxation
  const getMainVideos = () =>
    section.items.filter((v) => !v.afterRelax);
  const getRelaxVideos = () =>
    section.items.filter((v) => v.afterRelax);

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
            "absolute inset-0 z-[1] w-full h-full bg-repeat",
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
        <div className="absolute inset-0 z-[2] bg-black/20 rounded-md backdrop-blur-[0px]" />

        {/* Layer 5: Actual Modal Content */}
        <div className="relative z-50 h-full flex flex-col">
          <div className="flex justify-between items-center p-6 border-b border-white/20 flex-shrink-0">
            <h2 className="text-2xl font-semibold text-white relative z-50">
              {section.title}
            </h2>
            <button
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors relative z-50"
              onClick={onClose}
            >
              <span className="text-2xl">×</span>
            </button>
          </div>
          <div className="p-6 flex-1 overflow-y-auto relative z-50">{children}</div>
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
      <div className="space-y-3 relative z-[100] max-h-[60vh] overflow-y-auto pr-2">
        {section.items.map((f) => (
          <div
            key={f.id}
            className="flex items-center gap-4 bg-white/20 rounded-lg p-4 hover:bg-white/25 transition relative z-[100] text-white border border-white/10"
            style={{ position: 'relative', zIndex: 100 }}
          >
            <span className="text-2xl relative z-[100]">📄</span>
            <span className="flex-grow text-white font-medium relative z-[100]">{f.title}</span>
            <span className="text-gray-200 text-sm relative z-[100]">
              {f.format} • {f.pages}p
            </span>
            <a
              href={f.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition relative z-[100]"
              download
            >
              Download
            </a>
          </div>
        ))}
      </div>
    );
  }

  if (section.type === "videos") {
    // Professional video modal: user selects video from the list
    const allVideos = section.items;

    // If there are no videos, fallback
    if (allVideos.length === 0) {
      return wrap(<div className="text-white">No videos available.</div>);
    }

    // Current video object
    const currentVideo = allVideos[currentVideoIndex];

    return wrap(
      <div className="relative z-[100] flex flex-col items-center w-full max-h-[60vh] overflow-y-auto pr-2">
        <div className="w-full max-w-2xl mx-auto">
          {/* VideoPlayer with autoPlay removed */}
          <VideoPlayer
            url={currentVideo.url}
          />
          <div className="text-white font-semibold text-lg mb-1 text-center">
            {currentVideo.title}
          </div>
          <div className="text-gray-300 text-sm mb-4 text-center">
            {currentVideo.duration} • {currentVideo.level}
          </div>
        </div>
        <div className="mt-8 w-full">
          <div className="text-white font-semibold mb-2 text-center">Select a Video</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allVideos.map((v, idx) => (
              <div
                key={v.id}
                className={cn(
                  "bg-white/20 rounded-lg p-4 text-center hover:bg-white/25 transition cursor-pointer border border-white/10",
                  idx === currentVideoIndex ? "ring-2 ring-indigo-400" : ""
                )}
                onClick={() => setCurrentVideoIndex(idx)}
                style={{ position: 'relative', zIndex: 100 }}
              >
                <div className="text-4xl mb-2 relative z-[100]">{v.afterRelax ? "🧘" : "▶️"}</div>
                <div className="text-white font-medium relative z-[100]">{v.title}</div>
                <div className="text-gray-200 text-sm mt-1 relative z-[100]">
                  {v.duration} • {v.level}
                </div>
                {v.afterRelax && (
                  <div className="text-emerald-300 text-xs mt-1">Relaxation</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (section.type === "meditation") {
    // Add slide scrolling for animated images
    // We'll use a scrollable container with snap-x and snap-center for smooth slide scrolling
    return wrap(
      <div className="space-y-6 relative z-[100] max-h-[60vh] overflow-y-auto pr-2">
        {/* Animated exercise images with slide scrolling */}
        <div className="mb-4">
          <div className="text-white font-semibold mb-2 text-center">Exercise Animations</div>
          <div
            className="flex gap-6 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {meditationImages.map((img, idx) => (
              <div
                key={img.src}
                className="flex flex-col items-center min-w-[160px] max-w-[180px] bg-white/10 rounded-lg p-3 border border-white/10 shadow-md snap-center"
                style={{ flex: "0 0 auto" }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-28 h-28 object-contain rounded-lg mb-2 animate-pulse"
                  loading="lazy"
                  draggable={false}
                  style={{ background: "#222" }}
                />
                <span className="text-xs text-white font-medium">{img.label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Meditation exercise list */}
        <div className="space-y-3">
          {section.items.map((m) => (
            <div
              key={m.id}
              className="flex items-center gap-4 bg-white/20 rounded-lg p-4 hover:bg-white/25 transition relative z-[100] border border-white/10"
              style={{ position: 'relative', zIndex: 100 }}
            >
              <span className="text-2xl relative z-[100]">🧘</span>
              <div className="flex-grow relative z-[100]">
                <div className="text-white font-medium">{m.title}</div>
                <div className="text-gray-200 text-sm capitalize">{m.kind}</div>
              </div>
              <span className="text-gray-200 text-sm relative z-[100]">{m.duration}</span>
              <button className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition relative z-[100]">
                Start
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (section.type === "audio") {
    return wrap(
      <div className="space-y-3 relative z-[100] max-h-[60vh] overflow-y-auto pr-2">
        {section.items.map((a) => (
          <div
            key={a.id}
            className="flex items-center gap-4 bg-white/20 rounded-lg p-4 hover:bg-white/25 transition relative z-[100] border border-white/10"
            style={{ position: 'relative', zIndex: 100 }}
          >
            <span className="text-2xl relative z-[100]">🎵</span>
            <span className="flex-grow text-white font-medium relative z-[100]">{a.title}</span>
            <span className="text-gray-200 text-sm relative z-[100]">{a.duration}</span>
            <button
              className={`bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition relative z-[100]`}
              onClick={() =>
                playingAudioId === a.id
                  ? handlePauseAudio()
                  : handlePlayAudio(a.id)
              }
            >
              {playingAudioId === a.id ? "Pause" : "Play"}
            </button>
            {/* Audio player, only rendered for the currently playing audio */}
            {playingAudioId === a.id && (
              <AudioPlayer
                url={a.url}
                isPlaying={playingAudioId === a.id}
                onPlay={() => handlePlayAudio(a.id)}
                onPause={handlePauseAudio}
              />
            )}
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default Features;
