import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import pageTurnSoundFile from "../assets/BiosphereQuestSoundEffectsandMusic/PageTurn.mp3";
import stellaMascotImage from "../assets/BiosphereQuestAssets/Stella (Biosphere Quest Mascot).png";

const BOOKMARK_DESIGNS = [
  { id: "ribbon", name: "Classic Ribbon", icon: "🔖", color: "#FF5252" },
  { id: "star", name: "Golden Star", icon: "⭐", color: "#FFD700" },
  { id: "badge", name: "Explorer Badge", icon: "🛡️", color: "#4879E7" },
  { id: "emerald", name: "Emerald Tag", icon: "💎", color: "#2ECC71" },
];

const HIGHLIGHTER_PALETTE = [
  { id: "yellow", color: "rgba(255, 255, 186, 0.85)", name: "Butter Yellow" },
  { id: "pink", color: "rgba(255, 209, 220, 0.85)", name: "Soft Pink" },
  { id: "peach", color: "rgba(255, 223, 186, 0.85)", name: "Pastel Peach" },
  { id: "green", color: "rgba(186, 255, 201, 0.85)", name: "Mint Green" },
  { id: "blue", color: "rgba(186, 225, 255, 0.85)", name: "Sky Blue" },
  { id: "lavender", color: "rgba(232, 170, 255, 0.85)", name: "Lavender" },
];

const HighlightableWord = memo(function HighlightableWord({
  wordKey,
  word,
  highlightColor,
  onPress,
  onDragHighlight,
}) {
  return (
    <span
      data-word-key={wordKey}
      onClick={(e) => {
        e.stopPropagation();
        onPress(wordKey);
      }}
      onMouseEnter={(e) => {
        if (e.buttons === 1) {
          onDragHighlight(wordKey);
        }
      }}
      style={{
        backgroundColor: highlightColor || "transparent",
        borderRadius: highlightColor ? 3 : 0,
        padding: highlightColor ? "0 2px" : 0,
        cursor: "pointer",
        transition: "background-color 0.15s ease",
      }}
    >
      {word}{" "}
    </span>
  );
});

const getLessonVisualData = (lessonTitle, isScience, gradeLevel) => {
  const title = (lessonTitle || "").toLowerCase();
  let steps;
  let pictureBoard;

  if (isScience) {
    if (/plant|seed|flower|photosynth|reproduction/.test(title)) {
      steps = [
        {
          icon: "🌱",
          label: "Plant Germination",
          detail:
            "Start with a healthy seed or young plant embedded in fertile soil.",
        },
        {
          icon: "☀️",
          label: "Resource Absorption",
          detail:
            "Provide plenty of sunlight, clean water, and rich organic minerals.",
        },
        {
          icon: "🌼",
          label: "Full Maturity",
          detail:
            "Watch as it blossoms into a mature, adult organism capable of reproduction!",
        },
      ];
      pictureBoard = [
        { art: "🌰 ➔ 🌱", caption: "Seed Sprouts" },
        { art: "☀️ + 💧 + 🌿", caption: "Sunlight & Water" },
        { art: "🌸 🐝 🍓", caption: "Flower & Fruit" },
      ];
    } else if (/life cycle|metamorph|animal/.test(title)) {
      steps = [
        {
          icon: "🥚",
          label: "Initial Stage",
          detail:
            "Life begins inside a protective egg membrane or as a newborn juvenile.",
        },
        {
          icon: "🐛",
          label: "Developmental Phase",
          detail:
            "The animal feeds continuously, grows rapidly, and undergoes structural change.",
        },
        {
          icon: "🦋",
          label: "Adult Stage",
          detail:
            "The organism reaches full biological maturity and passes on genetic traits.",
        },
      ];
      pictureBoard = [
        { art: "🥚 ➔ 🐣", caption: "Egg to Hatchling" },
        { art: "🐛 ➔ 🪭", caption: "Growth & Cocoon" },
        { art: "🦋 ➔ 🌸", caption: "Adult Stage" },
      ];
    } else if (/matter|solid|liquid|gas|mixture|melting/.test(title)) {
      steps = [
        {
          icon: "🧊",
          label: "Solid State",
          detail:
            "Molecules remain tightly packed together, holding a fixed shape and volume.",
        },
        {
          icon: "💧",
          label: "Liquid State",
          detail:
            "Thermal energy loosens molecular bonds, allowing fluid movement and flow.",
        },
        {
          icon: "☁️",
          label: "Gas State",
          detail:
            "High temperature drives particles apart, expanding to fill any container space.",
        },
      ];
      pictureBoard = [
        { art: "🧊 [Tight]", caption: "Fixed Shape" },
        { art: "💧 [Flows]", caption: "Takes Container" },
        { art: "☁️ [Spreads]", caption: "Fills Space" },
      ];
    } else {
      steps = [
        {
          icon: "🔎",
          label: "Observation",
          detail:
            "Examine key physical phenomena and record empirical field data.",
        },
        {
          icon: "📝",
          label: "Documentation",
          detail:
            "Log all findings carefully inside a structured research framework.",
        },
        {
          icon: "💡",
          label: "Conclusion",
          detail:
            "Formulate a sound scientific rule supported by verifiable evidence.",
        },
      ];
      pictureBoard = [
        { art: "🔭 👀 🌿", caption: "Observe Nature" },
        { art: "📓 ✏️ 📊", caption: "Record Data" },
        { art: "🌍 ♻️ 🌱", caption: "Protect Earth" },
      ];
    }
  } else if (gradeLevel <= 3) {
    if (/count|number|sense|ordinal/.test(title)) {
      steps = [
        {
          icon: "🖐️",
          label: "Finger & Object Counting",
          detail:
            "Count actual physical objects or fingers one by one from left to right.",
        },
        {
          icon: "🔴",
          label: "Visual Counters",
          detail:
            "Group counters into sets to see which group has more or fewer items.",
        },
        {
          icon: "⭐",
          label: "Total Amount",
          detail: "State the final counted number clearly out loud!",
        },
      ];
      pictureBoard = [
        { art: "🍎🍎🍎 [3]", caption: "3 Red Apples" },
        { art: "🪙🪙🪙🪙🪙 [5]", caption: "5 Piso Coins" },
        { art: "1st 🐢 2nd 🦀 3rd 🐠", caption: "Ordinal Order" },
      ];
    } else if (/shape|pattern/.test(title)) {
      steps = [
        {
          icon: "🔺",
          label: "Identify Shapes",
          detail:
            "Trace the straight sides and corners of circles, squares, and triangles.",
        },
        {
          icon: "🔄",
          label: "Spot the Pattern",
          detail:
            "Look at the repeating sequence order (A-B-A-B) to find what comes next.",
        },
        {
          icon: "🎨",
          label: "Complete the Sequence",
          detail:
            "Draw or place the correct missing shape to finish the pattern!",
        },
      ];
      pictureBoard = [
        { art: "🔴 🟦 🔴 🟦", caption: "ABAB Shapes" },
        { art: "🔺 🔺 🟢", caption: "AAB Sequence" },
        { art: "⭐ 🌙 ⭐ 🌙", caption: "Sky Pattern" },
      ];
    } else if (/addition|subtraction|sum|difference/.test(title)) {
      steps = [
        {
          icon: "🍎",
          label: "Gather Objects",
          detail:
            "Put two groups of fruits or blocks together to add (+) them up.",
        },
        {
          icon: "🤲",
          label: "Take Away",
          detail:
            "Remove items from the group to find what is left over (-).",
        },
        {
          icon: "✅",
          label: "Count the Total",
          detail:
            "Count all remaining items together to get your final answer.",
        },
      ];
      pictureBoard = [
        { art: "🍌🍌 + 🍌 = 🍌🍌🍌", caption: "2 + 1 = 3" },
        { art: "🧁🧁🧁 − 🧁 = 🧁🧁", caption: "3 − 1 = 2" },
        { art: "🐟🐟 + 🐟🐟 = 4🐟", caption: "2 + 2 = 4" },
      ];
    } else if (/place value|block|thousand|hundred/.test(title)) {
      steps = [
        {
          icon: "🟦",
          label: "Base-10 Flats & Rods",
          detail:
            "Use 100-flats, 10-rods, and 1-units to build numbers visually.",
        },
        {
          icon: "📊",
          label: "Group Tens and Ones",
          detail: "Regroup 10 ones into a ten block when counting past 9.",
        },
        {
          icon: "🔢",
          label: "Read the Number",
          detail:
            "Combine hundreds, tens, and ones to say the full 3-digit number.",
        },
      ];
      pictureBoard = [
        { art: "🟦 = 100", caption: "Hundred Flat" },
        { art: "🟩 = 10", caption: "Ten Rod" },
        { art: "🟨 = 1", caption: "One Unit" },
      ];
    } else {
      steps = [
        {
          icon: "👁️",
          label: "Observe Objects",
          detail:
            "Look closely at the pictures, counters, or shapes on your desk.",
        },
        {
          icon: "➕",
          label: "Work with Items",
          detail:
            "Use physical items or drawings to solve the math puzzle step by step.",
        },
        {
          icon: "🌟",
          label: "Check Your Work",
          detail:
            "Count your objects again to make sure your answer is correct!",
        },
      ];
      pictureBoard = [
        { art: "✏️ ✏️ ✏️", caption: "3 Pencils" },
        { art: "📚 + 📚 = 2📚", caption: "Combine Books" },
        { art: "⭐ 100%", caption: "Double-Check" },
      ];
    }
  } else {
    steps = [
      {
        icon: "📘",
        label: "Rule Identification",
        detail: "Read and analyze the core mathematical rule or principle.",
      },
      {
        icon: "🧩",
        label: "Variable Alignment",
        detail:
          "Substitute given numerical values into the target equation correctly.",
      },
      {
        icon: "✅",
        label: "Verification",
        detail:
          "Execute steps systematically and double-check units and calculations.",
      },
    ];
    pictureBoard = [
      { art: "📐 a² + b² = c²", caption: "Formula Setup" },
      { art: "🔢 x = 6", caption: "Solve Value" },
      { art: "✔️ Checked", caption: "Verify Result" },
    ];
  }

  return {
    title: gradeLevel <= 3 ? "Visual Math Guide" : "Visual Concept Map",
    summary:
      gradeLevel <= 3
        ? "Use physical objects, visual counting, and block groups to understand math concepts easily."
        : isScience
        ? "Observe key physical components, trace fundamental interactions, and conclude with verified empirical evidence."
        : "Identify given variables, apply mathematical formulas step-by-step, and verify your results against core rules.",
    steps,
    pictureBoard,
  };
};

