import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import stellaMascotImage from "../assets/BiosphereQuestAssets/Stella (Biosphere Quest Mascot).png";
import lessonBgmFile from "../assets/BiosphereQuestSoundEffectsandMusic/Interactive Lesson Viewer Lofi (Official).mp3";

const getStorageKey = (grade, subj, lesson) =>
  `@biosphere_active_lesson_progress_${grade}_${subj}_${lesson}`;

const shuffle = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const buildQuestion = (qText, correct, wrongs, explanation) => {
  const options = shuffle([correct, ...wrongs.slice(0, 2)]);
  return {
    question: qText,
    options,
    correctIndex: options.indexOf(correct),
    explanation,
  };
};

const resolveSubjectAndLesson = (initialSubject, initialLesson, gradeLevel) => {
  const rawTitle = (initialSubject?.title || "").trim();
  const lowerTitle = rawTitle.toLowerCase();

  const isOceanCard =
    lowerTitle.includes("ocean") ||
    lowerTitle.includes("marine") ||
    /reef|tide|whale|dolphin|coral|pelagic|current|blue carbon|sea|coastal/.test(
      lowerTitle
    );

  const isScienceCard =
    !isOceanCard &&
    (lowerTitle.includes("science") ||
      [
        "sense",
        "living",
        "earth",
        "matter",
        "solid",
        "liquid",
        "gas",
        "push",
        "pull",
        "light",
        "weather",
        "mixture",
        "body",
        "reproduction",
        "weathering",
        "energy",
        "force",
        "motion",
        "moon",
      ].some((kw) => lowerTitle.includes(kw)));

  const resolvedSubject = initialSubject?.title
    ? {
        title: initialSubject.title,
        icon:
          initialSubject.icon ||
          (isOceanCard ? "🌊" : isScienceCard ? "🔬" : "📐"),
        color:
          initialSubject.color ||
          (isOceanCard ? "#38bdf8" : isScienceCard ? "#4ade80" : "#9c63e8"),
        lessons: Array.isArray(initialSubject.lessons)
          ? initialSubject.lessons
          : [],
      }
    : {
        title: "Math",
        icon: "📐",
        color: "#9c63e8",
        lessons: [],
      };

  const candidateLesson =
    initialLesson && typeof initialLesson === "object" && initialLesson.title
      ? initialLesson
      : typeof initialLesson === "string" && initialLesson.trim()
      ? { title: initialLesson.trim() }
      : Array.isArray(resolvedSubject.lessons) && resolvedSubject.lessons[0]
      ? resolvedSubject.lessons[0]
      : null;

  const lessonTitle =
    candidateLesson?.title ||
    (isOceanCard
      ? gradeLevel === 1
        ? "Hello, Shallow Reef & Tide Pools"
        : `${resolvedSubject.title} Exploration`
      : isScienceCard
      ? gradeLevel === 1
        ? "Senses, Living Things & Earth Surroundings"
        : `${resolvedSubject.title} Investigation`
      : "Counting");

  const lessonMeaning =
    candidateLesson?.meaning ||
    (isOceanCard
      ? `Explore ${lessonTitle.toLowerCase()}, including marine life, water movement, and coastal habitats.`
      : isScienceCard
      ? `Observe and investigate ${lessonTitle.toLowerCase()} using evidence and safe exploration.`
      : "Numbers tell us amounts.");

  const lessonExample =
    candidateLesson?.example ||
    (isOceanCard
      ? "Spotting crabs and shells in a shallow tide pool as gentle waves move along the shore."
      : isScienceCard
      ? "Using your senses safely to observe living plants and animals versus non-living rocks and water."
      : "1, 2, 3");

  return {
    subject: resolvedSubject,
    lesson: {
      title: lessonTitle,
      meaning: lessonMeaning,
      example: lessonExample,
      difficulty: candidateLesson?.difficulty || "Easy",
    },
  };
};

