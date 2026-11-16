import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";
import badgeIcon from "../assets/BiosphereQuestAssets/Badge Icon.png";
import streakIcon from "../assets/BiosphereQuestAssets/Streak Icon.png";
import astroImg from "../assets/BiosphereQuestAssets/Astro (Biosphere Quest Mascot).png";

export default function ProfilePage({ explorer, session, onUpdateExplorer, onLogout }) {
  const [name, setName] = useState(explorer.name);
  const [grade, setGrade] = useState(explorer.grade);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const updated = { ...explorer, name, grade };
    onUpdateExplorer(updated);

    if (session?.user?.id) {
      await supabase
        .from("profiles")
        .update({ username: name, grade })
        .eq("id", session.user.id);
    }

    setSaving(false);
    setMessage("✨ Explorer Profile Updated Successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, background: "linear-gradient(90deg, #63e1e8, #ffdf4e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          🪪 Explorer Passport & Profile
        </h1>
        <p style={{ fontSize: 13.5, color: "#cbd5e1", marginTop: 4 }}>Manage your Biosphere Quest identity and settings.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="card-panel">
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24, flexWrap: "wrap" }}>
          <img
            src={astroImg}
            alt="Avatar"
            style={{ width: 80, height: 80, objectFit: "contain", background: "rgba(56,189,248,0.15)", borderRadius: 20, padding: 10, border: "2px solid #38bdf8" }}
          />
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 900 }}>{explorer.name}</h2>
            <p style={{ fontSize: 13, color: "#38bdf8", fontWeight: 800 }}>Level {explorer.level} Space Explorer • Grade {explorer.grade}</p>
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <span className="xp-badge">⭐ {explorer.xp} XP</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "rgba(255,223,78,0.15)", border: "1px solid rgba(255,223,78,0.4)", color: "#ffdf4e", padding: "4px 10px", borderRadius: 999, fontSize: 11.5, fontWeight: 900 }}>
                <img src={streakIcon} alt="" style={{ width: 14, height: 14 }} /> {explorer.streak}d Streak
              </span>
            </div>
          </div>
        </div>

        {message && (
          <div style={{ background: "rgba(74,222,128,0.15)", border: "1px solid #4ade80", color: "#4ade80", padding: "10px 14px", borderRadius: 12, fontSize: 13, fontWeight: 800, marginBottom: 16, textAlign: "center" }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 800, color: "#38bdf8", marginBottom: 6 }}>Explorer Nickname</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="cosmic-input"
              required
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 800, color: "#38bdf8", marginBottom: 6 }}>Grade Level (1–6)</label>
            <select
              value={grade}
              onChange={(e) => setGrade(Number(e.target.value))}
              className="cosmic-input"
              style={{ background: "#080d18" }}
            >
              {[1, 2, 3, 4, 5, 6].map((g) => (
                <option key={g} value={g}>Grade {g}</option>
              ))}
            </select>
          </div>

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} type="submit" className="primary-btn">
            {saving ? "Saving Changes..." : "Save Passport Changes 🚀"}
          </motion.button>
        </form>

        <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.1)", textAlign: "center" }}>
          <button
            onClick={onLogout}
            style={{ background: "rgba(239,68,68,0.2)", border: "1px solid rgba(239,68,68,0.5)", color: "#fca5a5", padding: "10px 20px", borderRadius: 12, fontWeight: 900, cursor: "pointer", fontSize: 13 }}
          >
            Log Out of Account 🚪
          </button>
        </div>
      </motion.div>
    </div>
  );
}