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
    bio: `
      <div class="pi-bio-section"><span class="pi-bio-label">Education</span>
        <ul>
          <li>Ph.D., Computer Science &amp; Engineering, Ewha Womans University, 2023</li>
          <li>B.S., Computer Science &amp; Engineering, Ewha Womans University, 2017</li>
        </ul>
      </div>
      <div class="pi-bio-section"><span class="pi-bio-label">Professional Experience</span>
        <ul>
          <li>Assistant Professor, Dept. of Artificial Intelligence, Ewha Womans University <span class="pi-bio-sub">(2026.03 – present)</span></li>
          <li>Postdoctoral Associate, <a href="https://robotixx.cs.gmu.edu/" class="pi-bio-link" target="_blank">RobotiXX lab</a>, George Mason University <span class="pi-bio-sub">(2024.10 - 2026.02)</span></li>
          <li>Postdoctoral Associate, <a href="https://gamma.umd.edu/" class="pi-bio-link" target="_blank">GAMMA lab</a>, University of Maryland <span class="pi-bio-sub">(2023.08 - 2024.09)</span></li>
        </ul>
      </div>`,
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
