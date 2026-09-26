import type { ArticleBlock } from "@/db/schema";

/* ══════════════════════════════════════════════════════════════
   All copy below is sourced from cgcds.com.ng (menu + sub-menu
   pages). Layout, structure and presentation are new.
   ══════════════════════════════════════════════════════════════ */

export const HERO_IMAGE =
  "https://images.pexels.com/photos/36347347/pexels-photo-36347347.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1800";

export const ABOUT_IMAGE =
  "https://images.pexels.com/photos/12196191/pexels-photo-12196191.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=1500";

export const LECTURE_IMAGE =
  "https://images.pexels.com/photos/9275222/pexels-photo-9275222.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400";

/* The Director's own photographs — official CGCDS Uniport portraits held in
   /public/images (cropped from cgcds.com.ng). These are the only images that
   may stand for Prof. Owapriba P. Abu; no stock photography is used for her. */
export const DIRECTOR_PORTRAIT = "/images/prof-owapriba-abu.jpg";
export const DIRECTOR_COVER = "/images/prof-owapriba-abu-cover.jpg";
export const DIRECTOR_PHOTO_ALT =
  "Prof. Owapriba Prayer Abu, Director of the Centre for Gender, Conflict and Development Studies, University of Port Harcourt";

export const ROTATING_WORDS = [
  "Gender Equity",
  "Conflict Resolution",
  "Development Studies",
  "Peace Building",
  "Inclusive Policy",
] as const;

export type Pillar = {
  id: string;
  label: string;
  index: string;
  headline: string;
  body: string;
  cta: { label: string; href: string };
};

export const PILLARS: Pillar[] = [
  {
    id: "philosophy",
    label: "Our Philosophy",
    index: "01",
    headline: "Complementarity, not competition",
    body: "To promote harmonious existence between the males and females by encouraging the complimentarily in their roles thereby bringing about gender equity that will lead to meeting sustainable development goals of equality of human species.",
    cta: { label: "See Our Programs", href: "/programs" },
  },
  {
    id: "vision",
    label: "Our Vision",
    index: "02",
    headline: "The best in the Global South",
    body: "To be the best in global south when it comes to Gender, Conflict and Development research, teaching, training and community services. The multidisciplinary nature of its staff and team of experts. Its ability to establish and carry out responsibilities in compliance with global best practice and professional standards contribution to the reduction of conflicts as shrouded by power relations in all human establishments.",
    cta: { label: "Apply Now", href: "/admission" },
  },
  {
    id: "mission",
    label: "Our Mission",
    index: "03",
    headline: "Evidence for peaceful co-existence",
    body: "Our Centre's mission is to expose male and female population to the knowledge of social, cultural, economic and political hindrances to development at the local, national and international levels, in order to attain peaceful co-existence for sustainable development. This will be achieved by the mobilization and application of relevant skills and competencies toward evidence based policy research in gender and development studies and thus reduce the gap caused by conflict in our daily interactions.",
    cta: { label: "Contact Admissions", href: "/contact" },
  },
  {
    id: "rationale",
    label: "Rationale / Justification",
    index: "04",
    headline: "Gender is the index of development",
    body: "The location of Gender matters/issues is an index to measure development. The continued hues and crisis as occasioned by the deprivation, oppression and exclusion of some humans by others especially in developing nations are undesirable, therefore gender and development practitioners need specialized skills and knowledge in order to bring about gender mainstreaming and ensure national and institutional policies on gender which is needed to bring about equality of humans and reduction of conflict in the communities.",
    cta: { label: "Read Our History", href: "/about/history" },
  },
];

export const HISTORY_PARAGRAPHS = [
  "Centre for Gender, Conflict and Development Studies (CGCDS) University of Port Harcourt came into being following the de-emerging of former Centre for Conflict and Gender Studies (CCGS) by the university authority in March, 2021. The authority's reason for de-emerging of the Centre is that study areas should be able to be visible as to attract international and national supports.",
  "It may interest you to note that this Centre has passed through several technical tinkering; first was the merging of former Centres for Ethnic Conflict (CENTECs) headed by Professor Mark O. Anikpo and Patience Jonathan Centre for Gender and Women Development Studies (PJCGDWS) (2013) also headed by Professor Elizabeth Okeke, and the merger gave birth to Centre for Conflict and Gender Studies in 2015, and this was headed by Professor Fidelis Allen.",
  "In 2021, Centre for Conflict and Gender Studies was further de-merged and its name became Centre for Gender, Conflict and Development; and Professor Heoma Nsirim-Worlu became its pioneer Director. The reason given for the merging and de-merging which this Centre had passed through is just for repositioning it to meet the perceived vision of the Unique University in the comity of universities. This Centre is a creation of the Senate of University of Port Harcourt.",
  "The core mandate of this Centre revolves around research, teaching and community service, which is stemmed on research thereby providing evidence without creating ambiguity in the minds of such organisations as to what the Centre stands for.",
  "This Centre is wired to make relevant contributions in the area of gender, conflict and development through research, teaching and community service by addressing challenges that arise in our society due to power relations between the gender — which is a major obstacle to development and an anathema to the improvement in the social status of women in the nation's development studies. It will further provide ways and means for the elimination of practices that hinder and prevent the two main groups that make up gender from existing harmoniously, thereby enthroning gender equity and inclusiveness.",
];

export type TimelineNode = {
  year: string;
  title: string;
  body: string;
  tag: string;
};

