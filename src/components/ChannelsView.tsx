import React from 'react';
import { ChannelPerformance } from '../types/agent';
import { 
  Search, 
  Briefcase, 
  Share2, 
  Mail, 
  TrendingUp, 
  Sliders, 
  Check, 
  RotateCw,
  DollarSign,
  AlertTriangle
} from 'lucide-react';

interface ChannelsViewProps {
  channels: ChannelPerformance[];
  onUpdateBudget: (channelId: string, newBudget: number) => void;
  onToggleChannel: (channelId: string) => void;
  onAutoRebalance: () => void;
}

export const ChannelsView: React.FC<ChannelsViewProps> = ({
  channels,
  onUpdateBudget,
  onToggleChannel,
  onAutoRebalance
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search': return <Search className="w-4 h-4 text-[#3b82f6]" />;
      case 'Briefcase': return <Briefcase className="w-4 h-4 text-[#8b5cf6]" />;
      case 'Share2': return <Share2 className="w-4 h-4 text-[#adc6ff]" />;
      case 'Mail': return <Mail className="w-4 h-4 text-[#4edea3]" />;
      default: return <Search className="w-4 h-4 text-[#3b82f6]" />;
    }
  };

  const totalDailyBudget = channels.reduce((acc, c) => acc + c.dailyBudget, 0);
  const totalSpendToday = channels.reduce((acc, c) => acc + c.spendToday, 0);

  return (
    <div className="space-y-6">
      {/* Overview & Auto-rebalance Banner */}
      <div className="rounded-xl bg-[#111827] border border-[#1e293b] p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-4 border-b border-[#1e293b]">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold tracking-tight text-[#dfe2f1]">
                Channel Allocation & Autonomous Pacing
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10b981]/10 text-[#4edea3] border border-[#10b981]/30">
                Pacing Nominal
              </span>
            </div>
            <p className="text-xs text-[#8c909f] mt-0.5">
              Live spend distribution across ad networks governed by real-time conversion velocity.
            </p>
          </div>

          <button
            onClick={onAutoRebalance}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#3b82f6] hover:bg-[#2563eb] text-white text-xs font-medium shadow-[0_0_12px_rgba(59,130,246,0.3)] transition-all"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Apply Agent Rebalance</span>
          </button>
        </div>

        {/* Global Pacing Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 rounded-lg bg-[#0b0f19] border border-[#1e293b]">
            <span className="text-[10px] font-mono text-[#8c909f] block">AGGREGATE DAILY CAP</span>
            <span className="font-mono text-lg font-semibold text-[#dfe2f1]">${totalDailyBudget.toLocaleString()}</span>
          </div>
          <div className="p-3 rounded-lg bg-[#0b0f19] border border-[#1e293b]">
            <span className="text-[10px] font-mono text-[#8c909f] block">DISPATCHED TODAY</span>
            <span className="font-mono text-lg font-semibold text-[#3b82f6]">${totalSpendToday.toFixed(2)}</span>
          </div>
          <div className="p-3 rounded-lg bg-[#0b0f19] border border-[#1e293b]">
            <span className="text-[10px] font-mono text-[#8c909f] block">PACING DIURNAL RATIO</span>
            <span className="font-mono text-lg font-semibold text-[#10b981]">98.2% on-curve</span>
          </div>
          <div className="p-3 rounded-lg bg-[#0b0f19] border border-[#1e293b]">
            <span className="text-[10px] font-mono text-[#8c909f] block">TOP ROAS CHANNEL</span>
            <span className="font-mono text-lg font-semibold text-[#8b5cf6]">Email (6.8x)</span>
          </div>
        </div>
      </div>

      {/* Channel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {channels.map((ch) => {
          const isOverBudget = ch.dailyBudget > ch.recommendedBudget;
          const isUnderBudget = ch.dailyBudget < ch.recommendedBudget;

          return (
            <div
              key={ch.id}
              className="rounded-xl bg-[#111827] border border-[#1e293b] p-4 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#1e293b]">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-md bg-[#0b0f19] border border-[#1e293b]">
                      {getIcon(ch.iconName)}
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-[#dfe2f1]">{ch.name}</h3>
                      <div className="text-[10px] font-mono text-[#8c909f]">
                        {ch.activeVariants} active creative variations
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onToggleChannel(ch.id)}
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-colors ${
                      ch.status === 'ACTIVE'
                        ? 'bg-[#10b981]/10 border-[#10b981]/30 text-[#10b981]'
                        : ch.status === 'OPTIMIZING'
                          ? 'bg-[#3b82f6]/10 border-[#3b82f6]/30 text-[#adc6ff]'
                          : 'bg-[#0b0f19] border-[#1e293b] text-[#8c909f]'
                    }`}
                  >
                    {ch.status}
                  </button>
                </div>

                {/* Key Numbers */}
                <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-lg bg-[#0b0f19] border border-[#1e293b] mb-4 text-center">
                  <div>
                    <span className="text-[10px] font-mono text-[#8c909f] block">ROAS</span>
                    <span className="font-mono text-xs font-semibold text-[#adc6ff]">{ch.roas.toFixed(2)}x</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#8c909f] block">BLENDED CPA</span>
                    <span className="font-mono text-xs font-semibold text-[#dfe2f1]">${ch.cpa.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#8c909f] block">CONVERSIONS</span>
                    <span className="font-mono text-xs font-semibold text-[#10b981]">{ch.totalConversions}</span>
                  </div>
                </div>

                {/* Budget Slider */}
                <div className="space-y-1.5 mb-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#8c909f] text-[11px]">Daily Allocation:</span>
                    <span className="font-mono font-semibold text-[#dfe2f1]">${ch.dailyBudget} / day</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="1500"
                    step="25"
                    value={ch.dailyBudget}
                    onChange={(e) => onUpdateBudget(ch.id, Number(e.target.value))}
                    className="w-full h-1.5 bg-[#0b0f19] rounded-lg appearance-none cursor-pointer accent-[#3b82f6]"
                  />
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#8c909f]">
                    <span>Min $50</span>
                    <span className="text-[#adc6ff]">
                      Agent Suggestion: ${ch.recommendedBudget}/day
                    </span>
                    <span>Max $1,500</span>
                  </div>
                </div>
              </div>

              {/* Card Footer recommendation banner */}
              <div className="pt-2 border-t border-[#1e293b] text-[11px] flex items-center justify-between text-[#8c909f]">
                <span>Today's Burn: ${ch.spendToday.toFixed(2)}</span>
                {ch.dailyBudget !== ch.recommendedBudget && (
                  <button
                    onClick={() => onUpdateBudget(ch.id, ch.recommendedBudget)}
                    className="text-[10px] font-mono text-[#3b82f6] hover:underline"
                  >
                    Match agent target (${ch.recommendedBudget})
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
