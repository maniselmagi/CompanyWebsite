import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Server, 
  Cpu, 
  ShieldCheck, 
  RefreshCw, 
  CheckCircle2, 
  Radio, 
  Terminal,
  Zap,
  Globe
} from 'lucide-react';

interface MockupProps {
  initialThroughput?: string;
  initialLatency?: string;
  initialUptime?: string;
  title?: string;
  subtitle?: string;
}

export const InteractiveDashboardMockup: React.FC<MockupProps> = ({
  initialThroughput = '12.4M',
  initialLatency = '14.2',
  initialUptime = '99.998%',
  title = 'Nexora Distributed Telemetry Engine',
  subtitle = 'Global Edge Network Cluster [Active: 142 Nodes]'
}) => {
  const [activeTab, setActiveTab] = useState<'metrics' | 'nodes' | 'events'>('metrics');
  const [ticker, setTicker] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Parse numeric base if possible
  const baseLatency = parseFloat(initialLatency) || 14.2;
  const baseThroughput = parseFloat(initialThroughput) || 12.4;

  // Gentle subtle live simulation ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setTicker((prev) => prev + 1);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setTicker((prev) => prev + 1);
    }, 600);
  };

  const dynamicLatency = (baseLatency + ((ticker % 5) * 0.3) - 0.6).toFixed(1);
  const dynamicThroughput = (baseThroughput + ((ticker % 4) * 0.2)).toFixed(1);

  return (
    <div className="relative rounded-2xl bg-[#090d16] border border-blue-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(59,130,246,0.15)] overflow-hidden transition-all duration-300">
      {/* Top Window Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0c101a] border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          <div className="h-4 w-[1px] bg-white/10 mx-2"></div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <Server className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline font-semibold text-slate-200">{title}</span>
            <span className="text-slate-400 text-[11px]">v3.4.2-prod</span>
          </div>
        </div>

        {/* Status indicator & live trigger */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] text-emerald-400 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Cluster Healthy</span>
          </div>
          <button 
            onClick={handleManualRefresh}
            title="Refresh Real-Time Metrics"
            className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Secondary Controls Bar */}
      <div className="px-5 py-2.5 bg-[#0a0e18] border-b border-white/[0.05] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-3 py-1 rounded-md font-medium transition-all ${
              activeTab === 'metrics'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            System Metrics
          </button>
          <button
            onClick={() => setActiveTab('nodes')}
            className={`px-3 py-1 rounded-md font-medium transition-all ${
              activeTab === 'nodes'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Edge Hubs (18)
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-3 py-1 rounded-md font-medium transition-all ${
              activeTab === 'events'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            eBPF Event Log
          </button>
        </div>

        <div className="text-[11px] font-mono text-slate-400 hidden md:block">
          {subtitle}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-5 sm:p-6 space-y-6">
        {activeTab === 'metrics' && (
          <div className="space-y-6">
            {/* 3 Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.07] hover:border-blue-500/30 transition-colors">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-medium">Ingestion Throughput</span>
                  <Activity className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-2xl font-bold font-mono text-white tracking-tight">
                  {dynamicThroughput}M <span className="text-xs font-normal text-slate-400 font-sans">ops/s</span>
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-400">
                  <Zap className="w-3 h-3" />
                  <span>+4.2% above baseline peak</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.07] hover:border-violet-500/30 transition-colors">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-medium">Global Roundtrip Latency</span>
                  <Radio className="w-4 h-4 text-violet-400" />
                </div>
                <div className="text-2xl font-bold font-mono text-white tracking-tight">
                  {dynamicLatency} <span className="text-xs font-normal text-slate-400 font-sans">ms</span>
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-blue-400">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Sub-20ms SLA guarantee met</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.07] hover:border-cyan-500/30 transition-colors">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-medium">Rolling Production Uptime</span>
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-2xl font-bold font-mono text-white tracking-tight">
                  {initialUptime}
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                  <span>Zero unplanned downtime (365d)</span>
                </div>
              </div>
            </div>

            {/* Simulated Live Sparkline / Activity Graph */}
            <div className="p-4 rounded-xl bg-[#070a11] border border-white/[0.06] space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="font-semibold flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-blue-400" />
                  Continuous Concurrency & Stream Processing Distribution
                </span>
                <span className="text-slate-400 font-mono text-[11px]">Real-Time Ring Buffer Sync</span>
              </div>

              {/* Graphic Bars */}
              <div className="h-20 flex items-end gap-1.5 sm:gap-2 pt-2 px-1">
                {[45, 62, 58, 75, 82, 69, 74, 88, 92, 85, 78, 89, 95, 91, 84, 88, 96, 92, 89, 94, 98, 93, 86, 91, 95].map((val, idx) => {
                  const animatedHeight = Math.min(100, Math.max(25, val + ((ticker + idx) % 7) * 2 - 6));
                  return (
                    <div 
                      key={idx} 
                      className="flex-1 bg-gradient-to-t from-blue-900/40 via-blue-600/70 to-cyan-400 rounded-t-sm transition-all duration-700 hover:brightness-125 cursor-pointer relative group"
                      style={{ height: `${animatedHeight}%` }}
                    >
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 hidden group-hover:block bg-black/90 px-1.5 py-0.5 rounded text-[9px] font-mono text-cyan-300 border border-cyan-500/30 whitespace-nowrap z-20">
                        {animatedHeight}% load
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between text-[10px] font-mono text-slate-400 pt-1">
                <span>T-60s (US-East)</span>
                <span>T-30s (EU-West)</span>
                <span>Current (AP-South)</span>
                <span className="text-emerald-400">Auto-balanced</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'nodes' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { region: 'us-east-virginia', nodes: '32 Replicas', ping: '8.4ms' },
                { region: 'us-west-oregon', nodes: '28 Replicas', ping: '12.1ms' },
                { region: 'eu-central-frankfurt', nodes: '26 Replicas', ping: '16.8ms' },
                { region: 'eu-west-london', nodes: '24 Replicas', ping: '15.2ms' },
                { region: 'ap-southeast-singapore', nodes: '18 Replicas', ping: '21.0ms' },
                { region: 'ap-northeast-tokyo', nodes: '14 Replicas', ping: '23.4ms' },
              ].map((hub, i) => (
                <div key={i} className="p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-white font-mono">{hub.region}</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">{hub.nodes}</div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[11px]">
                      {hub.ping}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs space-y-2 max-h-56 overflow-y-auto">
            <div className="text-slate-400 pb-1 border-b border-white/5 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <span>LIVE KERNEL eBPF AUDIT STREAM — [TRACE_ID: 884f-c91a]</span>
            </div>
            <div className="text-emerald-400 flex items-center gap-2">
              <span className="text-slate-400">13:15:02</span>
              <span>[OK]</span>
              <span className="text-slate-200">mTLS certificate rotation verified across 142 microservice ingress ports</span>
            </div>
            <div className="text-blue-400 flex items-center gap-2">
              <span className="text-slate-400">13:14:48</span>
              <span>[INFO]</span>
              <span className="text-slate-200">ClickHouse columnar ingestion compacted partition 2026_11 with zero lock</span>
            </div>
            <div className="text-emerald-400 flex items-center gap-2">
              <span className="text-slate-400">13:14:31</span>
              <span>[OK]</span>
              <span className="text-slate-200">Kafka consumer lag reduced to 0 across all 32 partition offsets</span>
            </div>
            <div className="text-violet-400 flex items-center gap-2">
              <span className="text-slate-400">13:14:10</span>
              <span>[TRACE]</span>
              <span className="text-slate-200">Synthetic health probes returned 100% success from all 6 international hubs</span>
            </div>
          </div>
        )}

        {/* Footer Meta */}
        <div className="pt-2 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>Interactive Live Architecture Simulation Demo</span>
          </div>
          <span className="font-mono text-slate-400">SOC 2 Type II Encrypted Pipeline</span>
        </div>
      </div>
    </div>
  );
};
