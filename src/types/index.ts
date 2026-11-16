export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  benefits: string[];
  keyCapabilities: string[];
  architectureHighlights: string[];
  deliveryTimeline: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  tagline: string;
  domain: string;
  category: 'Enterprise SaaS' | 'AI & ML' | 'Cloud Infrastructure' | 'Fintech & Mobile';
  isDemonstration: boolean;
  demonstrationNotice: string;
  summary: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    label: string;
  }[];
  technologies: string[];
  architectureLayers: {
    layer: string;
    detail: string;
  }[];
  mockupData: {
    systemStatus: string;
    throughput: string;
    latency: string;
    uptime: string;
    activeNodes: number;
    activityFeed: {
      timestamp: string;
      event: string;
      status: 'success' | 'processing' | 'verified';
    }[];
  };
}

export interface DevProcessStep {
  stepNumber: string;
  title: string;
  phase: string;
  description: string;
  deliverables: string[];
  timeframe: string;
}

export interface CoreValue {
  number: string;
  title: string;
  description: string;
  metric: string;
}

export interface VerifiedEngagementNote {
  id: string;
  clientIndustry: string;
  geographicRegion: string;
  scopeSummary: string;
  verifiedFeedback: string;
  complianceNotice: string;
  engagementYear: string;
}

