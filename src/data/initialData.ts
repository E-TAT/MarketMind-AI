import { PipelineNode, CreativeVariant, ChannelPerformance, GuardrailSettings, TelemetryLog, CampaignSummary } from '../types/agent';

export const INITIAL_CAMPAIGN: CampaignSummary = {
  id: 'CMP-APEX-2026',
  name: 'Apex SaaS · Q4 Autonomous Inbound Surge',
  targetAudience: 'DevOps Engineers, Cloud Architects & VP of Infrastructure',
  productName: 'Apex Flow - Cloud Cost & Performance Engine',
  blendedCpa: 14.20,
  totalConversions: 1428,
  roas: 3.84,
  activeIterations: 84,
  spendToday: 1840.50,
  cycleCount: 142
};

export const INITIAL_PIPELINE_NODES: PipelineNode[] = [
  {
    id: 'node-intent',
    code: 'AGT-INTENT-01',
    title: 'Market & Signal Discovery',
    subtitle: 'Search Queries & Competitor Delta',
    status: 'CONVERGED',
    latencyMs: 42,
    tokensProcessed: 840,
    lastExecution: '12s ago',
    description: 'Continuously queries search intent engines, competitor bidding surges, and developer search volume on Kubernetes and cloud egress cost reduction.',
    metrics: [
      { label: 'Intent Volume', value: '48.2k/day' },
      { label: 'Signal Quality', value: '98.4%' },
      { label: 'Trend Score', value: '+14.2%' }
    ],
    inputArtifact: 'Telemetry signals (Google Keyword stream, G2 competitor reviews, GitHub trending repos)',
    outputArtifact: 'Intent cluster JSON: ["AWS egress tax bypass", "k8s rightsizing automated", "cloud bill ceiling guard"]',
    hyperparameters: {
      discovery_depth: 3,
      semantic_threshold: 0.88,
      query_refresh_sec: 120
    }
  },
  {
    id: 'node-copy',
    code: 'AGT-COPY-02',
    title: 'Creative Matrix & Copy Synthesis',
    subtitle: 'Multi-Variant Ad & Hook Generator',
    status: 'RUNNING',
    latencyMs: 118,
    tokensProcessed: 2410,
    lastExecution: 'Just now',
    description: 'Autonomous copy generation matrix testing 4 psychological angles (Direct ROI, Developer Speed, Cost Anxiety, Social Proof) across all ad specs.',
    metrics: [
      { label: 'Active Angles', value: '4 matrices' },
      { label: 'Predicted CTR', value: '4.42%' },
      { label: 'Confidence', value: '94.8%' }
    ],
    inputArtifact: 'Synthesized intent clusters + Brand tone guidelines + Past winner CTR vectors',
    outputArtifact: '12 parsed variants with headline arrays, body copy, and target CTA buttons',
    hyperparameters: {
      model: 'gemini-2.5-flash',
      temperature: 0.45,
      variant_count: 3
    }
  },
  {
    id: 'node-dispatch',
    code: 'AGT-DISPATCH-03',
    title: 'Multi-Channel Dispatch',
    subtitle: 'Ad Placements & Payload Sync',
    status: 'CONVERGED',
    latencyMs: 85,
    tokensProcessed: 1120,
    lastExecution: '45s ago',
    description: 'Deploys structured creative payloads directly to Google Search Ads, Meta, LinkedIn Sponsored Content, and outbound drip flows.',
    metrics: [
      { label: 'Connected Endpoints', value: '4 channels' },
      { label: 'Sync Latency', value: '85ms' },
      { label: 'Deployment State', value: 'Synchronized' }
    ],
    inputArtifact: 'Validated creative variants + Target demographic audience filters',
    outputArtifact: 'Live Ad IDs dispatched: [GAD-9921, META-4102, LKD-7731, EML-2041]',
    hyperparameters: {
      retry_policy: 'exponential_3x',
      rate_limit_headroom: '40%',
      parallel_dispatch: true
    }
  },
  {
    id: 'node-guard',
    code: 'AGT-GUARD-04',
    title: 'Pacing & Anomaly Guard',
    subtitle: 'Budget Rebalancer & CPA Killswitch',
    status: 'CONVERGED',
    latencyMs: 24,
    tokensProcessed: 430,
    lastExecution: '3s ago',
    description: 'Enforces hard fiscal guardrails. Reallocates daily spend toward top-performing variants and halts underperformers exceeding $22.00 CPA.',
    metrics: [
      { label: 'Spend Pacing', value: '98.2% on-target' },
      { label: 'Pruned Today', value: '3 variants' },
      { label: 'Budget Shifted', value: '+$350.00' }
    ],
    inputArtifact: 'Real-time conversion callbacks, spend telemetry, CPA per variation',
    outputArtifact: 'Rebalanced weight vector: Google (+15%), LinkedIn (+10%), Meta (-25%)',
    hyperparameters: {
      hard_cpa_cap: 22.0,
      min_sample_size: 250,
      confidence_interval: 0.95
    }
  }
];