const buildLessonContent = (lesson, subjectTitle, gradeLevel) => {
  const cleanSubject = subjectTitle.toLowerCase();
  const cleanLesson = lesson.title.toLowerCase();
  const isOcean =
    cleanSubject.includes("ocean") ||
    cleanSubject.includes("marine") ||
    /reef|tide|whale|dolphin|coral|pelagic|current|blue carbon|sea|coastal/.test(
      cleanLesson
    ) ||
    /reef|tide|whale|dolphin|coral|pelagic|current|blue carbon|sea|coastal/.test(
      cleanSubject
    );

  const isScience =
    isOcean ||
    cleanSubject.includes("science") ||
    [
      "matter",
      "living",
      "force",
      "earth",
      "sense",
      "weather",
      "body",
      "energy",
      "mixture",
      "solid",
      "liquid",
      "gas",
      "push",
      "pull",
      "light",
    ].some((s) => cleanSubject.includes(s) || cleanLesson.includes(s));

  let visualIllustration = "";
  let pictureExamples = [];
  let howItWorks = "";
  let storyText = "";
  let demoText = "";
  let t1Pool = [];
  let t2Pool = [];
  let t3Pool = [];

  if (isOcean) {
    if (gradeLevel <= 2 || /reef|tide|whale|dolphin|movement/.test(cleanLesson)) {
      visualIllustration =
        "🌊 Gentle Waves (Motion)  ➔  🦀🐚 Tide Pool & Reef Life  ➔  🐋🐬 Open Ocean";
      pictureExamples = [
        {
          pics: "🦀 🐚 ⭐",
          caption: "Shallow Tide Pool & Reef",
          note: "Crabs, shells & sea stars in coastal water",
        },
        {
          pics: "🐋 🐬 🌊",
          caption: "Whales & Dolphins Moving",
          note: "Swimming through ocean currents & waves",
        },
        {
          pics: "🪨 💧 🦀",
          caption: "Living vs. Non-Living Shore",
          note: "Crabs grow & move; rocks & water are non-living",
        },
      ];
      storyText = `DepEd MATATAG Grade ${gradeLevel} Ocean Explorer: Exploring ${lesson.title}—observing how water moves, spotting living vs. non-living things, and meeting marine animals safely.`;
      howItWorks =
        "Observe how water moves with tides and waves, and distinguish living ocean creatures (which grow, breathe, and respond) from non-living elements like rocks, sand, and water.";
      demoText = lesson.example;
    } else {
      visualIllustration =
        "☀️ Sunlit Surface ➔ 🌊 Currents & Tides ➔ 🪸 Coral Reefs & 🌿 Blue Carbon";
      pictureExamples = [
        {
          pics: "🪸 🐠 🦈",
          caption: "Coral Reef & Marine Food Chain",
          note: "Producers, grazers & predators stay balanced",
        },
        {
          pics: "🏖️ 🌊 🪨",
          caption: "Coastal Habitats & Tides",
          note: "Rise and fall of sea levels shape shorelines",
        },
        {
          pics: "🌿🌊 🌍",
          caption: "Pelagic Zones & Blue Carbon",
          note: "Mangroves, seagrasses & ocean currents regulate climate",
        },
      ];
      storyText = `DepEd MATATAG Grade ${gradeLevel} Ocean Science: Investigating ${lesson.title} across marine ecosystems, currents, chemistry, and climate connections.`;
      howItWorks =
        "Trace energy flow through marine food chains, analyze how tides, currents, and depth zones affect organisms, and see how coastal habitats like mangroves and coral reefs protect marine biodiversity.";
      demoText = lesson.example;
    }

    t1Pool = [
      buildQuestion(
        `What is the main focus of ${lesson.title} in Grade ${gradeLevel} Ocean studies?`,
        lesson.meaning,
        [
          "Ignoring how water and living things interact.",
          "Assuming all objects in the sea are alive.",
        ],
        "Correct! Ocean studies connect water movement, habitats, and marine organisms."
      ),
      buildQuestion(
        "Which pair shows a living ocean organism and a non-living ocean feature?",
        "A sea turtle or crab (living) and ocean water or a rock (non-living).",
        [
          "A pebble (living) and a fish (non-living).",
          "Sand grains (living) and sunlight (non-living).",
        ],
        "Spot on! Living things grow and need food/water, while rocks, sand, and water are non-living."
      ),
    ];
    t2Pool = [
      buildQuestion(
        `In our classroom ocean demonstration (${lesson.example}), what should you observe carefully?`,
        lesson.example,
        [
          "Nothing changes in marine environments.",
          "Guessing without looking at organisms or water movement.",
        ],
        "Great job! Careful observation helps explain marine behavior and ocean dynamics."
      ),
    ];
    t3Pool = [
      buildQuestion(
        "How can we help protect ocean habitats and marine creatures in daily life?",
        "Reduce plastic waste, avoid disturbing wildlife, and support clean coastal and water habits.",
        [
          "Leave trash along beaches and waterways.",
          "Harm marine animals for fun.",
        ],
        "Wonderful! Caring for water and habitats keeps marine ecosystems healthy."
      ),
    ];
  } else if (!isScience && cleanSubject.includes("math")) {
    if (gradeLevel === 1) {
      if (/count|number|sense|ordinal|100|place/.test(cleanLesson)) {
        visualIllustration =
          "🟦 (10-Rod) 🟦 (10-Rod)  +  🟨 🟨 🟨 (3-Ones)  =  23 (Up to 100)   |   1️⃣st ➔ 2️⃣nd ➔ 3️⃣rd";
        pictureExamples = [
          {
            pics: "🥭 🥭 🥭 🥭\n🪙 🪙 🪙 🪙 🪙",
            caption: "4 Mangoes & 5 Piso Coins",
            note: "Tap each item 1 by 1 to count accurately",
          },
          {
            pics: "🟦🟦🟦  🟨🟨",
            caption: "3 Tens + 2 Ones = 32",
            note: "Group tens blocks and count leftover ones",
          },
          {
            pics: "1️⃣st 🐢  2️⃣nd 🦀  3️⃣rd 🐠",
            caption: "Ordinal Positions in Line",
            note: "Compare quantities & tell positions up to 100",
          },
        ];
        storyText =
          "DepEd MATATAG Grade 1 Math: In our classroom, we count, read, write, and compare whole numbers up to 100 using tens and ones blocks, mangoes, and piso coins.";
        howItWorks =
          "One-to-one correspondence and place value: Point to each object one by one from left to right, group tens rods with ones units, and compare which set has more, fewer, or is equal.";
        demoText = lesson.example;
        t1Pool = [
          buildQuestion(
            "When counting physical objects on your desk, what is the proper method?",
            "Touch and count each item one by one from left to right.",
            [
              "Guess the total number without pointing.",
              "Ignore the objects entirely.",
            ],
            "Correct! Touching each object ensures every item is counted once."
          ),
          buildQuestion(
            "What does the final number spoken when counting a set indicate?",
            "The total quantity of items in that set.",
            ["The size of the table.", "A random label."],
            "Spot on! The last number names the total amount."
          ),
          buildQuestion(
            "If you have 4 red counters and add 2 more counters, how do you find the new total?",
            "Count all the counters together from the beginning.",
            ["Throw half of them away.", "Stop counting immediately."],
            "Correct! Combining sets means recounting all items together."
          ),
        ];
        t2Pool = [
          buildQuestion(
            "Look at the visual set: [🍎 🍎 🍎] vs [🍎 🍎]. Which group is greater?",
            "The group with 3 mangoes.",
            ["The group with 2 mangoes.", "Both groups have zero."],
            "Great observation! 3 is greater in quantity than 2."
          ),
          buildQuestion(
            "Which number comes right after 7 when counting forward?",
            "8",
            ["6", "10"],
            "Spot on! Counting sequence goes 7, then 8."
          ),
        ];
        t3Pool = [
          buildQuestion(
            "Where do we apply counting skills in our daily community life?",
            "When buying pan de sal or counting our school supplies.",
            [
              "Nowhere, numbers only exist in textbooks.",
              "Only during bedtime.",
            ],
            "Wonderful! Math is part of our everyday routines."
          ),
        ];
      } else if (/shape|pattern/.test(cleanLesson)) {
        visualIllustration =
          "🔴 Circle ➔ 🟦 Square ➔ 🔺 Triangle ➔ 🔴 Circle ➔ [?]";
        pictureExamples = [
          {
            pics: "🔴 🟦 🔴 🟦 🔴 [🟦]",
            caption: "ABAB Shape Pattern",
            note: "Red circle & blue square alternate",
          },
          {
            pics: "🔺 🔺 🟢 🔺 🔺 [🟢]",
            caption: "AAB Pattern with Triangles & Circles",
            note: "Two triangles, then one green circle",
          },
          {
            pics: "⭐ 🌙 ⭐ 🌙 [⭐]",
            caption: "Night Sky Pattern",
            note: "Star, moon, star, moon, star",
          },
        ];
        storyText =
          "DepEd MATATAG Grade 1 Math: Exploring 2D geometric shapes and repeating pattern sequences in our environment.";
        howItWorks =
          "Observe the repeating order of shapes and colors (such as A-B-A-B) to determine what comes next in the row.";
        demoText = lesson.example;
        t1Pool = [
          buildQuestion(
            "What shape comes next in the repeating sequence: Circle, Square, Circle, Square, [?]",
            "Circle",
            ["Triangle", "Rectangle"],
            "Correct! The pattern alternates between Circle and Square."
          ),
          buildQuestion(
            "How many straight sides does a triangle have?",
            "3 straight sides",
            ["4 straight sides", "0 straight sides"],
            "Correct! Triangles always have 3 straight sides."
          ),
        ];
        t2Pool = [
          buildQuestion(
            "What attributes define a square in geometry?",
            "4 equal straight sides and 4 square corners",
            ["Round curved edges only", "3 unequal sides"],
            "Spot on! Squares are bounded by four equal straight sides."
          ),
        ];
        t3Pool = [
          buildQuestion(
            "Why do we study repeating patterns in Grade 1?",
            "To recognize order and predict upcoming elements in a sequence.",
            ["To make art confusing.", "Patterns have no practical use."],
            "Exactly! Pattern recognition builds foundational logical thinking."
          ),
        ];
      } else {
        visualIllustration = "🟢 🟢 🟢  +  🟢 🟢  =  5 Counters Total";
        pictureExamples = [
          {
            pics: "🍎 🍎 🍎  +  🍎 🍎  =  🍎🍎🍎🍎🍎",
            caption: "3 Apples + 2 Apples = 5 Apples",
            note: "Joining two sets makes a bigger set",
          },
          {
            pics: "🧁 🧁 🧁 🧁  −  🧁  =  🧁 🧁 🧁",
            caption: "4 Cupcakes − 1 Eaten = 3 Left",
            note: "Taking away leaves fewer items",
          },
        ];
        storyText = `DepEd MATATAG Grade 1 Math: Exploring ${lesson.title} using concrete counters and visual addition/subtraction.`;
        howItWorks =
          "Putting sets together creates addition (+); taking away items from a set represents subtraction (-).";
        demoText = lesson.example;
        t1Pool = [
          buildQuestion(
            `What is the primary objective of ${lesson.title}?`,
            lesson.meaning,
            ["Ignoring numbers completely.", "Guessing without looking."],
            "Correct! Understanding the foundational meaning is essential."
          ),
        ];
        t2Pool = [
          buildQuestion(
            `In our classroom demonstration (${lesson.example}), what was illustrated?`,
            lesson.example,
            ["An imaginary event.", "No action."],
            "Spot on! Concrete examples bring math concepts to life."
          ),
        ];
        t3Pool = [
          buildQuestion(
            "How do manipulatives help us learn addition and subtraction?",
            "They let us physically see quantities combine or separate.",
            ["They make numbers disappear.", "They are just toys."],
            "Wonderful! Physical objects bridge concrete actions to math symbols."
          ),
        ];
      }
    } else if (gradeLevel === 2) {
      visualIllustration =
        "🟦 (100-Flat)  |  🟩 🟩 (20-Rods)  |  🟨 🟨 🟨 (3-Units)  ➔  123 (Up to 1,000)";
      pictureExamples = [
        {
          pics: "🟦 🟩 🟨🟨",
          caption: "1 Hundred + 1 Ten + 2 Ones = 112",
          note: "Read place value up to 1,000 from left to right",
        },
        {
          pics: "💵 ₱100  +  🪙 ₱20  +  🪙 ₱5  =  ₱125",
          caption: "Addition & Subtraction with Money",
          note: "Add or subtract within each place value column",
        },
        {
          pics: "📏 [0 cm ━━━ 15 cm Ruler]",
          caption: "Measuring & Word Problems",
          note: "Align edge with 0 cm & solve step word problems",
        },
      ];
      storyText = `DepEd MATATAG Grade 2 Math: Mastering ${lesson.title} with hundreds, tens, and ones up to 1,000, multi-digit addition/subtraction word problems, and measurement.`;
      howItWorks =
        "Organize numbers by place value (Hundreds, Tens, Ones up to 1,000) and regroup when adding or subtracting across columns in word problems.";
      demoText = lesson.example;
      t1Pool = [
        buildQuestion(
          `What rule governs ${lesson.title}?`,
          lesson.meaning,
          ["Random number assignment.", "Ignoring column alignment."],
          "Correct! Systematic place value organization is key."
        ),
      ];
      t2Pool = [
        buildQuestion(
          `Based on our example (${lesson.example}), how do we calculate the result?`,
          lesson.example,
          ["By guessing blindly.", "By skipping operations."],
          "Great job following the step-by-step procedure!"
        ),
      ];
      t3Pool = [
        buildQuestion(
          "Why is understanding place value crucial in Grade 2?",
          "It ensures numbers are added and subtracted across correct columns.",
          ["It makes numbers smaller.", "It is optional."],
          "Spot on! Place value maintains true numerical value."
        ),
      ];
    } else if (gradeLevel === 3) {
      visualIllustration =
        "⭐⭐⭐⭐ / ⭐⭐⭐⭐ / ⭐⭐⭐⭐  (3 × 4 = 12)   |   🍕 1/2, 1/4   |   ⬜ Area & Perimeter";
      pictureExamples = [
        {
          pics: "🍪🍪🍪\n🍪🍪🍪\n🍪🍪🍪",
          caption: "Multiplication & Division (3 × 3 = 9)",
          note: "Equal rows form arrays and relate to division",
        },
        {
          pics: "🍕 [1/2 Shaded]   🥧 [1/4 Shaded]",
          caption: "Unit Fractions of a Whole",
          note: "Denominator shows equal parts of one whole",
        },
        {
          pics: "⬜ 4cm + 4cm + 4cm + 4cm = 16cm",
          caption: "Perimeter & Area of Rectangles",
          note: "Add outer sides for perimeter; multiply rows × cols for area",
        },
      ];
      storyText = `DepEd MATATAG Grade 3 Math: Exploring ${lesson.title} through multiplication and division fluency, unit fractions, and perimeter/area measurement.`;
      howItWorks =
        "Multiplication and division connect equal groups and arrays; unit fractions represent one equal part of a whole; perimeter measures around a shape and area counts square units inside.";
      demoText = lesson.example;
      t1Pool = [
        buildQuestion(
          `What principle underlies ${lesson.title}?`,
          lesson.meaning,
          ["Random guessing.", "Unequal partitioning."],
          "Correct! Equal grouping forms the foundation of multiplication."
        ),
      ];
      t2Pool = [
        buildQuestion(
          `In our worked example (${lesson.example}), what is the outcome?`,
          lesson.example,
          ["An incorrect estimate.", "Zero."],
          "Spot on! Accurate calculation yields the correct product or fraction."
        ),
      ];
      t3Pool = [
        buildQuestion(
          "How do multiplication arrays help solve real problems?",
          "They allow rapid calculation of large quantities arranged in rows.",
          ["They have no real use.", "Only for school tests."],
          "Wonderful! Arrays make counting items efficient and structured."
        ),
      ];
    } else {
      visualIllustration =
        "📊 [MATATAG Curriculum Framework: Operations, Fractions/Decimals, Geometry & Ratios]";
      pictureExamples = [
        {
          pics: "📐 2x + 4 = 12  ➔  x = 4\n📐 ∠ 90° Right Angle",
          caption: "Operations, Angles & Algebraic Patterns",
          note: "Follow order of operations, measure angles & balance equations",
        },
        {
          pics: "📦 L=5cm, W=3cm, H=2cm  ➔  V=30cm³",
          caption: "Volume, Decimals & Line Graphs",
          note: "Compute rectangular prism volume & read trends over time",
        },
        {
          pics: "📈 [20% 🟦 | 50% 🟩 | 30% 🟨]\n⚖️ Ratio 3:2 = 6:4",
          caption: "Ratios, Percentages & Integers",
          note: "Compare quantities proportionally & work with positive/negative values",
        },
      ];
      storyText = `DepEd MATATAG Grade ${gradeLevel} Math: Structured problem solving for ${lesson.title}.`;
      howItWorks =
        "Analyze given data, apply standard mathematical rules or formulas step-by-step, and verify solutions against problem constraints and units.";
      demoText = lesson.example;
      t1Pool = [
        buildQuestion(
          `What rule defines ${lesson.title}?`,
          lesson.meaning,
          ["Random estimation.", "Ignoring equation balance."],
          "Correct! Precise operational rules govern this topic."
        ),
      ];
      t2Pool = [
        buildQuestion(
          `How do we solve challenges like: ${lesson.example}?`,
          lesson.example,
          ["Guessing without formulas.", "Discarding units."],
          "Spot on! Systematic execution ensures mathematical accuracy."
        ),
      ];
      t3Pool = [
        buildQuestion(
          "Why is verifying your calculated result important?",
          "It confirms that your solution satisfies all given problem conditions.",
          ["It is never required.", "To waste time."],
          "Exact proof! Verification guarantees correctness."
        ),
      ];
    }
  } else {
    if (/sense|living|earth|surround/.test(cleanLesson) || /sense|living|earth|surround/.test(cleanSubject)) {
      visualIllustration =
        "👀 Eyes 👂 Ears 👃 Nose 👅 Tongue ✋ Skin  ➔  🌿 Animals, Plants & Surroundings";
      pictureExamples = [
        {
          pics: "👀 👂 👃 👅 ✋",
          caption: "Five Senses for Safe Observation",
          note: "Never taste or touch unknown or unsafe items",
        },
        {
          pics: "🐕 🌳 🪨 ☀️",
          caption: "Living vs. Non-Living Things",
          note: "Dogs & trees grow/need food; rocks & sunlight do not",
        },
        {
          pics: "🏠 ☁️ 🌳 🛣️",
          caption: "Daily Earth Surroundings",
          note: "Observe weather, soil, plants & animals around school/home",
        },
      ];
      storyText = `DepEd MATATAG Grade ${gradeLevel} Science: Using your senses safely to observe living and non-living things, plants, animals, and daily Earth surroundings.`;
      howItWorks =
        "Use sight, hearing, smell, touch, and taste safely to notice details, tell living things apart from non-living things, and describe surroundings.";
      demoText = lesson.example;
    } else if (/push|pull|light|weather/.test(cleanLesson) || /push|pull|light|weather/.test(cleanSubject)) {
      visualIllustration =
        "👉 Push / 🤲 Pull (Motion)  |  ☀️🔦 Light & Heat  |  ☀️⛅🌧️ Daily Weather";
      pictureExamples = [
        {
          pics: "👉 [Push] 🛒  /  🤲 [Pull] 🎒",
          caption: "Pushes & Pulls Move Objects",
          note: "Forces start, stop, or change how objects move",
        },
        {
          pics: "☀️ 💡 🔦",
          caption: "Sources of Light & Heat",
          note: "Sunlight and lamps give light and warmth",
        },
        {
          pics: "☀️ ➔ ⛅ ➔ 🌧️",
          caption: "Daily Weather Changes",
          note: "Sunny, cloudy, windy, or rainy conditions across the day",
        },
      ];
      storyText = `DepEd MATATAG Grade ${gradeLevel} Science: Exploring pushes and pulls, sources of light and heat, and how daily weather changes.`;
      howItWorks =
        "Notice how pushes and pulls change motion, how light and heat come from natural and artificial sources, and how daily weather can shift from morning to afternoon.";
      demoText = lesson.example;
    } else if (/matter|solid|liquid|gas|mixture|change/.test(cleanLesson) || /matter|solid|liquid|gas|mixture|change/.test(cleanSubject)) {
      visualIllustration =
        "🧊 Solid (Fixed Shape)  ➔  💧 Liquid (Flows)  ➔  ☁️ Gas (Spreads)  |  🥣 Mixtures";
      pictureExamples = [
        {
          pics: "🧊 🪨 📦",
          caption: "Solids Keep Their Shape",
          note: "Particles are closely packed together",
        },
        {
          pics: "💧 🥛 🫖",
          caption: "Liquids Flow & Take Container Shape",
          note: "Temperature changes can melt or freeze matter",
        },
        {
          pics: "☁️ 🎈 💨",
          caption: "Gases Spread to Fill Space",
          note: "Mixtures combine materials physically or change state",
        },
      ];
      storyText = `DepEd MATATAG Grade ${gradeLevel} Science: Investigating ${lesson.title}—observable properties, mixtures, and physical/chemical changes.`;
      howItWorks =
        "Classify materials by properties like shape, texture, and state (solid, liquid, gas), observe mixtures, and note how heating, cooling, or mixing changes matter.";
      demoText = lesson.example;
    } else if (/body|reproduction|weathering|energy|force|motion|earth-moon/.test(cleanLesson) || /body|reproduction|weathering|energy|force|motion|earth-moon/.test(cleanSubject)) {
      visualIllustration =
        "🫀 Body Systems & Life Cycles  |  🪨🌦️ Weathering  |  ⚡🧲🌕 Energy, Forces & Earth-Moon";
      pictureExamples = [
        {
          pics: "🫀 Lungs/Heart  🌱🌸 Life Cycle",
          caption: "Body Systems & Reproduction",
          note: "Organs work together; plants & animals reproduce",
        },
        {
          pics: "🪨 💧💨 Weathering",
          caption: "Earth Surfaces & Weathering",
          note: "Wind, water & temperature break down rocks over time",
        },
        {
          pics: "⚡ 🧲 🌎🌕",
          caption: "Energy, Forces & Earth-Moon System",
          note: "Energy transfers, forces move objects & Moon orbits Earth",
        },
      ];
      storyText = `DepEd MATATAG Grade ${gradeLevel} Science: Investigating ${lesson.title} through structured evidence and real-world systems.`;
      howItWorks =
        "Scientific inquiry involves observing physical phenomena, identifying how parts or forces interact, recording empirical data, and drawing evidence-based conclusions.";
      demoText = lesson.example;
    } else {
      visualIllustration =
        "🌱 Roots (Water Absorption) ➔ 🌿 Stem (Transport) ➔ ☀️ Leaves (Food Synthesis)";
      pictureExamples = [
        {
          pics: "☀️ ➔ 🌿 ➔ 🍃 (O₂ + Glucose)",
          caption: "Sunlight & Leaf Energy Cycle",
          note: "Chlorophyll captures light energy",
        },
        {
          pics: "🧊 ➔ 💧 ➔ ☁️",
          caption: "Solid, Liquid & Gas States",
          note: "Heat energy drives state changes",
        },
        {
          pics: "🌊 ➔ ☁️ ➔ 🌧️ ➔ 🏞️",
          caption: "Water Cycle in Nature",
          note: "Evaporation, condensation & precipitation",
        },
      ];
      storyText = `DepEd MATATAG Science Curriculum: Investigating ${lesson.title} in our natural environment.`;
      howItWorks =
        "Scientific inquiry involves observing physical phenomena, recording empirical data, and drawing evidence-based conclusions.";
      demoText = lesson.example;
    }

    t1Pool = [
      buildQuestion(
        `What scientific principle explains ${lesson.title}?`,
        lesson.meaning,
        ["Unproven folklore.", "Pure guesswork."],
        "Correct! Science relies on verifiable empirical laws."
      ),
    ];
    t2Pool = [
      buildQuestion(
        `In our observation example (${lesson.example}), what was demonstrated?`,
        lesson.example,
        ["An impossible anomaly.", "Nothing."],
        "Spot on! Empirical evidence proves scientific concepts."
      ),
    ];
    t3Pool = [
      buildQuestion(
        "Why is studying science essential for our community?",
        "It helps us understand nature, conserve resources, and solve local challenges.",
        ["It has no practical application.", "Only for indoor reading."],
        "Wonderful! Science empowers us to care for our world."
      ),
    ];
  }

  const topics = [
    {
      title: "1. Core Concept & Classroom Guide",
      story: storyText,
      howItWorks,
      visualIllustration,
      pictureExamples,
      demonstration: demoText,
      questions: t1Pool,
    },
    {
      title: "2. Worked Classroom Demonstration",
      story:
        "Let's examine how this works in a real MATATAG classroom setting step by step.",
      howItWorks: "Follow the visual illustration and picture cards below:",
      visualIllustration,
      pictureExamples,
      demonstration: demoText,
      questions: t2Pool,
    },
    {
      title: "3. Real-World Explorer Mission",
      story: `Now let's see how ${lesson.title} connects to our everyday environment.`,
      howItWorks: "Apply what you observed to answer the checkpoint question.",
      visualIllustration,
      pictureExamples,
      demonstration: demoText,
      questions: t3Pool,
    },
  ];

  const fullRecapPool = [
    buildQuestion(
      `Mastery Check 1: What is the primary definition of ${lesson.title}?`,
      lesson.meaning,
      ["An unproven guess.", "A temporary trick."],
      "Accurate recall of the core rule!"
    ),
    buildQuestion(
      `Mastery Check 2: When explaining ${lesson.title}, which statement is correct?`,
      lesson.meaning,
      ["It is completely random.", "It has no rules."],
      "Clear communication of knowledge!"
    ),
    buildQuestion(
      `Mastery Check 3: Recall our example: "${lesson.example}". What did it illustrate?`,
      lesson.title,
      ["An unrelated topic.", "An error in calculation."],
      "Great recognition of worked examples!"
    ),
    buildQuestion(
      "Mastery Check 4: True or False: Paying attention to details leads to accurate solutions.",
      "True, observant learners find correct answers.",
      ["False, rushing is better.", "False, details do not matter."],
      "Observant thinking is key!"
    ),
    buildQuestion(
      `Mastery Check 5: Which practice best helps us master ${lesson.title}?`,
      "Reviewing classroom examples and checking our work carefully.",
      [
        "Guessing answers quickly without looking.",
        "Ignoring all instructions.",
      ],
      "Systematic review builds mastery!"
    ),
    buildQuestion(
      `Mastery Check 6: How does ${lesson.title} connect to our daily classroom activities?`,
      "By helping us solve practical problems logically and accurately.",
      ["It only exists inside storybooks.", "It has no use in real life."],
      "Practical connection verified!"
    ),
    buildQuestion(
      "Mastery Check 7: What should you do if your first attempt at solving a problem is incorrect?",
      "Review the steps, correct mistakes, and try again patiently.",
      ["Give up and throw your notebook away.", "Change the rules of math."],
      "Perseverance leads to learning!"
    ),
    buildQuestion(
      `Mastery Check 8: In the context of ${subjectTitle}, why is careful observation important?`,
      "It ensures our findings and calculations are factual and precise.",
      ["It wastes valuable study time.", "Observations do not matter at all."],
      "Observation is the foundation of learning!"
    ),
    buildQuestion(
      "Mastery Check 9: Which habit helps you remember what you learn in class?",
      "Discussing concepts with classmates and practicing regularly.",
      [
        "Forgetting everything after the bell rings.",
        "Never reviewing your notes.",
      ],
      "Active practice reinforces memory!"
    ),
    buildQuestion(
      `Mastery Check 10: Final Reflection: How confident are you in applying ${lesson.title}?`,
      "Very confident after working through the lesson guides and examples.",
      ["Not sure at all.", "I will never use this."],
      "Great job completing your learning mission!"
    ),
  ];

  const recapQuestions = shuffle(fullRecapPool).slice(0, 10);
  return { topics, recapQuestions };
};

