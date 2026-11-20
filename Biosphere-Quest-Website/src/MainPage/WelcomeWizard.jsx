import { useState, useMemo } from "react";
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
import gradCapIcon from "../assets/BiosphereQuestAssets/Graduation cap.png";
import schoolIcon from "../assets/BiosphereQuestAssets/School icon.png";
import parentsIcon from "../assets/BiosphereQuestAssets/Parents Icon.png";

const ROLES = [
  {
    id: "student",
    label: "Student Explorer",
    sub: "Grades 1–6 Quests & Arcade",
    img: gamesGif,
    accent: "#38bdf8",
    gradient: "linear-gradient(145deg, rgba(2, 132, 199, 0.45), rgba(15, 23, 42, 0.9))",
  },
  {
    id: "teacher",
    label: "Teacher / Educator",
    sub: "Classroom Missions & Progress",
    img: schoolIcon,
    accent: "#4ade80",
    gradient: "linear-gradient(145deg, rgba(22, 163, 74, 0.4), rgba(15, 23, 42, 0.9))",
  },
  {
    id: "parent",
    label: "Parent / Guardian",
    sub: "Safe At-Home Discovery",
    img: parentsIcon,
    accent: "#c084fc",
    gradient: "linear-gradient(145deg, rgba(147, 51, 234, 0.45), rgba(15, 23, 42, 0.9))",
  },
];

const COMPANIONS = [
  {
    id: "astro",
    name: "Astro",
    title: "Cosmic Rocket Pilot",
    quote: "Ready to blast through Math meteors together?! 🚀",
    img: astroImg,
    accent: "#38bdf8",
  },
  {
    id: "stella",
    name: "Stella",
    title: "Bioluminescence Scientist",
    quote: "Let's dive deep and unlock ocean & space secrets! 🌊✨",
    img: stellaImg,
    accent: "#c084fc",
  },
  {
    id: "bluecat",
    name: "Nova Cat",
    title: "Zero-G Puzzle Genius",
    quote: "Meow! Let's collect every star badge in the galaxy! 🐾",
    img: blueCatGif,
    accent: "#ffdf4e",
  },
];

const WORLDS = [
  {
    id: "ocean",
    name: "Bioluminescent Ocean",
    desc: "Coral reefs, marine life & counting",
    img: scienceGif,
    accent: "#22d3ee",
  },
  {
    id: "math",
    name: "Number Nebula",
    desc: "Fast mental math & puzzle vaults",
    img: mathIcon,
    accent: "#ffdf4e",
  },
  {
    id: "arcade",
    name: "Holo-Deck Arcade",
    desc: "All mini-games & boss challenges",
    img: gamesGif,
    accent: "#a855f7",
  },
];

const QUICK_HIGHLIGHTS = [
  { title: "Math & Logic Quests", sub: "Interactive puzzles", img: mathIcon },
  { title: "Ocean & Space Labs", sub: "Ecosystem discovery", img: scienceGif },
  { title: "Holo-Deck Arcade", sub: "Mini-game challenges", img: gamesGif },
  { title: "Star & Reef Badges", sub: "XP & milestones", img: badgeIcon },
  { title: "Grades 1–6 Aligned", sub: "Adaptive difficulty", img: gradCapIcon },
  { title: "Instant Cloud Sync", sub: "Supabase progress", img: rocketGif },
];

const CORE_MODULES = [
  {
    badge: "CORE",
    title: "Number Nebula & Math Quests",
    desc: "Sharpen mental math, patterns, and problem-solving through space-themed challenges tailored to Grades 1–6.",
    img: mathIcon,
    accent: "#ffdf4e",
  },
  {
    badge: "SCIENCE",
    title: "Bioluminescent Ocean & Biosphere",
    desc: "Explore marine habitats, coral reefs, and earth science concepts with interactive visual companions.",
    img: scienceGif,
    accent: "#22d3ee",
  },
  {
    badge: "ACCOUNT",
    title: "Explorer Profile & Cloud Save",
    desc: "Sync your XP, unlocked badges, and quest progress seamlessly across sessions with Supabase Auth.",
    img: badgeIcon,
    accent: "#4ade80",
  },
  {
    badge: "ARCADE",
    title: "Holo-Deck Mini-Games",
    desc: "Jump into fast-paced arcade rounds and boss challenges that reward consistency and curiosity.",
    img: gamesGif,
    accent: "#c084fc",
  },
  {
    badge: "EDUCATORS",
    title: "Classroom & Guided Paths",
    desc: "Built to support independent learners, teachers guiding group activities, and parents at home.",
    img: schoolIcon,
    accent: "#38bdf8",
  },
  {
    badge: "COMPANIONS",
    title: "Astro, Stella & Nova Cat",
    desc: "Choose your co-pilot to guide you through missions, celebrate milestones, and keep every quest lively.",
    img: astroImg,
    accent: "#f472b6",
  },
];

