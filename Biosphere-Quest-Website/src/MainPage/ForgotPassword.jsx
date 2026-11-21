import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";
import logoImg from "../assets/BiosphereQuestAssets/Biosphere Quest Logo.png";

const FORGOT_PASSWORD_CREATURES = [
  { icon: "🪼", top: "68%", duration: 18, delay: 0, size: 30, reverse: false },
  { icon: "🐠", top: "78%", duration: 14, delay: 2, size: 26, reverse: true },
  { icon: "🐢", top: "85%", duration: 22, delay: 4, size: 32, reverse: false },
  { icon: "🦑", top: "73%", duration: 16, delay: 6, size: 28, reverse: true },
];

export default function ForgotPassword({ onNavigate }) {
  const [step, setStep] = useState("request"); // "request" | "verify" | "reset"
  const [email, setEmail] = useState("");
  const [useNumberOtp, setUseNumberOtp] = useState(false);
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [sent, setSent] = useState(false);
  const [infoMsg, setInfoMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [clickBursts, setClickBursts] = useState([]);

  const digitRefs = useRef([]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

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

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setInfoMsg("");

    const trimmedEmail = email.trim();
    const { error } = await supabase.auth.resetPasswordForEmail(trimmedEmail, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setLoading(false);
    if (error) {
      setErrorMsg(error.message);
    } else {
      setSent(true);
      setInfoMsg(
        `Recovery link sent to ${trimmedEmail}. If the recovery link isn't working, you can switch to the 6-digit Number OTP below.`
      );
    }
  };

  const handleSendNumberOtpFallback = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setErrorMsg("Please enter your email address first so we can send the number OTP.");
      return;
    }
    if (loading || cooldown > 0) return;

    setLoading(true);
    setErrorMsg("");
    setInfoMsg("");

    const { error } = await supabase.auth.signInWithOtp({
      email: trimmedEmail,
      options: {
        shouldCreateUser: false,
      },
    });

    setLoading(false);
    if (error) {
      setErrorMsg(error.message);
    } else {
      setUseNumberOtp(true);
      setStep("verify");
      setCooldown(30);
      setInfoMsg(`We sent a 6-digit number OTP to ${trimmedEmail}.`);
      setTimeout(() => {
        digitRefs.current[0]?.focus();
      }, 60);
    }
  };

  const handleDigitChange = (index, rawValue) => {
    const clean = rawValue.replace(/\D/g, "");
    if (!clean) {
      const updated = [...digits];
      updated[index] = "";
      setDigits(updated);
      return;
    }

    if (clean.length > 1) {
      const pasted = clean.slice(0, 6).split("");
      const updated = ["", "", "", "", "", ""];
      pasted.forEach((ch, idx) => {
        updated[idx] = ch;
      });
      setDigits(updated);
      digitRefs.current[Math.min(pasted.length, 5)]?.focus();
      return;
    }

    const updated = [...digits];
    updated[index] = clean;
    setDigits(updated);
    if (index < 5) {
      digitRefs.current[index + 1]?.focus();
    }
  };

  const handleDigitKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      digitRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setInfoMsg("");

    const token = digits.join("").trim();
    if (token.length < 6) {
      setErrorMsg("Please enter all 6 digits of your verification code.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token,
      type: "recovery",
    });

    // Fallback to email OTP verification if project sends numeric email OTP
    let finalError = error;
    if (error) {
      const { error: emailOtpError } = await supabase.auth.verifyOtp({
        email: email.trim(),
        token,
        type: "email",
      });
      finalError = emailOtpError;
    }

    setLoading(false);
    if (finalError) {
      setErrorMsg(finalError.message);
    } else {
      setStep("reset");
      setInfoMsg("Code verified! Create your new password below.");
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setInfoMsg("");

    const hasMinLength = newPassword.length >= 8;
    const hasNumberOrSpecial = /[0-9!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\;/']/.test(
      newPassword
    );

    if (!hasMinLength || !hasNumberOrSpecial) {
      setErrorMsg(
        "Password must be at least 8 characters and include at least 1 number or special character."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg("New password and confirm password do not match.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      setInfoMsg("Password updated successfully! Redirecting to login...");
      setTimeout(() => {
        onNavigate?.("login");
      }, 1200);
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
      {/* Animated Shifting Aurora & Bioluminescent Gradient Overlay */}
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

      {/* Interactive Click Stardust */}
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

      {/* Twinkling Starfield */}
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

      {/* Shooting Comets */}
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

      {/* Pulsing Nebulae */}
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

      {/* Swimming Creatures */}
      {FORGOT_PASSWORD_CREATURES.map((creature, idx) => (
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

      {/* Rising Bubbles */}
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
            opacity: { duration: 3, repeat: Infinity, delay: b.delay },
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
        <img
          src={logoImg}
          alt=""
          style={{ width: 64, height: 64, objectFit: "contain", margin: "0 auto 8px" }}
        />
        <div
          style={{
            fontSize: 28,
            fontWeight: 900,
            background: "linear-gradient(90deg, #3b82f6 0%, #c084fc 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: 12,
          }}
        >
          Biosphere Quest
        </div>

        {step === "request" && (
          <>
            <h1 style={{ fontSize: 26, fontWeight: 900, margin: 0 }}>Forgot Password</h1>
            <p style={{ fontSize: 13.5, color: "#cbd5e1", marginTop: 6, marginBottom: 20 }}>
              Enter your email to receive a recovery code or link
            </p>

            {(sent || infoMsg) && (
              <div
                style={{
                  background: "rgba(74,222,128,0.15)",
                  border: "1px solid #4ade80",
                  color: "#4ade80",
                  padding: 12,
                  borderRadius: 14,
                  fontWeight: 800,
                  fontSize: 12.5,
                  marginBottom: 14,
                }}
              >
                📩 {infoMsg || "Recovery instructions sent! Check your inbox."}
              </div>
            )}

            <form onSubmit={handleReset} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {errorMsg && (
                <div style={{ color: "#f87171", fontSize: 12, fontWeight: 700 }}>{errorMsg}</div>
              )}

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="✉️ Enter your email address"
                className="cosmic-input"
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "14px 18px",
                  borderRadius: 14,
                  border: "none",
                  background: "linear-gradient(90deg, #6366f1 0%, #818cf8 100%)",
                  color: "#ffffff",
                  fontSize: 16,
                  fontWeight: 900,
                  cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: "0 10px 25px rgba(99, 102, 241, 0.35)",
                }}
              >
                {loading ? "Sending..." : "Send Recovery Code"}
              </motion.button>

              <button
                type="button"
                disabled={loading || cooldown > 0}
                onClick={handleSendNumberOtpFallback}
                style={{
                  background: "rgba(30, 41, 59, 0.72)",
                  border: "1px solid rgba(99, 225, 232, 0.4)",
                  color: "#63e1e8",
                  fontWeight: 800,
                  fontSize: 12.5,
                  padding: "10px 12px",
                  borderRadius: 12,
                  cursor: loading || cooldown > 0 ? "not-allowed" : "pointer",
                }}
              >
                {cooldown > 0
                  ? `Recovery link not working? Number OTP sent (${cooldown}s)`
                  : "Recovery link not working? Use 6-Digit Number OTP instead 🔢"}
              </button>
            </form>
          </>
        )}

        {step === "verify" && (
          <>
            <h1 style={{ fontSize: 24, fontWeight: 900, margin: 0 }}>Enter Verification Code</h1>
            <p style={{ fontSize: 13.5, color: "#cbd5e1", marginTop: 6, marginBottom: 18 }}>
              We sent a 6-digit code to your email.
            </p>

            {infoMsg && (
              <div
                style={{
                  background: "rgba(74,222,128,0.15)",
                  border: "1px solid #4ade80",
                  color: "#4ade80",
                  padding: 12,
                  borderRadius: 14,
                  fontWeight: 800,
                  fontSize: 12.5,
                  marginBottom: 14,
                }}
              >
                📬 {infoMsg}
              </div>
            )}

            <form onSubmit={handleVerifyCode} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {errorMsg && (
                <div style={{ color: "#f87171", fontSize: 12, fontWeight: 700 }}>{errorMsg}</div>
              )}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(6, 1fr)",
                  gap: 8,
                }}
              >
                {digits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      digitRefs.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    value={digit}
                    onChange={(e) => handleDigitChange(idx, e.target.value)}
                    onKeyDown={(e) => handleDigitKeyDown(idx, e)}
                    aria-label={`Recovery code digit ${idx + 1}`}
                    style={{
                      height: 54,
                      textAlign: "center",
                      fontSize: 22,
                      fontWeight: 900,
                      color: "#ffffff",
                      background: "rgba(30, 58, 138, 0.45)",
                      border: digit
                        ? "1.5px solid #818cf8"
                        : "1.5px solid rgba(129, 140, 248, 0.35)",
                      borderRadius: 14,
                      outline: "none",
                    }}
                  />
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#94a3b8",
                }}
              >
                <span>Didn&apos;t receive code?</span>
                <button
                  type="button"
                  disabled={loading || cooldown > 0}
                  onClick={handleSendNumberOtpFallback}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    color: cooldown > 0 ? "#cbd5e1" : "#63e1e8",
                    fontWeight: 800,
                    fontSize: 13,
                    cursor: loading || cooldown > 0 ? "not-allowed" : "pointer",
                  }}
                >
                  {cooldown > 0 ? `Resend (${cooldown}s)` : "Resend"}
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "14px 18px",
                  borderRadius: 14,
                  border: "none",
                  background: "linear-gradient(90deg, #6366f1 0%, #818cf8 100%)",
                  color: "#ffffff",
                  fontSize: 16,
                  fontWeight: 900,
                  cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: "0 10px 25px rgba(99, 102, 241, 0.35)",
                }}
              >
                {loading ? "Verifying..." : "Verify Code"}
              </motion.button>
            </form>
          </>
        )}

        {step === "reset" && (
          <>
            <h1 style={{ fontSize: 24, fontWeight: 900, margin: 0 }}>Set New Password</h1>
            <p style={{ fontSize: 13.5, color: "#cbd5e1", marginTop: 6, marginBottom: 18 }}>
              Please create a new password for your account
            </p>

            {infoMsg && (
              <div
                style={{
                  background: "rgba(74,222,128,0.15)",
                  border: "1px solid #4ade80",
                  color: "#4ade80",
                  padding: 12,
                  borderRadius: 14,
                  fontWeight: 800,
                  fontSize: 12.5,
                  marginBottom: 14,
                }}
              >
                ✨ {infoMsg}
              </div>
            )}

            <form
              onSubmit={handleUpdatePassword}
              style={{ display: "flex", flexDirection: "column", gap: 14, textAlign: "left" }}
            >
              {errorMsg && (
                <div style={{ color: "#f87171", fontSize: 12, fontWeight: 700, textAlign: "center" }}>
                  {errorMsg}
                </div>
              )}

              <div>
                <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 6 }}>
                  Enter New Password
                </div>
                <div style={{ position: "relative" }}>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="🔒 •••••••••"
                    className="cosmic-input"
                    style={{ width: "100%", paddingRight: 42, boxSizing: "border-box" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    aria-label="Toggle new password visibility"
                    style={{
                      position: "absolute",
                      right: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      color: "#cbd5e1",
                      cursor: "pointer",
                      fontSize: 14,
                    }}
                  >
                    {showNewPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <div>
                <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 6 }}>
                  Confirm New Password
                </div>
                <div style={{ position: "relative" }}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="🔒 •••••••••"
                    className="cosmic-input"
                    style={{ width: "100%", paddingRight: 42, boxSizing: "border-box" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label="Toggle confirm password visibility"
                    style={{
                      position: "absolute",
                      right: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      color: "#cbd5e1",
                      cursor: "pointer",
                      fontSize: 14,
                    }}
                  >
                    {showConfirmPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <div style={{ fontSize: 12, color: "#cbd5e1", lineHeight: 1.5 }}>
                <div style={{ fontWeight: 800, color: "#ffffff", marginBottom: 2 }}>
                  Password must contain:
                </div>
                <div>• At least 8 characters</div>
                <div>• At least 1 number or special character</div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "14px 18px",
                  borderRadius: 14,
                  border: "none",
                  background: "linear-gradient(90deg, #6366f1 0%, #818cf8 100%)",
                  color: "#ffffff",
                  fontSize: 16,
                  fontWeight: 900,
                  cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: "0 10px 25px rgba(99, 102, 241, 0.35)",
                }}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </motion.button>
            </form>
          </>
        )}

        <div style={{ marginTop: 20 }}>
          <button
            type="button"
            onClick={() => {
              if (step !== "request" && !useNumberOtp) {
                setStep("request");
              } else {
                onNavigate?.("login");
              }
            }}
            className="back-btn"
            style={{ background: "none", border: "none" }}
          >
            ← Back to Login
          </button>
        </div>
      </motion.div>
    </div>
  );
}