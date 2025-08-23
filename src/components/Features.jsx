import React, { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";

// Yoga and Meditation relevant images (yoga poses and meditation)
const meditationImages = [
  {
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    alt: "Mountain Pose (Tadasana)",
    label: "Mountain Pose (Tadasana)",
  },
  {
    src: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
    alt: "Tree Pose (Vrikshasana)",
    label: "Tree Pose (Vrikshasana)",
  },
  {
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    alt: "Child's Pose (Balasana)",
    label: "Child's Pose (Balasana)",
  },
  {
    src: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    alt: "Lotus Pose (Padmasana)",
    label: "Lotus Pose (Padmasana)",
  },
  {
    src: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=400&q=80",
    alt: "Seated Meditation",
    label: "Seated Meditation",
  },
  {
    src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    alt: "Downward Dog (Adho Mukha Svanasana)",
    label: "Downward Dog (Adho Mukha Svanasana)",
  },
  {
    src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    alt: "Warrior II (Virabhadrasana II)",
    label: "Warrior II (Virabhadrasana II)",
  },
  {
    src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80",
    alt: "Meditation in Nature",
    label: "Meditation in Nature",
  },
];

const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const Features = () => {
  // State for PDF/article viewing
  const [selected, setSelected] = useState(null);
  const [pdfToView, setPdfToView] = useState(null);
  const [pdfMeta, setPdfMeta] = useState(null);

  const data = useMemo(
    () => ({
      sections: [
        {
          id: "pdf-1",
          title: "Yoga & Meditation Information",
          description:
            "Explore trusted online resources about yoga postures, meditation techniques, and their benefits. Click to visit the official sites for more information.",
          icon: "📄",
          color: "cyan",
          type: "pdfs",
          items: [
            {
              id: "yoga-101",
              title: "Yoga Basics: Poses, Types, History & Benefits (Yoga Journal)",
              format: "Link",
              url: "https://www.yogajournal.com/yoga-101/",
              readUrl: "https://www.yogajournal.com/yoga-101/",
              description: "Comprehensive guide to yoga basics, including foundational poses, types of yoga, and health benefits.",
              source: "Yoga Journal"
            },
            {
              id: "yoga-102",
              title: "Beginner Yoga Poses (Verywell Fit)",
              format: "Link",
              url: "https://www.verywellfit.com/beginner-yoga-poses-3566747",
              readUrl: "https://www.verywellfit.com/beginner-yoga-poses-3566747",
              description: "A list of beginner-friendly yoga poses with step-by-step instructions and images.",
              source: "Verywell Fit"
            },
            {
              id: "yoga-103",
              title: "Meditation: A Simple, Fast Way to Reduce Stress (Mayo Clinic)",
              format: "Link",
              url: "https://www.mayoclinic.org/tests-procedures/meditation/in-depth/meditation/art-20045858",
              readUrl: "https://www.mayoclinic.org/tests-procedures/meditation/in-depth/meditation/art-20045858",
              description: "Learn about meditation techniques, benefits, and how to get started.",
              source: "Mayo Clinic"
            },
            {
              id: "yoga-104",
              title: "Yoga for Mental Health (Harvard Health Publishing)",
              format: "Link",
              url: "https://www.health.harvard.edu/mind-and-mood/yoga-for-better-mental-health",
              readUrl: "https://www.health.harvard.edu/mind-and-mood/yoga-for-better-mental-health",
              description: "How yoga can help improve mental health and emotional well-being.",
              source: "Harvard Health Publishing"
            },
            {
              id: "yoga-105",
              title: "Meditation for Beginners (Headspace)",
              format: "Link",
              url: "https://www.headspace.com/meditation/meditation-for-beginners",
              readUrl: "https://www.headspace.com/meditation/meditation-for-beginners",
              description: "A beginner's guide to meditation, including tips and guided sessions.",
              source: "Headspace"
            },
          ],
          actions: [
            { label: "Browse Resources", type: "primary", action: "open_section" },
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
          title: "Basic Meditation & Yoga Poses",
          description:
            "Beginner-friendly yoga postures and meditation exercises to reduce stress and increase focus.",
          icon: "🧘",
          color: "green",
          type: "meditation",
          items: [
            {
              id: "m-201",
              title: "Mountain Pose (Tadasana)",
              duration: "2:00",
              kind: "Yoga Pose",
            },
            {
              id: "m-202",
              title: "Tree Pose (Vrikshasana)",
              duration: "2:30",
              kind: "Yoga Pose",
            },
            {
              id: "m-203",
              title: "Child's Pose (Balasana)",
              duration: "3:00",
              kind: "Yoga Pose",
            },
            {
              id: "m-204",
              title: "Lotus Pose (Padmasana)",
              duration: "4:00",
              kind: "Meditation",
            },
            {
              id: "m-205",
              title: "Seated Meditation",
              duration: "5:00",
              kind: "Meditation",
            },
            {
              id: "m-206",
              title: "Downward Dog (Adho Mukha Svanasana)",
              duration: "2:30",
              kind: "Yoga Pose",
            },
            {
              id: "m-207",
              title: "Warrior II (Virabhadrasana II)",
              duration: "3:00",
              kind: "Yoga Pose",
            },
            {
              id: "m-208",
              title: "Meditation in Nature",
              duration: "5:00",
              kind: "Meditation",
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

  const openSection = (section) => setSelected(section);
  const closeModal = () => {
    setSelected(null);
    setPdfToView(null);
    setPdfMeta(null);
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center relative text-white">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-20 -right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="absolute h-[96vh] w-[96vw] rr tt9 rrCenter flex flex-col justify-center items-center overflow-y-hidden">
        <div className="relative z-10 w-full h-full flex flex-col justify-center items-center px-4">
          {/* Header - Compact */}
          <header className="text-center mb-6 flex-shrink-0">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Mental Health Resources
            </h1>
            <p className="text-sm text-gray-300 max-w-xl mx-auto">
              Explore yoga, meditation, videos, and audio resources.
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
      {selected && (
        <SectionModal
          section={selected}
          onClose={closeModal}
          onPdfRead={(pdfUrl, meta) => {
            setPdfToView(pdfUrl);
            setPdfMeta(meta || null);
          }}
        />
      )}

      {/* PDF Viewer Modal */}
      {pdfToView && (
        <PdfViewerModal
          pdfUrl={pdfToView}
          onClose={() => {
            setPdfToView(null);
            setPdfMeta(null);
          }}
          meta={pdfMeta}
        />
      )}
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

// PDF Viewer Modal (in-app) - now with professional preview
const PdfViewerModal = ({ pdfUrl, onClose, meta }) => {
  // For links, just open in new tab, but keep modal for consistency
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[1000] p-4">
      <motion.div
        className="max-w-3xl w-full h-[60vh] bg-white rounded-lg overflow-hidden relative flex flex-col shadow-2xl"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Professional Article Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-500 to-purple-600">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📄</span>
            <div>
              <div className="text-lg font-bold text-white">
                {meta?.title || "Resource Preview"}
              </div>
              {meta?.source && (
                <div className="text-xs text-indigo-100 font-medium mt-0.5">
                  {meta.source}
                </div>
              )}
            </div>
          </div>
          <button
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
            onClick={onClose}
            title="Close"
          >
            <span className="text-2xl">×</span>
          </button>
        </div>
        {/* Article Description */}
        {meta?.description && (
          <div className="px-4 py-2 bg-indigo-50 border-b border-indigo-100 text-gray-700 text-sm">
            {meta.description}
          </div>
        )}
        {/* Resource Link Preview */}
        <div className="flex-1 bg-gray-100 flex flex-col items-center justify-center">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 underline text-lg font-semibold"
            style={{ wordBreak: "break-all" }}
          >
            Open Resource in New Tab
          </a>
        </div>
        {/* Download and Open in New Tab */}
        <div className="flex items-center justify-end gap-2 p-3 bg-gray-50 border-t border-gray-200">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition text-sm font-medium"
            style={{ minWidth: 100, textAlign: "center" }}
            title="Open in new tab"
          >
            Open in New Tab
          </a>
        </div>
      </motion.div>
    </div>
  );
};

const SectionModal = ({ section, onClose, onPdfRead }) => {
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
            <div className="flex gap-2 relative z-[100]">
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition"
                style={{ minWidth: 80, textAlign: "center" }}
                title="Open Resource"
                onClick={e => {
                  e.preventDefault();
                  if (onPdfRead) onPdfRead(f.readUrl, {
                    title: f.title,
                    description: f.description,
                    source: f.source,
                  });
                }}
              >
                View
              </a>
            </div>
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
    // Add slide scrolling for yoga/meditation images
    return wrap(
      <div className="space-y-6 relative z-[100] max-h-[60vh] overflow-y-auto pr-2">
        {/* Yoga and Meditation images with slide scrolling */}
        <div className="mb-4">
          <div className="text-white font-semibold mb-2 text-center">Yoga & Meditation Poses</div>
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
                <a href={img.src} target="_blank" rel="noopener noreferrer">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-28 h-28 object-contain rounded-lg mb-2 animate-pulse"
                    loading="lazy"
                    draggable={false}
                    style={{ background: "#222" }}
                  />
                </a>
                <span className="text-xs text-white font-medium">{img.label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Yoga and Meditation exercise list */}
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