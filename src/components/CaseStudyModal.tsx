import React, { useEffect } from 'react';
import type { PortfolioItem } from '../types';
import { X, CheckCircle2, Layers, Cpu, ShieldCheck, ArrowRight, ExternalLink, Clock } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
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
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                {project.status}
              </span>
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
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-left">
          {/* Live Prototype Launcher Banner */}
          {project.liveDemoUrl && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/40 via-violet-950/40 to-blue-950/40 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Live 24/7 Cloud Demo Available</div>
                  <div className="text-xs text-slate-300">
                    Interact directly with the functional table ordering, KDS, and management portal.
                  </div>
                </div>
              </div>

              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all shrink-0"
              >
                <span>Launch Cloud Prototype</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Real Screenshots Gallery */}
          {project.realScreenshots && project.realScreenshots.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Verified Product Interface & Screens:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.realScreenshots.map((shot, idx) => (
                  <div key={idx} className="space-y-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <img
                      src={shot.image}
                      alt={shot.title}
                      className="w-full h-36 object-cover rounded-lg border border-white/10"
                    />
                    <div className="text-xs font-semibold text-white">{shot.title}</div>
                    <div className="text-[11px] text-slate-400 leading-snug">{shot.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.results.map((res, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
                <div className="text-xl font-bold font-mono text-white text-gradient-primary">
                  {res.metric}
                </div>
                <div className="text-xs text-slate-400 mt-1">{res.label}</div>
              </div>
            ))}
          </div>

          {/* Summary, Challenge & Solution */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              System Architecture & Problem Context
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">{project.summary}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-rose-500/[0.03] border border-rose-500/20 space-y-1">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">Operational Challenge:</span>
                <p className="text-xs text-slate-300 leading-relaxed">{project.challenge}</p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-500/[0.03] border border-emerald-500/20 space-y-1">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Nexora Solution:</span>
                <p className="text-xs text-slate-300 leading-relaxed">{project.solution}</p>
              </div>
            </div>
          </div>

          {/* Completed vs In-Progress Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Working Capabilities</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {project.completedFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>Roadmap & Peripheral Integrations</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {project.inProgressFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Architecture Layers */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              <span>Multi-Tier Engineering Layers</span>
            </h3>
            <div className="space-y-2">
              {project.architectureLayers.map((layer, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs">
                  <span className="font-bold text-white block mb-0.5">{layer.layer}</span>
                  <span className="text-slate-400 leading-relaxed">{layer.detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Badges */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-violet-400" />
              <span>Technology Stack</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.04] text-slate-300 border border-white/[0.08]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-[#0c101a] border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Client Source Code Ownership Guarantee</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
            >
              Close
            </button>
            <Link
              to="/contact"
              onClick={onClose}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all"
            >
              <span>Inquire About Similar Architecture</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
