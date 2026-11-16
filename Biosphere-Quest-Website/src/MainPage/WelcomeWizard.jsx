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

export default function WelcomeWizard({ onComplete, onBackToSplash }) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const [role, setRole] = useState("student");
  const [explorerName, setExplorerName] = useState("");
  const [companion, setCompanion] = useState("astro");
  const [grade, setGrade] = useState(3);
  const [favoriteWorld, setFavoriteWorld] = useState("ocean");
  const [clickBursts, setClickBursts] = useState([]);

  const selectedCompanion = COMPANIONS.find((c) => c.id === companion) || COMPANIONS[0];

  // Twinkling Stars
  const stars = useMemo(
    () =>
      Array.from({ length: 42 }, (_, i) => ({
        id: i,
        left: `${(i * 29 + 5) % 100}%`,
        top: `${(i * 41 + 9) % 70}%`,
        size: (i % 3) + 2,
        duration: 1.8 + (i % 4) * 0.5,
        delay: (i % 5) * 0.3,
      })),
    []
  );

  // Rising Ocean Bubbles
  const bubbles = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: `${(i * 21 + 6) % 95}%`,
        size: 7 + (i % 4) * 5,
        duration: 6 + (i % 4) * 1.5,
        delay: (i % 6) * 0.6,
      })),
    []
  );

  const handleScreenClick = (e) => {
    const id = Date.now() + Math.random();
    const icons = ["✨", "🫧", "⭐", "💫"];
    const burst = {
      id,
      x: e.clientX,
      y: e.clientY,
      particles: Array.from({ length: 5 }, (_, idx) => ({
        icon: icons[(idx + Math.floor(Math.random() * 4)) % icons.length],
        angle: idx * 72 * (Math.PI / 180),
        dist: 32 + Math.random() * 24,
      })),
    };
    setClickBursts((prev) => [...prev.slice(-5), burst]);
    setTimeout(() => {
      setClickBursts((prev) => prev.filter((b) => b.id !== id));
    }, 800);
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
        overflow: "hidden",
        background:
          "linear-gradient(180deg, #060818 0%, #191247 28%, #13255c 55%, #094566 80%, #06637a 100%)",
        color: "#ffffff",
        fontFamily: "'Nunito', 'Segoe UI', system-ui, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
      }}
    >
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
                  y: Math.sin(p.angle) * p.dist - 14,
                  scale: 1.2,
                  opacity: 0,
                }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                style={{ position: "absolute", fontSize: 16 }}
              >
                {p.icon}
              </motion.span>
            ))}
          </div>
        ))}
      </AnimatePresence>

      {/* 🌟 Twinkling Stars */}
      {stars.map((star) => (
        <motion.span
          key={`star-${star.id}`}
          animate={{ opacity: [0.15, 1, 0.15], scale: [0.8, 1.4, 0.8] }}
          transition={{ duration: star.duration, repeat: Infinity, delay: star.delay }}
          style={{
            position: "absolute",
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            borderRadius: "50%",
            backgroundColor: star.id % 3 === 0 ? "#63e1e8" : "#ffffff",
            boxShadow: "0 0 8px rgba(99, 225, 232, 0.8)",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* 🫧 Rising Ocean Bubbles */}
      {bubbles.map((b) => (
        <motion.span
          key={`bubble-${b.id}`}
          initial={{ y: "105vh", opacity: 0 }}
          animate={{ y: "-10vh", opacity: [0, 0.55, 0] }}
          transition={{ duration: b.duration, repeat: Infinity, delay: b.delay, ease: "linear" }}
          style={{
            position: "absolute",
            left: b.left,
            width: b.size,
            height: b.size,
            borderRadius: "50%",
            border: "1.5px solid rgba(103, 232, 249, 0.6)",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Main Wizard Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 26, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 230, damping: 20 }}
        style={{
          width: "100%",
          maxWidth: 680,
          background: "linear-gradient(155deg, rgba(15, 23, 42, 0.86), rgba(23, 37, 84, 0.78))",
          backdropFilter: "blur(18px)",
          border: "1.5px solid rgba(99, 225, 232, 0.4)",
          borderRadius: 28,
          padding: "26px 24px",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.55), 0 0 32px rgba(56, 189, 248, 0.18)",
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
  );
}