const HOW_IT_WORKS_STEPS = [
  {
    stepNum: "STEP 01",
    title: "Pick Your Role",
    desc: "Choose whether you're joining as a Student Explorer, Teacher/Educator, or Parent/Guardian.",
  },
  {
    stepNum: "STEP 02",
    title: "Choose Co-Pilot & Name",
    desc: "Select Astro, Stella, or Nova Cat and set your explorer nickname to personalize your journey.",
  },
  {
    stepNum: "STEP 03",
    title: "Set Grade & Starting Zone",
    desc: "Pick your grade level (Grades 1–6) and launch into the Bioluminescent Ocean, Number Nebula, or Arcade.",
  },
  {
    stepNum: "STEP 04",
    title: "Earn XP & Unlock Badges",
    desc: "Complete quests, claim your +100 Starter XP, and build momentum one mission at a time.",
  },
];

const SWIMMING_CREATURES = [
  { icon: "🪼", top: "68%", duration: 18, delay: 0, size: 30, reverse: false },
  { icon: "🐠", top: "78%", duration: 14, delay: 2, size: 26, reverse: true },
  { icon: "🐢", top: "85%", duration: 22, delay: 4, size: 32, reverse: false },
  { icon: "🦑", top: "73%", duration: 16, delay: 6, size: 28, reverse: true },
];

