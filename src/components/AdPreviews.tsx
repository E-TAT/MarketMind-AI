import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  MoreHorizontal, 
  Search, 
  Mail, 
  Copy, 
  Check,
  Instagram
} from 'lucide-react';

interface AdPreviewsProps {
  productName: string;
  imageUrl: string;
  instagram: {
    headline: string;
    caption: string;
    callToAction: string;
    hashtags: string[];
  };
  google: {
    headline: string;
    subheadline: string;
    description: string;
    callToAction: string;
  };
  email: {
    subject: string;
    body: string;
    callToAction: string;
  };
}

export const AdPreviews: React.FC<AdPreviewsProps> = ({
  productName,
  imageUrl,
  instagram,
  google,
  email
}) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 1800);
  };

  const handle = productName.split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g, '') || 'brand';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* 1. INSTAGRAM AD */}
      <div className="relative rounded-2xl bg-[#0a1026]/50 backdrop-blur-2xl border border-indigo-500/20 hover:border-cyan-400/40 shadow-[0_12px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_16px_50px_rgba(34,211,238,0.12)] transition-all duration-300 overflow-hidden flex flex-col justify-between group before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-cyan-400/40 before:to-transparent">
        <div>
          {/* Header */}
          <div className="p-3.5 border-b border-indigo-500/15 flex items-center justify-between bg-[#080d20]/70 backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-500 p-[1.5px] flex items-center justify-center shadow-[0_0_12px_rgba(34,211,238,0.35)]">
                <div className="w-full h-full bg-[#080d20] rounded-full flex items-center justify-center text-[10px] font-bold text-cyan-300 uppercase">
                  {productName.charAt(0)}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-100 leading-tight tracking-wide">
                  {handle}_official
                </div>
                <div className="text-[10px] text-cyan-400/80 font-mono">Sponsored</div>
              </div>
            </div>
            <MoreHorizontal className="w-4 h-4 text-slate-400" />
          </div>

          {/* REAL PRODUCT IMAGE */}
          <div className="relative aspect-square w-full bg-[#060b18] overflow-hidden">
            <img 
              src={imageUrl} 
              alt={productName}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&auto=format&fit=crop&q=80';
              }}
            />
            <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#060b18]/75 backdrop-blur-md border border-cyan-500/30 text-[10px] font-mono font-medium text-cyan-300 shadow-lg">
              Sponsored
            </div>
          </div>

          {/* Action Call To Action Bar */}
          <div className="px-3.5 py-2.5 bg-gradient-to-r from-indigo-950/80 via-[#0d163a]/80 to-cyan-950/80 backdrop-blur-md flex items-center justify-between border-y border-cyan-500/20 text-cyan-300 font-semibold text-xs tracking-wide">
            <span>{instagram.callToAction}</span>
            <span className="text-cyan-400 font-bold">&rarr;</span>
          </div>

          {/* Social Row & Caption */}
          <div className="p-3.5 space-y-2.5">
            <div className="flex items-center justify-between text-slate-400">
              <div className="flex items-center gap-3.5">
                <Heart className="w-4 h-4 text-rose-500 fill-current drop-shadow-[0_0_6px_rgba(244,63,94,0.4)]" />
                <MessageCircle className="w-4 h-4 hover:text-cyan-300 transition-colors" />
                <Send className="w-4 h-4 hover:text-cyan-300 transition-colors" />
              </div>
              <Bookmark className="w-4 h-4 hover:text-cyan-300 transition-colors" />
            </div>

            <div className="text-xs text-slate-200 leading-relaxed">
              <span className="font-semibold text-cyan-300 mr-1.5">{handle}_official</span>
              {instagram.headline} — {instagram.caption}
            </div>

            <div className="text-[11px] text-cyan-400 font-mono space-x-1.5">
              {instagram.hashtags.map((tag, i) => (
                <span key={i} className="hover:underline">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-indigo-500/15 bg-[#080d20]/70 backdrop-blur-md flex items-center justify-between">
          <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
            <Instagram className="w-3.5 h-3.5 text-rose-400" />
            Instagram Feed
          </span>
          <button
            onClick={() => copyToClipboard(`${instagram.headline}\n\n${instagram.caption}\n\n${instagram.hashtags.join(' ')}`, 'insta')}
            className="px-2.5 py-1.5 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/70 text-[11px] font-medium text-cyan-300 border border-indigo-500/30 hover:border-cyan-400/50 flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            {copiedType === 'insta' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-cyan-400" />}
            <span>{copiedType === 'insta' ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* 2. GOOGLE SEARCH AD */}
      <div className="relative rounded-2xl bg-[#0a1026]/50 backdrop-blur-2xl border border-indigo-500/20 hover:border-cyan-400/40 shadow-[0_12px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_16px_50px_rgba(34,211,238,0.12)] transition-all duration-300 overflow-hidden flex flex-col justify-between group before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-cyan-400/40 before:to-transparent">
        <div>
          {/* Header */}
          <div className="p-3.5 border-b border-indigo-500/15 flex items-center justify-between bg-[#080d20]/70 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-xs font-semibold text-slate-100">Google Search Ad</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              Top Result
            </span>
          </div>

          {/* Ad Body */}
          <div className="p-4 space-y-3">
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <span className="font-bold text-slate-200">Sponsored</span>
              <span>·</span>
              <span className="font-mono text-cyan-400/80 truncate">https://www.{handle}.com</span>
            </div>

            <h4 className="text-sm font-semibold text-cyan-300 hover:text-cyan-200 hover:underline cursor-pointer leading-snug tracking-wide">
              {google.headline} | {google.subheadline}
            </h4>

            <p className="text-xs text-slate-300 leading-relaxed">
              {google.description}
            </p>

            <div className="pt-3 border-t border-indigo-500/15 grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 rounded-xl bg-[#080d20]/60 border border-indigo-500/20 hover:border-cyan-500/30 transition-colors">
                <div className="text-cyan-300 font-medium">Free Shipping</div>
                <div className="text-[10px] text-slate-400">On all online orders</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#080d20]/60 border border-indigo-500/20 hover:border-cyan-500/30 transition-colors">
                <div className="text-cyan-300 font-medium">Customer Reviews</div>
                <div className="text-[10px] text-slate-400">Rated 4.9/5 stars</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-indigo-500/15 bg-[#080d20]/70 backdrop-blur-md flex items-center justify-between">
          <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            Search Network
          </span>
          <button
            onClick={() => copyToClipboard(`${google.headline} | ${google.subheadline}\n${google.description}`, 'google')}
            className="px-2.5 py-1.5 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/70 text-[11px] font-medium text-cyan-300 border border-indigo-500/30 hover:border-cyan-400/50 flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            {copiedType === 'google' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-cyan-400" />}
            <span>{copiedType === 'google' ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* 3. EMAIL NEWSLETTER AD */}
      <div className="relative rounded-2xl bg-[#0a1026]/50 backdrop-blur-2xl border border-indigo-500/20 hover:border-cyan-400/40 shadow-[0_12px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_16px_50px_rgba(34,211,238,0.12)] transition-all duration-300 overflow-hidden flex flex-col justify-between group before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-cyan-400/40 before:to-transparent">
        <div>
          {/* Header */}
          <div className="p-3.5 border-b border-indigo-500/15 flex items-center justify-between bg-[#080d20]/70 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-xs font-semibold text-slate-100">Email Campaign</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
              Direct Pitch
            </span>
          </div>

          {/* Email Body */}
          <div className="p-4 space-y-3">
            <div className="p-3 rounded-xl bg-[#080d20]/60 border border-indigo-500/20 space-y-1">
              <div className="text-[11px] text-slate-400">
                <strong className="text-slate-300">From:</strong> {productName} &lt;team@{handle}.com&gt;
              </div>
              <div className="text-xs font-semibold text-cyan-300 leading-tight">
                <strong className="text-slate-300">Subject:</strong> {email.subject}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#080d20]/40 border border-indigo-500/15 text-xs text-slate-300 leading-relaxed">
              {email.body}
            </div>

            <div className="pt-2 text-center">
              <button className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white text-xs font-semibold transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] cursor-pointer">
                {email.callToAction} &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-indigo-500/15 bg-[#080d20]/70 backdrop-blur-md flex items-center justify-between">
          <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-indigo-400" />
            Email List
          </span>
          <button
            onClick={() => copyToClipboard(`Subject: ${email.subject}\n\n${email.body}\n\nCTA: ${email.callToAction}`, 'email')}
            className="px-2.5 py-1.5 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/70 text-[11px] font-medium text-cyan-300 border border-indigo-500/30 hover:border-cyan-400/50 flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            {copiedType === 'email' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-cyan-400" />}
            <span>{copiedType === 'email' ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
