// ── Members Data ──
// Edit this file to update the Members page.
// To add a photo, set photo to a path like "assets/members/pi.jpg"
// To show student groups, add objects to the `groups` array.

const MEMBERS_DATA = {

  pi: {
    name: "Daeun Song, Ph.D.",
    role: "Assistant Professor",
    photo: "assets/members/daeun.jpg", //null, // e.g. "assets/members/pi.jpg"
    office: "Jinseonmi 213",
    tel: "+82-2-3277-5044",
    email: "songd@ewha.ac.kr",
    education: [
      { degree: "Ph.D.", field: "Computer Science & Engineering", school: "Ewha Womans University", year: 2023 },
      { degree: "B.S.",  field: "Computer Science & Engineering", school: "Ewha Womans University", year: 2017 },
    ],
    experience: [
      { role: "Assistant Professor", org: "Dept. of Artificial Intelligence, Ewha Womans University", period: "2026.03 – present" },
      { role: "Postdoctoral Associate", org: "RobotiXX lab, George Mason University", org_url: "https://robotixx.cs.gmu.edu/", period: "2024.10 – 2026.02" },
      { role: "Postdoctoral Associate", org: "GAMMA lab, University of Maryland",     org_url: "https://gamma.umd.edu/",            period: "2023.08 – 2024.09" },
    ],
    links: [
      { label: "Curriculum Vitae", url: "#" },
      { label: "Google Scholar",   url: "https://scholar.google.com/citations?user=hq8STUoAAAAJ&hl=ko&oi=sra" },
      { label: "LinkedIn",   url: "https://www.linkedin.com/in/daeunsong/" },
      { label: "Github",   url: "https://github.com/daeunsong" },
      // { label: "DBLP",             url: "#" },
      // { label: "ResearchGate",     url: "#" },
    ]
  },

  // ── Student / Staff Groups ──
  // Each group object:
  // student: {
  //   title: "Ph.D. Students",
  //   type: "student",   // "student" | "staff" | "alumni"
  //   members: [
  //     {
  //       name: "Full Name",
  //       period: "2024 – present",
  //       focus: "Research interests",
  //       email: "name@ewha.ac.kr",  // optional
  //       website: "#",              // optional
  //       photo: null,               // optional, e.g. "assets/members/name.jpg"
  //     }
  //   ]
  // },

  // groups: [
  //   // Example (uncomment to show):
  //   {
  //     title: "Graduate Students",
  //     type: "student",
  //     members: [
  //       { name: "Student Name", period: "2025 – present", focus: "Research focus", email: "", website: "#" }
  //     ]
  //   },
  //   {
  //     title: "Research Staff",
  //     type: "staff",
  //     members: []
  //   },
  //   {
  //     title: "Alumni",
  //     type: "alumni",
  //     members: [
  //       { name: "Graduate Name, Ph.D. (2025)", now: "→ Postdoc, Some University" }
  //     ]
  //   },
  // ]

};
