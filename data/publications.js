// ── Publications Data ──
// Edit this file to add or update publications.
// Add new entries at the TOP of the array (newest first).
//
// type:      "conference" | "journal"
// thumbnail: path relative to site root, e.g. "assets/publications/teaser/foo.gif"
//            Set to null if no image is available.
// featured:  true  → shown in the Research Overview carousel on the home page
//            false → publications page only
// keywords:  short tags shown in the carousel (2–4 recommended)

const PUBLICATIONS = [
  {
    "year": 2026,
    "title": "MAction-SocialNav: Multi-Action Socially Compliant Navigation via Reasoning-enhanced Prompt Tuning",
    "authors": ["Zishuo Wang", "Xinyu Zhang", "Zhuonan Liu", "Tomohito Kawabata", "**Daeun Song**", "Xuesu Xiao", "Ling Xiao<sup>†</sup>"],
    "venue_short": "",
    "venue_full": "Under Review",
    "type": "conference",
    "featured": false,
    "thumbnail": "assets/publications/teaser/maction-socialnav_teaser.png",
    "links": [
      { "label": "Paper", "url": "https://arxiv.org/abs/2512.21722" }
    ]
  },
  {
    "year": 2026,
    "title": "Narrate2Nav: Real-Time Visual Navigation with Implicit Language Reasoning in Human-Centric Environments",
    "authors": ["Amirreza Payandeh<sup>†</sup>", "Anuj Pokhrel", "**Daeun Song**", "Marcos Zampieri", "Xuesu Xiao"],
    "venue_short": "ICRA",
    "venue_full": "IEEE International Conference on Robotics and Automation (ICRA), 2026",
    "type": "conference",
    "featured": true,
    "thumbnail": "assets/publications/teaser/narrate2nav.png",
    "links": [
      { "label": "Paper", "url": "https://arxiv.org/abs/2506.14233" }
    ]
  },
  {
    "year": 2026,
    "title": "Legs Over Arms: On the Predictive Value of Lower-Body Pose for Human Trajectory Prediction from Egocentric Robot Perception",
    "authors": ["Nhat Le<sup>†</sup>", "**Daeun Song**", "Xuesu Xiao"],
    "venue_short": "ICRA",
    "venue_full": "IEEE International Conference on Robotics and Automation (ICRA), 2026",
    "type": "conference",
    "featured": true,
    "thumbnail": "assets/publications/teaser/loa_teaser.gif",
    "links": [
      { "label": "Paper", "url": "https://arxiv.org/abs/2602.09076" }
    ]
  },
  {
    "year": 2026,
    "title": "E-SocialNav: Efficient Socially Compliant Navigation with Language Models",
    "authors": ["Ling Xiao<sup>†</sup>", "**Daeun Song**", "Xuesu Xiao", "T. Yamasaki"],
    "venue_short": "ICASSP",
    "venue_full": "IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), 2026",
    "type": "conference",
    "featured": false,
    "thumbnail": "assets/publications/teaser/e_socialnav_teaser.png",
    "links": [
      { "label": "Paper", "url": "https://people.cs.gmu.edu/~xiao/papers/e_socialnav.pdf" }
    ]
  },
  {
    "year": 2025,
    "title": "Autonomous Ground Navigation in Highly Constrained Spaces: Lessons Learned from The Forth BARN Challenge at ICRA 2025",
    "authors": ["Xuesu Xiao<sup>†</sup>", "Zifan Xu", "Saad Abdul Ghani", "Aniket Datar", "**Daeun Song**", "Peter Stone", "Amna Mazen", "Kamyab Yazdipaz", "Innocent Mateyaunga", "Mariam Faied", "Mohan Krishnan", "Yuanjie Lu", "Tong Xu", "Nick Mohammad", "Woosung Kim", "Jon Reasoner", "Rohan Chandra", "and Nicola Bezzo"],
    "venue_short": "RAM",
    "venue_full": "IEEE Robotics & Automation Magazine (RAM), accepted",
    "type": "journal",
    "featured": true,
    "thumbnail": "assets/publications/teaser/barn_teaser.jpg",
    "links": [
      { "label": "Website",   "url": "https://people.cs.gmu.edu/~xiao/Research/BARN_Challenge/BARN_Challenge25.html" },
      { "label": "Paper",   "url": "https://people.cs.gmu.edu/~xiao/papers/barn25_report.pdf" },
      { "label": "Dataset",   "url": "https://people.cs.gmu.edu/~xiao/Research/BARN/BARN.html" }
    ]
  },
  {
    "year": 2025,
    "title": "Verti-Arena: A Controllable and Standardized Indoor Testbed for Multi-Terrain Off-Road Autonomy",
    "authors": ["Haiyue Chen<sup>†</sup>", "Aniket Datar", "Tong Xu", "Francesco Cancelliere", "Harsh Rangwala", "Madhan Balaji Rao", "**Daeun Song**", "David Eichinger", "Xuesu Xiao"],
    "venue_short": "SSRR",
    "venue_full": "IEEE International Conference on Safety, Security, and Rescue Robotics (SSRR), 2025",
    "type": "conference",
    "featured": true,
    "thumbnail": "assets/publications/teaser/verti_arena_teaser.png",
    "links": [
      { "label": "Best Student Presentation Award", "award": true, "url": "assets/award/verti_arena_award.jpg"},
      { "label": "Paper",   "url": "https://arxiv.org/abs/2508.08226" },
      { "label": "Video",   "url": "https://youtu.be/3La89A29Uuc?si=1EA0pS2GUPQeiiGf" }
    ]
  },
  {
    "year": 2025,
    "title": "VL-TGS: Trajectory Generation and Selection using Vision Language Models in Mapless Outdoor Environments",
    "authors": ["**Daeun Song***<sup>†</sup>", "Jing Liang*", "Xuesu Xiao", "Dinesh Manocha"],
    "venue_short": "RA-L",
    "venue_full": "IEEE Robotics and Automation Letters (RA-L), 2025",
    "type": "journal",
    "featured": true,
    "thumbnail": "assets/publications/teaser/tgs.gif",
    "links": [
      { "label": "Webpage", "url": "https://gamma.umd.edu/researchdirections/crowdmultiagent/tgs" },
      { "label": "Paper",   "url": "https://arxiv.org/abs/2408.02454" },
      { "label": "Video",   "url": "https://youtu.be/PzgFR5mwTCw?si=sbAzwy34QCCKWskQ" }
    ]
  },
  {
    "year": 2025,
    "title": "SocialLLaVA: Enhancing Robot Navigation through Human-Language Reasoning in Social Spaces",
    "authors": ["Amirreza Payandeh<sup>†</sup>", "**Daeun Song**", "Mohammad Nazeri", "Jing Liang", "Praneel Mukherjee", "Amir Hossain Raj", "Yangzhe Kong", "Dinesh Manocha", "Xuesu Xiao"],
    "venue_short": "IROS",
    "venue_full": "IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), 2025",
    "type": "conference",
    "featured": true,
    "thumbnail": "assets/publications/teaser/social-llava.gif",
    "links": [
      { "label": "Webpage", "url": "https://people.cs.gmu.edu/~xiao/Research/SNEI/" },
      { "label": "Paper", "url": "https://arxiv.org/abs/2501.09024" },
      { "label": "Video", "url": "https://youtu.be/dcHOuPguz_s?si=oOWqgxcnM3F_-f1T" },
      { "label": "Dataset", "url": "https://huggingface.co/datasets/amir-pyh/SNEI" }
    ]
  },
  {
    "year": 2025,
    "title": "AutoSpatial:Visual-Language Reasoning for Social Robot Navigation through Efficient Spatial Reasoning Learning",
    "authors": ["Yangzhe Kong<sup>†</sup>", "Jing Liang", "**Daeun Song**", "Xuesu Xiao", "Dinesh Manocha"],
    "venue_short": "IROS",
    "venue_full": "IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), 2025",
    "type": "conference",
    "featured": false,
    "thumbnail": "assets/publications/teaser/auto_spatial.png",
    "links": [
      { "label": "Paper", "url": "https://arxiv.org/abs/2503.07557" }
    ]
  },
  {
    "year": 2025,
    "title": "MOSU: Autonomous Long-range Robot Navigation with Multi-modal Scene Understanding in Outdoor Campus Environments",
    "authors": ["Jing Liang<sup>†</sup>", "K. Weerakoon", "**Daeun Song**", "S. Kirubaharan", "Xuesu Xiao", "Dinesh Manocha"],
    "venue_short": "ISER",
    "venue_full": "International Symposium on Experimental Robotics (ISER), 2025",
    "type": "conference",
    "featured": false,
    "thumbnail": "assets/publications/teaser/mosu.gif",
    "links": [
      { "label": "Paper", "url": "https://arxiv.org/abs/2507.04686" }
    ]
  },
  {
    "year": 2025,
    "title": "GND: Global Navigation Dataset with Multi-Modal Perception and Multi-Category Traversability in Outdoor Campus Environments",
    "authors": ["Jing Liang*<sup>†</sup>", "Dibiyendu Das*", "**Daeun Song***", "Md Nahid Hasan Shuvo", "Mohammad Durrani", "Karthik Taranath", "Ivan Penskiy", "Dinesh Manocha", "Xuesu Xiao"],
    "venue_short": "ICRA",
    "venue_full": "IEEE International Conference on Robotics and Automation (ICRA), 2025",
    "type": "conference",
    "featured": false,
    "thumbnail": "assets/publications/teaser/gnd_teaser.png",
    "links": [
      { "label": "Webpage", "url": "https://cs.gmu.edu/~xiao/Research/GND/" },
      { "label": "Paper", "url": "https://arxiv.org/abs/2409.14262" },
      { "label": "Video", "url": "https://youtu.be/teNuzlAEDY8?si=nU2bUC5d3Pp2wlWD" },
      { "label": "Code", "url": "https://github.com/jingGM/GND" },
      { "label": "Dataset", "url": "https://dataverse.orc.gmu.edu/dataset.xhtml?persistentId=doi:10.13021/orc2020/JUIW5F" }
    ]
  },
  {
    "year": 2025,
    "title": "VLM-Social-Nav: Socially Aware Robot Navigation through Scoring Using Vision-Language Models",
    "authors": ["**Daeun Song**<sup>†</sup>", "Jing Liang", "A. Payandeh", "A. H. Raj", "Xuesu Xiao", "Dinesh Manocha"],
    "venue_short": "RA-L",
    "venue_full": "IEEE Robotics and Automation Letters (RA-L), 2025",
    "type": "journal",
    "featured": true,
    "thumbnail": "assets/publications/teaser/VLM-SocialNav_teaser.gif",
    "links": [
      { "label": "Webpage", "url": "https://gamma.umd.edu/researchdirections/crowdmultiagent/vlm-social-nav" },
      { "label": "Paper",   "url": "https://arxiv.org/abs/2404.00210" },
      { "label": "Video",   "url": "https://youtu.be/dQaM-UVUsFw" }
    ]
  },
  {
    "year": 2024,
    "title": "DTG: Diverse Trajectory Generation for Social Navigation",
    "authors": ["Jing Liang<sup>†</sup>", "Amirreza Payandeh", "**Daeun Song**", "Xuesu Xiao", "Dinesh Manocha"],
    "venue_short": "IROS",
    "venue_full": "IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), 2024",
    "type": "conference",
    "featured": false,
    "thumbnail": "assets/publications/teaser/dtg_teaser.gif",
    "links": [
      { "label": "Paper", "url": "https://arxiv.org/abs/2403.09900" },
      { "label": "Video", "url": "https://youtu.be/1-YZwSma5Z4?si=WzyriPOY30jM6KZv" },
      { "label": "Code", "url": "https://github.com/jingGM/DTG" }
    ]
  },
  {
    "year": 2024,
    "title": "AGL-NET: Aerial-Ground Localization Network",
    "authors": ["Tianrui Guan<sup>†</sup>", "Ruiqi Xian", "Xijun Wang", "Xiyang Wu", "Mohamed Elnoor", "**Daeun Song**", "Dinesh Manocha"],
    "venue_short": "IROS",
    "venue_full": "IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), 2024",
    "type": "conference",
    "featured": false,
    "thumbnail": "assets/publications/teaser/agl-net_teaser.png",
    "links": [
      { "label": "Paper", "url": "https://arxiv.org/abs/2404.03187" },
      { "label": "Code", "url": "https://github.com/rayguan97/AGL-Net" },
    ]
  },
  {
    "year": 2024,
    "title": "TSP-Bot: Robotic Drawing via Traveling Salesman Problem",
    "authors": ["**Daeun Song**", "Eunjung Lim", "Jiyoon Park", "Minjung Jung", "Young J. Kim<sup>†</sup>"],
    "venue_short": "UR",
    "venue_full": "International Conference on Ubiquitous Robots (UR), 2024",
    "type": "conference",
    "featured": true,
    "thumbnail": "assets/publications/teaser/tspart_teaser.gif",
    "links": [
      { "label": "Webpage", "url": "http://graphics.ewha.ac.kr/TSPArt" },
      { "label": "Paper", "url": "https://arxiv.org/abs/2210.07592" },
      { "label": "Video", "url": "https://youtu.be/e4ScihBd2uo?si=wOINw_gX3JqTTIwt" },
    ]
  },
  {
    "year": 2023,
    "title": "SSK: Robotic Pen-art System for Large, Non-planar Canvas",
    "authors": ["**Daeun Song**", "Jiyoon Kim", "Young J. Kim<sup>†</sup>"],
    "venue_short": "T-RO",
    "venue_full": "IEEE Transactions on Robotics (T-RO), 2023",
    "type": "journal",
    "featured": true,
    "thumbnail": "assets/publications/teaser/tro23_teaser.gif",
    "links": [
      { "label": "Webpage", "url": "http://graphics.ewha.ac.kr/SSK" },
      { "label": "Paper",   "url": "assets/publications/paper/TRO23_SSK.pdf"},
      { "label": "Video",   "url": "https://youtu.be/TEfqbPNdoBY?si=fwIctXwBjo-77SFH" },
      { "label": "Code",    "url": "https://github.com/daeunSong/SSK" }
    ]
  },
  {
    "year": 2023,
    "title": "Stroke-based Rendering and Planning for Robotic Performance of Artistic Drawing",
    "authors": ["**Daeun Song**", "Young J. Kim<sup>†</sup>"],
    "venue_short": "IROS",
    "venue_full": "IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), 2023",
    "type": "conference",
    "featured": true,
    "thumbnail": "assets/publications/teaser/iros23_teaser.gif",
    "links": [
      { "label": "Paper", "url": "https://arxiv.org/abs/2210.07590" },
      { "label": "Video", "url": "https://youtu.be/_ENNdIS6qcw?si=U4GcvlF3EoguXeLW" }
    ]
  },
  {
    "year": 2021,
    "title": "Solving Footstep Planning as a Feasibility Problem using L1-norm Minimization",
    "authors": ["**Daeun Song**", "Pierre Fernbach", "Thomas Flayols", "Andrea Del Prete", "Nicolas Mansard", "Steve Tonneau", "Young J. Kim<sup>†</sup>"],
    "venue_short": "RA-L",
    "venue_full": "IEEE Robotics and Automation Letters (RA-L), 2021",
    "type": "journal",
    "featured": false,
    "thumbnail": "assets/publications/teaser/ral21_teaser.gif",
    "links": [
      { "label": "Webpage", "url": "http://graphics.ewha.ac.kr/SL1M" },
      { "label": "Paper",   "url": "https://arxiv.org/abs/2011.09772" },
      { "label": "Video",   "url": "https://youtu.be/tde1P7hLwsk" },
      { "label": "Code",    "url": "https://github.com/loco-3d/sl1m" }
    ]
  },
  {
    "year": 2021,
    "title": "Learning to steer a locomotion contact planner",
    "authors": ["Jason Chemin<sup>†</sup>" , "Pierre Fernbach" , "**Daeun Song**" , "Guilhem Saurel" , "Nicolas Mansard" , "Steve Tonneau"],
    "venue_short": "ICRA",
    "venue_full": "IEEE International Conference on Robotics and Automation (ICRA), 2021",
    "type": "conference",
    "featured": false,
    "thumbnail": "assets/publications/teaser/icra21_teaser.jpg",
    "links": [
      { "label": "Paper", "url": "https://hal.science/hal-02998757/" },
      { "label": "Video", "url": "https://youtu.be/YdqkKA3hWMU?si=z-RkHz92P9FwyFTN" }
    ]
  },
  {
    "year": 2020,
    "title": "SL1M: Sparse L1-norm Minimization for contact planning on uneven terrain",
    "authors": ["Steve Tonneau<sup>†</sup>", "**Daeun Song**", "Pierre Fernbach", "Nicolas Mansard", "Michel Taix", "Andrea Del Prete"],
    "venue_short": "ICRA",
    "venue_full": "IEEE International Conference on Robotics and Automation (ICRA), 2020",
    "type": "conference",
    "featured": false,
    "keywords": ["Footstep Planning", "Uneven Terrain"],
    "thumbnail": "assets/publications/teaser/sl1m_teaser.png",
    "links": [
      { "label": "Webpage", "url": "http://graphics.ewha.ac.kr/SL1M" },
      { "label": "Paper", "url": "https://arxiv.org/abs/1909.09044" },
      { "label": "Video", "url": "https://youtu.be/gOQHI-YlOi0?si=u5LE_S45mlBfvMPj" },
      { "label": "Code", "url": "https://github.com/loco-3d/sl1m" },
    ]
  },
  {
    "year": 2019,
    "title": "Distortion-free Robotic Surface-drawing using Conformal Mapping",
    "authors": ["**Daeun Song**", "Young J. Kim<sup>†</sup>"],
    "venue_short": "ICRA",
    "venue_full": "IEEE International Conference on Robotics and Automation (ICRA), 2019",
    "type": "conference",
    "featured": false,
    "thumbnail": "assets/publications/teaser/icra19_teaser.gif",
    "links": [
      { "label": "Webpage", "url": "http://graphics.ewha.ac.kr/SSK" },
      { "label": "Paper", "url": "assets/publications/paper/icra19.pdf" },
      { "label": "Video", "url": "https://youtu.be/NWFRV9t0jdI?si=MKHI4h5YrnAOvVyF" },
    ]
  },
  {
    "year": 2018,
    "title": "Artistic Pen Drawing on an Arbitrary Surface using an Impedance-controlled Robot",
    "authors": ["**Daeun Song**", "Taekhee Lee", "Young J. Kim<sup>†</sup>"],
    "venue_short": "ICRA",
    "venue_full": "IEEE International Conference on Robotics and Automation (ICRA), 2018",
    "type": "conference",
    "featured": true,
    "thumbnail": "assets/publications/teaser/icra18_teaser.gif",
    "links": [
      { "label": "Webpage", "url": "http://graphics.ewha.ac.kr/SSK" },
      { "label": "Paper", "url": "assets/publications/paper/icra18.pdf" },
      { "label": "Video", "url": "https://youtu.be/myYFfGioqYk?si=YGAMV5YNE-mwNOj9" },
    ]
  },
  {
    "year": 2018,
    "title": "Full-body Animation of Human Locomotion in Reduced Gravity using Physics-based Control",
    "authors": ["Yun-hyeong Kim", "Taesoo Kwon", "**Daeun Song**", "Young J. Kim<sup>†</sup>"],
    "venue_short": "CG&A",
    "venue_full": "IEEE Computer Graphics and Applications (CG&A), 2017",
    "type": "conference",
    "featured": true,
    "thumbnail": "assets/publications/teaser/cga17_teaser.gif",
    "links": [
      { "label": "Webpage", "url": "https://graphics.ewha.ac.kr/alteredgravity/" },
      { "label": "Paper", "url": "assets/publications/paper/cga17.pdf" },
      { "label": "Video", "url": "https://youtu.be/y14cNQvWVyQ?si=3StgmyjIru2I4knu" },
    ]
  }
];