export const TIMELINE: TimelineNode[] = [
  {
    year: "2013",
    tag: "Merger",
    title: "Two Centres become one",
    body: "The Centres for Ethnic Conflict Studies (CENTECs), headed by Professor Mark O. Anikpo, is merged with the Patience Jonathan Centre for Gender and Women Development Studies (PJCGDWS), headed by Professor Elizabeth Okeke.",
  },
  {
    year: "2015",
    tag: "Founding",
    title: "Centre for Conflict and Gender Studies",
    body: "The merger gives birth to the Centre for Conflict and Gender Studies (CCGS), directed by Professor Fidelis Allen.",
  },
  {
    year: "Mar 2021",
    tag: "De-emergence",
    title: "CGCDS is created by Senate",
    body: "University authority de-emerges CCGS so that study areas become visible enough to attract national and international support. The Centre for Gender, Conflict and Development Studies is born, with Professor Heoma Nsirim-Worlu as pioneer Director.",
  },
  {
    year: "2022",
    tag: "Advocacy",
    title: "16 Days of Activism",
    body: "The Centre stages its 16 Days of Activism against gender-based violence programme across the University community — documented in the Centre's gallery archive.",
  },
  {
    year: "Oct 2024",
    tag: "Conference",
    title: "2nd International Conference",
    body: "World Gender and Environmental Development Day: “Action for Peace — Gender and Sustainable Clean Environment”, convening scholars and practitioners on the Choba campus.",
  },
  {
    year: "Oct 2025",
    tag: "Leadership",
    title: "Prof. Owapriba P. Abu becomes Director",
    body: "Prof. Owapriba Prayer Abu takes the mantle of leadership from Dr. Adaku A. Ubelejit-Nte to lead the Centre into a more prospective and impactful future.",
  },
  {
    year: "Mar 2026",
    tag: "Research",
    title: "International Women's Day Public Lecture",
    body: "Themed “Rights, Justice and Action for All Women and Girls”, featuring a press briefing, public lecture and the launch of the National Campus-Based Climate Baseline Survey on Sexual Harassment in Nigerian Public Tertiary Institutions.",
  },
];

/* ────────────────────────── Programs ────────────────────────── */

export type Program = {
  slug: string;
  code: string;
  name: string;
  fullName: string;
  quote: { text: string; cite: string };
  summary: string;
  accent: string;
  duration: { fullTime: string; partTime: string };
  admission: string[];
  requirements: string[];
  award: string;
  fee: { form: number; acceptance: number; session: number };
  image: string;
  outcomes: string[];
};

export const PROGRAMS: Program[] = [
  {
    slug: "pgd",
    code: "PGD",
    name: "Post Graduate Diploma",
    fullName:
      "Post Graduate Diploma in Gender, Conflict and Development Studies",
    quote: {
      text: "Masculine and feminine roles are not biologically fixed but socially constructed.",
      cite: "Judith Butler",
    },
    summary:
      "A one-year conversion programme that grounds candidates from any first discipline in the theory and practice of gender, conflict and development.",
    accent: "#2a9dd6",
    duration: {
      fullTime: "12 calendar months minimum · 24 months maximum",
      partTime: "Not offered",
    },
    admission: [
      "A third class (3rd) degree or equivalent level with a CGPA of 1.5 points on the 5-point scale of the University of Port Harcourt, in any field.",
      "For HND backgrounds, a lower credit pass shall be considered.",
    ],
    requirements: [
      "Nine (9) taught courses laying emphasis on gender, conflict and development issues.",
      "One seminar paper presented by every candidate before graduation.",
    ],
    award:
      "PGD Certificate in Gender, Conflict and Development Studies",
    fee: { form: 25000, acceptance: 50000, session: 350000 },
    image:
      "https://images.pexels.com/photos/10604063/pexels-photo-10604063.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1300",
    outcomes: [
      "Convert any first degree into a gender & development specialisation",
      "Route into the M.Sc. programme with a minimum grade of merit",
      "Nine taught courses plus a supervised seminar paper",
    ],
  },
  {
    slug: "msc",
    code: "M.Sc.",
    name: "Master of Science",
    fullName: "Master of Science in Gender, Conflict and Development Studies",
    quote: {
      text: "Freedom cannot be achieved unless women have been emancipated from all kinds of oppression.",
      cite: "Nelson Mandela",
    },
    summary:
      "A research-led master's combining eight taught courses with seminar and thesis work on gender and women development issues.",
    accent: "#1c8bbe",
    duration: {
      fullTime: "1 year minimum · 2 years maximum",
      partTime: "2 years minimum · 4 years maximum",
    },
    admission: [
      "At least a Second Class Lower Division (2:2) in Gender and Development Studies, or a degree in Social Sciences / Humanities / Education from any recognised tertiary institution, with a CGPA of 3.00 on the University of Port Harcourt 5-point scale.",
      "The University of Port Harcourt Post-Graduate Diploma in Gender and Development Studies, with a minimum grade of merit.",
    ],
    requirements: [
      "Eight (8) taught courses, including Seminar and Thesis.",
      "All courses focus on gender and women development issues.",
    ],
    award: "Master of Science Degree in Gender, Conflict and Development Studies",
    fee: { form: 25000, acceptance: 50000, session: 400000 },
    image:
      "https://images.pexels.com/photos/6496556/pexels-photo-6496556.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1300",
    outcomes: [
      "Supervised thesis contributing original evidence to the field",
      "Full-time (1–2 yrs) or part-time (2–4 yrs) study modes",
      "Qualifies holders for the Ph.D. programme",
    ],
  },
  {
    slug: "phd",
    code: "PhD",
    name: "Doctorate Degree",
    fullName: "PhD in Gender, Conflict and Development Studies",
    quote: {
      text: "Men of quality respect women's equality.",
      cite: "Jeremiah Say",
    },
    summary:
      "Independent, original research culminating in a thesis of not more than 100,000 words that makes a significant contribution to knowledge in the field.",
    accent: "#062a44",
    duration: {
      fullTime: "6 semesters minimum · 10 semesters maximum",
      partTime: "8 semesters minimum · 12 semesters maximum",
    },
    admission: [
      "A Master's Degree in Gender & Development Studies from a recognised university with an average score of 60% or its equivalent grade.",
      "Candidates with a Master's degree in other fields must also hold a Post Graduate Diploma or Master's Degree in Gender and Development Studies with a minimum of grade “C”.",
      "Admission is also based on interview performance.",
    ],
    requirements: [
      "Submit a proposed plan of research alongside the application.",
      "Pass a comprehensive upgrading examination at a minimum CGPA of 4.0 or 60% to proceed to Ph.D. candidacy.",
      "A candidate who fails the comprehensive examination after two attempts shall be asked to withdraw.",
      "A Ph.D. thesis should not exceed 100,000 words and must be a thorough, comprehensive and original study.",
    ],
    award: "Doctor of Philosophy in Gender, Conflict and Development Studies",
    fee: { form: 25000, acceptance: 50000, session: 500000 },
    image:
      "https://images.pexels.com/photos/28683662/pexels-photo-28683662.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1300",
    outcomes: [
      "Usually completed within three years of full-time study",
      "Comprehensive upgrading examination before candidacy",
      "Original thesis of up to 100,000 words",
    ],
  },
];

