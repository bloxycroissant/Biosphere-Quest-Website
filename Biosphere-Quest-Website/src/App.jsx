import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "./lib/supabase";

// Main Pages (src/MainPage/)
import SplashStarScreen from "./MainPage/SplashStarScreen";
import WelcomeWizard from "./MainPage/WelcomeWizard";
import Login from "./MainPage/Login";
import SignUp from "./MainPage/SignUp";
import ForgotPassword from "./MainPage/ForgotPassword";
import NewPassword from "./MainPage/NewPassword";
import HomeDashboard from "./MainPage/HomeDashboard";
import ExploreCourses from "./MainPage/ExploreCourses";
import GamesArcade from "./MainPage/GamesArcade";
import ProfilePage from "./MainPage/ProfilePage";

// Official Assets
import logoImg from "./assets/BiosphereQuestAssets/Biosphere Quest Logo.png";
import homeIcon from "./assets/BiosphereQuestAssets/Home Icon.png";
import coursesIcon from "./assets/BiosphereQuestAssets/Courses Icon.png";
import gamesGif from "./assets/BiosphereQuestAssets/Games Icon.gif";
import profileIcon from "./assets/BiosphereQuestAssets/Profile Icon.png";
import streakIcon from "./assets/BiosphereQuestAssets/Streak Icon.png";

import "./App.css";

const DEFAULT_EXPLORER = {
  id: null,
  name: "Space Explorer",
  role: "student",
  companion: "astro",
  grade: 3,
  favoriteWorld: "ocean",
  xp: 100,
  level: 1,
  streak: 1,
};

