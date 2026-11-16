import { motion } from "framer-motion";
import logoImg from "../assets/BiosphereQuestAssets/Biosphere Quest Logo.png";
import rocketGif from "../assets/BiosphereQuestAssets/Rocket.gif";
import gamesGif from "../assets/BiosphereQuestAssets/Games Icon.gif";
import scienceGif from "../assets/BiosphereQuestAssets/Science gif.gif";
import streakIcon from "../assets/BiosphereQuestAssets/Streak Icon.png";
import badgeIcon from "../assets/BiosphereQuestAssets/Badge Icon.png";
import astroImg from "../assets/BiosphereQuestAssets/Astro (Biosphere Quest Mascot).png";
import stellaImg from "../assets/BiosphereQuestAssets/Stella (Biosphere Quest Mascot).png";

export default function HomeDashboard({ explorer, onNavigate, onEarnXp, playSfx }) {
  const levelProgress = (explorer.xp % 250) / 2.5; // percentage towards next 250 XP level

  return (
    <div>
      {/* Welcome Hero Banner with Floating Mascot */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: "linear-gradient(135deg, rgba(30, 41, 59, 0.85), rgba(15, 23, 42, 0.95))",
          border: "2px solid rgba(99, 225, 232, 0.45)",
          borderRadius: 26,
          padding: "28px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 20,
          boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
          marginBottom: 24,
        }}
      >
        <div>
          <span style={{ fontSize: 11, fontWeight: 900, color: "#ffdf4e", letterSpacing: 0.8 }}>
            🚀 COMMAND DECK • GRADE {explorer.grade}
          </span>
          <h1 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 900, margin: "6px 0" }}>
            Welcome back, <span style={{ color: "#63e1e8" }}>{explorer.name}</span>!
          </h1>
          <p style={{ fontSize: 13.5, color: "#cbd5e1", maxWidth: 520, fontWeight: 600 }}>
            Your cosmic co-pilot is ready. Dive into bioluminescent ocean reefs or launch into math arcade challenges to level up today!
          </p>

          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { playSfx?.("click"); onNavigate("games"); }}
              style={{
                background: "linear-gradient(90deg, #22d3ee, #818cf8)",
                border: "none",
                color: "#060818",
                fontWeight: 900,
                padding: "10px 20px",
                borderRadius: 14,
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              Play Arcade Games 🎮
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { playSfx?.("click"); onNavigate("courses"); }}
              style={{
                background: "rgba(30, 41, 59, 0.8)",
                border: "1.5px solid rgba(99, 225, 232, 0.5)",
                color: "#63e1e8",
                fontWeight: 900,
                padding: "10px 20px",
                borderRadius: 14,
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              Explore Courses 📚
            </motion.button>
          </div>
        </div>

        {/* Mascot Teaser Animation */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <motion.img
            src={astroImg}
            alt="Astro"
            animate={{ y: [-6, 6, -6], rotate: [-4, 4, -4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 90, height: 90, objectFit: "contain", filter: "drop-shadow(0 0 16px rgba(56,189,248,0.6))" }}
          />
          <motion.img
            src={stellaImg}
            alt="Stella"
            animate={{ y: [6, -6, 6], rotate: [4, -4, 4] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 90, height: 90, objectFit: "contain", filter: "drop-shadow(0 0 16px rgba(168,85,247,0.6))" }}
          />
        </div>
      </motion.div>

      {/* Stats Overview Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 24 }}>
        <motion.div whileHover={{ y: -4 }} className="card-panel" style={{ textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 900, color: "#38bdf8" }}>EXPLORER LEVEL</div>
          <div style={{ fontSize: 32, fontWeight: 900, margin: "6px 0" }}>Lv. {explorer.level}</div>
          <div style={{ height: 8, background: "#1e293b", borderRadius: 999, overflow: "hidden", marginTop: 8 }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${levelProgress}%` }}
              transition={{ duration: 1 }}
              style={{ height: "100%", background: "linear-gradient(90deg, #22d3ee, #818cf8)", borderRadius: 999 }}
            />
          </div>
          <div style={{ fontSize: 10.5, color: "#94a3b8", marginTop: 4 }}>{explorer.xp} Total XP</div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="card-panel" style={{ textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 900, color: "#ffdf4e" }}>DAILY STREAK</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, margin: "6px 0" }}>
            <img src={streakIcon} alt="" style={{ width: 28, height: 28 }} />
            <span style={{ fontSize: 32, fontWeight: 900 }}>{explorer.streak} Days</span>
          </div>
          <div style={{ fontSize: 11.5, color: "#cbd5e1" }}>Keep your cosmic streak burning! 🔥</div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="card-panel" style={{ textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 900, color: "#4ade80" }}>DAILY REWARD</div>
          <div style={{ fontSize: 20, fontWeight: 900, margin: "8px 0" }}>+50 XP Bonus</div>
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => onEarnXp(50)}
            style={{
              background: "linear-gradient(90deg, #4ade80, #22d3ee)",
              border: "none",
              color: "#060818",
              fontWeight: 900,
              padding: "8px 16px",
              borderRadius: 12,
              cursor: "pointer",
              fontSize: 12,
            }}
          >
            Claim Daily XP 🎁
          </motion.button>
        </motion.div>
      </div>

      {/* Quick Access Worlds */}
      <div className="card-panel">
        <h3 style={{ fontSize: 18, fontWeight: 900, marginBottom: 14 }}>🌍 Biosphere Quest Worlds</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => { playSfx?.("click"); onNavigate("courses"); }}
            style={{
              background: "linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(15, 23, 42, 0.8))",
              border: "1px solid rgba(56, 189, 248, 0.4)",
              borderRadius: 18,
              padding: 18,
              cursor: "pointer",
            }}
          >
            <img src={scienceGif} alt="" style={{ width: 40, height: 40, objectFit: "contain", marginBottom: 8 }} />
            <h4 style={{ fontSize: 16, fontWeight: 900, color: "#38bdf8" }}>Bioluminescent Coral Lab</h4>
            <p style={{ fontSize: 12.5, color: "#cbd5e1", marginTop: 4 }}>Explore marine habitats, ecosystems, and environmental science modules.</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => { playSfx?.("click"); onNavigate("games"); }}
            style={{
              background: "linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(15, 23, 42, 0.8))",
              border: "1px solid rgba(168, 85, 247, 0.4)",
              borderRadius: 18,
              padding: 18,
              cursor: "pointer",
            }}
          >
            <img src={gamesGif} alt="" style={{ width: 40, height: 40, objectFit: "contain", marginBottom: 8 }} />
            <h4 style={{ fontSize: 16, fontWeight: 900, color: "#c084fc" }}>Cosmic Holo-Deck Arcade</h4>
            <p style={{ fontSize: 12.5, color: "#cbd5e1", marginTop: 4 }}>Play 15+ gamified Math & Science mini-games and defeat boss challenges.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}