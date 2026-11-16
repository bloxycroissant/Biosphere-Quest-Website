import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";
import logoImg from "../assets/BiosphereQuestAssets/Biosphere Quest Logo.png";
import rocketGif from "../assets/BiosphereQuestAssets/Rocket.gif";
import blueCatGif from "../assets/BiosphereQuestAssets/Blue Cat.gif";
import astroImg from "../assets/BiosphereQuestAssets/Astro (Biosphere Quest Mascot).png";

export default function Login({ onNavigate, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [clickBursts, setClickBursts] = useState([]);

  // Twinkling Starfield for the right cosmic panel
  const stars = useMemo(
    () =>
      Array.from({ length: 35 }, (_, i) => ({
        id: i,
        left: `${(i * 31 + 7) % 100}%`,
        top: `${(i * 43 + 11) % 90}%`,
        size: (i % 3) + 2,
        duration: 1.6 + (i % 4) * 0.5,
        delay: (i % 6) * 0.3,
      })),
    []
  );

  const handleScreenClick = (e) => {
    const id = Date.now() + Math.random();
    const icons = ["✨", "🫧", "⭐", "💫", "🔐"];
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);
    if (error) {
      setErrorMsg(error.message);
    } else {
      onLoginSuccess?.();
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

      {/* LEFT PANEL: Glassmorphism Form Sidebar */}
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

          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <motion.img
              animate={{ y: [-4, 4, -4], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              src={logoImg}
              alt="Logo"
              style={{ width: 52, height: 52, objectFit: "contain", marginBottom: 8, filter: "drop-shadow(0 0 15px rgba(99,225,232,0.8))" }}
            />
            <h1
              style={{
                fontSize: 28,
                fontWeight: 900,
                background: "linear-gradient(90deg, #63e1e8 0%, #c084fc 50%, #ffdf4e 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                margin: 0,
              }}
            >
              Log in
            </h1>
            <p style={{ fontSize: 13, color: "#cbd5e1", marginTop: 4, fontWeight: 600 }}>
              Welcome back to Biosphere Quest
            </p>
          </div>

          {errorMsg && (
            <div
              style={{
                background: "rgba(239, 68, 68, 0.2)",
                border: "1px solid rgba(239, 68, 68, 0.5)",
                color: "#fca5a5",
                padding: "10px 14px",
                borderRadius: 12,
                fontSize: 12.5,
                fontWeight: 700,
                marginBottom: 14,
              }}
            >
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ display: "block", fontSize: 11.5, fontWeight: 800, color: "#63e1e8", marginBottom: 5 }}>
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
                  padding: "11px 16px",
                  borderRadius: 14,
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
              <label style={{ display: "block", fontSize: 11.5, fontWeight: 800, color: "#63e1e8", marginBottom: 5 }}>
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
                  padding: "11px 16px",
                  borderRadius: 14,
                  border: "1.5px solid rgba(56, 189, 248, 0.45)",
                  background: "rgba(8, 13, 24, 0.85)",
                  color: "#fff",
                  fontSize: 13,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              <div style={{ textAlign: "right", marginTop: 5 }}>
                <span
                  onClick={() => onNavigate("forgot")}
                  style={{ fontSize: 11.5, fontWeight: 800, color: "#c084fc", cursor: "pointer" }}
                >
                  Forgot Password?
                </span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: 14,
                border: "none",
                background: "linear-gradient(90deg, #22d3ee, #818cf8)",
                color: "#080d18",
                fontWeight: 900,
                fontSize: 14,
                cursor: "pointer",
                boxShadow: "0 0 20px rgba(34, 211, 238, 0.45)",
                marginTop: 4,
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>
          </form>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onNavigate("signup")}
            style={{
              width: "100%",
              padding: "11px",
              borderRadius: 14,
              border: "1.5px solid rgba(99, 225, 232, 0.35)",
              background: "rgba(30, 41, 59, 0.6)",
              color: "#63e1e8",
              fontWeight: 900,
              fontSize: 13,
              cursor: "pointer",
              marginTop: 10,
              textAlign: "center",
            }}
          >
            I don't have an account
          </motion.button>
        </div>

        <div style={{ textAlign: "center", fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>
          Biosphere Quest © 2026 • Group 8
        </div>
      </motion.div>

      {/* RIGHT PANEL (LOGIN EXCLUSIVE TEASER): Secure Galactic Vault & Quick Auth Sync */}
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
        {/* Twinkling Stars */}
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

        {/* Orbiting Rocket & Cat around Center Vault */}
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

        {/* Center Login Teaser Card: Secure Vault Sync */}
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
            🔐 SECURE GALACTIC VAULT
          </span>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: "#ffffff", margin: "6px 0 8px" }}>
            Instant Session Sync
          </h2>
          <p style={{ fontSize: 13, color: "#cbd5e1", fontWeight: 600, lineHeight: 1.5 }}>
            Your XP, badges, and ocean reef progress are securely restored the moment you log in.
          </p>

          <div style={{ marginTop: 20, background: "rgba(30, 41, 59, 0.7)", padding: "12px", borderRadius: 16, border: "1px solid rgba(99, 225, 232, 0.3)" }}>
            <div style={{ fontSize: 12, fontWeight: 900, color: "#4ade80" }}>✓ Cloud Database Connected</div>
            <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>Supabase Auth & Profiles Active</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}