function LessonVisual({ data }) {
  return (
    <div
      style={{
        marginTop: 18,
        padding: 16,
        borderRadius: 14,
        border: "1.5px solid #b4d3c2",
        backgroundColor: "#f0f8f2",
      }}
    >
      <div
        style={{
          marginBottom: 6,
          color: "#245642",
          fontSize: 13.5,
          fontWeight: 900,
          textAlign: "center",
        }}
      >
        {data.title}
      </div>
      <div
        style={{
          marginBottom: 12,
          color: "#475569",
          fontSize: 12.5,
          lineHeight: 1.5,
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        {data.summary}
      </div>

      {/* Picture Examples Row */}
      {data.pictureBoard?.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 8,
            marginBottom: 14,
          }}
        >
          {data.pictureBoard.map((card, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -3, scale: 1.03 }}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #cce3d6",
                borderRadius: 10,
                padding: "10px 8px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>
                {card.art}
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#245642" }}>
                {card.caption}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column" }}>
        {data.steps.map((step, index) => (
          <div key={`${step.label}-${index}`}>
            <motion.div
              whileHover={{ x: 4 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                backgroundColor: "#ffffff",
                padding: 12,
                borderRadius: 10,
                border: "1px solid #cce3d6",
              }}
            >
              <motion.span
                animate={{ scale: [1, 1.12, 1] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
                style={{ fontSize: 24 }}
              >
                {step.icon}
              </motion.span>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#334155", fontSize: 14, fontWeight: 800 }}>
                  {step.label}
                </div>
                <div
                  style={{
                    color: "#64748b",
                    fontSize: 12,
                    fontWeight: 600,
                    marginTop: 2,
                  }}
                >
                  {step.detail}
                </div>
              </div>
            </motion.div>
            {index < data.steps.length - 1 && (
              <div
                style={{
                  textAlign: "center",
                  color: "#16806b",
                  fontSize: 18,
                  fontWeight: 900,
                  margin: "5px 0",
                }}
              >
                ↓
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const getGradeStudyGuidance = (gradeLevel, isScience) => {
  if (gradeLevel <= 2) {
    return isScience
      ? "Look closely at familiar objects or living things in your environment. Describe what you can observe with your five senses, compare what is alike or different, and draw a simple scientific picture when it helps clarify your thoughts."
      : "Use physical counters, visual drawings, real objects, or a simple number line. Always state what each number or shape stands for out loud before selecting your final answer.";
  }
  if (gradeLevel <= 4) {
    return isScience
      ? "Record your observations carefully in an organized notebook. Compare experimental results across multiple trials, and explain clearly how physical evidence directly supports your scientific conclusions."
      : "Select an appropriate mathematical model or strategy. Carefully write down every calculation step, label your units, and check that your final solution makes logical sense.";
  }
  return isScience
    ? "Connect observational evidence directly to broader scientific theories. Distinguish carefully between direct physical observation and logical inference, justifying every conclusion with empirical data."
    : "Connect symbolic equations, geometric models, and numerical relationships. Provide complete step-by-step proofs, and justify why your computed result fits the constraints of the original problem statement.";
};

const buildLessonExpansion = (
  gradeLevel,
  subjectTitle,
  lessonTitle,
  lessonMeaning,
  lessonExample
) => {
  const cleanSubject = subjectTitle.toLowerCase();
  const isScience =
    cleanSubject.includes("science") ||
    [
      "matter",
      "living",
      "force",
      "earth",
      "environment",
      "energy",
      "space",
    ].some((s) => cleanSubject.includes(s));
  const keyword = lessonTitle.toLowerCase();
  const gradeHint = getGradeStudyGuidance(gradeLevel, isScience);

  const meaningText =
    lessonMeaning ||
    `Study the foundational laws and structural mechanics governing ${keyword}.`;
  const exampleText =
    lessonExample ||
    `Examine practical everyday phenomena to see how ${keyword} works in real-world environments!`;

  return {
    isScience,
    definition: meaningText,
    explanation: isScience
      ? `In-Depth Scientific Analysis of ${keyword}:\n\n1. Structural Properties & Observations: When examining ${keyword}, scientists begin by documenting physical attributes, thermal changes, and environmental interactions. Every physical system operates according to fixed scientific laws that govern energy conservation, molecular behavior, and system equilibrium.\n\n2. Key Mechanisms & Relationships: Observing ${keyword} requires analyzing cause-and-effect patterns. For instance, changes in temperature, pressure, forces, or biological resources directly alter how the system behaves. Identifying these variables allows us to predict future outcomes accurately.\n\n3. Empirical Rules to Remember: Always distinguish between directly observable traits (such as color, mass, or velocity) and inferred properties (such as chemical composition or potential energy). Verifiable scientific conclusions are built on reproducible, empirical evidence.\n\nAcademic Guidance Note:\n${gradeHint}`
      : gradeLevel <= 3
      ? `Primary Classroom Approach for ${keyword}:\n\n1. Visual & Hands-On Learning: In Grade ${gradeLevel}, math is taught using tangible objects, finger counting, visual counters, and block groups rather than abstract formulas. Touching and seeing quantities helps young explorers build strong number sense.\n\n2. Step-by-Step Problem Solving:\nStep A: Read the problem and look at the visual counters, shapes, or items.\nStep B: Use physical items or drawings to group, add, or take away items.\nStep C: Count aloud to find your final answer and verify with your classmates or teacher!\n\n3. Real-World Connection: Math is all around us—whether sharing snacks, counting toys, or measuring lengths with a ruler.\n\nExplorer Tip:\n${gradeHint}`
      : `Comprehensive Mathematical Explanation of ${keyword}:\n\n1. Foundational Rules & Principles: The mathematical framework of ${keyword} relies on fundamental axioms, formulas, and operational definitions.\n\n2. Systematic Problem Approach: When solving problems involving ${keyword}, always follow a clear three-step process:\nStep A: Carefully identify all given information and denote unknown target variables.\nStep B: Select the appropriate formula or operational rule.\nStep C: Perform arithmetic calculations systematically.\n\n3. Proof and Validation Protocols: Substitute your calculated value back into the original expression to verify equality.\n\nAcademic Guidance Note:\n${gradeHint}`,
    example: exampleText,
    exampleExplanation: isScience
      ? `Detailed Breakdown of the Example:\n\nAnalyze the scenario provided above regarding ${keyword}. Observe how each physical component operates in harmony with scientific principles.`
      : gradeLevel <= 3
      ? `Detailed Breakdown of the Example:\n\nLook at how ${keyword} is shown in the example above using everyday objects and pictures. Counting items together or organizing shapes helps make math fun and easy to understand!`
      : `Detailed Breakdown of the Example:\n\nExamine the mathematical context established in the example above. By decomposing the example into discrete operational steps, we can easily see how the abstract rule translates into a practical solution.`,
    computation: isScience
      ? `Step-by-Step Practical Demonstration:\n\n1. Observation Phase: Examine the example details carefully: "${exampleText}".\n\n2. Evidence Identification: Locate key details that demonstrate scientific principles in action.\n\n3. Analytical Explanation: Connect the empirical evidence directly back to the scientific laws governing ${keyword}.`
      : gradeLevel <= 3
      ? `Step-by-Step Classroom Activity:\n\n1. Look at the Pictures: Examine the visual counters, fruit items, or shapes shown in "${exampleText}".\n\n2. Count Aloud: Use your fingers or touch each item one by one to count them out loud.\n\n3. Find the Answer: Put groups together (add) or take items away (subtract) to find your final count!`
      : `Step-by-Step Computational Procedure:\n\n1. Read & Deconstruct: Review the problem statement: "${exampleText}". Extract all given quantities.\n\n2. Operational Setup: Arrange numbers in logical order according to the standard formula.\n\n3. Execute Calculation: Perform arithmetic operations step-by-step.`,
    practice: `Comprehensive Activity Exercise:\n\nIn your own words, explain the core meaning of ${keyword}. Next, construct a complete original example that illustrates this concept in action.\n\nExercise Tasks:\n1. Write out the primary definition using clear, formal academic language.\n2. Detail a practical scenario where this concept applies.\n3. Write a short explanation demonstrating step-by-step how your scenario proves the rule!`,
  };
};

const SWIMMING_CREATURES = [
  { icon: "🪼", top: "68%", duration: 18, delay: 0, size: 30, reverse: false },
  { icon: "🐠", top: "78%", duration: 14, delay: 2, size: 26, reverse: true },
  { icon: "🐢", top: "85%", duration: 22, delay: 4, size: 32, reverse: false },
  { icon: "🦑", top: "73%", duration: 16, delay: 6, size: 28, reverse: true },
];

export default function SubjectNotesViewer({
  subject = { title: "Math", icon: "📐", color: "#9c63e8", lessons: [] },
  gradeLevel = 1,
  onClose,
  playSfx,
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [flipDirection, setFlipDirection] = useState(1);
  const [isClosing, setIsClosing] = useState(false);
  const [selectedHighlighter, setSelectedHighlighter] = useState(null);
  const [wordHighlights, setWordHighlights] = useState({});
  const [bookmarkedPages, setBookmarkedPages] = useState({});
  const [currentBookmarkDesign, setCurrentBookmarkDesign] = useState(
    BOOKMARK_DESIGNS[0]
  );
  const [clickBursts, setClickBursts] = useState([]);

  const pageTurnAudioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(pageTurnSoundFile);
    audio.volume = 0.2;
    pageTurnAudioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const playPageTurn = useCallback(() => {
    if (!pageTurnAudioRef.current) return;
    try {
      pageTurnAudioRef.current.currentTime = 0;
      pageTurnAudioRef.current.play().catch(() => {});
    } catch {
      // Ignore autoplay restriction errors
    }
  }, []);

  const isChildTheme = gradeLevel <= 3;

  const theme = useMemo(
    () => ({
      pageBg: isChildTheme ? "#fffdf0" : "#f8f9fa",
      dividerColor: isChildTheme ? "#ffd166" : "#cbd5e1",
      ringColor: isChildTheme ? "#ff7043" : "#cbd5e1",
      holeBorder: isChildTheme ? "#f4a261" : "#94a3b8",
      borderRadius: isChildTheme ? 20 : 10,
      titleSize: isChildTheme ? 25 : 22,
      bodySize: isChildTheme ? 15.5 : 14,
      bodyLineHeight: isChildTheme ? 1.65 : 1.55,
    }),
    [isChildTheme]
  );

  // Full-Viewport Cosmic & Ocean Background Particles (Matches Splash & Welcome Screens)
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
    () => [
      { id: 1, top: "8%", left: "15%", delay: 1, duration: 2.2 },
      { id: 2, top: "18%", left: "55%", delay: 4.5, duration: 1.9 },
      { id: 3, top: "5%", left: "75%", delay: 8, duration: 2.4 },
      { id: 4, top: "26%", left: "30%", delay: 11.5, duration: 2.0 },
    ],
    []
  );

  const spawnBurstAt = (x, y, icons = ["✨", "🫧", "⭐", "💫", "🐚"]) => {
    const id = Date.now() + Math.random();
    const burst = {
      id,
      x,
      y,
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

  const triggerButtonBurst = (e, icons) => {
    if (!e?.currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    spawnBurstAt(rect.left + rect.width / 2, rect.top + rect.height / 2, icons);
  };

  const CARTOON_CHARACTERS = [
    {
      avatar: "🦉",
      name: "Ollie the Owl",
      tip: "Great reading! Flip pages or tap the chapter tabs!",
      isStella: false,
    },
    {
      avatar: "🦊",
      name: "Felix the Fox",
      tip: "You're doing super awesome!",
      isStella: false,
    },
    {
      avatar: "🐼",
      name: "Pippin Panda",
      tip: "Spot any fun ideas on this page?",
      isStella: false,
    },
    {
      avatar: "",
      name: "Stella (Biosphere Quest Mascot)",
      tip: "Keep exploring, cosmic learner!",
      isStella: true,
    },
  ];

  const LAB_STAMPS = [
    {
      icon: "🔬",
      title: "LAB PRO-TIP",
      tip: "Analyze the core evidence before forming your hypothesis.",
    },
    {
      icon: "💡",
      title: "KEY INSIGHT",
      tip: "Notice how this principle connects to real-world models.",
    },
    {
      icon: "📊",
      title: "FIELD NOTE",
      tip: "Verify all units and check your steps for consistency.",
    },
  ];

  const activeCharacter =
    CARTOON_CHARACTERS[currentPage % CARTOON_CHARACTERS.length];
  const activeLabStamp = LAB_STAMPS[currentPage % LAB_STAMPS.length];

  const handleCloseViewer = useCallback(
    (e) => {
      triggerButtonBurst(e, ["✨", "🚀"]);
      playPageTurn();
      setIsClosing(true);
      setTimeout(() => {
        onClose?.();
      }, 320);
    },
    [playPageTurn, onClose]
  );

  const chapterList = useMemo(() => {
    const list = [];
    const lessons = subject.lessons || [];

    for (let i = 0; i < 7; i++) {
      if (i < lessons.length) {
        list.push({
          title: lessons[i].title,
          meaning: lessons[i].meaning,
          example: lessons[i].example,
        });
      } else {
        const fallbackTitles = [
          "Practical Synthesis & Real-World Application",
          "Advanced System Analysis & Guided Practice",
          "Comprehensive Field Exercise & Mastery Challenge",
        ];
        const titleIndex = i - lessons.length;
        list.push({
          title: fallbackTitles[titleIndex % fallbackTitles.length],
          meaning: `Apply core subject rules from earlier chapters to solve complex problems in ${subject.title}.`,
          example: `Observe real-world scenarios in ${subject.title} and apply step-by-step reasoning to establish verifiable solutions.`,
        });
      }
    }
    return list;
  }, [subject]);

  const stickyTabs = useMemo(() => {
    const colors = [
      "#FF5252",
      "#FF7043",
      "#FFA726",
      "#66BB6A",
      "#26A69A",
      "#42A5F5",
      "#AB47BC",
    ];

    return chapterList.map((_, index) => ({
      pageIndex: 1 + index * 2,
      label: `Ch ${index + 1}`,
      color: colors[index % colors.length],
    }));
  }, [chapterList]);

  const applyHighlightKey = useCallback(
    (wordKey) => {
      setWordHighlights((prev) => {
        if (!selectedHighlighter) {
          if (!prev[wordKey]) return prev;
          const copy = { ...prev };
          delete copy[wordKey];
          return copy;
        }
        if (prev[wordKey] === selectedHighlighter) return prev;
        return { ...prev, [wordKey]: selectedHighlighter };
      });
    },
    [selectedHighlighter]
  );

  const toggleWordHighlight = useCallback(
    (wordKey) => {
      setWordHighlights((prev) => {
        const copy = { ...prev };
        if (!selectedHighlighter) {
          delete copy[wordKey];
        } else if (copy[wordKey] === selectedHighlighter) {
          delete copy[wordKey];
        } else {
          copy[wordKey] = selectedHighlighter;
        }
        return copy;
      });
    },
    [selectedHighlighter]
  );

  const renderParagraphs = useCallback(
    (text, prefix) => {
      return text.split("\n\n").map((paragraph, pIdx) => {
        const words = paragraph.split(" ");
        return (
          <p
            key={pIdx}
            style={{
              color: "#475569",
              fontWeight: 600,
              fontSize: theme.bodySize,
              lineHeight: theme.bodyLineHeight,
              margin: pIdx > 0 ? "12px 0 0" : 0,
            }}
          >
            {words.map((word, wIdx) => {
              const wordKey = `${currentPage}-${prefix}-${pIdx}-${wIdx}`;
              const highlightColor = wordHighlights[wordKey];

              return (
                <HighlightableWord
                  key={wIdx}
                  wordKey={wordKey}
                  word={word}
                  highlightColor={highlightColor}
                  onPress={toggleWordHighlight}
                  onDragHighlight={applyHighlightKey}
                />
              );
            })}
          </p>
        );
      });
    },
    [
      currentPage,
      wordHighlights,
      theme.bodySize,
      theme.bodyLineHeight,
      toggleWordHighlight,
      applyHighlightKey,
    ]
  );

  const pages = useMemo(() => {
    const generatedPages = [];

    generatedPages.push(
      <div key="intro">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 6,
          }}
        >
          <motion.img
            src={stellaMascotImage}
            alt="Stella Mascot"
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 42, height: 42, objectFit: "contain" }}
          />
          <div style={{ flex: 1 }}>
            <h2
              style={{
                color: "#1e293b",
                fontWeight: 900,
                fontSize: theme.titleSize,
                margin: 0,
              }}
            >
              {isChildTheme
                ? `🌈 ${subject.title} Field Guide`
                : `📑 ${subject.title} Comprehensive Journal`}
            </h2>
            <div
              style={{
                color: "#64748b",
                fontSize: 12.5,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                marginTop: 2,
              }}
            >
              Grade {gradeLevel} Explorer&apos;s Master Notebook • DepEd MATATAG
            </div>
          </div>
        </div>
        <div
          style={{
            height: 2,
            backgroundColor: theme.dividerColor,
            margin: "14px 0 16px",
            borderRadius: 2,
          }}
        />
        <h3
          style={{
            color: "#334155",
            fontSize: 16,
            fontWeight: 900,
            margin: "0 0 8px",
          }}
        >
          {isChildTheme ? "🎈 Welcome Explorer!" : "🔬 Academic Research Notebook"}
        </h3>
        {renderParagraphs(
          `Welcome to the master field notebook for ${subject.title}! This study guide is meticulously designed to provide complete conceptual clarity across 7 full chapters: rigorous scientific and mathematical definitions, picture-rich visual guides, step-by-step worked examples, and interactive activity exercises.`,
          "intro-1"
        )}
        <h3
          style={{
            color: "#334155",
            fontSize: 16,
            fontWeight: 900,
            margin: "18px 0 8px",
          }}
        >
          📖 Notebook Structural Organization
        </h3>
        {renderParagraphs(
          "• Chapters 1–4 (Theoretical Foundations): Focus purely on extensive explanations, formal definitions, visual picture guides, and deep descriptions of core principles.\n\n• Chapters 5–7 (Practical Applications): Focus on comprehensive real-world worked examples, step-by-step computation models, and guided activity exercises.\n\n• Highlighter Tool Usage: Choose a color from the toolbar above to click or drag across important text. Select 'Off' to clear highlights. Use the sticky arrow tabs on the right margin to jump directly across chapters.",
          "intro-2"
        )}
      </div>
    );

    chapterList.forEach((chap, index) => {
      const expansion = buildLessonExpansion(
        gradeLevel,
        subject.title,
        chap.title,
        chap.meaning,
        chap.example
      );
      const visualData = getLessonVisualData(
        chap.title,
        expansion.isScience,
        gradeLevel
      );
      const isExplanationChapter = index < 4;
      const includeVisualMap = index < 2;

      if (isExplanationChapter) {
        generatedPages.push(
          <div key={`chap-${index}-p1`}>
            <div
              style={{
                color: "#64748b",
                fontSize: 12,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                marginBottom: 4,
              }}
            >
              Chapter {index + 1} of 7 • Theoretical Foundations (Part 1)
            </div>
            <h2
              style={{
                color: "#1e293b",
                fontWeight: 900,
                fontSize: theme.titleSize,
                margin: 0,
              }}
            >
              {chap.title}
            </h2>
            <div
              style={{
                height: 2,
                backgroundColor: theme.dividerColor,
                margin: "14px 0 16px",
                borderRadius: 2,
              }}
            />
            <h3
              style={{
                color: "#334155",
                fontSize: 16,
                fontWeight: 900,
                margin: "0 0 8px",
              }}
            >
              📖 Core Axiom & Definition
            </h3>
            {renderParagraphs(expansion.definition, `c${index}-p1`)}

            {/* Picture Snapshot Strip */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: 8,
                margin: "14px 0",
              }}
            >
              {visualData.pictureBoard.map((item, bIdx) => (
                <motion.div
                  key={bIdx}
                  whileHover={{ y: -3, scale: 1.03 }}
                  style={{
                    backgroundColor: "#ffffff",
                    border: `1.5px solid ${theme.dividerColor}`,
                    borderRadius: 10,
                    padding: "9px 8px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 3 }}>
                    {item.art}
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#475569" }}>
                    {item.caption}
                  </div>
                </motion.div>
              ))}
            </div>

            <h3
              style={{
                color: "#334155",
                fontSize: 16,
                fontWeight: 900,
                margin: "18px 0 8px",
              }}
            >
              🧠 Comprehensive Theoretical Breakdown
            </h3>
            {renderParagraphs(expansion.explanation, `c${index}-p2`)}
          </div>
        );

        generatedPages.push(
          <div key={`chap-${index}-p2`}>
            <div
              style={{
                color: "#64748b",
                fontSize: 12,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                marginBottom: 4,
              }}
            >
              Chapter {index + 1} of 7 • Theoretical Foundations (Part 2)
            </div>
            <h2
              style={{
                color: "#1e293b",
                fontWeight: 900,
                fontSize: theme.titleSize,
                margin: 0,
              }}
            >
              {includeVisualMap
                ? gradeLevel <= 3
                  ? "Visual Math Guide"
                  : "Visual Concept Map"
                : "Structural Rules & Analysis"}
            </h2>
            <div
              style={{
                height: 2,
                backgroundColor: theme.dividerColor,
                margin: "14px 0 16px",
                borderRadius: 2,
              }}
            />
            {includeVisualMap ? (
              <>
                {renderParagraphs(
                  gradeLevel <= 3
                    ? `Examine the visual guide below to understand how ${chap.title.toLowerCase()} is explored using objects and pictures.`
                    : `Examine the flow diagram below to understand the key sequential steps of ${chap.title.toLowerCase()}.`,
                  `c${index}-map-desc`
                )}
                <LessonVisual data={visualData} />
              </>
            ) : (
              <>
                <h3
                  style={{
                    color: "#334155",
                    fontSize: 16,
                    fontWeight: 900,
                    margin: "0 0 8px",
                  }}
                >
                  🔬 Deep Structural Rules & Mechanics
                </h3>
                {renderParagraphs(
                  `Mastering ${chap.title.toLowerCase()} requires analyzing how each rule fits into the overarching academic system.\n\n• Axiom 1 (Fundamental Definition): Always start by anchoring your analysis in the primary definition. Identify all core properties and governing rules before attempting complex problems.\n\n• Axiom 2 (System Interactions): Observe how internal variables interact with external influences. Changing one element shifts the equilibrium of the entire framework.\n\n• Axiom 3 (Verification Protocols): Always cross-examine your observational or computational data against established rules. Consistency across multiple test conditions ensures true mastery!`,
                  `c${index}-deep-desc`
                )}
                <LessonVisual data={visualData} />
              </>
            )}
          </div>
        );
      } else {
        generatedPages.push(
          <div key={`chap-${index}-p3`}>
            <div
              style={{
                color: "#64748b",
                fontSize: 12,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                marginBottom: 4,
              }}
            >
              Chapter {index + 1} of 7 • Practical Application (Part 1)
            </div>
            <h2
              style={{
                color: "#1e293b",
                fontWeight: 900,
                fontSize: theme.titleSize,
                margin: 0,
              }}
            >
              {chap.title}
            </h2>
            <div
              style={{
                height: 2,
                backgroundColor: theme.dividerColor,
                margin: "14px 0 16px",
                borderRadius: 2,
              }}
            />
            <h3
              style={{
                color: "#334155",
                fontSize: 16,
                fontWeight: 900,
                margin: "0 0 8px",
              }}
            >
              ⭐ Worked Real-World Example
            </h3>
            {renderParagraphs(expansion.example, `c${index}-ex`)}
            <LessonVisual data={visualData} />
            <h3
              style={{
                color: "#334155",
                fontSize: 16,
                fontWeight: 900,
                margin: "18px 0 8px",
              }}
            >
              {expansion.isScience
                ? "🔬 Step-by-Step Empirical Solution"
                : gradeLevel <= 3
                ? "🔢 Step-by-Step Classroom Activity"
                : "🧮 Step-by-Step Computation Model"}
            </h3>
            {renderParagraphs(expansion.computation, `c${index}-comp`)}
          </div>
        );

        generatedPages.push(
          <div key={`chap-${index}-p4`}>
            <div
              style={{
                color: "#64748b",
                fontSize: 12,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                marginBottom: 4,
              }}
            >
              Chapter {index + 1} of 7 • Practical Application (Part 2)
            </div>
            <h2
              style={{
                color: "#1e293b",
                fontWeight: 900,
                fontSize: theme.titleSize,
                margin: 0,
              }}
            >
              Activity Practice Exercise
            </h2>
            <div
              style={{
                height: 2,
                backgroundColor: theme.dividerColor,
                margin: "14px 0 16px",
                borderRadius: 2,
              }}
            />
            <h3
              style={{
                color: "#334155",
                fontSize: 16,
                fontWeight: 900,
                margin: "0 0 8px",
              }}
            >
              🎯 Guided Activity Exercise
            </h3>
            {renderParagraphs(expansion.practice, `c${index}-prac`)}
            <h3
              style={{
                color: "#334155",
                fontSize: 16,
                fontWeight: 900,
                margin: "18px 0 8px",
              }}
            >
              💡 Analytical Breakdown & Solution Notes
            </h3>
            {renderParagraphs(expansion.exampleExplanation, `c${index}-why`)}
            <h3
              style={{
                color: "#334155",
                fontSize: 16,
                fontWeight: 900,
                margin: "18px 0 8px",
              }}
            >
              🚀 Explorer&apos;s Mission Strategy
            </h3>
            {renderParagraphs(
              "Apply the foundational rules and theoretical descriptions from Chapters 1–4 to complete this activity exercise. Always check your steps against the definition to verify complete correctness!",
              `c${index}-tip`
            )}
          </div>
        );
      }
    });

    return generatedPages;
  }, [subject.title, gradeLevel, chapterList, isChildTheme, theme, renderParagraphs]);

  const totalPages = pages.length;

  const jumpToPage = useCallback(
    (newPage, e) => {
      if (newPage < 0 || newPage >= totalPages || newPage === currentPage) return;
      triggerButtonBurst(e, ["✨", "📖"]);
      playPageTurn();
      setFlipDirection(newPage > currentPage ? 1 : -1);
      setCurrentPage(newPage);
    },
    [totalPages, currentPage, playPageTurn]
  );

  const toggleBookmark = (e) => {
    triggerButtonBurst(e, [currentBookmarkDesign.icon, "✨", "⭐"]);
    playSfx?.("click");
    setBookmarkedPages((prev) => {
      const next = { ...prev };
      if (next[currentPage]) {
        delete next[currentPage];
      } else {
        next[currentPage] = currentBookmarkDesign;
      }
      return next;
    });
  };

  const activeBookmark = bookmarkedPages[currentPage];

  return (
    <div
      onClick={(e) => spawnBurstAt(e.clientX, e.clientY)}
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        paddingBottom: 42,
        cursor: "crosshair",
      }}
    >
      {/* Full-Viewport Cosmic & Bioluminescent Ocean Background (Matches Splash & Welcome Screens) */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "linear-gradient(180deg, #060818 0%, #191247 26%, #13255c 52%, #094566 78%, #06637a 100%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Animated Shifting Aurora & Bioluminescent Gradient Overlay */}
      <motion.div
        animate={{ opacity: [0.35, 0.65, 0.35], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "fixed",
          inset: 0,
          background:
            "radial-gradient(circle at 18% 20%, rgba(139, 92, 246, 0.38) 0%, transparent 45%), radial-gradient(circle at 82% 32%, rgba(56, 189, 248, 0.32) 0%, transparent 48%), radial-gradient(circle at 50% 92%, rgba(20, 184, 166, 0.45) 0%, transparent 55%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Interactive Click Stardust & Bubble Bursts */}
      <AnimatePresence>
        {clickBursts.map((burst) => (
          <div
            key={burst.id}
            style={{
              position: "fixed",
              left: burst.x,
              top: burst.y,
              pointerEvents: "none",
              zIndex: 140,
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
            position: "fixed",
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            borderRadius: "50%",
            backgroundColor:
              star.id % 3 === 0 ? "#63e1e8" : star.id % 5 === 0 ? "#ffdf4e" : "#ffffff",
            boxShadow: "0 0 10px rgba(99, 225, 232, 0.9)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      ))}

      {/* Diagonal Shooting Stars */}
      {shootingStars.map((comet) => (
        <motion.div
          key={`comet-${comet.id}`}
          initial={{ x: -120, y: -60, opacity: 0 }}
          animate={{ x: 480, y: 240, opacity: [0, 1, 1, 0] }}
          transition={{
            duration: comet.duration,
            repeat: Infinity,
            repeatDelay: 7,
            delay: comet.delay,
            ease: "easeOut",
          }}
          style={{
            position: "fixed",
            top: comet.top,
            left: comet.left,
            width: 90,
            height: 2,
            background: "linear-gradient(90deg, transparent, #63e1e8, #ffffff)",
            borderRadius: 999,
            transform: "rotate(26deg)",
            boxShadow: "0 0 12px #63e1e8",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      ))}

      {/* Swimming Bioluminescent Ocean Creatures */}
      {SWIMMING_CREATURES.map((creature, idx) => (
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
            position: "fixed",
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

      {/* Rising Ocean Bubbles */}
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
            position: "fixed",
            left: b.left,
            width: b.size,
            height: b.size,
            borderRadius: "50%",
            border: "1.5px solid rgba(103, 232, 249, 0.65)",
            background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.5), transparent)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      ))}

      {/* Foreground Content */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ position: "relative", zIndex: 2 }}
      >
        {/* Top Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: 920,
            margin: "0 auto",
            padding: "14px 18px 10px",
          }}
        >
          <motion.button
            type="button"
            whileHover={{ scale: 1.06, x: -3 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleCloseViewer}
            style={{
              background: "rgba(15, 23, 42, 0.85)",
              border: "1px solid rgba(229, 130, 255, 0.45)",
              borderRadius: 12,
              padding: "7px 14px",
              color: "#e582ff",
              fontWeight: 900,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            👈 Back to Courses
          </motion.button>

          <div
            style={{
              color: subject.color || "#63e1e8",
              fontSize: 17,
              fontWeight: 900,
            }}
          >
            {subject.icon} {subject.title} • Grade {gradeLevel}
          </div>
        </motion.div>

        {/* Highlighter & Ribbon Design Toolbar */}
        <div
          style={{
            background: "rgba(15, 23, 42, 0.85)",
            backdropFilter: "blur(8px)",
            borderTop: "1px solid #1e293b",
            borderBottom: "1px solid #1e293b",
            padding: "8px 16px",
            marginBottom: 18,
          }}
        >
          <div
            style={{
              maxWidth: 920,
              margin: "0 auto",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <span style={{ color: "#94a3b8", fontSize: 11.5, fontWeight: 800 }}>
              Highlighter:
            </span>
            <motion.button
              type="button"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                playSfx?.("click");
                setSelectedHighlighter(null);
              }}
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                border: !selectedHighlighter
                  ? "2px solid #ffffff"
                  : "1.5px solid #475569",
                background: "#1e293b",
                color: "#fff",
                fontSize: 9.5,
                fontWeight: 800,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Off
            </motion.button>
            {HIGHLIGHTER_PALETTE.map((item) => (
              <motion.button
                key={item.id}
                type="button"
                title={item.name}
                whileHover={{ scale: 1.18 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  playSfx?.("click");
                  setSelectedHighlighter(item.color);
                }}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: item.color,
                  border:
                    selectedHighlighter === item.color
                      ? "2.5px solid #ffffff"
                      : "1.5px solid #475569",
                  cursor: "pointer",
                }}
              />
            ))}

            <div
              style={{
                width: 1,
                height: 18,
                backgroundColor: "#334155",
                margin: "0 6px",
              }}
            />

            <span style={{ color: "#94a3b8", fontSize: 11.5, fontWeight: 800 }}>
              Ribbon Design:
            </span>
            {BOOKMARK_DESIGNS.map((design) => (
              <motion.button
                key={design.id}
                type="button"
                title={design.name}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  playSfx?.("click");
                  setCurrentBookmarkDesign(design);
                }}
                style={{
                  padding: "3px 8px",
                  borderRadius: 8,
                  backgroundColor:
                    currentBookmarkDesign.id === design.id
                      ? "#334155"
                      : "#1e293b",
                  border:
                    currentBookmarkDesign.id === design.id
                      ? "1.5px solid #e2e8f0"
                      : "1px solid transparent",
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                {design.icon}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Spiral-Bound Explorer Notebook Container */}
        <motion.div
          animate={
            isClosing
              ? { scale: 0.25, rotate: -8, y: 120, opacity: 0 }
              : { scale: 1, rotate: 0, y: 0, opacity: 1 }
          }
          transition={{ duration: 0.32, ease: "easeInOut" }}
          style={{
            maxWidth: 860,
            margin: "0 auto",
            padding: "0 64px 0 18px",
            position: "relative",
          }}
        >
          <div
            style={{
              backgroundColor: theme.pageBg,
              borderRadius: `6px ${theme.borderRadius}px ${theme.borderRadius}px 6px`,
              padding: "26px 26px 20px 52px",
              minHeight: 540,
              position: "relative",
              boxShadow: "0 18px 42px rgba(0, 0, 0, 0.45)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* Left Spiral Binding Rings & Punched Holes */}
            <div
              style={{
                position: "absolute",
                left: 10,
                top: 22,
                bottom: 22,
                width: 24,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                pointerEvents: "none",
                zIndex: 5,
              }}
            >
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: 16,
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: -14,
                      width: 26,
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: theme.ringColor,
                      zIndex: 2,
                    }}
                  />
                  <div
                    style={{
                      width: 11,
                      height: 11,
                      borderRadius: "50%",
                      backgroundColor: "#091426",
                      border: `1.5px solid ${theme.holeBorder}`,
                      marginLeft: 10,
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Animated Drop-Down Bookmark Ribbon */}
            <AnimatePresence>
              {activeBookmark && (
                <motion.div
                  key={`ribbon-${currentPage}-${activeBookmark.id}`}
                  initial={{ y: -60, scale: 0.3, opacity: 0 }}
                  animate={{ y: 0, scale: 1, opacity: 1 }}
                  exit={{ y: -60, scale: 0.2, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16 }}
                  style={{
                    position: "absolute",
                    top: -6,
                    right: 32,
                    width: 40,
                    height: 64,
                    backgroundColor: activeBookmark.color,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    paddingBottom: 8,
                    fontSize: 20,
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                    zIndex: 20,
                  }}
                >
                  {activeBookmark.icon}
                </motion.div>
              )}
            </AnimatePresence>

            {/* 3D Page-Flipping Content */}
            <div style={{ perspective: 1400, flex: 1 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`page-${currentPage}`}
                  initial={{
                    rotateY: flipDirection > 0 ? 18 : -18,
                    opacity: 0,
                    x: flipDirection > 0 ? 22 : -22,
                  }}
                  animate={{ rotateY: 0, opacity: 1, x: 0 }}
                  exit={{
                    rotateY: flipDirection > 0 ? -24 : 24,
                    opacity: 0,
                    x: flipDirection > 0 ? -22 : 22,
                  }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  style={{ transformOrigin: "left center" }}
                >
                  {pages[currentPage]}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Grade-Specific Floating Helper Card (Grades 1-3) or Lab Pro-Tip Stamp (Grades 4-6) */}
            {isChildTheme ? (
              <motion.div
                animate={{ y: [-3, 3, -3] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#ffffff",
                  border: "1.5px solid #ffd166",
                  borderRadius: 12,
                  padding: "6px 12px",
                  marginTop: 16,
                  gap: 10,
                }}
              >
                {activeCharacter.isStella ? (
                  <img
                    src={stellaMascotImage}
                    alt="Stella"
                    style={{ width: 28, height: 28, objectFit: "contain" }}
                  />
                ) : (
                  <span style={{ fontSize: 22 }}>{activeCharacter.avatar}</span>
                )}
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 11.5,
                      fontWeight: 900,
                      color: "#ff7043",
                    }}
                  >
                    {activeCharacter.name}
                  </div>
                  <div
                    style={{
                      fontSize: 11.5,
                      fontWeight: 600,
                      color: "#475569",
                    }}
                  >
                    {activeCharacter.tip}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                animate={{ y: [-2, 2, -2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#f1f5f9",
                  border: "1px solid #cbd5e1",
                  borderRadius: 8,
                  padding: "6px 12px",
                  marginTop: 16,
                  gap: 10,
                }}
              >
                <span style={{ fontSize: 18 }}>{activeLabStamp.icon}</span>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 10.5,
                      fontWeight: 900,
                      color: "#334155",
                      letterSpacing: 0.5,
                    }}
                  >
                    {activeLabStamp.title}
                  </div>
                  <div
                    style={{
                      fontSize: 11.5,
                      fontWeight: 600,
                      color: "#64748b",
                    }}
                  >
                    {activeLabStamp.tip}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Pagination & Bookmark Footer */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 10,
                marginTop: 14,
                paddingTop: 12,
                borderTop: `2px solid ${theme.dividerColor}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <motion.button
                  type="button"
                  disabled={currentPage === 0}
                  whileHover={currentPage === 0 ? {} : { scale: 1.06, x: -2 }}
                  whileTap={currentPage === 0 ? {} : { scale: 0.92 }}
                  onClick={(e) => jumpToPage(currentPage - 1, e)}
                  style={{
                    backgroundColor: currentPage === 0 ? "#cbd5e1" : "#1e293b",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: 8,
                    padding: "6px 12px",
                    fontSize: 12,
                    fontWeight: 800,
                    cursor: currentPage === 0 ? "not-allowed" : "pointer",
                  }}
                >
                  ← Prev Page
                </motion.button>
                <span
                  style={{
                    color: "#64748b",
                    fontSize: 13,
                    fontWeight: 800,
                  }}
                >
                  Page {currentPage + 1} of {totalPages}
                </span>
                <motion.button
                  type="button"
                  disabled={currentPage === totalPages - 1}
                  whileHover={
                    currentPage === totalPages - 1 ? {} : { scale: 1.06, x: 2 }
                  }
                  whileTap={
                    currentPage === totalPages - 1 ? {} : { scale: 0.92 }
                  }
                  onClick={(e) => jumpToPage(currentPage + 1, e)}
                  style={{
                    backgroundColor:
                      currentPage === totalPages - 1 ? "#cbd5e1" : "#1e293b",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: 8,
                    padding: "6px 12px",
                    fontSize: 12,
                    fontWeight: 800,
                    cursor:
                      currentPage === totalPages - 1 ? "not-allowed" : "pointer",
                  }}
                >
                  Next Page →
                </motion.button>
              </div>

              <motion.button
                type="button"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleBookmark}
                style={{
                  padding: "7px 14px",
                  borderRadius: 12,
                  backgroundColor: activeBookmark ? "#ff4757" : "#1e293b",
                  border: activeBookmark
                    ? "1.5px solid #ff6b81"
                    : "1.5px solid #475569",
                  color: "#ffffff",
                  fontSize: 12.5,
                  fontWeight: 900,
                  cursor: "pointer",
                }}
              >
                {activeBookmark
                  ? `${activeBookmark.icon} Unbookmark`
                  : "🔖 Bookmark"}
              </motion.button>
            </div>

            {/* Sticky Arrow Chapter Tabs on Right Margin */}
            <div
              style={{
                position: "absolute",
                right: -54,
                top: 24,
                bottom: 24,
                width: 58,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                zIndex: 25,
              }}
            >
              {stickyTabs.map((tab, idx) => {
                const isActive =
                  currentPage >= tab.pageIndex &&
                  (idx === stickyTabs.length - 1 ||
                    currentPage < stickyTabs[idx + 1].pageIndex);

                return (
                  <motion.button
                    key={`sticky-${idx}`}
                    type="button"
                    whileHover={{ x: 6, scale: 1.06 }}
                    whileTap={{ x: -6, scale: 0.94 }}
                    onClick={(e) => jumpToPage(tab.pageIndex, e)}
                    style={{
                      width: isActive ? 66 : 56,
                      height: 30,
                      backgroundColor: tab.color,
                      opacity: isActive ? 1 : 0.88,
                      border: "none",
                      borderRadius: "0 6px 6px 0",
                      color: "#ffffff",
                      fontSize: 10.5,
                      fontWeight: 900,
                      cursor: "pointer",
                      boxShadow: isActive
                        ? "0 4px 12px rgba(0, 0, 0, 0.35)"
                        : "none",
                      clipPath:
                        "polygon(0% 0%, 82% 0%, 100% 50%, 82% 100%, 0% 100%)",
                      paddingRight: 8,
                    }}
                  >
                    {tab.label}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}