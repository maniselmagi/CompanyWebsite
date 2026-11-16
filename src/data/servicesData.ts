import type { ServiceItem } from '../types';

export const servicesData: ServiceItem[] = [
  {
    id: 'custom-software',
    title: 'Custom Software Development',
    subtitle: 'Tailored enterprise engines built for high concurrency and domain precision',
    shortDescription: 'Architecting bespoke enterprise systems, distributed backends, and proprietary software engines engineered to solve specific operational bottlenecks and power scalable global business workflows.',
    fullDescription: 'Off-the-shelf software inevitably hits architectural walls when scaled across multi-region enterprise operations. Nexora designs and builds custom software from the kernel up—incorporating clean domain-driven design, modular microservices or modular monoliths, strict schema governance, and fault-tolerant event streaming.',
    iconName: 'Cpu',
    benefits: [
      'Zero vendor lock-in with 100% proprietary code ownership and IP transfer',
      'Engineered specifically to match unique high-complexity enterprise business logic',
      'Sub-millisecond data pipelines and resilient asynchronous processing queues',
      'Rigorous automated integration test coverage exceeding 90% across services'
    ],
    keyCapabilities: [
      'High-throughput distributed backend architectures (Go, Rust, Node.js, Python)',
      'Enterprise workflow automation and legacy system modernization',
      'Custom API gateways, gRPC microservices, and event-driven architectures (Kafka/RabbitMQ)',
      'High-security data processing engines compliant with SOC 2 & ISO 27001'
    ],
    architectureHighlights: [
      'Domain-Driven Design (DDD) with hexagonal ports-and-adapters architecture',
      'Event-sourcing and CQRS patterns for auditable financial and transactional logs',
      'Zero-downtime blue/green deployment topology with automated rollback triggers'
    ],
    deliveryTimeline: 'Typical milestone discovery to initial production deployment: 8–16 weeks'
  },
  {
    id: 'web-applications',
    title: 'Web Application Development',
    subtitle: 'Next-generation web applications with instant rendering and real-time synchronization',
    shortDescription: 'Building resilient, ultra-responsive web applications and SaaS platforms powered by modern single-page and server-driven frameworks, real-time WebSockets, and global edge CDNs.',
    fullDescription: 'Modern web applications require the responsiveness of desktop software coupled with the ubiquity of the browser. Nexora architects enterprise-grade web applications utilizing modern component frameworks, edge compute caching, and optimistic UI updates for instantaneous user interactions.',
    iconName: 'Globe',
    benefits: [
      'Lighthouse 95+ performance scores and sub-second Largest Contentful Paint (LCP)',
      'End-to-end type safety from database models to frontend state machines',
      'Seamless collaborative multi-user workflows powered by WebSockets and CRDTs',
      'Bank-grade client security with robust CSRF, CSP, and role-based access control (RBAC)'
    ],
    keyCapabilities: [
      'Enterprise SaaS platforms, analytics dashboards, and B2B portals',
      'Progressive Web Apps (PWAs) with offline-first local synchronization',
      'High-performance data visualization engines rendering 100,000+ points at 60fps',
      'Comprehensive Design System implementations with accessible WCAG AAA compliance'
    ],
    architectureHighlights: [
      'Multi-tenant database isolation strategies (tenant schema or row-level security)',
      'Global edge caching and edge middleware execution via Cloudflare / AWS CloudFront',
      'State-of-the-art state machines preventing inconsistent client-side UI states'
    ],
    deliveryTimeline: 'Initial MVP release in 6–10 weeks; continuous quarterly iteration cycles'
  },
  {
    id: 'mobile-app-development',
    title: 'Mobile App Development',
    subtitle: 'Native and cross-platform mobile experiences that captivate global users',
    shortDescription: 'Developing high-performance iOS and Android applications utilizing native Swift/Kotlin and cross-platform frameworks, delivering fluid 120Hz gesture physics, offline resilience, and secure biometric authentication.',
    fullDescription: 'From consumer finance to field operations, mobile apps represent the direct frontline of your enterprise brand. Nexora delivers native and hybrid mobile solutions characterized by tactile haptic feedback, instantaneous launch times, robust offline caching, and seamless biometric security integrations.',
    iconName: 'Smartphone',
    benefits: [
      'Uniform 60–120 FPS interface rendering with micro-interaction polishing',
      'Offline-first operational architecture with seamless delta synchronization',
      'Automated App Store and Google Play continuous deployment CI/CD pipelines',
      'Strict battery, memory, and telemetry footprint optimization'
    ],
    keyCapabilities: [
      'Native iOS (Swift, SwiftUI) and Native Android (Kotlin, Jetpack Compose)',
      'Cross-platform Flutter and React Native for rapid synchronized multi-OS rollouts',
      'Hardware integration: BLE, NFC, LiDAR, biometrics (Face ID / Fingerprint)',
      'In-app subscription infrastructure, secure payment gateways, and real-time push engines'
    ],
    architectureHighlights: [
      'Clean MVI / MVVM architectures with reactive unidirectional data streams',
      'Encrypted local SQLite/SQLCipher databases with cryptographic key rotation in Secure Enclave',
      'Deep link routing engines with contextual state restoration'
    ],
    deliveryTimeline: 'Dual-platform production release in 10–14 weeks'
  },
  {
    id: 'ai-machine-learning',
    title: 'AI & Machine Learning',
    subtitle: 'Production-ready AI systems, custom LLM fine-tuning, and deterministic agentic workflows',
    shortDescription: 'Transforming enterprise data into competitive moats through predictive machine learning models, retrieval-augmented generation (RAG) pipelines, computer vision, and autonomous agent systems.',
    fullDescription: 'Beyond simple AI prompts, Nexora engineers deterministic, secure, and explainable artificial intelligence platforms. We integrate custom vector search indexes, orchestrate autonomous multi-agent pipelines with guardrails, and train domain-specific models that maintain absolute data privacy inside your virtual private cloud.',
    iconName: 'Sparkles',
    benefits: [
      'Proprietary data stays 100% private with self-hosted models or zero-retention enterprise APIs',
      'Grounded retrieval pipelines eliminating hallucinations with strict citations',
      'Measurable operational automation yielding 40–70% manual task reduction',
      'Deterministic fallback systems ensuring business continuity when confidence scores dip'
    ],
    keyCapabilities: [
      'Retrieval-Augmented Generation (RAG) over millions of enterprise documents',
      'Autonomous multi-step agent systems with schema validation and tool-calling execution',
      'Predictive analytics, demand forecasting, and real-time anomaly detection',
      'Computer vision inspection pipelines and automated document semantic parsing'
    ],
    architectureHighlights: [
      'Hybrid semantic vector search + keyword BM25 retrieval over Milvus/Pinecone/pgvector',
      'Evaluation harnesses with automated synthetic benchmarks for accuracy and latency',
      'Model quantization (GGUF, TensorRT) for efficient on-premise GPU inference'
    ],
    deliveryTimeline: 'Proof of Concept in 3 weeks; production cluster integration in 8–12 weeks'
  },
  {
    id: 'cloud-solutions',
    title: 'Cloud Solutions',
    subtitle: 'Resilient multi-cloud topologies, Kubernetes orchestration, and automated DevOps pipelines',
    shortDescription: 'Designing immutable, self-healing cloud infrastructure on AWS, Google Cloud, and Azure using Infrastructure as Code (Terraform), zero-trust security postures, and cost-optimized auto-scaling.',
    fullDescription: 'Nexora engineers cloud architectures that never sleep. We transition legacy monoliths to elastic cloud native platforms, establish automated GitOps delivery pipelines, and enforce zero-trust security frameworks that safeguard critical business assets against modern cyber threats.',
    iconName: 'Cloud',
    benefits: [
      '99.99% high-availability SLA architectures with automated multi-zone failovers',
      'Cloud compute and storage cost reductions averaging 25–40% via rightsizing and spot fleets',
      'Instant disaster recovery with automated infrastructure re-creation via Terraform/OpenTofu',
      'Zero-trust network architecture with mutual TLS (mTLS) across all service communications'
    ],
    keyCapabilities: [
      'Kubernetes (EKS, GKE, AKS) cluster design and production operations',
      'Infrastructure as Code (Terraform, Pulumi, CloudFormation) with strict PR verification',
      'Continuous Integration & Continuous Deployment (CI/CD) with automated security scans',
      'Observability and distributed tracing suites (Datadog, OpenTelemetry, Prometheus, Grafana)'
    ],
    architectureHighlights: [
      'Immutable infrastructure deployment patterns with automated canary releases',
      'Zero-egress private subnets with centralized transit gateway routing',
      'Automated daily backup validation and point-in-time database restoration simulations'
    ],
    deliveryTimeline: 'Infrastructure migration or modernization within 6–12 weeks'
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    subtitle: 'Cognitive user experience architecture and cohesive enterprise design systems',
    shortDescription: 'Synthesizing complex enterprise workflows into intuitive, beautiful, and accessible digital interfaces that elevate user satisfaction and radically reduce operator error rates.',
    fullDescription: 'Exceptional enterprise software must be as intuitive to use as the world\'s best consumer apps. Nexora\'s design team conducts rigorous contextual user research, crafts interactive high-fidelity prototypes, and delivers comprehensive tokenized design systems that unify engineering and design teams.',
    iconName: 'Layout',
    benefits: [
      'Steep reduction in user onboarding time and user support tickets',
      'Comprehensive design token architecture accelerating frontend engineering velocity by 2x',
      'Pixel-perfect consistency across web, desktop, and mobile touchpoints',
      'Full compliance with international accessibility standards (WCAG 2.1 AA/AAA)'
    ],
    keyCapabilities: [
      'Complex enterprise workflow mapping, user journey synthesis, and wireframing',
      'Interactive Figma prototypes with advanced component variables and state variants',
      'Design System creation (tokens, component libraries, typography scales, iconography)',
      'Heuristic evaluation, accessibility audits, and quantitative usability validation'
    ],
    architectureHighlights: [
      'W3C-standard design token pipelines syncing Figma directly with Git codebases',
      'High-contrast dark and light modes with semantic palette structures',
      'Responsive multi-breakpoint grid layouts optimized for 4K desktop down to 320px mobile'
    ],
    deliveryTimeline: 'Design sprints: 4–8 weeks from wireframe to production-ready design tokens'
  }
];
