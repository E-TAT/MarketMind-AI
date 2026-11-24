import React, { useState } from 'react';
import { CreativeVariant, ChannelType } from '../types/agent';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Send, 
  Search, 
  Layers, 
  TrendingUp, 
  AlertCircle,
  RotateCw,
  Plus,
  Trash2,
  Play,
  Pause
} from 'lucide-react';

interface CreativeMatrixViewProps {
  variants: CreativeVariant[];
  onDeployVariant: (variant: CreativeVariant) => void;
  onToggleVariantStatus: (variantId: string) => void;
  onAddLog: (message: string, type: any, level: any) => void;
}

export const CreativeMatrixView: React.FC<CreativeMatrixViewProps> = ({
  variants,
  onDeployVariant,
  onToggleVariantStatus,
  onAddLog
}) => {
  // Generator states
  const [product, setProduct] = useState('Apex Flow - Cloud Cost & Performance Engine');
  const [audience, setAudience] = useState('DevOps Engineers and VP of Infrastructure');
  const [selectedChannel, setSelectedChannel] = useState<ChannelType>('linkedin');
  const [selectedAngle, setSelectedAngle] = useState<'roi' | 'speed' | 'pain_point' | 'social_proof'>('roi');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVariants, setGeneratedVariants] = useState<any[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter state for deployed table
  const [channelFilter, setChannelFilter] = useState<'all' | ChannelType>('all');

  const angles = [
    { id: 'roi', label: 'Fiscal ROI & Savings', desc: 'Direct cost reduction & payback velocity' },
    { id: 'speed', label: 'Developer Velocity', desc: 'Save 40hrs/week & eliminate on-call toil' },
    { id: 'pain_point', label: 'Cloud Bill Shock', desc: 'Anxiety relief over surprise Kubernetes bills' },
    { id: 'social_proof', label: 'Enterprise Authority', desc: '420+ unicorn tech teams trust benchmark' }
  ];

  const channels: { id: ChannelType; label: string }[] = [
    { id: 'linkedin', label: 'LinkedIn B2B' },
    { id: 'google_search', label: 'Google Search' },
    { id: 'meta_ads', label: 'Meta / Instagram' },
    { id: 'x_twitter', label: 'X / Twitter' },
    { id: 'email', label: 'Email Nurture' }
  ];

  const handleSynthesize = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product,
          audience,
          channel: selectedChannel,
          angle: selectedAngle
        })
      });

      const json = await response.json();
      if (json.success && json.data?.variants) {
        setGeneratedVariants(json.data.variants);
        onAddLog(
          `Synthesized 3 new ${selectedChannel} variants via ${json.source} (${json.latencyMs}ms)`,
          'SYNTH',
          'success'
        );
      }
    } catch (err) {
      console.error('Synthesis failed:', err);
      // Fallback local instant generator if network error
      const mockVariants = [
        {
          id: `VAR-GEN-${Date.now()}-1`,
          headline: `Slash Cloud Waste by 38% Without Code Refactors`,
          primaryText: `Engineered for ${audience}. Autonomous right-sizing for CPU & memory pools in real time.`,
          callToAction: 'Run Free 10-Min Diagnostic',
          predictedCtr: '4.7%',
          confidenceScore: 94,
          hookAngle: 'Direct Fiscal ROI & Zero Friction'
        },
        {
          id: `VAR-GEN-${Date.now()}-2`,
          headline: `Stop Overpaying AWS. Reclaim $14,000/Month in Zombie Pods`,
          primaryText: `Automate idle resource hibernation across staging and preview environments with zero downtime.`,
          callToAction: 'Calculate Savings',
          predictedCtr: '4.2%',
          confidenceScore: 91,
          hookAngle: 'Direct Waste Elimination'
        }
      ];
      setGeneratedVariants(mockVariants);
      onAddLog('Synthesized 2 fallback marketing variants', 'SYNTH', 'info');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeploy = (rawVariant: any) => {
    const newVariant: CreativeVariant = {
      id: rawVariant.id || `VAR-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      channel: selectedChannel,
      headline: rawVariant.headline,
      primaryText: rawVariant.primaryText,
      callToAction: rawVariant.callToAction,
      predictedCtr: rawVariant.predictedCtr || '4.3%',
      confidenceScore: rawVariant.confidenceScore || 92,
      hookAngle: rawVariant.hookAngle || 'Autonomous Angle',
      status: 'ACTIVE_DEPLOYED',
      impressions: 120,
      conversions: 4,
      cpa: 14.50
    };
    onDeployVariant(newVariant);
    onAddLog(`Dispatched new variant "${newVariant.headline.substring(0, 32)}..." to ${selectedChannel}`, 'DISPATCH', 'info');
  };

  const filteredVariants = channelFilter === 'all' 
    ? variants 
    : variants.filter(v => v.channel === channelFilter);

  return (
    <div className="space-y-6">
      {/* Top Banner / Generator Deck */}
      <div className="rounded-xl bg-[#111827] border border-[#1e293b] p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-[#1e293b]">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold tracking-tight text-[#dfe2f1]">
                Autonomous Creative Matrix & Copy Synthesis
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#3b82f6]/10 text-[#adc6ff] border border-[#3b82f6]/30">
                Multi-Variant Matrix
              </span>
            </div>
            <p className="text-xs text-[#8c909f] mt-0.5">
              Generate, score, and dispatch ad angles mapped to conversion psychology.
            </p>
          </div>
          <button
            onClick={handleSynthesize}
            disabled={isGenerating}
            className={`
              flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-medium text-white
              bg-[#3b82f6] hover:bg-[#2563eb] active:scale-[0.98]
              shadow-[0_0_14px_rgba(59,130,246,0.35)] transition-all
              ${isGenerating ? 'opacity-80 cursor-wait' : ''}
            `}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Reasoning & Synthesizing...' : 'Synthesize 3 Variants'}</span>
          </button>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-[11px] font-mono text-[#8c909f] uppercase mb-1">
              Target Product / Offer
            </label>
            <input
              type="text"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="w-full px-3 py-1.5 rounded-md bg-[#0b0f19] border border-[#1e293b] focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] text-xs text-[#dfe2f1] outline-none"
              placeholder="e.g. Apex Flow - Cloud Optimization"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-[#8c909f] uppercase mb-1">
              Target Demographic & Roles
            </label>
            <input
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full px-3 py-1.5 rounded-md bg-[#0b0f19] border border-[#1e293b] focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] text-xs text-[#dfe2f1] outline-none"
              placeholder="e.g. DevOps Leads and VP of Engineering"
            />
          </div>
        </div>

        {/* Channel & Psychological Angle Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-[#1e293b]">
          {/* Target Channel */}
          <div>
            <label className="block text-[11px] font-mono text-[#8c909f] uppercase mb-1.5">
              Channel Placement
            </label>
            <div className="flex flex-wrap gap-1.5">
              {channels.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => setSelectedChannel(ch.id)}
                  className={`px-2.5 py-1 rounded text-xs transition-colors ${
                    selectedChannel === ch.id
                      ? 'bg-[#1e293b] text-[#adc6ff] border border-[#3b82f6] font-medium'
                      : 'bg-[#0b0f19] text-[#8c909f] border border-[#1e293b] hover:text-[#dfe2f1]'
                  }`}
                >
                  {ch.label}
                </button>
              ))}
            </div>
          </div>

          {/* Psychological Angle */}
          <div>
            <label className="block text-[11px] font-mono text-[#8c909f] uppercase mb-1.5">
              Psychological Conversion Angle
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {angles.map((ang) => (
                <button
                  key={ang.id}
                  onClick={() => setSelectedAngle(ang.id as any)}
                  className={`p-1.5 text-left rounded text-xs transition-colors border ${
                    selectedAngle === ang.id
                      ? 'bg-[#1e293b] border-[#8b5cf6] text-[#dfe2f1]'
                      : 'bg-[#0b0f19] border-[#1e293b] text-[#8c909f] hover:text-[#dfe2f1]'
                  }`}
                >
                  <div className={`font-medium text-[11px] ${selectedAngle === ang.id ? 'text-[#adc6ff]' : ''}`}>
                    {ang.label}
                  </div>
                  <div className="text-[10px] text-[#8c909f] truncate">{ang.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Generated Variants Output (if any generated) */}
        {generatedVariants.length > 0 && (
          <div className="mt-5 pt-4 border-t border-[#1e293b]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[#dfe2f1] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#3b82f6]" />
                Freshly Synthesized Variations
              </span>
              <span className="text-[10px] font-mono text-[#10b981]">
                3 Matrix Variations Ready
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {generatedVariants.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg bg-[#0b0f19] border border-[#334155] shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-[#8b5cf6] font-semibold">
                        VAR-{idx + 1} · {item.hookAngle || 'Angle'}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20">
                        {item.predictedCtr} CTR
                      </span>
                    </div>
                    <h4 className="text-xs font-semibold text-[#dfe2f1] mb-1.5 leading-snug">
                      {item.headline}
                    </h4>
                    <p className="text-[11px] text-[#94a3b8] mb-3 leading-relaxed">
                      {item.primaryText}
                    </p>
                    <div className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-[#1e293b] text-[#dfe2f1] border border-[#334155] mb-3">
                      CTA: {item.callToAction}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#1e293b] flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleCopy(`${item.headline}\n\n${item.primaryText}\n\nCTA: ${item.callToAction}`, `gen-${idx}`)}
                      className="px-2 py-1 rounded bg-[#1e293b] hover:bg-[#334155] text-[11px] text-[#dfe2f1] flex items-center gap-1 transition-colors"
                    >
                      {copiedId === `gen-${idx}` ? (
                        <>
                          <Check className="w-3 h-3 text-[#10b981]" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-[#8c909f]" />
                          Copy
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleDeploy(item)}
                      className="px-2.5 py-1 rounded bg-[#3b82f6] hover:bg-[#2563eb] text-[11px] text-white flex items-center gap-1 font-medium transition-colors"
                    >
                      <Send className="w-3 h-3" />
                      Deploy
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Deployed Creative Inventory Table */}
      <div className="rounded-xl bg-[#111827] border border-[#1e293b] p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-[#1e293b]">
          <div>
            <h3 className="text-xs font-semibold tracking-tight text-[#dfe2f1]">
              Active Deployed Variations ({variants.length})
            </h3>
            <p className="text-xs text-[#8c909f] mt-0.5">
              Live telemetry and conversion performance per deployed creative vector.
            </p>
          </div>

          {/* Channel Filter Buttons */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setChannelFilter('all')}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                channelFilter === 'all'
                  ? 'bg-[#1e293b] text-[#adc6ff] border border-[#334155]'
                  : 'text-[#8c909f] hover:text-[#dfe2f1]'
              }`}
            >
              All
            </button>
            {channels.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setChannelFilter(ch.id)}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors whitespace-nowrap ${
                  channelFilter === ch.id
                    ? 'bg-[#1e293b] text-[#adc6ff] border border-[#334155]'
                    : 'text-[#8c909f] hover:text-[#dfe2f1]'
                }`}
              >
                {ch.label}
              </button>
            ))}
          </div>
        </div>

        {/* Variants List */}
        <div className="space-y-2.5">
          {filteredVariants.map((v) => (
            <div
              key={v.id}
              className={`
                p-3.5 rounded-lg border transition-all
                ${v.status === 'PRUNED' 
                  ? 'bg-[#0b0f19]/50 border-[#1e293b] opacity-60' 
                  : 'bg-[#0b0f19] border-[#1e293b] hover:border-[#334155]'}
              `}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-[#3b82f6] px-1.5 py-0.5 rounded bg-[#3b82f6]/10">
                      {v.id}
                    </span>
                    <span className="text-[10px] font-mono text-[#8c909f] uppercase">
                      {v.channel.replace('_', ' ')}
                    </span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                      v.status === 'ACTIVE_DEPLOYED' ? 'bg-[#10b981]/10 text-[#10b981]' :
                      v.status === 'TESTING' ? 'bg-[#3b82f6]/10 text-[#adc6ff]' :
                      'bg-[#ef4444]/10 text-[#ef4444]'
                    }`}>
                      {v.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-[#dfe2f1]">{v.headline}</h4>
                  <p className="text-[11px] text-[#8c909f] leading-relaxed">{v.primaryText}</p>
                  <div className="text-[10px] font-mono text-[#8c909f]">
                    CTA: <span className="text-[#dfe2f1]">{v.callToAction}</span> · Hook: <span className="text-[#adc6ff]">{v.hookAngle}</span>
                  </div>
                </div>

                {/* Metrics & Actions */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 sm:gap-1.5 border-t sm:border-t-0 pt-2 sm:pt-0 border-[#1e293b]">
                  <div className="font-mono text-xs text-right">
                    <div className="text-[#dfe2f1] font-semibold">${v.cpa.toFixed(2)} CPA</div>
                    <div className="text-[10px] text-[#8c909f]">
                      {v.conversions} conv · {v.impressions.toLocaleString()} imp
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopy(`${v.headline}\n${v.primaryText}`, v.id)}
                      className="p-1.5 rounded hover:bg-[#1e293b] text-[#8c909f] hover:text-[#dfe2f1]"
                      title="Copy copy"
                    >
                      {copiedId === v.id ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => onToggleVariantStatus(v.id)}
                      className="px-2 py-1 rounded bg-[#1e293b] hover:bg-[#334155] text-[10px] font-mono text-[#dfe2f1] transition-colors"
                    >
                      {v.status === 'ACTIVE_DEPLOYED' ? 'Pause' : 'Activate'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
