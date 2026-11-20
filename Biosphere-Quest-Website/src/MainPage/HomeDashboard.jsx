import { useState, useMemo } from "react";
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

  const [quickLogs, setQuickLogs] = useState([
    { id: 1, label: "Completed 1 Math Nebula puzzle", xp: 25, time: "Today • 09:15 AM", tag: "MATH", done: true },
    { id: 2, label: "Scanned Bioluminescent Coral specimen", xp: 30, time: "Today • 11:40 AM", tag: "OCEAN", done: true },
    { id: 3, label: "Play 2 Holo-Deck Arcade rounds", xp: 40, time: "Today's Goal", tag: "ARCADE", done: false },
    { id: 4, label: "Log a Cosmic Discovery Note", xp: 20, time: "Today's Goal", tag: "LOG", done: false },
  ]);
  const [logInput, setLogInput] = useState("");
  const [logCategory, setLogCategory] = useState("LOG");

  const stars = useMemo(
    () =>
      Array.from({ length: 42 }, (_, i) => ({
        id: i,
        left: `${(i * 29 + 6) % 100}%`,
        top: `${(i * 37 + 8) % 68}%`,
        size: (i % 3) + 2,
        duration: 1.8 + (i % 4) * 0.5,
        delay: (i % 6) * 0.3,
      })),
    []
  );

  const bubbles = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: `${(i * 19 + 5) % 95}%`,
        size: 6 + (i % 4) * 5,
        duration: 6 + (i % 4) * 1.4,
        delay: (i % 6) * 0.6,
        sway: i % 2 === 0 ? 16 : -16,
      })),
    []
  );

  const handleLogout = () => {
    playSfx?.("click");
    onNavigate("login");
  };

  const handleToggleGoal = (item) => {
    playSfx?.("click");
    setQuickLogs((prev) =>
      prev.map((entry) => {
        if (entry.id !== item.id) return entry;
        const nextDone = !entry.done;
        if (nextDone) {
          onEarnXp?.(entry.xp);
        }
        return {
          ...entry,
          done: nextDone,
          time: nextDone ? "Completed Just Now" : "Today's Goal",
        };
      })
    );
  };

  const handleAddLog = (e) => {
    e.preventDefault();
    const trimmed = logInput.trim();
    if (!trimmed) return;
    playSfx?.("click");
    const newEntry = {
      id: Date.now(),
      label: trimmed,
      xp: 15,
      time: "Logged Just Now",
      tag: logCategory,
      done: true,
    };
    setQuickLogs((prev) => [newEntry, ...prev]);
    onEarnXp?.(15);
    setLogInput("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(180deg, #060818 0%, #191247 26%, #13255c 52%, #094566 78%, #06637a 100%)",
        color: "#ffffff",
        fontFamily: "'Nunito', 'Segoe UI', system-ui, sans-serif",
        padding: "20px 24px 56px",
      }}
    >
      {/* Animated Aurora & Bioluminescent Glow */}
      <motion.div
        animate={{ opacity: [0.35, 0.65, 0.35], scale: [1, 1.06, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "fixed",
          inset: 0,
          background:
            "radial-gradient(circle at 18% 20%, rgba(139, 92, 246, 0.35) 0%, transparent 45%), radial-gradient(circle at 82% 32%, rgba(56, 189, 248, 0.3) 0%, transparent 48%), radial-gradient(circle at 50% 92%, rgba(20, 184, 166, 0.4) 0%, transparent 55%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Twinkling Starfield */}
      {stars.map((star) => (
        <motion.span
          key={`star-${star.id}`}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.75, 1.4, 0.75] }}
          transition={{ duration: star.duration, repeat: Infinity, delay: star.delay, ease: "easeInOut" }}
          style={{
            position: "fixed",
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            borderRadius: "50%",
            backgroundColor: star.id % 3 === 0 ? "#63e1e8" : star.id % 5 === 0 ? "#ffdf4e" : "#ffffff",
            boxShadow: "0 0 8px rgba(99, 225, 232, 0.85)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      ))}

      {/* Rising Ocean Bubbles */}
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
            position: "fixed",
            left: b.left,
            width: b.size,
            height: b.size,
            borderRadius: "50%",
            border: "1.5px solid rgba(103, 232, 249, 0.6)",
            background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.45), transparent)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      ))}

      {/* Main Content Container */}
      <div style={{ maxWidth: 1120, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Top Command Header Bar with Logout Button */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            padding: "12px 18px",
            borderRadius: 18,
            background: "rgba(8, 13, 24, 0.82)",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(99, 225, 232, 0.3)",
            marginBottom: 22,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src={logoImg} alt="Biosphere Quest" style={{ width: 34, height: 34, objectFit: "contain" }} />
            <div>
              <div style={{ fontSize: 15, fontWeight: 900, color: "#63e1e8" }}>Biosphere Quest</div>
              <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>
                Explorer Hub • @{explorer.name?.toLowerCase().replace(/\s+/g, "") || "explorer"}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => {
                playSfx?.("click");
                onNavigate("profile");
              }}
              style={{
                background: "rgba(15, 23, 42, 0.85)",
                border: "1px solid rgba(99, 225, 232, 0.35)",
                color: "#e2e8f0",
                fontWeight: 800,
                padding: "8px 14px",
                borderRadius: 12,
                cursor: "pointer",
                fontSize: 12.5,
              }}
            >
              🧑‍🚀 Profile
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 18px rgba(248, 113, 113, 0.45)" }}
              whileTap={{ scale: 0.94 }}
              onClick={handleLogout}
              style={{
                background: "linear-gradient(90deg, #fb7185, #f43f5e)",
                border: "none",
                color: "#ffffff",
                fontWeight: 900,
                padding: "8px 16px",
                borderRadius: 12,
                cursor: "pointer",
                fontSize: 12.5,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span>🚪</span>
              <span>Log Out</span>
            </motion.button>
          </div>
        </div>

        {/* Welcome Hero Banner with Floating Mascot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: "linear-gradient(135deg, rgba(30, 41, 59, 0.85), rgba(15, 23, 42, 0.95))",
            backdropFilter: "blur(16px)",
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

            <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
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
                Explore Courses 📘
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
          <motion.div
            whileHover={{ y: -4 }}
            className="card-panel"
            style={{
              textAlign: "center",
              background: "rgba(15, 23, 42, 0.82)",
              backdropFilter: "blur(14px)",
              border: "1px solid rgba(99, 225, 232, 0.28)",
              borderRadius: 20,
              padding: 18,
            }}
          >
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

          <motion.div
            whileHover={{ y: -4 }}
            className="card-panel"
            style={{
              textAlign: "center",
              background: "rgba(15, 23, 42, 0.82)",
              backdropFilter: "blur(14px)",
              border: "1px solid rgba(99, 225, 232, 0.28)",
              borderRadius: 20,
              padding: 18,
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 900, color: "#ffdf4e" }}>DAILY STREAK</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, margin: "6px 0" }}>
              <img src={streakIcon} alt="" style={{ width: 28, height: 28 }} />
              <span style={{ fontSize: 32, fontWeight: 900 }}>{explorer.streak} Days</span>
            </div>
            <div style={{ fontSize: 11.5, color: "#cbd5e1" }}>Keep your cosmic streak burning! 🔥</div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="card-panel"
            style={{
              textAlign: "center",
              background: "rgba(15, 23, 42, 0.82)",
              backdropFilter: "blur(14px)",
              border: "1px solid rgba(99, 225, 232, 0.28)",
              borderRadius: 20,
              padding: 18,
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 900, color: "#4ade80" }}>DAILY REWARD</div>
            <div style={{ fontSize: 20, fontWeight: 900, margin: "8px 0" }}>+50 XP Bonus</div>
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => { playSfx?.("click"); onEarnXp(50); }}
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

        {/* Explorer Logs & Today's Quest Goals (Replaces Graph with Interactive Logs) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 16,
            marginBottom: 24,
          }}
        >
          {/* Quick Log Form + Mission Log */}
          <div
            className="card-panel"
            style={{
              background: "rgba(15, 23, 42, 0.82)",
              backdropFilter: "blur(14px)",
              border: "1px solid rgba(99, 225, 232, 0.28)",
              borderRadius: 20,
              padding: 20,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <h3 style={{ fontSize: 17, fontWeight: 900, margin: 0 }}>📝 Explorer Mission Log</h3>
              <span style={{ fontSize: 11, fontWeight: 800, color: "#63e1e8" }}>+15 XP / LOG</span>
            </div>

            <form onSubmit={handleAddLog} style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
              <select
                value={logCategory}
                onChange={(e) => setLogCategory(e.target.value)}
                style={{
                  background: "rgba(8, 13, 24, 0.85)",
                  color: "#63e1e8",
                  border: "1px solid rgba(99, 225, 232, 0.35)",
                  borderRadius: 12,
                  padding: "9px 10px",
                  fontSize: 12,
                  fontWeight: 800,
                }}
              >
                <option value="LOG">🌊 Ocean Log</option>
                <option value="MATH">🧮 Math Log</option>
                <option value="SPACE">🚀 Space Log</option>
              </select>

              <input
                type="text"
                value={logInput}
                onChange={(e) => setLogInput(e.target.value)}
                placeholder="Write a discovery or quest note..."
                style={{
                  flex: "1 1 170px",
                  background: "rgba(8, 13, 24, 0.85)",
                  color: "#ffffff",
                  border: "1px solid rgba(148, 163, 184, 0.35)",
                  borderRadius: 12,
                  padding: "9px 12px",
                  fontSize: 12.5,
                  outline: "none",
                }}
              />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.94 }}
                style={{
                  background: "linear-gradient(90deg, #22d3ee, #818cf8)",
                  border: "none",
                  color: "#060818",
                  fontWeight: 900,
                  padding: "9px 14px",
                  borderRadius: 12,
                  cursor: "pointer",
                  fontSize: 12,
                }}
              >
                + Add Log
              </motion.button>
            </form>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 220, overflowY: "auto" }}>
              {quickLogs.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10,
                    padding: "10px 12px",
                    borderRadius: 14,
                    background: "rgba(8, 13, 24, 0.65)",
                    border: "1px solid rgba(148, 163, 184, 0.18)",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: "#f8fafc" }}>{item.label}</div>
                    <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>
                      {item.tag} • {item.time}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 900,
                      color: item.done ? "#4ade80" : "#ffdf4e",
                      background: "rgba(15, 23, 42, 0.9)",
                      padding: "4px 9px",
                      borderRadius: 999,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.done ? `✓ +${item.xp} XP` : `+${item.xp} XP`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Quest Checklists & Quick Badges */}
          <div
            className="card-panel"
            style={{
              background: "rgba(15, 23, 42, 0.82)",
              backdropFilter: "blur(14px)",
              border: "1px solid rgba(99, 225, 232, 0.28)",
              borderRadius: 20,
              padding: 20,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <h3 style={{ fontSize: 17, fontWeight: 900, margin: 0 }}>🎯 Today's Quest Goals</h3>
              <img src={badgeIcon} alt="" style={{ width: 24, height: 24, objectFit: "contain" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {quickLogs.slice(0, 4).map((goal) => (
                <motion.button
                  key={`goal-${goal.id}`}
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleToggleGoal(goal)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10,
                    padding: "11px 14px",
                    borderRadius: 14,
                    background: goal.done ? "rgba(20, 83, 45, 0.35)" : "rgba(8, 13, 24, 0.65)",
                    border: goal.done
                      ? "1px solid rgba(74, 222, 128, 0.45)"
                      : "1px solid rgba(99, 225, 232, 0.22)",
                    color: "#ffffff",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 16 }}>{goal.done ? "✅" : "⭕"}</span>
                    <div>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 800,
                          textDecoration: goal.done ? "line-through" : "none",
                          color: goal.done ? "#bbf7d0" : "#f1f5f9",
                        }}
                      >
                        {goal.label}
                      </div>
                      <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>{goal.time}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 11.5, fontWeight: 900, color: "#63e1e8" }}>+{goal.xp} XP</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Access Worlds */}
        <div
          className="card-panel"
          style={{
            background: "rgba(15, 23, 42, 0.82)",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(99, 225, 232, 0.28)",
            borderRadius: 20,
            padding: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <img src={rocketGif} alt="" style={{ width: 26, height: 26, objectFit: "contain" }} />
            <h3 style={{ fontSize: 18, fontWeight: 900, margin: 0 }}>🌌 Biosphere Quest Worlds</h3>
          </div>

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
    </div>
  );
}