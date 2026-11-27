import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import scienceGif from "../assets/BiosphereQuestAssets/Science gif.gif";
import mathIcon from "../assets/BiosphereQuestAssets/Math Icon.png";
import rocketGif from "../assets/BiosphereQuestAssets/Rocket.gif";
import InteractiveLessonViewer from "../components/InteractiveLessonViewer";
import SubjectNotesViewer from "../components/SubjectNotesViewer";

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
    lessons: [
      {
        id: "l1",
        heading: "Lesson 1: Counting & Numerals to 100",
        body: "In MATATAG Grade 1 Math, learners count, read, and write whole numbers from 0 up to 100 in order and recognize number patterns on a number line.",
        checkQuestion: "Which number comes right after 69 on a number line?",
        options: ["68", "70", "80"],
        answerIndex: 1,
      },
      {
        id: "l2",
        heading: "Lesson 2: Place Value (Tens & Ones)",
        body: "Two-digit numbers up to 100 are made of groups of tens and remaining ones—for example, 46 has 4 tens and 6 ones.",
        checkQuestion: "How many tens are in 83?",
        options: ["3 tens", "8 tens", "83 tens"],
        answerIndex: 1,
      },
      {
        id: "l3",
        heading: "Lesson 3: Comparing & Ordering Numbers",
        body: "Compare the tens digit first when two-digit numbers differ; if the tens digits match, compare the ones digits to order from least to greatest.",
        checkQuestion: "Which number is greater: 54 or 45?",
        options: ["54", "45", "They are equal"],
        answerIndex: 0,
      },
    ],
    notes: [
      {
        tag: "MATATAG Number & Algebra • G1",
        title: "Place Value (Tens & Ones)",
        summary: "A 2-digit number groups quantities into tens (10s) and ones (1s), such as 52 = 5 tens + 2 ones.",
      },
      {
        tag: "Quick Tip",
        title: "Comparing Whole Numbers",
        summary: "More tens means a larger value; when tens are equal, look at the ones digit.",
      },
    ],
  },
  {
    id: "science-g1-1",
    title: "Senses, Living Things & Earth Surroundings",
    category: "Science • Grade 1",
    subject: "Science",
    grade: 1,
    icon: scienceGif,
    accent: "#38bdf8",
    desc: "Use your senses safely to observe living and non-living things, plants, animals, and daily surroundings.",
    lessons: [
      {
        id: "l1",
        heading: "Lesson 1: Observing with Our Senses",
        body: "Sight, hearing, smell, taste, and touch help us observe color, shape, sound, and texture safely around us.",
        checkQuestion: "Which sense helps you tell if a chime is loud or soft?",
        options: ["Hearing", "Sight", "Taste"],
        answerIndex: 0,
      },
      {
        id: "l2",
        heading: "Lesson 2: Living vs. Non-Living Things",
        body: "Living things grow, need food, water, and air, and respond to changes, while non-living things do not grow on their own.",
        checkQuestion: "Which one is a living thing?",
        options: ["Toy car", "Potted plant", "Stone"],
        answerIndex: 1,
      },
      {
        id: "l3",
        heading: "Lesson 3: Caring for Our Environment",
        body: "Keeping schoolyards, homes, and waterways clean protects plants, animals, and people every day.",
        checkQuestion: "What is a helpful habit for keeping surroundings clean?",
        options: ["Throwing wrappers on the ground", "Sorting and disposing of trash properly", "Wasting clean water"],
        answerIndex: 1,
      },
    ],
    notes: [
      {
        tag: "MATATAG Science • G1",
        title: "Living Things Characteristics",
        summary: "Living things grow, breathe/need air, need food and water, and react to their environment.",
      },
      {
        tag: "Safe Observation",
        title: "Using Senses Wisely",
        summary: "Never taste or touch unknown or sharp objects without adult guidance.",
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
    lessons: [
      {
        id: "l1",
        heading: "Lesson 1: What Is a Tide Pool?",
        body: "Tide pools are shallow pockets of seawater left along rocky shores when the tide goes out.",
        checkQuestion: "Where are tide pools usually found?",
        options: ["Along rocky shores when tides recede", "Inside volcanoes", "On the moon"],
        answerIndex: 0,
      },
      {
        id: "l2",
        heading: "Lesson 2: Coastal Animals & Shells",
        body: "Hermit crabs, starfish, and snails live in coastal waters and use shells or textures to stay safe.",
        checkQuestion: "Which animal is often seen near shores and tide pools?",
        options: ["Hermit crab", "Polar bear", "Camel"],
        answerIndex: 0,
      },
      {
        id: "l3",
        heading: "Lesson 3: Clean Shores, Happy Sea Life",
        body: "Trash blown or washed onto beaches can harm marine animals, so keeping shores clean protects ocean habitats.",
        checkQuestion: "Why should we pick up litter at the beach?",
        options: ["To keep marine animals safe and habitats clean", "To make waves stop", "Because sand is made of plastic"],
        answerIndex: 0,
      },
    ],
    notes: [
      {
        tag: "Coastal Discovery • G1",
        title: "Tide Pool Habitats",
        summary: "Small rocky pools holding seawater and hardy marine creatures between tides.",
      },
      {
        tag: "Ocean Care",
        title: "Protecting Shorelines",
        summary: "Clean beaches prevent plastic waste from entering rivers and oceans.",
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
    lessons: [
      {
        id: "l1",
        heading: "Lesson 1: Hundreds, Tens & Ones to 1,000",
        body: "In MATATAG Grade 2 Math, three-digit numbers show hundreds, tens, and ones—for example, 548 = 500 + 40 + 8.",
        checkQuestion: "What is the place value of 7 in 724?",
        options: ["Ones", "Tens", "Hundreds"],
        answerIndex: 2,
      },
      {
        id: "l2",
        heading: "Lesson 2: Addition & Subtraction Within 1,000",
        body: "Line up digits by place value and regroup carefully when adding or subtracting multi-digit numbers.",
        checkQuestion: "What is 250 + 140?",
        options: ["390", "410", "350"],
        answerIndex: 0,
      },
      {
        id: "l3",
        heading: "Lesson 3: Halves & Fourths",
        body: "Splitting a whole into 2 equal parts gives halves (1/2); splitting into 4 equal parts gives fourths (1/4).",
        checkQuestion: "How many equal fourths make one whole?",
        options: ["2 fourths", "4 fourths", "6 fourths"],
        answerIndex: 1,
      },
    ],
    notes: [
      {
        tag: "MATATAG Number & Algebra • G2",
        title: "Expanded Form to 1,000",
        summary: "Break numbers by place value: 635 = 600 + 30 + 5.",
      },
      {
        tag: "Equal Parts",
        title: "Halves and Quarters",
        summary: "Equal sharing requires parts of the exact same size.",
      },
    ],
  },
  {
    id: "science-g2-1",
    title: "Push, Pull, Light & Daily Weather",
    category: "Science • Grade 2",
    subject: "Science",
    grade: 2,
    icon: scienceGif,
    accent: "#38bdf8",
    desc: "Explore pushes and pulls, sources of light and heat, and how weather changes across the day.",
    lessons: [
      {
        id: "l1",
        heading: "Lesson 1: Pushes and Pulls",
        body: "A push moves something away from you, while a pull brings something closer—both can start, stop, or change motion.",
        checkQuestion: "Opening a drawer toward yourself is mostly a what?",
        options: ["Pull", "Push", "Freeze"],
        answerIndex: 0,
      },
      {
        id: "l2",
        heading: "Lesson 2: Natural & Artificial Light",
        body: "The sun is our main natural source of light and heat, while lamps and flashlights are artificial light sources.",
        checkQuestion: "Which is a natural source of light?",
        options: ["The Sun", "Table lamp", "Flashlight"],
        answerIndex: 0,
      },
      {
        id: "l3",
        heading: "Lesson 3: Sunny, Rainy & Windy Days",
        body: "Observing sky conditions, wind, and rain helps us dress and plan activities safely.",
        checkQuestion: "What do you usually carry on a rainy day?",
        options: ["Umbrella or raincoat", "Sunglasses only", "Ice skates"],
        answerIndex: 0,
      },
    ],
    notes: [
      {
        tag: "MATATAG Science • G2",
        title: "Forces as Pushes & Pulls",
        summary: "Pushes and pulls can make objects move, slow down, speed up, or change direction.",
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
    lessons: [
      {
        id: "l1",
        heading: "Lesson 1: Swimming with Fins & Tails",
        body: "Fish and marine mammals use streamlined bodies, fins, and tails to glide and turn through water.",
        checkQuestion: "How does a streamlined body help swimmers in water?",
        options: ["Reduces water resistance", "Makes them heavy like rocks", "Stops movement"],
        answerIndex: 0,
      },
      {
        id: "l2",
        heading: "Lesson 2: Shelters Under the Waves",
        body: "Coral crevices, seagrass blades, and underwater rocks give small sea creatures places to hide and rest.",
        checkQuestion: "Why do small fish hide near coral or seagrass?",
        options: ["For shelter and protection", "To dry their scales", "To fly away"],
        answerIndex: 0,
      },
    ],
    notes: [
      {
        tag: "Marine Habitats • G2",
        title: "Underwater Shelters",
        summary: "Reefs and seagrass beds provide food and hiding spots for young marine animals.",
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
    lessons: [
      {
        id: "l1",
        heading: "Lesson 1: Solids, Liquids & Gases",
        body: "In MATATAG Grade 3 Science, solids have a definite shape and volume, liquids have a definite volume and take container shape, and gases spread to fill their container.",
        checkQuestion: "Which state of matter takes the shape of its container and has a definite volume?",
        options: ["Solid", "Liquid", "Gas"],
        answerIndex: 1,
      },
      {
        id: "l2",
        heading: "Lesson 2: Heating & Cooling Matter",
        body: "Adding heat can melt ice into liquid water or evaporate water into vapor; cooling can condense vapor or freeze water.",
        checkQuestion: "What happens when liquid water is cooled below its freezing point?",
        options: ["It freezes into ice", "It turns into smoke", "It disappears"],
        answerIndex: 0,
      },
      {
        id: "l3",
        heading: "Lesson 3: Safe Science Investigations",
        body: "Record observations carefully, follow instructions, and handle warm or breakable items with care.",
        checkQuestion: "What should you do when doing a science activity with heat?",
        options: ["Follow safety rules and keep a safe distance", "Touch hot surfaces with bare fingers", "Skip instructions"],
        answerIndex: 0,
      },
    ],
    notes: [
      {
        tag: "MATATAG Science • G3",
        title: "Three States of Matter",
        summary: "Solids keep shape; liquids take container shape; gases fill available space.",
      },
      {
        tag: "Temperature Effects",
        title: "Melting, Freezing & Evaporation",
        summary: "Heating and cooling change states of matter between solid, liquid, and gas.",
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
    lessons: [
      {
        id: "l1",
        heading: "Lesson 1: Multiplication as Equal Groups",
        body: "Under MATATAG Grade 3 Math, multiplication represents equal groups—so 5 × 3 means 5 groups of 3, or 15.",
        checkQuestion: "What is 5 × 3?",
        options: ["8", "15", "25"],
        answerIndex: 1,
      },
      {
        id: "l2",
        heading: "Lesson 2: Division & Equal Sharing",
        body: "Division splits a total into equal groups or finds how many equal groups fit—18 ÷ 3 = 6.",
        checkQuestion: "What is 18 ÷ 3?",
        options: ["6", "9", "15"],
        answerIndex: 0,
      },
      {
        id: "l3",
        heading: "Lesson 3: Unit Fractions & Area",
        body: "A unit fraction like 1/4 names 1 equal part out of 4; area counts square units covering a flat region.",
        checkQuestion: "In 1/6, how many equal parts make one whole?",
        options: ["1 part", "6 parts", "7 parts"],
        answerIndex: 1,
      },
    ],
    notes: [
      {
        tag: "MATATAG Math • G3",
        title: "Multiplication & Division",
        summary: "Multiplication and division are inverse operations built on equal groups.",
      },
      {
        tag: "Geometry & Measurement",
        title: "Area in Square Units",
        summary: "Count unit squares inside a shape without gaps or overlaps to find its area.",
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
    lessons: [
      {
        id: "l1",
        heading: "Lesson 1: Living & Non-Living Reef Factors",
        body: "Corals, sea anemones, and reef fish are living things supported by non-living water, sunlight, and minerals.",
        checkQuestion: "Which is a non-living part of a coral reef environment?",
        options: ["Seawater and sunlight", "Clownfish", "Sea urchin"],
        answerIndex: 0,
      },
      {
        id: "l2",
        heading: "Lesson 2: How Energy Moves in a Food Chain",
        body: "Energy flows from producers (like algae and seagrass) to animals that eat them in a food chain.",
        checkQuestion: "What do organisms in a food chain need to survive and grow?",
        options: ["Energy and nutrients", "Plastic waste", "Zero water"],
        answerIndex: 0,
      },
    ],
    notes: [
      {
        tag: "Ocean Ecosystem • G3",
        title: "Reef Interdependence",
        summary: "Living organisms in coral reefs rely on clean water, sunlight, and other species.",
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
    lessons: [
      {
        id: "l1",
        heading: "Lesson 1: Useful & Harmful Properties of Materials",
        body: "MATATAG Grade 4 Science examines hardness, flexibility, and safety so we pick the right material and manage waste responsibly.",
        checkQuestion: "Why is knowing a material's properties important?",
        options: ["To pick safe, suitable uses and manage waste properly", "To guess randomly", "Because all materials are identical"],
        answerIndex: 0,
      },
      {
        id: "l2",
        heading: "Lesson 2: Combining & Separating Mixtures",
        body: "A mixture is made of two or more substances combined physically, such as pebbles and sand or water and salt.",
        checkQuestion: "Which of these is a mixture?",
        options: ["Trail mix of nuts and seeds", "A single pure gold atom", "Vacuum space"],
        answerIndex: 0,
      },
      {
        id: "l3",
        heading: "Lesson 3: Changes When Heat or Force Is Applied",
        body: "Heating, cooling, bending, or cutting can change how a material looks or behaves, sometimes forming new materials when burned or reacted.",
        checkQuestion: "Bending a wire or folding paper is an example of changing what?",
        options: ["Shape or physical form", "The laws of gravity", "Day into night"],
        answerIndex: 0,
      },
    ],
    notes: [
      {
        tag: "MATATAG Science • G4",
        title: "Mixtures vs. Pure Substances",
        summary: "Mixtures contain multiple components blended together and can often be separated physically.",
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
    lessons: [
      {
        id: "l1",
        heading: "Lesson 1: Multi-Digit Multiplication & Division",
        body: "In MATATAG Grade 4 Math, apply place-value strategies and properties of operations to multiply and divide larger whole numbers.",
        checkQuestion: "What is 12 × 5?",
        options: ["50", "60", "65"],
        answerIndex: 1,
      },
      {
        id: "l2",
        heading: "Lesson 2: Equivalent Fractions",
        body: "Fractions like 1/2, 2/4, and 4/8 represent the exact same portion of a whole.",
        checkQuestion: "Which fraction equals 1/2?",
        options: ["3/6", "1/4", "2/5"],
        answerIndex: 0,
      },
      {
        id: "l3",
        heading: "Lesson 3: Angles & Bar Graphs",
        body: "Angles measure turns or corners (such as right angles at 90°), while bar graphs compare data across categories.",
        checkQuestion: "How many degrees is a right angle?",
        options: ["45°", "90°", "180°"],
        answerIndex: 1,
      },
    ],
    notes: [
      {
        tag: "MATATAG Math • G4",
        title: "Equivalent Fractions",
        summary: "1/2 = 2/4 = 3/6 = 4/8 because the proportion of the whole stays the same.",
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
    lessons: [
      {
        id: "l1",
        heading: "Lesson 1: Archipelagic Seas & Biodiversity",
        body: "Surrounded by seas and straits, island nations like the Philippines host rich coral triangles, fish, and marine life.",
        checkQuestion: "What defines an archipelago?",
        options: ["A group or chain of islands", "A frozen glacier only", "A desert basin"],
        answerIndex: 0,
      },
      {
        id: "l2",
        heading: "Lesson 2: Mangroves, Seagrass & Coral Reefs",
        body: "Mangroves protect coasts and trap sediment, seagrass meadows feed marine herbivores, and reefs shelter countless species.",
        checkQuestion: "Which coastal forest helps shield shorelines from waves?",
        options: ["Mangroves", "Pine tundra", "Cactus scrub"],
        answerIndex: 0,
      },
    ],
    notes: [
      {
        tag: "Marine Stewardship • G4",
        title: "Coastal Ecosystem Links",
        summary: "Mangroves, seagrass beds, and coral reefs support one another and coastal communities.",
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
    lessons: [
      {
        id: "l1",
        heading: "Lesson 1: Human Body Systems Working Together",
        body: "MATATAG Grade 5 Science shows how systems coordinate—digestive organs break down food while the circulatory system carries nutrients and oxygen.",
        checkQuestion: "Which organs pump blood through the circulatory system?",
        options: ["Heart and blood vessels", "Lungs and ribs only", "Stomach and intestines only"],
        answerIndex: 0,
      },
      {
        id: "l2",
        heading: "Lesson 2: Life Cycles & Reproduction",
        body: "Plants and animals follow life cycles that allow species to grow, reproduce, and continue across generations.",
        checkQuestion: "Why do life cycles matter for living organisms?",
        options: ["They allow growth, reproduction, and survival of species", "They stop plants from growing", "They turn rocks into water"],
        answerIndex: 0,
      },
      {
        id: "l3",
        heading: "Lesson 3: Weathering & Soil Formation",
        body: "Wind, water, temperature changes, and roots gradually break down rocks into smaller pieces that help form soil.",
        checkQuestion: "What is weathering?",
        options: ["Breaking down or wearing away of rocks over time", "Instant mountain creation in one second", "Moon eclipse"],
        answerIndex: 0,
      },
    ],
    notes: [
      {
        tag: "MATATAG Science • G5",
        title: "System Interactions & Weathering",
        summary: "Body systems work as a team, and Earth's surface reshapes slowly through weathering and erosion.",
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
    lessons: [
      {
        id: "l1",
        heading: "Lesson 1: Decimal Place Value & Operations",
        body: "In MATATAG Grade 5 Math, decimals extend place value past the decimal point (tenths, hundredths) and align by decimal point when adding or subtracting.",
        checkQuestion: "What is 1.5 + 2.25?",
        options: ["3.75", "2.40", "4.25"],
        answerIndex: 0,
      },
      {
        id: "l2",
        heading: "Lesson 2: Adding & Subtracting Fractions",
        body: "Find common denominators before adding or subtracting fractions with unlike denominators.",
        checkQuestion: "What is 1/2 + 1/4?",
        options: ["3/4", "2/6", "1/6"],
        answerIndex: 0,
      },
      {
        id: "l3",
        heading: "Lesson 3: Volume of Rectangular Prisms",
        body: "Calculate volume in cubic units using length × width × height.",
        checkQuestion: "What is the volume of a prism with length 5, width 2, and height 3?",
        options: ["10 cubic units", "30 cubic units", "15 cubic units"],
        answerIndex: 1,
      },
    ],
    notes: [
      {
        tag: "MATATAG Math • G5",
        title: "Decimals & Volume",
        summary: "Align decimal points for addition/subtraction; use V = l × w × h for rectangular prism volume.",
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
    lessons: [
      {
        id: "l1",
        heading: "Lesson 1: Ocean Depth Zones",
        body: "Surface waters receive sunlight for photosynthesis, while deeper zones have less light, higher pressure, and cooler temperatures.",
        checkQuestion: "Where does ocean photosynthesis mainly occur?",
        options: ["In the sunlit upper surface zone", "In the pitch-dark abyss", "Inside dry sand"],
        answerIndex: 0,
      },
      {
        id: "l2",
        heading: "Lesson 2: Salinity, Temperature & Currents",
        body: "Differences in temperature and saltiness (salinity), along with wind and Earth's rotation, drive ocean currents.",
        checkQuestion: "What is salinity?",
        options: ["The amount of dissolved salt in water", "The speed of a boat", "The height of a cloud"],
        answerIndex: 0,
      },
    ],
    notes: [
      {
        tag: "Deep Ocean • G5",
        title: "Currents & Depth Zones",
        summary: "Sunlight fades with depth, and temperature/salinity differences help drive ocean circulation.",
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
    lessons: [
      {
        id: "l1",
        heading: "Lesson 1: Forms & Transformation of Energy",
        body: "MATATAG Grade 6 Science explores kinetic, potential, electrical, thermal, light, and sound energy changing from one form to another.",
        checkQuestion: "A solar panel turning sunlight into electricity is an example of what?",
        options: ["Energy transformation", "Creating energy from nothing", "Stopping time"],
        answerIndex: 0,
      },
      {
        id: "l2",
        heading: "Lesson 2: Forces, Motion & Simple Machines",
        body: "Balanced and unbalanced forces affect motion, while simple machines (levers, pulleys, inclined planes) make work easier.",
        checkQuestion: "What does a simple machine do to help with work?",
        options: ["Changes force direction or magnitude to make tasks easier", "Eliminates friction everywhere", "Turns lead into gold"],
        answerIndex: 0,
      },
      {
        id: "l3",
        heading: "Lesson 3: Earth Movements, Quakes & Solar System",
        body: "Earth's rotation causes day and night, its revolution and tilt relate to seasons, and tectonic activity drives earthquakes and volcanoes.",
        checkQuestion: "What mainly causes day and night on Earth?",
        options: ["Earth's rotation on its axis", "Moon phases", "Ocean tides alone"],
        answerIndex: 0,
      },
    ],
    notes: [
      {
        tag: "MATATAG Science • G6",
        title: "Energy & Earth-Space Motions",
        summary: "Energy transforms across forms; rotation gives day/night while revolution orbits the Sun.",
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
    lessons: [
      {
        id: "l1",
        heading: "Lesson 1: Ratios, Rates & Percentages",
        body: "In MATATAG Grade 6 Math, ratios compare quantities, rates compare different units, and percentages express parts per 100.",
        checkQuestion: "What is 25% of 200?",
        options: ["25", "50", "75"],
        answerIndex: 1,
      },
      {
        id: "l2",
        heading: "Lesson 2: Integers & Number Lines",
        body: "Integers include positive numbers, zero, and negative numbers—useful for temperatures below zero or depth below sea level.",
        checkQuestion: "Which integer represents 15 meters below sea level?",
        options: ["-15", "+15", "0"],
        answerIndex: 0,
      },
      {
        id: "l3",
        heading: "Lesson 3: Algebraic Expressions & Equations",
        body: "Use letters (variables) to represent unknown numbers and write expressions or equations for real-world patterns.",
        checkQuestion: "If x = 4, what is the value of 3x + 2?",
        options: ["14", "12", "9"],
        answerIndex: 0,
      },
    ],
    notes: [
      {
        tag: "MATATAG Math • G6",
        title: "Percent, Integers & Algebra",
        summary: "Percent is out of 100; integers include negative values; variables stand for unknown numbers.",
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
    lessons: [
      {
        id: "l1",
        heading: "Lesson 1: Ocean Heat & Climate Systems",
        body: "Oceans store and move large amounts of thermal energy, shaping winds, rainfall, and climate patterns across Earth.",
        checkQuestion: "How do oceans help regulate Earth's climate?",
        options: ["By absorbing and distributing heat", "By blocking all sunlight from Earth", "By removing all water vapor"],
        answerIndex: 0,
      },
      {
        id: "l2",
        heading: "Lesson 2: Blue Carbon & Marine Conservation",
        body: "Coastal ecosystems like mangroves, tidal marshes, and seagrass beds capture carbon ('blue carbon') and protect biodiversity.",
        checkQuestion: "Which habitats are key 'blue carbon' coastal ecosystems?",
        options: ["Mangroves, seagrass beds, and coastal marshes", "Deserts and sand dunes", "Mountain glaciers only"],
        answerIndex: 0,
      },
    ],
    notes: [
      {
        tag: "Earth & Ocean Systems • G6",
        title: "Blue Carbon & Climate",
        summary: "Coastal habitats store carbon and sustain biodiversity alongside ocean-atmosphere heat exchange.",
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
  // Saved / chosen grade level from explorer (defaults to Grade 1).
  // Any grade other than your chosen grade (or unlocked sequential grades) stays strictly locked!
  const chosenGrade = Number(explorer?.grade) || 1;
  const [selectedGrade, setSelectedGrade] = useState(chosenGrade);
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [activeCourse, setActiveCourse] = useState(null);
  const [viewerMode, setViewerMode] = useState(null); // null | "lesson" | "notes"
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [readLessonsByCourse, setReadLessonsByCourse] = useState({});
  const [completedCourseIds, setCompletedCourseIds] = useState({});
  const [completedXpKeys, setCompletedXpKeys] = useState({});
  const [lockNotice, setLockNotice] = useState("");
  const [shakingPill, setShakingPill] = useState(null);
  const [clickBursts, setClickBursts] = useState([]);

  useEffect(() => {
    const nextGrade = Number(explorer?.grade) || 1;
    setSelectedGrade(nextGrade);
  }, [explorer?.grade]);

  const showTemporaryLockNotice = (msg) => {
    setLockNotice(msg);
    setTimeout(() => {
      setLockNotice((prev) => (prev === msg ? "" : prev));
    }, 2800);
  };

  // Sequential Grade Unlocking:
  // Your chosen grade (e.g., Grade 1) is unlocked; higher grades unlock sequentially
  // once all courses in the preceding grade are completed!
  const unlockedGrades = useMemo(() => {
    const unlocked = new Set([chosenGrade]);
    for (let g = chosenGrade; g < 6; g += 1) {
      const gradeCourses = COURSES.filter((c) => c.grade === g);
      const allDone =
        gradeCourses.length > 0 &&
        gradeCourses.every((c) => Boolean(completedCourseIds[c.id]));
      if (allDone) {
        unlocked.add(g + 1);
      } else {
        break;
      }
    }
    return unlocked;
  }, [chosenGrade, completedCourseIds]);

  const isGradeLocked = (gradeNum) => !unlockedGrades.has(Number(gradeNum));

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

  const handleScreenClick = (e) => {
    spawnBurstAt(e.clientX, e.clientY);
  };

  const handleSelectGrade = (g, e) => {
    if (g !== "all" && isGradeLocked(g)) {
      triggerButtonBurst(e, ["🔒"]);
      playSfx?.("wrong");
      setShakingPill(String(g));
      setTimeout(() => setShakingPill(null), 400);
      showTemporaryLockNotice(
        `🔒 Grade ${g} is locked! Complete all Grade ${g - 1} courses first (or change your grade in Profile).`
      );
      return;
    }
    triggerButtonBurst(e, ["⭐", "✨", "🚀"]);
    playSfx?.("click");
    setSelectedGrade(g);
  };

  const isLessonUnlocked = (course, idx) => {
    if (idx === 0) return true;
    const readIndices = readLessonsByCourse[course.id] || [];
    return readIndices.includes(idx - 1);
  };

  const markLessonAsRead = (course, idx, e, xpReward = 25) => {
    if (!course) return;
    triggerButtonBurst(e, ["✨", "⭐", "💫", "🎉"]);
    playSfx?.("correct");
    setReadLessonsByCourse((prev) => {
      const existing = prev[course.id] || [];
      if (existing.includes(idx)) return prev;
      return { ...prev, [course.id]: [...existing, idx] };
    });
    const xpKey = `${course.id}-read-${idx}`;
    if (!completedXpKeys[xpKey]) {
      setCompletedXpKeys((prev) => ({ ...prev, [xpKey]: true }));
      onEarnXp?.(xpReward);
    }
  };

  const filteredCourses = useMemo(() => {
    return COURSES.filter((course) => {
      const gradeMatch = selectedGrade === "all" || course.grade === Number(selectedGrade);
      const subjectMatch = selectedSubject === "All" || course.subject === selectedSubject;
      return gradeMatch && subjectMatch;
    });
  }, [selectedGrade, selectedSubject]);

  const openCourseViewer = (course, mode = "lesson", e) => {
    if (isGradeLocked(course.grade)) {
      triggerButtonBurst(e, ["🔒"]);
      playSfx?.("wrong");
      showTemporaryLockNotice(
        `🔒 Grade ${course.grade} is locked! Finish Grade ${course.grade - 1} first.`
      );
      return;
    }
    triggerButtonBurst(e, mode === "notes" ? ["💫", "📖", "⭐"] : ["🚀", "✨", "🌊", "⭐"]);
    playSfx?.("click");
    setActiveCourse(course);
    setViewerMode(mode);
    setStepIndex(0);
    setSelectedOption(null);
  };

  const closeFullScreenViewer = () => {
    setViewerMode(null);
    setActiveCourse(null);
    setStepIndex(0);
    setSelectedOption(null);
  };

  const handleCompleteCourseModule = (course, xpReward = 75) => {
    if (!course) return;
    setCompletedCourseIds((prev) => ({ ...prev, [course.id]: true }));
    onEarnXp?.(xpReward);
    closeFullScreenViewer();
  };

  if (activeCourse && viewerMode === "lesson") {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 90,
          overflowY: "auto",
          background: "#060818",
        }}
      >
        <InteractiveLessonViewer
          course={activeCourse}
          explorer={explorer}
          stepIndex={stepIndex}
          setStepIndex={setStepIndex}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          readLessons={readLessonsByCourse[activeCourse.id] || []}
          isLessonUnlocked={(idx) => isLessonUnlocked(activeCourse, idx)}
          onMarkLessonRead={(idx, e, xp) => markLessonAsRead(activeCourse, idx, e, xp)}
          onCompleteModule={(xp) => handleCompleteCourseModule(activeCourse, xp)}
          onClose={closeFullScreenViewer}
          onEarnXp={onEarnXp}
          playSfx={playSfx}
        />
      </div>
    );
  }

  if (activeCourse && viewerMode === "notes") {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 90,
          overflowY: "auto",
          background: "#060818",
        }}
      >
        <SubjectNotesViewer
          course={activeCourse}
          explorer={explorer}
          readLessons={readLessonsByCourse[activeCourse.id] || []}
          onOpenLessonViewer={() => setViewerMode("lesson")}
          onClose={closeFullScreenViewer}
          onEarnXp={onEarnXp}
          playSfx={playSfx}
        />
      </div>
    );
  }

  return (
    <div
      onClick={handleScreenClick}
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
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
        animate={{
          opacity: [0.35, 0.65, 0.35],
          scale: [1, 1.08, 1],
        }}
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
              zIndex: 120,
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
      <div style={{ position: "relative", zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          style={{ textAlign: "center", marginBottom: 20 }}
        >
          <motion.h1
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              fontSize: 28,
              fontWeight: 900,
              background: "linear-gradient(90deg, #63e1e8, #c084fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            📚 Explore Courses & Learning Modules
          </motion.h1>
          <p style={{ fontSize: 13.5, color: "#cbd5e1", marginTop: 4 }}>
            MATATAG-aligned Math, Science, and Ocean quests for Grades 1–6 with Lesson Viewer or Subject Notes!
          </p>
          <p style={{ fontSize: 12, color: "#63e1e8", fontWeight: 800, marginTop: 4 }}>
            Your Saved Grade: Grade {chosenGrade} • Complete all Grade {chosenGrade} courses to unlock the next grade sequentially!
          </p>
        </motion.div>

        {/* Lock Notice Toast when clicking a locked grade */}
        <AnimatePresence>
          {lockNotice && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              style={{
                maxWidth: 540,
                margin: "0 auto 14px",
                padding: "9px 14px",
                borderRadius: 12,
                background: "rgba(248, 113, 113, 0.2)",
                border: "1.5px solid #f87171",
                color: "#fecaca",
                fontSize: 12.5,
                fontWeight: 800,
                textAlign: "center",
              }}
            >
              {lockNotice}
            </motion.div>
          )}
        </AnimatePresence>

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
              const lockedChip = g !== "all" && isGradeLocked(g);
              const isShaking = shakingPill === String(g);
              return (
                <motion.button
                  key={String(g)}
                  type="button"
                  aria-disabled={lockedChip}
                  whileHover={lockedChip ? { scale: 1.02 } : { y: -3, scale: 1.07 }}
                  whileTap={lockedChip ? { x: [-4, 4, -4, 4, 0] } : { scale: 0.88, rotate: -3 }}
                  animate={
                    isShaking
                      ? { x: [-5, 5, -5, 5, 0] }
                      : active
                      ? { scale: [1, 1.06, 1] }
                      : { scale: 1 }
                  }
                  transition={{ type: "spring", stiffness: 360, damping: 18 }}
                  onClick={(e) => handleSelectGrade(g, e)}
                  style={{
                    padding: "6px 13px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 900,
                    cursor: lockedChip ? "not-allowed" : "pointer",
                    border: active ? "1.5px solid #63e1e8" : "1px solid rgba(148,163,184,0.28)",
                    background: active
                      ? "linear-gradient(90deg, #22d3ee, #818cf8)"
                      : lockedChip
                      ? "rgba(15, 23, 42, 0.55)"
                      : "rgba(15, 23, 42, 0.78)",
                    color: active ? "#060818" : lockedChip ? "#64748b" : "#e2e8f0",
                    boxShadow: active ? "0 0 16px rgba(34, 211, 238, 0.45)" : "none",
                    opacity: lockedChip ? 0.65 : 1,
                  }}
                >
                  {g === "all"
                    ? "All Grades (1–6)"
                    : `${lockedChip ? "🔒 " : ""}Grade ${g}`}
                </motion.button>
              );
            })}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
            {["All", "Math", "Science", "Ocean"].map((subj) => {
              const active = selectedSubject === subj;
              return (
                <motion.button
                  key={subj}
                  type="button"
                  whileHover={{ y: -3, scale: 1.07 }}
                  whileTap={{ scale: 0.88, rotate: 3 }}
                  animate={active ? { scale: [1, 1.06, 1] } : { scale: 1 }}
                  transition={{ type: "spring", stiffness: 360, damping: 18 }}
                  onClick={(e) => {
                    triggerButtonBurst(e, ["💫", "🫧", "✨"]);
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
                    boxShadow: active ? "0 0 15px rgba(255, 223, 78, 0.35)" : "none",
                  }}
                >
                  {subj === "All" ? "All Subjects" : subj}
                </motion.button>
              );
            })}
          </div>
        </div>

        <motion.div
          layout
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}
        >
          {filteredCourses.map((course, idx) => {
            const gradeLocked = isGradeLocked(course.grade);
            const readCount = (readLessonsByCourse[course.id] || []).length;
            const courseDone = Boolean(completedCourseIds[course.id]);
            return (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, y: 18, scale: 0.97 }}
                animate={{ opacity: gradeLocked ? 0.6 : 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.28) }}
                whileHover={
                  gradeLocked
                    ? { scale: 1 }
                    : { y: -7, scale: 1.025, boxShadow: `0 16px 32px ${course.accent}33` }
                }
                className="card-panel"
                style={{ border: `2px solid ${course.accent}44`, display: "flex", flexDirection: "column", justifyContent: "space-between" }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <motion.img
                      src={course.icon}
                      alt=""
                      animate={{ y: [-2, 3, -2], rotate: [-2, 2, -2] }}
                      transition={{ duration: 3 + idx * 0.25, repeat: Infinity, ease: "easeInOut" }}
                      style={{ width: 44, height: 44, objectFit: "contain" }}
                    />
                    <div>
                      <span style={{ fontSize: 10.5, fontWeight: 900, color: course.accent }}>
                        {gradeLocked ? "🔒 " : courseDone ? "✓ " : ""}
                        {course.category} • {readCount}/{course.lessons.length} Read
                      </span>
                      <h3 style={{ fontSize: 18, fontWeight: 900, marginTop: 2 }}>{course.title}</h3>
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.5, marginBottom: 16 }}>{course.desc}</p>
                </div>

                {gradeLocked ? (
                  <motion.button
                    whileTap={{ x: [-4, 4, -4, 4, 0] }}
                    aria-disabled={true}
                    onClick={(e) => {
                      e.stopPropagation();
                      openCourseViewer(course, "lesson", e);
                    }}
                    style={{
                      background: "#334155",
                      border: "none",
                      color: "#94a3b8",
                      fontWeight: 900,
                      padding: "10px 16px",
                      borderRadius: 12,
                      cursor: "not-allowed",
                      fontSize: 13,
                      width: "100%",
                    }}
                  >
                    {`🔒 Locked (Complete Grade ${course.grade - 1} First)`}
                  </motion.button>
                ) : (
                  <div style={{ display: "flex", gap: 8 }}>
                    <motion.button
                      whileHover={{ scale: 1.03, boxShadow: `0 0 16px ${course.accent}66` }}
                      whileTap={{ scale: 0.94 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        openCourseViewer(course, "lesson", e);
                      }}
                      style={{
                        flex: 1,
                        background: `linear-gradient(90deg, ${course.accent}, #818cf8)`,
                        border: "none",
                        color: "#060818",
                        fontWeight: 900,
                        padding: "10px 12px",
                        borderRadius: 12,
                        cursor: "pointer",
                        fontSize: 12.5,
                      }}
                    >
                      {courseDone ? "Lesson Viewer ✓" : "Lesson Viewer →"}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03, boxShadow: "0 0 16px rgba(192, 132, 252, 0.55)" }}
                      whileTap={{ scale: 0.94 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        openCourseViewer(course, "notes", e);
                      }}
                      style={{
                        flex: 1,
                        background: "rgba(192, 132, 252, 0.18)",
                        border: "1.5px solid #c084fc",
                        color: "#f3e8ff",
                        fontWeight: 900,
                        padding: "10px 12px",
                        borderRadius: 12,
                        cursor: "pointer",
                        fontSize: 12.5,
                      }}
                    >
                      Subject Notes 📖
                    </motion.button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}