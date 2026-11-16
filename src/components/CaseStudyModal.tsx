import React, { useEffect } from 'react';
import type { PortfolioItem } from '../types';
import { X, CheckCircle2, Layers, Cpu, ShieldCheck, ArrowRight, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CaseStudyModalProps {
  project: PortfolioItem | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#090d16] border border-blue-500/30 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_50px_rgba(59,130,246,0.2)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 bg-[#0c101a] border-b border-white/[0.08] flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {project.category}
              </span>
              {project.isDemonstration && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/25">
                  Demonstration Case Study
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">{project.title}</h2>
            <p className="text-sm text-slate-400 mt-1">{project.tagline}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Demonstration Notice Banner */}
          {project.isDemonstration && (
            <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/20 text-xs text-blue-200 flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-white mb-0.5">Architecture Demonstration Notice</span>
                {project.demonstrationNotice}
              </div>
            </div>
          )}

          {/* Key Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {project.results.map((res, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                <div className="text-2xl font-bold text-white font-mono text-gradient-primary">
                  {res.metric}
                </div>
                <div className="text-xs text-slate-400 mt-1">{res.label}</div>
              </div>
            ))}
          </div>

          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-rose-500/[0.03] border border-rose-500/20 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 text-sm font-semibold">
                <Activity className="w-4 h-4" />
                <span>The Architectural Challenge</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-emerald-500/[0.03] border border-emerald-500/20 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Nexora Engineering Solution</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Architecture Topology Layers */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              <span>Full-Stack Architecture Layers</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.architectureLayers.map((layer, idx) => (
                <div key={idx} className="p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-xs">
                  <div className="font-semibold text-blue-400 font-mono mb-1">{layer.layer}</div>
                  <div className="text-slate-300">{layer.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Used */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-violet-400" />
              <span>Core Technologies & Frameworks</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 rounded-md text-xs font-mono font-medium bg-white/[0.04] border border-white/[0.08] text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 bg-[#0c101a] border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            Interested in deploying a similar architecture for your organization?
          </div>
          <Link
            to="/contact"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/30"
          >
            <span>Request Architecture Proposal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
