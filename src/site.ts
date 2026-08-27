export const COMPANY = {
  name: "Megsy",
  legalName: "Megsy for Digital Platforms Development and E-commerce LLC",
  founded: "2026",
  email: "support@megsyai.com",
  privacyEmail: "privacy@megsyai.com",
  phone: "+20 109 812 5727",
  phoneHref: "tel:+201098125727",
  register: "284691",
  taxId: "774034785",
  product: "https://megsyai.com",
  addressLines: [
    "58 Al Hijaz St., Amoun Tower",
    "Opposite Heliopolis Hospital, Unit 84, Floor 8",
    "Sheraton Al Matar, Nozha District",
    "Cairo Governorate, Egypt",
  ],
  secondBase: "Damanhour, Beheira Governorate, Egypt",
  teamSize: "2–9 people",
  hours: "Sunday – Thursday, 10:00–18:00 (UTC+3)",
};

export const COMPANY_NAV = [
  { label: "About", to: "/about" },
  { label: "Leadership", to: "/leadership" },
  { label: "Products", to: "/products" },
  { label: "Megay 3.9", to: "/megay" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
];

export const FOOTER_LINKS: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Leadership", to: "/leadership" },
      { label: "Careers", to: "/careers" },
      { label: "Press", to: "/press" },
      { label: "Partners", to: "/partners" },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "Products", to: "/products" },
      { label: "Megay 3.9", to: "/megay" },
      { label: "Brand kit", to: "/brand" },
      { label: "Blog", to: "/blog" },
    ],
  },
  {
    title: "Trust",
    links: [
      { label: "Security", to: "/security" },
      { label: "Trust center", to: "/trust-center" },
      { label: "Imprint", to: "/imprint" },
      { label: "Contact", to: "/contact" },
    ],
  },
];
