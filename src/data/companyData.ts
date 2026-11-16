import type { DevProcessStep, CoreValue, VerifiedEngagementNote } from '../types';

export const companyProfile = {
  name: 'NEXORA TECHNOLOGIES',
  brandName: 'NEXORA',
  tagline: "Building Tomorrow's Digital World.",
  shortDescription: 'Nexora Technologies is an international software development and IT engineering consultancy. We design, architect, and deploy mission-critical software, custom AI systems, and cloud-native digital infrastructure for global enterprises.',
  establishedYear: '2024',
  hqLocation: 'International Software Consultancy (Global Delivery Centers & Remote Engineering Hubs: North America • Europe • Asia-Pacific)',
  contactEmail: 'contact@nexoratech.example.com',
  inquiriesEmail: 'inquiries@nexoratech.example.com',
  phonePlaceholder: '+1 (555) 019-8420 [Corporate Inquiries Placeholder]',
  responseSla: 'Within 24 business hours',
};

export const developmentProcessSteps: DevProcessStep[] = [
  {
    stepNumber: '01',
    title: 'Discovery & Architectural Strategy',
    phase: 'Architecture & Alignment',
    description: 'We conduct deep technical scoping, analyzing operational throughput requirements, legacy constraints, data sovereignty policies, and system topology to design an immutable software architecture blueprint.',
    deliverables: [
      'Comprehensive System Architecture Document (SAD)',
      'Threat model & security compliance boundary definitions',
      'Technical risk mitigation matrix & SLA benchmarks'
    ],
    timeframe: 'Weeks 1–2'
  },
  {
    stepNumber: '02',
    title: 'Systems Prototyping & UX Architecture',
    phase: 'User Experience & Flow Validation',
    description: 'Translating complex operational workflows into high-fidelity interactive prototypes and design systems. Every interaction is validated against latency budgets, ergonomic usability, and cognitive clarity.',
    deliverables: [
      'Interactive Figma prototypes with production token models',
      'Information architecture & state machine definitions',
      'Design System token library ready for frontend binding'
    ],
    timeframe: 'Weeks 3–4'
  },
  {
    stepNumber: '03',
    title: 'Iterative Agile Engineering',
    phase: 'Core Development Sprints',
    description: 'Developing high-velocity, clean, type-safe code in two-week agile sprint cadences. We implement continuous integration, automated code linting, static analysis, and peer-reviewed pull requests.',
    deliverables: [
      'Bi-weekly production-grade staging deployments',
      'Strict test coverage (>85% automated unit & integration)',
      'Transparent Git commit history and changelog documentation'
    ],
    timeframe: 'Weeks 5–12'
  },
  {
    stepNumber: '04',
    title: 'Security, Automated QA & Stress Testing',
    phase: 'Quality & Hardening',
    description: 'Simulating worst-case production conditions before public rollout: high-concurrency DDoS resilience, automated vulnerability scans, penetration testing, and multi-tenant security verification.',
    deliverables: [
      'Comprehensive automated QA test suite & regression reports',
      'Third-party security audit readiness report',
      'Synthetic load testing reports validating peak throughput'
    ],
    timeframe: 'Weeks 13–14'
  },
  {
    stepNumber: '05',
    title: 'Multi-Cloud Deployment & Global Observability',
    phase: 'Launch & Continuity',
    description: 'Executing zero-downtime blue/green rollouts across multi-region Kubernetes clusters. We configure distributed telemetry, automated alert thresholds, and continuous 24/7 reliability engineering.',
    deliverables: [
      'Multi-region Terraform cloud infrastructure as code',
      'OpenTelemetry distributed tracing dashboards & PagerDuty alerts',
      'Complete disaster recovery playbook & operational SLA handover'
    ],
    timeframe: 'Week 15 onwards'
  }
];