export const PROGRAM_METHOD_NOTE =
  "Same as in the Masters programme — every candidate applies through the Centre's admission portal after payment of the non-refundable NGN 25,000 admission form fee.";

/* ───────────────────────── Short courses ────────────────────── */

export type ShortCourse = {
  title: string;
  code: string;
  blurb: string;
  focus: string[];
};

export const SHORT_COURSES: ShortCourse[] = [
  {
    title: "Gender Inequality and Justice",
    code: "SC 01",
    blurb:
      "Interrogates the structural production of inequality and the justice frameworks — national and international — available for redress.",
    focus: ["Structural inequality", "Legal & policy redress", "Intersectionality"],
  },
  {
    title: "Digital Peace Building",
    code: "SC 02",
    blurb:
      "Equips practitioners to use digital platforms, data and online civic space for early warning, dialogue and peace consolidation.",
    focus: ["Online early warning", "Digital civic space", "Counter-misinformation"],
  },
  {
    title: "United Nations and Nationality",
    code: "SC 03",
    blurb:
      "Examines the UN system, treaties and conventions on nationality, statelessness and the rights that flow from belonging to a state.",
    focus: ["UN system & treaties", "Statelessness", "Rights of belonging"],
  },
  {
    title: "Human Rights, Citizenship and Development",
    code: "SC 04",
    blurb:
      "Links human rights instruments to citizenship practice and to measurable development outcomes at community and national level.",
    focus: ["Rights instruments", "Citizenship practice", "Development indicators"],
  },
  {
    title: "Disarmament, Demobilization & Reintegration",
    code: "SC 05",
    blurb:
      "A practitioner's course on DDR programming, including the gendered dimensions of reintegration for ex-combatants and affected communities.",
    focus: ["DDR programming", "Gendered reintegration", "Post-conflict recovery"],
  },
  {
    title: "Conflict Sensitivity and Mediation",
    code: "SC 06",
    blurb:
      "Trains participants to design do-no-harm interventions and to mediate disputes with awareness of the power relations at play.",
    focus: ["Do-no-harm design", "Mediation skills", "Power analysis"],
  },
  {
    title: "Gender and Conflict Prevention",
    code: "SC 07",
    blurb:
      "Focuses on prevention: how gender analysis identifies flashpoints early and shapes interventions that stop conflict before it escalates.",
    focus: ["Early identification", "Gender analysis", "Prevention strategy"],
  },
  {
    title: "Gender and Peace Supportive Operations",
    code: "SC 08",
    blurb:
      "Prepares personnel for peace support operations that mainstream gender perspectives across planning, deployment and evaluation.",
    focus: ["PSO planning", "Gender mainstreaming", "Mission evaluation"],
  },
];

export const SHORT_COURSE_FACTS = [
  { label: "Duration", value: "Three (3) months", note: "Each short course" },
  {
    label: "Award",
    value: "University of Port Harcourt Certificate",
    note: "Given at the end of each course",
  },
  {
    label: "Ideal for",
    value: "Corporate organisations & NGOs",
    note: "Cohort and in-house delivery",
  },
  {
    label: "Payment",
    value: "3 small instalments",
    note: "Private students only · affordable tuition",
  },
];

/* ─────────────────────────── Tuition ────────────────────────── */

export const TUITION_LEAD =
  "Our tuition fee is affordable, and our standard is world class.";

export const TUITION_COLUMNS = [
  "Admission Form",
  "Acceptance Fee",
  "School Fees / Session",
] as const;

export const TUITION_NOTES = [
  "Admission form fee of NGN 25,000 is non-refundable and must be paid before proceeding to apply.",
  "Tuition fees are accommodating and affordable; the Centre allows for instalment payment (terms & conditions apply).",
  "Short-course tuition can be paid in three small instalments — private students only.",
  "Online payments are currently disabled. Pay to the Centre's designated Fidelity Bank account and upload proof of payment on the application portal.",
];

/* ───────────────────────────── Stats ────────────────────────── */

export type Stat = {
  value: string;
  suffix?: string;
  numeric?: number;
  label: string;
  note?: string;
};

export const HEADLINE_STATS: Stat[] = [
  { value: "94", suffix: "+", numeric: 94, label: "PG Students" },
  {
    value: "3",
    numeric: 3,
    label: "PG Programs",
    note: "PGD, M.Sc. & PhD",
  },
  {
    value: "15",
    numeric: 15,
    label: "Full Time Faculty / Instructors",
  },
  {
    value: "100",
    suffix: "%",
    numeric: 100,
    label: "Graduate in 1 year",
    note: "Inspite of strike / industrial action",
  },
  { value: "6:1", label: "Student to Faculty Ratio" },
  { value: "220", suffix: "+", numeric: 220, label: "Students sharing a seamless culture" },
];

export const OUTCOME_STATS: Stat[] = [
  {
    value: "94",
    suffix: "%",
    numeric: 94,
    label: "Volunteered for community service",
  },
  {
    value: "65",
    suffix: "%",
    numeric: 65,
    label: "Students study virtually / online",
  },
  {
    value: "85",
    suffix: "%",
    numeric: 85,
    label: "Already work in the industry",
  },
  { value: "55:45", label: "Female to male ratio" },
  {
    value: "90",
    suffix: "%",
    numeric: 90,
    label: "Get promoted in their workplace",
    note: "After completing our PG program",
  },
];

/* ─────────────────── Research & service pillars ─────────────── */

