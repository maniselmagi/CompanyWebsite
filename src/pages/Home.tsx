import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Cpu,
  CheckCircle2,
  Smartphone,
  ExternalLink,
  Lock,
  ChevronRight,
  Globe,
  Activity,
  Compass
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import {
  developmentProcessSteps,
  whyChooseNexoraPoints,
  engineeringStandards,
  companyProfile
} from '../data/companyData';
import { HeroExperience3D } from '../components/HeroExperience3D';
import { Kiosk3DViewer } from '../components/Kiosk3DViewer';
import { InteractiveDashboardMockup } from '../components/InteractiveDashboardMockup';
import { CaseStudyModal } from '../components/CaseStudyModal';
import { ServicesShowcaseStory } from '../components/ServicesShowcaseStory';
import { RevealOnScroll } from '../components/RevealOnScroll';
import type { PortfolioItem } from '../types';

export const Home: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const smartKioskProject = portfolioData.find((p) => p.id === 'smart-kiosk') || portfolioData[0];

  return (
    <div className="relative min-h-screen page-entrance selection:bg-cyan-500 selection:text-black">
      {/* Dynamic Atmospheric Spatial Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[700px] bg-gradient-to-b from-cyan-500/10 via-violet-600/6 to-transparent blur-[140px] opacity-80 animate-ambient-glow"></div>
        <div className="absolute top-[35%] -left-64 w-[500px] h-[500px] bg-cyan-600/8 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute top-[65%] -right-64 w-[550px] h-[550px] bg-violet-600/10 rounded-full blur-[160px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-tech-grid opacity-20"></div>
      </div>

      <div className="relative z-10">
        {/* =========================================================================
            SECTION A: CINEMATIC FULL-SCREEN 3D HERO EXPERIENCE
            ========================================================================= */}
        <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          {/* Brand Announcement Badge */}
          <RevealOnScroll variant="fade-down" delay={50}>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-950/70 via-purple-950/50 to-cyan-950/70 border border-cyan-400/40 text-xs sm:text-sm text-slate-300 shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:border-cyan-300 transition-all">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="font-editorial font-bold tracking-widest text-white uppercase">{companyProfile.name}</span>
              <span className="text-slate-500">|</span>
              <span className="text-cyan-300 font-medium">{companyProfile.tagline}</span>
            </div>
          </RevealOnScroll>

          {/* Monumental Editorial Headline (Lusion / Apple Scale) */}
          <RevealOnScroll variant="fade-up" delay={150}>
            <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-black tracking-tight leading-[1.04] max-w-5xl mx-auto mt-6">
              <span className="text-titanium block">
                Commercial Self-Order Kiosks
              </span>
              <span className="text-electric-cyan block mt-1 sm:mt-2">
                &amp; Next-Gen Software Engineering.
              </span>
            </h1>
          </RevealOnScroll>

          {/* Sub-headline Narrative */}
          <RevealOnScroll variant="fade-up" delay={250}>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal mt-6">
              {companyProfile.shortDescription}
            </p>
          </RevealOnScroll>

          {/* Primary Action Suite */}
          <RevealOnScroll variant="fade-up" delay={350}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Link
                to="/portfolio"
                className="btn-luxury-primary w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm sm:text-base font-bold text-[#07090e] bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 border border-white/30 shadow-[0_0_35px_rgba(6,182,212,0.45)]"
              >
                <span>Explore Smart-Kiosk Showcase</span>
                <ArrowRight className="w-4 h-4 text-[#07090e]" />
              </Link>
              <Link
                to="/services"
                className="btn-luxury-outline w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm sm:text-base font-semibold text-slate-200"
              >
                <span>View Our 5 Capabilities</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </RevealOnScroll>

          {/* THE 3D WEBGL HERO STAGE (Pervasive & Interactive) */}
          <div className="relative mt-12 w-full max-w-6xl mx-auto">
            <RevealOnScroll variant="scale-up" delay={200}>
              <div className="relative rounded-3xl bg-gradient-to-b from-[#0c1224] via-[#070b16] to-[#03050a] border border-cyan-500/35 p-2 sm:p-3 shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_70px_rgba(6,182,212,0.2)] overflow-hidden">
                {/* 3D WebGL Canvas */}
                <HeroExperience3D />
              </div>
            </RevealOnScroll>
          </div>

          {/* Engineering Guarantees Banner below 3D Stage */}
          <RevealOnScroll variant="fade-in" delay={450}>
            <div className="pt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-400">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08]">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Client Code &amp; IP Ownership</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08]">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Real Working Software Experience</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08]">
                <Lock className="w-4 h-4 text-violet-400" />
                <span>Strict Mutual Confidentiality</span>
              </div>
            </div>

            {/* Animated Scroll to Architecture Exploration Indicator */}
            <div className="pt-8 flex items-center justify-center">
              <a
                href="#company-narrative"
                className="inline-flex items-center gap-2.5 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-all py-2 px-5 rounded-full bg-white/[0.02] border border-white/[0.08] hover:border-cyan-500/40 shadow-sm"
              >
                <span className="w-2.5 h-4 rounded-full border border-slate-400 flex items-start justify-center p-0.5">
                  <span className="w-1 h-1 rounded-full bg-cyan-400 animate-scroll-wheel"></span>
                </span>
                <span className="tracking-wider uppercase text-[11px]">SCROLL TO EXPLORE ARCHITECTURE</span>
              </a>
            </div>
          </RevealOnScroll>
        </section>

        {/* =========================================================================
            SECTION B: COMPANY INTRODUCTION & ARCHITECTURAL NARRATIVE
            ========================================================================= */}
        <section id="company-narrative" className="py-24 border-y border-white/[0.06] bg-[#050811]/90">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6 text-left">
                <RevealOnScroll variant="fade-up">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono font-semibold text-cyan-300">
                    <Compass className="w-3.5 h-3.5" />
                    <span>01 // ARCHITECTURAL IDENTITY</span>
                  </div>

                  <h2 className="font-editorial text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mt-3">
                    A Global Software Consultancy Built On <span className="text-electric-cyan">Uncompromising Rigor</span>.
                  </h2>
                </RevealOnScroll>

                <RevealOnScroll variant="fade-up" delay={100}>
                  <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                    <p>
                      At <strong className="text-white">NEXORA TECHNOLOGIES</strong>, we reject generic agency templates and brittle shortcuts. We engineer bespoke touch kiosk operating systems, commercial tablet software, and mission-critical web platforms designed for high-volume durability.
                    </p>
                    <p>
                      From restaurant dining room kiosks coordinating instant kitchen ticket streams to enterprise business management portals, our systems are built with strict static typing, deterministic logic, and 100% intellectual property transfer.
                    </p>
                  </div>
                </RevealOnScroll>

                <RevealOnScroll variant="fade-up" delay={180}>
                  <div className="pt-2 flex flex-wrap gap-3 text-xs font-mono text-slate-300">
                    <div className="px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>100% In-House Senior Engineers</span>
                    </div>
                    <div className="px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-cyan-400" />
                      <span>Zero Subcontracting Layers</span>
                    </div>
                    <div className="px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-2">
                      <Lock className="w-4 h-4 text-violet-400" />
                      <span>Strict Mutual NDA Governance</span>
                    </div>
                  </div>
                </RevealOnScroll>
              </div>

              {/* Right Column: Architectural Telemetry Spec Matrix */}
              <div className="lg:col-span-5">
                <RevealOnScroll variant="scale-up" delay={150}>
                  <div className="glass-luxury-surface p-8 rounded-3xl border border-cyan-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] space-y-6 text-left relative overflow-hidden">
                    <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                      <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold">
                        <Activity className="w-4 h-4" />
                        <span>CORE ARCHITECTURAL TELEMETRY</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        NOMINAL
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                        <div className="text-2xl font-black font-mono text-cyan-400">&lt; 50ms</div>
                        <div className="text-xs font-semibold text-white mt-1">Ticket Sync Latency</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">Zero Cloud Lag</div>
                      </div>
                      <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                        <div className="text-2xl font-black font-mono text-violet-400">5 Langs</div>
                        <div className="text-xs font-semibold text-white mt-1">Multilingual Engine</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">Instant Switcher</div>
                      </div>
                      <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                        <div className="text-2xl font-black font-mono text-emerald-400">100%</div>
                        <div className="text-xs font-semibold text-white mt-1">Client IP Ownership</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">Zero Lock-In</div>
                      </div>
                      <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                        <div className="text-2xl font-black font-mono text-blue-400">&gt; 48px</div>
                        <div className="text-xs font-semibold text-white mt-1">Touch Target Standard</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">Ergonomic Touch</div>
                      </div>
                    </div>

                    <div className="pt-2 text-xs text-slate-400 border-t border-white/[0.06] flex items-center justify-between">
                      <span>HQ Operations:</span>
                      <span className="text-slate-200 font-mono">Coimbatore • Remote Worldwide</span>
                    </div>
                  </div>
                </RevealOnScroll>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION C: CORE SERVICES (STORYTELLING & INTERACTIVE ATELIER)
            ========================================================================= */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <RevealOnScroll variant="fade-up">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 text-left">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-mono font-semibold text-violet-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>02 // CAPABILITIES ATELIER</span>
                </div>
                <h2 className="font-editorial text-3xl sm:text-5xl font-black text-white tracking-tight">
                  Services We Architect &amp; Deliver
                </h2>
                <p className="text-slate-400 text-sm sm:text-base">
                  Bespoke software development, commercial touch kiosk interfaces, web applications, and ergonomic design systems.
                </p>
              </div>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group"
              >
                <span>View Full Service Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </RevealOnScroll>

          {/* Bespoke Interactive Services Storytelling Component */}
          <ServicesShowcaseStory />
        </section>

        {/* =========================================================================
            SECTION D: FLAGSHIP REAL-WORLD PROJECT: SMART-KIOSK (ORDEREASE)
            ========================================================================= */}
        <section id="smart-kiosk-spotlight" className="py-24 border-y border-white/[0.06] bg-[#04060c]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <RevealOnScroll variant="fade-up">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-3 max-w-2xl text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono font-semibold text-emerald-300">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>03 // FLAGSHIP REAL-WORLD PROJECT</span>
                  </div>
                  <h2 className="font-editorial text-3xl sm:text-5xl font-black text-white tracking-tight">
                    Smart-Kiosk (OrderEase)
                  </h2>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Our real, working commercial kiosk prototype built for restaurant dining rooms. Features responsive table-side self-ordering, real-time ticket synchronization with kitchen displays, 5-language multilingual engine, and split-bill calculation.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="https://maniselmagi.github.io/smart-kiosk-demo/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-[#07090e] bg-gradient-to-r from-cyan-400 to-emerald-400 hover:scale-105 shadow-lg shadow-cyan-500/30 transition-all"
                  >
                    <span>Launch 24/7 Cloud Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setSelectedProject(smartKioskProject)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all"
                  >
                    <span>Technical Architecture Specs</span>
                  </button>
                </div>
              </div>

              {/* Apple-Style 4-Metric Keynote Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
                <div className="p-5 rounded-2xl bg-[#090e1c]/80 border border-cyan-500/25 shadow-lg text-left">
                  <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-400">&lt; 50ms</div>
                  <div className="text-xs font-semibold text-white mt-1">Cross-Screen Sync</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">BroadcastChannel Event Bus</div>
                </div>
                <div className="p-5 rounded-2xl bg-[#090e1c]/80 border border-violet-500/25 shadow-lg text-left">
                  <div className="text-2xl sm:text-3xl font-black font-mono text-violet-400">5 Langs</div>
                  <div className="text-xs font-semibold text-white mt-1">Multilingual Engine</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">EN, TA, HI, TE, ES</div>
                </div>
                <div className="p-5 rounded-2xl bg-[#090e1c]/80 border border-blue-500/25 shadow-lg text-left">
                  <div className="text-2xl sm:text-3xl font-black font-mono text-blue-400">8"–12"</div>
                  <div className="text-xs font-semibold text-white mt-1">Hardware Optimized</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Tablets &amp; Commercial Totems</div>
                </div>
                <div className="p-5 rounded-2xl bg-[#090e1c]/80 border border-emerald-500/25 shadow-lg text-left">
                  <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">100% Real</div>
                  <div className="text-xs font-semibold text-white mt-1">Production Prototype</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Verified Working Codebase</div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Interactive 3D Tablet Kiosk Hardware Simulator */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7">
                <RevealOnScroll variant="slide-right">
                  <Kiosk3DViewer />
                </RevealOnScroll>
              </div>

              {/* Verified Product Features Matrix */}
              <div className="lg:col-span-5 space-y-4 text-left">
                <RevealOnScroll variant="slide-left">
                  <div className="glass-luxury-surface p-7 rounded-3xl space-y-5 shadow-2xl border border-white/10">
                    <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                        Verified Working Capabilities
                      </span>
                      <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        Tested in Source Code
                      </span>
                    </div>

                    <div className="space-y-3 text-xs text-slate-300">
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white">Multilingual 5-Language Switcher:</strong> Real-time toggle across English, Tamil, Hindi, Telugu, and Spanish.
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white">4-Level Custom Spice Selector:</strong> Interactive Mild, Medium, Hot, and Extra Hot sliders with chef notes.
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white">Kitchen Display (KDS) Live Sync:</strong> Real-time ticket dispatch updating table status trackers (New &rarr; Preparing &rarr; Ready).
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white">Split-Bill & Tipping Engine:</strong> Flexible check division across 2 to 5 diners with digital tipping options.
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white">Call Waiter Matrix & Sold-Out Toggles:</strong> 4 instant table alert options and 1-tap item availability management.
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs">
                      <span className="text-slate-400">Target Hardware:</span>
                      <span className="text-slate-200 font-mono font-medium">8"–12" Commercial Tablets & Kiosks</span>
                    </div>
                  </div>
                </RevealOnScroll>
              </div>
            </div>

            {/* Interactive Live Screen Simulator */}
            <RevealOnScroll variant="scale-up" delay={150}>
              <div className="space-y-4">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 text-center">
                  Try the Live Dual-Screen Simulator:
                </div>
                <InteractiveDashboardMockup />
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* =========================================================================
            SECTION E: WHY WORK WITH NEXORA TECHNOLOGIES
            ========================================================================= */}
        <section className="py-24 border-t border-white/[0.06] bg-[#030508]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealOnScroll variant="fade-up">
              <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                <div className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
                  04 // ENGINEERING PRINCIPLES
                </div>
                <h2 className="font-editorial text-3xl sm:text-5xl font-black text-white tracking-tight">
                  Why Work With Nexora Technologies
                </h2>
                <p className="text-slate-400 text-sm sm:text-base">
                  We build real software that solves real operational bottlenecks. No fabricated claims, no exaggerated statistics—just reliable, well-architected software.
                </p>
              </div>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {whyChooseNexoraPoints.map((point, index) => {
                const Icon = {
                  ShieldCheck: ShieldCheck,
                  Key: Lock,
                  Layers: Cpu,
                  Smartphone: Smartphone,
                  Activity: Sparkles,
                  CheckCircle2: CheckCircle2
                }[point.icon] || ShieldCheck;

                return (
                  <RevealOnScroll key={index} variant="fade-up" delay={index * 60}>
                    <div className="glass-editorial-card p-7 rounded-2xl space-y-4 h-full shadow-lg">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold text-white">{point.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION F: 5-STAGE ENGINEERING LIFECYCLE
            ========================================================================= */}
        <section className="py-24 border-t border-white/[0.06] bg-[#060810]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealOnScroll variant="fade-up">
              <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                <div className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
                  05 // EXECUTION FRAMEWORK
                </div>
                <h2 className="font-editorial text-3xl sm:text-5xl font-black text-white tracking-tight">
                  Our 5-Stage Engineering Lifecycle
                </h2>
                <p className="text-slate-400 text-sm sm:text-base">
                  From initial flow mapping and touch prototypes to physical hardware testing and full source code handover.
                </p>
              </div>
            </RevealOnScroll>

            {/* Futuristic Progress Tracker */}
            <div className="hidden md:flex items-center justify-between mb-8 px-12 relative">
              <div className="absolute left-16 right-16 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 opacity-50"></div>
              {['01', '02', '03', '04', '05'].map((num, i) => (
                <div key={i} className="relative z-10 w-9 h-9 rounded-full bg-[#080d1a] border-2 border-cyan-400 flex items-center justify-center font-mono text-xs font-bold text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.6)]">
                  {num}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-left">
              {developmentProcessSteps.map((step, idx) => (
                <RevealOnScroll key={step.stepNumber} variant="fade-up" delay={idx * 80}>
                  <div className="glass-editorial-card relative p-6 rounded-2xl flex flex-col justify-between space-y-4 h-full shadow-lg">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-black font-mono text-cyan-400">
                          {step.stepNumber}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                          {step.timeframe}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white leading-snug">
                        {step.title}
                      </h3>
                      <div className="text-xs text-cyan-300 font-medium">
                        {step.phase}
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/[0.06] space-y-1.5">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Key Deliverables:
                      </div>
                      {step.deliverables.map((d, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                          <span className="text-cyan-400 font-bold">•</span>
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION G: VERIFIED ENGINEERING STANDARDS & GUARANTEES
            ========================================================================= */}
        <section className="py-24 border-t border-white/[0.06] bg-[#030508]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealOnScroll variant="fade-up">
              <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                <div className="text-xs font-mono font-bold tracking-widest text-blue-400 uppercase">
                  06 // CLIENT ASSURANCE & POLICY
                </div>
                <h2 className="font-editorial text-3xl sm:text-5xl font-black text-white tracking-tight">
                  Engineering Standards &amp; Guarantees
                </h2>
                <p className="text-slate-400 text-sm sm:text-base">
                  We maintain strict business integrity: zero fabricated testimonials, zero fake statistics, and 100% intellectual property ownership assigned directly to you.
                </p>
              </div>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {engineeringStandards.map((std, idx) => {
                const IconComponent = {
                  Lock: Lock,
                  Globe: Globe,
                  ShieldCheck: ShieldCheck,
                  CheckCircle2: CheckCircle2
                }[std.iconName] || ShieldCheck;

                return (
                  <RevealOnScroll key={std.id} variant="fade-up" delay={idx * 100}>
                    <div className="glass-editorial-card p-7 rounded-2xl flex flex-col justify-between space-y-5 h-full shadow-lg">
                      <div className="space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="text-xs font-mono text-cyan-300">{std.subtitle}</div>
                        <h3 className="text-base font-bold text-white">{std.title}</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {std.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/[0.06] text-[11px] text-emerald-400 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span>{std.commitment}</span>
                      </div>
                    </div>
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION H: CINEMATIC CLOSING CALL-TO-ACTION & CONTACT PORTAL
            ========================================================================= */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <RevealOnScroll variant="scale-up">
            <div className="relative rounded-3xl bg-gradient-to-br from-cyan-950/40 via-[#070b16] to-violet-950/40 border border-cyan-500/30 p-10 sm:p-16 text-center overflow-hidden shadow-[0_25px_80px_rgba(6,182,212,0.2)]">
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  READY FOR PROJECT INQUIRIES
                </span>

                <h2 className="font-editorial text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  Ready to Build Your Custom Software Solution?
                </h2>

                <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                  Discuss your commercial kiosk requirements, tablet interface, or bespoke software application directly with Nexora Technologies.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <Link
                    to="/contact"
                    className="btn-luxury-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold text-[#07090e] bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 shadow-[0_0_35px_rgba(6,182,212,0.5)] border border-white/20"
                  >
                    <span>Discuss Your Project</span>
                    <ArrowRight className="w-4 h-4 text-[#07090e]" />
                  </Link>
                  <Link
                    to="/services"
                    className="btn-luxury-outline w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-slate-300"
                  >
                    <span>Explore Our 5 Services</span>
                  </Link>
                </div>

                <div className="pt-6 text-xs text-slate-400">
                  Direct inquiries: <span className="text-cyan-300 font-mono">{companyProfile.contactEmail}</span> • Phone: <span className="text-slate-300">{companyProfile.phonePlaceholder}</span> • SLA: <span className="text-slate-300">{companyProfile.responseSla}</span>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </section>
      </div>

      {/* Technical Architecture Specs Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};