export default function App() {
  // Screen flow: "splash" | "wizard" | "login" | "signup" | "forgot" | "newpassword" | "home" | "courses" | "games" | "profile"
  const [screen, setScreen] = useState("splash");
  const [session, setSession] = useState(null);
  const [explorer, setExplorer] = useState(DEFAULT_EXPLORER);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [xpToast, setXpToast] = useState(null);

  // Lightweight Web Audio synth for UI & Mini-Game Sound Effects
  const playSfx = useCallback(
    (type = "click") => {
      if (!soundEnabled) return;
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        const now = ctx.currentTime;
        if (type === "correct" || type === "levelup") {
          osc.type = "triangle";
          osc.frequency.setValueAtTime(523.25, now); // C5
          osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
          osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
          gain.gain.setValueAtTime(0.14, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
          osc.start(now);
          osc.stop(now + 0.35);
        } else if (type === "wrong") {
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(190, now);
          osc.frequency.linearRampToValueAtTime(130, now + 0.25);
          gain.gain.setValueAtTime(0.12, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
          osc.start(now);
          osc.stop(now + 0.28);
        } else {
          osc.type = "sine";
          osc.frequency.setValueAtTime(440, now);
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
          osc.start(now);
          osc.stop(now + 0.1);
        }
      } catch {
        // Ignore audio autoplay blocks before user gesture
      }
    },
    [soundEnabled]
  );

  // Load Supabase Profile when a user is authenticated
  const fetchOrCreateProfile = useCallback(async (user) => {
    if (!user) return;
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (data && !error) {
      setExplorer((prev) => ({
        ...prev,
        id: user.id,
        name: data.username || data.full_name || user.email?.split("@")[0] || prev.name,
        role: data.role || prev.role,
        grade: data.grade || prev.grade,
        xp: data.xp ?? prev.xp,
        level: data.level ?? Math.floor((data.xp ?? 100) / 250) + 1,
        streak: data.streak ?? prev.streak,
      }));
    } else {
      // Seed initial profile row if not yet created
      const starterName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Space Explorer";
      await supabase.from("profiles").upsert({
        id: user.id,
        username: starterName,
        xp: 100,
        level: 1,
        streak: 1,
      });
      setExplorer((prev) => ({ ...prev, id: user.id, name: starterName }));
    }
  }, []);

  // Listen to Supabase Auth Session & Password Recovery events
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      if (currentSession?.user) {
        fetchOrCreateProfile(currentSession.user);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession);
      if (event === "PASSWORD_RECOVERY") {
        setScreen("newpassword");
      } else if (event === "SIGNED_IN" && newSession?.user) {
        fetchOrCreateProfile(newSession.user);
        setScreen("home");
      } else if (event === "SIGNED_OUT") {
        setExplorer(DEFAULT_EXPLORER);
        setScreen("login");
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchOrCreateProfile]);

  // Add XP and sync to Supabase
  const addXp = async (amount = 50) => {
    playSfx("correct");
    const newXp = (explorer.xp || 0) + amount;
    const newLevel = Math.floor(newXp / 250) + 1;

    setExplorer((prev) => ({
      ...prev,
      xp: newXp,
      level: newLevel,
    }));

    setXpToast(`+${amount} XP Earned! 🌟`);
    setTimeout(() => setXpToast(null), 2400);

    if (session?.user?.id) {
      await supabase
        .from("profiles")
        .update({ xp: newXp, level: newLevel })
        .eq("id", session.user.id);
    }
  };

  // Handle completing the WelcomeWizard
  const handleWizardComplete = async (wizardData) => {
    playSfx("levelup");
    const updated = {
      ...explorer,
      name: wizardData.name || explorer.name,
      role: wizardData.role || explorer.role,
      companion: wizardData.companion || explorer.companion,
      grade: wizardData.grade || explorer.grade,
      favoriteWorld: wizardData.favoriteWorld || explorer.favoriteWorld,
      xp: (explorer.xp || 0) + (wizardData.starterXp || 100),
    };
    setExplorer(updated);

    if (session?.user?.id) {
      await supabase
        .from("profiles")
        .update({
          username: updated.name,
          role: updated.role,
          grade: updated.grade,
          xp: updated.xp,
        })
        .eq("id", session.user.id);
    }

    setScreen("home");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setScreen("splash");
  };

  // Full-screen screens (no top navigation bar)
  if (screen === "splash") {
    return <SplashStarScreen onEnterApp={() => setScreen("wizard")} />;
  }

  if (screen === "wizard") {
    return (
      <WelcomeWizard
        onBackToSplash={() => setScreen("splash")}
        onComplete={handleWizardComplete}
      />
    );
  }

  if (screen === "login") {
    return (
      <Login
        onNavigate={setScreen}
        onLoginSuccess={() => setScreen("home")}
      />
    );
  }

  if (screen === "signup") {
    return (
      <SignUp
        onNavigate={setScreen}
        onSignUpSuccess={() => setScreen("wizard")}
      />
    );
  }

  if (screen === "forgot") {
    return <ForgotPassword onNavigate={setScreen} />;
  }

  if (screen === "newpassword") {
    return (
      <NewPassword
        onNavigate={setScreen}
        onPasswordUpdated={() => setScreen("home")}
      />
    );
  }

  // Main Authenticated / Preview App Shell
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #060818 0%, #11183c 45%, #082f49 100%)",
        color: "#ffffff",
        fontFamily: "'Nunito', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* Floating XP Gain Toast */}
      <AnimatePresence>
        {xpToast && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.85 }}
            style={{
              position: "fixed",
              top: 78,
              right: 20,
              zIndex: 100,
              background: "linear-gradient(90deg, #22d3ee, #818cf8)",
              color: "#060818",
              fontWeight: 900,
              fontSize: 13,
              padding: "10px 18px",
              borderRadius: 999,
              boxShadow: "0 10px 28px rgba(34, 211, 238, 0.55)",
            }}
          >
            {xpToast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glassmorphism Top Navigation Bar */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          background: "rgba(8, 13, 24, 0.82)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(99, 225, 232, 0.25)",
          padding: "10px 20px",
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          {/* Brand Logo */}
          <div
            onClick={() => setScreen("home")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
            }}
          >
            <img
              src={logoImg}
              alt="Biosphere Quest"
              style={{ width: 38, height: 38, objectFit: "contain" }}
            />
            <div>
              <div
                style={{
                  fontWeight: 900,
                  fontSize: 16,
                  background: "linear-gradient(90deg, #63e1e8, #c084fc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Biosphere Quest
              </div>
              <div style={{ fontSize: 10.5, color: "#94a3b8", fontWeight: 800 }}>
                Lv. {explorer.level} • {explorer.xp} XP
              </div>
            </div>
          </div>

          {/* Primary Navigation Links */}
          <nav style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            {[
              { id: "home", label: "Home", icon: homeIcon },
              { id: "courses", label: "Courses", icon: coursesIcon },
              { id: "games", label: "Arcade", icon: gamesGif },
              { id: "profile", label: "Profile", icon: profileIcon },
            ].map((nav) => {
              const active = screen === nav.id;
              return (
                <motion.button
                  key={nav.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => {
                    playSfx("click");
                    setScreen(nav.id);
                  }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 14px",
                    borderRadius: 12,
                    border: active
                      ? "1.5px solid #63e1e8"
                      : "1px solid rgba(148, 163, 184, 0.2)",
                    background: active
                      ? "linear-gradient(135deg, rgba(2, 132, 199, 0.45), rgba(124, 58, 237, 0.45))"
                      : "rgba(15, 23, 42, 0.6)",
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: 12.5,
                    cursor: "pointer",
                  }}
                >
                  <img src={nav.icon} alt="" style={{ width: 18, height: 18, objectFit: "contain" }} />
                  {nav.label}
                </motion.button>
              );
            })}
          </nav>

          {/* Right Status: Streak, Sound Toggle & Auth Action */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                background: "rgba(255, 223, 78, 0.14)",
                border: "1px solid rgba(255, 223, 78, 0.4)",
                color: "#ffdf4e",
                padding: "5px 10px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 900,
              }}
            >
              <img src={streakIcon} alt="Streak" style={{ width: 16, height: 16 }} />
              {explorer.streak}d
            </span>

            <button
              onClick={() => setSoundEnabled((s) => !s)}
              title="Toggle Sound Effects"
              style={{
                background: "rgba(30, 41, 59, 0.7)",
                border: "1px solid rgba(148, 163, 184, 0.25)",
                color: "#fff",
                borderRadius: 10,
                padding: "6px 10px",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              {soundEnabled ? "🔊" : "🔇"}
            </button>

            {session ? (
              <button
                onClick={handleLogout}
                style={{
                  background: "rgba(239, 68, 68, 0.2)",
                  border: "1px solid rgba(239, 68, 68, 0.5)",
                  color: "#fca5a5",
                  borderRadius: 10,
                  padding: "6px 12px",
                  fontSize: 12,
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Log Out
              </button>
            ) : (
              <button
                onClick={() => setScreen("login")}
                style={{
                  background: "linear-gradient(90deg, #22d3ee, #818cf8)",
                  border: "none",
                  color: "#060818",
                  borderRadius: 10,
                  padding: "6px 14px",
                  fontSize: 12,
                  fontWeight: 900,
                  cursor: "pointer",
                }}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Active Page Content */}
      <main style={{ maxWidth: 1120, margin: "0 auto", padding: "24px 16px 60px" }}>
        {screen === "home" && (
          <HomeDashboard
            explorer={explorer}
            user={explorer}
            onNavigate={setScreen}
            onEarnXp={addXp}
            playSfx={playSfx}
          />
        )}

        {screen === "courses" && (
          <ExploreCourses
            explorer={explorer}
            user={explorer}
            onNavigate={setScreen}
            onEarnXp={addXp}
            playSfx={playSfx}
          />
        )}

        {screen === "games" && (
          <GamesArcade
            explorer={explorer}
            user={explorer}
            onNavigate={setScreen}
            onEarnXp={addXp}
            playSfx={playSfx}
          />
        )}

        {screen === "profile" && (
          <ProfilePage
            explorer={explorer}
            user={explorer}
            session={session}
            onUpdateExplorer={setExplorer}
            onNavigate={setScreen}
            onLogout={handleLogout}
          />
        )}
      </main>
    </div>
  );
}