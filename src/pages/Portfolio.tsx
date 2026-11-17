import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { portfolioData } from '../data/portfolioData';
import type { PortfolioItem } from '../types';
import { CaseStudyModal } from '../components/CaseStudyModal';
import { Kiosk3DViewer } from '../components/Kiosk3DViewer';
import { InteractiveDashboardMockup } from '../components/InteractiveDashboardMockup';
import { RevealOnScroll } from '../components/RevealOnScroll';
import { 
  ExternalLink, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  Layers
} from 'lucide-react';

export const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<PortfolioItem | null>(null);

  const categories = ['All', 'Commercial Kiosk Systems'];

  const filteredProjects = selectedCategory === 'All'
    ? portfolioData
    : portfolioData.filter((item) => item.category === selectedCategory);

  const mainProject = portfolioData.find((p) => p.id === 'smart-kiosk') || portfolioData[0];

  return (
    <div className="relative min-h-screen pt-28 pb-20">
      {/* Background Tech Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 right-1/3 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[150px]"></div>
        <div className="absolute top-1/2 left-10 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[140px]"></div>
        <div className="absolute inset-0 bg-tech-grid opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <RevealOnScroll variant="fade-up">
          <div className="text-center max-w-4xl mx-auto space-y-6 pt-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>REAL-WORLD PROJECT SHOWCASE</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Smart-Kiosk &{' '}
              <span className="text-gradient-primary">
                Commercial Systems.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              Examine our real-world software project: the Smart-Kiosk (OrderEase) self-ordering and kitchen line synchronization system. Tested directly against physical restaurant tablet hardware.
            </p>

            {/* Business Integrity Notice */}
            <div className="max-w-2xl mx-auto p-4 rounded-xl bg-blue-950/20 border border-blue-500/20 text-xs text-slate-300 flex items-start gap-3 text-left">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white block">Strict Business Accuracy Commitment:</span>
                Nexora Technologies does not advertise unbuilt products or fabricated client statistics. All features below are verified directly against our working codebase and deployed cloud prototype.
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400/40 scale-105'
                      : 'bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* 1. INTERACTIVE 3D KIOSK HARDWARE SHOWCASE */}
        <RevealOnScroll variant="fade-up">
          <div className="space-y-6 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.08]">
              <div>
                <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">3D Hardware Prototype</span>
                <h2 className="text-2xl font-bold text-white">Commercial Tablet Kiosk Enclosure</h2>
              </div>
              <a
                href="https://maniselmagi.github.io/smart-kiosk-demo/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all self-start sm:self-auto"
              >
                <span>Launch 24/7 Cloud Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <Kiosk3DViewer />
          </div>
        </RevealOnScroll>

        {/* 2. REAL SCREENSHOTS & INTERFACE GALLERY */}
        <RevealOnScroll variant="fade-up">
          <div className="space-y-6 text-left">
            <div className="pb-2 border-b border-white/[0.08]">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Actual Product Interface</span>
              <h2 className="text-2xl font-bold text-white">Verified Smart-Kiosk Screens & UI</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mainProject.realScreenshots?.map((shot, idx) => (
                <div key={idx} className="bento-card-spotlight p-4 rounded-2xl space-y-3 shadow-xl">
                  <div className="overflow-hidden rounded-xl border border-white/10 aspect-[4/3] bg-black">
                    <img
                      src={shot.image}
                      alt={shot.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-sm font-bold text-white">{shot.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{shot.description}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* 3. INTERACTIVE SCREEN SIMULATOR */}
        <RevealOnScroll variant="scale-up">
          <div className="space-y-4 text-left">
            <div className="pb-2 border-b border-white/[0.08]">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Cross-Screen Synchronizer</span>
              <h2 className="text-2xl font-bold text-white">Table Kiosk & Kitchen KDS Live Simulator</h2>
            </div>
            <InteractiveDashboardMockup />
          </div>
        </RevealOnScroll>

        {/* 4. COMPLETED CAPABILITIES VS ROADMAP */}
        <RevealOnScroll variant="fade-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="bento-card-spotlight p-8 rounded-3xl border border-emerald-500/30 space-y-5 shadow-xl">
              <div className="flex items-center gap-2 text-emerald-400 pb-3 border-b border-white/[0.08]">
                <CheckCircle2 className="w-5 h-5" />
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  Verified Completed Capabilities
                </h3>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                {mainProject.completedFeatures.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bento-card-spotlight p-8 rounded-3xl border border-amber-500/30 space-y-5 shadow-xl">
              <div className="flex items-center gap-2 text-amber-400 pb-3 border-b border-white/[0.08]">
                <Clock className="w-5 h-5" />
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  Roadmap & Active Peripheral Engineering
                </h3>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                {mainProject.inProgressFeatures.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-amber-400 font-bold mt-0.5">•</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <div className="p-4 rounded-xl bg-amber-500/[0.05] border border-amber-500/20 text-[11px] text-slate-300 leading-relaxed">
                Nexora clearly delineates active roadmap milestones from production-ready code. We provide exact hardware pinout and driver specifications during engagement scoping.
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* 5. MULTI-MODULE DETAILED CARDS */}
        <div className="space-y-6 text-left">
          <div className="pb-2 border-b border-white/[0.08]">
            <span className="text-xs font-mono text-violet-400 uppercase tracking-widest">Component Architectures</span>
            <h2 className="text-2xl font-bold text-white">Smart-Kiosk System Breakdown</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <RevealOnScroll key={project.id} variant="fade-up" delay={index * 100}>
                <div className="group p-8 rounded-3xl bg-[#090d16] border border-white/[0.08] hover:border-blue-500/40 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between space-y-6 shadow-xl h-full">
                  <div className="space-y-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20">
                        {project.category}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                        {project.status}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs font-mono text-slate-400 mt-1">
                        {project.domain}
                      </p>
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed">
                      {project.summary}
                    </p>

                    <div className="grid grid-cols-2 gap-2 pt-2">
                      {project.results.slice(0, 4).map((res, i) => (
                        <div key={i} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
                          <div className="text-sm font-bold font-mono text-white text-gradient-primary">
                            {res.metric}
                          </div>
                          <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">{res.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Technologies:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 5).map((tech, idx) => (
                          <span 
                            key={idx}
                            className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-slate-300 border border-white/[0.06]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-4">
                    <button
                      onClick={() => setActiveProject(project)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 transition-all hover:scale-105"
                    >
                      <span>Inspect Case Study</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>

                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        Live URL &rarr;
                      </a>
                    )}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>

        {/* 6. CODE OWNERSHIP & CODEBASE DELIVERY */}
        <RevealOnScroll variant="fade-up">
          <section className="p-8 sm:p-12 rounded-3xl bg-[#080c16] border border-white/[0.08] space-y-6 text-left">
            <div className="flex items-center gap-2.5 text-xs font-bold text-blue-400 uppercase tracking-widest">
              <Layers className="w-4 h-4" />
              <span>Full Source Code & IP Handover</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Complete Repository Transfer & Operational Independence
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
              Every software application engineered by Nexora Technologies is delivered with 100% intellectual property ownership transfer. You receive clean Git repositories, automated build scripts, hardware documentation, and setup guides ensuring complete operational independence for your business.
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
              >
                <span>Inquire About Custom Kiosk Systems</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>
        </RevealOnScroll>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal 
        project={activeProject} 
        onClose={() => setActiveProject(null)} 
      />
    </div>
  );
};
