import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import scienceGif from "../assets/BiosphereQuestAssets/Science gif.gif";
import mathIcon from "../assets/BiosphereQuestAssets/Math Icon.png";
import rocketGif from "../assets/BiosphereQuestAssets/Rocket.gif";

const COURSES = [
  // ================= GRADE 1 =================
  {
    id: "math-g1-1",
    title: "Numbers Up to 100 & Place Value",
    category: "Math • Grade 1",
    subject: "Math",
    grade: 1,
    icon: mathIcon,
    accent: "#ffdf4e",
    desc: "Count, read, write, and compare whole numbers up to 100 using tens and ones blocks.",
    modules: ["Numerals 1–100 & Number Line", "Tens & Ones Grouping", "Comparing & Ordering Numbers"],
    lessonSteps: [
      {
        heading: "1. Counting to 100 with Tens & Ones",
        body: "In MATATAG Grade 1 Math, numbers up to 100 can be grouped into bundles of 10 and leftover ones—like 34 = 3 tens and 4 ones.",
        checkQuestion: "How many tens are in the number 52?",
        options: ["2 tens", "5 tens", "52 tens"],
        answerIndex: 1,
      },
      {
        heading: "2. Comparing Quantities",
        body: "Compare the tens digit first when two-digit numbers are different; if the tens are equal, compare the ones digit.",
        checkQuestion: "Which number is greater: 48 or 61?",
        options: ["48", "61", "They are equal"],
        answerIndex: 1,
      },
    ],
    notes: [
      {
        tag: "Number & Algebra",
        title: "Place Value (Tens & Ones)",
        summary: "A 2-digit number shows groups of 10 (tens) and single units (ones), such as 27 = 20 + 7.",
      },
      {
        tag: "Quick Tip",
        title: "Number Line Order",
        summary: "Moving right on a number line increases value; moving left decreases value.",
      },
    ],
  },
  {
    id: "math-g1-2",
    title: "2D Shapes, Time & Simple Pictographs",
    category: "Math • Grade 1",
    subject: "Math",
    grade: 1,
    icon: mathIcon,
    accent: "#facc15",
    desc: "Identify squares, rectangles, and triangles, tell time by the hour, and read simple pictographs.",
    modules: ["2D Shapes, Sides & Corners", "Reading Clock Hours", "Sorting & Simple Pictographs"],
    lessonSteps: [
      {
        heading: "1. Sides & Corners of 2D Shapes",
        body: "Triangles have 3 straight sides and 3 corners, while squares and rectangles each have 4 straight sides and 4 corners.",
        checkQuestion: "How many sides does a triangle have?",
        options: ["2 sides", "3 sides", "4 sides"],
        answerIndex: 1,
      },
    ],
    notes: [
      {
        tag: "Measurement & Geometry",
        title: "Basic 2D Figures",
        summary: "Recognize squares, rectangles, triangles, and circles regardless of size or tilt.",
      },
      {
        tag: "Data & Probability",
        title: "Reading Pictographs",
        summary: "Count each picture symbol carefully to compare categories and find the most or least.",
      },
    ],
  },
  {
    id: "ocean-g1-1",
    title: "Hello, Shallow Reef & Tide Pools",
    category: "Ocean • Grade 1",
    subject: "Ocean",
    grade: 1,
    icon: scienceGif,
    accent: "#22d3ee",
    desc: "Meet gentle tide-pool creatures, feel how water moves, and spot living vs. non-living things by the shore.",
    modules: ["Living vs. Non-Living by the Shore", "Tide Pool Friends & Shells", "Keeping Beaches & Waters Clean"],
    lessonSteps: [
      {
        heading: "1. Living Things in Coastal Waters",
        body: "Crabs, starfish, and seaweeds are living things because they grow, need food or sunlight, and respond to their surroundings.",
        checkQuestion: "Which one is a living thing in a tide pool?",
        options: ["Smooth pebble", "Hermit crab", "Dry driftwood"],
        answerIndex: 1,
      },
    ],
    notes: [
      {
        tag: "Coastal Discovery",
        title: "Tide Pools",
        summary: "Shallow rocky pools left behind when the tide goes out, home to small marine life.",
      },
      {
        tag: "Care for Nature",
        title: "Leave No Trash",
        summary: "Plastics harm sea animals; always place trash in proper bins.",
      },
    ],
  },

  // ================= GRADE 2 =================
  {
    id: "math-g2-1",
    title: "Numbers Up to 1,000, Addition & Subtraction",
    category: "Math • Grade 2",
    subject: "Math",
    grade: 2,
    icon: mathIcon,
    accent: "#ffdf4e",
    desc: "Work with hundreds, tens, and ones up to 1,000 and solve addition and subtraction word problems.",
    modules: ["Hundreds, Tens & Ones to 1,000", "Regrouping in Addition & Subtraction", "Halves & Quarters of Wholes"],
    lessonSteps: [
      {
        heading: "1. Place Value to 1,000",
        body: "Three-digit numbers combine hundreds, tens, and ones—for example, 425 means 4 hundreds, 2 tens, and 5 ones.",
        checkQuestion: "What is the value of 3 in 360?",
        options: ["3", "30", "300"],
        answerIndex: 2,
      },
    ],
    notes: [
      {
        tag: "Number & Algebra",
        title: "Addition & Subtraction Strategies",
        summary: "Align place values (ones under ones, tens under tens, hundreds under hundreds) and check answers.",
      },
      {
        tag: "Fractions Intro",
        title: "Equal Parts",
        summary: "One-half (1/2) means 1 of 2 equal parts; one-fourth (1/4) means 1 of 4 equal parts.",
      },
    ],
  },
  {
    id: "ocean-g2-1",
    title: "Whales, Dolphins & Ocean Movement",
    category: "Ocean • Grade 2",
    subject: "Ocean",
    grade: 2,
    icon: scienceGif,
    accent: "#38bdf8",
    desc: "Explore how marine animals move, breathe, and shelter in open waters and coastal bays.",
    modules: ["How Fish & Marine Mammals Move", "Shelters Under the Waves", "Water & Weather Near the Coast"],
    lessonSteps: [
      {
        heading: "1. Fins, Tails & Swimming",
        body: "Fins and tails help aquatic animals steer, balance, and push through water smoothly.",
        checkQuestion: "What body parts help fish steer and swim in water?",
        options: ["Fins and tail", "Wings and feathers", "Hooves"],
        answerIndex: 0,
      },
    ],
    notes: [
      {
        tag: "Marine Life",
        title: "Habitats & Needs",
        summary: "Marine animals need clean water, food, oxygen, and safe shelter to survive.",
      },
    ],
  },

  // ================= GRADE 3 =================
  {
    id: "science-g3-1",
    title: "Matter Around Us: Solids, Liquids & Gases",
    category: "Science • Grade 3",
    subject: "Science",
    grade: 3,
    icon: scienceGif,
    accent: "#38bdf8",
    desc: "Investigate observable properties of solids, liquids, and gases and how temperature changes matter.",
    modules: ["Properties of Solids, Liquids & Gases", "Heating & Cooling Changes", "Safe Scientific Observation"],
    lessonSteps: [
      {
        heading: "1. Solids, Liquids, and Gases",
        body: "Under MATATAG Grade 3 Science, solids keep their own shape, liquids take the shape of their container while keeping volume, and gases spread to fill space.",
        checkQuestion: "Which state of matter takes the shape of its container and has a definite volume?",
        options: ["Solid", "Liquid", "Gas"],
        answerIndex: 1,
      },
    ],
    notes: [
      {
        tag: "MATATAG Science G3",
        title: "States of Matter",
        summary: "Solids hold shape; liquids flow and take container shape; gases expand to fill containers.",
      },
      {
        tag: "Inquiry Skills",
        title: "Observing Changes",
        summary: "Adding or removing heat can cause melting, freezing, evaporation, or condensation.",
      },
    ],
  },
  {
    id: "math-g3-1",
    title: "Multiplication, Division & Unit Fractions",
    category: "Math • Grade 3",
    subject: "Math",
    grade: 3,
    icon: mathIcon,
    accent: "#ffdf4e",
    desc: "Build multiplication and division fluency, explore unit fractions, and measure perimeter and area.",
    modules: ["Multiplication & Equal Groups", "Division as Fair Sharing", "Unit Fractions & Area Grids"],
    lessonSteps: [
      {
        heading: "1. Multiplication as Equal Groups",
        body: "Multiplying 6 × 4 means 6 groups of 4, which equals 24.",
        checkQuestion: "What is 6 × 4?",
        options: ["10", "20", "24"],
        answerIndex: 2,
      },
    ],
    notes: [
      {
        tag: "MATATAG Math G3",
        title: "Multiplication & Division Link",
        summary: "Multiplication combines equal groups; division splits a total into equal groups or shares.",
      },
      {
        tag: "Measurement",
        title: "Area vs. Perimeter",
        summary: "Perimeter is the distance around a shape; area is the surface covered inside it.",
      },
    ],
  },
  {
    id: "ocean-g3-1",
    title: "Coral Reefs & Marine Food Chains",
    category: "Science • Grade 3",
    subject: "Science",
    grade: 3,
    icon: scienceGif,
    accent: "#22d3ee",
    desc: "See how living things in coral reefs and seas depend on one another and on non-living water and light.",
    modules: ["Living & Non-Living Reef Factors", "Marine Food Chains", "Protecting Coral Ecosystems"],
    lessonSteps: [
      {
        heading: "1. Living & Non-Living in the Sea",
        body: "Corals, clownfish, and seagrasses are living components, while sunlight, seawater, and rocks are non-living components that support them.",
        checkQuestion: "Which is a non-living part of a marine habitat?",
        options: ["Sunlight & seawater", "Sea turtle", "Kelp"],
        answerIndex: 0,
      },
    ],
    notes: [
      {
        tag: "Ocean Ecosystem",
        title: "Interdependence",
        summary: "Living things rely on other organisms and non-living resources like water, air, and sunlight.",
      },
    ],
  },

  // ================= GRADE 4 =================
  {
    id: "science-g4-1",
    title: "Materials, Mixtures & Changes in Matter",
    category: "Science • Grade 4",
    subject: "Science",
    grade: 4,
    icon: scienceGif,
    accent: "#38bdf8",
    desc: "Classify materials by properties, explore mixtures, and observe physical and chemical changes.",
    modules: ["Useful & Harmful Materials", "Mixtures & Separating Methods", "Changes When Heat or Force Is Applied"],
    lessonSteps: [
      {
        heading: "1. Properties & Safe Use of Materials",
        body: "MATATAG Grade 4 Science highlights choosing materials based on hardness, flexibility, conductivity, and safety.",
        checkQuestion: "Why check material properties before using or disposing of household items?",
        options: ["To use them safely and responsibly", "To ignore labels", "Because properties never matter"],
        answerIndex: 0,
      },
    ],
    notes: [
      {
        tag: "MATATAG Science G4",
        title: "Mixtures",
        summary: "A mixture combines two or more substances physically without forming a brand-new chemical substance.",
      },
    ],
  },
  {
    id: "math-g4-1",
    title: "Multi-Digit Operations, Fractions & Angles",
    category: "Math • Grade 4",
    subject: "Math",
    grade: 4,
    icon: mathIcon,
    accent: "#ffdf4e",
    desc: "Solve multi-step whole number problems, equivalent fractions, perimeter/area, and angle measurements.",
    modules: ["Multi-Digit Multiplication & Division", "Equivalent & Proper Fractions", "Angles, Triangles & Bar Graphs"],
    lessonSteps: [
      {
        heading: "1. Equivalent Fractions",
        body: "Equivalent fractions name the same amount of a whole—for example, 1/2 is equal to 2/4 and 3/6.",
        checkQuestion: "Which fraction is equivalent to 1/2?",
        options: ["2/4", "1/5", "3/4"],
        answerIndex: 0,
      },
    ],
    notes: [
      {
        tag: "MATATAG Math G4",
        title: "Equivalent Fractions",
        summary: "Multiplying or dividing both numerator and denominator by the same non-zero number keeps the value equal.",
      },
    ],
  },
  {
    id: "ocean-g4-1",
    title: "Philippine Seas, Tides & Coastal Habitats",
    category: "Ocean • Grade 4",
    subject: "Ocean",
    grade: 4,
    icon: rocketGif,
    accent: "#63e1e8",
    desc: "Explore marine biodiversity in Philippine waters, coastal landforms, and how human actions affect oceans.",
    modules: ["Archipelagic Seas & Marine Life", "Mangroves, Seagrass & Coral Reefs", "Sustainable Ocean Stewardship"],
    lessonSteps: [
      {
        heading: "1. Coastal Buffers: Mangroves & Reefs",
        body: "Mangrove forests along coasts help protect shorelines from wave energy and provide nurseries for young fish and crustaceans.",
        checkQuestion: "How do coastal mangroves help marine life and shorelines?",
        options: ["Provide nurseries and buffer waves", "Block all ocean currents", "Turn seawater into desert"],
        answerIndex: 0,
      },
    ],
    notes: [
      {
        tag: "Marine Stewardship",
        title: "Connected Coastal Habitats",
        summary: "Mangroves, seagrass beds, and coral reefs work together as connected marine ecosystems.",
      },
    ],
  },

  // ================= GRADE 5 =================
  {
    id: "science-g5-1",
    title: "Body Systems, Reproduction & Weathering",
    category: "Science • Grade 5",
    subject: "Science",
    grade: 5,
    icon: scienceGif,
    accent: "#c084fc",
    desc: "Trace how organ systems work together, how plants and animals reproduce, and how earth surfaces change.",
    modules: ["Human Body Systems Working Together", "Plant & Animal Life Cycles", "Weathering, Soil & Land Changes"],
    lessonSteps: [
      {
        heading: "1. Systems Working Together",
        body: "In MATATAG Grade 5 Science, body systems coordinate tasks—such as the digestive and circulatory systems delivering nutrients around the body.",
        checkQuestion: "Which system transports nutrients and gases throughout the body?",
        options: ["Circulatory system", "Skeletal system alone", "Hair follicles"],
        answerIndex: 0,
      },
    ],
    notes: [
      {
        tag: "MATATAG Science G5",
        title: "Systems & Cycles",
        summary: "Organisms and Earth systems rely on interacting parts and recurring cycles.",
      },
    ],
  },
  {
    id: "math-g5-1",
    title: "Decimals, Fractions, Volume & Line Graphs",
    category: "Math • Grade 5",
    subject: "Math",
    grade: 5,
    icon: mathIcon,
    accent: "#ffdf4e",
    desc: "Add and subtract decimals, work with fractions, compute volume of rectangular prisms, and read line graphs.",
    modules: ["Decimal Place Value & Operations", "Adding & Subtracting Fractions", "Volume of Cubes & Prisms"],
    lessonSteps: [
      {
        heading: "1. Volume of a Rectangular Prism",
        body: "Volume measures 3D space inside a solid: Volume = length × width × height.",
        checkQuestion: "What is the volume of a box that is 4 cm × 3 cm × 2 cm?",
        options: ["9 cubic cm", "24 cubic cm", "14 cubic cm"],
        answerIndex: 1,
      },
    ],
    notes: [
      {
        tag: "MATATAG Math G5",
        title: "Volume Formula",
        summary: "V = l × w × h, measured in cubic units (such as cm³).",
      },
    ],
  },
  {
    id: "ocean-g5-1",
    title: "Pelagic Zones, Currents & Ocean Chemistry",
    category: "Ocean • Grade 5",
    subject: "Ocean",
    grade: 5,
    icon: rocketGif,
    accent: "#38bdf8",
    desc: "Dive from sunlit surface waters to twilight and midnight depths while learning about salinity and currents.",
    modules: ["Sunlight & Ocean Depth Zones", "Salinity, Temperature & Currents", "Deep-Sea Adaptations"],
    lessonSteps: [
      {
        heading: "1. Light & Temperature by Depth",
        body: "Sunlight penetrates only the upper ocean layers; deeper zones become darker and cooler, shaping how marine organisms adapt.",
        checkQuestion: "What happens to sunlight as you go deeper into the ocean?",
        options: ["It decreases until deep waters are dark", "It becomes brighter at the bottom", "It stays the same at all depths"],
        answerIndex: 0,
      },
    ],
    notes: [
      {
        tag: "Deep Ocean",
        title: "Depth & Adaptations",
        summary: "Organisms in darker or colder waters develop special traits like bioluminescence or energy-saving movement.",
      },
    ],
  },

  // ================= GRADE 6 =================
  {
    id: "science-g6-1",
    title: "Energy, Force, Motion & Earth-Moon Systems",
    category: "Science • Grade 6",
    subject: "Science",
    grade: 6,
    icon: rocketGif,
    accent: "#c084fc",
    desc: "Explore forms of energy, forces and motion, simple machines, earthquakes/volcanoes, and solar system motions.",
    modules: ["Forms & Transformation of Energy", "Forces, Motion & Simple Machines", "Earthquakes, Volcanoes & Solar System"],
    lessonSteps: [
      {
        heading: "1. Energy Transformation",
        body: "MATATAG Grade 6 Science covers how energy changes from one form to another—such as electrical energy turning into light and heat.",
        checkQuestion: "A flashlight converting battery chemical energy into light is an example of what?",
        options: ["Energy transformation", "Destroying energy", "Stopping gravity"],
        answerIndex: 0,
      },
    ],
    notes: [
      {
        tag: "MATATAG Science G6",
        title: "Forces & Energy",
        summary: "Forces can change an object's speed or direction; energy can transform across forms.",
      },
    ],
  },
  {
    id: "math-g6-1",
    title: "Ratios, Percentages, Integers & Algebraic Patterns",
    category: "Math • Grade 6",
    subject: "Math",
    grade: 6,
    icon: mathIcon,
    accent: "#ffdf4e",
    desc: "Master ratios and rates, percentages, integers, surface area/circles, and expressions & equations.",
    modules: ["Ratios, Rates & Percentages", "Integers & Number Line", "Expressions, Equations & Circles"],
    lessonSteps: [
      {
        heading: "1. Understanding Percentages",
        body: "Percent means 'per hundred'—so 25% equals 25 out of 100, or 0.25.",
        checkQuestion: "What is 50% of 80?",
        options: ["20", "40", "50"],
        answerIndex: 1,
      },
    ],
    notes: [
      {
        tag: "MATATAG Math G6",
        title: "Ratios & Percent",
        summary: "A ratio compares two quantities; a percent compares a part to 100.",
      },
    ],
  },
  {
    id: "ocean-g6-1",
    title: "Ocean-Atmosphere Climate & Blue Carbon",
    category: "Ocean • Grade 6",
    subject: "Ocean",
    grade: 6,
    icon: scienceGif,
    accent: "#63e1e8",
    desc: "Examine how oceans drive weather and climate patterns, blue carbon habitats, and marine conservation science.",
    modules: ["Ocean Heat & Weather Patterns", "Blue Carbon: Mangroves & Seagrass", "Data & Conservation in Marine Science"],
    lessonSteps: [
      {
        heading: "1. Oceans & Climate Regulation",
        body: "The ocean absorbs and distributes vast amounts of heat around Earth, strongly influencing regional weather and climate.",
        checkQuestion: "How do oceans affect Earth's climate and weather?",
        options: ["They absorb and circulate heat across the globe", "They have no effect on air or weather", "They stop water evaporation"],
        answerIndex: 0,
      },
    ],
    notes: [
      {
        tag: "Earth & Ocean Systems",
        title: "Blue Carbon Ecosystems",
        summary: "Coastal habitats like mangroves and seagrass trap carbon while supporting rich biodiversity.",
      },
    ],
  },
];