export const INITIAL_CREATIVE_VARIANTS: CreativeVariant[] = [
  {
    id: 'VAR-LKD-01',
    channel: 'linkedin',
    headline: 'Cut Cloud Spend by 38% Without Touching Infrastructure',
    primaryText: 'Stop overpaying AWS & GCP. Apex Flow autonomously rightsizes CPU governors and trims zombie workloads in real-time.',
    callToAction: 'Run Free 10-Min Audit',
    predictedCtr: '4.8%',
    confidenceScore: 96,
    hookAngle: 'Direct Fiscal ROI & Zero Friction',
    status: 'ACTIVE_DEPLOYED',
    impressions: 48200,
    conversions: 242,
    cpa: 12.80
  },
  {
    id: 'VAR-GAD-02',
    channel: 'google_search',
    headline: 'Eliminate 40 Hours of Weekly Manual Cloud Triage',
    primaryText: 'Give your engineering team their sprint back. Instant visibility into idle preview environments and over-provisioned nodes.',
    callToAction: 'Deploy in 5 Minutes',
    predictedCtr: '4.5%',
    confidenceScore: 94,
    hookAngle: 'Developer Velocity & Time Reclamation',
    status: 'ACTIVE_DEPLOYED',
    impressions: 62400,
    conversions: 318,
    cpa: 13.90
  },
  {
    id: 'VAR-META-03',
    channel: 'meta_ads',
    headline: 'Tired of End-of-Month Cloud Bill Shock?',
    primaryText: 'Surprise invoices kill engineering roadmaps. Let autonomous algorithms enforce deterministic cost fences with zero downtime.',
    callToAction: 'Set Up Cost Guardrails',
    predictedCtr: '4.1%',
    confidenceScore: 91,
    hookAngle: 'Acute Financial Anxiety Relief',
    status: 'ACTIVE_DEPLOYED',
    impressions: 39100,
    conversions: 184,
    cpa: 15.40
  },
  {
    id: 'VAR-EML-04',
    channel: 'email',
    headline: 'Why 420+ High-Growth Tech Teams Automated Their FinOps',
    primaryText: 'From seed stage to unicorn platforms, infrastructure teams trust our autonomous agent for 99.99% uptime and 30%+ cost reduction.',
    callToAction: 'Read Benchmark Case Studies',
    predictedCtr: '5.2%',
    confidenceScore: 95,
    hookAngle: 'Verifiable Peer Proof & Authority',
    status: 'ACTIVE_DEPLOYED',
    impressions: 14500,
    conversions: 98,
    cpa: 9.60
  },
  {
    id: 'VAR-XTW-05',
    channel: 'x_twitter',
    headline: 'Stop debugging Kubernetes memory leaks by hand at 2 AM',
    primaryText: 'Apex Flow predicts pod OOMKills 15 minutes before they happen and resizes limits without restarting services. Open telemetry ready.',
    callToAction: 'Check GitHub Quickstart',
    predictedCtr: '3.9%',
    confidenceScore: 89,
    hookAngle: 'On-Call Burnout Relief',
    status: 'TESTING',
    impressions: 18200,
    conversions: 64,
    cpa: 16.20
  },
  {
    id: 'VAR-PRUNE-06',
    channel: 'meta_ads',
    headline: 'Cheapest Cloud Optimizer On The Market',
    primaryText: 'Low price plans for everyone with simple setup and basic dashboard reporting.',
    callToAction: 'Sign Up Today',
    predictedCtr: '1.8%',
    confidenceScore: 68,
    hookAngle: 'Generic Cheap Commodity',
    status: 'PRUNED',
    impressions: 5400,
    conversions: 8,
    cpa: 27.50
  }
];

