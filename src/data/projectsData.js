// ========================================================
// Featured Projects Dataset (projectsData.js)
// Centralized, easy to extend with your live links & screenshots
// ========================================================

export const PROJECTS_DATA = [
  {
    id: 'pulsestream',
    number: '01',
    category: 'FULL-STACK REALTIME SYSTEM',
    status: 'Production Ready',
    title: 'PulseStream',
    tagline: 'AI-Augmented Realtime Collaboration Engine',
    description: 'A low-latency collaborative canvas with real-time state synchronization, granular presence awareness, and sub-30ms CRDT document merging built for distributed teams.',
    metrics: 'Sub-30ms Sync  |  99.9% Webhook Reliability  |  Zero Latency Drift',
    highlights: [
      'Bidirectional WebSocket event bus with automatic heartbeat failover and token rotation',
      'Supabase & PostgreSQL database with Row Level Security (RLS) for multi-tenant isolation',
      'Fluid tactile interactions powered by spring physics and hardware-accelerated transforms'
    ],
    techStack: ['React.js', 'Node.js', 'Supabase', 'WebSockets', 'Tailwind CSS'],
    liveUrl: 'https://pulsestream-demo.vercel.app',
    githubUrl: 'https://github.com/yashrg07/pulsestream-engine',
    browserDisplayUrl: 'pulsestream-engine.vercel.app',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
    fallbackGradient: 'radial-gradient(circle at 60% 30%, #064E3B 0%, #022C22 60%, #050505 100%)',
    accentColor: '#00D084',
  },
  {
    id: 'nexus-commerce',
    number: '02',
    category: 'FULL-STACK PLATFORM',
    status: 'Active Deployment',
    title: 'Nexus Commerce',
    tagline: 'High-Throughput Headless Storefront & Inventory Engine',
    description: 'Modern headless commerce platform with instantaneous client-side transitions, atomic inventory locking during peak drops, and unified checkout architecture.',
    metrics: '98 Google Lighthouse  |  <100ms Page Transitions  |  ACID Locked Checkout',
    highlights: [
      'Decoupled Next.js frontend with aggressive server-side catalog caching and ISR',
      'Atomic MySQL database transaction locks preventing race conditions during flash sales',
      'Stripe Payment Gateway integration with real-time webhook verification and receipts'
    ],
    techStack: ['Next.js', 'TypeScript', 'MySQL', 'Stripe API', 'Tailwind CSS'],
    liveUrl: 'https://nexus-commerce.vercel.app',
    githubUrl: 'https://github.com/yashrg07/nexus-commerce',
    browserDisplayUrl: 'nexus-commerce.store',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80',
    fallbackGradient: 'radial-gradient(circle at 60% 30%, #1E3A8A 0%, #172554 60%, #050505 100%)',
    accentColor: '#3B82F6',
  },
  {
    id: 'hyperquery',
    number: '03',
    category: 'DEVELOPER TOOLING',
    status: 'Open Source',
    title: 'HyperQuery',
    tagline: 'RESTful API Testing Sandbox & Performance Profiler',
    description: 'Visual API testing environment and endpoint performance profiler with automated schema inspection, real-time response diffing, and export-to-cURL utilities.',
    metrics: '500+ Request Benchmarks  |  Zero Config Setup  |  Local Storage Privacy',
    highlights: [
      'Real-time JSON response visualizer with structural diffing and deep syntax highlighting',
      'Zero telemetry architecture with AES-encrypted local storage for API authentication tokens',
      'Modular client architecture built with strict TypeScript type-safety throughout'
    ],
    techStack: ['React.js', 'TypeScript', 'Node.js', 'REST APIs', 'Framer Motion'],
    liveUrl: 'https://hyperquery-app.vercel.app',
    githubUrl: 'https://github.com/yashrg07/hyperquery-toolkit',
    browserDisplayUrl: 'hyperquery.dev',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80',
    fallbackGradient: 'radial-gradient(circle at 60% 30%, #581C87 0%, #3B0764 60%, #050505 100%)',
    accentColor: '#BD34FE',
  },
  {
    id: 'kinetics-ui',
    number: '04',
    category: 'DESIGN SYSTEM & CORE LIB',
    status: 'NPM Library',
    title: 'Kinetics UI',
    tagline: 'Tactile Micro-Interaction Component Framework',
    description: 'A design system of fluid spring-physics UI components, kinetic typography sweeps, and directional cards engineered for modern web applications.',
    metrics: '60 FPS Hardware Acceleration  |  100% Vector  |  Zero Layout Shift',
    highlights: [
      'Physics-based mass, damping, and stiffness curves tuned for natural tactile feedback',
      'Comprehensive ARIA compliance with keyboard accessibility and reduced-motion fallbacks',
      'Zero bloated dependencies—pure React hooks paired with modern CSS custom properties'
    ],
    techStack: ['React.js', 'Framer Motion', 'Figma', 'CSS Variables', 'Vite'],
    liveUrl: 'https://kinetics-ui.vercel.app',
    githubUrl: 'https://github.com/yashrg07/kinetics-ui-system',
    browserDisplayUrl: 'kinetics-ui.system',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=80',
    fallbackGradient: 'radial-gradient(circle at 60% 30%, #9A3412 0%, #7C2D12 60%, #050505 100%)',
    accentColor: '#FF6B35',
  },
];
