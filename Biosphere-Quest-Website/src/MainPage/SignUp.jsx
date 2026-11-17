import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";
import logoImg from "../assets/BiosphereQuestAssets/Biosphere Quest Logo.png";
import rocketGif from "../assets/BiosphereQuestAssets/Rocket.gif";
import blueCatGif from "../assets/BiosphereQuestAssets/Blue Cat.gif";
import astroImg from "../assets/BiosphereQuestAssets/Astro (Biosphere Quest Mascot).png";

const SWIMMING_CREATURES = [
  { icon: "🪼", top: "72%", duration: 18, delay: 0, size: 28, reverse: false },
  { icon: "🐠", top: "82%", duration: 14, delay: 2, size: 24, reverse: true },
  { icon: "🐢", top: "88%", duration: 22, delay: 4, size: 30, reverse: false },
  { icon: "🦑", top: "77%", duration: 16, delay: 6, size: 26, reverse: true },
];

export default function SignUp({ onNavigate, onSignUpSuccess }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [clickBursts, setClickBursts] = useState([]);

  // Twinkling Starfield for the cosmic panel
  const stars = useMemo(
    () =>
      Array.from({ length: 45 }, (_, i) => ({
        id: i,
        left: `${(i * 31 + 7) % 100}%`,
        top: `${(i * 43 + 11) % 90}%`,
        size: (i % 3) + 2,
        duration: 1.6 + (i % 4) * 0.5,
        delay: (i % 6) * 0.3,
      })),
    []
  );

  // Rising Ocean Bubbles
  const bubbles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${(i * 17 + 4) % 96}%`,
        size: 6 + (i % 4) * 5,
        duration: 5.5 + (i % 5) * 1.4,
        delay: (i % 7) * 0.6,
        sway: i % 2 === 0 ? 16 : -16,
      })),
    []
  );

  // Exactly 25 Right-Diagonal Shooting Comets
  const shootingStars = useMemo(
    () =>
      Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        top: `${(i * 7 + 3) % 45}%`,
        left: `${(i * 13 + 5) % 85}%`,
        delay: (i * 0.4) % 10,
        duration: 1.6 + (i % 5) * 0.35,
        angle: 35 + ((i * 7) % 20),
      })),
    []
  );

  const handleScreenClick = (e) => {
    const id = Date.now() + Math.random();
    const icons = ["✨", "🫧", "⭐", "💫", "🚀"];
    const burst = {
      id,
      x: e.clientX,
      y: e.clientY,
      particles: Array.from({ length: 6 }, (_, idx) => ({
        icon: icons[(idx + Math.floor(Math.random() * 5)) % icons.length],
        angle: idx * 60 * (Math.PI / 180),
        dist: 30 + Math.random() * 25,
      })),
    };
    setClickBursts((prev) => [...prev.slice(-4), burst]);
    setTimeout(() => {
      setClickBursts((prev) => prev.filter((b) => b.id !== id));
    }, 800);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    setLoading(false);
    if (error) {
      setErrorMsg(error.message);
    } else {
      onSignUpSuccess?.();
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMsg("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) {
      setLoading(false);
      setErrorMsg(error.message);
    }
  };

  return (
    <div
      onClick={handleScreenClick}
      style={{
        minHeight: "100vh",
        display: "flex",
        background: "linear-gradient(135deg, #060818 0%, #191247 50%, #06637a 100%)",
        fontFamily: "'Nunito', 'Segoe UI', system-ui, sans-serif",
        overflow: "hidden",
        position: "relative",
        cursor: "crosshair",
      }}
    >
      {/* Click Stardust */}
      <AnimatePresence>
        {clickBursts.map((burst) => (
          <div key={burst.id} style={{ position: "fixed", left: burst.x, top: burst.y, pointerEvents: "none", zIndex: 50 }}>
            {burst.particles.map((p, idx) => (
              <motion.span
                key={idx}
                initial={{ x: 0, y: 0, scale: 0.4, opacity: 1 }}
                animate={{ x: Math.cos(p.angle) * p.dist, y: Math.sin(p.angle) * p.dist - 14, scale: 1.2, opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                style={{ position: "absolute", fontSize: 16 }}
              >
                {p.icon}
              </motion.span>
            ))}
          </div>
        ))}
      </AnimatePresence>

      {/* LEFT PANEL: Glassmorphism Sign Up Form Sidebar */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          width: "440px",
          minWidth: "440px",
          background: "linear-gradient(155deg, rgba(15, 23, 42, 0.92), rgba(23, 37, 84, 0.88))",
          backdropFilter: "blur(18px)",
          borderRight: "1.5px solid rgba(99, 225, 232, 0.35)",
          color: "#ffffff",
          padding: "36px 44px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: "15px 0 40px rgba(0,0,0,0.5)",
          zIndex: 10,
        }}
      >
        <div>
          <motion.button
            whileHover={{ x: -3 }}
            onClick={() => onNavigate("splash")}
            style={{
              background: "none",
              border: "none",
              fontSize: 18,
              cursor: "pointer",
              fontWeight: 900,
              color: "#63e1e8",
              marginBottom: 16,
            }}
          >
            ←
          </motion.button>

          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <motion.img
              animate={{ y: [-4, 4, -4], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              src={logoImg}
              alt="Logo"
              style={{ width: 48, height: 48, objectFit: "contain", marginBottom: 6, filter: "drop-shadow(0 0 15px rgba(99,225,232,0.8))" }}
            />
            <h1
              style={{
                fontSize: 26,
                fontWeight: 900,
                background: "linear-gradient(90deg, #63e1e8 0%, #c084fc 50%, #ffdf4e 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                margin: 0,
              }}
            >
              Create Account
            </h1>
            <p style={{ fontSize: 12.5, color: "#cbd5e1", marginTop: 4, fontWeight: 600 }}>
              Join Biosphere Quest & start your cosmic journey
            </p>
          </div>

          {errorMsg && (
            <div
              style={{
                background: "rgba(239, 68, 68, 0.2)",
                border: "1px solid rgba(239, 68, 68, 0.5)",
                color: "#fca5a5",
                padding: "9px 12px",
                borderRadius: 12,
                fontSize: 12,
                fontWeight: 700,
                marginBottom: 12,
              }}
            >
              {errorMsg}
            </div>
          )}

          {/* Google Sign In Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: 14,
              border: "1.5px solid rgba(99, 225, 232, 0.4)",
              background: "rgba(30, 41, 59, 0.8)",
              color: "#ffffff",
              fontWeight: 800,
              fontSize: 13,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              marginBottom: 14,
              boxShadow: "0 0 15px rgba(34, 211, 238, 0.15)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.18v3.15C3.15 21.32 7.23 24 12 24z"/>
              <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.6H1.18C.43 8.13 0 9.87 0 12s.43 3.87 1.18 5.4l4.09-3.16z"/>
              <path fill="#EA4335" d="M12 4.75c1.76 0 3.34.61 4.58 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.15 2.68 1.18 6.6l4.09 3.15c.95-2.85 3.6-4.96 6.73-4.96z"/>
            </svg>
            Continue with Google
          </motion.button>

          <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "10px 0", color: "#64748b", fontSize: 11, fontWeight: 700 }}>
            <div style={{ flex: 1, height: 1, background: "rgba(100, 116, 139, 0.3)" }}></div>
            OR WITH EMAIL
            <div style={{ flex: 1, height: 1, background: "rgba(100, 116, 139, 0.3)" }}></div>
          </div>

          <form onSubmit={handleSignUp} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: "#63e1e8", marginBottom: 4 }}>
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Explorer Name"
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: 12,
                  border: "1.5px solid rgba(56, 189, 248, 0.45)",
                  background: "rgba(8, 13, 24, 0.85)",
                  color: "#fff",
                  fontSize: 13,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: "#63e1e8", marginBottom: 4 }}>
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@gmail.com"
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: 12,
                  border: "1.5px solid rgba(56, 189, 248, 0.45)",
                  background: "rgba(8, 13, 24, 0.85)",
                  color: "#fff",
                  fontSize: 13,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: "#63e1e8", marginBottom: 4 }}>
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: 12,
                  border: "1.5px solid rgba(56, 189, 248, 0.45)",
                  background: "rgba(8, 13, 24, 0.85)",
                  color: "#fff",
                  fontSize: 13,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "11px",
                borderRadius: 12,
                border: "none",
                background: "linear-gradient(90deg, #22d3ee, #818cf8)",
                color: "#080d18",
                fontWeight: 900,
                fontSize: 13.5,
                cursor: "pointer",
                boxShadow: "0 0 20px rgba(34, 211, 238, 0.45)",
                marginTop: 2,
              }}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </motion.button>
          </form>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onNavigate("login")}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: 12,
              border: "1.5px solid rgba(99, 225, 232, 0.35)",
              background: "rgba(30, 41, 59, 0.6)",
              color: "#63e1e8",
              fontWeight: 900,
              fontSize: 12.5,
              cursor: "pointer",
              marginTop: 10,
              textAlign: "center",
            }}
          >
            I already have an account
          </motion.button>
        </div>

        <div style={{ textAlign: "center", fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>
          Biosphere Quest © 2026 • Group 8
        </div>
      </motion.div>

      {/* RIGHT PANEL: Rich Space & Ocean Animations + Welcome Teaser Card */}
      <div
        style={{
          flex: 1,
          position: "relative",
          background: "linear-gradient(135deg, #094566 0%, #06637a 50%, #191247 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
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
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 18% 20%, rgba(139, 92, 246, 0.38) 0%, transparent 45%), radial-gradient(circle at 82% 32%, rgba(56, 189, 248, 0.32) 0%, transparent 48%), radial-gradient(circle at 50% 92%, rgba(20, 184, 166, 0.45) 0%, transparent 55%)",
            pointerEvents: "none",
          }}
        />

        {/* 🌟 Twinkling Stars */}
        {stars.map((star) => (
          <motion.span
            key={`star-${star.id}`}
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.7, 1.4, 0.7] }}
            transition={{ duration: star.duration, repeat: Infinity, delay: star.delay }}
            style={{
              position: "absolute",
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              borderRadius: "50%",
              backgroundColor: star.id % 2 === 0 ? "#63e1e8" : "#ffdf4e",
              boxShadow: "0 0 10px rgba(99, 225, 232, 0.8)",
              pointerEvents: "none",
            }}
          />
        ))}

        {/* 🌠 25 Right-Diagonal Shooting Comets */}
        {shootingStars.map((comet) => (
          <motion.div
            key={`comet-${comet.id}`}
            initial={{ x: -60, y: -60, opacity: 0 }}
            animate={{ x: 320, y: 320, opacity: [0, 1, 1, 0] }}
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
              zIndex: 1,
            }}
          />
        ))}

        {/* 🐠 Swimming Bioluminescent Ocean Creatures */}
        {SWIMMING_CREATURES.map((creature, idx) => (
          <motion.div
            key={`creature-${idx}`}
            initial={{ x: creature.reverse ? "55vw" : "-10vw" }}
            animate={{
              x: creature.reverse ? "-10vw" : "55vw",
              y: [-8, 10, -8],
            }}
            transition={{
              x: { duration: creature.duration, repeat: Infinity, delay: creature.delay, ease: "linear" },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{
              position: "absolute",
              top: creature.top,
              fontSize: creature.size,
              filter: "drop-shadow(0 0 10px rgba(56, 189, 248, 0.7))",
              pointerEvents: "none",
              zIndex: 2,
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
              opacity: [0, 0.6, 0.6, 0],
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
              background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.45), transparent)",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />
        ))}

        {/* Orbiting Rocket & Cat around Center Card */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            width: 320,
            height: 320,
            borderRadius: "50%",
            border: "1.5px dashed rgba(99, 225, 232, 0.4)",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 3,
          }}
        >
          <img
            src={rocketGif}
            alt="Rocket"
            style={{ position: "absolute", top: -20, width: 38, height: 38, objectFit: "contain" }}
          />
          <img
            src={blueCatGif}
            alt="Blue Cat"
            style={{ position: "absolute", bottom: -20, width: 38, height: 38, objectFit: "contain" }}
          />
        </motion.div>

        {/* Center Welcome Screen Teaser Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            background: "rgba(15, 23, 42, 0.88)",
            backdropFilter: "blur(20px)",
            padding: "36px 42px",
            borderRadius: 30,
            width: 380,
            boxShadow: "0 25px 60px rgba(0,0,0,0.6), 0 0 40px rgba(34, 211, 238, 0.35)",
            border: "2px solid rgba(99, 225, 232, 0.5)",
            position: "relative",
            zIndex: 5,
            textAlign: "center",
          }}
        >
          <motion.img
            src={astroImg}
            alt="Astro"
            animate={{ y: [-8, 8, -8], rotate: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 70, height: 70, objectFit: "contain", margin: "0 auto 12px", filter: "drop-shadow(0 0 15px rgba(56,189,248,0.8))" }}
          />
          <span style={{ fontSize: 11, fontWeight: 900, color: "#22d3ee", letterSpacing: 1 }}>
            🌟 WELCOME TO THE GALAXY
          </span>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: "#ffffff", margin: "6px 0 8px" }}>
            Begin Your Quest
          </h2>
          <p style={{ fontSize: 13, color: "#cbd5e1", fontWeight: 600, lineHeight: 1.5 }}>
            Create your explorer profile to unlock math adventures, bioluminescent ocean labs, and weekly champion badges!
          </p>

          <div style={{ marginTop: 20, background: "rgba(30, 41, 59, 0.7)", padding: "12px", borderRadius: 16, border: "1px solid rgba(99, 225, 232, 0.3)" }}>
            <div style={{ fontSize: 12, fontWeight: 900, color: "#ffdf4e" }}>🎁 +100 Starter XP Unlocked</div>
            <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>Instant access upon sign up</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}