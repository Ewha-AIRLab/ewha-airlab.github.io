// ── News Data ──
// Edit this file to update the News page.
// Add new entries at the TOP of the array (newest first).
//
// cat values: "news" | "publication" | "award" | "grant" | "position" | "talk" | "media"

const NEWS_DATA = [

  {
    date:  "2026.04",
    cat:   "talk",
    title: "Daeun gave a talk at <a href=\"https://www.asiagraphics.org/asiagraphics-workshop-on-intelligent-graphics-at-korea\" target=\"_blank\">Asiagraphics Workshop on Intelligent Graphics</a> (Topic: Social Nav)"
  },

  {
    date:  "2026.03",
    cat:   "news",
    title: "AIR Lab website now online!"
  },

  {
    date:  "2026.03",
    cat:   "news",
    title: "Daeun has joined the Department of AI at Ewha Womans University"
  },

  {
    date:  "2026.02",
    cat:   "talk",
    title: "Daeun gave an invited talk at Tufts University CS Colloquium (Topic: Social Nav)"
  },

  {
    date:  "2026.01",
    cat:   "publication",
    title: "<a href=\"https://arxiv.org/abs/2506.14233\" target=\"_blank\">Narrate2Nav</a> and <a href=\"https://people.cs.gmu.edu/~xiao/papers/legs_over_arms.pdf\" target=\"_blank\">Legs Over Arms</a> accepted to <b>IEEE ICRA 2026</b>"
  },

  {
    date:  "2026.01",
    cat:   "publication",
    title: "<a href=\"https://people.cs.gmu.edu/~xiao/papers/e_socialnav.pdf\" target=\"_blank\">E-SocialNav</a> accepted to <b>IEEE ICASSP 2026</b>"
  },

  {
    date:  "2025.12",
    cat:   "talk",
    title: "Daeun gave an invited talk at <a href=\"https://rcilab.khu.ac.kr/\" target=\"_blank\">RCI Lab</a>, KHU (Topic: Social Nav)"
  },

  // {
  //   date:  "2025.11",
  //   cat:   "award",
  //   title: "Haiyue Chen wins Best Student Presenter Award for <a href=\"https://arxiv.org/abs/2508.08226\" target=\"_blank\">Verti-Arena</a>"
  // },

  {
    date:  "2025.10",
    cat:   "publication",
    title: "<a href=\"https://cs.gmu.edu/~xiao/papers/barn25_report.pdf\" target=\"_blank\">BARN Challenge report</a> accepted to <b>IEEE Robotics &amp; Automation Magazine</b>"
  },

  {
    date:  "2025.10",
    cat:   "award",
    title:      "Our collaborative work with DGIST, \"Towards Human-Like Instruction Navigation in Real-World\" has won the Best Poster Award at <a href=\"https://heai-iros25-workshop.github.io/\" target=\"_blank\">HEAI Workshop</a>, <b>IROS 2025</b>",
    awardLabel: "Best Poster Award",
    awardUrl:   "assets/award/SocialAct_BestPosterAward.pdf"
  },

  {
    date:  "2025.10",
    cat:   "talk",
    title: "Daeun gave two invited talks at <a href=\"https://www.linkedin.com/groups/13352540/\" target=\"_blank\">KARA</a> and University of Delaware (Topic: Social Nav)"
  },

  {
    date:  "2025.09",
    cat:   "publication",
    title: "<a href=\"https://arxiv.org/abs/2508.08226\" target=\"_blank\">Verti-Arena</a> accepted to <b>IEEE SSRR 2025</b>"
  },

  {
    date:  "2025.08",
    cat:   "talk",
    title: "Daeun gave a talk at <a href=\"https://wosra.github.io/j-wosmars/\" target=\"_blank\">Workshop on Semantic Maps and Autonomous Robotics Standardization</a>, <b>IEEE RO-MAN 2025</b>"
  },

  {
    date:  "2025.07",
    cat:   "talk",
    title: "Daeun gave a talk and demo for K-12 students at <a href=\"https://edu-futuro.org/\" target=\"_blank\">Edu-Futuro 2025</a> robotics session"
  },

  {
    date:  "2025.06",
    cat:   "publication",
    title: "<a href=\"https://cs.gmu.edu/~xiao/Research/SNEI/\" target=\"_blank\">SocialLLaVA</a> and <a href=\"https://arxiv.org/abs/2404.03187\" target=\"_blank\">AutoSpatial</a> accepted to <b>IEEE IROS 2025</b>"
  },

  {
    date:  "2025.05",
    cat:   "publication",
    title: "<a href=\"https://arxiv.org/abs/2507.04686\" target=\"_blank\">MOSU</a> accepted to <b>ISER 2025</b>"
  },

  {
    date:  "2025.03",
    cat:   "publication",
    title: "<a href=\"https://gamma.umd.edu/researchdirections/crowdmultiagent/tgs\" target=\"_blank\">VL-TGS</a> published in <b>IEEE RA-L</b>, to be presented at <b>IEEE IROS 2025</b>"
  },

  {
    date:  "2025.01",
    cat:   "publication",
    title: "<a href=\"https://cs.gmu.edu/~xiao/Research/GND/\" target=\"_blank\">GND</a> accepted to <b>IEEE ICRA 2025</b>"
  },

  {
    date:  "2025.01",
    cat:   "publication",
    title: "<a href=\"https://gamma.umd.edu/researchdirections/crowdmultiagent/vlm-social-nav\" target=\"_blank\">VLM-Social-Nav</a> published in <b>IEEE RA-L</b>, to be presented at <b>IEEE ICRA 2025</b>"
  },

  {
    date:  "2024.09",
    cat:   "news",
    title: "Daeun has joined <a href=\"https://robotixx.cs.gmu.edu/\" target=\"_blank\">Robotixx</a> Lab at George Mason University as a postdoctoral associate"
  },

  {
    date:  "2024.06",
    cat:   "publication",
    title: "<a href=\"https://arxiv.org/abs/2403.09900\" target=\"_blank\">DTG</a> and <a href=\"https://arxiv.org/abs/2404.03187\" target=\"_blank\">AGL-NET</a> accepted to <b>IEEE IROS 2024</b>"
  },

  {
    date:  "2024.04",
    cat:   "publication",
    title: "<a href=\"http://graphics.ewha.ac.kr/TSPArt\" target=\"_blank\">TSP-Bot</a> accepted to <b>UR 2024</b>"
  },

  {
    date:  "2023.08",
    cat:   "news",
    title: "Daeun has joined <a href=\"https://gamma.umd.edu/\" target=\"_blank\">GAMMA</a> Lab at University of Maryland as a postdoctoral fellow"
  },

  {
    date:  "2023.08",
    cat:   "publication",
    title: "<a href=\"http://graphics.ewha.ac.kr/SSK\" target=\"_blank\">SSK</a> published in <b>IEEE T-RO</b>"
  },

  {
    date:  "2023.06",
    cat:   "publication",
    title: "<a href=\"https://arxiv.org/abs/2210.07590\" target=\"_blank\">Stroke-based Rendering and Planning</a> accepted to <b>IEEE IROS 2023</b>"
  },

  {
    date:  "2023.05",
    cat:   "news",
    title: "We co-organized a robotic drawing art exhibition <a href=\"http://graphics.ewha.ac.kr/CO-DRAW\" target=\"_blank\">CO-DRAW</a> with Dr. Joo-Haeng Lee"
  },

  {
    date:  "2023.04",
    cat:   "award",
    title: "Daeun was awarded the MRC Postdoctoral Fellowship (FY 2023-2024)",
    awardLabel: "MRC Postdoctoral Fellowship",
    awardUrl:   "https://robotics.umd.edu/education/postdoctoral-fellowship-program-0"
  },

  {
    date:  "2022.12",
    cat:   "news",
    title: "Daeun has successfully completed Ph.D. thesis defense"
  },

  {
    date:  "2021.07",
    cat:   "award",
    title: "<a href=\"http://graphics.ewha.ac.kr/TSPArt\" target=\"_blank\">TSPArt</a> has won the Best Undergrad Paper Award at <b>KCGS 2021</b>",
    awardLabel: "Best Undergrad Paper Award",
    awardUrl:   "assets/award/TSPArt_BestUndergradPaper_KCGS.jpg"
  },

  {
    date:  "2021.07",
    cat:   "publication",
    title: "Extended version of <a href=\"http://graphics.ewha.ac.kr/SL1M\" target=\"_blank\">SL1M</a> published in <b>IEEE RA-L</b>"
  },

  {
    date:  "2021.01",
    cat:   "publication",
    title: "<a href=\"https://hal.science/hal-02998757/\" target=\"_blank\">LEAS</a> accepted to <b>IEEE ICRA 2021</b>"
  },

  {
    date:  "2020.01",
    cat:   "publication",
    title: "<a href=\"http://graphics.ewha.ac.kr/SL1M\" target=\"_blank\">SL1M</a> accepted to <b>IEEE ICRA 2020</b>"
  },

  {
    date:  "2019.06",
    cat:   "news",
    title: "Daeun has Joined <a href=\"https://gepettoweb.laas.fr/\" target=\"_blank\">Gepetto</a> team at LAAS-CNRS in Toulouse, France for a 4-month summer internship"
  },

  {
    date:  "2019.04",
    cat:   "award",
    title: "Daeun was awarded the Solvay Scholarship (2019-2020)",
    awardLabel: "Solvay Scholarship",
    awardUrl:   "assets/award/Solvay.pdf"
  },

  {
    date:  "2019.01",
    cat:   "publication",
    title: "<a href=\"http://graphics.ewha.ac.kr/SSK\" target=\"_blank\"> 1 Paper</a> accepted to <b>IEEE ICRA 2019</b>"
  },

  {
    date:  "2018.02",
    cat:   "award",
    title: "<a href=\"http://graphics.ewha.ac.kr/SSK\" target=\"_blank\">SSK</a> has won the Best Paper Award at <b>KRoC 2018</b>",
    awardLabel: "Best Paper Award",
    awardUrl:   "assets/award/SSK_BestPaperAward_KRoC.pdf"
  },

  {
    date:  "2018.01",
    cat:   "publication",
    title: "<a href=\"http://graphics.ewha.ac.kr/SSK\" target=\"_blank\"> 1 Paper</a> accepted to <b>IEEE ICRA 2018</b>"
  },

];
