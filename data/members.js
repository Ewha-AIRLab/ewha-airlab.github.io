// ── Members Data ──
// Edit this file to update the Members page.
// To add a photo, set photo to a path like "assets/members/pi.jpg"
// To show student groups, add objects to the `groups` array.

const MEMBERS_DATA = {

  pi: {
    name: "Daeun Song, Ph.D.",
    role: "Assistant Professor",
    photo: "assets/members/daeun.jpg", //null, // e.g. "assets/members/pi.jpg"
    office: "Jinseonmi-gwan 213",
    tel: "+82-2-3277-5044",
    email: "songd@ewha.ac.kr",
    bio: "Prof. Song is an Assistant Professor at Ewha Womans University, Korea. Previously, she was a Postdoctoral Associate in the Robotixx group at George Mason University, working with Dr. Xuesu Xiao, and at the University of Maryland with Dr. Dinesh Manocha. She received her Ph.D. in 2023 from Ewha Womans University, advised by Dr. Young J. Kim in the Computer Graphics Lab. Her research interests are in Human-Robot Interaction and automated systems that work in the real world.",
    links: [
      { label: "Curriculum Vitae", url: "#" },
      { label: "Google Scholar",   url: "#" },
      { label: "LinkedIn",   url: "#" },
      { label: "Github",   url: "#" },
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
