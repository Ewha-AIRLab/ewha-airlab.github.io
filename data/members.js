// ── Members Data ──
// Edit this file to update the Members page.
// To add a photo, set photo to a path like "assets/members/pi.jpg"
// To show student groups, add objects to the `groups` array.

const MEMBERS_DATA = {

  pi: {
    name: "Daeun Song, Ph.D.",
    role: "Assistant Professor",
    dept: "Dept. of Artificial Intelligence, Ewha Womans University",
    photo: "assets/members/daeun.jpg", //null, // e.g. "assets/members/pi.jpg"
    office: "Jinseonmi 213",
    tel: "+82-2-3277-5044",
    email: "songd@ewha.ac.kr",
    // education: [
    //   { degree: "Ph.D.", field: "Computer Science & Engineering", school: "Ewha Womans University", year: 2023 },
    //   { degree: "B.S.",  field: "Computer Science & Engineering", school: "Ewha Womans University", year: 2017 },
    // ],
    // experience: [
    //   { role: "Assistant Professor",    uni: "Ewha Womans University",   period: "2026.03 – present" },
    //   { role: "Postdoctoral Associate", lab: "RobotiXX lab", org_url: "https://robotixx.cs.gmu.edu/", uni: "George Mason University", period: "2024.09 – 2026.02" },
    //   { role: "Postdoctoral Associate", lab: "GAMMA lab",    org_url: "https://gamma.umd.edu/",        uni: "University of Maryland",  period: "2023.08 – 2024.08" },
    //   { role: "Postdoctoral Associate", lab: "Computer Graphics lab", org_url: "https://graphics.ewha.ac.kr", uni: "Ewha Womans University", period: "2023.03 – 2024.06" },
    // ],
    // bio: "I am an Assistant Professor at Ewha Womans University, Korea. I received my Ph.D. from Ewha Womans University under the supervision of Prof. Young J. Kim, and later conducted postdoctoral research with Prof. Xuesu Xiao and Prof. Dinesh Manocha. <BR><BR>My work explores real-world robotic intelligence, and I am excited about a future in which robots and automated systems seamlessly integrate into our lives in useful, adaptive, and human-centered ways!",

    links: [
      { label: "Curriculum Vitae", url: "#" },
      { label: "Google Scholar",   url: "https://scholar.google.com/citations?user=hq8STUoAAAAJ&hl=ko&oi=sra" },
      { label: "LinkedIn",   url: "https://www.linkedin.com/in/daeunsong/" },
      { label: "Github",   url: "https://github.com/daeunsong" },
      // { label: "DBLP",             url: "#" },
      // { label: "ResearchGate",     url: "#" },
    ]
  },

  // ── Student / Staff / Alumni Groups ──
  // type: "student" | "staff" | "alumni"
  // Alumni fields: name, now (current position)
  // Others fields: name, focus, email (optional), website (optional), photo (optional)
  groups: [
    {
      title: "Undergraduate",
      type: "intern",
      members: [
        {
          name:    "Ahhyeon Jeong",
          role:    "Undergraduate Student",
          focus:   "",
          email:   "hp432300@ewha.ac.kr",
          website: "",
          photo:   "assets/members/ahyeon.jpg"
        },
        {
          name:    "Gaeun Bang",
          role:    "Undergraduate Student",
          focus:   "",
          email:   "glad@ewha.ac.kr",
          website: "",
          github: "https://github.com/gladgaeun",
          photo:   "assets/members/gaeun.jpg"
        },
        
      ]
    },
    // {
    //   title: "Alumni",
    //   type: "alumni",
    //   members: [
    //     { name: "Graduate Name, Ph.D. (2025)", now: "→ Postdoc, Some University" }
    //   ]
    // },
  ]

};
