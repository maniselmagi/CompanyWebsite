import React from 'react';
import { 
  Smartphone, 
  Terminal, 
  Zap, 
  Activity, 
  Sparkles, 
  Monitor
} from 'lucide-react';

interface SchematicProps {
  serviceId: string;
}

export const ServiceCardSchematic: React.FC<SchematicProps> = ({ serviceId }) => {
  switch (serviceId) {
    case 'kiosk-systems':
      return (
        <div className="w-full h-32 rounded-xl bg-[#080b12] border border-blue-500/20 p-3 font-mono text-[10px] space-y-1.5 overflow-hidden select-none relative group-hover:border-blue-500/40 transition-colors">
          <div className="flex items-center justify-between text-slate-500 pb-1 border-b border-white/5">
            <div className="flex items-center gap-1.5">
              <Smartphone className="w-3 h-3 text-blue-400" />
              <span>table_kiosk_bus.ts</span>
            </div>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 font-sans">
              Sync: &lt; 50ms
            </span>
          </div>
          <div className="text-slate-400">
            <span className="text-blue-400">broadcastChannel</span>.<span className="text-violet-300">postMessage</span>({'{'}
          </div>
          <div className="pl-3 text-slate-300">
            event: <span className="text-amber-300">'NEW_TICKET'</span>, table: <span className="text-cyan-300">3</span>, items: <span className="text-emerald-300">2</span>
          </div>
          <div className="pl-3 text-slate-500">
            // Zero-latency local tablet state sync
          </div>
          <div className="text-slate-400">{'}'});</div>
          <div className="absolute bottom-2 right-2 flex items-center gap-1 text-[9px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
            <Activity className="w-2.5 h-2.5" />
            <span>KDS Connected</span>
          </div>
        </div>
      );

    case 'custom-software':
      return (
        <div className="w-full h-32 rounded-xl bg-[#080b12] border border-violet-500/20 p-3 font-mono text-[10px] space-y-1.5 overflow-hidden select-none relative group-hover:border-violet-500/40 transition-colors">
          <div className="flex items-center justify-between text-slate-500 pb-1 border-b border-white/5">
            <div className="flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-violet-400" />
              <span>order_pipeline.py</span>
            </div>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-violet-500/10 text-violet-400 font-sans">
              FastAPI 3.11
            </span>
          </div>
          <div className="text-slate-400">
            <span className="text-violet-400">@router.post</span>(<span className="text-amber-300">"/api/v1/orders"</span>)
          </div>
          <div className="text-slate-400">
            <span className="text-blue-400">async def</span> <span className="text-emerald-300">dispatch_order</span>(payload: OrderPayload):
          </div>
          <div className="pl-3 text-slate-300">
            <span className="text-cyan-300">return await</span> order_service.process(payload)
          </div>
          <div className="absolute bottom-2 right-2 flex items-center gap-1 text-[9px] text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20">
            <Zap className="w-2.5 h-2.5" />
            <span>Type Safe</span>
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
              LCP: 0.5s • 60 FPS
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-[9px]">
            <div className="p-1.5 rounded bg-white/[0.02] border border-white/5">
              <div className="text-slate-500">Render</div>
              <div className="text-white font-bold">16.6ms</div>
            </div>
            <div className="p-1.5 rounded bg-white/[0.02] border border-white/5">
              <div className="text-slate-500">Bundle</div>
              <div className="text-emerald-400 font-bold">Vite 8</div>
            </div>
            <div className="p-1.5 rounded bg-white/[0.02] border border-white/5">
              <div className="text-slate-500">Score</div>
              <div className="text-cyan-400 font-bold">100/100</div>
            </div>
          </div>
          <div className="text-[10px] text-slate-400 font-sans flex items-center justify-between pt-0.5">
            <span>React 19 + TypeScript + Tailwind</span>
            <span className="text-emerald-400">Optimistic UI</span>
          </div>
        </div>
      );

    case 'mobile-app-development':
      return (
        <div className="w-full h-32 rounded-xl bg-[#080b12] border border-amber-500/20 p-3 space-y-2 overflow-hidden select-none relative group-hover:border-amber-500/40 transition-colors">
          <div className="flex items-center justify-between pb-1.5 border-b border-white/5">
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-amber-400">
              <Monitor className="w-3 h-3" />
              <span>Tablet Hardware Display</span>
            </div>
            <span className="text-[9px] font-mono text-slate-400">8"–12" Touch</span>
          </div>
          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="flex-1 p-2 rounded bg-white/[0.02] border border-white/5 text-center">
              <div className="text-[9px] text-slate-500">Touch Target</div>
              <div className="text-white font-mono font-bold text-xs mt-0.5">&gt; 48px</div>
            </div>
            <div className="flex-1 p-2 rounded bg-white/[0.02] border border-white/5 text-center">
              <div className="text-[9px] text-slate-500">Orientation</div>
              <div className="text-amber-400 font-mono font-bold text-xs mt-0.5">Landscape / Port</div>
            </div>
          </div>
          <div className="text-[10px] text-slate-400 flex items-center justify-between pt-0.5">
            <span>Android APK & Tablet PWA</span>
            <span className="text-emerald-400">Offline Caching</span>
          </div>
        </div>
      );

    case 'ui-ux-design':
      return (
        <div className="w-full h-32 rounded-xl bg-[#080b12] border border-pink-500/20 p-3 space-y-2 overflow-hidden select-none relative group-hover:border-pink-500/40 transition-colors">
          <div className="flex items-center justify-between pb-1.5 border-b border-white/5">
            <div className="flex items-center gap-1.5 text-pink-400 text-[10px] font-mono">
              <Sparkles className="w-3 h-3" />
              <span>Design Token Architecture</span>
            </div>
            <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
              WCAG AAA
            </span>
          </div>
          <div className="grid grid-cols-4 gap-1.5 pt-1">
            <div className="h-6 rounded bg-[#070b16] border border-blue-500/40 flex items-center justify-center text-[8px] font-mono text-slate-400">bg-base</div>
            <div className="h-6 rounded bg-blue-600 flex items-center justify-center text-[8px] font-mono text-white font-bold">accent</div>
            <div className="h-6 rounded bg-violet-600 flex items-center justify-center text-[8px] font-mono text-white font-bold">brand</div>
            <div className="h-6 rounded bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-[8px] font-mono text-emerald-400 font-bold">status</div>
          </div>
          <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1">
            <span>Dark & Light Ambient Tuning</span>
            <span className="text-pink-400 font-mono">Figma &rarr; Tailwind</span>
          </div>
        </div>
      );

    default:
      return (
        <div className="w-full h-32 rounded-xl bg-[#080b12] border border-white/10 p-3 flex items-center justify-center text-slate-500 text-xs font-mono">
          <span>// Nexora Architecture Schematic</span>
        </div>
      );
  }
};
