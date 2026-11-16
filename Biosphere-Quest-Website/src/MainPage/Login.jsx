import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";
import logoImg from "../assets/BiosphereQuestAssets/Biosphere Quest Logo.png";
import rocketGif from "../assets/BiosphereQuestAssets/Rocket.gif";
import blueCatGif from "../assets/BiosphereQuestAssets/Blue Cat.gif";
import gamesGif from "../assets/BiosphereQuestAssets/Games Icon.gif";

export default function Login({ onNavigate, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [clickBursts, setClickBursts] = useState([]);

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
        background: "linear-gradient(135deg, #070918 0%, #131138 50%, #042f2e 100%)",
        fontFamily: "'Nunito', 'Segoe UI', system-ui, sans-serif",
        overflow: "hidden",
        position: "relative",
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

      {/* LEFT PANEL: Soft Pastel Form */}
      <motion.div
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          width: "440px",
          minWidth: "440px",
          background: "#eefbf2",
          color: "#0f172a",
          padding: "36px 44px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: "15px 0 40px rgba(0,0,0,0.4)",
          zIndex: 10,
        }}
      >
        <div>
          <button
            onClick={() => onNavigate("splash")}
            style={{
              background: "none",
              border: "none",
              fontSize: 18,
              cursor: "pointer",
              fontWeight: 900,
              color: "#166534",
              marginBottom: 16,
            }}
          >
            ←
          </button>

          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <motion.img
              animate={{ y: [-4, 4, -4], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              src={logoImg}
              alt="Logo"
              style={{ width: 52, height: 52, objectFit: "contain", marginBottom: 8 }}
            />
            <h1 style={{ fontSize: 26, fontWeight: 900, color: "#14532d", margin: 0 }}>
              Log in
            </h1>
            <p style={{ fontSize: 12.5, color: "#4b5563", marginTop: 4, fontWeight: 600 }}>
              Welcome back to Biosphere Quest
            </p>
          </div>

          {errorMsg && (
            <div
              style={{
                background: "#fee2e2",
                border: "1px solid #f87171",
                color: "#991b1b",
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
              <label style={{ display: "block", fontSize: 11.5, fontWeight: 800, color: "#166534", marginBottom: 5 }}>
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
                  border: "1.5px solid #bbf7d0",
                  background: "#ffffff",
                  color: "#0f172a",
                  fontSize: 13,
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 11.5, fontWeight: 800, color: "#166534", marginBottom: 5 }}>
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
                  border: "1.5px solid #bbf7d0",
                  background: "#ffffff",
                  color: "#0f172a",
                  fontSize: 13,
                  outline: "none",
                }}
              />
              <div style={{ textAlign: "right", marginTop: 5 }}>
                <span
                  onClick={() => onNavigate("forgot")}
                  style={{ fontSize: 11.5, fontWeight: 800, color: "#166534", cursor: "pointer" }}
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
                background: "#15803d",
                color: "#ffffff",
                fontWeight: 900,
                fontSize: 14,
                cursor: "pointer",
                boxShadow: "0 6px 20px rgba(21, 128, 61, 0.35)",
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
              border: "1.5px solid #d1fae5",
              background: "#ffffff",
              color: "#15803d",
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

        <div style={{ textAlign: "center", fontSize: 11, color: "#6b7280", fontWeight: 700 }}>
          Biosphere Quest © 2026 • Group 8
        </div>
      </motion.div>

      {/* RIGHT PANEL: Animated Cosmic Teaser Video/GIF Display */}
      <div
        style={{
          flex: 1,
          position: "relative",
          background: "linear-gradient(135deg, #064e3b 0%, #022c22 50%, #042f2e 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Floating Icons */}
        <motion.div
          animate={{ y: [-12, 12, -12], rotate: [0, 8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", top: "15%", left: "18%", fontSize: 40 }}
        >
          🥑
        </motion.div>
        <motion.div
          animate={{ y: [10, -14, 10], rotate: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", top: "22%", right: "22%", fontSize: 36 }}
        >
          🍎
        </motion.div>

        {/* Center Animated Teaser Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(16px)",
            padding: "32px 40px",
            borderRadius: 28,
            textAlign: "center",
            boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
            maxWidth: 380,
            border: "2px solid rgba(52, 211, 153, 0.4)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 14 }}>
            <motion.img
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              src={rocketGif}
              alt="Rocket Teaser"
              style={{ width: 44, height: 44, objectFit: "contain" }}
            />
            <motion.img
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 2, repeat: Infinity }}
              src={gamesGif}
              alt="Games Teaser"
              style={{ width: 44, height: 44, objectFit: "contain" }}
            />
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: "#064e3b", margin: 0 }}>
            Cosmic Holo-Deck Live
          </h2>
          <p style={{ fontSize: 12.5, color: "#047857", fontWeight: 700, marginTop: 6, lineHeight: 1.5 }}>
            Watch your progress sync instantly across Math arcade games and deep-ocean labs!
          </p>
        </motion.div>
      </div>
    </div>
  );
}