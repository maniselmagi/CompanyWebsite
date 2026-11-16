import type { PortfolioItem } from '../types';

export const portfolioData: PortfolioItem[] = [
  {
    id: 'telemetry-core',
    title: 'Nexora TelemetryCore',
    tagline: 'Global Multi-Region Cloud Observability & Anomaly Prevention Engine',
    domain: 'Enterprise Cloud Infrastructure & Distributed Systems',
    category: 'Cloud Infrastructure',
    isDemonstration: true,
    demonstrationNotice: 'Representative Demonstration Architecture — Engineered by Nexora to showcase multi-cluster Kubernetes observability & real-time telemetry processing.',
    summary: 'A high-throughput distributed observability platform processing over 12 million events per second across multi-cloud clusters with predictive anomaly mitigation and automated self-healing.',
    challenge: 'Enterprises managing hybrid multi-cloud topologies face fragmented log streams, alert fatigue, and delayed root-cause identification during critical production service outages.',
    solution: 'Nexora engineered an ultra-fast event streaming engine utilizing Rust-based ingestion daemons, Apache Kafka partitioning, and vector-accelerated time-series indexing with automated remediation webhooks.',
    results: [
      { metric: '99.999%', label: 'Infrastructure Uptime Target' },
      { metric: '< 18ms', label: 'Global Event Processing Latency' },
      { metric: '64%', label: 'Incident Resolution Acceleration' },
      { metric: '12M+/s', label: 'Peak Ingestion Event Capacity' }
    ],
    technologies: ['Rust', 'Go', 'Apache Kafka', 'ClickHouse', 'Kubernetes', 'TypeScript', 'React', 'OpenTelemetry'],
    architectureLayers: [
      { layer: 'Ingestion Layer', detail: 'Edge Rust daemons aggregating kernel-level eBPF network telemetry' },
      { layer: 'Streaming Pipeline', detail: 'Distributed partitioned Kafka topics with Snappy compression' },
      { layer: 'Analytical Storage', detail: 'Columnar ClickHouse cluster supporting petabyte-scale ad-hoc queries' },
      { layer: 'Presentation Layer', detail: 'Sub-60fps WebGL canvas visualizations with sub-second live state synchronization' }
    ],
    mockupData: {
      systemStatus: 'Optimal (All 18 Global Edge Hubs Operational)',
      throughput: '12.4M msg/sec',
      latency: '14.2 ms',
      uptime: '99.998%',
      activeNodes: 142,
      activityFeed: [
        { timestamp: '13:14:02.812', event: 'Cluster [us-east-prod-04] automated pod auto-scale triggered (+12 replicas)', status: 'success' },
        { timestamp: '13:13:58.114', event: 'eBPF synthetic trace verified zero packet drops across Frankfurt transit link', status: 'verified' },
        { timestamp: '13:13:42.508', event: 'Database pool partition re-balanced in 1.4s with zero client transaction loss', status: 'success' },
        { timestamp: '13:13:11.902', event: 'Memory pressure anomaly mitigated via predictive garbage collection tune', status: 'verified' }
      ]
    }
  },
  {
    id: 'omni-trade',
    title: 'Nexora OmniTrade Analytics',
    tagline: 'Sub-Millisecond Institutional Financial Analytics & Risk Engine',
    domain: 'Fintech & Quantitative Trading Systems',
    category: 'Enterprise SaaS',
    isDemonstration: true,
    demonstrationNotice: 'Representative Demonstration Architecture — Designed to illustrate high-concurrency order book rendering, automated risk hedges, and financial streaming.',
    summary: 'An institutional-grade portfolio risk and market execution terminal delivering real-time scenario stress-testing, live order book depth visualization, and cross-asset regulatory auditing.',
    challenge: 'Financial institutions encounter significant latency jitter and data desynchronization when rendering hundreds of thousands of concurrent market updates on web and native desktop terminals.',
    solution: 'Designed an in-memory ring-buffer data pump in C++ and Go, feeding high-density React frontends via multiplexed binary WebSockets with zero-garbage rendering cycles.',
    results: [
      { metric: '< 2.4ms', label: 'End-to-End Tick Render Time' },
      { metric: '100%', label: 'Zero-Desync Tick Integrity' },
      { metric: '400k+', label: 'Concurrent Order Stream Processing' },
      { metric: 'SOC 2', label: 'Type II Auditable Architecture' }
    ],
    technologies: ['Go', 'TypeScript', 'WebSockets', 'TailwindCSS', 'Redis', 'PostgreSQL', 'Docker'],
    architectureLayers: [
      { layer: 'Market Data Pump', detail: 'Multiplexed binary WebSocket channels with delta-compression encoding' },
      { layer: 'Risk Calculation Engine', detail: 'Real-time Value-at-Risk (VaR) Monte Carlo simulation nodes' },
      { layer: 'Audit Ledger', detail: 'Immutable append-only write logs for regulatory traceability' },
      { layer: 'Frontend Virtualization', detail: 'Off-screen DOM rendering capable of displaying 20,000 live depth rows without frame drops' }
    ],
    mockupData: {
      systemStatus: 'High Concurrency Stream Active',
      throughput: '348,200 ops/s',
      latency: '2.1 ms',
      uptime: '100.00%',
      activeNodes: 64,
      activityFeed: [
        { timestamp: '13:14:15.011', event: 'Cross-currency hedge executed across Tokyo and London liquidity pools', status: 'success' },
        { timestamp: '13:14:09.432', event: 'Dynamic margin risk tolerance validated for tier-1 liquidity account', status: 'verified' },
        { timestamp: '13:13:50.210', event: 'Binary WebSocket channel latency benchmark: 1.8ms median', status: 'verified' },
        { timestamp: '13:13:22.990', event: 'Automated compliance checkpoint generated for SEC/ESMA regulatory stream', status: 'success' }
      ]
    }
  },
  {
    id: 'cognitive-doc',
    title: 'Nexora CognitiveDoc AI',
    tagline: 'Autonomous Enterprise Multi-Agent Semantic RAG Intelligence Suite',
    domain: 'Enterprise Artificial Intelligence & Knowledge Discovery',
    category: 'AI & ML',
    isDemonstration: true,
    demonstrationNotice: 'Representative Demonstration Architecture — Showcases privacy-first enterprise RAG with verifiable source citations and autonomous tool-execution agent loops.',
    summary: 'A secure artificial intelligence platform enabling global enterprises to query, synthesize, and extract structured business intelligence from millions of unstructured enterprise contracts, engineering specifications, and regulatory archives.',
    challenge: 'Off-the-shelf LLMs frequently hallucinate, lack domain context, and pose severe intellectual property leakage risks when querying proprietary enterprise documentation.',
    solution: 'Engineered an isolated VPC-hosted multi-agent architecture featuring hybrid sparse/dense vector search, verifiable citation grounding, automated confidence thresholds, and deterministic schema enforcement.',
    results: [
      { metric: '98.7%', label: 'Factual Citation Accuracy' },
      { metric: '0%', label: 'External Data Exposure (100% VPC Sandboxed)' },
      { metric: '78%', label: 'Legal Contract Review Time Reduction' },
      { metric: '3.2M+', label: 'Documents Indexed Across Formats' }
    ],
    technologies: ['Python', 'FastAPI', 'pgvector', 'PyTorch', 'Next.js', 'TailwindCSS', 'Milvus', 'LangGraph'],
    architectureLayers: [
      { layer: 'Ingestion & OCR', detail: 'Multi-modal document chunking with spatial table preservation and metadata tagging' },
      { layer: 'Vector Embedding', detail: 'Domain-tuned embedding vectors stored in indexed pgvector & Milvus clusters' },
      { layer: 'Multi-Agent Supervisor', detail: 'Autonomous query decomposer routing requests to specialized verification agents' },
      { layer: 'Guardrail Enforcement', detail: 'Semantic filter layers checking outputs against strict compliance and privacy rules' }
    ],
    mockupData: {
      systemStatus: 'Multi-Agent Sandbox Operational',
      throughput: '1,420 doc/min',
      latency: '240 ms',
      uptime: '99.98%',
      activeNodes: 32,
      activityFeed: [
        { timestamp: '13:14:06.120', event: 'Multi-jurisdiction compliance audit completed across 840 vendor agreements', status: 'success' },
        { timestamp: '13:13:48.330', event: 'Citation verification engine validated 100% factual provenance for query response', status: 'verified' },
        { timestamp: '13:13:30.912', event: 'Autonomous vector re-indexing completed with zero read-lock interruptions', status: 'success' },
        { timestamp: '13:13:02.100', event: 'Privacy guardrail scrubbed 4 PII entity patterns before inference delivery', status: 'verified' }
      ]
    }
  },
  {
    id: 'care-pulse',
    title: 'Nexora CarePulse Mobile',
    tagline: 'Offline-First Mission-Critical Clinical Operations & Telehealth Mobile Suite',
    domain: 'Healthcare Technology & Mobile Engineering',
    category: 'Fintech & Mobile',
    isDemonstration: true,
    demonstrationNotice: 'Representative Demonstration Architecture — Designed to demonstrate HIPAA-compliant offline-first mobile synchronization with biometric verification.',
    summary: 'A resilient mobile clinical application built for healthcare practitioners operating in demanding hospital environments and rural clinics with intermittent network connectivity.',
    challenge: 'Clinical staff operating in complex physical environments experience signal dropouts that disrupt patient charting and risk data corruption or critical notification delays.',
    solution: 'Constructed an offline-first mobile application utilizing local SQLCipher encryption, automated CRDT conflict resolution, biometric multi-factor login, and background delta syncing.',
    results: [
      { metric: '100%', label: 'Offline Functional Continuity' },
      { metric: '0ms', label: 'Input Lag During Patient Charting' },
      { metric: 'HIPAA', label: 'Strict Security & Cryptographic Compliance' },
      { metric: '60 FPS', label: 'Fluid Gesture Navigation' }
    ],
    technologies: ['Swift', 'Kotlin', 'React Native', 'SQLCipher', 'WebRTC', 'TypeScript', 'Node.js'],
    architectureLayers: [
      { layer: 'Cryptographic Storage', detail: 'AES-256 encrypted SQLite database utilizing hardware Secure Enclave biometric keys' },
      { layer: 'Conflict Resolution', detail: 'State-based Conflict-Free Replicated Data Types (CRDTs) handling async reconciliations' },
      { layer: 'Real-Time Telehealth', detail: 'End-to-end encrypted WebRTC audio/video channels with dynamic bitrate adaption' },
      { layer: 'Background Worker', detail: 'Exponential backoff delta syncing activating seamlessly when network recovers' }
    ],
    mockupData: {
      systemStatus: 'Local Encrypted DB Sync Ready',
      throughput: '8,400 syncs/sec',
      latency: '12 ms local',
      uptime: '99.999%',
      activeNodes: 12,
      activityFeed: [
        { timestamp: '13:14:10.512', event: 'Encrypted delta sync completed across 1,240 bedside charting units', status: 'success' },
        { timestamp: '13:13:55.201', event: 'Biometric Face ID token rotated via Secure Enclave key derivation', status: 'verified' },
        { timestamp: '13:13:25.778', event: 'Offline CRDT conflict successfully resolved with automatic timestamp arbitration', status: 'success' },
        { timestamp: '13:13:00.320', event: 'Secure WebRTC consultation channel initialized with DTLS-SRTP encryption', status: 'verified' }
      ]
    }
  }
];
