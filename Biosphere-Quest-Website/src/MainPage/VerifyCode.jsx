import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";
import logoImg from "../assets/BiosphereQuestAssets/Biosphere Quest Logo.png";

const VERIFY_CODE_CREATURES = [
  { icon: "🪼", top: "68%", duration: 18, delay: 0, size: 30, reverse: false },
  { icon: "🐠", top: "78%", duration: 14, delay: 2, size: 26, reverse: true },
  { icon: "🐢", top: "85%", duration: 22, delay: 4, size: 32, reverse: false },
  { icon: "🦑", top: "73%", duration: 16, delay: 6, size: 28, reverse: true },
];

export default function VerifyCode({ email = "", onNavigate, onVerified }) {
  const [targetEmail, setTargetEmail] = useState(email);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [otpSentMsg, setOtpSentMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [clickBursts, setClickBursts] = useState([]);

  const stars = useMemo(
    () =>
      Array.from({ length: 55 }, (_, i) => ({
        id: i,
        left: `${(i * 31 + 7) % 100}%`,
        top: `${(i * 43 + 11) % 68}%`,
        size: (i % 3) + 2,
        duration: 1.6 + (i % 4) * 0.5,
        delay: (i % 6) * 0.3,
      })),
    []
  );

  const bubbles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: `${(i * 17 + 4) % 96}%`,
        size: 6 + (i % 4) * 6,
        duration: 5.5 + (i % 5) * 1.4,
        delay: (i % 7) * 0.6,
        sway: i % 2 === 0 ? 18 : -18,
      })),
    []
  );

  const shootingStars = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        top: `${(i * 7 + 3) % 45}%`,
        left: `${(i * 13 + 5) % 85}%`,
        delay: (i * 0.35) % 12,
        duration: 1.6 + (i % 5) * 0.35,
        angle: 35 + ((i * 7) % 20),
      })),
    []
  );

  const handleScreenClick = (e) => {
    const id = Date.now() + Math.random();
    const icons = ["✨", "🫧", "⭐", "💫", "🐚"];
    const burst = {
      id,
      x: e.clientX,
      y: e.clientY,
      particles: Array.from({ length: 6 }, (_, idx) => ({
        icon: icons[(idx + Math.floor(Math.random() * 5)) % icons.length],
        angle: idx * 60 * (Math.PI / 180),
        dist: 35 + Math.random() * 30,
      })),
    };
    setClickBursts((prev) => [...prev.slice(-6), burst]);
    setTimeout(() => {
      setClickBursts((prev) => prev.filter((b) => b.id !== id));
    }, 900);
  };

  const handleSendOtp = async () => {
    const trimmedEmail = targetEmail.trim();
    if (!trimmedEmail) {
      setErrorMsg("Please enter your registered email address first.");
      return;
    }

    setSendingOtp(true);
    setErrorMsg("");
    setOtpSentMsg("");

    const { error } = await supabase.auth.signInWithOtp({
      email: trimmedEmail,
      options: {
        shouldCreateUser: false,
      },
    });

    setSendingOtp(false);
    if (error) {
      setErrorMsg(error.message);
    } else {
      setOtpSentMsg(`Numeric OTP sent to ${trimmedEmail}! Check your inbox.`);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setOtpSentMsg("");

    const trimmedEmail = targetEmail.trim();
    const trimmedCode = code.trim();

    const { data, error } = await supabase.auth.verifyOtp({
      email: trimmedEmail,
      token: trimmedCode,
      type: "email",
    });

    let profile = null;
    if (!error && data?.user) {
      const resolvedName =
        data.user.user_metadata?.full_name || data.user.email?.split("@")[0] || "Explorer";

      const { data: upserted } = await supabase
        .from("profiles")
        .upsert(
          {
            id: data.user.id,
            full_name: resolvedName,
            email: data.user.email,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "id" }
        )
        .select()
        .single();

      profile = upserted || null;
    }

    setLoading(false);
    if (error) {
      setErrorMsg(error.message);
    } else {
      onVerified?.({ user: data?.user, profile });
      onNavigate?.("dashboard");
    }
  };

  return (
    <div
      onClick={handleScreenClick}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(180deg, #060818 0%, #191247 26%, #13255c 52%, #094566 78%, #06637a 100%)",
        color: "#ffffff",
        fontFamily: "'Nunito', 'Segoe UI', system-ui, sans-serif",
        padding: 20,
        cursor: "crosshair",
      }}
    >
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

      <AnimatePresence>
        {clickBursts.map((burst) => (
          <div
            key={burst.id}
            style={{
              position: "fixed",
              left: burst.x,
              top: burst.y,
              pointerEvents: "none",
              zIndex: 50,
            }}
          >
            {burst.particles.map((p, idx) => (
              <motion.span
                key={idx}
                initial={{ x: 0, y: 0, scale: 0.4, opacity: 1 }}
                animate={{
                  x: Math.cos(p.angle) * p.dist,
                  y: Math.sin(p.angle) * p.dist - 15,
                  scale: 1.2,
                  opacity: 0,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.75, ease: "easeOut" }}
                style={{ position: "absolute", fontSize: 16 }}
              >
                {p.icon}
              </motion.span>
            ))}
          </div>
        ))}
      </AnimatePresence>

      {stars.map((star) => (
        <motion.span
          key={`star-${star.id}`}
          animate={{
            opacity: [0.15, 1, 0.15],
            scale: [0.7, 1.5, 0.7],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            borderRadius: "50%",
            backgroundColor:
              star.id % 3 === 0 ? "#63e1e8" : star.id % 5 === 0 ? "#ffdf4e" : "#ffffff",
            boxShadow: "0 0 10px rgba(99, 225, 232, 0.9)",
            pointerEvents: "none",
          }}
        />
      ))}

      {shootingStars.map((comet) => (
        <motion.div
          key={`comet-${comet.id}`}
          initial={{ x: -60, y: -60, opacity: 0 }}
          animate={{ x: 350, y: 350, opacity: [0, 1, 1, 0] }}
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
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: -4,
              top: -6,
              fontSize: 14,
              filter: "drop-shadow(0 0 8px #fff)",
            }}
          >
            🌠
          </span>
        </motion.div>
      ))}

      <motion.div
        animate={{ scale: [1, 1.25, 1], x: [0, 25, 0], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: -80,
          right: -60,
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: "radial-gradient(circle, #8b5cf6, transparent 70%)",
          filter: "blur(45px)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], x: [0, -25, 0], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          bottom: -80,
          left: -60,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, #22d3ee, transparent 70%)",
          filter: "blur(45px)",
          pointerEvents: "none",
        }}
      />

      {VERIFY_CODE_CREATURES.map((creature, idx) => (
        <motion.div
          key={`creature-${idx}`}
          initial={{ x: creature.reverse ? "105vw" : "-10vw" }}
          animate={{
            x: creature.reverse ? "-10vw" : "105vw",
            y: [-10, 12, -10],
          }}
          transition={{
            x: {
              duration: creature.duration,
              repeat: Infinity,
              delay: creature.delay,
              ease: "linear",
            },
            y: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{
            position: "absolute",
            top: creature.top,
            fontSize: creature.size,
            filter: "drop-shadow(0 0 12px rgba(56, 189, 248, 0.7))",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          {creature.icon}
        </motion.div>
      ))}

      {bubbles.map((b) => (
        <motion.span
          key={`bubble-${b.id}`}
          initial={{ y: "105vh", x: 0, opacity: 0 }}
          animate={{
            y: "-10vh",
            x: [0, b.sway, -b.sway, 0],
            opacity: [0, 0.65, 0.65, 0],
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
            background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.5), transparent)",
            pointerEvents: "none",
          }}
        />
      ))}

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="card-panel"
        style={{
          maxWidth: 420,
          width: "100%",
          textAlign: "center",
          padding: 36,
          position: "relative",
          zIndex: 2,
          background: "linear-gradient(145deg, rgba(15, 23, 42, 0.82), rgba(23, 37, 84, 0.72))",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(99, 225, 232, 0.35)",
          borderRadius: 24,
          boxShadow: "0 18px 45px rgba(0, 0, 0, 0.45)",
        }}
      >
        <img src={logoImg} alt="" style={{ width: 52, height: 52, objectFit: "contain", margin: "0 auto 12px" }} />
        <h1 style={{ fontSize: 24, fontWeight: 900 }}>Enter Verification Code</h1>
        <p style={{ fontSize: 13, color: "#cbd5e1", marginTop: 6, marginBottom: 20 }}>
          Send or enter the numeric OTP sent to your registered email to verify your explorer account.
        </p>

        {otpSentMsg && (
          <div style={{ background: "rgba(74,222,128,0.15)", border: "1px solid #4ade80", color: "#4ade80", padding: 12, borderRadius: 14, fontWeight: 800, fontSize: 12.5, marginBottom: 14 }}>
            📬 {otpSentMsg}
          </div>
        )}

        <form onSubmit={handleVerify} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {errorMsg && <div style={{ color: "#f87171", fontSize: 12, fontWeight: 700 }}>{errorMsg}</div>}
          <input
            type="email"
            required
            value={targetEmail}
            onChange={(e) => setTargetEmail(e.target.value)}
            placeholder="you@gmail.com"
            className="cosmic-input"
          />
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            required
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            placeholder="6-digit number OTP..."
            className="cosmic-input"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            disabled={sendingOtp}
            onClick={handleSendOtp}
            style={{
              background: "rgba(30, 41, 59, 0.8)",
              border: "1px solid rgba(99, 225, 232, 0.45)",
              color: "#63e1e8",
              fontWeight: 800,
              padding: "10px 14px",
              borderRadius: 12,
              cursor: "pointer",
              fontSize: 12.5,
            }}
          >
            {sendingOtp ? "Sending OTP..." : "Send Number OTP to Email 🔢"}
          </motion.button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} type="submit" disabled={loading} className="primary-btn">
            {loading ? "Verifying..." : "Verify Code ✨"}
          </motion.button>
        </form>

        <div style={{ marginTop: 20 }}>
          <button onClick={() => onNavigate?.("login")} className="back-btn" style={{ background: "none", border: "none" }}>
            ← Back to Login
          </button>
        </div>
      </motion.div>
    </div>
  );
}