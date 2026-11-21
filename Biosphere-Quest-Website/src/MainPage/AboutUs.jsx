import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";

// Official Biosphere Quest Assets
import logoImg from "../assets/BiosphereQuestAssets/Biosphere Quest Logo.png";
import stellaImg from "../assets/BiosphereQuestAssets/Stella (Biosphere Quest Mascot).png";
import rocketGif from "../assets/BiosphereQuestAssets/Rocket.gif";
import gamesGif from "../assets/BiosphereQuestAssets/Games Icon.gif";
import badgeIcon from "../assets/BiosphereQuestAssets/Badge Icon.png";
import streakIcon from "../assets/BiosphereQuestAssets/Streak Icon.png";

const ABOUT_SWIMMING_CREATURES = [
  { icon: "🪼", top: "68%", duration: 18, delay: 0, size: 30, reverse: false },
  { icon: "🐠", top: "78%", duration: 14, delay: 2, size: 26, reverse: true },
  { icon: "🐢", top: "85%", duration: 22, delay: 4, size: 32, reverse: false },
  { icon: "🦑", top: "73%", duration: 16, delay: 6, size: 28, reverse: true },
];

const CORE_VALUES = [
  {
    id: "discovery",
    title: "Discovery",
    subtitle: "Curiosity-driven",
    detail: "Sparking wonder across oceans, forests, and star systems.",
    icon: "🧭",
    accent: "#38bdf8",
    glow: "rgba(56, 189, 248, 0.45)",
    gradient: "linear-gradient(155deg, rgba(14, 116, 144, 0.72), rgba(15, 23, 42, 0.92))",
  },
  {
    id: "integrity",
    title: "Integrity",
    subtitle: "Curriculum-aligned",
    detail: "Accurate math and science foundations built for learners.",
    icon: "🛡️",
    accent: "#4ade80",
    glow: "rgba(74, 222, 128, 0.42)",
    gradient: "linear-gradient(155deg, rgba(21, 128, 61, 0.68), rgba(15, 23, 42, 0.92))",
  },
  {
    id: "engagement",
    title: "Engagement",
    subtitle: "Gamified quests",
    detail: "XP milestones, streaks, and interactive challenges that keep learning lively.",
    img: gamesGif,
    accent: "#c084fc",
    glow: "rgba(192, 132, 252, 0.45)",
    gradient: "linear-gradient(155deg, rgba(107, 33, 168, 0.72), rgba(15, 23, 42, 0.92))",
  },
  {
    id: "accessibility",
    title: "Accessibility",
    subtitle: "Intuitive UI",
    detail: "Clear layouts, responsive controls, and welcoming visuals for every explorer.",
    img: badgeIcon,
    accent: "#ffdf4e",
    glow: "rgba(255, 223, 78, 0.42)",
    gradient: "linear-gradient(155deg, rgba(161, 98, 7, 0.68), rgba(15, 23, 42, 0.92))",
  },
];

const TEAM_MEMBERS = [
  {
    name: "Christianne Denise S. Sabando",
    tag: "CREATOR & LEAD DEVELOPER",
    description:
      "Denise is the owner and creator of the Biosphere Quest website and app, bringing together math, science, art, code, and interactive gameplay into one adventure.",
    roles: [
      "Project Owner & Creator",
      "UI/UX Designer & Lead Developer",
      "Curriculum & Content Designer",
      "Game Mechanics Designer",
      "Front-End Developer",
      "Back-End Developer",
      "Database & API Developer",
      "QA & Testing Lead",
      "Community & Support Lead",
      "Game Design & Art Lead",
      "Game Art & Animation Lead",
      "Game Sound & Music Lead",
      "Game Level Design Lead",
      "Full-Stack Web Developer",
    ],
    img: stellaImg,
    accent: "#ffdf4e",
    ring: "linear-gradient(135deg, #ffdf4e, #c084fc)",
    align: "left",
  },
];

const SUPPORT_CHANNELS = [
  {
    id: "email",
    label: "Support Email",
    value: "denisebiospherequest@gmail.com",
    href: "mailto:denisebiospherequest@gmail.com",
    icon: "📧",
    accent: "#63e1e8",
  },
  {
    id: "discord-server",
    label: "Official Discord Server",
    value: "https://discord.gg/MBRkkyFsPG",
    href: "https://discord.gg/MBRkkyFsPG",
    icon: "🌐",
    accent: "#c084fc",
  },
  {
    id: "discord-user",
    label: "My Discord Account",
    value: "bloxycroissant",
    icon: "💬",
    accent: "#ffdf4e",
  },
];

