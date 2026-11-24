import React from 'react';
import { TelemetryLog } from '../types/agent';
import { 
  X, 
  Activity, 
  Cpu, 
  HardDrive, 
  CheckCircle, 
  Clock, 
  ArrowUpRight,
  TrendingUp,
  RotateCw
} from 'lucide-react';

interface TelemetryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  logs: TelemetryLog[];
  onTriggerDiagnostics: () => void;
  isDiagnosing: boolean;
}

export const TelemetryDrawer: React.FC<TelemetryDrawerProps> = ({
  isOpen,
  onClose,
  logs,
  onTriggerDiagnostics,
  isDiagnosing
}) => {
  if (!isOpen) return null;

  return (
    <aside className="fixed lg:sticky top-0 right-0 z-30 h-screen w-[320px] sm:w-[360px] bg-[#111827] border-l border-[#1e293b] flex flex-col flex-shrink-0 shadow-2xl lg:shadow-none animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="h-14 px-4 border-b border-[#1e293b] flex items-center justify-between bg-[#0b0f19]/40">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#3b82f6]" />
          <h3 className="text-xs font-semibold tracking-tight text-[#dfe2f1]">
            Live Agent Telemetry
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-[#1e293b] text-[#8c909f] hover:text-[#dfe2f1] transition-colors"
          aria-label="Close telemetry"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {/* Core Throughput Cards */}
        <div className="grid grid-cols-2 gap-2.5 font-mono text-[11px]">
          <div className="p-2.5 rounded-lg bg-[#0b0f19] border border-[#1e293b]">
            <span className="text-[#8c909f] block text-[10px]">THROUGHPUT</span>
            <span className="text-sm font-semibold text-[#dfe2f1] mt-0.5 block">28 ops/min</span>
            <span className="text-[10px] text-[#10b981] flex items-center gap-0.5 mt-0.5">
              <TrendingUp className="w-2.5 h-2.5" /> Nominal
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#0b0f19] border border-[#1e293b]">
            <span className="text-[#8c909f] block text-[10px]">AVG LATENCY</span>
            <span className="text-sm font-semibold text-[#dfe2f1] mt-0.5 block">67 ms</span>
            <span className="text-[10px] text-[#3b82f6] mt-0.5 block">p95 &lt; 120ms</span>
          </div>
        </div>

        {/* Latency Sparkline Simulation */}
        <div className="p-3 rounded-lg bg-[#0b0f19] border border-[#1e293b]">
          <div className="flex items-center justify-between text-[10px] font-mono mb-2 text-[#8c909f]">
            <span>LATENCY DISTRIBUTION (60s)</span>
            <span className="text-[#10b981]">Healthy</span>
          </div>
          {/* SVG sparkline */}
          <div className="h-10 w-full">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 30">
              <path
                d="M 0,22 Q 10,12 20,18 T 40,8 T 60,15 T 80,6 T 100,12"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="1.5"
              />
              <path
                d="M 0,22 Q 10,12 20,18 T 40,8 T 60,15 T 80,6 T 100,12 L 100,30 L 0,30 Z"
                fill="url(#sparklineGlow)"
                opacity="0.2"
              />
              <defs>
                <linearGradient id="sparklineGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="flex items-center justify-between text-[9px] font-mono text-[#8c909f] mt-1">
            <span>T-60s</span>
            <span>T-30s</span>
            <span>Now</span>
          </div>
        </div>

        {/* Real-Time Action Feed */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-[#8c909f] uppercase tracking-wider">
              Autonomous Action Stream
            </span>
            <span className="text-[10px] font-mono text-[#adc6ff]">
              {logs.length} logged
            </span>
          </div>

          <div className="space-y-2">
            {logs.slice(0, 6).map((log) => (
              <div
                key={log.id}
                className="p-2.5 rounded-md bg-[#0b0f19] border border-[#1e293b] text-[11px] font-mono transition-colors hover:border-[#334155]"
              >
                <div className="flex items-center justify-between mb-1 text-[10px]">
                  <span className={`px-1.5 py-0.2 rounded font-semibold ${
                    log.type === 'OPTIMIZE' ? 'bg-[#10b981]/10 text-[#10b981]' :
                    log.type === 'SYNTH' ? 'bg-[#8b5cf6]/10 text-[#d0bcff]' :
                    log.type === 'DISPATCH' ? 'bg-[#3b82f6]/10 text-[#adc6ff]' :
                    log.type === 'GUARD' ? 'bg-[#f59e0b]/10 text-[#f59e0b]' :
                    'bg-[#1e293b] text-[#dfe2f1]'
                  }`}>
                    [{log.type}]
                  </span>
                  <span className="text-[#8c909f]">{log.timestamp}</span>
                </div>
                <div className="text-[#c2c6d6] leading-tight text-[11px]">
                  {log.message}
                </div>
                {log.metric && (
                  <div className="text-[10px] text-[#8c909f] mt-1 pt-1 border-t border-[#1e293b]/60 flex items-center justify-between">
                    <span>Delta:</span>
                    <span className="text-[#dfe2f1] font-semibold">{log.metric}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Diagnostics Footer */}
      <div className="p-3 border-t border-[#1e293b] bg-[#0b0f19]/60">
        <button
          onClick={onTriggerDiagnostics}
          disabled={isDiagnosing}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-md bg-[#1e293b] hover:bg-[#334155] text-xs font-medium text-[#dfe2f1] transition-colors border border-[#334155]"
        >
          <RotateCw className={`w-3.5 h-3.5 ${isDiagnosing ? 'animate-spin text-[#3b82f6]' : 'text-[#8c909f]'}`} />
          <span>{isDiagnosing ? 'Probing Model Channels...' : 'Run Diagnostics Probe'}</span>
        </button>
      </div>
    </aside>
  );
};
