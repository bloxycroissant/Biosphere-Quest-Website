# 🌱 Biosphere Quest: Educational Web Application

> *A personal, interactive browser-based educational web application designed and built to give elementary students a window into learning through mathematics, science, and environmental education aligned with the Philippine Department of Education's official DepEd MATATAG Curriculum (Grades 1 to 6).*

## 📖 Table of Contents

 1. [Overview](#-overview)
 2. [Project Background & Creator](#-project-background--creator)
 3. [Educational Framework & Philosophy](#-educational-framework--philosophy)
 4. [Complete Web App & Game Mechanics](#-complete-web-app--game-mechanics)
 5. [The 15 Mini-Games Suite](#-the-15-mini-games-suite)
 6. [Mascot Companions & Unlockable Badges](#-mascot-companions--unlockable-badges)
 7. [Progression, Mastery Logic & Scoring Rules](#-progression-mastery-logic--scoring-rules)
 8. [Web App Rules & Guidelines](#-web-app-rules--guidelines)
 9. [Technical Architecture & Tech Stack](#-technical-architecture--tech-stack)
10. [Getting Started & Installation](#️-getting-started--installation)
11. [Project Directory Structure](#-project-directory-structure)
12. [Contact the Creator](#-contact-the-creator)

## 🚀 Overview

**Biosphere Quest** is a personal full-stack web application project created for Grades 1 through 6 students, giving young learners an engaging, browser-based window into learning. Featuring an immersive **Deep Space to Bioluminescent Ocean** glassmorphism aesthetic, children learn and track their progress in areas such as Basic Counting, Addition & Subtraction, Fractions, and Elementary Science (Living Things, Weather, Space). Built with rich Framer Motion animations, custom audio effects, and Supabase cloud sync, the platform combines structured course modules with gamified activities, daily streaks, and weekly leaderboards.

## 👤 Project Background & Creator

* **Title of the Web App:** Biosphere Quest (Web-Based Learning & Gamified Study System)
* **Project Type:** Personal Solo Passion Project — End-to-End Design, UI/UX & Full-Stack Web Development
* **Application Genre:** Educational Web Platform — Interactive Quiz & Mini-Game Suite
* **Target Audience:** Parents/Guardians & Educators (for study tracking) and Primary (Grades 1–3) & Intermediate (Grades 4–6) elementary students
* **Created By:** **BloxyCroissant (Denise)** — Sole Creator, UI/UX Designer, Game Designer & Full-Stack Developer

## 📚 Educational Framework & Philosophy

The web platform is structured around constructivist learning theories and gamification mechanics tailored for young learners:

* **Curriculum Compliance:** All questions, concept hurdles, and difficulty levels mirror the official **DepEd MATATAG Curriculum** for Grades 1 through 6.
* **Scaffolding & Progression:** Adapts from basic counting, pattern recognition, and ecological awareness (Grade 1) to advanced algebraic equations, geometry, fractions, and ecological equilibrium (Grade 6).
* **Positive Reinforcement Loop:** Continuous positive reinforcement ensures students keep working even when encountering errors, with no harsh system shutdowns for low scores.

## 🕹️ Complete Web App & Game Mechanics

### Handled Core Mechanics & Flow

* **Splash Screen & Welcome Music:** Immersive starry landing screen featuring the official **Welcome Screen (Official).mp3** looping background soundtrack, twinkling stars, rising ocean bubbles, and interactive stardust click effects.
* **Welcome Wizard:** 4-step interactive cosmic onboarding where users choose their role (*Student Explorer*, *Teacher*, or *Parent*), pick an animated co-pilot (*Astro*, *Stella*, or *Blue Cat*), set their nickname and grade level (Grades 1–6), and generate an animated holographic Explorer ID Card with +100 XP starting bonus.
* **Lessons & Quizzes (Courses):** Students study bite-sized chunks of instruction (Counting and Number Sense, Shapes and Patterns, Addition and Subtraction, Fractions, Time and Measurement).
* **Mini-Game Challenges (Games):** 15+ browser-playable arcade challenges including Word Scramble, Number Ninja, Potion Mix-Up, and Codebreaker Vault.

### Player Controls and Interactions

* **Responsive Navigation:** Glassmorphism top navigation bar linking Home, Courses, Arcade, and Profile.
* **Grade Filter Chips:** Interactive buttons to select grade levels (Grade 1 to 6) and filter subjects.
* **Keyboard & Mouse/Touch Input:** Typing answers via keyboard or clicking/tapping interactive UI elements and stardust burst effects.

## 🎮 The 15 Mini-Games Suite

| Activity / Game Mode | XP Reward Range | Completion Criteria | 
| ----- | ----- | ----- | 
| **Math & Science Quiz** | +150 XP (Max) | Complete 5-question daily challenge session | 
| **Potion Mix-Up** | +50 XP per win | Solve fraction and liquid mixing puzzles | 
| **Fossil & Planet Digger** | +50 XP per win | Unearth space artifacts and fossils | 
| **Word Scramble** | +20 to +120 XP | Unscramble terminology within the time limit | 
| **Memory Match** | +40 to +200 XP | Match all concept tiles (Math and Science) | 
| **Galactic Garbage Sorter** | +50 XP per win | Correctly sort space and ocean debris | 
| **Number Ninja** | +50 XP per answer | Solve correct math problems rapidly | 
| **Weather Station Forecaster** | +50 XP per win | Predict atmospheric conditions | 
| **Whack-a-Number** | +100 XP | Target correct numerical multiples | 
| **Flashcard Challenge** | +80 XP per deck | Complete deck review cycle | 
| **Starlight Circuit Builder** | +50 XP per win | Connect logic circuits | 
| **Gravity Slingshot** | +50 XP per win | Calculate orbital physics trajectories | 
| **Cosmic Sudoku** | +50 XP per win | Solve number grid puzzles | 
| **Constellation Connect** | +50 XP per win | Connect star coordinates | 
| **Codebreaker Vault** | +500 XP | Solve age-appropriate pattern and sequence puzzles | 

## 🪐 Mascot Companions & Unlockable Badges

### Mascots

* **Astronaut Cadet (Astro Cosmic Scholar):** The adventurous navigator assisting with math challenges and starship piloting.
* **Star Guide (Stella):** The ecological scientist guiding players through bioluminescence and environmental science modules.
* **Nova Cat:** The zero-g puzzle genius helping collect star badges.

### Unlockable Profile Badges & XP Rewards

* Experience Points (XP) are accumulated by finishing lessons, daily quizzes, and mini-games (+20 XP to +500 XP). Leveling up scales automatically every 250 XP.

## 🛠️ Technical Architecture & Tech Stack

* **Frontend Framework:** **ReactJS (React DOM)** powered by **Vite** for fast development builds.
* **Animations:** **Framer Motion** for spring transitions, floating mascot physics, and glowing UI states.
* **Backend & Database:** **Supabase** for user authentication (Login/Sign Up/Password Recovery) and live profile synchronization.
* **Web Audio Engine:** HTML5 Audio API for background music loops and interactive UI sound effects.

## ⚙️ Getting Started & Installation

To run **Biosphere Quest** locally on your development machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/biosphere-quest-website.git
   cd biosphere-quest-website
   ```

2. **Install project dependencies:**
   ```bash
   npm install framer-motion @supabase/supabase-js
   ```

3. **Start the Vite development server:**
   ```bash
   npm run dev
   ```

4. **Launch in your web browser:**
   * Open your web browser and navigate to `http://localhost:5173`.

## 📂 Project Directory Structure

```text
biosphere-quest-website/
├── public/
└── src/
    ├── assets/
    │   ├── BiosphereQuestAssets/          # Official mascots, logos, icons, and GIFs
    │   └── BiosphereQuestSoundEffectsandMusic/ # Background music & sound effects (.mp3)
    ├── components/
    │   └── MinigamesPage/                 # All 15 interactive mini-game modules (.jsx)
    ├── lib/
    │   └── supabase.js                    # Supabase client configuration
    ├── MainPage/                          # SplashStarScreen, WelcomeWizard, Login, SignUp, etc.
    ├── App.jsx                            # Root application state & router
    ├── App.css                            # Deep space & ocean glassmorphism theme stylesheet
    └── main.jsx                           # React DOM mount point
```

## 📬 Contact the Creator

If you wish to use **Biosphere Quest** as a reference or collaborate, feel free to reach out:

* **BloxyCroissant (Denise)** — Project Owner, Solo Creator, UI/UX Developer, UI/UX Designer, Game Developer, Game Designer & Full-Stack Developer

---

*© 2026 BloxyCroissant (Denise). Personal Project — All rights reserved.*
