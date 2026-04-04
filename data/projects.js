// ── Research Areas Data ──
// Edit this file to update the Research page.
//
// image:  path to a representative image (can reuse a publication teaser)
//         set to null if not available yet
// desc:   short paragraph describing this research area
// papers: list of paper titles (must match exactly with titles in publications.js)

const RESEARCH_DATA = {
  areas: [
    {
      title: "End-to-End Learning for Robotics",
      image: "assets/publications/teaser/loa_teaser.gif",
      desc:  "We develop end-to-end learning frameworks that train robots directly from raw sensory inputs to actions, bypassing hand-crafted intermediate representations. Our work spans learning from human demonstrations, vision-language model grounding, and efficient inference pipelines for real-time robot deployment.",
      papers: [
        "Narrate2Nav: Real-Time Visual Navigation with Implicit Language Reasoning in Human-Centric Environments",
        // "Legs Over Arms: On the Predictive Value of Lower-Body Pose for Human Trajectory Prediction from Egocentric Robot Perception",
        "E-SocialNav: Efficient Socially Compliant Navigation with Language Models",
        // "Learning to steer a locomotion contact planner",
      ]
    },
    {
      title: "Social Robot Navigation",
      image: "assets/publications/teaser/VLM-SocialNav_teaser.gif",
      desc:  "We study how robots can navigate safely and naturally in human-populated environments. Our research integrates vision-language models, pedestrian motion prediction, and socially-aware trajectory planning to enable robots to respect social norms and anticipate human behavior.",
      papers: [
        "Legs Over Arms: On the Predictive Value of Lower-Body Pose for Human Trajectory Prediction from Egocentric Robot Perception",
        "SocialLLaVA: Enhancing Robot Navigation through Human-Language Reasoning in Social Spaces",
        "AutoSpatial:Visual-Language Reasoning for Social Robot Navigation through Efficient Spatial Reasoning Learning",
        "VLM-Social-Nav: Socially Aware Robot Navigation through Scoring Using Vision-Language Models",
        "Towards Human-Like Instruction Navigation in Real-World",
      ]
    },
    {
      title: "Outdoor Robot Navigation",
      image: "assets/publications/teaser/tgs.gif",
      desc:  "We tackle autonomous navigation in unstructured, outdoor environments including off-road terrain and urban campus settings. Our research addresses traversability estimation, multi-modal sensor fusion, and vision-language-guided trajectory generation for robots operating beyond structured indoor spaces.",
      papers: [
        "VL-TGS: Trajectory Generation and Selection using Vision Language Models in Mapless Outdoor Environments",
        "DTG: Diverse Trajectory Generation for Social Navigation",
        "MOSU: Autonomous Long-range Robot Navigation with Multi-modal Scene Understanding in Outdoor Campus Environments",
        "GND: Global Navigation Dataset with Multi-Modal Perception and Multi-Category Traversability in Outdoor Campus Environments",
        "Verti-Arena: A Controllable and Standardized Indoor Testbed for Multi-Terrain Off-Road Autonomy",
        // "Autonomous Ground Navigation in Highly Constrained Spaces: Lessons Learned from The Forth BARN Challenge at ICRA 2025",
        // "AGL-NET: Aerial-Ground Localization Network",
      ]
    },
    {
      title: "Robotic Drawing System",
      image: "assets/publications/teaser/tspart_teaser.gif",
      desc:  "We explore the intersection of robotics and artistic expression, building systems that enable robots to draw on arbitrary 2D and 3D surfaces. Research topics include stroke-based rendering, robot path planning for artistic reproduction, impedance control for pen-on-surface contact, and human-robot collaborative drawing.",
      papers: [
        "TSP-Bot: Robotic Drawing via Traveling Salesman Problem",
        "SSK: Robotic Pen-art System for Large, Non-planar Canvas",
        "Stroke-based Rendering and Planning for Robotic Performance of Artistic Drawing",
        "Distortion-free Robotic Surface-drawing using Conformal Mapping",
        "Artistic Pen Drawing on an Arbitrary Surface using an Impedance-controlled Robot",
      ]
    },
  ]
};
