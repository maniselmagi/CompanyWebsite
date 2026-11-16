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
  category: 'Commercial Kiosk Systems' | 'Custom Software' | 'Web Applications' | 'Mobile & Touch UI';
  isRealProject: boolean;
  status: 'Production-Ready Prototype' | 'In Active Development' | 'Completed';
  liveDemoUrl?: string;
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
  completedFeatures: string[];
  inProgressFeatures: string[];
  realScreenshots?: {
    title: string;
    description: string;
    image: string;
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

export interface EngineeringStandard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  commitment: string;
  iconName: string;
}

