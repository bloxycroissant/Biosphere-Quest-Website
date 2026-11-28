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

const SUBJECT_GRADE_LESSONS = {
  Math: {
    1: [
      {
        title: "Numbers Up to 100 & Place Value",
        meaning: "Count, read, write, and compare whole numbers up to 100 using tens and ones blocks.",
        example: "3 tens + 2 ones = 32; 45 is greater than 38.",
        difficulty: "Easy",
      },
      {
        title: "Addition & Subtraction Within 100",
        meaning: "Combine sets to add and take away items to subtract within 100.",
        example: "14 + 5 = 19 mangoes; 19 − 4 = 15 left.",
        difficulty: "Easy",
      },
    ],
    2: [
      {
        title: "Numbers Up to 1,000 & Place Value",
        meaning: "Read, write, and identify hundreds, tens, and ones in numbers up to 1,000.",
        example: "4 hundreds + 2 tens + 6 ones = 426.",
        difficulty: "Easy",
      },
      {
        title: "Multi-Digit Addition, Subtraction & Word Problems",
        meaning: "Add and subtract up to 1,000 with regrouping and solve everyday word problems.",
        example: "245 + 138 = 383; 400 − 125 = 275.",
        difficulty: "Medium",
      },
    ],
    3: [
      {
        title: "Multiplication & Division Fluency",
        meaning: "Connect equal groups and arrays to multiplication and division facts.",
        example: "3 × 4 = 12; 12 ÷ 3 = 4.",
        difficulty: "Medium",
      },
      {
        title: "Unit Fractions, Area & Perimeter",
        meaning: "Identify unit fractions of a whole and measure perimeter and area of shapes.",
        example: "1/4 of a whole; 4 cm × 3 cm rectangle has area 12 sq cm.",
        difficulty: "Medium",
      },
    ],
    4: [
      {
        title: "Multi-Digit Operations & Equivalent Fractions",
        meaning: "Solve multi-step whole-number operations and recognize equivalent fractions.",
        example: "2/4 = 1/2; 3/6 = 1/2.",
        difficulty: "Medium",
      },
      {
        title: "Angles, Perimeter, Area & Number Patterns",
        meaning: "Measure angles, solve perimeter/area problems, and continue growing number patterns.",
        example: "Right angle = 90°; pattern 2, 5, 8, 11 (+3).",
        difficulty: "Hard",
      },
    ],
    5: [
      {
        title: "Decimals & Fractions Operations",
        meaning: "Add and subtract decimals and fractions accurately in multi-step tasks.",
        example: "0.75 + 0.25 = 1.00; 3/4 − 1/4 = 2/4.",
        difficulty: "Hard",
      },
      {
        title: "Volume of Rectangular Prisms & Line Graphs",
        meaning: "Compute volume of rectangular prisms and read trends on line graphs.",
        example: "Volume = 5 cm × 3 cm × 2 cm = 30 cm³.",
        difficulty: "Hard",
      },
    ],
    6: [
      {
        title: "Ratios, Percentages & Integers",
        meaning: "Work with ratios, rates, percentages, and positive and negative integers.",
        example: "Ratio 3:2; 50% of 80 = 40; −4 + 7 = 3.",
        difficulty: "Hard",
      },
      {
        title: "Algebraic Patterns, Equations, Surface Area & Circles",
        meaning: "Evaluate expressions and equations, and calculate circle and surface area measurements.",
        example: "If x = 4, then 2x + 3 = 11.",
        difficulty: "Hard",
      },
    ],
  },
  Science: {
    1: [
      {
        title: "Senses, Living Things & Earth Surroundings",
        meaning: "Use your senses safely to observe living and non-living things, plants, animals, and surroundings.",
        example: "A leafy plant and dog are living; a rock and sunlight are non-living.",
        difficulty: "Easy",
      },
      {
        title: "Observing Plants, Animals & Safe Habits",
        meaning: "Notice basic traits of plants and animals and practice safe habits around surroundings.",
        example: "Roots take in water; keep sharp or unsafe objects away from play.",
        difficulty: "Easy",
      },
    ],
    2: [
      {
        title: "Push, Pull & Motion",
        meaning: "Explore how pushes and pulls start, stop, or change how objects move.",
        example: "Pushing a toy cart forward or pulling a wagon.",
        difficulty: "Easy",
      },
      {
        title: "Light, Heat & Daily Weather",
        meaning: "Identify sources of light and heat and observe how weather changes across the day.",
        example: "Sunlight warms the ground; weather shifts from sunny to cloudy or rainy.",
        difficulty: "Medium",
      },
    ],
    3: [
      {
        title: "Matter Around Us: Solids, Liquids & Gases",
        meaning: "Investigate observable properties of solids, liquids, and gases.",
        example: "Ice cube is solid; water is liquid; steam/air is gas.",
        difficulty: "Medium",
      },
      {
        title: "How Temperature Changes Matter",
        meaning: "Observe how heating and cooling change the state or behavior of matter.",
        example: "Ice melts into water when warmed; water freezes into ice when cooled.",
        difficulty: "Medium",
      },
    ],
    4: [
      {
        title: "Materials, Properties & Mixtures",
        meaning: "Classify materials by properties and explore how mixtures form.",
        example: "Combining pebbles and sand creates a mixture.",
        difficulty: "Medium",
      },
      {
        title: "Physical & Chemical Changes in Matter",
        meaning: "Observe and compare physical changes and chemical changes in materials.",
        example: "Cutting paper is a physical change; burning wood produces ash and smoke.",
        difficulty: "Hard",
      },
    ],
    5: [
      {
        title: "Body Systems & Reproduction",
        meaning: "Trace how body systems work together and how plants and animals reproduce.",
        example: "Lungs bring in air while the heart pumps blood; seeds grow into new plants.",
        difficulty: "Hard",
      },
      {
        title: "Weathering & Changing Earth Surfaces",
        meaning: "Examine how wind, water, and temperature weather rocks and shape Earth's surface.",
        example: "Running water and temperature changes gradually wear down rocks.",
        difficulty: "Hard",
      },
    ],
    6: [
      {
        title: "Energy, Forces, Motion & Simple Machines",
        meaning: "Explore forms of energy, forces and motion, and how simple machines help do work.",
        example: "Using a ramp or lever makes lifting a load easier.",
        difficulty: "Hard",
      },
      {
        title: "Earthquakes, Volcanoes & Earth-Moon Systems",
        meaning: "Investigate earthquakes, volcanic activity, and motions in the Earth-Moon and solar system.",
        example: "The Moon orbits Earth while Earth rotates and revolves around the Sun.",
        difficulty: "Hard",
      },
    ],
  },
  Ocean: {
    1: [
      {
        title: "Hello, Shallow Reef & Tide Pools",
        meaning: "Meet gentle tide-pool creatures, feel how water moves, and spot living vs. non-living things.",
        example: "Crabs and shells in a shallow tide pool as gentle waves move along the shore.",
        difficulty: "Easy",
      },
      {
        title: "Living vs. Non-Living Along the Shore",
        meaning: "Distinguish living coastal creatures from non-living sand, water, and rocks.",
        example: "A small crab moves and grows; a stone and seawater are non-living.",
        difficulty: "Easy",
      },
    ],
    2: [
      {
        title: "Whales, Dolphins & Ocean Movement",
        meaning: "Explore how marine animals move, breathe, and shelter in open waters and coastal bays.",
        example: "Dolphins and whales swim through ocean currents and surface to breathe.",
        difficulty: "Easy",
      },
      {
        title: "Coastal Bays, Currents & Marine Shelter",
        meaning: "Observe how water movement and coastal bays provide shelter for ocean life.",
        example: "Sheltered coves and reefs give young fish a safe place to hide.",
        difficulty: "Medium",
      },
    ],
    3: [
      {
        title: "Coral Reefs & Marine Food Chains",
        meaning: "See how living things in coral reefs and seas depend on one another.",
        example: "Tiny algae and plants feed small reef fish, which larger fish eat.",
        difficulty: "Medium",
      },
      {
        title: "Non-Living Water & Light in Reefs",
        meaning: "Understand how marine organisms depend on non-living water and light.",
        example: "Clear, sunlit water helps reef-building corals and algae survive.",
        difficulty: "Medium",
      },
    ],
    4: [
      {
        title: "Philippine Seas, Tides & Coastal Habitats",
        meaning: "Explore marine biodiversity in Philippine waters and coastal landforms.",
        example: "Coral reefs, bays, and mangroves support diverse fish and marine life.",
        difficulty: "Medium",
      },
      {
        title: "Human Actions & Ocean Protection",
        meaning: "Examine how human choices affect coastal habitats and how to protect them.",
        example: "Proper waste disposal keeps plastics out of rivers and Philippine seas.",
        difficulty: "Hard",
      },
    ],
    5: [
      {
        title: "Pelagic Zones & Ocean Currents",
        meaning: "Dive from sunlit surface waters to deeper zones while learning about currents.",
        example: "Sunlight fades in deeper pelagic zones while currents circulate water.",
        difficulty: "Hard",
      },
      {
        title: "Salinity & Ocean Chemistry",
        meaning: "Explore salinity and basic chemical properties of seawater across ocean layers.",
        example: "Seawater contains dissolved salts and minerals that affect density and marine life.",
        difficulty: "Hard",
      },
    ],
    6: [
      {
        title: "Ocean-Atmosphere Climate Patterns",
        meaning: "Examine how oceans and the atmosphere interact to drive weather and climate.",
        example: "Warm ocean currents and evaporation influence clouds, winds, and rainfall.",
        difficulty: "Hard",
      },
      {
        title: "Blue Carbon Habitats & Marine Conservation",
        meaning: "Explore blue carbon ecosystems and marine conservation science.",
        example: "Mangroves and seagrass beds store carbon and protect coastlines.",
        difficulty: "Hard",
      },
    ],
  },
};

