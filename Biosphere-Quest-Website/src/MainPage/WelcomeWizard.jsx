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
    title: "Create Your Account",
    desc: "Sign up with email or Google OAuth and set up your explorer profile on the Sign Up page.",
  },
  {
    stepNum: "STEP 02",
    title: "Choose Co-Pilot & Name",
    desc: "Pick Astro, Stella, or Nova Cat and set your explorer nickname to personalize your journey.",
  },
  {
    stepNum: "STEP 03",
    title: "Set Grade & Starting Zone",
    desc: "Select your grade level (Grades 1–6) and dive into the Bioluminescent Ocean, Number Nebula, or Arcade.",
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
  const [clickBursts, setClickBursts] = useState([]);
  const [activeNavTarget, setActiveNavTarget] = useState("");
  const [navFlash, setNavFlash] = useState(null);

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

  const spawnBurstAt = (x, y, icons = ["✨", "🫧", "⭐", "💫", "🐚"]) => {
    const id = Date.now() + Math.random();
    const burst = {
      id,
      x,
      y,
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

  const handleScreenClick = (e) => {
    spawnBurstAt(e.clientX, e.clientY);
  };

  const handleAnimatedSectionJump = (e, sectionId, label) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    spawnBurstAt(rect.left + rect.width / 2, rect.top + rect.height / 2, ["🚀", "✨", "🌊", "⭐"]);
    setActiveNavTarget(sectionId);
    setNavFlash({ id: sectionId, label });

    const targetEl = document.getElementById(sectionId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    setTimeout(() => {
      setNavFlash(null);
    }, 1100);
  };

  const handleAnimatedRouteNav = (e, routeName) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    spawnBurstAt(rect.left + rect.width / 2, rect.top + rect.height / 2, ["🚀", "✨", "💫", "🌟"]);
    setTimeout(() => {
      onNavigate?.(routeName);
    }, 240);
  };

  const handleGetStarted = (e) => {
    e?.stopPropagation?.();
    if (e?.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      spawnBurstAt(rect.left + rect.width / 2, rect.top + rect.height / 2, ["🚀", "✨", "⭐", "🌊"]);
    }
    setTimeout(() => {
      if (onNavigate) {
        onNavigate("signup");
      } else {
        onComplete?.({ starterXp: 100 });
      }
    }, 240);
  };

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
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={(e) => {
            e.stopPropagation();
            const rect = e.currentTarget.getBoundingClientRect();
            spawnBurstAt(rect.left + rect.width / 2, rect.top + rect.height / 2, ["✨", "🌊", "🚀"]);
            onBackToSplash?.();
          }}
          style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
        >
          <motion.img
            src={logoImg}
            alt="Logo"
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 38, height: 38, objectFit: "contain" }}
          />
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
        </motion.div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 13, fontWeight: 800 }}>
          <motion.a
            href="#modules"
            onClick={(e) => handleAnimatedSectionJump(e, "modules", "🛸 Warping to Core Modules...")}
            whileHover={{ y: -2, scale: 1.06, color: "#ffffff" }}
            whileTap={{ scale: 0.9, rotate: -2 }}
            style={{
              color: activeNavTarget === "modules" ? "#63e1e8" : "#cbd5e1",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 10px",
              borderRadius: 10,
              background: activeNavTarget === "modules" ? "rgba(99, 225, 232, 0.14)" : "transparent",
              position: "relative",
            }}
          >
            <motion.img
              src={mathIcon}
              alt=""
              animate={activeNavTarget === "modules" ? { rotate: [0, 360] } : { rotate: [-4, 4, -4] }}
              transition={{ duration: activeNavTarget === "modules" ? 0.6 : 3, repeat: activeNavTarget === "modules" ? 0 : Infinity }}
              style={{ width: 16, height: 16, objectFit: "contain" }}
            />
            <span>Modules</span>
          </motion.a>

          <motion.a
            href="#how-it-works"
            onClick={(e) => handleAnimatedSectionJump(e, "how-it-works", "🧭 Charting 4-Step Mission Path...")}
            whileHover={{ y: -2, scale: 1.06, color: "#ffffff" }}
            whileTap={{ scale: 0.9, rotate: 2 }}
            style={{
              color: activeNavTarget === "how-it-works" ? "#63e1e8" : "#cbd5e1",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 10px",
              borderRadius: 10,
              background: activeNavTarget === "how-it-works" ? "rgba(99, 225, 232, 0.14)" : "transparent",
            }}
          >
            <motion.img
              src={scienceGif}
              alt=""
              animate={activeNavTarget === "how-it-works" ? { scale: [1, 1.35, 1] } : { y: [-1.5, 1.5, -1.5] }}
              transition={{ duration: activeNavTarget === "how-it-works" ? 0.5 : 2.6, repeat: activeNavTarget === "how-it-works" ? 0 : Infinity }}
              style={{ width: 16, height: 16, objectFit: "contain" }}
            />
            <span>How It Works</span>
          </motion.a>

          <motion.a
            href="#start-today"
            onClick={(e) => handleAnimatedSectionJump(e, "start-today", "🚀 Launching to Start Today...")}
            whileHover={{ y: -2, scale: 1.08, textShadow: "0 0 12px rgba(99, 225, 232, 0.8)" }}
            whileTap={{ scale: 0.88 }}
            style={{
              color: "#63e1e8",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 12px",
              borderRadius: 10,
              background: activeNavTarget === "start-today" ? "rgba(99, 225, 232, 0.2)" : "rgba(99, 225, 232, 0.08)",
              border: "1px solid rgba(99, 225, 232, 0.25)",
            }}
          >
            <motion.img
              src={rocketGif}
              alt=""
              animate={{ x: [-1, 2, -1], rotate: [10, 22, 10] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: 17, height: 17, objectFit: "contain" }}
            />
            <span>Get Started</span>
          </motion.a>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {onNavigate && (
            <>
              <motion.button
                whileHover={{ scale: 1.07, y: -2, boxShadow: "0 0 18px rgba(99, 225, 232, 0.35)" }}
                whileTap={{ scale: 0.9, rotate: -2 }}
                onClick={(e) => handleAnimatedRouteNav(e, "signup")}
                style={{
                  background: "rgba(15, 23, 42, 0.75)",
                  border: "1px solid rgba(99, 225, 232, 0.35)",
                  color: "#ffffff",
                  padding: "8px 18px",
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 800,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <motion.img
                  src={badgeIcon}
                  alt=""
                  animate={{ rotate: [-6, 6, -6] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  style={{ width: 15, height: 15, objectFit: "contain" }}
                />
                <span>Sign Up</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.07, y: -2, boxShadow: "0 0 24px rgba(34, 211, 238, 0.65)" }}
                whileTap={{ scale: 0.88, rotate: 2 }}
                onClick={(e) => handleAnimatedRouteNav(e, "login")}
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
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <motion.img
                  src={rocketGif}
                  alt=""
                  animate={{ scale: [1, 1.18, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                  style={{ width: 16, height: 16, objectFit: "contain" }}
                />
                <span>Log In</span>
              </motion.button>
            </>
          )}
        </div>

        {/* Animated Warp Toast when jumping to a section */}
        <AnimatePresence>
          {navFlash && (
            <motion.div
              key={navFlash.id}
              initial={{ opacity: 0, y: -12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.92 }}
              transition={{ duration: 0.25 }}
              style={{
                position: "absolute",
                top: "100%",
                left: "50%",
                transform: "translateX(-50%)",
                marginTop: 10,
                background: "rgba(15, 23, 42, 0.92)",
                border: "1px solid #63e1e8",
                color: "#63e1e8",
                padding: "6px 16px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 900,
                boxShadow: "0 0 20px rgba(99, 225, 232, 0.4)",
                pointerEvents: "none",
                whiteSpace: "nowrap",
              }}
            >
              {navFlash.label}
            </motion.div>
          )}
        </AnimatePresence>
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

      {/* 🚀 Ambient Floating Rocket & Blue Cat Sprites */}
      <motion.img
        src={rocketGif}
        alt="Ambient Rocket"
        animate={{
          y: [-10, 14, -10],
          x: [-6, 8, -6],
          rotate: [18, 28, 18],
        }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "fixed",
          top: "18%",
          right: "6%",
          width: 56,
          height: 56,
          objectFit: "contain",
          opacity: 0.72,
          filter: "drop-shadow(0 0 14px rgba(99, 225, 232, 0.6))",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <motion.img
        src={blueCatGif}
        alt="Ambient Nova Cat"
        animate={{
          y: [10, -12, 10],
          rotate: [-6, 6, -6],
        }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "fixed",
          bottom: "18%",
          left: "4%",
          width: 54,
          height: 54,
          objectFit: "contain",
          opacity: 0.75,
          filter: "drop-shadow(0 0 12px rgba(192, 132, 252, 0.6))",
          pointerEvents: "none",
          zIndex: 1,
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
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
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
            </motion.div>

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
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 28px rgba(34, 211, 238, 0.65)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGetStarted}
                style={{
                  background: "linear-gradient(90deg, #22d3ee, #818cf8)",
                  border: "none",
                  color: "#080d18",
                  padding: "12px 24px",
                  borderRadius: 14,
                  fontSize: 14,
                  fontWeight: 900,
                  cursor: "pointer",
                  boxShadow: "0 0 22px rgba(34, 211, 238, 0.45)",
                }}
              >
                Get Started on Sign Up →
              </motion.button>
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
          </motion.div>

          {/* Right Hero Preview Card (Animated Companion Showcase) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -4 }}
            style={{
              background: "linear-gradient(145deg, rgba(15, 23, 42, 0.86), rgba(23, 37, 84, 0.72))",
              backdropFilter: "blur(16px)",
              border: "1.5px solid rgba(99, 225, 232, 0.35)",
              borderRadius: 24,
              padding: 20,
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.45)",
              position: "relative",
              overflow: "hidden",
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
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <motion.img
                src={astroImg}
                alt="Astro"
                animate={{ y: [-5, 6, -5], rotate: [-4, 4, -4] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: 68, height: 68, objectFit: "contain" }}
              />
              <motion.img
                src={stellaImg}
                alt="Stella"
                animate={{ y: [6, -5, 6], rotate: [4, -4, 4] }}
                transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: 68, height: 68, objectFit: "contain" }}
              />
              <motion.img
                src={blueCatGif}
                alt="Nova Cat"
                animate={{ y: [-4, 5, -4], scale: [1, 1.06, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: 64, height: 64, objectFit: "contain" }}
              />
            </div>

            <div style={{ marginTop: 14, textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 900, color: "#63e1e8", letterSpacing: 0.8 }}>
                MEET YOUR QUEST COMPANIONS
              </div>
              <div style={{ fontSize: 16, fontWeight: 900, marginTop: 4 }}>
                Astro, Stella & Nova Cat
              </div>
              <p style={{ fontSize: 12.5, color: "#cbd5e1", marginTop: 4, lineHeight: 1.45 }}>
                Pick your co-pilot and customize your explorer profile right as you sign up.
              </p>
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
                <div style={{ fontSize: 10.5, color: "#94a3b8", fontWeight: 800 }}>EXPLORE</div>
                <div style={{ fontSize: 13, fontWeight: 900, color: "#38bdf8", marginTop: 2 }}>
                  Ocean Lab
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
                <div style={{ fontSize: 10.5, color: "#94a3b8", fontWeight: 800 }}>SOLVE</div>
                <div style={{ fontSize: 13, fontWeight: 900, color: "#ffdf4e", marginTop: 2 }}>
                  Math Quests
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

        {/* 2. QUICK HIGHLIGHT STRIP (Reference Strip Layout + Animated Hover) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 12,
            marginBottom: 48,
          }}
        >
          {QUICK_HIGHLIGHTS.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              whileHover={{ y: -5, scale: 1.03 }}
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
              <motion.img
                src={item.img}
                alt={item.title}
                animate={{ rotate: [-3, 3, -3] }}
                transition={{ duration: 3 + idx * 0.3, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: 28, height: 28, objectFit: "contain" }}
              />
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 900 }}>{item.title}</div>
                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>{item.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3. CORE MODULES SECTION (Reference 3x2 Grid + Animated Cards) */}
        <div
          id="modules"
          style={{
            marginBottom: 56,
            scrollMarginTop: 84,
            borderRadius: 24,
            padding: activeNavTarget === "modules" ? 12 : 0,
            boxShadow: activeNavTarget === "modules" ? "0 0 28px rgba(99, 225, 232, 0.22)" : "none",
            transition: "box-shadow 0.35s ease, padding 0.35s ease",
          }}
        >
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
            {CORE_MODULES.map((mod, idx) => (
              <motion.div
                key={mod.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                whileHover={{ y: -6, borderColor: mod.accent }}
                style={{
                  background: "rgba(15, 23, 42, 0.82)",
                  backdropFilter: "blur(14px)",
                  border: "1px solid rgba(99, 225, 232, 0.25)",
                  borderRadius: 20,
                  padding: 20,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <motion.img
                    src={mod.img}
                    alt={mod.title}
                    animate={{ y: [-2, 3, -2] }}
                    transition={{ duration: 2.8 + idx * 0.2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ width: 36, height: 36, objectFit: "contain" }}
                  />
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
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4. HOW IT WORKS SECTION (Reference 4-Step Cards + Animated Entrance) */}
        <div
          id="how-it-works"
          style={{
            marginBottom: 56,
            scrollMarginTop: 84,
            borderRadius: 24,
            padding: activeNavTarget === "how-it-works" ? 12 : 0,
            boxShadow: activeNavTarget === "how-it-works" ? "0 0 28px rgba(99, 225, 232, 0.22)" : "none",
            transition: "box-shadow 0.35s ease, padding 0.35s ease",
          }}
        >
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
            {HOW_IT_WORKS_STEPS.map((item, idx) => (
              <motion.div
                key={item.stepNum}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -5 }}
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
              </motion.div>
            ))}
          </div>
        </div>

        {/* 5. BOTTOM CTA BANNER & FOOTER (Reference Banner + Footer Structure) */}
        <motion.div
          id="start-today"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          style={{
            background: "linear-gradient(90deg, rgba(6, 182, 212, 0.35), rgba(124, 58, 237, 0.45))",
            backdropFilter: "blur(16px)",
            border: activeNavTarget === "start-today" ? "1.5px solid #ffdf4e" : "1.5px solid rgba(99, 225, 232, 0.4)",
            borderRadius: 24,
            padding: "36px 24px",
            textAlign: "center",
            marginBottom: 28,
            position: "relative",
            overflow: "hidden",
            scrollMarginTop: 84,
            boxShadow: activeNavTarget === "start-today" ? "0 0 32px rgba(255, 223, 78, 0.35)" : "none",
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
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGetStarted}
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
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            Start Sign Up & Setup →
            <img src={rocketGif} alt="" style={{ width: 20, height: 20, objectFit: "contain" }} />
          </motion.button>
        </motion.div>

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
            <div>Personalized Project-Based Interactive Educational Experience</div>
          </div>
        </footer>
      </div>
    </div>
  );
}