import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Smartphone, 
  Cpu, 
  Globe, 
  Layout, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Clock, 
  ShieldCheck,
  Terminal
} from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { ServiceCardSchematic } from './ServiceCardSchematic';

export const ServicesShowcaseStory: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const activeService = servicesData[activeTab];

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone': return Smartphone;
      case 'Cpu': return Cpu;
      case 'Globe': return Globe;
      case 'Layout': return Layout;
      case 'Sparkles': return Sparkles;
      default: return Cpu;
    }
  };

  return (
    <div className="w-full space-y-12">
      {/* 1. Atelier Nav Tabs (Pill Carousel) */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
        {servicesData.map((service, index) => {
          const Icon = getServiceIcon(service.iconName);
          const isSelected = index === activeTab;
          return (
            <button
              key={service.id}
              onClick={() => setActiveTab(index)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                isSelected
                  ? 'bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-violet-500/20 border border-cyan-400 text-white shadow-[0_0_25px_rgba(6,182,212,0.3)]'
                  : 'bg-white/[0.03] border border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
              <span>0{index + 1}. {service.title}</span>
            </button>
          );
        })}
      </div>

      {/* 2. Interactive Atelier Showcase Stage */}
      <div className="glass-luxury-surface rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden shadow-2xl">
        {/* Dynamic Background Radial Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-violet-600/10 rounded-full blur-[130px] pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Editorial Narrative & Specifications */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono font-semibold text-cyan-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                <span>CAPABILITY SPECIFICATION 0{activeTab + 1}</span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                {activeService.title}
              </h3>

              <p className="text-sm sm:text-base text-cyan-300/90 font-medium">
                {activeService.subtitle}
              </p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed pt-2">
                {activeService.fullDescription}
              </p>
            </div>

            {/* Architectural Highlights Pill Grid */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                ENGINEERING HIGHLIGHTS:
              </div>
              <div className="grid grid-cols-1 gap-2.5">
                {activeService.architectureHighlights.map((highlight, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] text-xs text-slate-200 flex items-start gap-3"
                  >
                    <Layers className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Capabilities */}
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                KEY TECHNICAL CAPABILITIES:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                {activeService.keyCapabilities.map((cap, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-white/[0.08]">
              <Link
                to={`/services#${activeService.id}`}
                className="btn-luxury-primary inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-[#07090e] bg-gradient-to-r from-cyan-400 to-emerald-400 border border-white/20 shadow-[0_0_25px_rgba(6,182,212,0.4)]"
              >
                <span>View Complete Service Dossier</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-white/[0.03] px-3.5 py-2.5 rounded-full border border-white/[0.08]">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>{activeService.deliveryTimeline}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Technical Schematic & Verification Matrix */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Interactive Schematic */}
            <div className="p-6 rounded-2xl bg-black/60 border border-white/10 shadow-xl space-y-4 text-left">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold">
                  <Terminal className="w-4 h-4" />
                  <span>RUNTIME TELEMETRY SCHEMATIC</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  VERIFIED
                </span>
              </div>

              <ServiceCardSchematic serviceId={activeService.id} />
            </div>

            {/* Benefits & Commercial Guarantees */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0e1628]/80 to-[#080d1a]/90 border border-cyan-500/30 shadow-xl space-y-4 text-left">
              <div className="text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>ENTERPRISE BENEFIT SCORECARD</span>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                {activeService.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400">
                <span>Code Ownership:</span>
                <span className="text-emerald-400 font-mono font-bold">100% Client Transferred</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