export const MANDATE = [
  {
    title: "Research",
    body: "Evidence-based policy research in gender and development studies, generating data without ambiguity about what the Centre stands for.",
    points: ["Climate baseline surveys", "Policy briefs", "Field evidence"],
  },
  {
    title: "Teaching",
    body: "Three postgraduate programmes open to all disciplines — sciences, social sciences, management, engineering and humanities, to mention a few.",
    points: ["PGD · M.Sc · PhD", "9 / 8 taught courses", "Seminar & thesis"],
  },
  {
    title: "Community Service",
    body: "Mobilising relevant skills and competencies toward the reduction of conflict in our daily interactions and the enthronement of gender equity.",
    points: ["16 Days of Activism", "Girl Child advocacy", "NGO partnerships"],
  },
];

/* ─────────────────────────── Gallery ────────────────────────── */

export type GalleryPhoto = {
  album: string;
  title: string;
  url: string;
  credit: string;
};

export const GALLERY: GalleryPhoto[] = [
  {
    album: "16 Days of Activism",
    title: "16 Days of Activism 2022 — opening procession",
    url: "https://images.pexels.com/photos/36780246/pexels-photo-36780246.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1300",
    credit: "unique bash Creative / Pexels",
  },
  {
    album: "16 Days of Activism",
    title: "Advocacy session with the University community",
    url: "https://images.pexels.com/photos/15448072/pexels-photo-15448072.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1300",
    credit: "Luis Quintero / Pexels",
  },
  {
    album: "16 Days of Activism",
    title: "Panel discussion on gender-based violence",
    url: "https://images.pexels.com/photos/3321802/pexels-photo-3321802.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1300",
    credit: "Matheus Bertelli / Pexels",
  },
  {
    album: "International Conference",
    title: "2nd International Conference — plenary hall",
    url: "https://images.pexels.com/photos/9275222/pexels-photo-9275222.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1300",
    credit: "Atlantic Ambience / Pexels",
  },
  {
    album: "International Conference",
    title: "Action for Peace: Gender & Sustainable Clean Environment",
    url: "https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1300",
    credit: "Luis Quintero / Pexels",
  },
  {
    album: "International Conference",
    title: "Delegates in session",
    url: "https://images.pexels.com/photos/36791504/pexels-photo-36791504.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1300",
    credit: "Marwen Larafa / Pexels",
  },
  {
    album: "Girl Child & Women's Day",
    title: "The Girl I Am, The Change I Lead — 2025 commemoration",
    url: "https://images.pexels.com/photos/12196191/pexels-photo-12196191.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1300",
    credit: "Samuel Peter / Pexels",
  },
  {
    album: "Girl Child & Women's Day",
    title: "2026 International Women's Day public lecture",
    url: "https://images.pexels.com/photos/15325468/pexels-photo-15325468.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1300",
    credit: "Luis Quintero / Pexels",
  },
  {
    album: "Girl Child & Women's Day",
    title: "Press briefing & survey launch",
    url: "https://images.pexels.com/photos/38111334/pexels-photo-38111334.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1300",
    credit: "Wiseboy Wissebo / Pexels",
  },
  {
    album: "Campus Life",
    title: "Graduation of Centre postgraduate students",
    url: "https://images.pexels.com/photos/15490405/pexels-photo-15490405.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1300",
    credit: "Safari Consoler / Pexels",
  },
  {
    album: "Campus Life",
    title: "Convocation celebration, Choba campus",
    url: "https://images.pexels.com/photos/37410978/pexels-photo-37410978.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1300",
    credit: "SR Raju / Pexels",
  },
  {
    album: "Campus Life",
    title: "Nigerian graduates in academic regalia",
    url: "https://images.pexels.com/photos/10604063/pexels-photo-10604063.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1300",
    credit: "Adedire Abiodun / Pexels",
  },
  {
    album: "Community Service",
    title: "Community outreach in Rivers State",
    url: "https://images.pexels.com/photos/7849437/pexels-photo-7849437.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1300",
    credit: "Lagos Food Bank Initiative / Pexels",
  },
  {
    album: "Community Service",
    title: "Field data collection with community women",
    url: "https://images.pexels.com/photos/32685507/pexels-photo-32685507.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1300",
    credit: "Jonathan Shembere / Pexels",
  },
  {
    album: "Community Service",
    title: "Market women livelihoods study",
    url: "https://images.pexels.com/photos/33662800/pexels-photo-33662800.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1300",
    credit: "alameen .ng / Pexels",
  },
  {
    album: "Community Service",
    title: "Rural household survey fieldwork",
    url: "https://images.pexels.com/photos/12888651/pexels-photo-12888651.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1300",
    credit: "David Iloba / Pexels",
  },
];

/* ─────────────────────────── Staff ──────────────────────────── */

export type StaffMember = {
  name: string;
  role: string;
  title: string;
  group: string;
  email: string;
  phone: string;
  bio: string;
  expertise: string[];
  tenure: string;
  photoUrl: string | null;
  sortOrder: number;
};

