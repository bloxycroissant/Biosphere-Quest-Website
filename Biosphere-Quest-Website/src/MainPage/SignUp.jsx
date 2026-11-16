import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";
import logoImg from "../assets/BiosphereQuestAssets/Biosphere Quest Logo.png";
import rocketGif from "../assets/BiosphereQuestAssets/Rocket.gif";
import blueCatGif from "../assets/BiosphereQuestAssets/Blue Cat.gif";
import scienceGif from "../assets/BiosphereQuestAssets/Science gif.gif";

export default function SignUp({ onNavigate, onSignUpSuccess }) {
  const [fullName, setFullName] = useState("");
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

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    setLoading(false);
    if (error) {
      setErrorMsg(error.message);
    } else {
      onSignUpSuccess?.();
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
          padding: "32px 44px",
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
              marginBottom: 14,
            }}
          >
            ←
          </button>

          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <motion.img
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              src={logoImg}
              alt="Logo"
              style={{ width: 46, height: 46, objectFit: "contain", marginBottom: 6 }}
            />
            <h1 style={{ fontSize: 24, fontWeight: 900, color: "#14532d", margin: 0 }}>
              Sign Up
            </h1>
            <p style={{ fontSize: 12, color: "#4b5563", marginTop: 3, fontWeight: 600 }}>
              Welcome to Biosphere Quest - Let's create account
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
                marginBottom: 12,
              }}
            >
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSignUp} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: "#166534", marginBottom: 4 }}>
                Full name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                style={{
                  width: "100%",
                  padding: "10px 14px",
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
              <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: "#166534", marginBottom: 4 }}>
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
              <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: "#166534", marginBottom: 4 }}>
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
                  borderRadius: 14,
                  border: "1.5px solid #bbf7d0",
                  background: "#ffffff",
                  color: "#0f172a",
                  fontSize: 13,
                  outline: "none",
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
                borderRadius: 14,
                border: "none",
                background: "#15803d",
                color: "#ffffff",
                fontWeight: 900,
                fontSize: 14,
                cursor: "pointer",
                boxShadow: "0 6px 20px rgba(21, 128, 61, 0.35)",
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
            Already have an account
          </motion.button>
        </div>

        <div style={{ textAlign: "center", fontSize: 11, color: "#6b7280", fontWeight: 700 }}>
          Biosphere Quest © 2026 • Group 8
        </div>
      </motion.div>

      {/* RIGHT PANEL: Floating Stats Card with Animated Science GIF */}
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
          animate={{ y: [-10, 14, -10], rotate: [0, 6, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", top: "18%", left: "22%", fontSize: 36 }}
        >
          🍓
        </motion.div>
        <motion.div
          animate={{ y: [14, -10, 14] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", top: "25%", right: "18%", fontSize: 36 }}
        >
          🥑
        </motion.div>

        {/* Floating Glass Tracker Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            background: "rgba(255, 255, 255, 0.94)",
            backdropFilter: "blur(16px)",
            padding: "32px 38px",
            borderRadius: 26,
            width: 360,
            boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
            border: "2px solid rgba(52, 211, 153, 0.4)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 10.5, fontWeight: 900, color: "#166534" }}>
              ⚡ REAL-TIME TRACKING
            </span>
            <img src={scienceGif} alt="Science Teaser" style={{ width: 28, height: 28, objectFit: "contain" }} />
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: "#064e3b", margin: 0 }}>
            Fuel Your Day
          </h2>
          <p style={{ fontSize: 12, color: "#4b5563", marginTop: 4, fontWeight: 600 }}>
            Balanced nutrition and arcade learning built for your lifestyle.
          </p>

          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <div style={{ display: "flex", fontSize: 11.5, fontWeight: 800, color: "#166534", marginBottom: 4 }}>
                <span>Daily XP Progress</span>
                <span style={{ marginLeft: "auto" }}>1,842 / 2,200 XP</span>
              </div>
              <div style={{ height: 8, background: "#d1fae5", borderRadius: 999, overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "83%" }}
                  transition={{ duration: 1, delay: 0.4 }}
                  style={{ height: "100%", background: "#15803d", borderRadius: 999 }}
                />
              </div>
            </div>

            <div>
              <div style={{ display: "flex", fontSize: 11.5, fontWeight: 800, color: "#166534", marginBottom: 4 }}>
                <span>Ocean & Space Quests</span>
                <span style={{ marginLeft: "auto" }}>98 / 150 pts</span>
              </div>
              <div style={{ height: 8, background: "#d1fae5", borderRadius: 999, overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "65%" }}
                  transition={{ duration: 1, delay: 0.6 }}
                  style={{ height: "100%", background: "#38bdf8", borderRadius: 999 }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}