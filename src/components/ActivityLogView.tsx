import React, { useState } from 'react';
import { TelemetryLog } from '../types/agent';
import { Terminal, Download, Trash2, Search, Filter } from 'lucide-react';

interface ActivityLogViewProps {
  logs: TelemetryLog[];
  onClearLogs: () => void;
}

export const ActivityLogView: React.FC<ActivityLogViewProps> = ({
  logs,
  onClearLogs
}) => {
  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterTabs = ['ALL', 'OPTIMIZE', 'SYNTH', 'DISPATCH', 'GUARD', 'INTENT'];

  const filteredLogs = logs.filter(log => {
    const matchesType = filterType === 'ALL' || log.type === filterType;
    const matchesSearch = searchQuery === '' || 
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.nodeCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `agent-operations-audit-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-4">
      {/* Header Deck */}
      <div className="rounded-xl bg-[#111827] border border-[#1e293b] p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-4 border-b border-[#1e293b]">
          <div>
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#3b82f6]" />
              <h2 className="text-sm font-semibold tracking-tight text-[#dfe2f1]">
                Autonomous Execution Audit Stream
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10b981]/10 text-[#4edea3] border border-[#10b981]/30">
                Live Pipe
              </span>
            </div>
            <p className="text-xs text-[#8c909f] mt-0.5">
              Deterministic, cryptographically verifiable event stream of autonomous marketing operations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJson}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#1e293b] hover:bg-[#334155] text-xs text-[#dfe2f1] border border-[#334155] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Audit Manifest</span>
            </button>
            <button
              onClick={onClearLogs}
              className="p-1.5 rounded-md hover:bg-[#1e293b] text-[#8c909f] hover:text-[#ef4444] transition-colors"
              title="Clear buffer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Filter Type Pills/Buttons */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterType(tab)}
                className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors ${
                  filterType === tab
                    ? 'bg-[#1e293b] text-[#adc6ff] border border-[#334155]'
                    : 'text-[#8c909f] hover:text-[#dfe2f1]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-[#8c909f] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search logs or node IDs..."
              className="w-full pl-8 pr-3 py-1.5 rounded-md bg-[#0b0f19] border border-[#1e293b] focus:border-[#3b82f6] text-xs font-mono text-[#dfe2f1] outline-none"
            />
          </div>
        </div>
      </div>

      {/* Terminal Output Window */}
      <div className="rounded-xl bg-[#0b0f19] border border-[#1e293b] p-4 font-mono text-xs overflow-hidden">
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#1e293b] text-[11px] text-[#8c909f]">
          <span>STREAM BUFFER · {filteredLogs.length} events</span>
          <span className="flex items-center gap-1.5 text-[#10b981]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
            LIVE TELEMETRY
          </span>
        </div>

        <div className="space-y-2 max-h-[550px] overflow-y-auto pr-1">
          {filteredLogs.length === 0 ? (
            <div className="py-8 text-center text-[#8c909f]">
              No log entries matching the current filter.
            </div>
          ) : (
            filteredLogs.map((log) => (
              <div
                key={log.id}
                className="p-2.5 rounded bg-[#111827]/70 border border-[#1e293b] hover:border-[#334155] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="flex items-start sm:items-center gap-2.5">
                  <span className="text-[#8c909f] text-[11px] shrink-0">
                    [{log.timestamp}]
                  </span>
                  <span className="text-[#3b82f6] text-[11px] font-semibold shrink-0">
                    {log.nodeCode}
                  </span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] shrink-0 font-semibold ${
                    log.type === 'OPTIMIZE' ? 'bg-[#10b981]/15 text-[#10b981]' :
                    log.type === 'SYNTH' ? 'bg-[#8b5cf6]/15 text-[#d0bcff]' :
                    log.type === 'DISPATCH' ? 'bg-[#3b82f6]/15 text-[#adc6ff]' :
                    log.type === 'GUARD' ? 'bg-[#f59e0b]/15 text-[#f59e0b]' :
                    'bg-[#1e293b] text-[#dfe2f1]'
                  }`}>
                    {log.type}
                  </span>
                  <span className="text-[#dfe2f1] text-[12px] leading-relaxed">
                    {log.message}
                  </span>
                </div>

                {log.metric && (
                  <span className="text-[11px] font-mono text-[#adc6ff] sm:text-right shrink-0 bg-[#0b0f19] px-2 py-0.5 rounded border border-[#1e293b]">
                    {log.metric}
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
