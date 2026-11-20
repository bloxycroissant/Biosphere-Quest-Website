import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Official Biosphere Quest Assets
import logoImg from "../assets/BiosphereQuestAssets/Biosphere Quest Logo.png";
import astroImg from "../assets/BiosphereQuestAssets/Astro (Biosphere Quest Mascot).png";
import stellaImg from "../assets/BiosphereQuestAssets/Stella (Biosphere Quest Mascot).png";
import rocketGif from "../assets/BiosphereQuestAssets/Rocket.gif";
import blueCatGif from "../assets/BiosphereQuestAssets/Blue Cat.gif";
import gamesGif from "../assets/BiosphereQuestAssets/Games Icon.gif";
import scienceGif from "../assets/BiosphereQuestAssets/Science gif.gif";
import mathIcon from "../assets/BiosphereQuestAssets/Math Icon.png";
import badgeIcon from "../assets/BiosphereQuestAssets/Badge Icon.png";
import streakIcon from "../assets/BiosphereQuestAssets/Streak Icon.png";
import gradCapIcon from "../assets/BiosphereQuestAssets/Graduation cap.png";
import schoolIcon from "../assets/BiosphereQuestAssets/School icon.png";
import coursesIcon from "../assets/BiosphereQuestAssets/Courses Icon.png";
import parentsIcon from "../assets/BiosphereQuestAssets/Parents Icon.png";

// Official Welcome Sound Track
import welcomeMusic from "../assets/BiosphereQuestSoundEffectsandMusic/Welcome Screen (Official).mp3";

const ROLE_HIGHLIGHTS = {
  kids: {
    badge: "🚀 FOR EXPLORERS (GRADES 1–6)",
    icon: gamesGif,
    title: "Play Mini-Games, Earn XP & Unlock Cosmic Badges!",
    points: [
      { img: rocketGif, text: "Dive into bioluminescent Ocean Reefs & blast off to Deep Space with Astro & Stella!" },
      { img: gamesGif, text: "Play interactive Math & Science arcade challenges built for browser play." },
      { img: badgeIcon, text: "Level up your Explorer rank and climb the Weekly Champions board." },
    ],
  },
  teachers: {
    badge: "🍎 FOR EDUCATORS & CLASSROOMS",
    icon: schoolIcon,
    title: "Curriculum-Aligned Adventures That Boost Engagement",
    points: [
      { img: coursesIcon, text: "Structured Grade 1–6 modules covering Math & Environmental Science." },
      { img: scienceGif, text: "Bite-sized interactive labs & mini-games designed for active classroom recall." },
      { img: gradCapIcon, text: "Real-time XP, streak, and mastery milestones built into every quest." },
    ],
  },
  parents: {
    badge: "🛡️ FOR PARENTS & GUARDIANS",
    icon: parentsIcon,
    title: "Safe, Ad-Free Screen Time Kids Actually Love",
    points: [
      { img: parentsIcon, text: "100% kid-friendly, colorful, and distraction-free learning environment." },
      { img: streakIcon, text: "Builds daily study habits through positive streak and badge rewards." },
      { img: mathIcon, text: "Strengthens core elementary Math & Science confidence at home." },
    ],
  },
};

const TEASER_WORLDS = [
  {
    id: "ocean",
    img: scienceGif,
    zone: "DEPTH 01 • OCEAN BIOSPHERE",
    name: "Bioluminescent Coral Lab",
    desc: "Explore marine habitats, food webs, and counting quests beneath the waves.",
    accent: "#38bdf8",
    cardGradient: "linear-gradient(145deg, rgba(6, 78, 115, 0.85), rgba(15, 23, 42, 0.92))",
  },
  {
    id: "sky",
    img: mathIcon,
    zone: "DEPTH 02 • EARTH & SKY",
    name: "Math & Ecosystem Station",
    desc: "Balance rainforests, decode weather gauges, and master fractions.",
    accent: "#4ade80",
    cardGradient: "linear-gradient(145deg, rgba(16, 78, 68, 0.85), rgba(15, 23, 42, 0.92))",
  },
  {
    id: "space",
    img: gamesGif,
    zone: "DEPTH 03 • DEEP SPACE",
    name: "Cosmic Holo-Deck Arcade",
    desc: "Blast math meteors, solve logic vaults, and pilot Astro's starship.",
    accent: "#c084fc",
    cardGradient: "linear-gradient(145deg, rgba(67, 29, 122, 0.85), rgba(15, 23, 42, 0.92))",
  },
];

