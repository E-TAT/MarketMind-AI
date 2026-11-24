import React from 'react';
import { PipelineNode } from '../types/agent';
import { X, Play, Code, CheckCircle, Clock, Zap, Cpu, Sliders } from 'lucide-react';

interface NodeInspectorModalProps {
  node: PipelineNode | null;
  onClose: () => void;
  onTestStage: (nodeId: string) => void;
  isTesting: boolean;
}

export const NodeInspectorModal: React.FC<NodeInspectorModalProps> = ({
  node,
  onClose,
  onTestStage,
  isTesting
}) => {
  if (!node) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-[#111827] border border-[#334155] rounded-xl shadow-[0_16px_32px_-8px_rgba(0,0,0,0.75)] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-[#1e293b] flex items-center justify-between bg-[#0b0f19]/60">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold text-[#3b82f6] px-2.5 py-1 rounded bg-[#3b82f6]/10 border border-[#3b82f6]/30">
              {node.code}
            </span>
            <div>
              <h3 className="text-sm font-semibold text-[#dfe2f1]">{node.title}</h3>
              <p className="text-xs text-[#8c909f]">{node.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-[#1e293b] text-[#8c909f] hover:text-[#dfe2f1] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* Quick Telemetry Banner */}
          <div className="grid grid-cols-3 gap-3 p-3 rounded-lg bg-[#0b0f19] border border-[#1e293b] font-mono text-[11px]">
            <div>
              <span className="text-[#8c909f] block text-[10px]">STAGE STATUS</span>
              <span className="text-[#10b981] font-semibold flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                {node.status}
              </span>
            </div>
            <div>
              <span className="text-[#8c909f] block text-[10px]">EXECUTION LATENCY</span>
              <span className="text-[#dfe2f1] font-semibold mt-0.5 block">{node.latencyMs} ms</span>
            </div>
            <div>
              <span className="text-[#8c909f] block text-[10px]">TOKENS CONSUMED</span>
              <span className="text-[#dfe2f1] font-semibold mt-0.5 block">{node.tokensProcessed} tkn</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#8c909f] mb-1.5">
              Mission Directive
            </h4>
            <p className="text-[#c2c6d6] leading-relaxed bg-[#0b0f19]/40 p-3 rounded-lg border border-[#1e293b]">
              {node.description}
            </p>
          </div>

          {/* Input Artifact */}
          <div>
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#8c909f] mb-1.5 flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5 text-[#3b82f6]" />
              Inbound Ingestion Payload
            </h4>
            <div className="font-mono text-[11px] bg-[#0b0f19] p-3 rounded-lg border border-[#1e293b] text-[#94a3b8] break-words">
              {node.inputArtifact}
            </div>
          </div>

          {/* Output Artifact */}
          <div>
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#8c909f] mb-1.5 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-[#10b981]" />
              Synthesized Operational Artifact
            </h4>
            <div className="font-mono text-[11px] bg-[#0b0f19] p-3 rounded-lg border border-[#1e293b] text-[#4edea3] break-words">
              {node.outputArtifact}
            </div>
          </div>

          {/* Hyperparameters */}
          <div>
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#8c909f] mb-1.5 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#8b5cf6]" />
              Deterministic Hyperparameters
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.entries(node.hyperparameters).map(([key, val]) => (
                <div key={key} className="p-2 rounded bg-[#0b0f19] border border-[#1e293b] font-mono text-[11px]">
                  <span className="text-[#8c909f] text-[10px] block">{key}</span>
                  <span className="text-[#dfe2f1] font-medium">{String(val)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-[#1e293b] bg-[#0b0f19]/60 flex items-center justify-between">
          <div className="text-[11px] font-mono text-[#8c909f]">
            Last verified: {node.lastExecution}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-md bg-[#1e293b] hover:bg-[#334155] text-[#dfe2f1] text-xs font-medium transition-colors"
            >
              Dismiss
            </button>
            <button
              onClick={() => onTestStage(node.id)}
              disabled={isTesting}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#3b82f6] hover:bg-[#2563eb] text-white text-xs font-medium shadow-[0_0_12px_rgba(59,130,246,0.3)] transition-all disabled:opacity-50"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>{isTesting ? 'Evaluating...' : 'Run Stage Test'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