const detectSubjectKey = (rawSubject, rawLesson) => {
  const combined = `${rawSubject || ""} ${rawLesson || ""}`.toLowerCase();
  if (
    combined.includes("ocean") ||
    combined.includes("marine") ||
    /reef|tide|whale|dolphin|coral|pelagic|current|blue carbon|sea|coastal|shore/.test(
      combined
    )
  ) {
    return "Ocean";
  }
  if (
    combined.includes("science") ||
    /sense|living|earth|matter|solid|liquid|gas|push|pull|light|weather|mixture|body|reproduction|weathering|energy|force|motion|moon|plant|animal/.test(
      combined
    )
  ) {
    return "Science";
  }
  return "Math";
};

const resolveSubjectAndLessons = (initialSubject, initialLesson, gradeLevel) => {
  const normalizedGrade = Math.min(6, Math.max(1, Number(gradeLevel) || 1));

  const explicitSubject =
    typeof initialSubject === "string"
      ? initialSubject
      : initialSubject?.subject || initialSubject?.subjectTitle || "";

  const rawSubjTitle =
    typeof initialSubject === "string"
      ? initialSubject
      : initialSubject?.title || "";

  const rawLessonTitle =
    typeof initialLesson === "string"
      ? initialLesson
      : initialLesson?.title || initialSubject?.lessonTitle || "";

  const subjectKey = detectSubjectKey(
    explicitSubject || rawSubjTitle,
    rawLessonTitle
  );

  const subjectMeta = {
    Math: { title: "Math", icon: "📐", color: "#9c63e8" },
    Science: { title: "Science", icon: "🔬", color: "#4ade80" },
    Ocean: { title: "Ocean", icon: "🌊", color: "#38bdf8" },
  }[subjectKey];

  const gradeBank =
    SUBJECT_GRADE_LESSONS[subjectKey]?.[normalizedGrade] ||
    SUBJECT_GRADE_LESSONS[subjectKey]?.[1] ||
    SUBJECT_GRADE_LESSONS.Math[1];

  const incomingLessons = Array.isArray(initialSubject?.lessons)
    ? initialSubject.lessons
        .filter((item) => item && (typeof item === "string" || item.title))
        .map((item, idx) =>
          typeof item === "string"
            ? {
                title: item,
                meaning:
                  gradeBank[idx]?.meaning ||
                  `Explore ${item} in Grade ${normalizedGrade} ${subjectMeta.title}.`,
                example:
                  gradeBank[idx]?.example ||
                  `Grade ${normalizedGrade} ${subjectMeta.title} example of ${item}.`,
                difficulty: gradeBank[idx]?.difficulty || "Easy",
              }
            : {
                title: item.title,
                meaning:
                  item.meaning ||
                  item.description ||
                  gradeBank[idx]?.meaning ||
                  `Explore ${item.title} in Grade ${normalizedGrade} ${subjectMeta.title}.`,
                example:
                  item.example ||
                  gradeBank[idx]?.example ||
                  `Grade ${normalizedGrade} ${subjectMeta.title} example of ${item.title}.`,
                difficulty: item.difficulty || gradeBank[idx]?.difficulty || "Easy",
              }
        )
    : [];

  let lessons = incomingLessons.length > 0 ? incomingLessons : [...gradeBank];

  const targetLessonObj =
    initialLesson && typeof initialLesson === "object" && initialLesson.title
      ? {
          title: initialLesson.title,
          meaning:
            initialLesson.meaning ||
            initialLesson.description ||
            `Explore ${initialLesson.title} in Grade ${normalizedGrade} ${subjectMeta.title}.`,
          example:
            initialLesson.example ||
            `Grade ${normalizedGrade} ${subjectMeta.title} example of ${initialLesson.title}.`,
          difficulty: initialLesson.difficulty || "Easy",
        }
      : typeof initialLesson === "string" && initialLesson.trim()
      ? {
          title: initialLesson.trim(),
          meaning: `Explore ${initialLesson.trim()} in Grade ${normalizedGrade} ${subjectMeta.title}.`,
          example: `Grade ${normalizedGrade} ${subjectMeta.title} example of ${initialLesson.trim()}.`,
          difficulty: "Easy",
        }
      : null;

  let initialSelectedIndex = 0;

  if (targetLessonObj) {
    const foundIdx = lessons.findIndex(
      (l) => l.title.toLowerCase() === targetLessonObj.title.toLowerCase()
    );
    if (foundIdx >= 0) {
      lessons[foundIdx] = {
        ...lessons[foundIdx],
        meaning: targetLessonObj.meaning || lessons[foundIdx].meaning,
        example: targetLessonObj.example || lessons[foundIdx].example,
      };
      initialSelectedIndex = foundIdx;
    } else {
      lessons = [targetLessonObj, ...lessons];
      initialSelectedIndex = 0;
    }
  } else if (
    rawSubjTitle &&
    !/^(math|science|ocean)$/i.test(rawSubjTitle.trim())
  ) {
    const cardTopicTitle = rawSubjTitle.trim();
    const foundCardIdx = lessons.findIndex(
      (l) => l.title.toLowerCase() === cardTopicTitle.toLowerCase()
    );
    if (foundCardIdx >= 0) {
      initialSelectedIndex = foundCardIdx;
    } else {
      lessons = [
        {
          title: cardTopicTitle,
          meaning:
            initialSubject?.description ||
            initialSubject?.meaning ||
            `Explore ${cardTopicTitle} in Grade ${normalizedGrade} ${subjectMeta.title}.`,
          example:
            initialSubject?.example ||
            `Grade ${normalizedGrade} ${subjectMeta.title} example of ${cardTopicTitle}.`,
          difficulty: initialSubject?.difficulty || "Easy",
        },
        ...lessons,
      ];
      initialSelectedIndex = 0;
    }
  }

  return {
    subject: {
      title: subjectMeta.title,
      icon:
        (typeof initialSubject === "object" && initialSubject?.icon) ||
        subjectMeta.icon,
      color:
        (typeof initialSubject === "object" && initialSubject?.color) ||
        subjectMeta.color,
      lessons,
    },
    lessons,
    initialSelectedIndex,
  };
};