export const STAFF: StaffMember[] = [
  {
    name: "Prof. Owapriba Prayer Abu",
    role: "Director",
    title: "Professor — Centre for Gender, Conflict and Development Studies",
    group: "Current Leadership",
    email: "director@cgcds.com.ng",
    phone: "+234 806 268 3883",
    bio: "Prof. Owapriba Prayer Abu became Director of the Centre for Gender, Conflict and Development Studies (CGCDS-Uniport), University of Port Harcourt, taking the mantle of leadership from Dr. Adaku A. Ubelejit-Nte to lead the Centre into a more prospective and impactful future. Under her leadership the demands and studies related to gender awareness and proper conflict resolution continue to be a focus of the Centre.",
    expertise: ["Gender awareness", "Conflict resolution", "Centre administration"],
    tenure: "October 2025 – present",
    photoUrl: DIRECTOR_PORTRAIT,
    sortOrder: 1,
  },
  {
    name: "Dr. Adaku A. Ubelejit-Nte",
    role: "Immediate Past Director",
    title: "Senior Lecturer & Research Fellow",
    group: "Past Directors",
    email: "info@cgcds.com.ng",
    phone: "+234 803 731 5349",
    bio: "Led the Centre immediately before Prof. Owapriba P. Abu, overseeing postgraduate training, the 2nd International Conference on the World Gender and Environmental Development Day, and the Centre's community service portfolio.",
    expertise: ["Gender & development", "Conference convening", "Postgraduate training"],
    tenure: "Up to October 2025",
    photoUrl: null,
    sortOrder: 2,
  },
  {
    name: "Prof. Heoma Nsirim-Worlu",
    role: "Pioneer Director, CGCDS",
    title: "Professor",
    group: "Past Directors",
    email: "info@cgcds.com.ng",
    phone: "+234 803 731 5349",
    bio: "Became the pioneer Director when the Centre for Conflict and Gender Studies was de-emerged in March 2021 to form the Centre for Gender, Conflict and Development Studies, positioning the new Centre within the comity of universities.",
    expertise: ["Institutional repositioning", "Gender studies", "Development studies"],
    tenure: "March 2021 – ",
    photoUrl: null,
    sortOrder: 3,
  },
  {
    name: "Prof. Fidelis Allen",
    role: "Director, Centre for Conflict and Gender Studies",
    title: "Professor",
    group: "Past Directors",
    email: "info@cgcds.com.ng",
    phone: "+234 803 731 5349",
    bio: "Headed the Centre for Conflict and Gender Studies (CCGS) formed in 2015 from the merger of CENTECs and the Patience Jonathan Centre for Gender and Women Development Studies.",
    expertise: ["Conflict studies", "Ethnic conflict", "Peace building"],
    tenure: "2015 – 2021",
    photoUrl: null,
    sortOrder: 4,
  },
  {
    name: "Prof. Elizabeth Okeke",
    role: "Head, PJCGDWS",
    title: "Professor",
    group: "Legacy Leadership",
    email: "info@cgcds.com.ng",
    phone: "+234 803 731 5349",
    bio: "Headed the Patience Jonathan Centre for Gender and Women Development Studies (PJCGDWS), one of the two Centres whose 2013 merger produced the present lineage of CGCDS.",
    expertise: ["Women development studies", "Gender policy"],
    tenure: "2013 – 2015",
    photoUrl: null,
    sortOrder: 5,
  },
  {
    name: "Prof. Mark O. Anikpo",
    role: "Head, CENTECs",
    title: "Professor",
    group: "Legacy Leadership",
    email: "info@cgcds.com.ng",
    phone: "+234 803 731 5349",
    bio: "Headed the Centres for Ethnic Conflict Studies (CENTECs), whose 2013 merger with PJCGDWS laid the foundation for the Centre's conflict-studies mandate.",
    expertise: ["Ethnic conflict", "Conflict analysis"],
    tenure: "Up to 2013",
    photoUrl: null,
    sortOrder: 6,
  },
];

export const DIRECTORATE_OFFICES = [
  {
    office: "Office of the Deputy Director",
    remit:
      "Deputises for the Director and coordinates day-to-day academic and administrative business of the Centre.",
  },
  {
    office: "Head — Research & Publications",
    remit:
      "Steers evidence-based policy research, the Centre's journal series and conference proceedings.",
  },
  {
    office: "Head — Training & Community Service",
    remit:
      "Owns the short-course portfolio, cohort training for corporate organisations and NGOs, and outreach.",
  },
  {
    office: "PG Coordinator — PGD",
    remit:
      "Coordinates the nine taught courses and seminar paper requirements of the Post Graduate Diploma.",
  },
  {
    office: "PG Coordinator — M.Sc.",
    remit:
      "Coordinates eight taught courses, seminar and thesis supervision for the Master of Science programme.",
  },
  {
    office: "PG Coordinator — PhD",
    remit:
      "Administers the comprehensive upgrading examination, candidacy progression and thesis supervision.",
  },
  {
    office: "Centre Secretary / Admissions",
    remit:
      "Processes admission forms, proof-of-payment verification and the Centre's correspondence.",
  },
  {
    office: "Faculty & Instructors (15)",
    remit:
      "Fifteen full-time faculty and instructors drawn from a multidisciplinary team of experts, sustaining a 6:1 student-to-faculty ratio.",
  },
];

/* ────────────────────────── Articles ────────────────────────── */

export type SeedArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  featured: boolean;
  commentCount: number;
  coverUrl: string;
  body: ArticleBlock[];
};

