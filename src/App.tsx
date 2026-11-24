import React, { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  Play, 
  Cpu, 
  SlidersHorizontal,
  Instagram,
  Search,
  Mail,
  Zap,
  Activity
} from 'lucide-react';
import { AdPreviews } from './components/AdPreviews';

interface CampaignData {
  product: string;
  audience: string;
  budget: number;
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
  budgetSplit: {
    instagram: number;
    google: number;
    email: number;
  };
  results: {
    reach: number;
    clicks: number;
    conversions: number;
    roi: string;
  };
  log: string;
}

const DEFAULT_CAMPAIGN = {
  product: 'TurboCook Pro - 2200W Smart Induction Cooker',
  audience: 'Home chefs, busy families & cooking lovers',
  budget: 130,
  image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=700&auto=format&fit=crop&q=80'
};

export default function App() {
  const [product, setProduct] = useState(DEFAULT_CAMPAIGN.product);
  const [audience, setAudience] = useState(DEFAULT_CAMPAIGN.audience);
  const [budget, setBudget] = useState(DEFAULT_CAMPAIGN.budget);
  const [imageUrl, setImageUrl] = useState(DEFAULT_CAMPAIGN.image);
  const [isGenerating, setIsGenerating] = useState(false);
  const [simDay, setSimDay] = useState(1);

  // Active campaign state
  const [campaign, setCampaign] = useState<CampaignData>({
    product: DEFAULT_CAMPAIGN.product,
    audience: DEFAULT_CAMPAIGN.audience,
    budget: DEFAULT_CAMPAIGN.budget,
    imageUrl: DEFAULT_CAMPAIGN.image,
    instagram: {
      headline: 'Cook 50% Faster with Precision Temperature Control',
      caption: 'Meet TurboCook Pro. Ultra-slim 2200W induction cooking with instant heat response, child lock, and zero flame risk. Upgrade your kitchen today! 🍳',
      callToAction: 'Shop Now',
      hashtags: ['#SmartCooking', '#InductionCooker', '#KitchenUpgrade']
    },
    google: {
      headline: 'TurboCook Pro Smart Induction Cooker',
      subheadline: '2200W Rapid Heating | Energy Efficient',
      description: 'Boil water in 90 seconds with magnetic induction technology. Easy-clean ceramic surface and 10 power levels.',
      callToAction: 'Order Online'
    },
    email: {
      subject: 'Exclusive 20% Off: Say Goodbye to Slow Gas Stoves',
      body: 'Hi Chef! Discover why thousands of home cooks are switching to TurboCook Pro for faster, safer, and cleaner meals. Use code INDUCT20 for 20% off this week only!',
      callToAction: 'Claim 20% Discount'
    },
    budgetSplit: {
      instagram: 58,
      google: 46,
      email: 26
    },
    results: {
      reach: 5200,
      clicks: 430,
      conversions: 28,
      roi: '3.6x'
    },
    log: 'MarketMind AI allocated 45% Instagram, 35% Google, 20% Email for induction cooking enthusiasts.'
  });

  // Pick suitable image based on product keywords
  const pickImage = (text: string) => {
    const lower = text.toLowerCase();

    // 1. Induction Cooker / Kitchen Appliances
    if (
      lower.includes('induct') ||
      lower.includes('cooker') ||
      lower.includes('cook') ||
      lower.includes('stove') ||
      lower.includes('kitchen') ||
      lower.includes('oven') ||
      lower.includes('pot') ||
      lower.includes('pan') ||
      lower.includes('fryer') ||
      lower.includes('kettle') ||
      lower.includes('blender') ||
      lower.includes('microwave') ||
      lower.includes('grill') ||
      lower.includes('toaster')
    ) {
      return 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=700&auto=format&fit=crop&q=80';
    }

    // 2. Coffee / Espresso
    if (lower.includes('coffee') || lower.includes('brew') || lower.includes('espresso') || lower.includes('cafe') || lower.includes('tea') || lower.includes('mug')) {
      return 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=700&auto=format&fit=crop&q=80';
    }

    // 3. Shoes / Sneakers / Running
    if (lower.includes('shoe') || lower.includes('run') || lower.includes('sneaker') || lower.includes('footwear') || lower.includes('boot')) {
      return 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&auto=format&fit=crop&q=80';
    }

    // 4. Laptop / Coding / Tech Software
    if (lower.includes('code') || lower.includes('student') || lower.includes('laptop') || lower.includes('app') || lower.includes('software') || lower.includes('pc') || lower.includes('computer')) {
      return 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=700&auto=format&fit=crop&q=80';
    }

    // 5. Watch / Smartwatch / Fitness band
    if (lower.includes('watch') || lower.includes('band') || lower.includes('heart') || lower.includes('pulse')) {
      return 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=700&auto=format&fit=crop&q=80';
    }

    // 6. Headphones / Earbuds / Audio
    if (lower.includes('headphone') || lower.includes('earbud') || lower.includes('audio') || lower.includes('speaker') || lower.includes('sound') || lower.includes('airpod') || lower.includes('music')) {
      return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&auto=format&fit=crop&q=80';
    }

    // 7. Smartphone / Mobile / Phone
    if (lower.includes('phone') || lower.includes('mobile') || lower.includes('iphone') || lower.includes('android') || lower.includes('tablet')) {
      return 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700&auto=format&fit=crop&q=80';
    }

    // 8. Clothes / Fashion / T-shirt / Apparel
    if (lower.includes('shirt') || lower.includes('hoodie') || lower.includes('cloth') || lower.includes('fashion') || lower.includes('jacket') || lower.includes('dress') || lower.includes('wear')) {
      return 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=700&auto=format&fit=crop&q=80';
    }

    // 9. Water Bottle / Hydration / Tumbler
    if (lower.includes('bottle') || lower.includes('water') || lower.includes('tumbler') || lower.includes('flask') || lower.includes('drink')) {
      return 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=700&auto=format&fit=crop&q=80';
    }

    // 10. Beauty / Skincare / Cosmetics
    if (lower.includes('skin') || lower.includes('serum') || lower.includes('cream') || lower.includes('beauty') || lower.includes('cosmetic') || lower.includes('perfume') || lower.includes('lotion')) {
      return 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=700&auto=format&fit=crop&q=80';
    }

    // 11. Food / Snack / Restaurant / Burger / Pizza
    if (lower.includes('food') || lower.includes('burger') || lower.includes('pizza') || lower.includes('snack') || lower.includes('cake') || lower.includes('bake') || lower.includes('meal')) {
      return 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&auto=format&fit=crop&q=80';
    }

    // 12. Backpack / Bag / Luggage
    if (lower.includes('bag') || lower.includes('backpack') || lower.includes('wallet') || lower.includes('luggage') || lower.includes('travel')) {
      return 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&auto=format&fit=crop&q=80';
    }

    // 13. Fitness / Gym / Workout / Yoga
    if (lower.includes('gym') || lower.includes('fitness') || lower.includes('workout') || lower.includes('yoga') || lower.includes('dumbbell')) {
      return 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=700&auto=format&fit=crop&q=80';
    }

    // Neutral premium product showcase
    return 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=700&auto=format&fit=crop&q=80';
  };

  // Generate Campaign
  const handleRunAgent = async () => {
    setIsGenerating(true);

    const targetImg = pickImage(product);
    setImageUrl(targetImg);

    await new Promise(r => setTimeout(r, 650));

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch('/api/generate-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product, audience, budget }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const json = await res.json();
      if (json && json.data) {
        const d = json.data;
        setCampaign({
          product,
          audience,
          budget,
          imageUrl: targetImg,
          instagram: d.instagram || {
            headline: `Experience the Power of ${product}`,
            caption: `Built for ${audience}. Say goodbye to ordinary alternatives and upgrade today! ✨`,
            callToAction: 'Shop Now',
            hashtags: ['#Trending', '#TopChoice', '#Innovation']
          },
          google: d.google || {
            headline: `${product} | Official Store`,
            subheadline: `Top Rated for ${audience}`,
            description: `Get the original ${product}. Fast delivery, 30-day money back guarantee, and 24/7 customer support.`,
            callToAction: 'Order Today'
          },
          email: d.email || {
            subject: `Exclusive 20% Off: Introducing ${product}`,
            body: `Hi there! We built ${product} specifically for ${audience}. Click below to unlock your limited-time introductory discount code!`,
            callToAction: 'Claim 20% Discount'
          },
          budgetSplit: d.budgetSplit || {
            instagram: Math.round(budget * 0.45),
            google: Math.round(budget * 0.35),
            email: Math.round(budget * 0.20)
          },
          results: {
            reach: d.predictedResults?.estimatedReach || Math.round(budget * 38),
            clicks: d.predictedResults?.estimatedClicks || Math.round(budget * 3.2),
            conversions: Math.round((d.predictedResults?.estimatedClicks || Math.round(budget * 3.2)) * 0.07) || 18,
            roi: d.predictedResults?.estimatedRoi || '3.4x'
          },
          log: `MarketMind AI crafted 3 multi-platform campaigns for "${audience}".`
        });
        setSimDay(1);
        setIsGenerating(false);
        return;
      }
    } catch (e) {
      console.log('Using local agent generator:', e);
    }

    // Instant local fallback
    const pName = product.trim() || 'Smart Product';
    const aud = audience.trim() || 'Customers';
    const instaSplit = Math.round(budget * 0.45);
    const googleSplit = Math.round(budget * 0.35);
    const emailSplit = budget - instaSplit - googleSplit;

    setCampaign({
      product: pName,
      audience: aud,
      budget,
      imageUrl: targetImg,
      instagram: {
        headline: `Upgrade Your Daily Routine with ${pName}`,
        caption: `Designed exclusively for ${aud}. Discover unmatched performance and quality engineered to fit your lifestyle! 🚀`,
        callToAction: 'Shop Now',
        hashtags: ['#UpgradeNow', '#TopChoice', '#Innovation']
      },
      google: {
        headline: `${pName} | Official Website`,
        subheadline: `Top Rated for ${aud}`,
        description: `Explore the all-new ${pName}. Fast direct delivery, 30-day returns, and 5-star customer ratings.`,
        callToAction: 'Order Today'
      },
      email: {
        subject: `Exclusive Offer: Try ${pName} for 20% Less`,
        body: `Hi there! Looking for the best solution for ${aud}? Check out ${pName} today and use code SPECIAL20 at checkout for an instant discount.`,
        callToAction: 'Claim 20% Discount'
      },
      budgetSplit: {
        instagram: instaSplit,
        google: googleSplit,
        email: emailSplit
      },
      results: {
        reach: Math.round(budget * 40),
        clicks: Math.round(budget * 3.4),
        conversions: Math.max(12, Math.round(budget * 0.2)),
        roi: '3.5x'
      },
      log: `MarketMind AI allocated 45% Instagram, 35% Google, 20% Email for ${aud}.`
    });

    setSimDay(1);
    setIsGenerating(false);
  };

  // Simulate Next Day
  const handleSimulateDay = () => {
    setSimDay(prev => prev + 1);
    const addedReach = Math.floor(Math.random() * 1000 + 1200);
    const addedClicks = Math.floor(Math.random() * 70 + 80);
    const addedConv = Math.floor(Math.random() * 6 + 5);

    const logMessages = [
      `Day ${simDay + 1}: MarketMind AI increased Instagram budget by $5 because Instagram generated 58% of all sales.`,
      `Day ${simDay + 1}: Google Search conversion rate improved to 4.9% (high search intent).`,
      `Day ${simDay + 1}: Optimized email subject line for higher open rate (+14% clicks).`
    ];
    const picked = logMessages[Math.floor(Math.random() * logMessages.length)];

    setCampaign(prev => ({
      ...prev,
      results: {
        ...prev.results,
        reach: prev.results.reach + addedReach,
        clicks: prev.results.clicks + addedClicks,
        conversions: prev.results.conversions + addedConv
      },
      log: picked
    }));
  };

  return (
    <div className="min-h-screen bg-[#060b18] text-slate-100 flex flex-col font-sans pb-16 relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-300">
      {/* Background Liquid Light Orbs for Glassmorphism */}
      <div className="fixed top-[-80px] left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/15 blur-[140px] pointer-events-none liquid-orb-indigo" />
      <div className="fixed bottom-0 right-1/4 w-[550px] h-[550px] rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none liquid-orb-cyan" />
      <div className="fixed top-1/2 -right-20 w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-[130px] pointer-events-none" />

      {/* Top Header with Liquid Frosted Glass */}
      <header className="border-b border-indigo-500/20 bg-[#080d20]/70 backdrop-blur-2xl px-4 sm:px-6 py-3.5 sticky top-0 z-30 shadow-[0_4px_30px_rgba(0,0,0,0.5)] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1.5px] flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.35)]">
            <div className="w-full h-full bg-[#080d20] rounded-[10px] flex items-center justify-center text-cyan-400">
              <Zap className="w-4 h-4 fill-current text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
            </div>
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent tracking-tight">
              MarketMind AI
            </h1>
            <p className="text-[11px] text-cyan-400/80 font-mono">
              Autonomous Campaign & Marketing Intelligence
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-2 text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.15)] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
            Agent Nominal
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl w-full mx-auto p-4 sm:p-6 space-y-6 relative z-10">
        {/* CARD 1: INPUT CONTROLS with Liquid Glassmorphism */}
        <section className="relative rounded-2xl bg-[#0a1026]/50 backdrop-blur-2xl border border-indigo-500/25 hover:border-cyan-400/40 shadow-[0_12px_45px_rgba(0,0,0,0.6)] p-5 sm:p-6 space-y-5 transition-all duration-300 before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-cyan-400/50 before:to-transparent overflow-hidden">
          <div className="flex items-center gap-2.5 pb-3 border-b border-indigo-500/20">
            <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-semibold text-slate-100 tracking-wide">
              Campaign Setup
            </h2>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
            <div className="md:col-span-5">
              <label className="block text-[11px] font-mono text-cyan-400/90 uppercase tracking-wider mb-1.5">
                Product Name
              </label>
              <input
                type="text"
                value={product}
                onChange={(e) => {
                  const val = e.target.value;
                  setProduct(val);
                  setImageUrl(pickImage(val));
                }}
                placeholder="e.g. Smart Induction Cooker"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#060b18]/70 backdrop-blur-md border border-indigo-500/30 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.25)] text-xs outline-none transition-all"
              />
            </div>

            <div className="md:col-span-4">
              <label className="block text-[11px] font-mono text-cyan-400/90 uppercase tracking-wider mb-1.5">
                Target Audience
              </label>
              <input
                type="text"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="e.g. Home chefs & busy families"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#060b18]/70 backdrop-blur-md border border-indigo-500/30 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.25)] text-xs outline-none transition-all"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-[11px] font-mono text-cyan-400/90 uppercase tracking-wider mb-1.5">
                Total Budget: <span className="text-cyan-300 font-bold font-mono">${budget}</span>
              </label>
              <input
                type="range"
                min="50"
                max="500"
                step="10"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-2 bg-indigo-950/80 rounded-lg appearance-none cursor-pointer accent-cyan-400 mt-3"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>$50</span>
                <span>$500</span>
              </div>
            </div>
          </div>

          {/* Main Action Button */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={handleRunAgent}
              disabled={isGenerating}
              className={`
                w-full sm:w-auto px-7 py-3 rounded-xl text-xs font-semibold text-white
                bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400
                active:scale-[0.98] shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:shadow-[0_0_35px_rgba(34,211,238,0.4)]
                border border-cyan-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer
                ${isGenerating ? 'opacity-70 cursor-wait' : ''}
              `}
            >
              <Sparkles className={`w-4 h-4 text-cyan-200 ${isGenerating ? 'animate-spin' : ''}`} />
              <span className="tracking-wide">{isGenerating ? 'MarketMind AI Synthesizing...' : 'Run MarketMind AI'}</span>
            </button>
          </div>
        </section>

        {/* CARD 2: GENERATED ADS PREVIEWS */}
        <section className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-100 flex items-center gap-2 tracking-wide">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Generated Multi-Platform Ads
            </h2>
            <span className="text-xs text-slate-400">
              Product: <span className="text-cyan-300 font-mono">{campaign.product}</span>
            </span>
          </div>

          <AdPreviews
            productName={campaign.product}
            imageUrl={campaign.imageUrl}
            instagram={campaign.instagram}
            google={campaign.google}
            email={campaign.email}
          />
        </section>

        {/* CARD 3: BUDGET & SIMULATION with Liquid Glassmorphism */}
        <section className="relative rounded-2xl bg-[#0a1026]/50 backdrop-blur-2xl border border-indigo-500/25 shadow-[0_12px_45px_rgba(0,0,0,0.6)] p-5 sm:p-6 space-y-5 before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-indigo-400/50 before:to-transparent overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-indigo-500/20">
            <div>
              <h2 className="text-sm font-semibold text-slate-100 flex items-center gap-2 tracking-wide">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                Budget Split & Live Performance Simulation (Day {simDay})
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                MarketMind AI dynamically tracks engagement and rebalances budget to maximize ROI.
              </p>
            </div>

            <button
              onClick={handleSimulateDay}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 border border-indigo-400/30 text-white text-xs font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.35)] transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current text-cyan-300" />
              <span>Simulate Next Day of Traffic</span>
            </button>
          </div>

          {/* Budget Split Bars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <div className="p-4 rounded-xl bg-[#080d20]/60 backdrop-blur-md border border-indigo-500/20 hover:border-cyan-500/30 flex items-center justify-between transition-colors shadow-inner">
              <div className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-rose-400" />
                <span className="text-xs font-medium text-slate-200">Instagram (45%)</span>
              </div>
              <span className="text-xs font-mono font-bold text-cyan-300">
                ${campaign.budgetSplit.instagram}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#080d20]/60 backdrop-blur-md border border-indigo-500/20 hover:border-cyan-500/30 flex items-center justify-between transition-colors shadow-inner">
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-medium text-slate-200">Google Search (35%)</span>
              </div>
              <span className="text-xs font-mono font-bold text-cyan-300">
                ${campaign.budgetSplit.google}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#080d20]/60 backdrop-blur-md border border-indigo-500/20 hover:border-cyan-500/30 flex items-center justify-between transition-colors shadow-inner">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-medium text-slate-200">Email Blast (20%)</span>
              </div>
              <span className="text-xs font-mono font-bold text-cyan-300">
                ${campaign.budgetSplit.email}
              </span>
            </div>
          </div>

          {/* Live Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-1">
            <div className="p-4 rounded-xl bg-[#080d20]/60 backdrop-blur-md border border-indigo-500/20 hover:border-indigo-400/30 transition-colors">
              <span className="text-[10px] font-mono text-cyan-400/80 block">ESTIMATED REACH</span>
              <span className="text-xl font-bold font-mono text-slate-100 mt-1 block">
                {campaign.results.reach.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400">Ad Impressions</span>
            </div>

            <div className="p-4 rounded-xl bg-[#080d20]/60 backdrop-blur-md border border-indigo-500/20 hover:border-cyan-400/30 transition-colors">
              <span className="text-[10px] font-mono text-cyan-400/80 block">CLICK-THROUGHS</span>
              <span className="text-xl font-bold font-mono text-cyan-300 mt-1 block drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">
                {campaign.results.clicks.toLocaleString()}
              </span>
              <span className="text-[10px] text-cyan-400/80">Store Visitors</span>
            </div>

            <div className="p-4 rounded-xl bg-[#080d20]/60 backdrop-blur-md border border-indigo-500/20 hover:border-emerald-400/30 transition-colors">
              <span className="text-[10px] font-mono text-cyan-400/80 block">CONVERSIONS</span>
              <span className="text-xl font-bold font-mono text-emerald-400 mt-1 block drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]">
                {campaign.results.conversions}
              </span>
              <span className="text-[10px] text-emerald-400/80">Purchases Made</span>
            </div>

            <div className="p-4 rounded-xl bg-[#080d20]/60 backdrop-blur-md border border-indigo-500/20 hover:border-indigo-400/30 transition-colors">
              <span className="text-[10px] font-mono text-cyan-400/80 block">PROJECTED ROI</span>
              <span className="text-xl font-bold font-mono text-indigo-300 mt-1 block drop-shadow-[0_0_8px_rgba(99,102,241,0.35)]">
                {campaign.results.roi}
              </span>
              <span className="text-[10px] text-indigo-400/80">Return on Ad Spend</span>
            </div>
          </div>

          {/* Autonomous Optimization Status */}
          <div className="p-3.5 rounded-xl bg-[#080d20]/75 backdrop-blur-md border border-cyan-500/20 flex items-start gap-2.5 text-xs">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div className="text-slate-200">
              <strong className="text-cyan-300 font-semibold font-mono">MarketMind Decision Log: </strong>
              <span>{campaign.log}</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
