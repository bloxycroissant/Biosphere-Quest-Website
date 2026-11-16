import { useState } from "react";
import { motion } from "framer-motion";
import gamesGif from "../assets/BiosphereQuestAssets/Games Icon.gif";
import mathIcon from "../assets/BiosphereQuestAssets/Math Icon.png";
import rocketGif from "../assets/BiosphereQuestAssets/Rocket.gif";
import scienceGif from "../assets/BiosphereQuestAssets/Science gif.gif";

// Safely import mini-games (supporting both default and named exports)
import * as CodebreakerMod from "../components/MinigamesPage/CodebreakerGame";
import * as ConstellationMod from "../components/MinigamesPage/ConstellationConnectGame";
import * as FlashcardMod from "../components/MinigamesPage/FlashcardGame";
import * as FossilMod from "../components/MinigamesPage/Fossil&PlanetDiggerGame";
import * as GarbageMod from "../components/MinigamesPage/GalacticGarbageSorterGame";
import * as GravityMod from "../components/MinigamesPage/GravitySlingshotGame";
import * as QuizMod from "../components/MinigamesPage/Math&ScienceQuizGame";
import * as MemoryMod from "../components/MinigamesPage/MemoryMatchGame";
import * as NinjaMod from "../components/MinigamesPage/NumberNinjaGame";
import * as PotionMod from "../components/MinigamesPage/PotionMix-Up";
import * as CircuitMod from "../components/MinigamesPage/StarlightCircuitBuilder";
import * as SudokuMod from "../components/MinigamesPage/SudokuGame";
import * as WeatherMod from "../components/MinigamesPage/WeatherStationForecaster";
import * as WhackMod from "../components/MinigamesPage/WhackANumberGame";
import * as WordMod from "../components/MinigamesPage/WordScrambleGame";

const getComponent = (mod, fallbackName) => {
  if (mod.default) return mod.default;
  const foundKey = Object.keys(mod).find((k) => k !== "default");
  if (foundKey) return mod[foundKey];
  return () => (
    <div style={{ textAlign: "center", padding: 40 }}>
      <h3>🚀 {fallbackName}</h3>
      <p style={{ color: "#cbd5e1", marginTop: 8 }}>Mini-game component ready for play!</p>
    </div>
  );
};

const ARCADE_GAMES = [
  { id: "quiz", title: "Math & Science Quiz", category: "Quiz & Trivia", component: getComponent(QuizMod, "Math & Science Quiz"), icon: mathIcon, accent: "#38bdf8" },
  { id: "potion", title: "Potion Mix-Up", category: "Math & Fractions", component: getComponent(PotionMod, "Potion Mix-Up"), icon: scienceGif, accent: "#4ade80" },
  { id: "fossil", title: "Fossil & Planet Digger", category: "Earth & Space", component: getComponent(FossilMod, "Fossil & Planet Digger"), icon: rocketGif, accent: "#ffdf4e" },
  { id: "word", title: "Word Scramble", category: "Vocabulary", component: getComponent(WordMod, "Word Scramble"), icon: gamesGif, accent: "#c084fc" },
  { id: "memory", title: "Memory Match", category: "Puzzle", component: getComponent(MemoryMod, "Memory Match"), icon: mathIcon, accent: "#38bdf8" },
  { id: "garbage", title: "Galactic Garbage Sorter", category: "Ecology", component: getComponent(GarbageMod, "Galactic Garbage Sorter"), icon: scienceGif, accent: "#4ade80" },
  { id: "ninja", title: "Number Ninja", category: "Speed Math", component: getComponent(NinjaMod, "Number Ninja"), icon: mathIcon, accent: "#ffdf4e" },
  { id: "weather", title: "Weather Station", category: "Science", component: getComponent(WeatherMod, "Weather Station"), icon: rocketGif, accent: "#c084fc" },
  { id: "whack", title: "Whack-A-Number", category: "Reflex Math", component: getComponent(WhackMod, "Whack-A-Number"), icon: mathIcon, accent: "#38bdf8" },
  { id: "flash", title: "Flashcard Challenge", category: "Study", component: getComponent(FlashcardMod, "Flashcard Challenge"), icon: gamesGif, accent: "#4ade80" },
  { id: "circuit", title: "Starlight Circuit Builder", category: "Logic", component: getComponent(CircuitMod, "Starlight Circuit Builder"), icon: scienceGif, accent: "#ffdf4e" },
  { id: "gravity", title: "Gravity Slingshot", category: "Physics", component: getComponent(GravityMod, "Gravity Slingshot"), icon: rocketGif, accent: "#c084fc" },
  { id: "sudoku", title: "Cosmic Sudoku", category: "Logic", component: getComponent(SudokuMod, "Cosmic Sudoku"), icon: mathIcon, accent: "#38bdf8" },
  { id: "constellation", title: "Constellation Connect", category: "Astronomy", component: getComponent(ConstellationMod, "Constellation Connect"), icon: scienceGif, accent: "#4ade80" },
  { id: "code", title: "Codebreaker Vault", category: "Logic & Math", component: getComponent(CodebreakerMod, "Codebreaker Vault"), icon: gamesGif, accent: "#ffdf4e" },
];

export default function GamesArcade({ onEarnXp, playSfx }) {
  const [selectedGame, setSelectedGame] = useState(null);

  if (selectedGame) {
    const ActiveGameComponent = selectedGame.component;
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <button
            onClick={() => setSelectedGame(null)}
            style={{ background: "#1e293b", border: "1px solid rgba(99,225,232,0.4)", color: "#63e1e8", padding: "8px 16px", borderRadius: 12, fontWeight: 900, cursor: "pointer" }}
          >
            ← Back to Arcade
          </button>
          <div style={{ fontSize: 16, fontWeight: 900, color: "#ffdf4e" }}>🎮 Playing: {selectedGame.title}</div>
        </div>

        <div className="card-panel" style={{ minHeight: 450, padding: 30 }}>
          <ActiveGameComponent onWin={() => { onEarnXp(50); playSfx?.("levelup"); }} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, background: "linear-gradient(90deg, #22d3ee, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          🎮 Cosmic Holo-Deck Arcade
        </h1>
        <p style={{ fontSize: 13.5, color: "#cbd5e1", marginTop: 4 }}>
          Choose from 15+ interactive educational mini-games to earn XP and level up!
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
        {ARCADE_GAMES.map((game) => (
          <motion.div
            key={game.id}
            whileHover={{ y: -6, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { playSfx?.("click"); setSelectedGame(game); }}
            className="card-panel"
            style={{ border: `2px solid ${game.accent}44`, cursor: "pointer", textAlign: "center", padding: 22 }}
          >
            <img src={game.icon} alt="" style={{ width: 48, height: 48, objectFit: "contain", margin: "0 auto 10px" }} />
            <span style={{ fontSize: 10, fontWeight: 900, color: game.accent }}>{game.category}</span>
            <h3 style={{ fontSize: 16, fontWeight: 900, marginTop: 4 }}>{game.title}</h3>
            <span style={{ display: "inline-block", marginTop: 12, fontSize: 12, fontWeight: 900, color: "#4ade80" }}>
              Play & Win +50 XP 🚀
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}