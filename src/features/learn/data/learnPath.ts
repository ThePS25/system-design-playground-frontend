import type { LearnLesson } from '@/types';

export const LEARN_PATH_INTRO = {
  title: 'Start Here',
  description:
    'A guided path from zero to interview-ready. No prior system design experience required — follow the lessons in order, then explore each hands-on module.',
  totalLessons: 8,
  estimatedHours: 6,
};

export const LEARN_LESSONS: LearnLesson[] = [
  {
    slug: 'what-is-system-design',
    order: 1,
    title: 'What Is System Design?',
    subtitle: 'The big picture before you draw a single box',
    durationMinutes: 15,
    sections: [
      {
        heading: 'Why this matters',
        body:
          'System design is the skill of turning a vague product idea — "build Twitter" or "design a ride-sharing app" — into a concrete architecture: which servers, databases, caches, and queues you need, and how they talk to each other. Companies test this in interviews because senior engineers make these decisions every day.',
      },
      {
        heading: 'What you are NOT learning here',
        body:
          'DesignScape is not about memorizing AWS service names or copying FAANG blog posts. It is about understanding tradeoffs: speed vs consistency, cost vs availability, simplicity vs scale. Every simulation and challenge on this site uses explicit rules so you can see cause and effect.',
      },
      {
        heading: 'HLD vs LLD — two levels of design',
        body:
          'High-Level Design (HLD) is the architecture: clients, load balancers, databases, caches, and data flow between them. Low-Level Design (LLD) is the code-level structure: classes, APIs, design patterns, and concurrency. Interviews often start with HLD and drill into LLD for one component. DesignScape covers both — use the Glossary HLD and LLD sections as reference.',
      },
      {
        heading: 'What a complete answer looks like',
        body:
          'A strong interview answer usually covers: (1) clarify requirements, (2) estimate scale, (3) propose a high-level diagram, (4) deep-dive on bottlenecks, data model, and failure modes, (5) discuss tradeoffs and future improvements. The next lesson breaks this into steps you can reuse every time.',
      },
    ],
    keyTakeaways: [
      'System design = architecture + tradeoffs, not memorizing diagrams.',
      'HLD is boxes and arrows; LLD is classes and APIs.',
      'Interviews reward structured thinking, not perfect answers.',
    ],
    practiceLinks: [
      { label: 'Browse HLD Glossary', route: '/glossary/hld', description: 'Skim terms you will hear often' },
    ],
  },
  {
    slug: 'the-design-process',
    order: 2,
    title: 'The Design Process',
    subtitle: 'A repeatable framework for any interview question',
    durationMinutes: 20,
    sections: [
      {
        heading: 'Step 1 — Clarify requirements (5 min)',
        body:
          'Never start drawing immediately. Ask: Who are the users? What are the core features (must-have vs nice-to-have)? What scale — daily active users, reads vs writes, data retention? Are there latency or availability targets? Example: for a URL shortener, confirm custom aliases, analytics, and expiration policy.',
      },
      {
        heading: 'Step 2 — Back-of-the-envelope estimation (5 min)',
        body:
          'Rough numbers guide your design. Estimate QPS (queries per second), storage growth, and bandwidth. Rule of thumb: 1 million users ≈ 10–50 RPS for moderate apps; peak traffic is often 2–3× average. Storage: average object size × number of objects. These numbers tell you if you need sharding, CDN, or caching.',
      },
      {
        heading: 'Step 3 — High-level design (10 min)',
        body:
          'Draw the main components: clients, API layer, business services, cache, database, object storage, message queue. Show the read path and write path. Keep it simple first — single region, single database — then evolve. DesignScape Architecture Explorer shows how real companies structure similar systems.',
      },
      {
        heading: 'Step 4 — Deep dives & tradeoffs (15 min)',
        body:
          'Pick 2–3 areas to go deep: data model (schema, indexes, sharding key), caching strategy, bottlenecks under load, failure scenarios, and security. Always state tradeoffs: "I chose eventual consistency here because likes can be approximate, but payments need strong consistency." Use Traffic and Failure simulators here to build intuition.',
      },
    ],
    keyTakeaways: [
      'Clarify → Estimate → Diagram → Deep dive — in that order.',
      'Estimations do not need to be exact; order-of-magnitude is enough.',
      'Name tradeoffs explicitly; interviewers listen for judgment, not perfection.',
    ],
    practiceLinks: [
      { label: 'Try a Design Challenge', route: '/challenge', description: 'Apply the framework under scoring rules' },
    ],
  },
  {
    slug: 'core-building-blocks',
    order: 3,
    title: 'Core Building Blocks',
    subtitle: 'The components that appear in almost every design',
    durationMinutes: 25,
    sections: [
      {
        heading: 'The usual suspects',
        body:
          'Most systems combine a small set of building blocks: DNS routes users to your app; a CDN serves static assets; a load balancer distributes traffic; application servers run business logic; Redis caches hot data; a primary database stores durable state; read replicas scale reads; a message queue decouples async work; object storage holds files and media.',
      },
      {
        heading: 'Read path vs write path',
        body:
          'Reads are often 10–100× more frequent than writes. Optimize reads with caches and replicas. Writes usually hit the primary database first, then propagate. Understanding this split helps you decide where to add Redis, CDN, or search indexes.',
      },
      {
        heading: 'Learn each component deeply',
        body:
          'DesignScape has 14 component profiles — each with purpose, advantages, disadvantages, scaling notes, failure impact, and interview questions. You do not need to memorize all 14 before moving on, but read Load Balancer, Cache (Redis), Database, and CDN first. Return to others as you explore architectures.',
      },
      {
        heading: 'Connect terms to components',
        body:
          'When you read Glossary terms like "sharding" or "consistent hashing," map them to the Database and Cache components. When you read "rate limiting," think API Gateway or load balancer. Linking concepts to boxes on your diagram is how knowledge sticks.',
      },
    ],
    keyTakeaways: [
      'Most designs reuse the same ~10 component types.',
      'Optimize read and write paths separately.',
      'Use Interview Prep to study one component at a time.',
    ],
    practiceLinks: [
      { label: 'Interview Prep — Components', route: '/interview', description: 'Deep-dive each building block' },
      { label: 'HLD Glossary', route: '/glossary/hld', description: 'Definitions for architecture terms' },
    ],
  },
  {
    slug: 'explore-real-architectures',
    order: 4,
    title: 'Explore Real Architectures',
    subtitle: 'See how famous systems are structured',
    durationMinutes: 30,
    sections: [
      {
        heading: 'Learn by example',
        body:
          'Reading theory alone is not enough. Architecture Explorer shows reference designs inspired by Twitter, WhatsApp, Netflix, and others. Each template has an interactive diagram — click nodes to read what each component does in that context.',
      },
      {
        heading: 'What to look for',
        body:
          'When opening a template, ask: Where does traffic enter? Where is caching? How is media handled differently from text? Where would a bottleneck appear first? Compare two templates — notice how a chat app differs from a video platform.',
      },
      {
        heading: 'Do not copy blindly',
        body:
          'Netflix architecture fits Netflix constraints. Your interview answer should fit the question requirements. Use these templates to build pattern recognition: "video-heavy → CDN + object storage + encoding pipeline," "real-time chat → WebSockets + message queue + presence cache."',
      },
    ],
    keyTakeaways: [
      'Pattern recognition beats memorizing one diagram.',
      'Click every node — purpose and tradeoffs are in the side panel.',
      'Compare templates to see how requirements shape architecture.',
    ],
    practiceLinks: [
      { label: 'Architecture Explorer', route: '/explorer', description: 'Browse 8 reference architectures' },
    ],
  },
  {
    slug: 'simulate-load-and-bottlenecks',
    order: 5,
    title: 'Simulate Load & Bottlenecks',
    subtitle: 'Develop intuition for scale',
    durationMinutes: 25,
    sections: [
      {
        heading: 'Why simulation helps',
        body:
          'Textbooks say "the database becomes a bottleneck." DesignScape shows you when and why. The Traffic Simulator runs deterministic formulas against your architecture — increase RPS and watch CPU, latency, and saturation change.',
      },
      {
        heading: 'What to experiment with',
        body:
          'Start at 100 RPS and increase to 10K, 100K, 1M. Note which node turns red first. Remove a cache from your mental model — how much worse does latency get? This mirrors the "how would you scale this?" follow-up in interviews.',
      },
      {
        heading: 'Connect to estimation',
        body:
          'If your back-of-the-envelope says 50K QPS and the simulator shows the database saturating at 10K, you know you need read replicas, sharding, or aggressive caching before reaching target scale.',
      },
    ],
    keyTakeaways: [
      'Bottlenecks appear in specific components — identify which one.',
      'Caching and load balancing delay but do not eliminate DB limits.',
      'Always tie simulation results back to your capacity estimates.',
    ],
    practiceLinks: [
      { label: 'Traffic Simulator', route: '/traffic', description: 'Run RPS from 100 to 1M' },
      { label: 'Scaling Evolution', route: '/scaling', description: 'See how architectures evolve with growth' },
    ],
  },
  {
    slug: 'plan-for-failure',
    order: 6,
    title: 'Plan for Failure',
    subtitle: 'Design for when — not if — things break',
    durationMinutes: 20,
    sections: [
      {
        heading: 'Everything fails eventually',
        body:
          'Hard drives die, networks partition, deployments introduce bugs. Interviewers ask: "What happens if the cache goes down?" or "What if the primary database fails?" Good answers mention redundancy, failover, graceful degradation, and recovery — not "it will not fail."',
      },
      {
        heading: 'Cascade failures',
        body:
          'One slow component can overload others — retries amplify traffic, thread pools exhaust, and the whole system falls over. The Failure Simulator lets you toggle a component down and see which others are affected and how severely.',
      },
      {
        heading: 'Mitigation patterns',
        body:
          'Common mitigations: replicas and multi-AZ deployment for availability; circuit breakers to stop calling failing services; timeouts and retry with backoff; fallbacks (serve stale cache); idempotent retries for safe recovery. Each component in Interview Prep lists industry mitigations for that failure type.',
      },
    ],
    keyTakeaways: [
      'Always walk through a single-component failure in your design.',
      'Retries without backoff can make outages worse.',
      'Graceful degradation beats total outage.',
    ],
    practiceLinks: [
      { label: 'Failure Simulator', route: '/failure', description: 'Toggle failures and see cascade impact' },
    ],
  },
  {
    slug: 'practice-and-get-scored',
    order: 7,
    title: 'Practice & Get Scored',
    subtitle: 'Apply everything in interview-style challenges',
    durationMinutes: 45,
    sections: [
      {
        heading: 'Active practice beats passive reading',
        body:
          'Design Challenges give you requirements, a starter canvas, and a component palette. Drag components onto the canvas and hit Validate — the backend scores your design against required components, anti-patterns, and best practices. No AI, no guesswork: you see exactly what you missed.',
      },
      {
        heading: 'How to use challenges effectively',
        body:
          'Read all requirements before adding components. Think for 5 minutes on paper first, then build. After validation, read the feedback carefully — missing CDN for a media-heavy design is a lesson, not a failure. Retry until you pass, then try the next difficulty.',
      },
      {
        heading: 'Simulate interview conditions',
        body:
          'Set a 45-minute timer. Talk out loud (even alone): clarify requirements, estimate scale, explain each box. DesignScape scoring replaces the interviewer feedback loop until you practice with a peer.',
      },
    ],
    keyTakeaways: [
      'Validation feedback tells you exactly what to improve.',
      'Start with easier challenges, then increase difficulty.',
      'Explain tradeoffs out loud — interviews are verbal.',
    ],
    practiceLinks: [
      { label: 'Design Challenges', route: '/challenge', description: 'Rule-based scoring on your diagrams' },
    ],
  },
  {
    slug: 'keep-growing',
    order: 8,
    title: 'Keep Growing',
    subtitle: 'Reference tools for ongoing study',
    durationMinutes: 15,
    sections: [
      {
        heading: 'You have the foundation',
        body:
          'You understand the process, the building blocks, how to explore architectures, simulate load and failure, and practice under scoring. From here, learning is iterative: read one Glossary term per day, redo a challenge weekly, explore one new architecture template, and explain a design to a friend.',
      },
      {
        heading: 'Use the reference modules',
        body:
          'Glossary — HLD and LLD terms with interview tips. Interview Prep — component deep-dives and questions. Cost Estimator — rough monthly infra cost for your designs (helps in "how much would this cost?" follow-ups). Return to Scaling Evolution when you need to articulate growth stages in an interview.',
      },
      {
        heading: 'Suggested weekly routine',
        body:
          'Monday: one Glossary term + notes. Wednesday: one Traffic or Failure simulation on a familiar architecture. Friday: one Design Challenge under time pressure. Weekend: read one real engineering blog post and map it to components you know.',
      },
    ],
    keyTakeaways: [
      'Consistency beats cramming — 30 minutes daily is enough.',
      'Cycle through modules; each reinforces the others.',
      'Teaching someone else exposes gaps in your understanding.',
    ],
    practiceLinks: [
      { label: 'Glossary', route: '/glossary', description: 'HLD & LLD term reference' },
      { label: 'Interview Prep', route: '/interview', description: 'Component Q&A' },
      { label: 'Cost Estimator', route: '/cost', description: 'Infra cost breakdowns' },
    ],
  },
];
