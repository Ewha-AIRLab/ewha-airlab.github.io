// ── Research Data ──
// Edit this file to update the Research page.
// status: "active" | "completed"

const RESEARCH_DATA = {

  projects: [
    {
      title:  "Lifelong Robot Learning in Open Environments",
      agency: "NRF Mid-Career Researcher Program · PI: Prof. D. Song",
      desc:   "Investigates continual learning architectures, knowledge retention, and skill reuse for robots deployed in open-world environments over extended periods. Research includes theoretical foundations in catastrophic forgetting mitigation, modular policy design, and real-robot validation.",
      status: "active",
      budget: "₩750M",
      period: "2025 – 2029"
    },
    {
      title:  "Safe Human-Robot Coexistence in Smart Factories",
      agency: "IITP ICT R&D Program · Collaborative",
      desc:   "Develops safety-critical motion planning and real-time human intent recognition for robots and humans sharing industrial workspaces. Research spans formal safety guarantees, predictive models of human behavior, and risk-aware trajectory optimization.",
      status: "active",
      budget: "₩420M",
      period: "2024 – 2027"
    },
    {
      title:  "Foundation Model-Guided Robot Task Planning",
      agency: "Industry Partnership",
      desc:   "Explores grounding large language and vision-language models (LLMs/VLMs) for robot task planning and execution. Develops interfaces between symbolic LLM outputs and continuous robot control pipelines, with a focus on instruction following, failure recovery, and open-vocabulary object manipulation.",
      status: "active",
      budget: "₩180M",
      period: "2024 – 2026"
    },
    {
      title:  "Dexterous Manipulation for Unstructured Environments",
      agency: "NRF Basic Research Program",
      desc:   "Fundamental research on contact-rich manipulation skills combining tactile sensing, probabilistic shape completion, and deep reinforcement learning. Targets grasping and in-hand manipulation of deformable and articulated objects in cluttered, partially observed scenes.",
      status: "active",
      budget: "₩280M",
      period: "2022 – 2025"
    },
  ],

  areas: [
    {
      name:  "Robot Learning & Manipulation",
      icon:  "🤖",
      color: "var(--green)",
      desc:  "RL, imitation learning, sim-to-real, dexterous and deformable object grasping"
    },
    {
      name:  "Computer Vision & Perception",
      icon:  "👁️",
      color: "var(--mint)",
      desc:  "RGB-D detection, point cloud segmentation, lifelong semantic mapping"
    },
    {
      name:  "Human-Robot Interaction",
      icon:  "🧑‍🤝‍🧑",
      color: "var(--blue)",
      desc:  "Intent prediction, shared autonomy, legible motion, social navigation"
    },
    {
      name:  "Autonomous Navigation",
      icon:  "🗺️",
      color: "var(--yg)",
      desc:  "SLAM, LiDAR-camera fusion, trajectory optimization under uncertainty"
    },
  ]

};
