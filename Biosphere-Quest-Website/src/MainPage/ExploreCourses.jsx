import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import scienceGif from "../assets/BiosphereQuestAssets/Science gif.gif";
import mathIcon from "../assets/BiosphereQuestAssets/Math Icon.png";
import rocketGif from "../assets/BiosphereQuestAssets/Rocket.gif";

const COURSES = [
  {
    id: "ocean-1",
    title: "Marine Habitats & Food Webs",
    category: "Science • Grades 1–3",
    icon: scienceGif,
    accent: "#38bdf8",
    desc: "Discover how coral reefs, fish, and ocean plants rely on each other in deep-sea ecosystems.",
    modules: ["Coral Reef Basics", "Ocean Zones & Sunlight", "Marine Food Web Chain"],
  },
  {
    id: "math-1",
    title: "Cosmic Fractions & Numbers",
    category: "Math • Grades 3–6",
    icon: mathIcon,
    accent: "#ffdf4e",
    desc: "Master fractions, multiplication meteors, and decimal grids with Astro & Stella.",
    modules: ["Fraction Fuel Beakers", "Multiplying Meteoroids", "Decimal Star Maps"],
  },
  {
    id: "atmos-1",
    title: "Earth Atmosphere & Weather",
    category: "Science • Grades 4–6",
    icon: rocketGif,
    accent: "#c084fc",
    desc: "Explore weather gauges, water cycles, and atmospheric layers across our planet.",
    modules: ["Water Cycle Vapor", "Weather Barometers", "Layers of the Sky"],
  },
];

export default function ExploreCourses({ onEarnXp, playSfx }) {
  const [activeCourse, setActiveCourse] = useState(null);

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, background: "linear-gradient(90deg, #63e1e8, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          📚 Explore Courses & Learning Modules
        </h1>
        <p style={{ fontSize: 13.5, color: "#cbd5e1", marginTop: 4 }}>
          Interactive curriculum-aligned adventures designed for elementary explorers!
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}>
        {COURSES.map((course) => (
          <motion.div
            key={course.id}
            whileHover={{ y: -6, scale: 1.02 }}
            className="card-panel"
            style={{ border: `2px solid ${course.accent}44`, display: "flex", flexDirection: "column", justifyContent: "space-between" }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <img src={course.icon} alt="" style={{ width: 44, height: 44, objectFit: "contain" }} />
                <div>
                  <span style={{ fontSize: 10.5, fontWeight: 900, color: course.accent }}>{course.category}</span>
                  <h3 style={{ fontSize: 18, fontWeight: 900, marginTop: 2 }}>{course.title}</h3>
                </div>
              </div>
              <p style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.5, marginBottom: 16 }}>{course.desc}</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => { playSfx?.("click"); setActiveCourse(course); }}
              style={{
                background: `linear-gradient(90deg, ${course.accent}, #818cf8)`,
                border: "none",
                color: "#060818",
                fontWeight: 900,
                padding: "10px 16px",
                borderRadius: 12,
                cursor: "pointer",
                fontSize: 13,
                width: "100%",
              }}
            >
              Start Learning →
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Course Modules Modal */}
      <AnimatePresence>
        {activeCourse && (
          <div className="modal-backdrop" onClick={() => setActiveCourse(null)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="modal-box"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 8 }}>{activeCourse.title}</h2>
              <p style={{ fontSize: 13, color: "#cbd5e1", marginBottom: 20 }}>Complete all modules to claim +75 XP!</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, textAlign: "left", marginBottom: 22 }}>
                {activeCourse.modules.map((mod, idx) => (
                  <div key={idx} style={{ background: "rgba(15, 23, 42, 0.7)", padding: "12px 16px", borderRadius: 14, border: "1px solid rgba(99, 225, 232, 0.3)", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 13.5, fontWeight: 800 }}>
                    <span>🚀 Module {idx + 1}: {mod}</span>
                    <span style={{ color: "#4ade80" }}>Unlocked</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { onEarnXp(75); setActiveCourse(null); }}
                  style={{ flex: 1, background: "#4ade80", border: "none", color: "#060818", fontWeight: 900, padding: "11px", borderRadius: 12, cursor: "pointer", fontSize: 13.5 }}
                >
                  Complete Module (+75 XP)
                </motion.button>
                <button
                  onClick={() => setActiveCourse(null)}
                  style={{ background: "#334155", border: "none", color: "#fff", fontWeight: 800, padding: "11px 18px", borderRadius: 12, cursor: "pointer" }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}