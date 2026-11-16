import type { DevProcessStep, CoreValue, EngineeringStandard } from '../types';

export const companyProfile = {
  name: 'NEXORA TECHNOLOGIES',
  brandName: 'NEXORA',
  tagline: "Building Tomorrow's Digital World.",
  shortDescription: 'Nexora Technologies is an engineering-focused software development company. We design and build modern commercial kiosk systems, interactive touch terminal software, bespoke web applications, and ergonomic product user interfaces.',
  establishedYear: '2024',
  hqLocation: 'Nexora Engineering Operations (Coimbatore • Remote Worldwide Delivery)',
  contactEmail: 'contact@nexoratech.example.com',
  inquiriesEmail: 'inquiries@nexoratech.example.com',
  phonePlaceholder: '+91 90959 58663',
  operatingHours: 'Mon–Fri 9:00 AM – 6:00 PM IST',
  responseSla: 'Within 24 business hours',
};

export const developmentProcessSteps: DevProcessStep[] = [
  {
    stepNumber: '01',
    title: 'Requirements Discovery & Flow Mapping',
    phase: 'Architecture & Scoping',
    description: 'We analyze operational workflows, hardware constraints, touch target dimensions, user journey transitions, and network synchronization requirements to design a solid technical roadmap.',
    deliverables: [
      'Comprehensive Technical Scope & Flow Diagram',
      'Hardware compatibility checklist (Tablets, Displays, POS)',
      'Milestone breakdown with verifiable delivery benchmarks'
    ],
    timeframe: 'Weeks 1–2'
  },
  {
    stepNumber: '02',
    title: 'Ergonomic UI & Touch Prototype',
    phase: 'Design & Interaction',
    description: 'Designing intuitive, high-contrast user interfaces specifically crafted for touchscreens and tablet docks. Every interaction is tested for touch target ergonomics (>48px), visual clarity, and responsiveness.',
    deliverables: [
      'Interactive Figma prototypes with touch design tokens',
      'Multi-device responsive layout specifications (8"–12" tablets, mobile, desktop)',
      'Design token library ready for frontend binding'
    ],
    timeframe: 'Weeks 3–4'
  },
  {
    stepNumber: '03',
    title: 'Agile Component Engineering',
    phase: 'Core Development Sprints',
    description: 'Building clean, type-safe code using modern React, TypeScript, and robust state management. Implementing real-time communication, offline resilience, and modular architecture in two-week agile sprint cycles.',
    deliverables: [
      'Bi-weekly staging builds accessible on cloud staging URLs',
      'Clean TypeScript codebase with strict typing',
      'Transparent Git commit history and changelog documentation'
    ],
    timeframe: 'Weeks 5–10'
  },
  {
    stepNumber: '04',
    title: 'Hardware Testing & Operational Hardening',
    phase: 'Testing & QA',
    description: 'Testing on real physical tablets and kiosk hardware. Validating orientation changes, multi-touch stability, cross-screen state synchronization, accessibility contrast ratios, and thermal/memory behavior.',
    deliverables: [
      'Multi-device hardware test report (tablets, mobile, desktop)',
      'Cross-screen synchronization latency validation',
      'Zero known blocker verification sign-off'
    ],
    timeframe: 'Weeks 11–12'
  },
  {
    stepNumber: '05',
    title: 'Deployment & Knowledge Handover',
    phase: 'Release & Handover',
    description: 'Deploying production builds with automated CI/CD pipelines, containerized environments, and comprehensive setup documentation to give your team complete operational independence.',
    deliverables: [
      'Production build artifacts and deployment configurations',
      'Complete developer documentation and runbooks',
      'Direct hand-off of 100% intellectual property and code repositories'
    ],
    timeframe: 'Week 13 onwards'
  }
];