const SWIMMING_CREATURES = [
  { icon: "🪼", top: "68%", duration: 18, delay: 0, size: 30, reverse: false },
  { icon: "🐠", top: "78%", duration: 14, delay: 2, size: 26, reverse: true },
  { icon: "🐢", top: "85%", duration: 22, delay: 4, size: 32, reverse: false },
  { icon: "🦑", top: "73%", duration: 16, delay: 6, size: 28, reverse: true },
];

export default function ExploreCourses({ explorer, onEarnXp, playSfx }) {
  const [selectedGrade, setSelectedGrade] = useState(explorer?.grade || "all");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [activeCourse, setActiveCourse] = useState(null);
  const [viewerTab, setViewerTab] = useState("lesson"); // "lesson" | "notes"
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [completedStepKeys, setCompletedStepKeys] = useState({});
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
    () => [
      { id: 1, top: "8%", left: "15%", delay: 1, duration: 2.2 },
      { id: 2, top: "18%", left: "55%", delay: 4.5, duration: 1.9 },
      { id: 3, top: "5%", left: "75%", delay: 8, duration: 2.4 },
      { id: 4, top: "26%", left: "30%", delay: 11.5, duration: 2.0 },
    ],
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

  const filteredCourses = useMemo(() => {
    return COURSES.filter((course) => {
      const gradeMatch = selectedGrade === "all" || course.grade === Number(selectedGrade);
      const subjectMatch = selectedSubject === "All" || course.subject === selectedSubject;
      return gradeMatch && subjectMatch;
    });
  }, [selectedGrade, selectedSubject]);

  const openCourseViewer = (course) => {
    playSfx?.("click");
    setActiveCourse(course);
    setViewerTab("lesson");
    setStepIndex(0);
    setSelectedOption(null);
  };

  const currentStep =
    activeCourse?.lessonSteps?.[stepIndex] || activeCourse?.lessonSteps?.[0] || null;

  const handleCheckAnswer = (idx) => {
    if (!activeCourse || !currentStep) return;
    setSelectedOption(idx);
    if (idx === currentStep.answerIndex) {
      playSfx?.("correct");
      const key = `${activeCourse.id}-${stepIndex}`;
      if (!completedStepKeys[key]) {
        setCompletedStepKeys((prev) => ({ ...prev, [key]: true }));
        onEarnXp?.(25);
      }
    } else {
      playSfx?.("wrong");
    }
  };

  return (
    <div
      onClick={handleScreenClick}
      style={{
        position: "relative",
        minHeight: "82vh",
        borderRadius: 24,
        overflow: "hidden",
        padding: "24px 18px 36px",
        background:
          "linear-gradient(180deg, #060818 0%, #191247 26%, #13255c 52%, #094566 78%, #06637a 100%)",
        border: "1px solid rgba(99, 225, 232, 0.25)",
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
            position: "absolute",
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
          initial={{ x: creature.reverse ? "105%" : "-10%" }}
          animate={{
            x: creature.reverse ? "-10%" : "105%",
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

      {/* Rising Ocean Bubbles */}
      {bubbles.map((b) => (
        <motion.span
          key={`bubble-${b.id}`}
          initial={{ y: "105%", x: 0, opacity: 0 }}
          animate={{
            y: "-10%",
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
            zIndex: 1,
          }}
        />
      ))}

      {/* Foreground Content */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 900,
              background: "linear-gradient(90deg, #63e1e8, #c084fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            📚 Explore Courses & Learning Modules
          </h1>
          <p style={{ fontSize: 13.5, color: "#cbd5e1", marginTop: 4 }}>
            MATATAG-aligned Math, Science, and Ocean quests for Grades 1–6 with Interactive Lessons & Subject Notes!
          </p>
        </div>

        {/* Grade Level (Grades 1–6) & Subject Filters */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            alignItems: "center",
            marginBottom: 22,
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
            {["all", 1, 2, 3, 4, 5, 6].map((g) => {
              const active = String(selectedGrade) === String(g);
              return (
                <button
                  key={String(g)}
                  type="button"
                  onClick={() => {
                    playSfx?.("click");
                    setSelectedGrade(g);
                  }}
                  style={{
                    padding: "6px 13px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 900,
                    cursor: "pointer",
                    border: active ? "1.5px solid #63e1e8" : "1px solid rgba(148,163,184,0.28)",
                    background: active
                      ? "linear-gradient(90deg, #22d3ee, #818cf8)"
                      : "rgba(15, 23, 42, 0.78)",
                    color: active ? "#060818" : "#e2e8f0",
                  }}
                >
                  {g === "all" ? "All Grades (1–6)" : `Grade ${g}`}
                </button>
              );
            })}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
            {["All", "Math", "Science", "Ocean"].map((subj) => {
              const active = selectedSubject === subj;
              return (
                <button
                  key={subj}
                  type="button"
                  onClick={() => {
                    playSfx?.("click");
                    setSelectedSubject(subj);
                  }}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 12,
                    fontSize: 12,
                    fontWeight: 900,
                    cursor: "pointer",
                    border: active ? "1.5px solid #ffdf4e" : "1px solid rgba(148,163,184,0.28)",
                    background: active ? "rgba(255, 223, 78, 0.2)" : "rgba(15, 23, 42, 0.78)",
                    color: active ? "#ffdf4e" : "#cbd5e1",
                  }}
                >
                  {subj === "All" ? "All Subjects" : subj}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}>
          {filteredCourses.map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ y: -6, scale: 1.02 }}
              className="card-panel"
              style={{ border: `2px solid ${course.accent}44`, display: "flex", flexDirection: "column", justifyContent: "space-between" }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <img src={course.icon} alt="" style={{ width: 44, height: 44, objectFit: "contain" }} />
                  <div>
                    <span style={{ fontSize: 10.5, fontWeight: 900, color: course.accent }}>{course.category}</span>
                    <h3 style={{ fontSize: 18, fontWeight: 900, marginTop: 2 }}>{course.title}</h3>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.5, marginBottom: 16 }}>{course.desc}</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={(e) => {
                  e.stopPropagation();
                  openCourseViewer(course);
                }}
                style={{
                  background: `linear-gradient(90deg, ${course.accent}, #818cf8)`,
                  border: "none",
                  color: "#060818",
                  fontWeight: 900,
                  padding: "10px 16px",
                  borderRadius: 12,
                  cursor: "pointer",
                  fontSize: 13,
                  width: "100%",
                }}
              >
                Start Learning →
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Course Modules, Interactive Lesson Viewer & Subject Notes Modal */}
      <AnimatePresence>
        {activeCourse && (
          <div className="modal-backdrop" onClick={() => setActiveCourse(null)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="modal-box"
              style={{ maxWidth: 620 }}
              onClick={(e) => e.stopPropagation()}
            >
              <span style={{ fontSize: 11, fontWeight: 900, color: activeCourse.accent }}>
                {activeCourse.category}
              </span>
              <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 8 }}>{activeCourse.title}</h2>
              <p style={{ fontSize: 13, color: "#cbd5e1", marginBottom: 14 }}>
                Explore the interactive lesson, check your subject notes, or complete all modules to claim +75 XP!
              </p>

              {/* Viewer Mode Switcher */}
              <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={() => {
                    playSfx?.("click");
                    setViewerTab("lesson");
                  }}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 10,
                    fontSize: 12.5,
                    fontWeight: 900,
                    cursor: "pointer",
                    border: viewerTab === "lesson" ? "1.5px solid #63e1e8" : "1px solid rgba(148,163,184,0.3)",
                    background: viewerTab === "lesson" ? "#22d3ee" : "rgba(15, 23, 42, 0.75)",
                    color: viewerTab === "lesson" ? "#060818" : "#fff",
                  }}
                >
                  Interactive Lesson Viewer
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playSfx?.("click");
                    setViewerTab("notes");
                  }}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 10,
                    fontSize: 12.5,
                    fontWeight: 900,
                    cursor: "pointer",
                    border: viewerTab === "notes" ? "1.5px solid #c084fc" : "1px solid rgba(148,163,184,0.3)",
                    background: viewerTab === "notes" ? "#c084fc" : "rgba(15, 23, 42, 0.75)",
                    color: viewerTab === "notes" ? "#060818" : "#fff",
                  }}
                >
                  Subject Notes Viewer
                </button>
              </div>

              {viewerTab === "lesson" && currentStep ? (
                <div
                  style={{
                    background: "rgba(15, 23, 42, 0.78)",
                    padding: "14px 16px",
                    borderRadius: 14,
                    border: "1px solid rgba(99, 225, 232, 0.35)",
                    textAlign: "left",
                    marginBottom: 16,
                  }}
                >
                  <div style={{ fontSize: 11.5, fontWeight: 800, color: "#94a3b8" }}>
                    Lesson Step {stepIndex + 1} of {activeCourse.lessonSteps.length}
                  </div>
                  <div style={{ fontSize: 15.5, fontWeight: 900, marginTop: 4, color: "#fff" }}>
                    {currentStep.heading}
                  </div>
                  <p style={{ fontSize: 13, color: "#e2e8f0", lineHeight: 1.55, margin: "8px 0 12px" }}>
                    {currentStep.body}
                  </p>
                  <div style={{ fontSize: 12.5, fontWeight: 900, color: "#ffdf4e", marginBottom: 8 }}>
                    Quick Check: {currentStep.checkQuestion}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {currentStep.options.map((opt, idx) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleCheckAnswer(idx)}
                        style={{
                          padding: "7px 12px",
                          borderRadius: 10,
                          fontSize: 12,
                          fontWeight: 800,
                          cursor: "pointer",
                          color: "#fff",
                          background:
                            selectedOption === idx
                              ? idx === currentStep.answerIndex
                                ? "rgba(74, 222, 128, 0.28)"
                                : "rgba(248, 113, 113, 0.28)"
                              : "rgba(30, 41, 59, 0.9)",
                          border:
                            selectedOption === idx
                              ? idx === currentStep.answerIndex
                                ? "1.5px solid #4ade80"
                                : "1.5px solid #f87171"
                              : "1px solid rgba(148, 163, 184, 0.3)",
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {activeCourse.lessonSteps.length > 1 && (
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
                      <button
                        type="button"
                        disabled={stepIndex === 0}
                        onClick={() => {
                          setStepIndex((i) => Math.max(0, i - 1));
                          setSelectedOption(null);
                        }}
                        style={{
                          background: "#1e293b",
                          border: "1px solid rgba(148,163,184,0.3)",
                          color: "#fff",
                          borderRadius: 8,
                          padding: "5px 10px",
                          fontSize: 11.5,
                          fontWeight: 800,
                          cursor: stepIndex === 0 ? "not-allowed" : "pointer",
                          opacity: stepIndex === 0 ? 0.5 : 1,
                        }}
                      >
                        ← Prev
                      </button>
                      <button
                        type="button"
                        disabled={stepIndex >= activeCourse.lessonSteps.length - 1}
                        onClick={() => {
                          setStepIndex((i) => Math.min(activeCourse.lessonSteps.length - 1, i + 1));
                          setSelectedOption(null);
                        }}
                        style={{
                          background: "#1e293b",
                          border: "1px solid rgba(148,163,184,0.3)",
                          color: "#fff",
                          borderRadius: 8,
                          padding: "5px 10px",
                          fontSize: 11.5,
                          fontWeight: 800,
                          cursor: stepIndex >= activeCourse.lessonSteps.length - 1 ? "not-allowed" : "pointer",
                          opacity: stepIndex >= activeCourse.lessonSteps.length - 1 ? 0.5 : 1,
                        }}
                      >
                        Next →
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    textAlign: "left",
                    marginBottom: 16,
                  }}
                >
                  {activeCourse.notes.map((note, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: "rgba(15, 23, 42, 0.78)",
                        padding: "12px 16px",
                        borderRadius: 14,
                        border: "1px solid rgba(192, 132, 252, 0.35)",
                      }}
                    >
                      <span style={{ fontSize: 10.5, fontWeight: 900, color: "#e9d5ff" }}>
                        {note.tag}
                      </span>
                      <div style={{ fontSize: 14.5, fontWeight: 900, marginTop: 2 }}>
                        {note.title}
                      </div>
                      <p style={{ fontSize: 12.5, color: "#cbd5e1", margin: "4px 0 0", lineHeight: 1.5 }}>
                        {note.summary}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: 10, textAlign: "left", marginBottom: 22 }}>
                {activeCourse.modules.map((mod, idx) => (
                  <div key={idx} style={{ background: "rgba(15, 23, 42, 0.7)", padding: "12px 16px", borderRadius: 14, border: "1px solid rgba(99, 225, 232, 0.3)", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 13.5, fontWeight: 800 }}>
                    <span>🚀 Module {idx + 1}: {mod}</span>
                    <span style={{ color: "#4ade80" }}>Unlocked</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { onEarnXp(75); setActiveCourse(null); }}
                  style={{ flex: 1, background: "#4ade80", border: "none", color: "#060818", fontWeight: 900, padding: "11px", borderRadius: 12, cursor: "pointer", fontSize: 13.5 }}
                >
                  Complete Module (+75 XP)
                </motion.button>
                <button
                  onClick={() => setActiveCourse(null)}
                  style={{ background: "#334155", border: "none", color: "#fff", fontWeight: 800, padding: "11px 18px", borderRadius: 12, cursor: "pointer" }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}