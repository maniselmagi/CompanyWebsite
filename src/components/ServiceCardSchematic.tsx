import React from 'react';
import { 
  Smartphone, 
  Terminal, 
  Zap, 
  Activity, 
  Sparkles, 
  ShieldCheck, 
  Server,
  Layers
} from 'lucide-react';

interface SchematicProps {
  serviceId: string;
}

export const ServiceCardSchematic: React.FC<SchematicProps> = ({ serviceId }) => {
  switch (serviceId) {
    case 'custom-software':
      return (
        <div className="w-full h-32 rounded-xl bg-[#080b12] border border-blue-500/20 p-3 font-mono text-[10px] space-y-1.5 overflow-hidden select-none relative group-hover:border-blue-500/40 transition-colors">
          <div className="flex items-center justify-between text-slate-500 pb-1 border-b border-white/5">
            <div className="flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-blue-400" />
              <span>distributed_kernel.rs</span>
            </div>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 font-sans">
              Compiled
            </span>
          </div>
          <div className="text-slate-400">
            <span className="text-blue-400">pub async fn</span> <span className="text-violet-300">dispatch_event</span>(stream: &EventBuffer) {'{'}
          </div>
          <div className="pl-3 text-slate-300">
            stream.commit_partition(<span className="text-amber-300">0x88f2</span>).<span className="text-emerald-300">await</span>?;
          </div>
          <div className="pl-3 text-slate-500">
            // Zero-copy ring-buffer execution
          </div>
          <div className="text-slate-400">{'}'}</div>
          <div className="absolute bottom-2 right-2 flex items-center gap-1 text-[9px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
            <Activity className="w-2.5 h-2.5" />
            <span>0.8ms cycle</span>
          </div>
        </div>
      );

    case 'web-applications':
      return (
        <div className="w-full h-32 rounded-xl bg-[#080b12] border border-cyan-500/20 p-3 space-y-2 overflow-hidden select-none relative group-hover:border-cyan-500/40 transition-colors">
          <div className="flex items-center justify-between pb-1.5 border-b border-white/5">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-rose-500/70"></div>
              <div className="w-2 h-2 rounded-full bg-amber-500/70"></div>
              <div className="w-2 h-2 rounded-full bg-emerald-500/70"></div>
            </div>
            <span className="text-[9px] font-mono text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded">
              LCP: 0.6s • 60 FPS
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <div className="p-1.5 rounded bg-white/[0.03] border border-white/5 text-[9px]">
              <span className="text-slate-400 block text-[8px]">Active Users</span>
              <span className="font-mono font-bold text-white">42,890</span>
            </div>
            <div className="p-1.5 rounded bg-white/[0.03] border border-white/5 text-[9px]">
              <span className="text-slate-400 block text-[8px]">Sync Delta</span>
              <span className="font-mono font-bold text-emerald-400">&lt; 14ms</span>
            </div>
            <div className="p-1.5 rounded bg-white/[0.03] border border-white/5 text-[9px]">
              <span className="text-slate-400 block text-[8px]">Edge Cache</span>
              <span className="font-mono font-bold text-cyan-400">99.4%</span>
            </div>
          </div>
          <div className="h-6 flex items-end gap-1 px-1">
            {[35, 55, 48, 70, 85, 62, 78, 92, 88, 95, 89, 94].map((v, i) => (
              <div key={i} className="flex-1 bg-gradient-to-t from-cyan-900/40 to-cyan-400 rounded-t-xs" style={{ height: `${v}%` }}></div>
            ))}
          </div>
        </div>
      );

    case 'mobile-app-development':
      return (
        <div className="w-full h-32 rounded-xl bg-[#080b12] border border-indigo-500/20 p-3 flex items-center justify-between gap-3 overflow-hidden select-none relative group-hover:border-indigo-500/40 transition-colors">
          {/* Miniature Phone Frame */}
          <div className="w-20 h-28 rounded-xl bg-[#0c101a] border border-indigo-500/40 p-1.5 flex flex-col justify-between shrink-0 shadow-lg">
            <div className="w-6 h-1 rounded-full bg-white/20 mx-auto"></div>
            <div className="space-y-1">
              <div className="h-2 rounded bg-indigo-500/30"></div>
              <div className="h-2 w-3/4 rounded bg-indigo-500/20"></div>
              <div className="h-4 rounded bg-blue-500/20 flex items-center justify-center">
                <span className="text-[7px] text-blue-300 font-mono">120Hz MVI</span>
              </div>
            </div>
            <div className="w-4 h-0.5 rounded bg-white/20 mx-auto"></div>
          </div>
          {/* Highlights */}
          <div className="space-y-1.5 text-[10px] flex-1">
            <div className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Biometric Secure Enclave</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>Offline-First SQLite CRDT</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Smartphone className="w-3 h-3 text-blue-400" />
              <span>SwiftUI & Jetpack Compose</span>
            </div>
          </div>
        </div>
      );

    case 'ai-machine-learning':
      return (
        <div className="w-full h-32 rounded-xl bg-[#080b12] border border-violet-500/20 p-3 space-y-2 overflow-hidden select-none relative group-hover:border-violet-500/40 transition-colors">
          <div className="flex items-center justify-between text-[10px]">
            <span className="font-semibold text-violet-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-violet-400" />
              Multi-Agent RAG Topology
            </span>
            <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded">
              0% Hallucination
            </span>
          </div>
          <div className="flex items-center justify-between text-[9px] font-mono text-slate-300 px-1 py-1 bg-white/[0.02] rounded border border-white/5">
            <span>Query Vector</span>
            <span className="text-violet-400">→</span>
            <span>pgvector 1536d</span>
            <span className="text-violet-400">→</span>
            <span className="text-cyan-400">Grounded Output</span>
          </div>
          <div className="flex items-center gap-2 pt-1 text-[9px] text-slate-400">
            <span className="px-2 py-0.5 rounded bg-violet-500/10 text-violet-300 border border-violet-500/20">
              Deterministic Schema Guardrails
            </span>
            <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20 font-mono">
              VPC Sandboxed
            </span>
          </div>
        </div>
      );

    case 'cloud-solutions':
      return (
        <div className="w-full h-32 rounded-xl bg-[#080b12] border border-blue-500/20 p-3 space-y-2 overflow-hidden select-none relative group-hover:border-blue-500/40 transition-colors">
          <div className="flex items-center justify-between text-[10px]">
            <span className="font-semibold text-white flex items-center gap-1.5">
              <Server className="w-3 h-3 text-blue-400" />
              Multi-Region Kubernetes
            </span>
            <span className="text-[9px] font-mono text-emerald-400">
              99.99% Target
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 text-center text-[9px] font-mono">
            <div className="p-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-300">
              us-east-1<br /><span className="text-[8px] text-emerald-400">32 Pods</span>
            </div>
            <div className="p-1 rounded bg-violet-500/10 border border-violet-500/20 text-violet-300">
              eu-west-1<br /><span className="text-[8px] text-emerald-400">24 Pods</span>
            </div>
            <div className="p-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
              ap-south-1<br /><span className="text-[8px] text-emerald-400">18 Pods</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-[9px] text-slate-400 pt-0.5 border-t border-white/5">
            <span>Terraform GitOps</span>
            <span className="text-blue-400">mTLS Zero-Trust Mesh</span>
          </div>
        </div>
      );

    case 'ui-ux-design':
      return (
        <div className="w-full h-32 rounded-xl bg-[#080b12] border border-purple-500/20 p-3 space-y-2 overflow-hidden select-none relative group-hover:border-purple-500/40 transition-colors">
          <div className="flex items-center justify-between text-[10px]">
            <span className="font-semibold text-white flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-purple-400" />
              Enterprise Token Architecture
            </span>
            <span className="text-[9px] font-mono text-purple-300">
              WCAG 2.1 AAA
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-[#3b82f6] shadow-xs"></div>
            <div className="w-5 h-5 rounded-md bg-[#8b5cf6] shadow-xs"></div>
            <div className="w-5 h-5 rounded-md bg-[#06b6d4] shadow-xs"></div>
            <div className="w-5 h-5 rounded-md bg-[#10b981] shadow-xs"></div>
            <div className="w-5 h-5 rounded-md bg-[#0c101a] border border-white/20 shadow-xs"></div>
          </div>
          <div className="text-[9px] text-slate-400 space-y-0.5">
            <div>Typography Scale: Plus Jakarta Sans (Modular 1.25)</div>
            <div className="text-purple-300 font-mono">Figma Tokens ⇄ Git Codebase Auto-Sync</div>
          </div>
        </div>
      );

    default:
      return null;
  }
};
