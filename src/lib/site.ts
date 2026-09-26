export const SITE = {
  name: "Centre for Gender, Conflict and Development Studies",
  short: "CGCDS Uniport",
  acronym: "CGCDS",
  institution: "University of Port Harcourt",
  tagline: "A place of intense energy, creativity & inclusiveness",
  strapline:
    "Fostering learning, creativity and inclusiveness in both the male and female gender, towards a better society.",
  director: "Prof. Owapriba Prayer Abu",
  domain: "https://cgcds.com.ng",
  address: {
    building: "CGCDS Uniport Building, Beside Faculty of Law",
    campus: "Abuja Campus, University of Port Harcourt",
    city: "Choba, Rivers State, Nigeria",
    road: "Along East–West Road",
    full: "Centre for Gender, Conflict and Development Studies (Beside Faculty of Law), Abuja Campus, University of Port Harcourt, Choba.",
  },
  phones: [
    { label: "Centre", value: "+234 806 268 3883", href: "tel:+2348062683883" },
    { label: "Mobile", value: "+234 803 731 5349", href: "tel:+2348037315349" },
    { label: "Admissions", value: "+234 703 439 9491", href: "tel:+2347034399491" },
  ],
  emails: ["info@cgcds.com.ng", "director@cgcds.com.ng"],
  hours: [
    { day: "Monday – Friday", time: "8:00am – 4:00pm" },
    { day: "Saturday – Sunday", time: "Closed" },
  ],
  bank: {
    name: "Fidelity Bank, PLC",
    accountName: "Centre for Gender, Conflict and Development Studies",
    accountNumber: "5210017988",
    amount: 25000,
    note: "Non-refundable admission form fee",
  },
  handbookUrl:
    "https://cgcds.com.ng/wp-content/uploads/2024/08/Centre-for-Gender-Conflict-and-Development-Studies-CGCDS-Student-BROCHURE-HandBook.pdf",
  mapQuery:
    "University of Port Harcourt, Abuja Campus, Choba, Rivers State, Nigeria",
} as const;

export type NavChild = { label: string; href: string; blurb?: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "About CGCDS", href: "/about", blurb: "Philosophy, vision & mission" },
      { label: "Our History", href: "/about/history", blurb: "From CENTECs to CGCDS" },
      { label: "Our Staff", href: "/about/staff", blurb: "Directorate & faculty" },
      { label: "Our Gallery", href: "/about/gallery", blurb: "Life at the Centre" },
    ],
  },
  {
    label: "Our Programs",
    href: "/programs",
    children: [
      { label: "See All Programs", href: "/programs", blurb: "PGD · M.Sc · PhD" },
      { label: "PGD Program", href: "/programs/pgd", blurb: "Post Graduate Diploma" },
      { label: "Master of Science – M.Sc", href: "/programs/msc", blurb: "1–2 years, thesis" },
      { label: "Doctorate Degree – PhD", href: "/programs/phd", blurb: "6–12 semesters" },
      { label: "Short Courses", href: "/programs/short-courses", blurb: "8 certificate courses" },
      { label: "Tuition", href: "/tuition", blurb: "Fees & payment plans" },
    ],
  },
  { label: "Journals", href: "/journals" },
  { label: "News", href: "/news" },
  { label: "Contact Us", href: "/contact" },
];

export const QUICK_LINKS: { label: string; href: string }[] = [
  { label: "About Us", href: "/about" },
  { label: "Apply Now", href: "/admission" },
  { label: "Tuition", href: "/tuition" },
  { label: "Programs", href: "/programs" },
  { label: "Staff Directory", href: "/about/staff" },
  { label: "Journals", href: "/journals" },
  { label: "News", href: "/news" },
  { label: "Our Gallery", href: "/about/gallery" },
];
