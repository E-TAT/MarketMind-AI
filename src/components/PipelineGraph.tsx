import React from 'react';
import { 
  PipelineNode, 
  CampaignSummary, 
  CreativeVariant 
} from '../types/agent';
import { 
  Zap, 
  ArrowRight, 
  Clock, 
  Hash, 
  ExternalLink, 
  Sliders, 
  CheckCircle2, 
  Eye, 
  Sparkles,
  TrendingUp,
  DollarSign,
  Layers,
  ChevronRight
} from 'lucide-react';

interface PipelineGraphProps {
  nodes: PipelineNode[];
  selectedNode: PipelineNode | null;
  onSelectNode: (node: PipelineNode) => void;
  campaign: CampaignSummary;
  isTriggering: boolean;
  activeVariants: CreativeVariant[];
  onOpenCreativeTab: () => void;
}

export const PipelineGraph: React.FC<PipelineGraphProps> = ({
  nodes,
  selectedNode,
  onSelectNode,
  campaign,
  isTriggering,
  activeVariants,
  onOpenCreativeTab
}) => {
  return (
    <div className="space-y-6">
      {/* High-Precision Operational Metrics Deck */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Blended CPA */}
        <div className="p-3.5 rounded-lg bg-[#111827] border border-[#1e293b] relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-[#8c909f] mb-1">
            <span className="font-medium">BLENDED CPA</span>
            <span className="text-[10px] font-mono text-[#10b981]">-18.4% WoW</span>
          </div>
          <div className="font-mono text-2xl font-semibold tracking-tight text-[#dfe2f1]">
            ${campaign.blendedCpa.toFixed(2)}
          </div>
          <div className="mt-1 text-[11px] text-[#8c909f] flex items-center justify-between">
            <span>Target Cap: $18.00</span>
            <span className="text-[#10b981]">Nominal</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#10b981]/50 to-transparent" />
        </div>

        {/* Total Conversions */}
        <div className="p-3.5 rounded-lg bg-[#111827] border border-[#1e293b] relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-[#8c909f] mb-1">
            <span className="font-medium">CONVERSIONS</span>
            <span className="text-[10px] font-mono text-[#3b82f6]">+34% WoW</span>
          </div>
          <div className="font-mono text-2xl font-semibold tracking-tight text-[#dfe2f1]">
            {campaign.totalConversions.toLocaleString()}
          </div>
          <div className="mt-1 text-[11px] text-[#8c909f] flex items-center justify-between">
            <span>Spend: ${campaign.spendToday.toLocaleString()}</span>
            <span className="text-[#3b82f6]">Active</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#3b82f6]/50 to-transparent" />
        </div>

        {/* ROAS Metric */}
        <div className="p-3.5 rounded-lg bg-[#111827] border border-[#1e293b] relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-[#8c909f] mb-1">
            <span className="font-medium">EFFICIENCY (ROAS)</span>
            <span className="text-[10px] font-mono text-[#8b5cf6]">Target 3.0x</span>
          </div>
          <div className="font-mono text-2xl font-semibold tracking-tight text-[#adc6ff]">
            {campaign.roas.toFixed(2)}x
          </div>
          <div className="mt-1 text-[11px] text-[#8c909f] flex items-center justify-between">
            <span>High Return Tier</span>
            <span className="text-[#8b5cf6]">Optimal</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#8b5cf6]/50 to-transparent" />
        </div>

        {/* Creative Iterations */}
        <div className="p-3.5 rounded-lg bg-[#111827] border border-[#1e293b] relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-[#8c909f] mb-1">
            <span className="font-medium">ITERATIONS RUN</span>
            <span className="text-[10px] font-mono text-[#4edea3]">Autonomous</span>
          </div>
          <div className="font-mono text-2xl font-semibold tracking-tight text-[#dfe2f1]">
            {campaign.activeIterations}
          </div>
          <div className="mt-1 text-[11px] text-[#8c909f] flex items-center justify-between">
            <span>4 Active Channels</span>
            <span className="text-[#4edea3] font-mono text-[10px]">Synced</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#4edea3]/50 to-transparent" />
        </div>
      </div>

      {/* Autonomous Pipeline Graph Section */}
      <div className="rounded-xl bg-[#111827] border border-[#1e293b] p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-[#1e293b]">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold tracking-tight text-[#dfe2f1]">
                Autonomous Marketing Execution Pipeline
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0b0f19] text-[#adc6ff] border border-[#1e293b]">
                Deterministic Flow
              </span>
            </div>
            <p className="text-xs text-[#8c909f] mt-0.5">
              4 autonomous stages continuously discover signals, synthesize ad copy, dispatch payloads, and guard pacing.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#8c909f] text-[11px]">Click any stage to inspect state</span>
          </div>
        </div>

        {/* Desktop / Tablet Grid with animated connectors */}
        <div className="relative">
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-[2px] z-0 pointer-events-none">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <line 
                x1="0%" 
                y1="50%" 
                x2="100%" 
                y2="50%" 
                stroke="#1e293b" 
                strokeWidth="2" 
              />
              <line 
                x1="0%" 
                y1="50%" 
                x2="100%" 
                y2="50%" 
                stroke="url(#pipelineGradient)" 
                strokeWidth="2" 
                className="pipeline-flowing"
              />
              <defs>
                <linearGradient id="pipelineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* 4 Pipeline Node Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {nodes.map((node, index) => {
              const isSelected = selectedNode?.id === node.id;
              const isRunning = isTriggering || node.status === 'RUNNING' || node.status === 'REASONING';

              return (
                <div
                  key={node.id}
                  onClick={() => onSelectNode(node)}
                  className={`
                    group cursor-pointer rounded-lg p-3.5 border transition-all duration-200
                    ${isSelected 
                      ? 'bg-[#1e293b] border-[#3b82f6] shadow-[0_0_20px_-4px_rgba(59,130,246,0.3)]' 
                      : 'bg-[#0f131d] hover:bg-[#171b26] border-[#1e293b] hover:border-[#334155]'}
                    ${isRunning && !isSelected ? 'shadow-[0_0_16px_-4px_rgba(59,130,246,0.18)]' : ''}
                  `}
                >
                  {/* Card Header: Node Code & Status */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[11px] font-semibold text-[#adc6ff] px-2 py-0.5 rounded bg-[#111827] border border-[#1e293b]">
                      {node.code}
                    </span>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono">
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        node.status === 'RUNNING' || isRunning ? 'bg-[#3b82f6] animate-ping' :
                        node.status === 'CONVERGED' ? 'bg-[#10b981]' :
                        node.status === 'WARNING' ? 'bg-[#f59e0b]' : 'bg-[#8c909f]'
                      }`} />
                      <span className={
                        node.status === 'RUNNING' || isRunning ? 'text-[#adc6ff]' :
                        node.status === 'CONVERGED' ? 'text-[#10b981]' :
                        node.status === 'WARNING' ? 'text-[#f59e0b]' : 'text-[#8c909f]'
                      }>
                        {isRunning ? 'STREAMING' : node.status}
                      </span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xs font-semibold text-[#dfe2f1] group-hover:text-[#adc6ff] transition-colors leading-snug">
                    {node.title}
                  </h3>
                  <p className="text-[11px] text-[#8c909f] truncate mt-0.5 mb-3">
                    {node.subtitle}
                  </p>

                  {/* Micro Telemetry Bar */}
                  <div className="grid grid-cols-2 gap-1.5 py-2 px-2.5 rounded bg-[#111827] border border-[#1e293b] text-[10px] font-mono mb-3">
                    <div className="text-[#8c909f]">
                      Latency: <span className="text-[#dfe2f1]">{node.latencyMs}ms</span>
                    </div>
                    <div className="text-[#8c909f] text-right">
                      Tokens: <span className="text-[#dfe2f1]">{node.tokensProcessed}</span>
                    </div>
                  </div>

                  {/* Node Key Metric */}
                  <div className="space-y-1 mb-3">
                    {node.metrics.slice(0, 2).map((m, i) => (
                      <div key={i} className="flex items-center justify-between text-[11px]">
                        <span className="text-[#8c909f]">{m.label}</span>
                        <span className="font-mono text-[#dfe2f1] font-medium">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Link Footer */}
                  <div className="pt-2 border-t border-[#1e293b] flex items-center justify-between text-[11px]">
                    <span className="text-[#8c909f] text-[10px] font-mono">
                      {node.lastExecution}
                    </span>
                    <span className="text-[#3b82f6] group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-medium">
                      Inspect
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Live Dispatched Ad Variants Spotlight */}
      <div className="rounded-xl bg-[#111827] border border-[#1e293b] p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-[#1e293b]">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-semibold tracking-tight text-[#dfe2f1]">
              Live Dispatched Marketing Variants
            </h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#10b981]/10 text-[#4edea3] border border-[#10b981]/30">
              Active In-Flight
            </span>
          </div>
          <button
            onClick={onOpenCreativeTab}
            className="text-xs text-[#3b82f6] hover:text-[#adc6ff] flex items-center gap-1 font-medium"
          >
            Creative Matrix Studio
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {activeVariants.slice(0, 3).map((variant) => (
            <div 
              key={variant.id}
              className="p-3.5 rounded-lg bg-[#0b0f19] border border-[#1e293b] hover:border-[#334155] transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-[#adc6ff] font-medium uppercase tracking-wider">
                  {variant.channel.replace('_', ' ')}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20">
                  {variant.predictedCtr} CTR (pred)
                </span>
              </div>
              <h4 className="text-xs font-semibold text-[#dfe2f1] line-clamp-1 mb-1">
                {variant.headline}
              </h4>
              <p className="text-[11px] text-[#8c909f] line-clamp-2 mb-3">
                {variant.primaryText}
              </p>
              <div className="flex items-center justify-between text-[10px] font-mono pt-2 border-t border-[#1e293b]">
                <span className="text-[#8c909f]">
                  CPA: <span className="text-[#dfe2f1]">${variant.cpa.toFixed(2)}</span>
                </span>
                <span className="text-[#8c909f]">
                  Conv: <span className="text-[#dfe2f1]">{variant.conversions}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
