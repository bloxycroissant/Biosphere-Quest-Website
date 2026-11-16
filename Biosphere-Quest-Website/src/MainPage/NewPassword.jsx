import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";
import logoImg from "../assets/BiosphereQuestAssets/Biosphere Quest Logo.png";

export default function NewPassword({ onNavigate, onPasswordUpdated }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.updateUser({ password });

    setLoading(false);
    if (error) {
      setErrorMsg(error.message);
    } else {
      onPasswordUpdated?.();
      onNavigate("home");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#070918", padding: 20 }}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card-panel" style={{ maxWidth: 420, width: "100%", textAlign: "center", padding: 36 }}>
        <img src={logoImg} alt="" style={{ width: 52, height: 52, objectFit: "contain", margin: "0 auto 12px" }} />
        <h1 style={{ fontSize: 24, fontWeight: 900 }}>Set New Password</h1>
        <p style={{ fontSize: 13, color: "#cbd5e1", marginTop: 6, marginBottom: 20 }}>Enter your new secure password below.</p>

        <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {errorMsg && <div style={{ color: "#f87171", fontSize: 12, fontWeight: 700 }}>{errorMsg}</div>}
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New secure password..."
            className="cosmic-input"
          />
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} type="submit" disabled={loading} className="primary-btn">
            {loading ? "Updating..." : "Update Password 🔒"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}