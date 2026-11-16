import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  CheckCircle2, 
  Zap, 
  Cloud, 
  Smartphone, 
  Layout, 
  ExternalLink, 
  Lock, 
  ChevronRight, 
  Database, 
  ArrowUpRight, 
  Globe 
} from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { portfolioData } from '../data/portfolioData';
import { developmentProcessSteps, whyChooseNexoraPoints, verifiedEngagementNotes, companyProfile } from '../data/companyData';
import { InteractiveDashboardMockup } from '../components/InteractiveDashboardMockup';
import { CaseStudyModal } from '../components/CaseStudyModal';
import { ServiceCardSchematic } from '../components/ServiceCardSchematic';
import { RevealOnScroll } from '../components/RevealOnScroll';
import type { PortfolioItem } from '../types';

export const Home: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

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
        {/* 1. HERO SECTION */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            {/* Pill Announcement */}
            <RevealOnScroll variant="fade-down" delay={50}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-blue-500/30 text-xs sm:text-sm text-slate-300 shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:border-blue-400/50 transition-all">
                <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse"></span>
                <span className="font-semibold text-white">NEXORA TECHNOLOGIES</span>
                <span className="text-slate-500">|</span>
                <span className="text-blue-300 font-medium">Built for regulated & high-volume environments</span>
              </div>
            </RevealOnScroll>

            {/* Main Headline */}
            <RevealOnScroll variant="fade-up" delay={150}>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
                Your systems can't keep up with how you work now.{' '}
                <span className="text-gradient-cyan-emerald block sm:inline">
                  We build the ones that can.
                </span>
              </h1>
            </RevealOnScroll>

            {/* Sub-headline */}
            <RevealOnScroll variant="fade-up" delay={250}>
              <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
                Spreadsheets, legacy tools, manual steps between systems — we replace them with custom software built around the way your company already operates, including in regulated and high-volume environments.
              </p>
            </RevealOnScroll>

            {/* CTAs */}
            <RevealOnScroll variant="fade-up" delay={350}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Link
                  to="/contact"
                  className="btn-interactive-primary w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-base font-bold text-[#07090e] bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 border border-white/30"
                >
                  <span>Discuss your project</span>
                  <ArrowRight className="w-4 h-4 text-[#07090e]" />
                </Link>
                <Link
                  to="/services"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-slate-200 bg-[#0c101a]/80 hover:bg-white/[0.08] border border-white/10 hover:border-white/25 transition-all duration-200"
                >
                  <span>Get an architecture estimate</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>
            </RevealOnScroll>

            {/* Trust and Engineering Integrity Badges */}
            <RevealOnScroll variant="fade-in" delay={450}>
              <div className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% Client Code & IP Ownership</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-blue-400" />
                  <span>Zero-Trust Security Posture</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-violet-400" />
                  <span>Senior Full-Stack Architects</span>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Interactive Hero Live Dashboard Mockup */}
          <RevealOnScroll variant="scale-up" delay={200} className="mt-14 max-w-5xl mx-auto">
            <InteractiveDashboardMockup />
          </RevealOnScroll>
        </section>

        {/* 2. COMPANY EXPERTISE & TRUSTED TECHNOLOGY PRESENTATION */}
        <section className="py-20 border-y border-white/[0.06] bg-[#06080d]/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealOnScroll variant="fade-up">
              <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                <div className="text-xs font-bold tracking-widest text-blue-400 uppercase">
                  Core Engineering Capabilities
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Architected for Scale, Concurrency, and Resilience
                </h2>
                <p className="text-slate-400 text-sm sm:text-base">
                  We bridge high-level business strategy with low-level systems execution. Every solution is engineered using modern, type-safe paradigms.
                </p>
              </div>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <RevealOnScroll variant="fade-up" delay={100}>
                <div className="card-spotlight p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4 h-full">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Database className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Distributed Systems & Data Pipelines</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    High-throughput event streaming, distributed transaction consensus, Kafka event architectures, and sub-millisecond database caching engineered for massive scale.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300">Kafka</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300">ClickHouse</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300">Rust / Go</span>
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll variant="fade-up" delay={200}>
                <div className="card-spotlight p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4 h-full">
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Deterministic Enterprise AI & RAG</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Moving beyond generic AI prompts: we build production RAG vector search pipelines, autonomous agents with schema guardrails, and self-hosted models in isolated VPCs.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300">PyTorch</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300">pgvector</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300">Multi-Agent</span>
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll variant="fade-up" delay={300}>
                <div className="card-spotlight p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4 h-full">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Cloud className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Cloud Native & Zero-Trust Infrastructure</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Automated multi-region Kubernetes clusters, Infrastructure as Code, zero-trust network segregation, and distributed OpenTelemetry observability.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300">Kubernetes</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300">Terraform</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300">mTLS</span>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* 3. CORE SERVICES PREVIEW */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <RevealOnScroll variant="fade-up">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Capabilities</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                  Services We Offer
                </h2>
                <p className="text-slate-400 text-sm sm:text-base">
                  Custom software, SaaS platforms, high-velocity mobile engineering, autonomous AI, and cloud architectures.
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service, index) => {
              const IconComponent = {
                Cpu: Cpu,
                Globe: Globe,
                Smartphone: Smartphone,
                Sparkles: Sparkles,
                Cloud: Cloud,
                Layout: Layout
              }[service.iconName] || Cpu;

              return (
                <RevealOnScroll key={service.id} variant="fade-up" delay={index * 70}>
                  <div className="card-spotlight group relative p-7 rounded-2xl bg-[#0b0f1a]/80 border border-white/[0.08] hover:bg-[#0e1424] transition-all duration-300 flex flex-col justify-between shadow-lg h-full">
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

        {/* 4. FEATURED PROJECTS & PORTFOLIO */}
        <section className="py-24 border-t border-white/[0.06] bg-[#07090e]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealOnScroll variant="fade-up">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div className="space-y-3 max-w-2xl">
                  <div className="text-xs font-bold tracking-widest text-violet-400 uppercase">
                    Proven Engineering
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                    Featured Systems & Case Studies
                  </h2>
                  <p className="text-slate-400 text-sm sm:text-base">
                    Architectural prototypes and representative enterprise solutions designed to demonstrate our performance, concurrency, and security benchmarks.
                  </p>
                </div>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors group"
                >
                  <span>View Full Show case</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </RevealOnScroll>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {portfolioData.slice(0, 2).map((item, idx) => (
                <RevealOnScroll key={item.id} variant="fade-up" delay={idx * 150}>
                  <div className="card-spotlight p-8 rounded-2xl bg-[#0b0f19] border border-white/[0.08] hover:border-violet-500/40 transition-all flex flex-col justify-between space-y-6 shadow-xl h-full">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-300 border border-violet-500/20">
                          {item.category}
                        </span>
                        <span className="text-[11px] font-mono text-amber-400/90 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                          Demonstration Architecture
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                      <p className="text-xs text-slate-400 font-mono">{item.domain}</p>
                      <p className="text-sm text-slate-300 leading-relaxed">{item.summary}</p>

                      {/* Metric Highlights */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                        {item.results.slice(0, 3).map((r, i) => (
                          <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                            <div className="text-lg font-bold text-white font-mono">{r.metric}</div>
                            <div className="text-[11px] text-slate-400">{r.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Tech Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {item.technologies.slice(0, 5).map((t, index) => (
                          <span key={index} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                      <button
                        onClick={() => setSelectedProject(item)}
                        className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-violet-600/30 hover:bg-violet-600/50 border border-violet-500/40 px-4 py-2 rounded-lg transition-all"
                      >
                        <span>Inspect Case Study</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                      <Link
                        to="/contact"
                        className="text-xs text-slate-400 hover:text-white transition-colors"
                      >
                        Inquire regarding this architecture →
                      </Link>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* 5. WHY CHOOSE NEXORA */}
        <section className="py-24 border-t border-white/[0.06] bg-[#06080d]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealOnScroll variant="fade-up">
              <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                <div className="text-xs font-bold tracking-widest text-blue-400 uppercase">
                  Enterprise Assurance
                </div>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                  Why Global Leaders Partner With Nexora
                </h2>
                <p className="text-slate-400 text-sm sm:text-base">
                  We remove the layers of corporate friction and deliver unfiltered technical expertise, absolute transparency, and uncompromising reliability.
                </p>
              </div>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyChooseNexoraPoints.map((point, index) => {
                const Icon = {
                  ShieldCheck: ShieldCheck,
                  Key: Lock,
                  Layers: Cpu,
                  Activity: Zap,
                  Zap: Zap,
                  Globe: Globe
                }[point.icon] || ShieldCheck;

                return (
                  <RevealOnScroll key={index} variant="fade-up" delay={index * 60}>
                    <div className="card-spotlight p-7 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4 h-full">
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

        {/* 6. DEVELOPMENT PROCESS */}
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
                  From initial threat modeling and architecture blueprints to automated blue/green cloud deployments and SLA monitoring.
                </p>
              </div>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {developmentProcessSteps.map((step, idx) => (
                <RevealOnScroll key={step.stepNumber} variant="fade-up" delay={idx * 80}>
                  <div className="card-spotlight relative p-6 rounded-2xl bg-[#0a0d16] border border-white/[0.08] flex flex-col justify-between space-y-4 h-full">
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

        {/* 7. VERIFIED ENTERPRISE ENGAGEMENTS */}
        <section className="py-24 border-t border-white/[0.06] bg-[#06080d]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealOnScroll variant="fade-up">
              <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                <div className="text-xs font-bold tracking-widest text-blue-400 uppercase">
                  Customer Testimonials & Client Disclosures
                </div>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                  Verified Enterprise Engagements
                </h2>
                <p className="text-slate-400 text-sm sm:text-base">
                  In compliance with strict mutual non-disclosure agreements, client identities are protected while architectural feedback and scope summaries remain verified.
                </p>
              </div>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {verifiedEngagementNotes.map((note, idx) => (
                <RevealOnScroll key={note.id} variant="fade-up" delay={idx * 120}>
                  <div className="card-spotlight p-8 rounded-2xl bg-[#0a0e18] border border-white/[0.08] flex flex-col justify-between space-y-6 h-full">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/[0.06] pb-3">
                        <span className="font-semibold text-blue-300">{note.geographicRegion}</span>
                        <span className="font-mono">{note.engagementYear}</span>
                      </div>

                      <div className="text-xs font-mono text-emerald-400">
                        Industry: {note.clientIndustry}
                      </div>

                      <blockquote className="text-sm text-slate-200 leading-relaxed italic">
                        "{note.verifiedFeedback}"
                      </blockquote>

                      <div className="pt-2 text-xs text-slate-400">
                        <span className="font-semibold text-slate-300">Scope Delivered: </span>
                        {note.scopeSummary}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/[0.06] text-[11px] text-slate-400 flex items-start gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>{note.complianceNotice}</span>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* 8. STRONG FINAL CTA SECTION */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <RevealOnScroll variant="scale-up">
            <div className="relative rounded-3xl bg-gradient-to-br from-blue-950/40 via-[#0a0e1a] to-violet-950/40 border border-blue-500/30 p-10 sm:p-16 text-center overflow-hidden shadow-[0_20px_60px_rgba(59,130,246,0.15)]">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20">
                  Architectural Advisory Available
                </span>

                <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Ready to Build Tomorrow's Digital Platform?
                </h2>

                <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                  Schedule a confidential architecture review with Nexora Technologies. We analyze your requirements, review operational bottlenecks, and outline a concrete execution strategy.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <Link
                    to="/contact"
                    className="btn-interactive-gradient w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.5)] border border-white/20"
                  >
                    <span>Book Confidential Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/services"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all duration-200"
                  >
                    <span>Review All 6 Capabilities</span>
                  </Link>
                </div>

                <div className="pt-6 text-xs text-slate-400">
                  Direct inquiry channel: <span className="text-slate-300 font-mono">{companyProfile.contactEmail}</span> • Guaranteed response SLA: <span className="text-slate-300">{companyProfile.responseSla}</span>
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
