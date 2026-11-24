import React, { useState } from 'react';
import { GuardrailSettings } from '../types/agent';
import { 
  ShieldCheck, 
  AlertTriangle, 
  DollarSign, 
  Check, 
  Plus, 
  X, 
  Save, 
  RotateCcw,
  Sliders
} from 'lucide-react';

interface GuardrailsViewProps {
  settings: GuardrailSettings;
  onSaveSettings: (newSettings: GuardrailSettings) => void;
  onAddLog: (message: string, type: any, level: any) => void;
}

export const GuardrailsView: React.FC<GuardrailsViewProps> = ({
  settings,
  onSaveSettings,
  onAddLog
}) => {
  const [formData, setFormData] = useState<GuardrailSettings>(settings);
  const [newKeyword, setNewKeyword] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleAddKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newKeyword.trim().toLowerCase();
    if (trimmed && !formData.negativeKeywords.includes(trimmed)) {
      setFormData({
        ...formData,
        negativeKeywords: [...formData.negativeKeywords, trimmed]
      });
      setNewKeyword('');
    }
  };

  const handleRemoveKeyword = (kw: string) => {
    setFormData({
      ...formData,
      negativeKeywords: formData.negativeKeywords.filter(k => k !== kw)
    });
  };

  const handleSave = () => {
    onSaveSettings(formData);
    setIsSaved(true);
    onAddLog(
      `Guardrails policy updated: Max Spend $${formData.maxDailySpend}, CPA Cap $${formData.targetCpaThreshold}`,
      'GUARD',
      'success'
    );
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-[#111827] border border-[#1e293b] p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-4 border-b border-[#1e293b]">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold tracking-tight text-[#dfe2f1]">
                Autonomous Guardrails & Fiscal Governance
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10b981]/10 text-[#4edea3] border border-[#10b981]/30">
                Enforcing Fences
              </span>
            </div>
            <p className="text-xs text-[#8c909f] mt-0.5">
              Deterministic boundaries preventing budget over-runs, brand dilution, and low-converting spend leaks.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#3b82f6] hover:bg-[#2563eb] text-white text-xs font-medium shadow-[0_0_12px_rgba(59,130,246,0.3)] transition-all"
          >
            {isSaved ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Policies Synced</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save & Apply Guardrails</span>
              </>
            )}
          </button>
        </div>

        {/* 2-Column Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          {/* Left Column: Fiscal Caps */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-[#dfe2f1] flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#10b981]" />
              Fiscal Risk Fences
            </h3>

            <div>
              <label className="block text-[11px] font-mono text-[#8c909f] uppercase mb-1">
                Max Daily Spend Limit ($ USD)
              </label>
              <input
                type="number"
                value={formData.maxDailySpend}
                onChange={(e) => setFormData({ ...formData, maxDailySpend: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-md bg-[#0b0f19] border border-[#1e293b] focus:border-[#3b82f6] text-xs font-mono text-[#dfe2f1] outline-none"
              />
              <span className="text-[10px] text-[#8c909f] mt-1 block">
                Hard ceiling. If cumulative daily burn hits this value, all campaigns pause immediately.
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[#8c909f] uppercase mb-1">
                Target CPA Kill-Switch Threshold ($ USD)
              </label>
              <input
                type="number"
                step="0.5"
                value={formData.targetCpaThreshold}
                onChange={(e) => setFormData({ ...formData, targetCpaThreshold: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-md bg-[#0b0f19] border border-[#1e293b] focus:border-[#3b82f6] text-xs font-mono text-[#dfe2f1] outline-none"
              />
              <span className="text-[10px] text-[#8c909f] mt-1 block">
                Variants exceeding this acquisition cost after 100 clicks are pruned automatically.
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[#8c909f] uppercase mb-1">
                Min Confidence Threshold (%)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="70"
                  max="99"
                  value={formData.minConfidenceScore}
                  onChange={(e) => setFormData({ ...formData, minConfidenceScore: Number(e.target.value) })}
                  className="flex-1 h-1.5 bg-[#0b0f19] rounded-lg appearance-none cursor-pointer accent-[#3b82f6]"
                />
                <span className="font-mono text-xs font-semibold text-[#dfe2f1] w-12 text-right">
                  {formData.minConfidenceScore}%
                </span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#0b0f19] border border-[#1e293b] flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-[#dfe2f1] block">Autonomous Budget Rebalancing</span>
                <span className="text-[10px] text-[#8c909f]">Shift budget to higher ROAS channels hourly</span>
              </div>
              <input
                type="checkbox"
                checked={formData.autoRebalanceBudget}
                onChange={(e) => setFormData({ ...formData, autoRebalanceBudget: e.target.checked })}
                className="w-4 h-4 rounded bg-[#1e293b] border-[#334155] accent-[#3b82f6]"
              />
            </div>
          </div>

          {/* Right Column: Autonomy Mode & Brand Safety */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-[#dfe2f1] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#3b82f6]" />
              Autonomy & Brand Fences
            </h3>

            {/* Autonomy Mode */}
            <div>
              <label className="block text-[11px] font-mono text-[#8c909f] uppercase mb-1.5">
                Autonomy Operating Mode
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, autonomyMode: 'FULL_AUTONOMOUS' })}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    formData.autonomyMode === 'FULL_AUTONOMOUS'
                      ? 'bg-[#1e293b] border-[#3b82f6] text-[#dfe2f1]'
                      : 'bg-[#0b0f19] border-[#1e293b] text-[#8c909f]'
                  }`}
                >
                  <div className="font-semibold text-xs text-[#adc6ff]">Full Autonomous</div>
                  <div className="text-[10px] text-[#8c909f] mt-0.5">Auto-deploy variants and budget shifts</div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, autonomyMode: 'REVIEW_BEFORE_DEPLOY' })}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    formData.autonomyMode === 'REVIEW_BEFORE_DEPLOY'
                      ? 'bg-[#1e293b] border-[#3b82f6] text-[#dfe2f1]'
                      : 'bg-[#0b0f19] border-[#1e293b] text-[#8c909f]'
                  }`}
                >
                  <div className="font-semibold text-xs text-[#dfe2f1]">Review Before Deploy</div>
                  <div className="text-[10px] text-[#8c909f] mt-0.5">Require human click to authorize pushes</div>
                </button>
              </div>
            </div>

            {/* Brand Tone */}
            <div>
              <label className="block text-[11px] font-mono text-[#8c909f] uppercase mb-1">
                Synthesized Brand Voice & Tone
              </label>
              <select
                value={formData.brandTone}
                onChange={(e) => setFormData({ ...formData, brandTone: e.target.value as any })}
                className="w-full px-3 py-2 rounded-md bg-[#0b0f19] border border-[#1e293b] text-xs text-[#dfe2f1] outline-none"
              >
                <option value="Pragmatic & Authoritative">Pragmatic & Authoritative (Recommended for B2B/DevOps)</option>
                <option value="Technical & Concise">Technical & Concise (Deep Architecture)</option>
                <option value="High-Velocity & Urgent">High-Velocity & Urgent (Growth / Launch)</option>
                <option value="Benefit-Driven">Benefit-Driven (C-Suite & Non-Technical)</option>
              </select>
            </div>

            {/* Negative Keywords / Exclusions */}
            <div>
              <label className="block text-[11px] font-mono text-[#8c909f] uppercase mb-1">
                Negative Keywords & Disallowed Claims
              </label>
              <form onSubmit={handleAddKeyword} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  placeholder="e.g. cracked, unlimited, free torrent"
                  className="flex-1 px-3 py-1.5 rounded-md bg-[#0b0f19] border border-[#1e293b] text-xs text-[#dfe2f1] outline-none"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-md bg-[#1e293b] hover:bg-[#334155] text-xs text-[#dfe2f1] flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add
                </button>
              </form>

              <div className="flex flex-wrap gap-1.5">
                {formData.negativeKeywords.map((kw) => (
                  <span
                    key={kw}
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#0b0f19] border border-[#1e293b] text-[11px] font-mono text-[#c2c6d6]"
                  >
                    <span>{kw}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveKeyword(kw)}
                      className="text-[#8c909f] hover:text-[#ef4444]"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
