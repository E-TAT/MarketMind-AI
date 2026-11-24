import React from 'react';
import { 
  Play, 
  RotateCw, 
  Menu, 
  PanelRight, 
  CheckCircle2, 
  AlertTriangle, 
  Shield, 
  Sliders
} from 'lucide-react';
import { AgentStatus, CampaignSummary } from '../types/agent';

interface TopBarProps {
  status: AgentStatus;
  campaign: CampaignSummary;
  isTriggering: boolean;
  onTriggerCycle: () => void;
  autonomyMode: 'FULL_AUTONOMOUS' | 'REVIEW_BEFORE_DEPLOY';
  onToggleAutonomy: () => void;
  isTelemetryOpen: boolean;
  onToggleTelemetry: () => void;
  onOpenMobileMenu: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  status,
  campaign,
  isTriggering,
  onTriggerCycle,
  autonomyMode,
  onToggleAutonomy,
  isTelemetryOpen,
  onToggleTelemetry,
  onOpenMobileMenu
}) => {
  return (
    <header className="h-14 border-b border-[#1e293b] bg-[#111827]/90 backdrop-blur-md px-4 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Mobile hamburger & Agent State Pill & Campaign Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-1.5 rounded-md hover:bg-[#1e293b] text-[#8c909f] hover:text-[#dfe2f1]"
          aria-label="Open navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Agent Status Pill */}
        <div className="flex items-center">
          <div className={`
            flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase border
            ${status === 'RUNNING' || status === 'REASONING' 
              ? 'bg-[#3b82f6]/10 border-[#3b82f6]/30 text-[#adc6ff]' 
              : status === 'PAUSED' 
                ? 'bg-[#f59e0b]/10 border-[#f59e0b]/30 text-[#f59e0b]' 
                : 'bg-[#10b981]/10 border-[#10b981]/30 text-[#4edea3]'}
          `}>
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                status === 'PAUSED' ? 'bg-[#f59e0b]' : status === 'RUNNING' || status === 'REASONING' ? 'bg-[#3b82f6]' : 'bg-[#10b981]'
              }`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${
                status === 'PAUSED' ? 'bg-[#f59e0b]' : status === 'RUNNING' || status === 'REASONING' ? 'bg-[#3b82f6]' : 'bg-[#10b981]'
              }`} />
            </span>
            <span className="font-semibold">
              {status === 'REASONING' ? 'REASONING' : status === 'RUNNING' ? 'ACTIVE LOOP' : status}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block h-4 w-[1px] bg-[#1e293b]" />

        {/* Active Campaign Title & Cycle Indicator */}
        <div className="hidden md:flex items-center gap-2 text-xs">
          <span className="text-[#dfe2f1] font-medium truncate max-w-[280px]">
            {campaign.name}
          </span>
          <span className="text-[#8c909f] font-mono text-[11px] bg-[#0b0f19] px-2 py-0.5 rounded border border-[#1e293b]">
            Cycle #{campaign.cycleCount}
          </span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Autonomy Mode Switcher */}
        <button
          onClick={onToggleAutonomy}
          title="Click to toggle autonomy mode"
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#0b0f19] border border-[#1e293b] hover:border-[#334155] text-xs transition-colors"
        >
          <Shield className={`w-3.5 h-3.5 ${autonomyMode === 'FULL_AUTONOMOUS' ? 'text-[#3b82f6]' : 'text-[#f59e0b]'}`} />
          <span className="font-mono text-[11px] text-[#c2c6d6]">
            {autonomyMode === 'FULL_AUTONOMOUS' ? 'FULL AUTO' : 'REVIEW REQ'}
          </span>
        </button>

        {/* Primary Action: Trigger Cycle Now */}
        <button
          onClick={onTriggerCycle}
          disabled={isTriggering}
          className={`
            flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium text-white
            bg-[#3b82f6] hover:bg-[#2563eb] active:scale-[0.98]
            shadow-[0_0_14px_rgba(59,130,246,0.35)] transition-all
            ${isTriggering ? 'opacity-80 cursor-wait' : ''}
          `}
        >
          <RotateCw className={`w-3.5 h-3.5 ${isTriggering ? 'animate-spin' : ''}`} />
          <span className="font-medium whitespace-nowrap">
            {isTriggering ? 'Executing...' : 'Trigger Cycle'}
          </span>
        </button>

        {/* Toggle Telemetry Panel */}
        <button
          onClick={onToggleTelemetry}
          className={`
            p-2 rounded-md border text-xs transition-colors
            ${isTelemetryOpen 
              ? 'bg-[#1e293b] border-[#334155] text-[#adc6ff]' 
              : 'bg-[#0b0f19] border-[#1e293b] text-[#8c909f] hover:text-[#dfe2f1] hover:border-[#334155]'}
          `}
          title="Toggle telemetry side panel"
          aria-label="Toggle telemetry side panel"
        >
          <PanelRight className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