export default function AboutUs({
  onNavigate,
  onBack,
  onOpenLegal,
  playSfx,
}) {
  const [selectedValue, setSelectedValue] = useState("discovery");
  const [statusNote, setStatusNote] = useState("");
  const [showSupportAccounts, setShowSupportAccounts] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [activeModal, setActiveModal] = useState(null); // "privacy" | "terms" | null
  const [clickBursts, setClickBursts] = useState([]);

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

  const handleBack = () => {
    playSfx?.("click");
    if (onBack) {
      onBack();
    } else if (onNavigate) {
      onNavigate("splash");
    }
  };

  const handleContactSupport = async () => {
    playSfx?.("click");
    setStatusNote("");
    try {
      await supabase.auth.getSession();
    } catch {
      // Ignore session check errors when displaying support info
    }
    setShowSupportAccounts((prev) => !prev);
  };

  const handleCopySupport = async (id, text) => {
    playSfx?.("correct");
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      // Fallback if clipboard permissions are restricted
    }
  };

  const handleRateWebsite = () => {
    playSfx?.("correct");
    setShowSupportAccounts(false);
    setStatusNote(
      "Thanks for exploring the Biosphere Quest website! Enjoy playing our web quests and mini-games right in your browser."
    );
  };

  const handleLegalClick = (docType) => {
    playSfx?.("click");
    if (onOpenLegal) {
      onOpenLegal(docType);
    } else {
      setActiveModal(docType);
    }
  };

  const activeValueObj = CORE_VALUES.find((v) => v.id === selectedValue);

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
        padding: "28px 18px 84px",
        cursor: "crosshair",
      }}
    >
      {/* Animated Shifting Aurora & Bioluminescent Gradient Overlay */}
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

      {/* Interactive Click Stardust */}
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

      {/* Twinkling Starfield */}
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

      {/* Shooting Comets */}
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

      {/* Pulsing Nebulae */}
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

      {/* Swimming Creatures */}
      {ABOUT_SWIMMING_CREATURES.map((creature, idx) => (
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

      {/* Rising Bubbles */}
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

      {/* Foreground Content Container */}
      <div style={{ maxWidth: 880, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Top Bar with Cancel & Mission Pill */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 20 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 18,
          }}
        >
          <motion.button
            type="button"
            whileHover={{ scale: 1.05, x: -2, boxShadow: "0 0 20px rgba(99, 225, 232, 0.35)" }}
            whileTap={{ scale: 0.94 }}
            onClick={(e) => {
              e.stopPropagation();
              handleBack();
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "linear-gradient(135deg, rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.8))",
              backdropFilter: "blur(14px)",
              border: "1.5px solid rgba(99, 225, 232, 0.5)",
              color: "#ffffff",
              fontWeight: 900,
              fontSize: 14,
              padding: "9px 18px",
              borderRadius: 999,
              cursor: "pointer",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.35)",
            }}
          >
            <span>←</span>
            <span>Cancel</span>
          </motion.button>

          <motion.div
            animate={{ boxShadow: ["0 0 12px rgba(99,225,232,0.2)", "0 0 24px rgba(192,132,252,0.38)", "0 0 12px rgba(99,225,232,0.2)"] }}
            transition={{ duration: 3.5, repeat: Infinity }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              borderRadius: 999,
              background: "rgba(15, 23, 42, 0.72)",
              border: "1px solid rgba(99, 225, 232, 0.35)",
              fontSize: 11.5,
              fontWeight: 800,
              letterSpacing: 0.6,
              color: "#63e1e8",
              textTransform: "uppercase",
            }}
          >
            <span>✦</span>
            <span>Interactive Math & Science Web Quest</span>
          </motion.div>
        </motion.div>

        {/* Hero Title, Orbital Emblem & Mission Card */}
        <div style={{ textAlign: "center", marginBottom: 34 }}>
          <motion.h1
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            style={{
              fontSize: "clamp(30px, 5vw, 46px)",
              fontWeight: 900,
              margin: "0 0 18px",
              letterSpacing: -0.5,
              background: "linear-gradient(90deg, #63e1e8 0%, #c084fc 52%, #ffdf4e 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 6px 20px rgba(99, 225, 232, 0.25))",
            }}
          >
            About Us
          </motion.h1>

          {/* Animated Orbital Rings + Floating Logo */}
          <div
            style={{
              position: "relative",
              width: 176,
              height: 176,
              margin: "0 auto 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                inset: 6,
                borderRadius: "50%",
                border: "1.5px dashed rgba(99, 225, 232, 0.55)",
                pointerEvents: "none",
              }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                inset: 18,
                borderRadius: "50%",
                border: "1px solid rgba(192, 132, 252, 0.45)",
                pointerEvents: "none",
              }}
            />
            <motion.img
              src={logoImg}
              alt="Biosphere Quest Logo"
              animate={{ y: [-6, 6, -6], scale: [1, 1.04, 1] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.12, rotate: 5 }}
              style={{
                width: 118,
                height: 118,
                objectFit: "contain",
                position: "relative",
                zIndex: 2,
                filter: "drop-shadow(0 0 26px rgba(99, 225, 232, 0.8))",
                cursor: "pointer",
              }}
            />
          </div>

          {/* Glowing Glass Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14, type: "spring", stiffness: 200 }}
            whileHover={{ y: -3, borderColor: "rgba(99, 225, 232, 0.75)" }}
            style={{
              position: "relative",
              overflow: "hidden",
              background:
                "linear-gradient(145deg, rgba(29, 44, 118, 0.84), rgba(15, 23, 42, 0.9))",
              backdropFilter: "blur(18px)",
              border: "1.5px solid rgba(99, 225, 232, 0.45)",
              borderRadius: 24,
              padding: "24px 26px",
              boxShadow:
                "0 20px 45px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.14)",
              textAlign: "left",
            }}
          >
            {/* Subtle Shimmer Sweep */}
            <motion.div
              animate={{ x: ["-120%", "220%"] }}
              transition={{ duration: 5.5, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                width: "45%",
                background:
                  "linear-gradient(90deg, transparent, rgba(99, 225, 232, 0.1), transparent)",
                transform: "skewX(-20deg)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 11.5,
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: 1,
                color: "#63e1e8",
                marginBottom: 8,
              }}
            >
              <span>🛰️</span>
              <span>Our Mission</span>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(15px, 2vw, 18px)",
                lineHeight: 1.65,
                fontWeight: 800,
                color: "#f8fafc",
              }}
            >
              Biosphere Quest turns complex math and science education into an interactive web
              adventure, empowering students to explore ecosystems and master concepts through
              playful quests from deep oceans to outer space right in their browser.
            </p>
          </motion.div>
        </div>

        {/* Core Values Section */}
        <motion.section
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24 }}
          style={{ marginBottom: 36 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 16,
            }}
          >
            <h2
              style={{
                fontSize: "clamp(22px, 3.4vw, 30px)",
                fontWeight: 900,
                margin: 0,
                color: "#ffffff",
              }}
            >
              Core Values
            </h2>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: "#94a3b8" }}>
              Tap a value to inspect its focus
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(185px, 1fr))",
              gap: 16,
            }}
          >
            {CORE_VALUES.map((val, idx) => {
              const isSelected = selectedValue === val.id;
              return (
                <motion.button
                  key={val.id}
                  type="button"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28 + idx * 0.06, type: "spring", stiffness: 220 }}
                  whileHover={{ y: -8, scale: 1.035 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedValue(val.id);
                    playSfx?.("click");
                  }}
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    background: isSelected
                      ? val.gradient
                      : "linear-gradient(155deg, rgba(24, 38, 98, 0.76), rgba(15, 23, 42, 0.88))",
                    backdropFilter: "blur(16px)",
                    border: `1.5px solid ${isSelected ? val.accent : "rgba(99, 225, 232, 0.32)"}`,
                    borderRadius: 20,
                    padding: "20px 15px",
                    color: "#ffffff",
                    textAlign: "center",
                    cursor: "pointer",
                    boxShadow: isSelected
                      ? `0 14px 32px ${val.glow}, inset 0 1px 0 rgba(255,255,255,0.18)`
                      : "0 12px 26px rgba(0, 0, 0, 0.36)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  {/* Top Accent Bar */}
                  <span
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "20%",
                      right: "20%",
                      height: 3,
                      borderRadius: 999,
                      background: isSelected ? val.accent : "transparent",
                      boxShadow: isSelected ? `0 0 12px ${val.accent}` : "none",
                    }}
                  />

                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 16,
                      background: "rgba(8, 13, 24, 0.55)",
                      border: `1px solid ${isSelected ? val.accent : "rgba(148, 163, 184, 0.2)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 2,
                    }}
                  >
                    {val.img ? (
                      <motion.img
                        src={val.img}
                        alt={val.title}
                        animate={isSelected ? { scale: [1, 1.16, 1] } : { y: [0, -3, 0] }}
                        transition={{ duration: 2.4, repeat: Infinity }}
                        style={{ width: 38, height: 38, objectFit: "contain" }}
                      />
                    ) : (
                      <motion.span
                        animate={isSelected ? { rotate: [-7, 7, -7], scale: [1, 1.15, 1] } : {}}
                        transition={{ duration: 2.2, repeat: Infinity }}
                        style={{ fontSize: 30, lineHeight: 1 }}
                      >
                        {val.icon}
                      </motion.span>
                    )}
                  </div>

                  <div style={{ fontSize: 16.5, fontWeight: 900 }}>{val.title}</div>
                  <div style={{ fontSize: 12.5, fontWeight: 800, color: val.accent }}>
                    {val.subtitle}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Selected Core Value Spotlight Bar */}
          <AnimatePresence mode="wait">
            {activeValueObj && (
              <motion.div
                key={activeValueObj.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                style={{
                  marginTop: 14,
                  padding: "12px 18px",
                  borderRadius: 16,
                  background: "rgba(8, 13, 24, 0.72)",
                  border: `1px solid ${activeValueObj.accent}66`,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 13.5,
                  fontWeight: 700,
                  color: "#e2e8f0",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: activeValueObj.accent,
                    boxShadow: `0 0 10px ${activeValueObj.accent}`,
                    flexShrink: 0,
                  }}
                />
                <span>
                  <strong style={{ color: activeValueObj.accent }}>{activeValueObj.title}:</strong>{" "}
                  {activeValueObj.detail}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Creator Section */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34 }}
          style={{ marginBottom: 34 }}
        >
          <h2
            style={{
              fontSize: "clamp(22px, 3.4vw, 30px)",
              fontWeight: 900,
              margin: "0 0 16px",
              color: "#ffffff",
            }}
          >
            Meet the Team
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {TEAM_MEMBERS.map((member, idx) => {
              const isRightAligned = member.align === "right";
              return (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, x: isRightAligned ? 26 : -26 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.38 + idx * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ y: -4, scale: 1.015, borderColor: `${member.accent}99` }}
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: isRightAligned ? "row-reverse" : "row",
                    gap: 20,
                    flexWrap: "wrap",
                    background:
                      "linear-gradient(145deg, rgba(15, 23, 42, 0.84), rgba(23, 37, 84, 0.74))",
                    backdropFilter: "blur(16px)",
                    border: "1.5px solid rgba(99, 225, 232, 0.35)",
                    borderRadius: 22,
                    padding: "20px 24px",
                    boxShadow:
                      "0 16px 34px rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
                  }}
                >
                  {/* Mascot Avatar Frame */}
                  <div
                    style={{
                      position: "relative",
                      width: 108,
                      height: 108,
                      borderRadius: 24,
                      padding: 2,
                      background: member.ring,
                      flexShrink: 0,
                      boxShadow: `0 10px 24px ${member.accent}33`,
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 22,
                        background: "rgba(8, 13, 24, 0.88)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <motion.img
                        src={member.img}
                        alt={member.name}
                        animate={{
                          y: [-4, 4, -4],
                          rotate: isRightAligned ? [3, -3, 3] : [-3, 3, -3],
                        }}
                        transition={{
                          duration: 3.2 + idx * 0.4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        whileHover={{ scale: 1.12 }}
                        style={{
                          width: 90,
                          height: 90,
                          objectFit: "contain",
                          filter: `drop-shadow(0 6px 14px ${member.accent}66)`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Creator Details */}
                  <div
                    style={{
                      flex: "1 1 280px",
                      textAlign: isRightAligned ? "right" : "left",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        fontSize: 10.5,
                        fontWeight: 900,
                        letterSpacing: 1,
                        padding: "3px 10px",
                        borderRadius: 999,
                        background: `${member.accent}22`,
                        border: `1px solid ${member.accent}66`,
                        color: member.accent,
                        marginBottom: 8,
                      }}
                    >
                      {member.tag}
                    </span>

                    <div
                      style={{
                        fontSize: "clamp(20px, 3vw, 26px)",
                        fontWeight: 900,
                        color: "#ffffff",
                        lineHeight: 1.2,
                      }}
                    >
                      {member.name}
                    </div>

                    {member.description && (
                      <p
                        style={{
                          margin: "8px 0 0",
                          fontSize: 13.5,
                          fontWeight: 700,
                          color: "#cbd5e1",
                          lineHeight: 1.55,
                        }}
                      >
                        {member.description}
                      </p>
                    )}

                    <div
                      style={{
                        marginTop: 10,
                        fontSize: 14,
                        fontWeight: 800,
                        color: "#e2e8f0",
                        lineHeight: 1.5,
                      }}
                    >
                      {member.roles.join(" • ")}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Action Buttons & Legal Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.46 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
          }}
        >
          <motion.button
            type="button"
            whileHover={{
              scale: 1.02,
              y: -3,
              boxShadow: "0 14px 32px rgba(99, 225, 232, 0.28)",
            }}
            whileTap={{ scale: 0.97 }}
            onClick={(e) => {
              e.stopPropagation();
              handleContactSupport();
            }}
            style={{
              width: "100%",
              maxWidth: 640,
              padding: "17px 26px",
              borderRadius: 18,
              background:
                "linear-gradient(135deg, rgba(37, 54, 128, 0.9), rgba(23, 37, 84, 0.94))",
              border: "1.5px solid rgba(99, 225, 232, 0.5)",
              color: "#ffffff",
              fontSize: 18,
              fontWeight: 900,
              cursor: "pointer",
              boxShadow:
                "0 12px 28px rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.14)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <img src={rocketGif} alt="" style={{ width: 24, height: 24, objectFit: "contain" }} />
            <span>Contact Support</span>
          </motion.button>

          {/* Expandable Support & Community Accounts Card */}
          <AnimatePresence>
            {showSupportAccounts && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  maxWidth: 640,
                  width: "100%",
                  background: "rgba(8, 13, 24, 0.9)",
                  backdropFilter: "blur(16px)",
                  border: "1.5px solid rgba(99, 225, 232, 0.55)",
                  borderRadius: 20,
                  padding: "18px 20px",
                  boxShadow: "0 16px 36px rgba(0, 0, 0, 0.45)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 900,
                    letterSpacing: 0.8,
                    textTransform: "uppercase",
                    color: "#63e1e8",
                    marginBottom: 2,
                  }}
                >
                  🛰️ Official Support & Community Accounts
                </div>

                {SUPPORT_CHANNELS.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 10,
                      padding: "10px 14px",
                      borderRadius: 14,
                      background: "rgba(15, 23, 42, 0.85)",
                      border: `1px solid ${item.accent}44`,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                      <span style={{ fontSize: 18 }}>{item.icon}</span>
                      <div style={{ textAlign: "left" }}>
                        <div style={{ fontSize: 11.5, fontWeight: 800, color: "#94a3b8" }}>
                          {item.label}
                        </div>
                        {item.href ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontSize: 13.5,
                              fontWeight: 900,
                              color: item.accent,
                              textDecoration: "underline",
                              wordBreak: "break-all",
                            }}
                          >
                            {item.value}
                          </a>
                        ) : (
                          <div
                            style={{
                              fontSize: 13.5,
                              fontWeight: 900,
                              color: item.accent,
                            }}
                          >
                            {item.value}
                          </div>
                        )}
                      </div>
                    </div>

                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={() => handleCopySupport(item.id, item.value)}
                      style={{
                        background: "rgba(30, 41, 59, 0.9)",
                        border: `1px solid ${item.accent}66`,
                        color: "#ffffff",
                        fontWeight: 800,
                        fontSize: 11.5,
                        padding: "6px 12px",
                        borderRadius: 10,
                        cursor: "pointer",
                      }}
                    >
                      {copiedId === item.id ? "Copied ✓" : "Copy"}
                    </motion.button>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="button"
            whileHover={{
              scale: 1.02,
              y: -3,
              boxShadow: "0 14px 32px rgba(255, 223, 78, 0.24)",
            }}
            whileTap={{ scale: 0.97 }}
            onClick={(e) => {
              e.stopPropagation();
              handleRateWebsite();
            }}
            style={{
              width: "100%",
              maxWidth: 640,
              padding: "17px 26px",
              borderRadius: 18,
              background:
                "linear-gradient(135deg, rgba(37, 54, 128, 0.9), rgba(23, 37, 84, 0.94))",
              border: "1.5px solid rgba(99, 225, 232, 0.5)",
              color: "#ffffff",
              fontSize: 18,
              fontWeight: 900,
              cursor: "pointer",
              boxShadow:
                "0 12px 28px rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.14)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <img src={streakIcon} alt="" style={{ width: 24, height: 24, objectFit: "contain" }} />
            <span>Rate This Website</span>
          </motion.button>

          <AnimatePresence>
            {statusNote && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                style={{
                  maxWidth: 640,
                  width: "100%",
                  background: "rgba(8, 13, 24, 0.88)",
                  backdropFilter: "blur(14px)",
                  border: "1.5px solid rgba(99, 225, 232, 0.6)",
                  color: "#63e1e8",
                  borderRadius: 16,
                  padding: "13px 18px",
                  fontSize: 13.5,
                  fontWeight: 800,
                  textAlign: "center",
                  boxShadow: "0 10px 24px rgba(0, 0, 0, 0.35)",
                }}
              >
                {statusNote}
              </motion.div>
            )}
          </AnimatePresence>

          <div
            style={{
              marginTop: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              fontSize: 15,
              fontWeight: 800,
              color: "#e2e8f0",
            }}
          >
            <motion.button
              type="button"
              whileHover={{ color: "#63e1e8", y: -1 }}
              onClick={(e) => {
                e.stopPropagation();
                handleLegalClick("privacy");
              }}
              style={{
                background: "none",
                border: "none",
                color: "#e2e8f0",
                fontWeight: 800,
                fontSize: 15,
                cursor: "pointer",
                padding: 0,
              }}
            >
              Private Policy
            </motion.button>
            <span style={{ color: "#63e1e8" }}>•</span>
            <motion.button
              type="button"
              whileHover={{ color: "#c084fc", y: -1 }}
              onClick={(e) => {
                e.stopPropagation();
                handleLegalClick("terms");
              }}
              style={{
                background: "none",
                border: "none",
                color: "#e2e8f0",
                fontWeight: 800,
                fontSize: 15,
                cursor: "pointer",
                padding: 0,
              }}
            >
              Terms of Service
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Legal Info Modal */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              e.stopPropagation();
              setActiveModal(null);
            }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 80,
              background: "rgba(4, 7, 20, 0.72)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 18,
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 14 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: 460,
                width: "100%",
                background:
                  "linear-gradient(155deg, rgba(19, 37, 92, 0.96), rgba(10, 15, 32, 0.98))",
                border: "1.5px solid rgba(99, 225, 232, 0.55)",
                borderRadius: 22,
                padding: 24,
                boxShadow: "0 24px 55px rgba(0, 0, 0, 0.65)",
                color: "#ffffff",
              }}
            >
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 900,
                  marginBottom: 10,
                  color: "#63e1e8",
                }}
              >
                {activeModal === "privacy" ? "Private Policy" : "Terms of Service"}
              </div>
              <p
                style={{
                  margin: "0 0 18px",
                  fontSize: 14,
                  lineHeight: 1.6,
                  fontWeight: 700,
                  color: "#e2e8f0",
                }}
              >
                {activeModal === "privacy"
                  ? "Biosphere Quest stores your explorer profile, XP, and progress through Supabase authentication. We only use your account details to power your learning quests on this website and never sell your personal data."
                  : "By using the Biosphere Quest website, you agree to explore and learn respectfully across our educational quests, mini-games, and web features."}
              </p>
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveModal(null)}
                className="primary-btn"
                style={{ width: "100%" }}
              >
                Got It
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}