const SWIMMING_CREATURES = [
  { icon: "🪼", top: "68%", duration: 18, delay: 0, size: 30, reverse: false },
  { icon: "🐠", top: "78%", duration: 14, delay: 2, size: 26, reverse: true },
  { icon: "🐢", top: "85%", duration: 22, delay: 4, size: 32, reverse: false },
  { icon: "🦑", top: "73%", duration: 16, delay: 6, size: 28, reverse: true },
];

export default function InteractiveLessonViewer({
  gradeLevel = 1,
  initialSubject,
  initialLesson,
  onBack,
  onComplete,
  playSfx,
}) {
  const { subject, lesson } = useMemo(
    () => resolveSubjectAndLesson(initialSubject, initialLesson, gradeLevel),
    [initialSubject, initialLesson, gradeLevel]
  );
  const storageKey = getStorageKey(gradeLevel, subject.title, lesson.title);

  // Ambient Lofi BGM (auto-plays gently with mute toggle)
  const bgmRef = useRef(null);
  const [bgmMuted, setBgmMuted] = useState(false);

  useEffect(() => {
    const audio = new Audio(lessonBgmFile);
    audio.loop = true;
    audio.volume = 0.2;
    bgmRef.current = audio;
    audio.play().catch(() => {});

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggleBgm = (e) => {
    e?.stopPropagation();
    playSfx?.("click");
    if (!bgmRef.current) return;
    if (bgmMuted) {
      bgmRef.current.muted = false;
      bgmRef.current.play().catch(() => {});
      setBgmMuted(false);
    } else {
      bgmRef.current.muted = true;
      setBgmMuted(true);
    }
  };

  const { topics, recapQuestions } = useMemo(
    () => buildLessonContent(lesson, subject.title, gradeLevel),
    [lesson, subject.title, gradeLevel]
  );

  const [stage, setStage] = useState("topic_learn"); // "topic_learn" | "topic_quiz" | "recap_quiz" | "summary"
  const [topicIndex, setTopicIndex] = useState(0);
  const [topicQuestionIndex, setTopicQuestionIndex] = useState(0);
  const [recapQuestionIndex, setRecapQuestionIndex] = useState(0);

  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const [totalXpEarned, setTotalXpEarned] = useState(0);
  const [mistakesCount, setMistakesCount] = useState(0);

  const [showExitModal, setShowExitModal] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [savedProgressData, setSavedProgressData] = useState(null);
  const [clickBursts, setClickBursts] = useState([]);

  const currentTopic = topics[topicIndex] || topics[0];
  const activeQuiz =
    stage === "topic_quiz"
      ? currentTopic.questions[topicQuestionIndex]
      : stage === "recap_quiz"
      ? recapQuestions[recapQuestionIndex]
      : null;

  const [startTime] = useState(() => Date.now());
  const timeSavedRef = useRef(false);
  const quizStartTimeRef = useRef(null);

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

  const clearCurrentProgress = useCallback(() => {
    try {
      localStorage.removeItem(storageKey);
    } catch (e) {
      console.error("Failed to clear progress", e);
    }
  }, [storageKey]);

  const handleRestart = useCallback(() => {
    clearCurrentProgress();
    setStage("topic_learn");
    setTopicIndex(0);
    setTopicQuestionIndex(0);
    setRecapQuestionIndex(0);
    setTotalXpEarned(0);
    setMistakesCount(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setShowResumeModal(false);
  }, [clearCurrentProgress]);

  useEffect(() => {
    if (
      (stage === "topic_quiz" || stage === "recap_quiz") &&
      !quizStartTimeRef.current
    ) {
      quizStartTimeRef.current = Date.now();
    }
  }, [stage]);

  useEffect(() => {
    return () => {
      if (timeSavedRef.current) return;
      timeSavedRef.current = true;
      const elapsedMs = Date.now() - startTime;
      const elapsedMinutes = Math.max(1, Math.round(elapsedMs / 60000));
      try {
        const profileRaw = localStorage.getItem("@biosphere_profile_data_v1");
        if (profileRaw) {
          const profile = JSON.parse(profileRaw);
          profile.studyMinutes = (profile.studyMinutes || 0) + elapsedMinutes;
          localStorage.setItem(
            "@biosphere_profile_data_v1",
            JSON.stringify(profile)
          );
        }
      } catch (e) {
        console.error("Failed to save study time", e);
      }
    };
  }, [startTime]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (
          parsed.topicIndex > 0 ||
          parsed.stage !== "topic_learn" ||
          parsed.totalXpEarned > 0
        ) {
          setSavedProgressData(parsed);
          setShowResumeModal(true);
        }
      }
    } catch (e) {
      console.error("Failed to load saved lesson progress", e);
    }
  }, [storageKey]);

  const saveCurrentState = (
    newStage,
    newTopicIdx,
    newTopicQIdx,
    newRecapQIdx,
    xp,
    mistakes
  ) => {
    try {
      const data = {
        stage: newStage,
        topicIndex: newTopicIdx,
        topicQuestionIndex: newTopicQIdx,
        recapQuestionIndex: newRecapQIdx,
        totalXpEarned: xp,
        mistakesCount: mistakes,
      };
      localStorage.setItem(storageKey, JSON.stringify(data));
    } catch (e) {
      console.error("Failed to save progress", e);
    }
  };

  const handleResume = () => {
    playSfx?.("click");
    if (savedProgressData) {
      setStage(savedProgressData.stage || "topic_learn");
      setTopicIndex(savedProgressData.topicIndex || 0);
      setTopicQuestionIndex(savedProgressData.topicQuestionIndex || 0);
      setRecapQuestionIndex(savedProgressData.recapQuestionIndex || 0);
      setTotalXpEarned(savedProgressData.totalXpEarned || 0);
      setMistakesCount(savedProgressData.mistakesCount || 0);
    }
    setShowResumeModal(false);
  };

  const progressPercent = useMemo(() => {
    let percent = 0;
    if (stage === "topic_learn") {
      percent = (topicIndex / (topics.length + 1)) * 100;
    } else if (stage === "topic_quiz") {
      const topicChunk = 1 / (topics.length + 1);
      const qFraction =
        (topicQuestionIndex + (isCorrect ? 1 : 0)) /
        currentTopic.questions.length;
      percent =
        ((topicIndex + qFraction * topicChunk) / (topics.length + 1)) * 100;
    } else if (stage === "recap_quiz") {
      const recapProgress =
        (recapQuestionIndex + (isCorrect ? 1 : 0)) / recapQuestions.length;
      percent = 75 + recapProgress * 25;
    } else if (stage === "summary") {
      percent = 100;
    }
    return Math.min(Math.max(percent, 6), 100);
  }, [
    stage,
    topicIndex,
    topicQuestionIndex,
    recapQuestionIndex,
    isCorrect,
    topics.length,
    recapQuestions.length,
    currentTopic.questions.length,
  ]);

  const handleSelectOption = (idx, e) => {
    if (isAnswered || !activeQuiz) return;

    setSelectedOption(idx);
    setIsAnswered(true);

    const correct = idx === activeQuiz.correctIndex;
    setIsCorrect(correct);

    const updatedMistakes = correct ? mistakesCount : mistakesCount + 1;
    if (!correct) {
      setMistakesCount(updatedMistakes);
      playSfx?.("wrong");
      triggerButtonBurst(e, ["🫧", "💫"]);
    } else {
      playSfx?.("correct");
      triggerButtonBurst(e, ["✨", "⭐", "🎉"]);
    }

    const reward = stage === "recap_quiz" ? 10 : 15;
    const updatedXp = totalXpEarned + reward;
    setTotalXpEarned(updatedXp);

    saveCurrentState(
      stage,
      topicIndex,
      topicQuestionIndex,
      recapQuestionIndex,
      updatedXp,
      updatedMistakes
    );
  };

  const handleNextAction = (e) => {
    triggerButtonBurst(e, ["🚀", "✨"]);
    playSfx?.("click");
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);

    if (stage === "topic_learn") {
      setStage("topic_quiz");
      setTopicQuestionIndex(0);
      saveCurrentState(
        "topic_quiz",
        topicIndex,
        0,
        recapQuestionIndex,
        totalXpEarned,
        mistakesCount
      );
    } else if (stage === "topic_quiz") {
      if (topicQuestionIndex < currentTopic.questions.length - 1) {
        const nextQ = topicQuestionIndex + 1;
        setTopicQuestionIndex(nextQ);
        saveCurrentState(
          "topic_quiz",
          topicIndex,
          nextQ,
          recapQuestionIndex,
          totalXpEarned,
          mistakesCount
        );
      } else if (topicIndex < topics.length - 1) {
        const nextT = topicIndex + 1;
        setTopicIndex(nextT);
        setStage("topic_learn");
        saveCurrentState(
          "topic_learn",
          nextT,
          0,
          recapQuestionIndex,
          totalXpEarned,
          mistakesCount
        );
      } else {
        setStage("recap_quiz");
        setRecapQuestionIndex(0);
        saveCurrentState(
          "recap_quiz",
          topicIndex,
          0,
          0,
          totalXpEarned,
          mistakesCount
        );
      }
    } else if (stage === "recap_quiz") {
      if (recapQuestionIndex < recapQuestions.length - 1) {
        const nextRQ = recapQuestionIndex + 1;
        setRecapQuestionIndex(nextRQ);
        saveCurrentState(
          "recap_quiz",
          topicIndex,
          0,
          nextRQ,
          totalXpEarned,
          mistakesCount
        );
      } else {
        const bonus = mistakesCount === 0 ? 50 : 0;
        const finalXp = totalXpEarned + bonus;
        setTotalXpEarned(finalXp);
        setStage("summary");
        clearCurrentProgress();
      }
    }
  };

  return (
    <div
      onClick={(e) => spawnBurstAt(e.clientX, e.clientY)}
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        padding: "18px 18px 48px",
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

      {/* Foreground Content Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 780,
          margin: "0 auto",
        }}
      >
        {/* Top Header Bar */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <motion.button
            type="button"
            whileHover={{ scale: 1.06, x: -3 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              playSfx?.("click");
              if (stage === "summary") {
                onBack?.();
              } else {
                setShowExitModal(true);
              }
            }}
            style={{
              background: "rgba(22, 37, 74, 0.85)",
              border: "1px solid rgba(223, 145, 244, 0.45)",
              borderRadius: 12,
              padding: "7px 14px",
              color: "#df91f4",
              fontSize: 14,
              fontWeight: 900,
              cursor: "pointer",
            }}
          >
            ← Exit
          </motion.button>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <motion.button
              type="button"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleBgm}
              title="Toggle Lesson Lofi Music"
              style={{
                background: "rgba(32, 44, 107, 0.85)",
                border: "1px solid #4d58cc",
                borderRadius: 12,
                padding: "6px 11px",
                color: "#8be7ff",
                fontSize: 12.5,
                fontWeight: 900,
                cursor: "pointer",
              }}
            >
              {bgmMuted ? "🔇 Lofi Off" : "🎵 Lofi On"}
            </motion.button>

            <motion.div
              key={totalXpEarned}
              initial={{ scale: 1.22 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 320, damping: 16 }}
              style={{
                background: "rgba(32, 44, 107, 0.9)",
                border: "1.5px solid #4d58cc",
                padding: "6px 14px",
                borderRadius: 16,
                color: "#ffda61",
                fontSize: 13.5,
                fontWeight: 900,
                boxShadow: "0 0 14px rgba(255, 218, 97, 0.3)",
              }}
            >
              ⚡ +{totalXpEarned} XP
            </motion.div>
          </div>
        </motion.div>

        {/* Animated Rocket-to-Moon Progress Track */}
        <div
          style={{
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              flex: 1,
              position: "relative",
              padding: "10px 0",
            }}
          >
            <div
              style={{
                height: 14,
                background: "rgba(22, 34, 68, 0.88)",
                borderRadius: 999,
                border: "1.5px solid #293e75",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <motion.div
                animate={{ width: `${progressPercent}%` }}
                transition={{ type: "spring", stiffness: 65, damping: 14 }}
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, #10b981, #22c55e, #6ee7b7)",
                  borderRadius: 999,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  animate={{ x: ["-100%", "400%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    width: 60,
                    background: "rgba(255, 255, 255, 0.45)",
                    transform: "skewX(-20deg)",
                  }}
                />
              </motion.div>
            </div>

            {/* Flying Rocket Indicator */}
            <motion.div
              animate={{
                left: `calc(${progressPercent}% - 14px)`,
                y: [-2, 2, -2],
              }}
              transition={{
                left: { type: "spring", stiffness: 65, damping: 14 },
                y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
              }}
              style={{
                position: "absolute",
                top: 2,
                fontSize: 22,
                filter: "drop-shadow(0 0 8px rgba(99, 225, 232, 0.8))",
                pointerEvents: "none",
                zIndex: 10,
              }}
            >
              🚀
            </motion.div>
          </div>

          <motion.div
            animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ fontSize: 26 }}
          >
            🌕
          </motion.div>
        </div>

        {/* Hero Lesson Header Card with Floating Stella Mascot */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: "rgba(22, 37, 74, 0.88)",
            backdropFilter: "blur(10px)",
            border: `2px solid ${subject.color || "#63e1e8"}`,
            borderRadius: 20,
            padding: "16px 20px",
            marginBottom: 16,
            boxShadow: `0 10px 28px ${(subject.color || "#63e1e8")}28`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <motion.img
              src={stellaMascotImage}
              alt="Stella Mascot"
              animate={{ y: [-4, 4, -4], rotate: [-3, 3, -3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: 52,
                height: 52,
                objectFit: "contain",
                filter: "drop-shadow(0 0 10px rgba(99, 225, 232, 0.65))",
              }}
            />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  color: "#a5b8e8",
                  fontSize: 12.5,
                  fontWeight: 800,
                  marginBottom: 2,
                }}
              >
                {subject.icon} {subject.title} (Grade {gradeLevel})
              </div>
              <h2
                style={{
                  color: "#ffffff",
                  fontSize: 22,
                  fontWeight: 900,
                  margin: 0,
                }}
              >
                {lesson.title}
              </h2>
            </div>
          </div>

          <div
            style={{
              color: "#ffd05a",
              fontSize: 13.5,
              fontWeight: 800,
              marginTop: 10,
            }}
          >
            {stage === "summary"
              ? "Mission Accomplished!"
              : stage === "recap_quiz"
              ? `Final Mastery Quiz (${recapQuestionIndex + 1} of ${recapQuestions.length})`
              : `Topic ${topicIndex + 1} of ${topics.length}: ${currentTopic.title}`}
          </div>
        </motion.div>

        {/* Stage Content Panels */}
        <AnimatePresence mode="wait">
          {stage === "topic_learn" && (
            <motion.div
              key={`learn-${topicIndex}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.28 }}
              style={{
                background: "rgba(31, 46, 96, 0.88)",
                backdropFilter: "blur(10px)",
                border: "1.5px solid #3d4fa6",
                borderRadius: 20,
                padding: 22,
              }}
            >
              <p
                style={{
                  color: "#ffffff",
                  fontSize: 16.5,
                  lineHeight: 1.65,
                  fontWeight: 600,
                  marginBottom: 16,
                }}
              >
                {currentTopic.story}
              </p>

              <div
                style={{
                  background: "rgba(21, 32, 68, 0.9)",
                  border: "1px solid #283b75",
                  borderRadius: 14,
                  padding: 15,
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    color: "#8be7ff",
                    fontSize: 13,
                    fontWeight: 900,
                    marginBottom: 6,
                  }}
                >
                  Core Pedagogical Guide
                </div>
                <div
                  style={{
                    color: "#e2eafc",
                    fontSize: 14.5,
                    lineHeight: 1.6,
                    fontWeight: 500,
                  }}
                >
                  {currentTopic.howItWorks}
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.015 }}
                style={{
                  background: "rgba(20, 51, 54, 0.92)",
                  border: "1.5px solid #22c55e",
                  borderRadius: 14,
                  padding: 15,
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    color: "#4ade80",
                    fontSize: 12.5,
                    fontWeight: 900,
                    marginBottom: 4,
                  }}
                >
                  👀 Visual Classroom Demonstration
                </div>
                <div
                  style={{
                    color: "#ffffff",
                    fontSize: 15.5,
                    lineHeight: 1.55,
                    fontWeight: 700,
                  }}
                >
                  {currentTopic.visualIllustration}
                </div>
              </motion.div>

              {/* MATATAG Picture Examples Gallery */}
              {currentTopic.pictureExamples?.length > 0 && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(195px, 1fr))",
                    gap: 10,
                    marginBottom: 14,
                  }}
                >
                  {currentTopic.pictureExamples.map((picEx, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -4, scale: 1.02 }}
                      style={{
                        background: "rgba(17, 30, 62, 0.94)",
                        border: "1px solid rgba(99, 225, 232, 0.35)",
                        borderRadius: 14,
                        padding: 12,
                        textAlign: "center",
                      }}
                    >
                      <motion.div
                        animate={{ scale: [1, 1.04, 1] }}
                        transition={{
                          duration: 2.8,
                          repeat: Infinity,
                          delay: idx * 0.35,
                        }}
                        style={{
                          fontSize: 20,
                          lineHeight: 1.45,
                          whiteSpace: "pre-line",
                          marginBottom: 6,
                        }}
                      >
                        {picEx.pics}
                      </motion.div>
                      <div
                        style={{
                          color: "#ffffff",
                          fontSize: 12.5,
                          fontWeight: 800,
                          marginBottom: 2,
                        }}
                      >
                        {picEx.caption}
                      </div>
                      <div style={{ color: "#93c5fd", fontSize: 11, fontWeight: 600 }}>
                        {picEx.note}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              <div
                style={{
                  background: "rgba(23, 43, 92, 0.92)",
                  border: "1px solid #395296",
                  borderRadius: 14,
                  padding: 15,
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    color: "#ffd05a",
                    fontSize: 12.5,
                    fontWeight: 900,
                    marginBottom: 4,
                  }}
                >
                  Key Worked Example
                </div>
                <div
                  style={{
                    color: "#ffffff",
                    fontSize: 15.5,
                    lineHeight: 1.55,
                    fontWeight: 700,
                  }}
                >
                  {currentTopic.demonstration}
                </div>
              </div>

              <motion.button
                type="button"
                whileHover={{
                  scale: 1.025,
                  boxShadow: "0 0 22px rgba(88, 85, 234, 0.65)",
                }}
                whileTap={{ scale: 0.96 }}
                onClick={handleNextAction}
                style={{
                  width: "100%",
                  background: "linear-gradient(90deg, #5855ea, #818cf8)",
                  border: "none",
                  borderRadius: 14,
                  padding: "14px 18px",
                  color: "#ffffff",
                  fontSize: 16,
                  fontWeight: 900,
                  cursor: "pointer",
                }}
              >
                Take Topic Checkpoint 🎯
              </motion.button>
            </motion.div>
          )}

          {(stage === "topic_quiz" || stage === "recap_quiz") && activeQuiz && (
            <motion.div
              key={`quiz-${stage}-${topicIndex}-${topicQuestionIndex}-${recapQuestionIndex}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25 }}
              style={{
                background: "rgba(31, 46, 96, 0.88)",
                backdropFilter: "blur(10px)",
                border: "1.5px solid #3d4fa6",
                borderRadius: 20,
                padding: 22,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 14,
                }}
              >
                <span
                  style={{
                    color: "#8be7ff",
                    fontSize: 11.5,
                    fontWeight: 900,
                    letterSpacing: 0.5,
                  }}
                >
                  {stage === "recap_quiz"
                    ? `RECAP QUESTION ${recapQuestionIndex + 1} / ${recapQuestions.length}`
                    : `CHECKPOINT ${topicQuestionIndex + 1} / ${currentTopic.questions.length}`}
                </span>
                <span
                  style={{
                    background: "#172957",
                    color: "#ffd05a",
                    fontSize: 11.5,
                    fontWeight: 900,
                    padding: "4px 10px",
                    borderRadius: 8,
                  }}
                >
                  +{stage === "recap_quiz" ? 10 : 15} XP
                </span>
              </div>

              <div
                style={{
                  color: "#ffffff",
                  fontSize: 18,
                  lineHeight: 1.5,
                  fontWeight: 800,
                  marginBottom: 18,
                }}
              >
                {activeQuiz.question}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                {activeQuiz.options.map((option, idx) => {
                  const isThisSelected = selectedOption === idx;
                  const isRightOption = idx === activeQuiz.correctIndex;

                  let bg = "rgba(41, 60, 120, 0.9)";
                  let border = "1.5px solid #4a5ebd";

                  if (isAnswered) {
                    if (isRightOption) {
                      bg = "rgba(34, 197, 94, 0.28)";
                      border = "2px solid #4ade80";
                    } else if (isThisSelected) {
                      bg = "rgba(248, 113, 113, 0.28)";
                      border = "2px solid #f87171";
                    }
                  }

                  return (
                    <motion.button
                      key={idx}
                      type="button"
                      disabled={isAnswered}
                      whileHover={isAnswered ? {} : { scale: 1.015, x: 4 }}
                      whileTap={isAnswered ? {} : { scale: 0.97 }}
                      animate={
                        isAnswered && isThisSelected && !isRightOption
                          ? { x: [-5, 5, -5, 5, 0] }
                          : isAnswered && isThisSelected && isRightOption
                          ? { scale: [1, 1.03, 1] }
                          : {}
                      }
                      onClick={(e) => handleSelectOption(idx, e)}
                      style={{
                        background: bg,
                        border,
                        borderRadius: 14,
                        padding: 14,
                        display: "flex",
                        alignItems: "center",
                        textAlign: "left",
                        cursor: isAnswered ? "default" : "pointer",
                      }}
                    >
                      <span
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background: "rgba(255,255,255,0.2)",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: 12,
                          color: "#ffffff",
                          fontSize: 13,
                          fontWeight: 900,
                          flexShrink: 0,
                        }}
                      >
                        {idx + 1}
                      </span>
                      <span
                        style={{
                          color: "#ffffff",
                          fontSize: 15,
                          lineHeight: 1.45,
                          fontWeight: 700,
                          flex: 1,
                        }}
                      >
                        {option}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              <AnimatePresence>
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      background: "rgba(23, 37, 74, 0.95)",
                      border: `1.5px solid ${isCorrect ? "#4ade80" : "#8be7ff"}`,
                      borderRadius: 16,
                      padding: 16,
                      marginTop: 8,
                    }}
                  >
                    <div
                      style={{
                        color: isCorrect ? "#4ade80" : "#8be7ff",
                        fontSize: 16,
                        fontWeight: 900,
                        marginBottom: 4,
                      }}
                    >
                      {isCorrect ? "🌟 Awesome Job!" : "📌 Good Try! Here's Why:"}
                    </div>
                    <div
                      style={{
                        color: "#e2eafc",
                        fontSize: 13.5,
                        lineHeight: 1.5,
                        marginBottom: 14,
                      }}
                    >
                      {activeQuiz.explanation}
                    </div>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={handleNextAction}
                      style={{
                        width: "100%",
                        background: "linear-gradient(90deg, #5855ea, #818cf8)",
                        border: "none",
                        borderRadius: 12,
                        padding: "12px 16px",
                        color: "#ffffff",
                        fontSize: 15,
                        fontWeight: 900,
                        cursor: "pointer",
                      }}
                    >
                      Next Question ➔
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {stage === "summary" && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                background: "rgba(31, 46, 96, 0.9)",
                backdropFilter: "blur(10px)",
                border: "2px solid #4ade80",
                borderRadius: 22,
                padding: 24,
                textAlign: "center",
              }}
            >
              <motion.div
                animate={{ rotate: [-5, 5, -5], scale: [1, 1.08, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                style={{ fontSize: 44, marginBottom: 6 }}
              >
                🎉
              </motion.div>
              <h2
                style={{
                  color: "#ffffff",
                  fontSize: 24,
                  fontWeight: 900,
                  margin: "0 0 6px",
                }}
              >
                Mission Complete!
              </h2>
              <p
                style={{
                  color: "#b0c1e4",
                  fontSize: 13.5,
                  lineHeight: 1.55,
                  marginBottom: 18,
                }}
              >
                You explored all topics and conquered the final recap quiz for{" "}
                <strong>{lesson.title}</strong>!
              </p>

              <div
                style={{
                  background: "rgba(22, 37, 74, 0.9)",
                  borderRadius: 14,
                  padding: 16,
                  marginBottom: 16,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ color: "#a5b8e8", fontSize: 13.5, fontWeight: 700 }}>
                    Total XP Earned:
                  </span>
                  <span style={{ color: "#ffda61", fontSize: 16, fontWeight: 900 }}>
                    ⚡ {totalXpEarned} XP
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ color: "#a5b8e8", fontSize: 13.5, fontWeight: 700 }}>
                    Mistakes Made:
                  </span>
                  <span style={{ color: "#ffffff", fontSize: 16, fontWeight: 900 }}>
                    {mistakesCount}
                  </span>
                </div>
              </div>

              {mistakesCount === 0 ? (
                <div
                  style={{
                    background: "rgba(46, 37, 9, 0.92)",
                    border: "1.5px solid #eab308",
                    borderRadius: 14,
                    padding: 14,
                    marginBottom: 18,
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 4 }}>👑</div>
                  <div
                    style={{
                      color: "#fde047",
                      fontSize: 14,
                      fontWeight: 900,
                      marginBottom: 4,
                    }}
                  >
                    FLAWLESS EXPLORER BONUS!
                  </div>
                  <div style={{ color: "#fef08a", fontSize: 12.5, lineHeight: 1.45 }}>
                    You solved every question and recap without making a single
                    mistake! (+50 XP Bonus awarded!)
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    background: "rgba(23, 38, 74, 0.9)",
                    borderRadius: 12,
                    padding: 12,
                    marginBottom: 18,
                    color: "#a4b7dd",
                    fontSize: 13,
                    lineHeight: 1.5,
                  }}
                >
                  Great perseverance! You worked through all the challenges and
                  mastered this lesson.
                </div>
              )}

              <motion.button
                type="button"
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 22px rgba(34, 197, 94, 0.6)",
                }}
                whileTap={{ scale: 0.96 }}
                onClick={(e) => {
                  triggerButtonBurst(e, ["⭐", "✨", "🎉", "🚀"]);
                  playSfx?.("correct");
                  const isPerfect = mistakesCount === 0;
                  const isScience =
                    subject.title.toLowerCase().includes("science") ||
                    subject.title.toLowerCase().includes("ocean") ||
                    ["matter", "living", "force", "earth"].some((s) =>
                      subject.title.toLowerCase().includes(s)
                    );
                  const quizTimeSecs = quizStartTimeRef.current
                    ? (Date.now() - quizStartTimeRef.current) / 1000
                    : 999;
                  const isSpeedy = quizTimeSecs < 45;

                  onComplete?.(
                    totalXpEarned,
                    isPerfect,
                    isSpeedy && !isScience,
                    isSpeedy && isScience
                  );
                }}
                style={{
                  width: "100%",
                  background: "linear-gradient(90deg, #22c55e, #4ade80)",
                  border: "none",
                  borderRadius: 14,
                  padding: "14px 18px",
                  color: "#052e16",
                  fontSize: 15.5,
                  fontWeight: 900,
                  cursor: "pointer",
                }}
              >
                Complete Mission & Return 🚀
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Exit / Pause Confirmation Modal */}
      <AnimatePresence>
        {showExitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-backdrop"
            onClick={() => setShowExitModal(false)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="modal-box"
              style={{ maxWidth: 380, textAlign: "center" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ fontSize: 38, marginBottom: 8 }}>⏸️</div>
              <h3 style={{ fontSize: 20, fontWeight: 900, marginBottom: 8 }}>
                Pause this mission?
              </h3>
              <p
                style={{
                  color: "#b0c1e4",
                  fontSize: 13.5,
                  lineHeight: 1.5,
                  marginBottom: 18,
                }}
              >
                Your progress and earned XP will be saved. You can jump right back
                in where you left off!
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setShowExitModal(false)}
                  style={{
                    background: "#5855ea",
                    border: "none",
                    borderRadius: 12,
                    padding: "12px",
                    color: "#ffffff",
                    fontSize: 14,
                    fontWeight: 900,
                    cursor: "pointer",
                  }}
                >
                  Keep Learning
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    setShowExitModal(false);
                    onBack?.();
                  }}
                  style={{
                    background: "#223561",
                    border: "none",
                    borderRadius: 12,
                    padding: "12px",
                    color: "#b9ccf2",
                    fontSize: 14,
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  Save & Exit to Courses
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resume Mission Modal */}
      <AnimatePresence>
        {showResumeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-backdrop"
            onClick={handleRestart}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="modal-box"
              style={{ maxWidth: 380, textAlign: "center" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ fontSize: 38, marginBottom: 8 }}>🚀</div>
              <h3 style={{ fontSize: 20, fontWeight: 900, marginBottom: 8 }}>
                Welcome Back, Explorer!
              </h3>
              <p
                style={{
                  color: "#b0c1e4",
                  fontSize: 13.5,
                  lineHeight: 1.5,
                  marginBottom: 18,
                }}
              >
                You have saved progress on this mission. Would you like to resume
                or start fresh?
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleResume}
                  style={{
                    background: "#5855ea",
                    border: "none",
                    borderRadius: 12,
                    padding: "12px",
                    color: "#ffffff",
                    fontSize: 14,
                    fontWeight: 900,
                    cursor: "pointer",
                  }}
                >
                  Continue Mission 🎯
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleRestart}
                  style={{
                    background: "#223561",
                    border: "none",
                    borderRadius: 12,
                    padding: "12px",
                    color: "#b9ccf2",
                    fontSize: 14,
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  Restart from Beginning ↺
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}