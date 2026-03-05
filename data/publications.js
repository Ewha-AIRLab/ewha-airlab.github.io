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
    "title": "Narrate2Nav: Narrate to Navigate in Unseen Environments",
    "authors": ["**D. Song**", "J. Liang", "X. Xiao"],
    "venue_short": "ICRA",
    "venue_full": "IEEE International Conference on Robotics and Automation (ICRA), 2026",
    "type": "conference",
    "featured": true,
    "keywords": ["LLM", "Navigation", "Zero-shot"],
    "thumbnail": "assets/publications/teaser/narrate2nav.png",
    "links": [
      { "label": "arXiv", "url": "https://arxiv.org/abs/2506.14233" }
    ]
  },
  {
    "year": 2026,
    "title": "Legs Over Arms: Prioritizing Leg Recovery in Legged Manipulation",
    "authors": ["N. Le", "**D. Song**", "X. Xiao"],
    "venue_short": "ICRA",
    "venue_full": "IEEE International Conference on Robotics and Automation (ICRA), 2026",
    "type": "conference",
    "featured": true,
    "keywords": ["Legged Robot", "Manipulation", "Recovery"],
    "thumbnail": "assets/publications/teaser/loa_teaser.gif",
    "links": [
      { "label": "Paper", "url": "https://people.cs.gmu.edu/~xiao/papers/legs_over_arms.pdf" }
    ]
  },
  {
    "year": 2026,
    "title": "E-SocialNav: Embodied Social Navigation",
    "authors": ["L. Xiao", "**D. Song**", "X. Xiao", "T. Yamasaki"],
    "venue_short": "ICASSP",
    "venue_full": "IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), 2026",
    "type": "conference",
    "featured": false,
    "keywords": ["Social Nav", "Embodied AI"],
    "thumbnail": "assets/publications/teaser/e_socialnav_teaser.png",
    "links": [
      { "label": "Paper", "url": "https://people.cs.gmu.edu/~xiao/papers/e_socialnav.pdf" }
    ]
  },
  {
    "year": 2025,
    "title": "VL-TGS: Trajectory Generation and Selection using Vision Language Models in Mapless Outdoor Environments",
    "authors": ["**D. Song***", "J. Liang*", "X. Xiao", "D. Manocha"],
    "venue_short": "RA-L",
    "venue_full": "IEEE Robotics and Automation Letters (RA-L), 2025",
    "type": "journal",
    "featured": true,
    "keywords": ["VLM", "Trajectory", "Outdoor Nav"],
    "thumbnail": "assets/publications/teaser/tgs.gif",
    "links": [
      { "label": "Webpage", "url": "https://gamma.umd.edu/researchdirections/crowdmultiagent/tgs" },
      { "label": "Paper",   "url": "https://arxiv.org/abs/2408.02454" },
      { "label": "Video",   "url": "https://youtu.be/ULe8x79CniE" }
    ]
  },
  {
    "year": 2025,
    "title": "VLM-Social-Nav: Socially Aware Robot Navigation through Scoring Using Vision-Language Models",
    "authors": ["**D. Song**", "J. Liang", "A. Payandeh", "A. H. Raj", "X. Xiao", "D. Manocha"],
    "venue_short": "RA-L",
    "venue_full": "IEEE Robotics and Automation Letters (RA-L), 2025",
    "type": "journal",
    "featured": true,
    "keywords": ["VLM", "Social Nav", "Scoring"],
    "thumbnail": "assets/publications/teaser/VLM-SocialNav_teaser.gif",
    "links": [
      { "label": "Webpage", "url": "https://gamma.umd.edu/researchdirections/crowdmultiagent/vlm-social-nav" },
      { "label": "Paper",   "url": "https://arxiv.org/abs/2404.00210" },
      { "label": "Video",   "url": "https://youtu.be/dQaM-UVUsFw" }
    ]
  },
  {
    "year": 2025,
    "title": "SocialLLaVA: Socially-Aware Robot Navigation with Multimodal Large Language Models",
    "authors": ["M. N. H. Shuvo", "**D. Song**", "A. H. Raj", "X. Xiao"],
    "venue_short": "IROS",
    "venue_full": "IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), 2025",
    "type": "conference",
    "featured": true,
    "keywords": ["LLaVA", "Social Nav", "Multimodal"],
    "thumbnail": "assets/publications/teaser/social-llava.gif",
    "links": [
      { "label": "Webpage", "url": "https://cs.gmu.edu/~xiao/Research/SNEI/" }
    ]
  },
  {
    "year": 2025,
    "title": "AutoSpatial: Spatial Reasoning for Embodied Agents",
    "authors": ["C. Zhong", "J. Liang", "**D. Song**", "X. Xiao", "D. Manocha"],
    "venue_short": "IROS",
    "venue_full": "IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), 2025",
    "type": "conference",
    "featured": false,
    "keywords": ["VLM", "Spatial Reasoning", "Embodied AI"],
    "thumbnail": "assets/publications/teaser/auto_spatial.png",
    "links": [
      { "label": "Paper", "url": "https://arxiv.org/abs/2404.03187" }
    ]
  },
  {
    "year": 2025,
    "title": "MOSU: Multi-Object Scene Understanding for Robot Navigation",
    "authors": ["J. Liang", "K. Weerakoon", "**D. Song**", "S. Kirubaharan", "X. Xiao", "D. Manocha"],
    "venue_short": "ISER",
    "venue_full": "International Symposium on Experimental Robotics (ISER), 2025",
    "type": "conference",
    "featured": false,
    "keywords": ["Scene Understanding", "Navigation"],
    "thumbnail": "assets/publications/teaser/mosu_teaser.gif",
    "links": [
      { "label": "Paper", "url": "https://arxiv.org/abs/2507.04686" }
    ]
  },
  {
    "year": 2025,
    "title": "GND: Ground-to-Navigation Diffusion for Robot Navigation",
    "authors": ["J. Liang", "D. Das", "**D. Song**", "M. N. H. Shuvo", "M. Durrani", "K. Taranath", "I. Penskiy", "D. Manocha", "X. Xiao"],
    "venue_short": "ICRA",
    "venue_full": "IEEE International Conference on Robotics and Automation (ICRA), 2025",
    "type": "conference",
    "featured": false,
    "keywords": ["Diffusion", "Navigation"],
    "thumbnail": "assets/publications/teaser/gnd_teaser.png",
    "links": [
      { "label": "Webpage", "url": "https://cs.gmu.edu/~xiao/Research/GND/" }
    ]
  },
  {
    "year": 2024,
    "title": "DTG: Diverse Trajectory Generation for Social Navigation",
    "authors": ["**D. Song**", "J. Liang", "X. Xiao", "D. Manocha"],
    "venue_short": "IROS",
    "venue_full": "IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), 2024",
    "type": "conference",
    "featured": false,
    "keywords": ["Trajectory Gen", "Social Nav"],
    "thumbnail": "assets/publications/teaser/dtg_teaser.gif",
    "links": [
      { "label": "Paper", "url": "https://arxiv.org/abs/2403.09900" }
    ]
  },
  {
    "year": 2024,
    "title": "AGL-NET: Aerial-Ground Localization Network",
    "authors": ["J. Liang", "**D. Song**", "X. Xiao", "D. Manocha"],
    "venue_short": "IROS",
    "venue_full": "IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), 2024",
    "type": "conference",
    "featured": false,
    "keywords": ["Localization", "Aerial-Ground"],
    "thumbnail": "assets/publications/teaser/agl-net_teaser.png",
    "links": [
      { "label": "Paper", "url": "https://arxiv.org/abs/2404.03187" }
    ]
  },
  {
    "year": 2024,
    "title": "TSP-Bot: Robotic Drawing via Traveling Salesman Problem",
    "authors": ["**D. Song**", "Y. J. Kim"],
    "venue_short": "UR",
    "venue_full": "International Conference on Ubiquitous Robots (UR), 2024",
    "type": "conference",
    "featured": true,
    "keywords": ["Robotic Art", "TSP", "Drawing"],
    "thumbnail": "assets/publications/teaser/tspart_teaser.gif",
    "links": [
      { "label": "Webpage", "url": "http://graphics.ewha.ac.kr/TSPArt" }
    ]
  },
  {
    "year": 2023,
    "title": "SSK: Robotic Pen-art System for Large, Non-planar Canvas",
    "authors": ["**D. Song**", "J. Kim", "Y. J. Kim"],
    "venue_short": "T-RO",
    "venue_full": "IEEE Transactions on Robotics (T-RO), 2023",
    "type": "journal",
    "featured": true,
    "keywords": ["Robotic Art", "Non-planar", "Motion Planning"],
    "thumbnail": "assets/publications/teaser/tro23_teaser.gif",
    "links": [
      { "label": "Webpage", "url": "http://graphics.ewha.ac.kr/SSK" },
      { "label": "Paper",   "url": "https://arxiv.org/abs/2210.07590" },
      { "label": "Video",   "url": "https://youtu.be/TEfqbPNdoBY" },
      { "label": "Code",    "url": "https://github.com/daeunSong/SSK" }
    ]
  },
  {
    "year": 2023,
    "title": "Stroke-based Rendering and Planning for Robotic Drawing",
    "authors": ["**D. Song**", "Y. J. Kim"],
    "venue_short": "IROS",
    "venue_full": "IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), 2023",
    "type": "conference",
    "featured": true,
    "keywords": ["Robotic Art", "Stroke Rendering"],
    "thumbnail": "assets/publications/teaser/iros23_teaser.gif",
    "links": [
      { "label": "Paper", "url": "https://arxiv.org/abs/2210.07590" }
    ]
  },
  {
    "year": 2021,
    "title": "Solving Footstep Planning as a Feasibility Problem using L1-norm Minimization",
    "authors": ["**D. Song**", "P. Fernbach", "T. Flayols", "A. D. Prete", "N. Mansard", "S. Tonneau", "Y. J. Kim"],
    "venue_short": "RA-L",
    "venue_full": "IEEE Robotics and Automation Letters (RA-L), 2021",
    "type": "journal",
    "featured": false,
    "keywords": ["Footstep Planning", "Legged Robot"],
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
    "title": "Multi-Contact Locomotion using a Contact Sequence Optimization",
    "authors": ["**D. Song**", "P. Fernbach", "T. Flayols", "A. D. Prete", "N. Mansard", "S. Tonneau", "Y. J. Kim"],
    "venue_short": "ICRA",
    "venue_full": "IEEE International Conference on Robotics and Automation (ICRA), 2021",
    "type": "conference",
    "featured": false,
    "keywords": ["Locomotion", "Contact Planning"],
    "thumbnail": "assets/publications/teaser/icra21_teaser.jpg",
    "links": [
      { "label": "Paper", "url": "https://hal.science/hal-02998757/" }
    ]
  },
  {
    "year": 2020,
    "title": "SL1M: Sparse L1-norm Minimization for Contact Plan Generation on Uneven Terrain",
    "authors": ["**D. Song**", "P. Fernbach", "T. Flayols", "A. D. Prete", "N. Mansard", "S. Tonneau", "Y. J. Kim"],
    "venue_short": "ICRA",
    "venue_full": "IEEE International Conference on Robotics and Automation (ICRA), 2020",
    "type": "conference",
    "featured": false,
    "keywords": ["Footstep Planning", "Uneven Terrain"],
    "thumbnail": "assets/publications/teaser/sl1m_teaser.png",
    "links": [
      { "label": "Webpage", "url": "http://graphics.ewha.ac.kr/SL1M" }
    ]
  },
  {
    "year": 2019,
    "title": "Robotic Pen-art: Automated Rendering and Motion Planning for Non-planar Surface Drawing",
    "authors": ["**D. Song**", "J. Kim", "Y. J. Kim"],
    "venue_short": "ICRA",
    "venue_full": "IEEE International Conference on Robotics and Automation (ICRA), 2019",
    "type": "conference",
    "featured": false,
    "keywords": ["Robotic Art", "Drawing", "Motion Planning"],
    "thumbnail": "assets/publications/teaser/icra19_teaser.gif",
    "links": [
      { "label": "Webpage", "url": "http://graphics.ewha.ac.kr/SSK" }
    ]
  },
  {
    "year": 2018,
    "title": "A Nonplanar Surface Robot Pen-art System Using 3D Reconstruction",
    "authors": ["**D. Song**", "J. Kim", "Y. J. Kim"],
    "venue_short": "ICRA",
    "venue_full": "IEEE International Conference on Robotics and Automation (ICRA), 2018",
    "type": "conference",
    "featured": true,
    "keywords": ["Robotic Art", "3D Reconstruction"],
    "thumbnail": "assets/publications/teaser/icra18_teaser.gif",
    "links": [
      { "label": "Webpage", "url": "http://graphics.ewha.ac.kr/SSK" }
    ]
  }
];