export default function WelcomeWizard({ onComplete, onBackToSplash, onNavigate }) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const [role, setRole] = useState("student");
  const [explorerName, setExplorerName] = useState("");
  const [companion, setCompanion] = useState("astro");
  const [grade, setGrade] = useState(3);
  const [favoriteWorld, setFavoriteWorld] = useState("ocean");
  const [clickBursts, setClickBursts] = useState([]);

  const selectedCompanion = COMPANIONS.find((c) => c.id === companion) || COMPANIONS[0];
  const selectedWorld = WORLDS.find((w) => w.id === favoriteWorld) || WORLDS[0];

  // 55 Twinkling Stars (Matching SplashScreen)
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

  // 22 Rising Bioluminescent Ocean Bubbles (Matching SplashScreen)
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

  // 4 Shooting Comets (Matching SplashScreen)
  const shootingStars = useMemo(
    () => [
      { id: 1, top: "8%", left: "15%", delay: 1, duration: 2.2 },
      { id: 2, top: "18%", left: "55%", delay: 4.5, duration: 1.9 },
      { id: 3, top: "5%", left: "75%", delay: 8, duration: 2.4 },
      { id: 4, top: "26%", left: "30%", delay: 11.5, duration: 2.0 },
    ],
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

  const goNext = () => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, 3));
  };

  const goBack = () => {
    if (step === 0 && onBackToSplash) {
      onBackToSplash();
      return;
    }
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleFinish = () => {
    const profilePayload = {
      role,
      name: explorerName.trim() || "Space Explorer",
      companion,
      grade,
      favoriteWorld,
      starterXp: 100,
    };
    onComplete?.(profilePayload);
  };

  const stepVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 70 : -70,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? -70 : 70,
      opacity: 0,
      scale: 0.96,
    }),
  };

  const progressPercent = ((step + 1) / 4) * 100;

  return (
    <div
      onClick={handleScreenClick}
      style={{
        minHeight: "100vh",
        position: "relative",
        overflowX: "hidden",
        background:
          "linear-gradient(180deg, #060818 0%, #191247 26%, #13255c 52%, #094566 78%, #06637a 100%)",
        color: "#ffffff",
        fontFamily: "'Nunito', 'Segoe UI', system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "crosshair",
      }}
    >
      {/* 🌈 Animated Shifting Aurora & Bioluminescent Gradient Overlay */}
      <motion.div
        animate={{
          opacity: [0.35, 0.65, 0.35],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "fixed",
          inset: 0,
          background:
            "radial-gradient(circle at 18% 20%, rgba(139, 92, 246, 0.38) 0%, transparent 45%), radial-gradient(circle at 82% 32%, rgba(56, 189, 248, 0.32) 0%, transparent 48%), radial-gradient(circle at 50% 92%, rgba(20, 184, 166, 0.45) 0%, transparent 55%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* 🧭 Top Navigation Header Bar (Reference Layout + Biosphere Quest Theme) */}
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "14px 28px",
          background: "rgba(8, 13, 24, 0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(99, 225, 232, 0.25)",
          zIndex: 40,
          boxSizing: "border-box",
        }}
      >
        <div
          onClick={onBackToSplash}
          style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
        >
          <img src={logoImg} alt="Logo" style={{ width: 38, height: 38, objectFit: "contain" }} />
          <span
            style={{
              fontWeight: 900,
              fontSize: 16,
              background: "linear-gradient(90deg, #63e1e8, #c084fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Biosphere Quest
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 13, fontWeight: 800 }}>
          <a href="#modules" style={{ color: "#cbd5e1", textDecoration: "none" }}>
            Modules
          </a>
          <a href="#how-it-works" style={{ color: "#cbd5e1", textDecoration: "none" }}>
            How It Works
          </a>
          <a href="#launchpad" style={{ color: "#63e1e8", textDecoration: "none" }}>
            Launchpad
          </a>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {onNavigate && (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate("signup")}
                style={{
                  background: "rgba(15, 23, 42, 0.75)",
                  border: "1px solid rgba(99, 225, 232, 0.35)",
                  color: "#ffffff",
                  padding: "8px 18px",
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Sign Up
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate("login")}
                style={{
                  background: "linear-gradient(90deg, #22d3ee, #818cf8)",
                  border: "none",
                  color: "#080d18",
                  padding: "8px 20px",
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 900,
                  cursor: "pointer",
                  boxShadow: "0 0 16px rgba(34, 211, 238, 0.4)",
                }}
              >
                Log In
              </motion.button>
            </>
          )}
        </div>
      </div>

      {/* ✨ Interactive Click Stardust & Bubble Bursts */}
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
            position: "fixed",
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            borderRadius: "50%",
            backgroundColor:
              star.id % 3 === 0 ? "#63e1e8" : star.id % 5 === 0 ? "#ffdf4e" : "#ffffff",
            boxShadow: "0 0 10px rgba(99, 225, 232, 0.9)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      ))}

      {/* 🌠 Diagonal Shooting Stars */}
      {shootingStars.map((comet) => (
        <motion.div
          key={`comet-${comet.id}`}
          initial={{ x: -120, y: -60, opacity: 0 }}
          animate={{ x: 480, y: 240, opacity: [0, 1, 1, 0] }}
          transition={{
            duration: comet.duration,
            repeat: Infinity,
            repeatDelay: 7,
            delay: comet.delay,
            ease: "easeOut",
          }}
          style={{
            position: "fixed",
            top: comet.top,
            left: comet.left,
            width: 90,
            height: 2,
            background: "linear-gradient(90deg, transparent, #63e1e8, #ffffff)",
            borderRadius: 999,
            transform: "rotate(26deg)",
            boxShadow: "0 0 12px #63e1e8",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      ))}

      {/* 🌌 Pulsing Nebula & Bioluminescent Glows */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], x: [0, 25, 0], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "fixed",
          top: -80,
          right: -60,
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: "radial-gradient(circle, #8b5cf6, transparent 70%)",
          filter: "blur(45px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], x: [0, -25, 0], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "fixed",
          bottom: -80,
          left: -60,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, #22d3ee, transparent 70%)",
          filter: "blur(45px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* 🐠 Swimming Bioluminescent Ocean Creatures */}
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
            position: "fixed",
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

      {/* 🫧 Rising Ocean Bubbles */}
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
            position: "fixed",
            left: b.left,
            width: b.size,
            height: b.size,
            borderRadius: "50%",
            border: "1.5px solid rgba(103, 232, 249, 0.65)",
            background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.5), transparent)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      ))}

      {/* Main Content Container */}
      <div
        style={{
          width: "100%",
          maxWidth: 1120,
          padding: "36px 20px 48px",
          position: "relative",
          zIndex: 2,
          boxSizing: "border-box",
        }}
      >
        {/* 1. HERO SECTION (Reference Two-Column Hero + Splash Glass Aesthetic) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 28,
            alignItems: "center",
            marginBottom: 32,
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px",
                borderRadius: 999,
                background: "rgba(15, 23, 42, 0.8)",
                border: "1px solid rgba(99, 225, 232, 0.35)",
                fontSize: 12,
                fontWeight: 800,
                color: "#63e1e8",
                marginBottom: 16,
              }}
            >
              <img src={scienceGif} alt="" style={{ width: 18, height: 18, objectFit: "contain" }} />
              Cosmic & Ocean Interactive Quest Platform
            </div>

            <h1
              style={{
                fontSize: "clamp(34px, 5vw, 52px)",
                fontWeight: 900,
                lineHeight: 1.08,
                margin: 0,
                background: "linear-gradient(90deg, #ffffff 0%, #63e1e8 55%, #c084fc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Your quests, explored.
            </h1>

            <p
              style={{
                fontSize: 15,
                lineHeight: 1.6,
                color: "#cbd5e1",
                marginTop: 14,
                maxWidth: 520,
                fontWeight: 600,
              }}
            >
              Biosphere Quest blends cosmic space exploration with bioluminescent ocean discovery—helping young explorers build math, science, and problem-solving skills step by step.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 22 }}>
              <motion.a
                href="#launchpad"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  textDecoration: "none",
                  background: "linear-gradient(90deg, #22d3ee, #818cf8)",
                  color: "#080d18",
                  padding: "12px 24px",
                  borderRadius: 14,
                  fontSize: 14,
                  fontWeight: 900,
                  boxShadow: "0 0 22px rgba(34, 211, 238, 0.45)",
                }}
              >
                Start Mission Setup →
              </motion.a>
              {onBackToSplash && (
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={onBackToSplash}
                  style={{
                    background: "rgba(15, 23, 42, 0.8)",
                    border: "1px solid rgba(99, 225, 232, 0.35)",
                    color: "#e2e8f0",
                    padding: "12px 20px",
                    borderRadius: 14,
                    fontSize: 13.5,
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  ← Splash Screen
                </motion.button>
              )}
            </div>

            <div
              style={{
                display: "flex",
                gap: 28,
                marginTop: 28,
                paddingTop: 18,
                borderTop: "1px solid rgba(148, 163, 184, 0.2)",
              }}
            >
              <div>
                <div style={{ fontSize: 18, fontWeight: 900, color: "#63e1e8" }}>Grades 1–6</div>
                <div style={{ fontSize: 11.5, color: "#94a3b8", fontWeight: 700 }}>Adaptive Quest Tracks</div>
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 900, color: "#ffdf4e" }}>+100 XP</div>
                <div style={{ fontSize: 11.5, color: "#94a3b8", fontWeight: 700 }}>Explorer Starter Bonus</div>
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 900, color: "#c084fc" }}>3 Worlds</div>
                <div style={{ fontSize: 11.5, color: "#94a3b8", fontWeight: 700 }}>Ocean, Math & Arcade</div>
              </div>
            </div>
          </div>

          {/* Right Hero Preview Card (Live Explorer Snapshot) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            style={{
              background: "linear-gradient(145deg, rgba(15, 23, 42, 0.86), rgba(23, 37, 84, 0.72))",
              backdropFilter: "blur(16px)",
              border: "1.5px solid rgba(99, 225, 232, 0.35)",
              borderRadius: 24,
              padding: 20,
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.45)",
            }}
          >
            <div
              style={{
                background: "rgba(8, 13, 24, 0.75)",
                borderRadius: 18,
                padding: 18,
                border: "1px solid rgba(99, 225, 232, 0.2)",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <motion.img
                src={selectedCompanion.img}
                alt={selectedCompanion.name}
                animate={{ y: [-4, 5, -4] }}
                transition={{ duration: 2.6, repeat: Infinity }}
                style={{ width: 76, height: 76, objectFit: "contain" }}
              />
              <div>
                <div style={{ fontSize: 11, fontWeight: 900, color: "#63e1e8", letterSpacing: 0.6 }}>
                  ACTIVE CO-PILOT PREVIEW
                </div>
                <div style={{ fontSize: 20, fontWeight: 900, marginTop: 2 }}>
                  {explorerName.trim() || "Space Explorer"}
                </div>
                <div style={{ fontSize: 12.5, color: "#cbd5e1", marginTop: 2 }}>
                  {selectedCompanion.name} • Grade {grade} • {selectedWorld.name}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 10,
                marginTop: 14,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  background: "rgba(15, 23, 42, 0.75)",
                  borderRadius: 14,
                  padding: "10px 8px",
                  border: "1px solid rgba(148, 163, 184, 0.2)",
                }}
              >
                <div style={{ fontSize: 10.5, color: "#94a3b8", fontWeight: 800 }}>ROLE</div>
                <div style={{ fontSize: 13, fontWeight: 900, color: "#38bdf8", marginTop: 2 }}>
                  {role.toUpperCase()}
                </div>
              </div>
              <div
                style={{
                  background: "rgba(15, 23, 42, 0.75)",
                  borderRadius: 14,
                  padding: "10px 8px",
                  border: "1px solid rgba(148, 163, 184, 0.2)",
                }}
              >
                <div style={{ fontSize: 10.5, color: "#94a3b8", fontWeight: 800 }}>GRADE</div>
                <div style={{ fontSize: 13, fontWeight: 900, color: "#ffdf4e", marginTop: 2 }}>
                  Grade {grade}
                </div>
              </div>
              <div
                style={{
                  background: "rgba(15, 23, 42, 0.75)",
                  borderRadius: 14,
                  padding: "10px 8px",
                  border: "1px solid rgba(148, 163, 184, 0.2)",
                }}
              >
                <div style={{ fontSize: 10.5, color: "#94a3b8", fontWeight: 800 }}>STARTER XP</div>
                <div style={{ fontSize: 13, fontWeight: 900, color: "#4ade80", marginTop: 2 }}>
                  +100 XP
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 2. QUICK HIGHLIGHT STRIP (Reference Strip Layout) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 12,
            marginBottom: 44,
          }}
        >
          {QUICK_HIGHLIGHTS.map((item) => (
            <div
              key={item.title}
              style={{
                background: "rgba(15, 23, 42, 0.78)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(99, 225, 232, 0.24)",
                borderRadius: 16,
                padding: "12px 14px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <img src={item.img} alt={item.title} style={{ width: 28, height: 28, objectFit: "contain" }} />
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 900 }}>{item.title}</div>
                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* 3. INTERACTIVE LAUNCHPAD WIZARD (Preserved 4-Step Flow) */}
        <div
          id="launchpad"
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 56,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 26, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 230, damping: 20 }}
            style={{
              width: "100%",
              maxWidth: 680,
              background: "linear-gradient(145deg, rgba(15, 23, 42, 0.82), rgba(23, 37, 84, 0.68))",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(99, 225, 232, 0.35)",
              borderRadius: 28,
              padding: "26px 24px",
              boxShadow: "0 18px 45px rgba(0, 0, 0, 0.45)",
              position: "relative",
              zIndex: 2,
            }}
          >
            {/* Top Header + Animated Rocket Progress Bar */}
            <div style={{ marginBottom: 22 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <motion.img
                    src={logoImg}
                    alt="Logo"
                    animate={{ rotate: [0, 6, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    style={{ width: 38, height: 38, objectFit: "contain" }}
                  />
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 900, color: "#63e1e8", letterSpacing: 0.8 }}>
                      MISSION SETUP • STEP {step + 1} OF 4
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 900 }}>Biosphere Quest Launchpad</div>
                  </div>
                </div>

                <span
                  style={{
                    background: "rgba(255, 223, 78, 0.15)",
                    border: "1px solid rgba(255, 223, 78, 0.5)",
                    color: "#ffdf4e",
                    padding: "5px 12px",
                    borderRadius: 999,
                    fontSize: 11,
                    fontWeight: 900,
                  }}
                >
                  +100 Starter XP 🎁
                </span>
              </div>

              {/* Animated Progress Track with Flying Rocket */}
              <div
                style={{
                  position: "relative",
                  height: 10,
                  borderRadius: 999,
                  background: "rgba(15, 23, 42, 0.9)",
                  border: "1px solid rgba(99, 225, 232, 0.25)",
                }}
              >
                <motion.div
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ type: "spring", stiffness: 180, damping: 20 }}
                  style={{
                    height: "100%",
                    borderRadius: 999,
                    background: "linear-gradient(90deg, #22d3ee, #818cf8, #c084fc)",
                    boxShadow: "0 0 14px rgba(56, 189, 248, 0.75)",
                  }}
                />
                <motion.img
                  src={rocketGif}
                  alt="Progress Rocket"
                  animate={{ left: `calc(${progressPercent}% - 16px)` }}
                  transition={{ type: "spring", stiffness: 180, damping: 20 }}
                  style={{
                    position: "absolute",
                    top: -12,
                    width: 32,
                    height: 32,
                    objectFit: "contain",
                    transform: "rotate(45deg)",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>

            {/* Animated Step Content */}
            <div style={{ minHeight: 310, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <AnimatePresence mode="wait" custom={direction}>
                {/* STEP 0: ROLE SELECTION */}
                {step === 0 && (
                  <motion.div
                    key="step-0"
                    custom={direction}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <div style={{ textAlign: "center", marginBottom: 18 }}>
                      <h2 style={{ fontSize: 24, fontWeight: 900 }}>Who is embarking on this quest?</h2>
                      <p style={{ fontSize: 13.5, color: "#cbd5e1", marginTop: 4 }}>
                        Pick your role so we can customize your Cosmic Holo-Deck!
                      </p>
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                        gap: 12,
                      }}
                    >
                      {ROLES.map((item) => {
                        const selected = role === item.id;
                        return (
                          <motion.div
                            key={item.id}
                            whileHover={{ y: -6, scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setRole(item.id)}
                            style={{
                              background: selected ? item.gradient : "rgba(15, 23, 42, 0.65)",
                              border: `2px solid ${selected ? item.accent : "rgba(148, 163, 184, 0.22)"}`,
                              borderRadius: 20,
                              padding: "18px 14px",
                              textAlign: "center",
                              cursor: "pointer",
                              boxShadow: selected ? `0 0 24px ${item.accent}45` : "none",
                            }}
                          >
                            <motion.img
                              src={item.img}
                              alt={item.label}
                              animate={selected ? { y: [-3, 4, -3], scale: [1, 1.12, 1] } : {}}
                              transition={{ duration: 2, repeat: Infinity }}
                              style={{ width: 54, height: 54, objectFit: "contain", marginBottom: 10 }}
                            />
                            <div style={{ fontSize: 15, fontWeight: 900 }}>{item.label}</div>
                            <div style={{ fontSize: 11.5, color: "#cbd5e1", marginTop: 4 }}>{item.sub}</div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 1: COMPANION & NAME */}
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    custom={direction}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <div style={{ textAlign: "center", marginBottom: 16 }}>
                      <h2 style={{ fontSize: 23, fontWeight: 900 }}>Choose Your Co-Pilot & Codename!</h2>
                      <p style={{ fontSize: 13, color: "#cbd5e1", marginTop: 4 }}>
                        Pick a mascot buddy to cheer you on across Space & Ocean!
                      </p>
                    </div>

                    {/* Companion Cards */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: 10,
                        marginBottom: 16,
                      }}
                    >
                      {COMPANIONS.map((c) => {
                        const isSelected = companion === c.id;
                        return (
                          <motion.div
                            key={c.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.94 }}
                            onClick={() => setCompanion(c.id)}
                            style={{
                              background: isSelected
                                ? "linear-gradient(145deg, rgba(37, 99, 235, 0.35), rgba(124, 58, 237, 0.35))"
                                : "rgba(15, 23, 42, 0.65)",
                              border: `2px solid ${isSelected ? c.accent : "rgba(148, 163, 184, 0.2)"}`,
                              borderRadius: 18,
                              padding: "12px 8px",
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            <motion.img
                              src={c.img}
                              alt={c.name}
                              animate={isSelected ? { y: [-4, 5, -4], rotate: [-4, 4, -4] } : {}}
                              transition={{ duration: 2.2, repeat: Infinity }}
                              style={{ width: 64, height: 64, objectFit: "contain" }}
                            />
                            <div style={{ fontSize: 14, fontWeight: 900, marginTop: 4 }}>{c.name}</div>
                            <div style={{ fontSize: 10.5, color: c.accent, fontWeight: 800 }}>{c.title}</div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Live Mascot Speech Bubble */}
                    <motion.div
                      key={selectedCompanion.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        background: "rgba(8, 13, 24, 0.65)",
                        border: `1px solid ${selectedCompanion.accent}66`,
                        borderRadius: 14,
                        padding: "10px 14px",
                        textAlign: "center",
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#e2e8f0",
                        marginBottom: 14,
                      }}
                    >
                      💬 <strong>{selectedCompanion.name}:</strong> "{selectedCompanion.quote}"
                    </motion.div>

                    {/* Explorer Name Input */}
                    <div>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 800, color: "#63e1e8", marginBottom: 6 }}>
                        ✨ YOUR EXPLORER NICKNAME
                      </label>
                      <input
                        type="text"
                        value={explorerName}
                        onChange={(e) => setExplorerName(e.target.value)}
                        placeholder="e.g., Captain Denise, StarKid, AstroLeo..."
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          borderRadius: 14,
                          border: "1.5px solid #38bdf8",
                          background: "rgba(8, 13, 24, 0.85)",
                          color: "#fff",
                          fontSize: 14,
                          fontWeight: 700,
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: GRADE LEVEL & STARTING WORLD */}
                {step === 2 && (
                  <motion.div
                    key="step-2"
                    custom={direction}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <div style={{ textAlign: "center", marginBottom: 16 }}>
                      <h2 style={{ fontSize: 23, fontWeight: 900 }}>Set Your Grade & Starting Zone</h2>
                      <p style={{ fontSize: 13, color: "#cbd5e1", marginTop: 4 }}>
                        We'll tune Math & Science challenges to match your level!
                      </p>
                    </div>

                    {/* Grade 1-6 Pills */}
                    <div style={{ marginBottom: 18 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                        <img src={gradCapIcon} alt="" style={{ width: 20, height: 20 }} />
                        <span style={{ fontSize: 12, fontWeight: 900, color: "#ffdf4e" }}>
                          SELECT GRADE LEVEL (GRADES 1–6)
                        </span>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8 }}>
                        {[1, 2, 3, 4, 5, 6].map((g) => {
                          const active = grade === g;
                          return (
                            <motion.button
                              key={g}
                              whileHover={{ scale: 1.08 }}
                              whileTap={{ scale: 0.92 }}
                              onClick={() => setGrade(g)}
                              style={{
                                padding: "12px 4px",
                                borderRadius: 14,
                                border: active ? "2px solid #ffdf4e" : "1px solid rgba(148, 163, 184, 0.25)",
                                background: active
                                  ? "linear-gradient(135deg, #2563eb, #7c3aed)"
                                  : "rgba(15, 23, 42, 0.7)",
                                color: "#fff",
                                fontWeight: 900,
                                fontSize: 14,
                                cursor: "pointer",
                              }}
                            >
                              Gr. {g}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Starting World */}
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 900, color: "#63e1e8", marginBottom: 8 }}>
                        🌍 CHOOSE YOUR FIRST DESTINATION
                      </div>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                          gap: 10,
                        }}
                      >
                        {WORLDS.map((w) => {
                          const active = favoriteWorld === w.id;
                          return (
                            <motion.div
                              key={w.id}
                              whileHover={{ y: -4, scale: 1.02 }}
                              whileTap={{ scale: 0.96 }}
                              onClick={() => setFavoriteWorld(w.id)}
                              style={{
                                background: active ? "rgba(30, 41, 59, 0.95)" : "rgba(15, 23, 42, 0.65)",
                                border: `2px solid ${active ? w.accent : "rgba(148, 163, 184, 0.2)"}`,
                                borderRadius: 16,
                                padding: 12,
                                cursor: "pointer",
                                textAlign: "center",
                              }}
                            >
                              <img src={w.img} alt={w.name} style={{ width: 38, height: 38, objectFit: "contain" }} />
                              <div style={{ fontSize: 13.5, fontWeight: 900, marginTop: 6 }}>{w.name}</div>
                              <div style={{ fontSize: 11, color: "#cbd5e1", marginTop: 3 }}>{w.desc}</div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: EXPLORER PASSPORT & LAUNCH */}
                {step === 3 && (
                  <motion.div
                    key="step-3"
                    custom={direction}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35 }}
                    style={{ textAlign: "center" }}
                  >
                    <motion.div
                      initial={{ scale: 0.85, rotate: -2 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 16 }}
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(6, 182, 212, 0.28), rgba(124, 58, 237, 0.35))",
                        border: "2px solid #63e1e8",
                        borderRadius: 22,
                        padding: 20,
                        maxWidth: 460,
                        margin: "0 auto",
                        boxShadow: "0 0 32px rgba(99, 225, 232, 0.35)",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                        <span style={{ fontSize: 11, fontWeight: 900, color: "#ffdf4e" }}>
                          🪪 OFFICIAL BIOSPHERE PASS
                        </span>
                        <img src={badgeIcon} alt="Badge" style={{ width: 26, height: 26 }} />
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: 16, textAlign: "left" }}>
                        <motion.img
                          src={selectedCompanion.img}
                          alt={selectedCompanion.name}
                          animate={{ y: [-4, 5, -4] }}
                          transition={{ duration: 2.5, repeat: Infinity }}
                          style={{
                            width: 82,
                            height: 82,
                            objectFit: "contain",
                            background: "rgba(8, 13, 24, 0.6)",
                            borderRadius: 18,
                            padding: 6,
                            border: `1.5px solid ${selectedCompanion.accent}`,
                          }}
                        />
                        <div>
                          <div style={{ fontSize: 20, fontWeight: 900 }}>
                            {explorerName.trim() || "Space Explorer"}
                          </div>
                          <div style={{ fontSize: 12.5, color: "#63e1e8", fontWeight: 800 }}>
                            Grade {grade} • {role.toUpperCase()}
                          </div>
                          <div style={{ fontSize: 12, color: "#cbd5e1", marginTop: 4 }}>
                            Co-Pilot: <strong>{selectedCompanion.name}</strong>
                          </div>
                          <div style={{ fontSize: 12, color: "#4ade80", fontWeight: 800, marginTop: 2 }}>
                            🎁 Welcome Bonus: +100 XP Unlocked!
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <p style={{ fontSize: 13.5, color: "#e2e8f0", marginTop: 16, fontWeight: 600 }}>
                      Everything is calibrated! Hit the launch button below to enter the Holo-Deck!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Navigation Buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 22,
                paddingTop: 16,
                borderTop: "1px solid rgba(148, 163, 184, 0.2)",
              }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.94 }}
                onClick={goBack}
                style={{
                  background: "rgba(30, 41, 59, 0.75)",
                  border: "1px solid rgba(148, 163, 184, 0.35)",
                  color: "#e2e8f0",
                  padding: "11px 18px",
                  borderRadius: 14,
                  fontSize: 13,
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                {step === 0 ? "← Splash Screen" : "← Back"}
              </motion.button>

              {step < 3 ? (
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.93 }}
                  onClick={goNext}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "linear-gradient(90deg, #22d3ee, #818cf8)",
                    border: "none",
                    color: "#080d18",
                    padding: "12px 24px",
                    borderRadius: 14,
                    fontSize: 14,
                    fontWeight: 900,
                    cursor: "pointer",
                    boxShadow: "0 0 20px rgba(34, 211, 238, 0.45)",
                  }}
                >
                  Next Step →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={handleFinish}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "linear-gradient(90deg, #4ade80, #22d3ee, #c084fc)",
                    border: "none",
                    color: "#080d18",
                    padding: "13px 26px",
                    borderRadius: 14,
                    fontSize: 14.5,
                    fontWeight: 900,
                    cursor: "pointer",
                    boxShadow: "0 0 26px rgba(74, 222, 128, 0.55)",
                  }}
                >
                  Launch Biosphere Quest!
                  <img src={rocketGif} alt="" style={{ width: 20, height: 20, objectFit: "contain" }} />
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>

        {/* 4. CORE MODULES SECTION (Reference 3x2 Grid) */}
        <div id="modules" style={{ marginBottom: 56 }}>
          <div style={{ fontSize: 11, fontWeight: 900, color: "#63e1e8", letterSpacing: 1.2 }}>
            CORE MODULES
          </div>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 34px)", fontWeight: 900, margin: "6px 0 22px" }}>
            Everything you need for your quest
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
              gap: 16,
            }}
          >
            {CORE_MODULES.map((mod) => (
              <div
                key={mod.title}
                style={{
                  background: "rgba(15, 23, 42, 0.82)",
                  backdropFilter: "blur(14px)",
                  border: "1px solid rgba(99, 225, 232, 0.25)",
                  borderRadius: 20,
                  padding: 20,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <img src={mod.img} alt={mod.title} style={{ width: 36, height: 36, objectFit: "contain" }} />
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 900,
                      color: mod.accent,
                      background: "rgba(8, 13, 24, 0.75)",
                      border: `1px solid ${mod.accent}55`,
                      padding: "4px 10px",
                      borderRadius: 999,
                      letterSpacing: 0.6,
                    }}
                  >
                    {mod.badge}
                  </span>
                </div>
                <div style={{ fontSize: 16, fontWeight: 900, marginBottom: 6 }}>{mod.title}</div>
                <div style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.5 }}>{mod.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. HOW IT WORKS SECTION (Reference 4-Step Cards) */}
        <div id="how-it-works" style={{ marginBottom: 56 }}>
          <div style={{ fontSize: 11, fontWeight: 900, color: "#63e1e8", letterSpacing: 1.2 }}>
            HOW IT WORKS
          </div>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 34px)", fontWeight: 900, margin: "6px 0 22px" }}>
            Launch your adventure in 4 simple steps
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 16,
            }}
          >
            {HOW_IT_WORKS_STEPS.map((item) => (
              <div
                key={item.stepNum}
                style={{
                  background: "rgba(15, 23, 42, 0.82)",
                  backdropFilter: "blur(14px)",
                  border: "1px solid rgba(99, 225, 232, 0.25)",
                  borderRadius: 20,
                  padding: 20,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    fontSize: 10.5,
                    fontWeight: 900,
                    color: "#63e1e8",
                    background: "rgba(34, 211, 238, 0.14)",
                    padding: "4px 10px",
                    borderRadius: 8,
                    marginBottom: 12,
                  }}
                >
                  {item.stepNum}
                </span>
                <div style={{ fontSize: 16, fontWeight: 900, marginBottom: 6 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. BOTTOM CTA BANNER & FOOTER (Reference Banner + Footer Structure) */}
        <div
          style={{
            background: "linear-gradient(90deg, rgba(6, 182, 212, 0.35), rgba(124, 58, 237, 0.45))",
            backdropFilter: "blur(16px)",
            border: "1.5px solid rgba(99, 225, 232, 0.4)",
            borderRadius: 24,
            padding: "36px 24px",
            textAlign: "center",
            marginBottom: 28,
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 900, color: "#ffdf4e", letterSpacing: 1.2 }}>
            START TODAY
          </div>
          <h2 style={{ fontSize: "clamp(24px, 3.8vw, 36px)", fontWeight: 900, margin: "8px 0 10px" }}>
            Take charge of your cosmic & ocean quest
          </h2>
          <p style={{ fontSize: 14, color: "#e2e8f0", maxWidth: 560, margin: "0 auto 20px", lineHeight: 1.5 }}>
            Whether you are exploring solo, guiding a class, or learning together at home, your next mission is ready.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleFinish}
            style={{
              background: "#ffffff",
              color: "#080d18",
              border: "none",
              padding: "12px 26px",
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 900,
              cursor: "pointer",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.35)",
            }}
          >
            Launch Biosphere Quest →
          </motion.button>
        </div>

        <footer
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            paddingTop: 18,
            borderTop: "1px solid rgba(148, 163, 184, 0.22)",
            fontSize: 12,
            color: "#cbd5e1",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 900, color: "#63e1e8" }}>
            <img src={logoImg} alt="Logo" style={{ width: 26, height: 26, objectFit: "contain" }} />
            Biosphere Quest
          </div>
          <div style={{ textAlign: "right", color: "#94a3b8", fontWeight: 700 }}>
            <div>Biosphere Quest • Cosmic & Ocean Learning Platform</div>
            <div>Solo: Personal Project • Interactive Educational Experience</div>
          </div>
        </footer>
      </div>
    </div>
  );
}