export const coreValues: CoreValue[] = [
  {
    number: '01',
    title: 'Engineering Rigor Above All',
    description: 'We reject short-term shortcuts. Every system we build is designed for clean maintainability, absolute type safety, deterministic logic, and architectural longevity.',
    metric: 'Strict Type-Safe Code'
  },
  {
    number: '02',
    title: 'Radical Transparency',
    description: 'Clients have total access to code repositories, direct communication channels with software engineers, and verifiable milestone benchmarks without vendor gatekeeping.',
    metric: '100% Client Code Ownership'
  },
  {
    number: '03',
    title: 'Touch & Usability First',
    description: 'Software that touches customers must be intuitive, fast, and delightful. We engineer interfaces that require zero training to operate seamlessly.',
    metric: 'Ergonomic Touch Standards'
  },
  {
    number: '04',
    title: 'Honest Business Practice',
    description: 'We do not inflate statistics, claim unbuilt capabilities, or fabricate testimonials. We stand behind our real software engineering work.',
    metric: 'Verified Real Capabilities'
  },
  {
    number: '05',
    title: 'Reliable Real-Time Performance',
    description: 'From instant table-to-kitchen ticket broadcasting to fluid 60fps animations, our applications are engineered for responsiveness under real operational conditions.',
    metric: 'Sub-Second State Sync'
  }
];

export const whyChooseNexoraPoints = [
  {
    title: 'Real Working Software Experience',
    description: 'We showcase actual functional software products like our Smart-Kiosk system, with genuine live demonstrations you can test directly.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Full Intellectual Property Ownership',
    description: 'You retain 100% of all intellectual property, source code repositories, design tokens, and deployment configurations with zero vendor lock-in.',
    icon: 'Key'
  },
  {
    title: 'Modern Type-Safe Stack',
    description: 'We build with verified, industry-standard technologies—React, TypeScript, Vite, Tailwind CSS, Python, and modern web standards—ensuring long-term maintainability.',
    icon: 'Layers'
  },
  {
    title: 'Commercial Hardware Understanding',
    description: 'We understand commercial tablet mounts, kiosk enclosures, touch target acoustics, high-contrast dining room lighting, and offline hardware reliability.',
    icon: 'Smartphone'
  },
  {
    title: 'Direct Engineer Communication',
    description: 'Work directly with the developers writing your software. No junior outsourcing chains or layers of non-technical account managers.',
    icon: 'Activity'
  },
  {
    title: 'Honest Milestones & Deliverables',
    description: 'Transparent sprint planning, live staging URLs every two weeks, and clear demarcation between completed features and work in progress.',
    icon: 'CheckCircle2'
  }
];

export const engineeringStandards: EngineeringStandard[] = [
  {
    id: 'standard-1',
    title: '100% Client Code & IP Ownership',
    subtitle: 'Zero Vendor Lock-In',
    description: 'Every line of custom software, design token, configuration script, and documentation is formally assigned to the client. You own your codebase completely from day one.',
    commitment: 'Complete repository transfer with build scripts upon project completion.',
    iconName: 'Lock'
  },
  {
    id: 'standard-2',
    title: 'Live Verifiable Staging Builds',
    subtitle: 'Transparent Agile Progress',
    description: 'Never wait months for a black-box demo. We provide live, interactive staging URLs on every sprint so you can touch, test, and validate progress continuously.',
    commitment: 'Cloud-accessible staging URL updated with each verified milestone.',
    iconName: 'Globe'
  },
  {
    id: 'standard-3',
    title: 'Strict Commercial Confidentiality',
    subtitle: 'Mutual NDA Governance',
    description: 'We respect proprietary enterprise business logic. All architectural conversations, specifications, and business rules are governed under strict bilateral non-disclosure agreements.',
    commitment: 'Formal mutual NDA executed prior to reviewing client specifications.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'standard-4',
    title: 'Deterministic Code Quality & Type Safety',
    subtitle: 'Zero Tolerated Build Warnings',
    description: 'Every codebase is audited with strict linters and static type checkers. We deliver clean, self-documenting code structured for easy onboarding by internal teams.',
    commitment: 'Strict zero-error, zero-warning quality gates enforced in CI/CD.',
    iconName: 'CheckCircle2'
  }
];