export const coreValues: CoreValue[] = [
  {
    number: '01',
    title: 'Engineering Rigor Above All',
    description: 'We reject short-term shortcuts. Every system we build is designed for clean maintainability, absolute type safety, deterministic testing, and architectural longevity.',
    metric: '99.99% Architecture Target'
  },
  {
    number: '02',
    title: 'Radical Architectural Transparency',
    description: 'Clients have total access to code repositories, direct communication channels with senior engineers, and verifiable milestone benchmarks without vendor gatekeeping.',
    metric: '100% Client Code Ownership'
  },
  {
    number: '03',
    title: 'Security & Data Sovereignty First',
    description: 'Security is not an afterthought. We enforce zero-trust network models, cryptographic data isolation, and strict regulatory compliance from the first line of code.',
    metric: 'Zero-Trust Security Posture'
  },
  {
    number: '04',
    title: 'High-Velocity Iterative Delivery',
    description: 'By maintaining modern automated CI/CD pipelines and modular design systems, we accelerate time-to-market without ever compromising system stability.',
    metric: 'Bi-Weekly Deploy Cadence'
  },
  {
    number: '05',
    title: 'Global Scalability by Default',
    description: 'From distributed databases to edge CDN routing, our solutions are engineered from day one to operate reliably across global regions and diverse network latencies.',
    metric: 'Global Multi-Region Topology'
  }
];

export const whyChooseNexoraPoints = [
  {
    title: 'Senior Engineering Teams',
    description: 'Direct engagement with senior software architects and systems engineers—no hand-offs to junior pools or outsourced subcontracting layers.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Full Intellectual Property Ownership',
    description: 'You retain 100% of all intellectual property, source code repositories, design tokens, and infrastructure configurations with zero vendor lock-in.',
    icon: 'Key'
  },
  {
    title: 'Modern Type-Safe Stack',
    description: 'We leverage modern, verified technologies—TypeScript, Rust, Go, Python, React, and Kubernetes—ensuring longevity and talent availability.',
    icon: 'Layers'
  },
  {
    title: 'Mission-Critical SLA Mindset',
    description: 'Our software powers enterprise workflows where downtime directly equals financial loss. High availability and automated failover are built in.',
    icon: 'Activity'
  },
  {
    title: 'Deterministic AI & Modern Cloud',
    description: 'We integrate practical, grounded AI and automated cloud pipelines that solve tangible operational challenges rather than superficial demos.',
    icon: 'Zap'
  },
  {
    title: 'Global Delivery & Clear Communication',
    description: 'Clear, structured technical documentation, asynchronous project management, and overlapping collaboration hours for international partners.',
    icon: 'Globe'
  }
];

export const verifiedEngagementNotes: VerifiedEngagementNote[] = [
  {
    id: 'note-1',
    clientIndustry: 'Global Financial Services & Digital Asset Infrastructure',
    geographicRegion: 'North American Enterprise Client',
    scopeSummary: 'Sub-millisecond market execution pipeline & distributed orderbook reconciliation engine',
    verifiedFeedback: 'Nexora delivered an ultra-low latency data pump that handled our peak transaction volume with zero dropouts. Their architectural discipline and adherence to type safety was evident throughout.',
    complianceNotice: 'Direct client identity protected under mutual commercial NDA. Architectural case study available upon verified qualified inquiry.',
    engagementYear: '2024–2025'
  },
  {
    id: 'note-2',
    clientIndustry: 'Healthcare & Clinical Diagnostic Operations',
    geographicRegion: 'European Union Health Technology Group',
    scopeSummary: 'Offline-first tablet charting suite with hardware biometric authentication & cryptographic synchronization',
    verifiedFeedback: 'The offline synchronization resilience built by the Nexora team exceeded our hospital network stress tests. They engineered our solution with precision and deep attention to regulatory compliance.',
    complianceNotice: 'Client confidentiality maintained per health sector data governance guidelines.',
    engagementYear: '2024'
  },
  {
    id: 'note-3',
    clientIndustry: 'Supply Chain Logistics & Global Fleet Telematics',
    geographicRegion: 'Asia-Pacific Multi-National Logistics Corporation',
    scopeSummary: 'Predictive fleet routing platform & real-time IoT telemetry ingestion cluster',
    verifiedFeedback: 'Moving from legacy monoliths to Nexora\'s event-driven Kubernetes architecture dropped our processing latency by more than half while cutting compute infrastructure overhead by 30%.',
    complianceNotice: 'Verified enterprise client engagement summary.',
    engagementYear: '2025'
  }
];