export const SEED_ARTICLES: SeedArticle[] = [
  {
    slug: "intl-womens-day-2026-public-lecture",
    title:
      "Celebration of 2026 International Women's Day with a Public Lecture — CGCDS Uniport",
    excerpt:
      "The Centre for Gender, Conflict and Development Studies, University of Port Harcourt presents: Celebration of the 2026 International Women's Day with a Public Lecture.",
    category: "2026 Int'l Women's Day",
    author: "CGCDS Uniport",
    publishedAt: "2026-03-16T09:00:00.000Z",
    featured: true,
    commentCount: 0,
    coverUrl:
      "https://images.pexels.com/photos/36780246/pexels-photo-36780246.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    body: [
      {
        type: "p",
        text: "The Centre for Gender, Conflict and Development Studies, University of Port Harcourt presents the celebration of the 2026 International Women's Day with a Public Lecture.",
      },
      {
        type: "quote",
        text: "Rights, Justice and Action for All Women and Girls",
        cite: "2026 International Women's Day theme",
      },
      {
        type: "p",
        text: "The event features a press briefing, a public lecture, and the launch of the National Campus-Based Climate Baseline Survey on Sexual Harassment in Nigerian Public Tertiary Institutions — a research instrument the Centre will deploy across public universities to establish the evidence base for campus climate policy.",
      },
      {
        type: "h",
        text: "What the launch means",
      },
      {
        type: "list",
        items: [
          "A national baseline against which campus climate interventions can be measured.",
          "Evidence for institutional and national policy on gender, consistent with the Centre's mission of evidence-based policy research.",
          "A platform for the University community, civil society and the press to engage directly with the findings.",
        ],
      },
      {
        type: "callout",
        title: "Attendance",
        text: "The public lecture is open to students, staff, civil society organisations and the press. Venue details are confirmed by the Centre — contact info@cgcds.com.ng or call +234 806 268 3883.",
      },
    ],
  },
  {
    slug: "prof-owapriba-p-abu-becomes-director",
    title:
      "Prof. Owapriba P. Abu becomes Director, Centre for Gender, Conflict and Development Studies",
    excerpt:
      "Prof. Owapriba Prayer Abu becomes Director of the Centre for Gender, Conflict and Development Studies (CGCDS-Uniport), University of Port Harcourt.",
    category: "Management",
    author: "CGCDS Uniport",
    publishedAt: "2025-10-18T09:00:00.000Z",
    featured: true,
    commentCount: 0,
    coverUrl: DIRECTOR_COVER,
    body: [
      {
        type: "p",
        text: "Prof. Owapriba Prayer Abu becomes Director of the Centre for Gender, Conflict and Development Studies (CGCDS-Uniport), University of Port Harcourt, Port Harcourt. She took the mantle of leadership from Dr. Adaku A. Ubelejit-Nte to lead the Centre into a more prospective and impactful future.",
      },
      {
        type: "p",
        text: "The demands and studies related to gender awareness and proper conflict resolution will continue to be a focus of the Centre.",
      },
      {
        type: "h",
        text: "Continuity and reform",
      },
      {
        type: "p",
        text: "The Centre's core mandate revolves around research, teaching and community service, stemmed on research thereby providing evidence for the organisations and communities the Centre serves. Under the new directorate, the postgraduate portfolio — PGD, M.Sc. and PhD in Gender, Conflict and Development Studies — continues alongside the eight-certificate short-course programme designed for corporate organisations and NGOs.",
      },
      {
        type: "callout",
        title: "Office of the Director",
        text: "Prof. Owapriba Prayer Abu · director@cgcds.com.ng · Centre phone +234 806 268 3883",
      },
    ],
  },
  {
    slug: "intl-day-of-the-girl-child-2025",
    title:
      "CGCDS Uniport Commemorates the 2025 International Day of the Girl Child",
    excerpt:
      "CGCDS Uniport commemorates the 2025 Int'l Day of the Girl Child with the theme “The Girl I Am, The Change I Lead…”.",
    category: "Int'l Day of the Girl Child",
    author: "CGCDS Uniport",
    publishedAt: "2025-10-11T09:00:00.000Z",
    featured: false,
    commentCount: 0,
    coverUrl:
      "https://images.pexels.com/photos/16255409/pexels-photo-16255409.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    body: [
      {
        type: "p",
        text: "CGCDS Uniport commemorated the 2025 International Day of the Girl Child with the theme “The Girl I am, The Change I lead…”.",
      },
      {
        type: "quote",
        text: "The Girl I Am, The Change I Lead",
        cite: "2025 International Day of the Girl Child theme",
      },
      {
        type: "p",
        text: "The commemoration brings the Centre's community-service mandate onto the campus and into the surrounding communities of Choba, focusing on the barriers that keep girls out of school and out of public life — the very social, cultural, economic and political hindrances to development that the Centre exists to expose and address.",
      },
      {
        type: "list",
        items: [
          "Advocacy conversations with girls in the University community and neighbouring schools.",
          "Mentorship pairing students of the Centre with secondary-school girls.",
          "Documentation of commitments made for the girl child, feeding the Centre's research agenda.",
        ],
      },
    ],
  },
  {
    slug: "2025-2026-pg-admission-form-on-sale",
    title:
      "CGCDS UNIPORT 2025/2026 Post Graduate Admission Form Now on Sale — Application Available Online",
    excerpt:
      "Applications are hereby invited from suitably qualified candidates for admission into the Post Graduate Diploma (PGD), Master of Science Degree (M.Sc.) and Doctor of Philosophy Degree.",
    category: "2025/2026 PG Admission",
    author: "CGCDS Uniport",
    publishedAt: "2025-09-28T09:00:00.000Z",
    featured: true,
    commentCount: 1,
    coverUrl:
      "https://images.pexels.com/photos/6496556/pexels-photo-6496556.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    body: [
      {
        type: "p",
        text: "Applications are hereby invited from suitably qualified candidates for admission into the Post Graduate Diploma (PGD), Master of Science Degree (M.Sc.) and Doctor of Philosophy Degree in the Centre for Gender, Conflict and Development Studies (CGCDS), University of Port Harcourt, Nigeria.",
      },
      {
        type: "h",
        text: "Qualification for admission",
      },
      {
        type: "list",
        items: [
          "PGD — a third class (3rd) degree or equivalent with a CGPA of 1.5 points on the 5-point scale of the University of Port Harcourt, in any field. For HND background, a lower credit pass shall be considered.",
          "M.Sc. — at least a Second Class Lower Division (2:2) in Gender and Development Studies, or a degree in Social Sciences / Humanities / Education from a recognised tertiary institution, with a CGPA of 3.00; or the UniPort Post-Graduate Diploma in Gender and Development Studies with a minimum grade of merit.",
          "PhD — a Master's Degree in Gender & Development Studies from a recognised university with an average score of 60% or equivalent; candidates from other fields must also hold a PGD or Master's in Gender and Development Studies with a minimum grade “C”. Admission is also based on interview performance.",
        ],
      },
      {
        type: "callout",
        title: "Method of application",
        text: "Intending students are required to pay a non-refundable admission form fee of NGN 25,000 before proceeding to apply. Pay NGN 25,000 to 5210017988 — Fidelity Bank, PLC (Centre for Gender, Conflict and Development Studies), then upload proof of payment on the application portal before submitting. PhD candidates must in addition submit a proposed plan of research.",
      },
      {
        type: "p",
        text: "The Centre's three postgraduate programmes are open to all disciplines — sciences, social sciences, management, engineering and humanities, to mention a few.",
      },
    ],
  },
  {
    slug: "2nd-international-conference-world-gender-environmental-development-day",
    title:
      "2nd International Conference — World Gender and Environmental Development Day",
    excerpt:
      "On the 15th of October 2024, the Centre organised and hosted her 2nd International Conference on the World Gender and Environmental Development Day.",
    category: "Upcoming Event",
    author: "CGCDS Uniport",
    publishedAt: "2024-08-10T09:00:00.000Z",
    featured: false,
    commentCount: 3,
    coverUrl:
      "https://images.pexels.com/photos/9275222/pexels-photo-9275222.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    body: [
      {
        type: "p",
        text: "On the 15th of October 2024, the Centre organised and hosted her 2nd International Conference on the World Gender and Environmental Development Day.",
      },
      {
        type: "h",
        text: "Why gender and the environment belong in one conversation",
      },
      {
        type: "p",
        text: "Environmental degradation is not gender neutral. When water sources recede, when farmland is lost to erosion or extraction, and when clean energy is unavailable, the burden of adjustment falls disproportionately on women and girls — in the household, in the market and in the community. The Centre's conference programme treats sustainable clean environment as a gender and development question, and as a peace question.",
      },
      {
        type: "list",
        items: [
          "Gendered impacts of environmental change on livelihoods in the Niger Delta.",
          "Women's participation in environmental governance and clean-energy transitions.",
          "Conflict over land, water and extractive resources — prevention and mediation.",
          "Evidence-based policy pathways for national and institutional gender mainstreaming.",
        ],
      },
      {
        type: "quote",
        text: "Action for Peace: Gender and Sustainable Clean Environment",
        cite: "Conference theme",
      },
      {
        type: "p",
        text: "Papers presented at the conference feed the Centre's research and publications agenda and its contribution to the reduction of conflicts as shrouded by power relations in human establishments.",
      },
    ],
  },
  {
    slug: "action-for-peace-gender-and-sustainable-clean-environment",
    title:
      "Action for Peace: Gender and Sustainable Clean Environment #Global Goal",
    excerpt:
      "The Centre's international conference programme under the banner “Action for Peace: Gender and Sustainable Clean Environment”, aligned to the global goals.",
    category: "International Conference",
    author: "CGCDS Uniport",
    publishedAt: "2023-09-23T09:00:00.000Z",
    featured: false,
    commentCount: 0,
    coverUrl:
      "https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    body: [
      {
        type: "p",
        text: "“Action for Peace: Gender and Sustainable Clean Environment” frames the Centre's international conference work against the global goals — peace, gender equality and climate action treated as one interlocking agenda rather than three separate ones.",
      },
      {
        type: "h",
        text: "The argument of the programme",
      },
      {
        type: "p",
        text: "The location of gender matters and issues is an index to measure development. Where deprivation, oppression and exclusion persist, crisis follows; where gender equity is mainstreamed into national and institutional policy, communities become more peaceful and development becomes measurable. A sustainable clean environment is part of that measurement, because the costs of environmental harm are distributed unequally between men and women.",
      },
      {
        type: "list",
        items: [
          "Gender mainstreaming in environmental and climate policy.",
          "Community-level conflict prevention around natural resources.",
          "Training practitioners — corporate organisations and NGOs — through the Centre's short courses.",
          "Publishing the resulting evidence through the Centre's journal series.",
        ],
      },
      {
        type: "callout",
        title: "Get involved",
        text: "The Centre welcomes paper proposals, partnerships and cohort bookings for short courses. Write to info@cgcds.com.ng.",
      },
    ],
  },
];