const SWIMMING_CREATURES = [
  { icon: "🪼", top: "68%", duration: 18, delay: 0, size: 30, reverse: false },
  { icon: "🐠", top: "78%", duration: 14, delay: 2, size: 26, reverse: true },
  { icon: "🐢", top: "85%", duration: 22, delay: 4, size: 32, reverse: false },
  { icon: "🦑", top: "73%", duration: 16, delay: 6, size: 28, reverse: true },
];

export default function SplashStarScreen({ onEnterApp, onStartWizard, onNavigate }) {
  const [activeRole, setActiveRole] = useState("kids");
  const [activeWorld, setActiveWorld] = useState(0);
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [clickBursts, setClickBursts] = useState([]);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const audioRef = useRef(null);

  // Initialize Audio Ref
  useEffect(() => {
    audioRef.current = new Audio(welcomeMusic);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlayingMusic(true);
    }
  };

  // 55 Twinkling Stars
  const stars = useMemo(
    () =>
      Array.from({ length: 55 }, (_, i) => ({
        id: i,
        left: `${(i * 31 + 7) % 100}%`,
        top: `${(i * 43 + 11) % 68}%`,
        size: (i % 3) + 2,
        duration: 1.6 + (i % 4) * 0.5,
        delay: (i % 6) * 0.3,
      })),
    []
  );

  // 22 Rising Bioluminescent Ocean Bubbles
  const bubbles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: `${(i * 17 + 4) % 96}%`,
        size: 6 + (i % 4) * 6,
        duration: 5.5 + (i % 5) * 1.4,
        delay: (i % 7) * 0.6,
        sway: i % 2 === 0 ? 18 : -18,
      })),
    []
  );

  // 50 Right-Diagonal Shooting Comets
  const shootingStars = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        top: `${(i * 7 + 3) % 45}%`,
        left: `${(i * 13 + 5) % 85}%`,
        delay: (i * 0.35) % 12,
        duration: 1.6 + (i % 5) * 0.35,
        angle: 35 + ((i * 7) % 20),
      })),
    []
  );

  const handleScreenClick = (e) => {
    const id = Date.now() + Math.random();
    const icons = ["✨", "🫧", "⭐", "💫", "🐚"];
    const burst = {
      id,
      x: e.clientX,
      y: e.clientY,
      particles: Array.from({ length: 6 }, (_, idx) => ({
        icon: icons[(idx + Math.floor(Math.random() * 5)) % icons.length],
        angle: idx * 60 * (Math.PI / 180),
        dist: 35 + Math.random() * 30,
      })),
    };
    setClickBursts((prev) => [...prev.slice(-6), burst]);
    setTimeout(() => {
      setClickBursts((prev) => prev.filter((b) => b.id !== id));
    }, 900);
  };

  const handleNotify = (e) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setJoined(true);
    setEmail("");
  };

  const handleStartWizardWithMusicStop = () => {
    if (audioRef.current) audioRef.current.pause();
    onStartWizard?.();
  };

  return (
    <div
      onClick={handleScreenClick}
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(180deg, #060818 0%, #191247 26%, #13255c 52%, #094566 78%, #06637a 100%)",
        color: "#ffffff",
        fontFamily: "'Nunito', 'Segoe UI', system-ui, sans-serif",
        padding: "28px 18px 80px",
        cursor: "crosshair",
      }}
    >
      {/* 🎵 Floating Cosmic Music Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.stopPropagation();
          toggleMusic();
        }}
        style={{
          position: "fixed",
          top: 24,
          right: 24,
          zIndex: 60,
          background: isPlayingMusic
            ? "linear-gradient(135deg, #22d3ee, #7c3aed)"
            : "rgba(15, 23, 42, 0.85)",
          border: "2px solid #63e1e8",
          borderRadius: 999,
          padding: "10px 18px",
          color: "#fff",
          fontWeight: 900,
          fontSize: 13,
          cursor: "pointer",
          boxShadow: isPlayingMusic ? "0 0 22px rgba(34, 211, 238, 0.7)" : "0 4px 14px rgba(0,0,0,0.3)",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <motion.span
          animate={isPlayingMusic ? { rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {isPlayingMusic ? "🎶" : "🔇"}
        </motion.span>
        {isPlayingMusic ? "Music: ON" : "Play Theme Music 🎵"}
      </motion.button>

      {/* 🌈 Animated Shifting Aurora & Bioluminescent Gradient Overlay */}
      <motion.div
        animate={{
          opacity: [0.35, 0.65, 0.35],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 18% 20%, rgba(139, 92, 246, 0.38) 0%, transparent 45%), radial-gradient(circle at 82% 32%, rgba(56, 189, 248, 0.32) 0%, transparent 48%), radial-gradient(circle at 50% 92%, rgba(20, 184, 166, 0.45) 0%, transparent 55%)",
          pointerEvents: "none",
        }}
      />

      {/* ✨ Interactive Click Stardust */}
      <AnimatePresence>
        {clickBursts.map((burst) => (
          <div
            key={burst.id}
            style={{
              position: "fixed",
              left: burst.x,
              top: burst.y,
              pointerEvents: "none",
              zIndex: 50,
            }}
          >
            {burst.particles.map((p, idx) => (
              <motion.span
                key={idx}
                initial={{ x: 0, y: 0, scale: 0.4, opacity: 1 }}
                animate={{
                  x: Math.cos(p.angle) * p.dist,
                  y: Math.sin(p.angle) * p.dist - 15,
                  scale: 1.2,
                  opacity: 0,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.75, ease: "easeOut" }}
                style={{ position: "absolute", fontSize: 16 }}
              >
                {p.icon}
              </motion.span>
            ))}
          </div>
        ))}
      </AnimatePresence>

      {/* 🌟 Twinkling Starfield */}
      {stars.map((star) => (
        <motion.span
          key={`star-${star.id}`}
          animate={{
            opacity: [0.15, 1, 0.15],
            scale: [0.7, 1.5, 0.7],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            borderRadius: "50%",
            backgroundColor:
              star.id % 3 === 0 ? "#63e1e8" : star.id % 5 === 0 ? "#ffdf4e" : "#ffffff",
            boxShadow: "0 0 10px rgba(99, 225, 232, 0.9)",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* 🌠 Shooting Comets */}
      {shootingStars.map((comet) => (
        <motion.div
          key={`comet-${comet.id}`}
          initial={{ x: -60, y: -60, opacity: 0 }}
          animate={{ x: 350, y: 350, opacity: [0, 1, 1, 0] }}
          transition={{
            duration: comet.duration,
            repeat: Infinity,
            repeatDelay: 4,
            delay: comet.delay,
            ease: "easeOut",
          }}
          style={{
            position: "absolute",
            top: comet.top,
            left: comet.left,
            width: 110,
            height: 3,
            background: "linear-gradient(90deg, #ffffff, #63e1e8, transparent)",
            borderRadius: 999,
            transform: `rotate(${comet.angle}deg)`,
            boxShadow: "0 0 14px #63e1e8",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: -4,
              top: -6,
              fontSize: 14,
              filter: "drop-shadow(0 0 8px #fff)",
            }}
          >
            🌠
          </span>
        </motion.div>
      ))}

      {/* 🌌 Pulsing Nebula */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], x: [0, 25, 0], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: -80,
          right: -60,
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: "radial-gradient(circle, #8b5cf6, transparent 70%)",
          filter: "blur(45px)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], x: [0, -25, 0], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          bottom: -80,
          left: -60,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, #22d3ee, transparent 70%)",
          filter: "blur(45px)",
          pointerEvents: "none",
        }}
      />

      {/* 🐠 Swimming Creatures */}
      {SWIMMING_CREATURES.map((creature, idx) => (
        <motion.div
          key={`creature-${idx}`}
          initial={{ x: creature.reverse ? "105vw" : "-10vw" }}
          animate={{
            x: creature.reverse ? "-10vw" : "105vw",
            y: [-10, 12, -10],
          }}
          transition={{
            x: {
              duration: creature.duration,
              repeat: Infinity,
              delay: creature.delay,
              ease: "linear",
            },
            y: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{
            position: "absolute",
            top: creature.top,
            fontSize: creature.size,
            filter: "drop-shadow(0 0 12px rgba(56, 189, 248, 0.7))",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          {creature.icon}
        </motion.div>
      ))}

      {/* 🫧 Bubbles */}
      {bubbles.map((b) => (
        <motion.span
          key={`bubble-${b.id}`}
          initial={{ y: "105vh", x: 0, opacity: 0 }}
          animate={{
            y: "-10vh",
            x: [0, b.sway, -b.sway, 0],
            opacity: [0, 0.65, 0.65, 0],
          }}
          transition={{
            y: { duration: b.duration, repeat: Infinity, delay: b.delay, ease: "linear" },
            x: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: b.duration, repeat: Infinity, delay: b.delay },
          }}
          style={{
            position: "absolute",
            left: b.left,
            width: b.size,
            height: b.size,
            borderRadius: "50%",
            border: "1.5px solid rgba(103, 232, 249, 0.65)",
            background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.5), transparent)",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Main Content Wrapper */}
      <div style={{ maxWidth: 920, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Animated Top Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          style={{ textAlign: "center", marginBottom: 18 }}
        >
          <motion.span
            animate={{
              boxShadow: [
                "0 0 12px rgba(99, 225, 232, 0.25)",
                "0 0 26px rgba(99, 225, 232, 0.65)",
                "0 0 12px rgba(99, 225, 232, 0.25)",
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 18px",
              borderRadius: 999,
              background: "linear-gradient(90deg, rgba(15, 23, 42, 0.85), rgba(30, 27, 75, 0.85))",
              border: "1px solid rgba(99, 225, 232, 0.55)",
              fontSize: 12,
              fontWeight: 900,
              letterSpacing: 0.7,
              color: "#63e1e8",
            }}
          >
            <img src={rocketGif} alt="Rocket" style={{ width: 20, height: 20, objectFit: "contain" }} />
            WEB EDITION • COMING SOON TO BROWSERS
          </motion.span>
        </motion.div>

        {/* Hero Stage */}
        <div style={{ textAlign: "center", position: "relative", margin: "10px 0 26px" }}>
          <div
            style={{
              position: "relative",
              maxWidth: 460,
              height: 220,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                width: 220,
                height: 220,
                borderRadius: "50%",
                border: "1.5px dotted rgba(192, 132, 252, 0.65)",
                pointerEvents: "none",
              }}
            >
              <img
                src={blueCatGif}
                alt="Blue Cat"
                style={{
                  position: "absolute",
                  top: -18,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 36,
                  height: 36,
                  objectFit: "contain",
                }}
              />
            </motion.div>

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                width: 175,
                height: 175,
                borderRadius: "50%",
                border: "2px dashed rgba(99, 225, 232, 0.55)",
                pointerEvents: "none",
              }}
            >
              <img
                src={rocketGif}
                alt="Orbiting Rocket"
                style={{
                  position: "absolute",
                  bottom: -18,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 36,
                  height: 36,
                  objectFit: "contain",
                }}
              />
            </motion.div>

            <motion.img
              src={astroImg}
              alt="Astro Mascot"
              animate={{ y: [8, -10, 8], rotate: [-6, 5, -6] }}
              transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.15, rotate: -12 }}
              style={{
                width: 105,
                height: 105,
                objectFit: "contain",
                zIndex: 3,
                filter: "drop-shadow(0 8px 18px rgba(56, 189, 248, 0.55))",
                cursor: "pointer",
              }}
            />

            <motion.img
              src={logoImg}
              alt="Biosphere Quest Logo"
              animate={{ y: [-6, 6, -6], scale: [1, 1.06, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.14, rotate: 3 }}
              style={{
                width: 145,
                height: 145,
                objectFit: "contain",
                zIndex: 4,
                margin: "0 6px",
                filter: "drop-shadow(0 0 26px rgba(99, 225, 232, 0.75))",
                cursor: "pointer",
              }}
            />

            <motion.img
              src={stellaImg}
              alt="Stella Mascot"
              animate={{ y: [-8, 10, -8], rotate: [6, -5, 6] }}
              transition={{ duration: 3.3, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.15, rotate: 12 }}
              style={{
                width: 105,
                height: 105,
                objectFit: "contain",
                zIndex: 3,
                filter: "drop-shadow(0 8px 18px rgba(168, 85, 247, 0.55))",
                cursor: "pointer",
              }}
            />
          </div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 240, damping: 16 }}
            style={{
              fontSize: "clamp(34px, 5.5vw, 56px)",
              fontWeight: 900,
              marginTop: 8,
              background: "linear-gradient(90deg, #63e1e8 0%, #c084fc 50%, #ffdf4e 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.15,
            }}
          >
            Biosphere Quest
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              maxWidth: 630,
              margin: "10px auto 0",
              fontSize: 16,
              color: "#e2e8f0",
              lineHeight: 1.6,
              fontWeight: 600,
            }}
          >
            From the deepest bioluminescent oceans to the farthest stars—an interactive{" "}
            <strong style={{ color: "#63e1e8" }}>Math & Science adventure</strong> built to inspire
            young explorers, empower teachers, and delight parents.
          </motion.p>
        </div>

        {/* Audience Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 220 }}
          style={{
            background: "linear-gradient(145deg, rgba(15, 23, 42, 0.8), rgba(23, 37, 84, 0.65))",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(99, 225, 232, 0.35)",
            borderRadius: 24,
            padding: "22px 20px",
            boxShadow: "0 18px 45px rgba(0, 0, 0, 0.45)",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 10,
              flexWrap: "wrap",
              marginBottom: 18,
            }}
          >
            {[
              { key: "kids", label: "Kids & Students", icon: gamesGif },
              { key: "teachers", label: "Teachers", icon: schoolIcon },
              { key: "parents", label: "Parents", icon: parentsIcon },
            ].map((tab) => {
              const isActive = activeRole === tab.key;
              return (
                <motion.button
                  key={tab.key}
                  whileHover={{ scale: 1.07, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setActiveRole(tab.key)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 18px",
                    borderRadius: 14,
                    border: isActive
                      ? "2px solid #63e1e8"
                      : "1px solid rgba(148, 163, 184, 0.25)",
                    background: isActive
                      ? "linear-gradient(135deg, #0284c7, #7c3aed)"
                      : "rgba(30, 41, 59, 0.65)",
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: 13,
                    cursor: "pointer",
                    boxShadow: isActive ? "0 0 18px rgba(99, 225, 232, 0.35)" : "none",
                  }}
                >
                  <img src={tab.icon} alt={tab.label} style={{ width: 22, height: 22, objectFit: "contain" }} />
                  {tab.label}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeRole}
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: 0.25 }}
              style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}
            >
              <span style={{ fontSize: 11, fontWeight: 900, color: "#ffdf4e", letterSpacing: 0.8 }}>
                {ROLE_HIGHLIGHTS[activeRole].badge}
              </span>
              <h2 style={{ fontSize: 21, fontWeight: 900, margin: "6px 0 14px" }}>
                {ROLE_HIGHLIGHTS[activeRole].title}
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  textAlign: "left",
                  background: "rgba(8, 13, 24, 0.55)",
                  padding: "14px 18px",
                  borderRadius: 16,
                }}
              >
                {ROLE_HIGHLIGHTS[activeRole].points.map((pt, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      fontSize: 14,
                      color: "#e2e8f0",
                      fontWeight: 600,
                    }}
                  >
                    <img
                      src={pt.img}
                      alt=""
                      style={{ width: 26, height: 26, objectFit: "contain", flexShrink: 0 }}
                    />
                    <span>{pt.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Teaser Worlds */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ marginBottom: 28 }}
        >
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <span style={{ fontSize: 11, fontWeight: 900, color: "#63e1e8", letterSpacing: 1 }}>
              🔭 INTERACTIVE WEBSITE SNEAK PEEK (CLICK A WORLD!)
            </span>
            <h3 style={{ fontSize: 20, fontWeight: 900, marginTop: 4 }}>
              Explore Two Worlds in One Cosmic Quest
            </h3>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 14,
            }}
          >
            {TEASER_WORLDS.map((world, idx) => {
              const selected = activeWorld === idx;
              return (
                <motion.div
                  key={world.id}
                  whileHover={{ y: -8, scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setActiveWorld(idx)}
                  style={{
                    background: selected
                      ? world.cardGradient
                      : "linear-gradient(145deg, rgba(15, 23, 42, 0.75), rgba(12, 34, 62, 0.65))",
                    border: `2px solid ${selected ? world.accent : "rgba(148, 163, 184, 0.25)"}`,
                    borderRadius: 20,
                    padding: 18,
                    cursor: "pointer",
                    boxShadow: selected ? `0 0 28px ${world.accent}55` : "none",
                  }}
                >
                  <motion.img
                    src={world.img}
                    alt={world.name}
                    animate={
                      selected
                        ? { rotate: [0, -10, 10, -6, 6, 0], scale: [1, 1.18, 1] }
                        : { y: [0, -4, 0] }
                    }
                    transition={{ duration: selected ? 0.7 : 2.5, repeat: selected ? 0 : Infinity }}
                    style={{ width: 48, height: 48, objectFit: "contain", marginBottom: 10 }}
                  />
                  <div style={{ fontSize: 10, fontWeight: 900, color: world.accent }}>
                    {world.zone}
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 900, marginTop: 4 }}>{world.name}</div>
                  <p style={{ fontSize: 12.5, color: "#cbd5e1", marginTop: 6, lineHeight: 1.5 }}>
                    {world.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom CTA & Navigation Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            background: "linear-gradient(135deg, rgba(14, 116, 144, 0.45), rgba(109, 40, 217, 0.42))",
            backdropFilter: "blur(12px)",
            border: "1.5px solid rgba(103, 232, 249, 0.55)",
            borderRadius: 22,
            padding: "24px 20px",
            textAlign: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <img src={blueCatGif} alt="Blue Cat" style={{ width: 32, height: 32, objectFit: "contain" }} />
            <h3 style={{ fontSize: 19, fontWeight: 900 }}>
              Be the First to Launch When We Go Live!
            </h3>
          </div>
          <p style={{ fontSize: 13, color: "#cbd5e1", margin: "6px 0 16px" }}>
            Click anywhere in space or ocean to spawn stardust, or join our early explorer list below!
          </p>

          {!joined ? (
            <form
              onSubmit={handleNotify}
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 10,
                flexWrap: "wrap",
                maxWidth: 460,
                margin: "0 auto",
              }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter parent, teacher, or explorer email..."
                style={{
                  flex: "1 1 240px",
                  padding: "12px 16px",
                  borderRadius: 14,
                  border: "1.5px solid #38bdf8",
                  background: "rgba(8, 13, 24, 0.85)",
                  color: "#fff",
                  fontSize: 13,
                  outline: "none",
                }}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.93 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "12px 22px",
                  borderRadius: 14,
                  border: "none",
                  background: "linear-gradient(90deg, #22d3ee, #818cf8, #c084fc)",
                  color: "#080d18",
                  fontWeight: 900,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                Notify Me
                <img src={rocketGif} alt="" style={{ width: 18, height: 18, objectFit: "contain" }} />
              </motion.button>
            </form>
          ) : (
            <motion.p
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ color: "#4ade80", fontWeight: 900, fontSize: 14 }}
            >
              🎉 You're on the Explorer Launch List! See you in orbit soon!
            </motion.p>
          )}

          {/* Action Navigation Button: Welcome Wizard */}
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginTop: 20 }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.94 }}
              onClick={handleStartWizardWithMusicStop}
              style={{
                background: "linear-gradient(90deg, #22d3ee, #818cf8)",
                border: "none",
                color: "#060818",
                padding: "12px 22px",
                borderRadius: 14,
                fontSize: 13.5,
                fontWeight: 900,
                cursor: "pointer",
                boxShadow: "0 0 22px rgba(34, 211, 238, 0.55)",
              }}
            >
              🚀 Start Welcome Wizard →
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}