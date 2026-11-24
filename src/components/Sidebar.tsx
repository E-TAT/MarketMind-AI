import React from 'react';
import { 
  GitBranch, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Terminal, 
  Play, 
  Pause, 
  Cpu, 
  SlidersHorizontal,
  ChevronDown,
  Activity
} from 'lucide-react';
import { NavTab, AgentStatus } from '../types/agent';

interface SidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  agentStatus: AgentStatus;
  onToggleAgent: () => void;
  isOpen: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  agentStatus,
  onToggleAgent,
  isOpen,
  onCloseMobile
}) => {
  const [selectedAgent, setSelectedAgent] = React.useState<'ALPHA' | 'BETA' | 'GAMMA'>('ALPHA');
  const [agentMenuOpen, setAgentMenuOpen] = React.useState(false);

  const agents = [
    { id: 'ALPHA', name: 'AGT-MKT-ALPHA', label: 'Apex Growth Engine', status: 'ACTIVE' },
    { id: 'BETA', name: 'AGT-MKT-BETA', label: 'B2B SaaS Retargeter', status: 'STANDBY' },
    { id: 'GAMMA', name: 'AGT-MKT-GAMMA', label: 'Viral Social Scout', status: 'IDLE' }
  ];

  const currentAgent = agents.find(a => a.id === selectedAgent) || agents[0];

  const navItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'pipeline', label: 'Pipeline Graph', icon: <GitBranch className="w-4 h-4" /> },
    { id: 'creative', label: 'Creative Matrix', icon: <Sparkles className="w-4 h-4" />, badge: '3 angles' },
    { id: 'channels', label: 'Channels & Pacing', icon: <Layers className="w-4 h-4" /> },
    { id: 'guardrails', label: 'Guardrails & Rules', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'logs', label: 'Execution Stream', icon: <Terminal className="w-4 h-4" />, badge: 'LIVE' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm"
          onClick={onCloseMobile}
        />
      )}

      <aside className={`
        fixed lg:static top-0 bottom-0 left-0 z-40
        w-[260px] bg-[#111827] border-r border-[#1e293b]
        flex flex-col flex-shrink-0 transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand Console Header */}
        <div className="p-4 border-b border-[#1e293b] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-[#3b82f6]/10 border border-[#3b82f6]/40 flex items-center justify-center text-[#adc6ff] shadow-[0_0_12px_rgba(59,130,246,0.2)]">
              <Cpu className="w-4 h-4 text-[#3b82f6]" />
            </div>
            <div>
              <div className="text-[13px] font-semibold tracking-tight text-[#dfe2f1]">
                AOC <span className="text-[#8c909f] font-normal text-xs">/ MKT</span>
              </div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#8c909f]">
                Autonomous Console
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${agentStatus === 'PAUSED' ? 'bg-[#f59e0b]' : 'bg-[#10b981]'}`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${agentStatus === 'PAUSED' ? 'bg-[#f59e0b]' : 'bg-[#10b981]'}`} />
            </span>
          </div>
        </div>

        {/* Agent Switcher Dropdown */}
        <div className="px-3 pt-3 pb-2">
          <div className="relative">
            <button
              onClick={() => setAgentMenuOpen(!agentMenuOpen)}
              className="w-full flex items-center justify-between px-2.5 py-2 rounded-md bg-[#0b0f19] border border-[#1e293b] hover:border-[#334155] text-left transition-colors"
            >
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-[#adc6ff] font-medium">{currentAgent.name}</span>
                </div>
                <div className="text-xs font-medium text-[#dfe2f1] truncate">{currentAgent.label}</div>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-[#8c909f] transition-transform ${agentMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {agentMenuOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 py-1 rounded-md bg-[#111827] border border-[#334155] shadow-2xl z-50">
                {agents.map((agent) => (
                  <button
                    key={agent.id}
                    onClick={() => {
                      setSelectedAgent(agent.id as any);
                      setAgentMenuOpen(false);
                    }}
                    className={`w-full px-2.5 py-1.5 text-left text-xs flex items-center justify-between hover:bg-[#1e293b] transition-colors ${
                      selectedAgent === agent.id ? 'bg-[#1e293b] text-[#adc6ff]' : 'text-[#dfe2f1]'
                    }`}
                  >
                    <div>
                      <div className="font-mono text-[10px] text-[#8c909f]">{agent.name}</div>
                      <div className="font-medium">{agent.label}</div>
                    </div>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#0b0f19] border border-[#1e293b] text-[#8c909f]">
                      {agent.status}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="px-3 py-2 flex-1 space-y-1">
          <div className="px-2 pb-1 text-[10px] font-mono uppercase tracking-wider text-[#8c909f]">
            Operations
          </div>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`
                  w-full flex items-center justify-between px-2.5 py-2 rounded-md text-xs font-medium transition-all
                  ${isActive
                    ? 'bg-[#1e293b] text-[#adc6ff] border border-[#334155] shadow-sm'
                    : 'text-[#c2c6d6] hover:text-[#dfe2f1] hover:bg-[#1e293b]/50 border border-transparent'}
                `}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? 'text-[#3b82f6]' : 'text-[#8c909f]'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-[#3b82f6]/20 text-[#adc6ff]' : 'bg-[#0b0f19] text-[#8c909f]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Telemetry Health & Killswitch */}
        <div className="p-3 border-t border-[#1e293b] bg-[#0b0f19]/40 space-y-2.5">
          <div className="p-2.5 rounded-md bg-[#0b0f19] border border-[#1e293b] text-xs">
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="text-[#8c909f] flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-[#10b981]" />
                Autonomy Loop
              </span>
              <span className="font-mono text-[#10b981] text-[10px] font-semibold">
                {agentStatus === 'PAUSED' ? 'HALTED' : 'NOMINAL'}
              </span>
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-[#8c909f]">
              <span>Context Cache</span>
              <span className="text-[#dfe2f1]">3.8 MB / 16 MB</span>
            </div>
            <div className="w-full bg-[#1e293b] h-1 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-[#3b82f6] h-full w-[24%]" />
            </div>
          </div>

          {/* Quick Pause / Resume Action */}
          <button
            onClick={onToggleAgent}
            className={`
              w-full flex items-center justify-center gap-2 py-1.5 px-3 rounded-md text-xs font-medium transition-all
              ${agentStatus === 'PAUSED'
                ? 'bg-[#10b981] text-[#002113] hover:bg-[#00a572] font-semibold'
                : 'bg-[#1e293b] border border-[#334155] text-[#dfe2f1] hover:bg-[#334155] hover:text-white'}
            `}
          >
            {agentStatus === 'PAUSED' ? (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                Resume Agent Loop
              </>
            ) : (
              <>
                <Pause className="w-3.5 h-3.5 text-[#f59e0b]" />
                Pause Autonomous Loop
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};