/* ─────────────────────────── Events ─────────────────────────── */

export const SEED_EVENTS = [
  {
    slug: "intl-womens-day-public-lecture-2026",
    title:
      "2026 International Women's Day — Public Lecture & Survey Launch",
    startsAt: "2026-03-16T09:00:00.000Z",
    venue: "University of Port Harcourt, Choba",
    category: "Public Lecture",
    cadence: "Annual",
    description:
      "Theme: “Rights, Justice and Action for All Women and Girls”. Features a press briefing, public lecture, and the launch of the National Campus-Based Climate Baseline Survey on Sexual Harassment in Nigerian Public Tertiary Institutions.",
    coverUrl:
      "https://images.pexels.com/photos/36780246/pexels-photo-36780246.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100",
  },
  {
    slug: "world-gender-environmental-development-day-2026",
    title: "World Gender & Environmental Development Day — 3rd International Conference",
    startsAt: "2026-10-15T09:00:00.000Z",
    venue: "University of Port Harcourt, Choba",
    category: "International Conference",
    cadence: "Annual",
    description:
      "The Centre's flagship international conference convening scholars, practitioners and policy makers on gender, environment and development. Call for papers is administered by the Centre's Research & Publications unit.",
    coverUrl:
      "https://images.pexels.com/photos/9275222/pexels-photo-9275222.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100",
  },
  {
    slug: "intl-day-of-the-girl-child-2026",
    title: "International Day of the Girl Child Commemoration",
    startsAt: "2026-10-11T09:00:00.000Z",
    venue: "CGCDS Building, Abuja Campus",
    category: "Advocacy",
    cadence: "Annual",
    description:
      "Annual commemoration with advocacy conversations, mentorship pairing and community engagement around the girl child.",
    coverUrl:
      "https://images.pexels.com/photos/16255409/pexels-photo-16255409.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100",
  },
  {
    slug: "16-days-of-activism-2026",
    title: "16 Days of Activism Against Gender-Based Violence",
    startsAt: "2026-11-25T09:00:00.000Z",
    venue: "University community & partner organisations",
    category: "Advocacy",
    cadence: "Annual · 25 Nov – 10 Dec",
    description:
      "A sixteen-day programme of advocacy running from the International Day for the Elimination of Violence against Women to Human Rights Day.",
    coverUrl:
      "https://images.pexels.com/photos/15448072/pexels-photo-15448072.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100",
  },
];

/* ─────────────────────────── Journals ───────────────────────── */

