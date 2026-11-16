import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";
import logoImg from "../assets/BiosphereQuestAssets/Biosphere Quest Logo.png";

export default function ForgotPassword({ onNavigate }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSent(true);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#070918", padding: 20 }}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card-panel" style={{ maxWidth: 420, width: "100%", textAlign: "center", padding: 36 }}>
        <img src={logoImg} alt="" style={{ width: 52, height: 52, objectFit: "contain", margin: "0 auto 12px" }} />
        <h1 style={{ fontSize: 24, fontWeight: 900 }}>Reset Password</h1>
        <p style={{ fontSize: 13, color: "#cbd5e1", marginTop: 6, marginBottom: 20 }}>Enter your explorer email to receive a recovery link.</p>

        {sent ? (
          <div style={{ background: "rgba(74,222,128,0.15)", border: "1px solid #4ade80", color: "#4ade80", padding: 14, borderRadius: 14, fontWeight: 800, fontSize: 13.5 }}>
            📬 Password recovery email sent! Check your inbox.
          </div>
        ) : (
          <form onSubmit={handleReset} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {errorMsg && <div style={{ color: "#f87171", fontSize: 12, fontWeight: 700 }}>{errorMsg}</div>}
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@gmail.com"
              className="cosmic-input"
            />
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} type="submit" className="primary-btn">
              Send Recovery Link 🚀
            </motion.button>
          </form>
        )}

        <div style={{ marginTop: 20 }}>
          <button onClick={() => onNavigate("login")} className="back-btn" style={{ background: "none", border: "none" }}>
            ← Back to Login
          </button>
        </div>
      </motion.div>
    </div>
  );
}