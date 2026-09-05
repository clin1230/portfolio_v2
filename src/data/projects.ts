export type MediaItem =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string; poster?: string };

export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  year: string;
  tech: string[];
  featured: boolean;
  galleryLayout?: "grid" | "video" | "featured-left" | "panels";
  thumbnail?: string;
  media?: MediaItem[];
  images?: string[];
  role?: string;
  links?: {
    live?: string;
    github?: string;
  };
  content?: string[];
}

export const projects: Project[] = [
  {
    slug: "gesture-dj",
    title: "Gesture DJ",
    category: "Physical Computing",
    description: "A Raspberry Pi DJ controller driven by four simultaneous input modes—gesture sensor, capacitive touch, offline voice, and MediaPipe hand tracking—with beat-reactive web visualizations.",
    year: "2026",
    tech: ["Python", "Raspberry Pi", "MediaPipe", "OpenCV", "Flask", "WebSockets", "Vosk"],
    featured: true,
    role: "Developer (Sensors & Interaction)",
    galleryLayout: "featured-left",
    thumbnail: "/projects/gesture-dj/web-light.png",
    media: [
      { type: "image", src: "/projects/gesture-dj/device.png", alt: "Laser-cut Gesture DJ controller with the web interface running on a laptop" },
      { type: "image", src: "/projects/gesture-dj/web-light.png", alt: "Gesture DJ web interface in light mode with spectrum visualizer" },
      { type: "image", src: "/projects/gesture-dj/web-dark.png", alt: "Gesture DJ web interface in dark mode with waveform visualizer and camera feed" },
    ],
    links: {
      github: "https://github.com/clin1230/Interactive-Lab-Hub/tree/Fall2025/Final%20Project",
    },
    content: [
      "Gesture DJ is a multi-modal DJ controller built on a Raspberry Pi that lets you control music through gesture sensors, capacitive touch, voice commands, and camera-based hand tracking—paired with real-time visualizations on a web interface and a retro PiTFT display. (Team project with Eva Huang and Zoe Tseng.)",
      "Inputs include an APDS-9960 gesture sensor for track and volume control, an MPR121 touch panel for direct track selection and playback, offline voice commands via Vosk, and MediaPipe hand-gesture recognition for switching UI themes and triggering DJ scratch effects. A Flask + WebSocket server streams the camera feed and beat-reactive audio visualizations (waveform, spectrum, audience, and particle modes).",
      "I focused on the sensor interaction layer and core logic—building the APDS gesture and MPR121 touch interfaces, the offline voice control, and the shared event-handling system that lets all input methods run simultaneously without conflicts. A major challenge was integrating MediaPipe alongside the other sensors, which required carefully designing distinct responsibilities for each input across several rounds of testing.",
    ],
  },
  {
    slug: "marksense",
    title: "MarkSense",
    category: "AI Browser Extension",
    description: "A Chrome extension that summarizes, translates, and highlights web content with AI running fully on-device via Gemini Nano—no API keys, no network calls, zero data sharing.",
    year: "2025",
    tech: ["JavaScript", "Chrome Extension", "Gemini Nano", "Manifest V3", "HTML", "CSS"],
    featured: true,
    role: "Developer",
    galleryLayout: "panels",
    thumbnail: "/projects/marksense/overview.png",
    media: [
      { type: "image", src: "/projects/marksense/panel-1.png", alt: "MarkSense side panel: AI summarize and translate" },
      { type: "image", src: "/projects/marksense/panel-2.png", alt: "MarkSense side panel: keyword extraction, related reading, and highlights" },
    ],
    links: {
      github: "https://github.com/clin1230/marksense",
    },
    content: [
      "MarkSense turns your browser into an intelligent reading and study assistant. It summarizes, translates, and intelligently highlights web content, with all AI processing running locally on-device via Chrome's built-in Gemini Nano APIs—no API keys, no network calls, and zero data sharing.",
      "Core features include one-click webpage summaries with adjustable tone and length, automatic translation of summaries into a chosen language, keyword extraction, AI-generated related-article cards, and interactive highlighting to flag important or confusing passages.",
      "Built with Manifest V3, the Side Panel API, and Chrome's AI SDK (Summarizer, Prompt, and Translator APIs), using Mozilla Readability for clean text extraction and chrome.storage.local for persistent highlights. Key challenges included working around experimental API availability, chunking long articles past the summarizer's input limit, and re-anchoring highlights after the DOM changes on page reload.",
    ],
  },
  {
    // NOTE: slug kept as "retail-platform" to preserve the existing image folder
    // (public/projects/retail-platform) already set up with the Style hero image.
    slug: "retail-platform",
    title: "Style",
    category: "E-Commerce",
    description: "A fashion storefront with JWT-secured auth, category filtering, and a ChatGPT-powered chatbot for real-time product recommendations and support.",
    year: "2025",
    tech: ["HTML", "CSS", "JavaScript", "C#", "JWT", "ChatGPT API"],
    featured: true,
    role: "Full-Stack Developer",
    galleryLayout: "video",
    thumbnail: "/projects/retail-platform/hero.jpg",
    media: [
      { type: "video", src: "/projects/retail-platform/demo.mp4", poster: "/projects/retail-platform/demo-poster.jpg" },
    ],
    images: [
      "/projects/retail-platform/hero.jpg",
    ],
    content: [
      "Style is a fashion e-commerce platform built to offer an intuitive, stylish, and secure shopping experience. With a sleek design and user-friendly interface, it integrates AI-powered assistance and robust authentication to enhance the online retail experience.",
      "Key features include a clean, responsive UI for effortless browsing and purchasing, secure JWT-based registration and login, intelligent product display with category filtering, a ChatGPT-powered chatbot for real-time product recommendations and support, and a smooth, reliable checkout process.",
      "Highlights: a minimalist yet engaging UI, secure authentication for customer protection, an interactive chatbot for personalization and engagement, and a fully responsive platform that works smoothly across all devices.",
    ],
  },
  {
    slug: "epilogue-and-beyond",
    title: "Epilogue & Beyond",
    category: "Web Development",
    description: "An interactive book-themed site built around SVG and CSS-keyframe animations, parallax scrolling, and lazy-loaded assets for smooth, high-performance storytelling.",
    year: "2024",
    tech: ["HTML", "CSS", "JavaScript", "SVG Animation", "Figma"],
    featured: true,
    role: "Frontend Developer & Designer",
    galleryLayout: "video",
    thumbnail: "/projects/epilogue-and-beyond/eb.png",
    media: [
      { type: "video", src: "/projects/epilogue-and-beyond/eb.mp4", poster: "/projects/epilogue-and-beyond/eb.png" },
    ],
    images: [
      "/projects/epilogue-and-beyond/eb.png",
    ],
    content: [
      "Epilogue & Beyond is an engaging, book-themed website designed to provide an immersive and interactive reading experience. Using custom animations, smooth scrolling effects, and scalable vector graphics (SVGs), the project blends aesthetics with functionality, delivering a visually rich, user-driven exploration of digital storytelling.",
      "Key features include custom frontend animations and smooth scrolling for seamless navigation, high-performance SVG-based animations, dynamic effects built with CSS keyframes and JavaScript, a storytelling-focused layout with parallax effects for depth, and optimized performance through lazy loading and asset optimization.",
      "Highlights: interactivity-first frontend development, immersive smooth-scrolling and parallax effects, lightweight SVG and CSS keyframe animations, and optimized asset management for fast, responsive performance.",
    ],
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(currentSlug: string): Project | undefined {
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug);
  if (currentIndex === -1) return undefined;
  const nextIndex = (currentIndex + 1) % projects.length;
  return projects[nextIndex];
}