export const SEED_JOURNALS = [
  {
    slug: "jgcds-vol-5-issue-1",
    title:
      "Journal of Gender, Conflict and Development Studies — Vol. 5, Issue 1",
    volume: "5",
    issue: "1",
    year: 2026,
    theme: "Rights, Justice and Action for All Women and Girls",
    editors: "Editorial Board, CGCDS Uniport",
    issn: "Institutional series",
    summary:
      "Special issue marking the 2026 International Women's Day public lecture and the launch of the National Campus-Based Climate Baseline Survey on Sexual Harassment in Nigerian Public Tertiary Institutions.",
    status: "Forthcoming",
    publishedAt: "2026-03-16T09:00:00.000Z",
    papers: [
      {
        title:
          "Campus climate as evidence: designing a national baseline survey on sexual harassment in Nigerian public tertiary institutions",
        authors: "CGCDS Research & Publications Unit",
        pages: "1–18",
      },
      {
        title:
          "Rights, justice and action: translating international women's rights instruments into campus policy",
        authors: "CGCDS Faculty Seminar",
        pages: "19–36",
      },
    ],
  },
  {
    slug: "jgcds-vol-4-issue-2",
    title:
      "Journal of Gender, Conflict and Development Studies — Vol. 4, Issue 2",
    volume: "4",
    issue: "2",
    year: 2025,
    theme: "The Girl I Am, The Change I Lead",
    editors: "Editorial Board, CGCDS Uniport",
    issn: "Institutional series",
    summary:
      "Papers arising from the 2025 International Day of the Girl Child commemoration and the Centre's community-service fieldwork.",
    status: "Published",
    publishedAt: "2025-10-11T09:00:00.000Z",
    papers: [
      {
        title:
          "Mentorship as intervention: pairing postgraduate researchers with secondary-school girls in Choba",
        authors: "Community Service Unit, CGCDS",
        pages: "1–16",
      },
      {
        title:
          "Barriers to retention: social, cultural and economic hindrances to the girl child's education",
        authors: "PG Seminar Series",
        pages: "17–34",
      },
    ],
  },
  {
    slug: "jgcds-vol-4-issue-1",
    title:
      "Journal of Gender, Conflict and Development Studies — Vol. 4, Issue 1",
    volume: "4",
    issue: "1",
    year: 2024,
    theme: "Action for Peace: Gender and Sustainable Clean Environment",
    editors: "Editorial Board, CGCDS Uniport",
    issn: "Institutional series",
    summary:
      "Conference issue of the 2nd International Conference on the World Gender and Environmental Development Day, held 15 October 2024.",
    status: "Published",
    publishedAt: "2024-10-15T09:00:00.000Z",
    papers: [
      {
        title:
          "Gendered impacts of environmental change on livelihoods in the Niger Delta",
        authors: "Conference Plenary Papers",
        pages: "1–22",
      },
      {
        title:
          "Conflict over land, water and extractive resources: prevention and mediation pathways",
        authors: "Conference Panel Proceedings",
        pages: "23–44",
      },
      {
        title:
          "Gender mainstreaming in national and institutional environmental policy",
        authors: "Policy Roundtable",
        pages: "45–60",
      },
    ],
  },
  {
    slug: "jgcds-vol-3-issue-1",
    title:
      "Journal of Gender, Conflict and Development Studies — Vol. 3, Issue 1",
    volume: "3",
    issue: "1",
    year: 2023,
    theme: "Power Relations, Conflict and the Enthronement of Gender Equity",
    editors: "Editorial Board, CGCDS Uniport",
    issn: "Institutional series",
    summary:
      "The Centre's foundational issue following the 2021 de-emergence, setting out the research agenda on power relations as an obstacle to development.",
    status: "Published",
    publishedAt: "2023-09-23T09:00:00.000Z",
    papers: [
      {
        title:
          "Power relations as an obstacle to development: a framework for evidence-based gender policy",
        authors: "Directorate, CGCDS",
        pages: "1–20",
      },
      {
        title:
          "From CENTECs to CGCDS: institutional lineage and the mandate of a Nigerian gender centre",
        authors: "Centre Historical Review",
        pages: "21–38",
      },
    ],
  },
];

export const JOURNAL_SCOPE = [
  "Gender, conflict and development theory and practice",
  "Evidence-based policy research and gender mainstreaming",
  "Peace building, conflict prevention and mediation",
  "Human rights, citizenship and nationality",
  "Disarmament, demobilization and reintegration",
  "Environmental development and climate justice",
];

/* ─────────────────────────── FAQ ────────────────────────────── */

export const FAQS = [
  {
    q: "Is the Centre's postgraduate programme open to my discipline?",
    a: "Yes. Our Centre offers three quality postgraduate programmes which are open to all disciplines — sciences, social sciences, management, engineering and humanities, to mention a few.",
  },
  {
    q: "How much is the admission form and how do I pay?",
    a: "The admission form fee is NGN 25,000 and is non-refundable. Online payments are currently disabled: pay NGN 25,000 to 5210017988, Fidelity Bank, PLC (Centre for Gender, Conflict and Development Studies), then upload a scan or screenshot of your proof of payment on the application portal before submitting.",
  },
  {
    q: "Can I pay my tuition in instalments?",
    a: "Yes. Our tuition fees are accommodating and affordable, and we allow for instalment payment (terms and conditions apply). Short-course tuition can be paid in three small instalments for private students.",
  },
  {
    q: "How long does each programme run?",
    a: "PGD runs full-time for a minimum of twelve calendar months and a maximum of twenty-four. The M.Sc. runs full-time for one to two years, or part-time for two to four years. The PhD runs full-time for six to ten semesters, or part-time for eight to twelve semesters.",
  },
  {
    q: "Do short courses carry a certificate?",
    a: "A University of Port Harcourt Certificate is given at the end of each short course. Each course runs for three months and our short courses are ideal for corporate organisations and NGOs.",
  },
  {
    q: "Can I study virtually?",
    a: "65% of our students study virtually or online, and 100% of our students graduate in one year — inspite of strike or industrial action.",
  },
];
