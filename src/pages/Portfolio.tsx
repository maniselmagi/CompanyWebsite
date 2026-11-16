import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { portfolioData } from '../data/portfolioData';
import type { PortfolioItem } from '../types';
import { CaseStudyModal } from '../components/CaseStudyModal';
import { 
  ExternalLink, 
  ShieldCheck, 
  ArrowRight,
  Server,
  Sparkles
} from 'lucide-react';

export const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<PortfolioItem | null>(null);

  const categories = ['All', 'Cloud Infrastructure', 'Enterprise SaaS', 'AI & ML', 'Fintech & Mobile'];

  const filteredProjects = selectedCategory === 'All'
    ? portfolioData
    : portfolioData.filter((item) => item.category === selectedCategory);

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
        <div className="text-center max-w-4xl mx-auto space-y-6 pt-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ENGINEERING CASE STUDIES & DEMONSTRATION WORK</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            Architectural Showcases &{' '}
            <span className="text-gradient-primary">
              System Designs.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Examine our high-concurrency architectures, enterprise prototypes, and telemetry systems. Representative demonstration systems engineered to validate real-world production stress tolerances.
          </p>

          {/* Compliance & Demonstration Notice */}
          <div className="max-w-2xl mx-auto p-4 rounded-xl bg-blue-950/20 border border-blue-500/20 text-xs text-slate-300 flex items-start gap-3 text-left">
            <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white block">Enterprise Demonstration Architecture Notice:</span>
              To comply with mutual corporate confidentiality agreements (NDAs) governing client IP, proprietary enterprise codebases remain protected. The systems below represent functional demonstration architectures engineered by Nexora to showcase technical benchmarks.
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400/40'
                  : 'bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group p-8 rounded-3xl bg-[#090d16] border border-white/[0.08] hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between space-y-6 shadow-xl"
            >
              <div className="space-y-5">
                {/* Header Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20">
                    {project.category}
                  </span>
                  <span className="text-[11px] font-mono text-amber-400/90 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                    Demonstration System
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-xs font-mono text-slate-400 mt-1">
                    {project.domain}
                  </p>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {project.summary}
                </p>

                {/* Simulated Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                  {project.results.map((res, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
                      <div className="text-base font-bold font-mono text-white text-gradient-primary">
                        {res.metric}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">{res.label}</div>
                    </div>
                  ))}
                </div>

                {/* Challenge & Solution Summary */}
                <div className="space-y-3 pt-2 text-xs">
                  <div className="p-3 rounded-lg bg-rose-500/[0.03] border border-rose-500/15">
                    <span className="font-semibold text-rose-300 block mb-1">Architecture Challenge:</span>
                    <span className="text-slate-300 leading-relaxed">{project.challenge}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-500/[0.03] border border-emerald-500/15">
                    <span className="font-semibold text-emerald-300 block mb-1">Nexora Engineered Solution:</span>
                    <span className="text-slate-300 leading-relaxed">{project.solution}</span>
                  </div>
                </div>

                {/* Technology Badges */}
                <div className="pt-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Primary Stack:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech, idx) => (
                      <span 
                        key={idx}
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-white/[0.04] text-slate-300 border border-white/[0.06]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-4">
                <button
                  onClick={() => setActiveProject(project)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 transition-all"
                >
                  <span>Inspect Complete Case Study</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <Link
                  to="/contact"
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Consult on this stack →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Global Architecture Standards Section */}
        <section className="p-8 sm:p-12 rounded-3xl bg-[#080c16] border border-white/[0.08] space-y-6">
          <div className="flex items-center gap-2.5 text-xs font-bold text-blue-400 uppercase tracking-widest">
            <Server className="w-4 h-4" />
            <span>Enterprise Verification & Reproducibility</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Architecture Reproducibility & Code Delivery
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
            Every software system engineered by Nexora Technologies includes containerized reproduction environments, automated Terraform infrastructure scripts, end-to-end integration test harnesses, and comprehensive documentation to ensure complete operational independence for your internal teams.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all"
            >
              <span>Request Private Architecture Walkthrough</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal 
        project={activeProject} 
        onClose={() => setActiveProject(null)} 
      />
    </div>
  );
};