const buildLessonContent = (lesson, subjectTitle, gradeLevel) => {
  const cleanSubject = subjectTitle.toLowerCase();
  const cleanLesson = lesson.title.toLowerCase();
  const grade = Math.min(6, Math.max(1, Number(gradeLevel) || 1));

  const isOcean =
    cleanSubject.includes("ocean") ||
    cleanSubject.includes("marine") ||
    /reef|tide|whale|dolphin|coral|pelagic|current|blue carbon|sea|coastal|shore/.test(
      cleanLesson
    );

  const isScience =
    !isOcean &&
    (cleanSubject.includes("science") ||
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
        "plant",
        "animal",
        "reproduction",
        "weathering",
        "moon",
      ].some((s) => cleanSubject.includes(s) || cleanLesson.includes(s)));

  let visualIllustration = "";
  let pictureExamples = [];
  let howItWorks = "";
  let storyText = "";
  const demoText = lesson.example;
  let t1Pool = [];
  let t2Pool = [];
  let t3Pool = [];

  if (isOcean) {
    if (grade === 1) {
      visualIllustration =
        "🌊 Gentle Tide-Pool Water  ➔  🦀🐚 Living Shore Creatures  ➔  🪨💧 Non-Living Surroundings";
      pictureExamples = [
        {
          pics: "🦀 🐚 ⭐",
          caption: "Shallow Reef & Tide Pools",
          note: "Grade 1 Ocean • Gentle coastal creatures",
        },
        {
          pics: "🦀 🌱 🪨",
          caption: "Living vs. Non-Living",
          note: "Crabs & seaweeds are living; rocks & water are not",
        },
        {
          pics: "🗑️❌ ➔ 🌊✨",
          caption: "Clean Shore Habits",
          note: "Keep tide pools and beaches safe",
        },
      ];
      storyText = `DepEd MATATAG Grade 1 Ocean: Exploring ${lesson.title}—meeting gentle tide-pool life, feeling water movement, and spotting living vs. non-living things.`;
      howItWorks =
        "Use careful observation to see how gentle water moves along the shore, spot living organisms vs. non-living rocks and water, and practice safe care around tide pools.";
    } else if (grade === 2) {
      visualIllustration =
        "🐋🐬 Marine Animals Moving  ➔  🌊 Tides & Waves  ➔  🏖️ Coastal & Open-Water Shelters";
      pictureExamples = [
        {
          pics: "🐋 🐬 🌊",
          caption: "Whales & Dolphins in Motion",
          note: "Grade 2 Ocean • Swimming & breathing at surface",
        },
        {
          pics: "🌊⬆️ 🏖️ 🌊⬇️",
          caption: "Rising & Falling Tides",
          note: "Water movement shapes bays and shores",
        },
        {
          pics: "🪸 🐚 🪨",
          caption: "Shelters Along the Coast",
          note: "How marine animals find protection",
        },
      ];
      storyText = `DepEd MATATAG Grade 2 Ocean: Exploring ${lesson.title}—how whales, dolphins, and coastal life move, breathe, and shelter across waters.`;
      howItWorks =
        "Observe how marine animals move through water, come up to breathe when needed, and use bays, reefs, and coastal features for shelter.";
    } else if (grade === 3) {
      visualIllustration =
        "☀️ Sunlight & Algae  ➔  🐠 Reef Grazers  ➔  🦈 Marine Predators  ➔  💧🌊 Water & Light";
      pictureExamples = [
        {
          pics: "🪸 🐠 🦀",
          caption: "Coral Reef Community",
          note: "Grade 3 Ocean • Interconnected reef life",
        },
        {
          pics: "☀️ 🌿 ➔ 🐠 ➔ 🦈",
          caption: "Marine Food Chain Flow",
          note: "Energy moves from producers to consumers",
        },
        {
          pics: "☀️ 💧 🪸",
          caption: "Non-Living Needs of Reefs",
          note: "Clean water and sunlight keep reefs alive",
        },
      ];
      storyText = `DepEd MATATAG Grade 3 Ocean: Exploring ${lesson.title}—how coral reef organisms depend on each other, water, and sunlight.`;
      howItWorks =
        "Trace how living organisms in coral reefs and seas depend on food chains as well as non-living water and sunlight to survive.";
    } else if (grade === 4) {
      visualIllustration =
        "🇵🇭 Philippine Seas & Bays  ➔  🌊 Tidal Cycles  ➔  🏖️ Mangroves & Coastlines  ➔  🤝 Human Stewardship";
      pictureExamples = [
        {
          pics: "🐠 🐢 🪸",
          caption: "Philippine Marine Biodiversity",
          note: "Grade 4 Ocean • Rich tropical seas & reefs",
        },
        {
          pics: "🌗 🌊 🏖️",
          caption: "Tides & Coastal Landforms",
          note: "How tides shape beaches, coves & shores",
        },
        {
          pics: "🌿🌊 🛡️",
          caption: "Protecting Coastal Habitats",
          note: "How human actions affect oceans",
        },
      ];
      storyText = `DepEd MATATAG Grade 4 Ocean: Investigating ${lesson.title} across Philippine seas, coastal landforms, tides, and human impact.`;
      howItWorks =
        "Connect tidal movement and coastal features in Philippine waters to marine habitats and everyday human choices.";
    } else if (grade === 5) {
      visualIllustration =
        "☀️ Sunlit Epipelagic Zone  ➔  🌊 Ocean Currents  ➔  🧂 Salinity & Temperature  ➔  🌑 Deeper Pelagic Zones";
      pictureExamples = [
        {
          pics: "☀️🌊 / 🌊🌗 / 🌑🐟",
          caption: "Pelagic Depth Zones",
          note: "Grade 5 Ocean • Light drops with depth",
        },
        {
          pics: "🌀 🌡️ 🌊",
          caption: "Ocean Currents & Heat",
          note: "Circulating water moves heat & nutrients",
        },
        {
          pics: "🧂 💧 🧪",
          caption: "Salinity & Ocean Chemistry",
          note: "Dissolved salts & water properties",
        },
      ];
      storyText = `DepEd MATATAG Grade 5 Ocean: Investigating ${lesson.title}—diving across pelagic zones, currents, salinity, and ocean chemistry.`;
      howItWorks =
        "Compare ocean layers from sunlit surface waters to deeper zones, and analyze how currents, temperature, and salinity shape marine conditions.";
    } else {
      visualIllustration =
        "🌊 Ocean Heat & Winds  ➔  🌦️ Weather & Climate  ➔  🌿 Mangrove/Seagrass Blue Carbon  ➔  🌍 Conservation";
      pictureExamples = [
        {
          pics: "🌊 ☁️ 🌦️",
          caption: "Ocean-Atmosphere Climate Link",
          note: "Grade 6 Ocean • Oceans drive weather & climate",
        },
        {
          pics: "🌿🌊 🪨💨",
          caption: "Blue Carbon Ecosystems",
          note: "Mangroves & seagrasses store carbon",
        },
        {
          pics: "🛡️ 🐠 🌍",
          caption: "Marine Conservation Science",
          note: "Sustaining coastal & ocean health",
        },
      ];
      storyText = `DepEd MATATAG Grade 6 Ocean: Investigating ${lesson.title}—how oceans influence climate, blue carbon habitats, and marine conservation.`;
      howItWorks =
        "Analyze how oceans and the atmosphere interact to shape climate, how blue carbon habitats store carbon, and how science guides conservation.";
    }

    t1Pool = [
      buildQuestion(
        `In Grade ${grade} Ocean (${lesson.title}), what is the core concept?`,
        lesson.meaning,
        [
          "Assuming ocean conditions never change.",
          "Ignoring how organisms and water interact.",
        ],
        `Spot on! In Grade ${grade} Ocean, ${lesson.title} focuses on that exact relationship.`
      ),
      buildQuestion(
        `Which example fits Grade ${grade} Ocean studies for "${lesson.title}"?`,
        lesson.example,
        [
          "Ocean habitats have no living organisms.",
          "Water movement has no effect on coastal life.",
        ],
        "Great job connecting the lesson concept to a concrete ocean example!"
      ),
    ];
    t2Pool = [
      buildQuestion(
        `During our Grade ${grade} Ocean classroom demo (${lesson.example}), what should you observe?`,
        lesson.example,
        [
          "Guessing without observing water or organisms.",
          "Treating all non-living rocks as alive.",
        ],
        `Well done! Careful observation is essential in Grade ${grade} Ocean exploration.`
      ),
    ];
    t3Pool = [
      buildQuestion(
        `How can a Grade ${grade} learner apply "${lesson.title}" to protect marine environments?`,
        "Practice responsible waste habits, respect habitats, and use evidence to care for water and coastal life.",
        [
          "Leave plastic waste along shorelines.",
          "Disturb marine animals without care.",
        ],
        "Awesome! Responsible habits help protect ocean ecosystems."
      ),
    ];
  } else if (isScience) {
    if (grade === 1) {
      visualIllustration =
        "👀👂👃👅✋ Five Senses (Safe Use)  ➔  🌱🐕 Living Things  ➔  🪨☀️ Non-Living Surroundings";
      pictureExamples = [
        {
          pics: "👀 👂 👃 ✋",
          caption: "Safe Sense Observation",
          note: "Grade 1 Science • Observe safely with senses",
        },
        {
          pics: "🐕 🌱 🐦",
          caption: "Living Plants & Animals",
          note: "Grow, need food/water & respond",
        },
        {
          pics: "🪨 ☀️ 💧",
          caption: "Non-Living Earth Surroundings",
          note: "Rocks, sunlight, air & water around us",
        },
      ];
      storyText = `DepEd MATATAG Grade 1 Science: Exploring ${lesson.title}—using your senses safely to observe living and non-living things, plants, animals, and surroundings.`;
      howItWorks =
        "Use your senses safely to observe details, tell living plants and animals apart from non-living things, and describe daily surroundings.";
    } else if (grade === 2) {
      visualIllustration =
        "👉 Push / 🤲 Pull (Forces)  ➔  ☀️💡 Light & Heat  ➔  ☀️⛅🌧️ Daily Weather";
      pictureExamples = [
        {
          pics: "👉 📦  /  🤲 🎒",
          caption: "Pushes & Pulls in Motion",
          note: "Grade 2 Science • Forces start/stop/change motion",
        },
        {
          pics: "☀️ 🔦 🔥",
          caption: "Sources of Light & Heat",
          note: "Natural and artificial light/heat sources",
        },
        {
          pics: "☀️ ➔ ⛅ ➔ 🌧️",
          caption: "Daily Weather Changes",
          note: "Observing weather across the day",
        },
      ];
      storyText = `DepEd MATATAG Grade 2 Science: Exploring ${lesson.title}—pushes and pulls, sources of light and heat, and daily weather changes.`;
      howItWorks =
        "Observe how pushes and pulls move objects, identify sources of light and heat, and track how weather changes during the day.";
    } else if (grade === 3) {
      visualIllustration =
        "🧊 Solid (Fixed Shape)  ➔  💧 Liquid (Flows)  ➔  ☁️ Gas (Spreads)  ➔  🌡️ Temperature Changes";
      pictureExamples = [
        {
          pics: "🧊 🪨 📦",
          caption: "Observable Properties of Solids",
          note: "Grade 3 Science • Definite shape & volume",
        },
        {
          pics: "💧 🥛 🫖",
          caption: "Liquids & Gases",
          note: "Liquids flow; gases spread in space",
        },
        {
          pics: "🧊 ──(+Heat)──▶ 💧 ──(+Heat)──▶ ☁️",
          caption: "Temperature Changes Matter",
          note: "Heating & cooling change states",
        },
      ];
      storyText = `DepEd MATATAG Grade 3 Science: Investigating ${lesson.title}—properties of solids, liquids, and gases and how temperature changes matter.`;
      howItWorks =
        "Compare observable properties of solids, liquids, and gases, and observe how adding or removing heat changes matter.";
    } else if (grade === 4) {
      visualIllustration =
        "🧪 Material Properties  ➔  🥣 Mixtures  ➔  🔄 Physical & Chemical Changes";
      pictureExamples = [
        {
          pics: "🧲 💧 🪨",
          caption: "Classifying Materials",
          note: "Grade 4 Science • Hardness, magnetism, solubility",
        },
        {
          pics: "🥜 + 🍇 = 🥣",
          caption: "Exploring Mixtures",
          note: "Combining materials in mixtures",
        },
        {
          pics: "🧊➔💧  /  🪵🔥➔🌫️",
          caption: "Physical & Chemical Changes",
          note: "Observing how materials change",
        },
      ];
      storyText = `DepEd MATATAG Grade 4 Science: Investigating ${lesson.title}—material properties, mixtures, and physical and chemical changes.`;
      howItWorks =
        "Classify materials by properties, examine how mixtures form, and tell physical changes apart from chemical changes using evidence.";
    } else if (grade === 5) {
      visualIllustration =
        "🫀 Organ Systems Working Together  ➔  🌱🐣 Reproduction  ➔  🪨🌦️ Weathering of Earth Surfaces";
      pictureExamples = [
        {
          pics: "🫁 ❤️ 🧠",
          caption: "Body Systems & Functions",
          note: "Grade 5 Science • How systems work together",
        },
        {
          pics: "🌱 🌸 🐣",
          caption: "Plant & Animal Reproduction",
          note: "Passing traits & continuing life cycles",
        },
        {
          pics: "⛰️ 💧💨 🪨",
          caption: "Weathering Earth Surfaces",
          note: "How rocks & landforms break down",
        },
      ];
      storyText = `DepEd MATATAG Grade 5 Science: Investigating ${lesson.title}—body systems, plant and animal reproduction, and how Earth surfaces weather.`;
      howItWorks =
        "Trace how body systems coordinate, how plants and animals reproduce, and how weathering breaks down rocks and shapes Earth's surface.";
    } else {
      visualIllustration =
        "⚡ Forms of Energy  ➔  🧲⚖️ Forces & Motion  ➔  ⚙️ Simple Machines  ➔  🌍🌕 Earthquakes, Volcanoes & Solar System";
      pictureExamples = [
        {
          pics: "⚡ 💡 🔋",
          caption: "Energy, Forces & Motion",
          note: "Grade 6 Science • Energy transfer & movement",
        },
        {
          pics: "⚙️ 📐 🏋️",
          caption: "Simple Machines & Work",
          note: "Making tasks easier with mechanical advantage",
        },
        {
          pics: "🌋 🌎 🌕",
          caption: "Earth Processes & Space Motions",
          note: "Quakes, volcanoes & Earth-Moon motions",
        },
      ];
      storyText = `DepEd MATATAG Grade 6 Science: Investigating ${lesson.title}—energy, forces and motion, simple machines, Earth events, and solar system motions.`;
      howItWorks =
        "Analyze how energy and forces drive motion and simple machines, how earthquakes and volcanoes occur, and how Earth, Moon, and solar system bodies move.";
    }

    t1Pool = [
      buildQuestion(
        `In Grade ${grade} Science (${lesson.title}), what is the key scientific idea?`,
        lesson.meaning,
        [
          "Relying on random guesses without evidence.",
          "Ignoring observable properties or changes.",
        ],
        `Correct! In Grade ${grade} Science, ${lesson.title} centers on ${lesson.meaning.toLowerCase()}`
      ),
      buildQuestion(
        `Which example matches Grade ${grade} Science for "${lesson.title}"?`,
        lesson.example,
        [
          "An unrelated topic with no scientific observation.",
          "Assuming changes happen without cause.",
        ],
        "Spot on! That example directly shows the lesson in action."
      ),
    ];
    t2Pool = [
      buildQuestion(
        `In our Grade ${grade} Science demonstration (${lesson.example}), what should you record?`,
        lesson.example,
        [
          "Fabricated results without observing.",
          "Ignoring how conditions or objects behave.",
        ],
        `Great job! Accurate observations build strong Grade ${grade} science skills.`
      ),
    ];
    t3Pool = [
      buildQuestion(
        `How does "${lesson.title}" help in Grade ${grade} everyday science?`,
        "It helps us explain natural events, stay safe, and make evidence-based choices.",
        [
          "It only applies inside a single textbook page.",
          "Observations are never useful outside class.",
        ],
        "Awesome! Science helps us understand and care for our surroundings."
      ),
    ];
  } else {
    if (grade === 1) {
      visualIllustration =
        "🟦 (10-Rod) 🟦 (10-Rod) + 🟨🟨🟨 (3-Ones) = 23  |  🔢 Count, Read, Write & Compare (Up to 100)";
      pictureExamples = [
        {
          pics: "🟦🟦🟦  🟨🟨",
          caption: "Tens & Ones Place Value",
          note: "Grade 1 Math • Group tens & count ones up to 100",
        },
        {
          pics: "🥭🥭🥭🥭  vs  🥭🥭",
          caption: "Comparing Quantities",
          note: "4 is greater than 2; count & compare sets",
        },
        {
          pics: "1️⃣st ➔ 2️⃣nd ➔ 3️⃣rd",
          caption: "Order & Counting Sequence",
          note: "Read, write & order numbers cleanly",
        },
      ];
      storyText = `DepEd MATATAG Grade 1 Math: Exploring ${lesson.title}—counting, reading, writing, and comparing numbers up to 100 with tens and ones blocks.`;
      howItWorks =
        "Group objects into tens and ones, count accurately one by one, and compare quantities using greater than, less than, or equal to.";
    } else if (grade === 2) {
      visualIllustration =
        "🟦 (100-Flat)  🟩 (10-Rod)  🟨 (1-Unit)  ➔  Up to 1,000  |  ➕➖ Word Problems";
      pictureExamples = [
        {
          pics: "🟦 🟩🟩 🟨🟨🟨",
          caption: "Hundreds, Tens & Ones",
          note: "Grade 2 Math • Place value up to 1,000",
        },
        {
          pics: "➕ 245 + 138 = 383",
          caption: "Addition & Subtraction",
          note: "Align columns & regroup carefully",
        },
        {
          pics: "📝 Read ➔ Plan ➔ Solve ➔ Check",
          caption: "Word Problems",
          note: "Solve real-life addition & subtraction stories",
        },
      ];
      storyText = `DepEd MATATAG Grade 2 Math: Exploring ${lesson.title}—working with hundreds, tens, and ones up to 1,000 and solving addition/subtraction word problems.`;
      howItWorks =
        "Align digits by hundreds, tens, and ones up to 1,000, regroup accurately when adding or subtracting, and check word problem steps.";
    } else if (grade === 3) {
      visualIllustration =
        "✖️ Equal Groups & Arrays  ➔  ➗ Division Fluency  ➔  🍕 Unit Fractions  ➔  ⬜ Perimeter & Area";
      pictureExamples = [
        {
          pics: "⭐⭐⭐\n⭐⭐⭐  (2 × 3 = 6)",
          caption: "Multiplication & Division",
          note: "Grade 3 Math • Equal groups, arrays & division facts",
        },
        {
          pics: "🍕 [1/2]   🥧 [1/4]",
          caption: "Unit Fractions",
          note: "Equal parts of one whole",
        },
        {
          pics: "⬜ Perimeter & Area",
          caption: "Measure Around & Inside",
          note: "Add sides for perimeter; count/multiply squares for area",
        },
      ];
      storyText = `DepEd MATATAG Grade 3 Math: Exploring ${lesson.title}—multiplication and division fluency, unit fractions, and perimeter and area.`;
      howItWorks =
        "Use equal groups and arrays for multiplication and division, identify unit fractions of a whole, and measure perimeter and area.";
    } else if (grade === 4) {
      visualIllustration =
        "🔢 Multi-Digit Operations  ➔  🍰 Equivalent Fractions  ➔  📐 Angles  ➔  ⬜ Perimeter & Area";
      pictureExamples = [
        {
          pics: "✖️➗ Multi-Step Whole Numbers",
          caption: "Multi-Digit Operations",
          note: "Grade 4 Math • Multi-step whole-number problems",
        },
        {
          pics: "1/2 = 2/4 = 3/6",
          caption: "Equivalent Fractions",
          note: "Fractions naming the same amount",
        },
        {
          pics: "📐 ∠ 90°  |  ⬜ P & A",
          caption: "Angles, Perimeter & Area",
          note: "Measure angles & solve shape problems",
        },
      ];
      storyText = `DepEd MATATAG Grade 4 Math: Exploring ${lesson.title}—multi-digit operations, equivalent fractions, perimeter/area, and angle measurements.`;
      howItWorks =
        "Break multi-step problems into clear operations, recognize equivalent fractions, and apply angle and perimeter/area rules.";
    } else if (grade === 5) {
      visualIllustration =
        "🔢 Decimals  ➔  🍰 Fractions  ➔  📦 Volume of Rectangular Prisms  ➔  📈 Line Graphs";
      pictureExamples = [
        {
          pics: "0.5 + 0.25 = 0.75",
          caption: "Decimals & Fractions",
          note: "Grade 5 Math • Add & subtract decimals & fractions",
        },
        {
          pics: "📦 L × W × H = Volume",
          caption: "Volume of Rectangular Prisms",
          note: "Measure 3D space in cubic units",
        },
        {
          pics: "📈 ↗️ ↘️",
          caption: "Line Graphs",
          note: "Read changes & trends over time",
        },
      ];
      storyText = `DepEd MATATAG Grade 5 Math: Exploring ${lesson.title}—adding and subtracting decimals, working with fractions, volume of rectangular prisms, and line graphs.`;
      howItWorks =
        "Line up decimal places and common fraction parts carefully, multiply length × width × height for prism volume, and read trends on line graphs.";
    } else {
      visualIllustration =
        "⚖️ Ratios & Percentages  ➔  ➕➖ Integers  ➔  ⭕ Surface Area & Circles  ➔  🔤 Algebraic Patterns & Equations";
      pictureExamples = [
        {
          pics: "3:2  |  25% = 1/4",
          caption: "Ratios, Rates & Percentages",
          note: "Grade 6 Math • Proportional reasoning & percents",
        },
        {
          pics: "−5  ◀── 0 ──▶  +5",
          caption: "Integers",
          note: "Positive & negative whole numbers",
        },
        {
          pics: "⭕ Area/Circumference  |  2x + 1",
          caption: "Circles, Surface Area & Algebra",
          note: "Patterns, expressions & equations",
        },
      ];
      storyText = `DepEd MATATAG Grade 6 Math: Exploring ${lesson.title}—ratios, percentages, integers, surface area/circles, and algebraic patterns and equations.`;
      howItWorks =
        "Set up ratios and percentages accurately, follow integer sign rules, apply circle/surface area formulas, and solve or evaluate algebraic patterns and equations.";
    }

    t1Pool = [
      buildQuestion(
        `In Grade ${grade} Math (${lesson.title}), what is the key math rule to remember?`,
        lesson.meaning,
        [
          "Skipping steps and guessing randomly.",
          "Ignoring place value, units, or number relationships.",
        ],
        `Correct! In Grade ${grade} Math, ${lesson.title} relies on ${lesson.meaning.toLowerCase()}`
      ),
      buildQuestion(
        `Which example illustrates Grade ${grade} Math for "${lesson.title}"?`,
        lesson.example,
        [
          "An unrelated non-math story.",
          "An answer that ignores the given numbers.",
        ],
        "Spot on! That example shows how the concept works."
      ),
    ];
    t2Pool = [
      buildQuestion(
        `When solving a Grade ${grade} Math problem like "${lesson.example}", what should you do?`,
        `Follow the steps shown in "${lesson.example}" and double-check your result.`,
        [
          "Rush without checking numbers or units.",
          "Ignore the problem's given values.",
        ],
        `Great job! Checking each step keeps your Grade ${grade} math accurate.`
      ),
    ];
    t3Pool = [
      buildQuestion(
        `How do we apply Grade ${grade} Math ("${lesson.title}") outside the classroom?`,
        "By solving real-life quantities, measurements, comparisons, or patterns accurately.",
        [
          "Math has no connection to daily life.",
          "Numbers are only used for decoration.",
        ],
        "Awesome! Math helps solve everyday problems clearly."
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
      story: `Let's see how ${lesson.title} works in a Grade ${grade} ${subjectTitle} classroom step by step.`,
      howItWorks: "Follow the visual illustration and picture cards below:",
      visualIllustration,
      pictureExamples,
      demonstration: demoText,
      questions: t2Pool,
    },
    {
      title: "3. Real-World Explorer Mission",
      story: `Now let's apply ${lesson.title} in Grade ${grade} ${subjectTitle} to a real-world situation.`,
      howItWorks: "Use what you observed to answer the checkpoint question.",
      visualIllustration,
      pictureExamples,
      demonstration: demoText,
      questions: t3Pool,
    },
  ];

  const fullRecapPool = [
    buildQuestion(
      `Grade ${grade} ${subjectTitle} Recap 1: What is the main focus of "${lesson.title}"?`,
      lesson.meaning,
      ["An unrelated topic.", "Pure guesswork without rules."],
      `Accurate recall of Grade ${grade} ${subjectTitle}!`
    ),
    buildQuestion(
      `Grade ${grade} ${subjectTitle} Recap 2: Which example belongs to "${lesson.title}"?`,
      lesson.example,
      ["A completely different subject.", "No example at all."],
      "Great job matching the example to the lesson!"
    ),
    buildQuestion(
      `Grade ${grade} ${subjectTitle} Recap 3: Why is practicing "${lesson.title}" helpful?`,
      `It strengthens Grade ${grade} ${subjectTitle} understanding and problem-solving skills.`,
      ["It makes learning harder.", "Practice does not help."],
      "Consistent practice builds confidence and mastery!"
    ),
  ];

  const recapQuestions = shuffle(fullRecapPool);
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
  const { subject, lessons, initialSelectedIndex } = useMemo(
    () => resolveSubjectAndLessons(initialSubject, initialLesson, gradeLevel),
    [initialSubject, initialLesson, gradeLevel]
  );

  const [selectedLessonIdx, setSelectedLessonIdx] = useState(initialSelectedIndex);

  const lesson = lessons[selectedLessonIdx] || lessons[0];
  const storageKey = getStorageKey(gradeLevel, subject.title, lesson.title);

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

  const [stage, setStage] = useState("topic_learn");
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

  useEffect(() => {
    setSelectedLessonIdx(initialSelectedIndex);
    setStage("topic_learn");
    setTopicIndex(0);
    setTopicQuestionIndex(0);
    setRecapQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
  }, [initialSelectedIndex, initialLesson, subject.title, gradeLevel]);

  const handleSelectLessonTab = (idx, e) => {
    e?.stopPropagation();
    playSfx?.("click");
    setSelectedLessonIdx(idx);
    setStage("topic_learn");
    setTopicIndex(0);
    setTopicQuestionIndex(0);
    setRecapQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
  };

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
          maxWidth: 1120,
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
            marginBottom: 16,
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

        {/* All Lessons Horizontal Strip for Subject & Grade */}
        <div
          style={{
            background: "rgba(18, 30, 62, 0.9)",
            border: "1px solid rgba(99, 225, 232, 0.32)",
            borderRadius: 16,
            padding: "12px 14px",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <span
              style={{
                color: "#8be7ff",
                fontSize: 12,
                fontWeight: 900,
                letterSpacing: 0.4,
              }}
            >
              {subject.icon} ALL {subject.title.toUpperCase()} LESSONS (GRADE {gradeLevel}) • {lessons.length} LESSONS
            </span>
            <span style={{ color: "#a5b8e8", fontSize: 11.5, fontWeight: 700 }}>
              Scroll / Tap Lesson →
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              overflowX: "auto",
              paddingBottom: 4,
            }}
          >
            {lessons.map((item, idx) => {
              const active = idx === selectedLessonIdx;
              return (
                <button
                  key={`${item.title}-${idx}`}
                  type="button"
                  onClick={(e) => handleSelectLessonTab(idx, e)}
                  style={{
                    minWidth: 220,
                    maxWidth: 260,
                    flexShrink: 0,
                    textAlign: "left",
                    background: active
                      ? "linear-gradient(135deg, rgba(88, 85, 234, 0.48), rgba(56, 189, 248, 0.25))"
                      : "rgba(28, 44, 88, 0.85)",
                    border: active
                      ? `2px solid ${subject.color || "#63e1e8"}`
                      : "1px solid #395296",
                    borderRadius: 14,
                    padding: "10px 12px",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      color: active ? "#ffd05a" : "#93c5fd",
                      fontSize: 11,
                      fontWeight: 900,
                      marginBottom: 3,
                    }}
                  >
                    Lesson {idx + 1} • {item.difficulty || "Easy"}
                  </div>
                  <div
                    style={{
                      color: "#ffffff",
                      fontSize: 13.5,
                      fontWeight: 800,
                      lineHeight: 1.35,
                    }}
                  >
                    {item.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Hero Lesson Header Card + Lesson Viewer Going Right */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: 16,
            alignItems: "start",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: "rgba(22, 37, 74, 0.88)",
              backdropFilter: "blur(10px)",
              border: `2px solid ${subject.color || "#63e1e8"}`,
              borderRadius: 20,
              padding: "18px 20px",
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
                marginTop: 12,
              }}
            >
              {stage === "summary"
                ? "Mission Accomplished!"
                : stage === "recap_quiz"
                ? `Final Mastery Quiz (${recapQuestionIndex + 1} of ${recapQuestions.length})`
                : `Topic ${topicIndex + 1} of ${topics.length}: ${currentTopic.title}`}
            </div>

            <div
              style={{
                marginTop: 12,
                paddingTop: 12,
                borderTop: "1px solid rgba(165, 184, 232, 0.2)",
                color: "#cbd5e1",
                fontSize: 13.5,
                lineHeight: 1.55,
              }}
            >
              {lesson.meaning}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {stage === "topic_learn" && (
              <motion.div
                key={`learn-${selectedLessonIdx}-${topicIndex}`}
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

                {currentTopic.pictureExamples?.length > 0 && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(175px, 1fr))",
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
                key={`quiz-${selectedLessonIdx}-${stage}-${topicIndex}-${topicQuestionIndex}-${recapQuestionIndex}`}
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