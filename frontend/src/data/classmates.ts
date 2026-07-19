export interface Classmate {
  id: string;
  name: string;
  nickname?: string;
  imageUrl: string;
  quote: string;
  rememberedFor: string;
  futureAmbition: string;
  positionHeld?: string;
}

export const classmatesData: Classmate[] = [
  // TIER 1: MAIN STUDENT LEADERS
  {
    id: "onuh-baba",
    name: "Onuh Baba",
    nickname: "Nathu",
    imageUrl:
      "https://res.cloudinary.com/dwuq9g7x7/image/upload/v1784266261/Snapchat-1688348725_-_Grace_Alex_n42ei1.jpg",
    quote: "Keep smiling and stay positive",
    rememberedFor: "Her bright and warm smiles 😁",
    futureAmbition: "Cyber security guru",
    positionHeld: "Headboy",
  },
  {
    id: "saliu-sefia-arike",
    name: "Saliu Sefia Arike ",
    nickname: "Shubza ",
    imageUrl:
      "https://res.cloudinary.com/dwuq9g7x7/image/upload/v1784350357/Screenshot_2026-07-18_054024_lfvudj.webp",
    quote: "Never be afraid to try again ",
    rememberedFor: "Beautiful eyes",
    futureAmbition: "Nursing",
    positionHeld: "HeadGirl",
  },

  // TIER 2: ASSISTANT LEADERS
  {
    id: "victor-chukwuemeka",
    name: "Victor Chukwuemeka",
    nickname: "Okanta the great",
    imageUrl:
      "https://res.cloudinary.com/dwuq9g7x7/image/upload/v1784356446/Screenshot_2026-07-18_073247_xrlvla.webp",
    quote: "Olorun maje (forbid)",
    positionHeld: "Asst Head Boy",
    rememberedFor: "Lover of Power Rangers",
    futureAmbition: "Lawyer",
  },
  {
    id: "charles-rejoice-c",
    name: "Charles Rejoice C.",
    nickname: "Royal Rezzie",
    imageUrl:
      "https://res.cloudinary.com/dwuq9g7x7/image/upload/v1784405995/Screenshot_2026-07-18_211542_qcahwg.webp",
    quote: "If God is all you have, God is all you need ",
    rememberedFor: "Being so dramatic and making people happy",
    futureAmbition: "Chartered Accountant and so much more",
    positionHeld: "Assistant head girl and president of Entrepreneurship club",
  },

  // TIER 3: PREFECTS
  {
    id: "okonkwo-ogochukwu-michelle",
    name: "Okonkwo Ogochukwu Michelle",
    nickname: "OG",
    imageUrl:
      "https://res.cloudinary.com/dwuq9g7x7/image/upload/v1784306157/WhatsApp_Image_2026-07-15_at_7.02.32_PM_tyt0qe.webp",
    quote: "ad astra per aspera",
    rememberedFor: "Probably my bandana collection 😂 I guess",
    futureAmbition: "Cardiologist",
    positionHeld: "Library prefect",
  },
  {
    id: "ikagu-dominic-favour",
    name: "Ikagu Dominic Favour",
    nickname: "Layefa",
    imageUrl:
      "https://res.cloudinary.com/dwuq9g7x7/image/upload/v1784306157/Screenshot_2026-07-17_071256_sujxs9.webp",
    quote: "It always seems impossible until it's done",
    rememberedFor: "I really don't know",
    futureAmbition:
      "To become an Educator who'll contribute to building a better learning system",
    positionHeld: "Assistant Time keeper/Press Club Asst provost",
  },

  // TIER 4: CLUB PRESIDENTS & SPECIAL ROLES
  {
    id: "opara isaac",
    name: "Opara Isaac",
    nickname: "Ziko",
    imageUrl:
      "https://res.cloudinary.com/dwuq9g7x7/image/upload/v1784227402/WhatsApp_Image_2026-03-20_at_7.40.51_PM_cuatsk.webp",
    quote: "Think Big",
    positionHeld: "Mathematics President",
    rememberedFor: "Bursting people brains",
    futureAmbition: "Mechatronics/Robotics Engineer",
  },
  {
    id: "alex-grace",
    name: "Alex Grace",
    nickname: "Daisy Dan ❣️",
    imageUrl:
      "https://res.cloudinary.com/dwuq9g7x7/image/upload/v1784266260/IMG-20260505-WA0070_-_Grace_Alex_gklf36.jpg",
    quote: "Go down with a fight. Fighting 💪 u can do this!!!!",
    rememberedFor: "Scarlett witch 😌",
    futureAmbition: "Nurse 🤧",
    positionHeld: "Home makers' club president",
  },
  {
    id: "onyebuchi-emmanuel-chinonso",
    name: "Onyebuchi Emmanuel Chinonso",
    nickname: "Emmzy 😎",
    imageUrl:
      "https://res.cloudinary.com/dwuq9g7x7/image/upload/v1784326104/IMG-20260711-WA0348_-_Emmanuel_Onyebuchi_bldicz.jpg",
    quote: "Hala Madrid",
    positionHeld: "Vision",
    rememberedFor: "Onyeneji",
    futureAmbition: "Footballer, Civil Engineer",
  },

  // TIER 5: GENERAL CLASS MEMBERS
  {
    id: "nwigberi-amarachi-goodness",
    name: "Nwigberi Amarachi Goodness",
    nickname: "Amarachi",
    imageUrl:
      "https://res.cloudinary.com/dwuq9g7x7/image/upload/v1784367525/Screenshot_2026-07-18_095535_fijwhx.webp",
    quote: "Success comes from those who never give up.",
    positionHeld: "Student",
    rememberedFor: "My kindness, humility and the smile I bring to others.",
    futureAmbition: "Nurse & making a positive impact in the world",
  },
  {
    id: "chukwunweike-perpetua",
    name: "Chukwunweike Perpetua",
    nickname: "Pepcee",
    imageUrl:
      "https://res.cloudinary.com/dwuq9g7x7/image/upload/v1784170873/Snapchat-384929997_-_perpetua_ebube_buuvim.jpg",
    quote: "Wasn't born to fit in but born to stand out",
    rememberedFor: "A friendly girl who made everyone feel welcomed",
    futureAmbition: "A successful nurse",
    positionHeld: "",
  },
  {
    id: "bozi-dieoprede-donald",
    name: "Bozi Dieoprede Donald",
    nickname: "OO1 👑",
    imageUrl:
      "https://res.cloudinary.com/dwuq9g7x7/image/upload/v1784170842/IMG-20260711-WA0158_-_Donald_Spore_pi6zyy.jpg",
    quote:
      "Act like you can't afford bread until people find out you own the bakery.",
    rememberedFor:
      "Making people laugh while quietly staying three steps ahead. 😄",
    futureAmbition: "Pediatric Surgeon 🩺",
    positionHeld: "",
  },
  {
    id: "babawibe-prevail-oluwadamilola",
    name: "Babawibe Prevail Oluwadamilola",
    nickname: "V💙a💙i💙l💙y💕",
    imageUrl:
      "https://res.cloudinary.com/dwuq9g7x7/image/upload/v1784306157/Screenshot_2026-07-17_070315_r605so.webp",
    quote: "Be yourself",
    rememberedFor: "Trouble making 😂 😂",
    futureAmbition: "Pediatrician",
    positionHeld: "",
  },
  {
    id: "chigozie-david-chimaobi",
    name: "Chigozie David Chimaobi",
    nickname: "Cheque / Celeb Boy",
    imageUrl:
      "https://res.cloudinary.com/dwuq9g7x7/image/upload/v1784170694/03b47b0e-c117-4940-b9a8-d90f785a4cdb_3_watermark_-_Cheque_Vibzes_yyptkx.jpg",
    quote: "Put that smile on your face xx",
    rememberedFor: "Smartness",
    futureAmbition: "Software Engineering",
    positionHeld: "",
  },
  {
    id: "obiorah-favour",
    name: "Obiorah Favour",
    nickname: "Läst Børn",
    imageUrl:
      "https://res.cloudinary.com/dwuq9g7x7/image/upload/v1784306157/Screenshot_2026-07-17_070223_ghzda3.webp",
    quote: "Fake it till u make it",
    rememberedFor: "Trouble maker",
    futureAmbition: "Nurse/Nursing",
    positionHeld: "",
  },
  {
    id: "chinedu-victory",
    name: "Chinedu Victory",
    nickname: "Cloudy T",
    imageUrl:
      "https://res.cloudinary.com/dwuq9g7x7/image/upload/v1784367524/Screenshot_2026-07-18_095502_wkglfo.webp",
    quote: "Dreaming big and working quietly.",
    rememberedFor: "The weird anonymous guy",
    futureAmbition: "Millionaire 😂🤲",
    positionHeld: "",
  },
  {
    id: "peace-omachonu",
    name: "Peace Omachonu",
    nickname: "Peaceful Omah",
    imageUrl:
      "https://res.cloudinary.com/dwuq9g7x7/image/upload/v1784350357/Screenshot_2026-07-18_054059_inabge.webp",
    quote: "Trust the process",
    rememberedFor: "For being a true friend",
    futureAmbition: "Nurse",
    positionHeld: "",
  },
  {
    id: "esther-anthony-patrick",
    name: "Esther Anthony Patrick",
    nickname: "Short girl",
    imageUrl:
      "https://res.cloudinary.com/dwuq9g7x7/image/upload/v1784350357/Screenshot_2026-07-18_054150_srdy0p.webp",
    quote: "Don't be fake.",
    positionHeld: "",
    rememberedFor: "Always speaking the truth.",
    futureAmbition: "Diplomat",
  },
  {
    id: "joyce",
    name: "Joyce Ayomipo",
    nickname: "Jaycee",
    imageUrl:
      "https://res.cloudinary.com/dwuq9g7x7/image/upload/v1784350358/Screenshot_2026-07-18_054220_xsa0yn.webp",
    quote: "Be the best among the best.",
    positionHeld: "",
    rememberedFor: "Being a loving girl.",
    futureAmbition: "Accountant",
  },
  {
    id: "obinna-praise-lotanna",
    name: "Obinna Praise Lotanna",
    nickname: "pmg",
    imageUrl:
      "https://res.cloudinary.com/dwuq9g7x7/image/upload/v1784367524/Screenshot_2026-07-18_095441_xzt0l3.webp",
    quote:
      "The future belongs to those who believe in the beauty of their dreams. — Eleanor Roosevelt",
    positionHeld: "",
    rememberedFor:
      "For my resilience and determination to overcome every challenge",
    futureAmbition:
      "To become a successful gynaecologist and provide quality healthcare for women and children while making a positive impact on society",
  },
  {
    id: "onuelu-kikachukwu-marvelous",
    name: "Onuelu Kikachukwu Marvelous",
    nickname: "pirate",
    imageUrl:
      "https://res.cloudinary.com/dwuq9g7x7/image/upload/v1784367523/Screenshot_2026-07-18_095521_lhtius.webp",
    quote: "Life is too short to have regrets",
    positionHeld: "",
    rememberedFor: "Being quiet",
    futureAmbition: "To make the world a better place",
  },
  {
    id: "great-adetutu",
    name: "Great Adetutu",
    nickname: "Anime boy",
    imageUrl:
      "https://res.cloudinary.com/dwuq9g7x7/image/upload/v1784367523/Screenshot_2026-07-18_102642_mz8zyg.webp",
    quote: "Come to me you weary and heavy lad, I will give you rest",
    positionHeld: "",
    rememberedFor: "Anime",
    futureAmbition:
      "Build classified inventions that are not to be shown to the world yet",
  },
];