export const INITIAL_CHANNELS: ChannelPerformance[] = [
  {
    id: 'google_search',
    name: 'Google Search Ads',
    iconName: 'Search',
    status: 'ACTIVE',
    dailyBudget: 900,
    recommendedBudget: 1050,
    roas: 4.12,
    cpa: 13.40,
    activeVariants: 18,
    totalConversions: 542,
    spendToday: 820.00
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Sponsored (B2B)',
    iconName: 'Briefcase',
    status: 'ACTIVE',
    dailyBudget: 650,
    recommendedBudget: 750,
    roas: 4.60,
    cpa: 12.80,
    activeVariants: 12,
    totalConversions: 410,
    spendToday: 590.50
  },
  {
    id: 'meta_ads',
    name: 'Meta Ads (Insta & Feed)',
    iconName: 'Share2',
    status: 'OPTIMIZING',
    dailyBudget: 450,
    recommendedBudget: 350,
    roas: 2.95,
    cpa: 17.60,
    activeVariants: 10,
    totalConversions: 248,
    spendToday: 380.00
  },
  {
    id: 'email',
    name: 'Inbound Nurture & Email',
    iconName: 'Mail',
    status: 'ACTIVE',
    dailyBudget: 80,
    recommendedBudget: 100,
    roas: 6.80,
    cpa: 8.20,
    activeVariants: 6,
    totalConversions: 184,
    spendToday: 50.00
  }
];

export const INITIAL_GUARDRAILS: GuardrailSettings = {
  maxDailySpend: 2500,
  targetCpaThreshold: 18.00,
  minConfidenceScore: 85,
  autonomyMode: 'FULL_AUTONOMOUS',
  brandTone: 'Pragmatic & Authoritative',
  negativeKeywords: [
    'free hack',
    'cracked',
    'open source torrent',
    'cheap alternative',
    'unlimited free tier'
  ],
  maxVariationsPerChannel: 8,
  autoRebalanceBudget: true
};

export const INITIAL_LOGS: TelemetryLog[] = [
  {
    id: 'log-101',
    timestamp: '10:19:42',
    nodeCode: 'AGT-GUARD-04',
    type: 'OPTIMIZE',
    message: 'Reallocated $150 from Meta Ad #09 to LinkedIn B2B Ad #01 (ROAS 4.6x vs 2.9x)',
    metric: '+14% Projected Lift',
    level: 'success'
  },
  {
    id: 'log-102',
    timestamp: '10:18:15',
    nodeCode: 'AGT-COPY-02',
    type: 'SYNTH',
    message: 'Synthesized 3 new high-intent headline variants targeting "AWS egress tax bypass"',
    metric: '4.8% Predicted CTR',
    level: 'info'
  },
  {
    id: 'log-103',
    timestamp: '10:16:30',
    nodeCode: 'AGT-DISPATCH-03',
    type: 'DISPATCH',
    message: 'Dispatched 4 updated ad copy payloads to Google Ads API campaign CMP-APEX-2026',
    metric: '85ms roundtrip',
    level: 'info'
  },
  {
    id: 'log-104',
    timestamp: '10:14:02',
    nodeCode: 'AGT-GUARD-04',
    type: 'GUARD',
    message: 'Pruned low-performing Meta Ad VAR-PRUNE-06 (CPA reached $27.50, ceiling is $18.00)',
    metric: 'CPA Guard Triggered',
    level: 'warning'
  },
  {
    id: 'log-105',
    timestamp: '10:11:58',
    nodeCode: 'AGT-INTENT-01',
    type: 'INTENT',
    message: 'Detected +24% surge in search query volume for "kubernetes cost monitoring tool"',
    metric: 'Intent Cluster #04',
    level: 'info'
  },
  {
    id: 'log-106',
    timestamp: '10:09:12',
    nodeCode: 'AGT-GUARD-04',
    type: 'OPTIMIZE',
    message: 'Daily pacing check passed: Spend pacing at 98.2% of diurnal budget curve',
    metric: 'Nominal',
    level: 'info'
  }
];
