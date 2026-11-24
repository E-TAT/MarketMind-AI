export type AgentStatus = 'RUNNING' | 'REASONING' | 'CONVERGED' | 'PAUSED' | 'WARNING';

export type NavTab = 'pipeline' | 'creative' | 'channels' | 'guardrails' | 'logs';

export type ChannelType = 'google_search' | 'meta_ads' | 'linkedin' | 'x_twitter' | 'email';

export interface PipelineNode {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  status: AgentStatus;
  latencyMs: number;
  tokensProcessed: number;
  lastExecution: string;
  description: string;
  metrics: {
    label: string;
    value: string;
  }[];
  inputArtifact: string;
  outputArtifact: string;
  hyperparameters: Record<string, string | number | boolean>;
}

export interface CreativeVariant {
  id: string;
  channel: ChannelType;
  headline: string;
  primaryText: string;
  callToAction: string;
  predictedCtr: string;
  confidenceScore: number;
  hookAngle: string;
  status: 'ACTIVE_DEPLOYED' | 'TESTING' | 'PRUNED' | 'DRAFT';
  impressions: number;
  conversions: number;
  cpa: number;
}

export interface ChannelPerformance {
  id: ChannelType;
  name: string;
  iconName: string;
  status: 'ACTIVE' | 'OPTIMIZING' | 'PAUSED';
  dailyBudget: number;
  recommendedBudget: number;
  roas: number;
  cpa: number;
  activeVariants: number;
  totalConversions: number;
  spendToday: number;
}

export interface GuardrailSettings {
  maxDailySpend: number;
  targetCpaThreshold: number;
  minConfidenceScore: number;
  autonomyMode: 'FULL_AUTONOMOUS' | 'REVIEW_BEFORE_DEPLOY';
  brandTone: 'Pragmatic & Authoritative' | 'High-Velocity & Urgent' | 'Technical & Concise' | 'Benefit-Driven';
  negativeKeywords: string[];
  maxVariationsPerChannel: number;
  autoRebalanceBudget: boolean;
}

export interface TelemetryLog {
  id: string;
  timestamp: string;
  nodeCode: string;
  type: 'INTENT' | 'SYNTH' | 'DISPATCH' | 'OPTIMIZE' | 'GUARD' | 'ALERT';
  message: string;
  metric?: string;
  level: 'info' | 'success' | 'warning' | 'alert';
}

export interface CampaignSummary {
  id: string;
  name: string;
  targetAudience: string;
  productName: string;
  blendedCpa: number;
  totalConversions: number;
  roas: number;
  activeIterations: number;
  spendToday: number;
  cycleCount: number;
}
