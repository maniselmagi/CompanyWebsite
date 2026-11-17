import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  CheckCircle2, 
  Smartphone, 
  Layout, 
  ExternalLink, 
  Lock, 
  ChevronRight, 
  ArrowUpRight, 
  Globe
} from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { portfolioData } from '../data/portfolioData';
import { 
  developmentProcessSteps, 
  whyChooseNexoraPoints, 
  engineeringStandards, 
  companyProfile 
} from '../data/companyData';
import { ThreeHero } from '../components/ThreeHero';
import { Kiosk3DViewer } from '../components/Kiosk3DViewer';
import { InteractiveDashboardMockup } from '../components/InteractiveDashboardMockup';
import { CaseStudyModal } from '../components/CaseStudyModal';
import { ServiceCardSchematic } from '../components/ServiceCardSchematic';
import { RevealOnScroll } from '../components/RevealOnScroll';
import type { PortfolioItem } from '../types';

export const Home: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const smartKioskProject = portfolioData.find((p) => p.id === 'smart-kiosk') || portfolioData[0];

  return (
    <div className="relative min-h-screen page-entrance">
      {/* Background Tech Glow & Grid with Ambient Breathing Movement */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] bg-gradient-to-b from-blue-600/12 via-violet-600/6 to-transparent blur-3xl opacity-80 animate-ambient-glow"></div>
        <div className="absolute top-[28%] -left-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none"></div>
        <div className="absolute top-[58%] -right-48 w-96 h-96 bg-violet-600/12 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-tech-grid opacity-25"></div>
      </div>

      <div className="relative z-10">
        {/* 1. HERO SECTION WITH 3D WEBGL TECHNOLOGY EXPERIENCE */}
        <section className="pt-28 pb-16 md:pt-36 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading & Value Proposition */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              {/* Brand Announcement Pill */}
              <RevealOnScroll variant="fade-down" delay={50}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-950/60 via-purple-950/40 to-cyan-950/60 border border-cyan-500/35 text-xs sm:text-sm text-slate-300 shadow-[0_0_20px_rgba(6,182,212,0.18)] hover:border-cyan-400/60 transition-all">
                  <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  <span className="font-display font-bold tracking-wider text-white">NEXORA TECHNOLOGIES</span>
                  <span className="text-slate-500">|</span>
                  <span className="text-cyan-300 font-medium">Building Tomorrow's Digital World.</span>
                </div>
              </RevealOnScroll>

              {/* Main Headline with 3D Dimensional Styling */}
              <RevealOnScroll variant="fade-up" delay={150}>
                <h1 className="font-display text-2xl sm:text-4xl md:text-[38px] lg:text-[44px] xl:text-[48px] font-black tracking-tight leading-[1.18]">
                  <span className="text-3d-chrome block">
                    Commercial <span className="whitespace-nowrap">Self-Order</span> Kiosks
                  </span>
                  <span className="text-3d-hologram block mt-1 sm:mt-2">
                    &amp; <span className="whitespace-nowrap">Next-Gen</span> Software Engineering.
                  </span>
                </h1>
              </RevealOnScroll>

              {/* Sub-headline / Company Introduction */}
              <RevealOnScroll variant="fade-up" delay={250}>
                <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                  Nexora Technologies engineers commercial self-ordering kiosks, touch terminal operating systems, and high-performance web applications. We replace paper tickets and ordering bottlenecks with real-time, responsive software built for high-volume commercial durability.
                </p>
              </RevealOnScroll>

              {/* Action Buttons */}
              <RevealOnScroll variant="fade-up" delay={350}>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 pt-2">
                  <Link
                    to="/portfolio"
                    className="btn-luxury-primary w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-bold text-[#07090e] bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 border border-white/30"
                  >
                    <span>Explore Smart-Kiosk Showcase</span>
                    <ArrowRight className="w-4 h-4 text-[#07090e]" />
                  </Link>
                  <Link
                    to="/services"
                    className="btn-luxury-outline w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-semibold text-slate-200"
                  >
                    <span>View Our Capabilities</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                </div>
              </RevealOnScroll>

              {/* Engineering Guarantees */}
              <RevealOnScroll variant="fade-in" delay={450}>
                <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-6 text-xs sm:text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>100% Client Code & IP Ownership</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    <span>Real Working Software Experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-violet-400" />
                    <span>Strict Mutual Confidentiality</span>
                  </div>
                </div>

                {/* Animated Scroll to Architecture Exploration Indicator */}
                <div className="pt-6 hidden sm:flex items-center justify-center lg:justify-start">
                  <a
                    href="#smart-kiosk-spotlight"
                    className="inline-flex items-center gap-2.5 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-all py-1.5 px-4 rounded-full bg-white/[0.02] border border-white/[0.08] hover:border-cyan-500/40 shadow-sm"
                  >
                    <span className="w-2.5 h-4 rounded-full border border-slate-400 flex items-start justify-center p-0.5">
                      <span className="w-1 h-1 rounded-full bg-cyan-400 animate-scroll-wheel"></span>
                    </span>
                    <span className="tracking-wider uppercase text-[11px]">Explore Real-World Hardware & System Architecture</span>
                  </a>
                </div>
              </RevealOnScroll>
            </div>

            {/* Right Column: 3D Interactive WebGL Self-Kiosk Hardware Canvas */}
            <div className="lg:col-span-5 relative w-full max-w-lg mx-auto lg:max-w-none">
              <RevealOnScroll variant="scale-up" delay={200}>
                <div className="relative rounded-3xl bg-gradient-to-br from-[#0c1224] via-[#080d19] to-[#050811] border border-cyan-500/35 p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_50px_rgba(6,182,212,0.18)] overflow-hidden">
                  <ThreeHero />
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* 2. REAL PROJECT SHOWCASE: SMART-KIOSK (ORDEREASE) */}
        <section id="smart-kiosk-spotlight" className="py-24 border-y border-white/[0.06] bg-[#06080e]/90">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <RevealOnScroll variant="fade-up">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-3 max-w-2xl text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-300">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>FLAGSHIP REAL-WORLD PROJECT</span>
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
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
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
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
                  <div className="bento-card-spotlight p-7 rounded-3xl space-y-5 shadow-2xl">
                    <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                      <span className="text-xs font-bold uppercase tracking-wider text-white">
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
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center">
                  Try the Live Inter-Screen Simulator:
                </div>
                <InteractiveDashboardMockup />
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* 3. CORE SERVICES PREVIEW */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <RevealOnScroll variant="fade-up">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-left">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Real Capabilities</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                  Services We Offer
                </h2>
                <p className="text-slate-400 text-sm sm:text-base">
                  Bespoke software development, commercial touch kiosk interfaces, web applications, and ergonomic design systems.
                </p>
              </div>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors group"
              >
                <span>View Full Service Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {servicesData.map((service, index) => {
              const IconComponent = {
                Cpu: Cpu,
                Globe: Globe,
                Smartphone: Smartphone,
                Sparkles: Sparkles,
                Layout: Layout
              }[service.iconName] || Cpu;

              return (
                <RevealOnScroll key={service.id} variant="fade-up" delay={index * 70}>
                  <div className="bento-card-spotlight group relative p-7 rounded-2xl flex flex-col justify-between shadow-xl h-full">
                    <div className="space-y-5">
                      {/* Header with Title and Corner Arrow */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:bg-violet-600 group-hover:text-white transition-all duration-300">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <Link 
                          to={`/services#${service.id}`}
                          className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:border-violet-400/50 group-hover:bg-violet-500/20 transition-all"
                          aria-label={`View ${service.title}`}
                        >
                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                          {service.shortDescription}
                        </p>
                      </div>

                      {/* Embedded UI Schematic */}
                      <div className="pt-1">
                        <ServiceCardSchematic serviceId={service.id} />
                      </div>

                      <div className="space-y-1.5 pt-2 border-t border-white/[0.06]">
                        {service.benefits.slice(0, 2).map((b, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-500">
                        {service.deliveryTimeline.split(';')[0]}
                      </span>
                      <Link
                        to="/services"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-violet-400 group-hover:text-violet-300 transition-colors"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </section>

        {/* 4. WHY CHOOSE NEXORA */}
        <section className="py-24 border-t border-white/[0.06] bg-[#06080d]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealOnScroll variant="fade-up">
              <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                <div className="text-xs font-bold tracking-widest text-blue-400 uppercase">
                  Engineering Principles
                </div>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
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
                    <div className="bento-card-spotlight p-7 rounded-2xl space-y-4 h-full shadow-lg">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
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

        {/* 5. DEVELOPMENT PROCESS */}
        <section className="py-24 border-t border-white/[0.06] bg-[#07090e]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealOnScroll variant="fade-up">
              <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                <div className="text-xs font-bold tracking-widest text-emerald-400 uppercase">
                  Execution Framework
                </div>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                  Our 5-Stage Engineering Lifecycle
                </h2>
                <p className="text-slate-400 text-sm sm:text-base">
                  From initial flow mapping and touch prototypes to physical hardware testing and full source code handover.
                </p>
              </div>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-left">
              {developmentProcessSteps.map((step, idx) => (
                <RevealOnScroll key={step.stepNumber} variant="fade-up" delay={idx * 80}>
                  <div className="bento-card-spotlight relative p-6 rounded-2xl flex flex-col justify-between space-y-4 h-full shadow-lg">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-extrabold font-mono text-blue-400">
                          {step.stepNumber}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                          {step.timeframe}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white leading-snug">
                        {step.title}
                      </h3>
                      <div className="text-xs text-blue-300 font-medium">
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
                          <span className="text-blue-400 font-bold">•</span>
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

        {/* 6. VERIFIED ENGINEERING STANDARDS & CLIENT COMMITMENTS */}
        <section className="py-24 border-t border-white/[0.06] bg-[#06080d]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealOnScroll variant="fade-up">
              <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                <div className="text-xs font-bold tracking-widest text-blue-400 uppercase">
                  Client Assurance & Policy
                </div>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                  Engineering Standards & Guarantees
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
                    <div className="bento-card-spotlight p-7 rounded-2xl flex flex-col justify-between space-y-5 h-full shadow-lg">
                      <div className="space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="text-xs font-mono text-blue-300">{std.subtitle}</div>
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

        {/* 7. STRONG FINAL CTA SECTION */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <RevealOnScroll variant="scale-up">
            <div className="relative rounded-3xl bg-gradient-to-br from-blue-950/40 via-[#0a0e1a] to-violet-950/40 border border-blue-500/30 p-10 sm:p-16 text-center overflow-hidden shadow-[0_20px_60px_rgba(59,130,246,0.15)]">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20">
                  Ready for Project Inquiries
                </span>

                <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Ready to Build Your Custom Software Solution?
                </h2>

                <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                  Discuss your commercial kiosk requirements, tablet interface, or bespoke software application directly with Nexora Technologies.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <Link
                    to="/contact"
                    className="btn-luxury-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.5)] border border-white/20"
                  >
                    <span>Discuss Your Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/services"
                    className="btn-luxury-outline w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-slate-300"
                  >
                    <span>Explore Our 5 Services</span>
                  </Link>
                </div>

                <div className="pt-6 text-xs text-slate-400">
                  Direct inquiries: <span className="text-slate-300 font-mono">{companyProfile.contactEmail}</span> • Phone: <span className="text-slate-300">{companyProfile.phonePlaceholder}</span>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </section>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </div>
  );
};
