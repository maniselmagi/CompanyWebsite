import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Compass, 
  ArrowRight, 
  CheckCircle2,
  Terminal
} from 'lucide-react';
import { coreValues } from '../data/companyData';

export const About: React.FC = () => {
  return (
    <div className="relative min-h-screen pt-28 pb-20">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px]"></div>
        <div className="absolute top-1/2 left-10 w-[450px] h-[450px] bg-violet-600/10 rounded-full blur-[150px]"></div>
        <div className="absolute inset-0 bg-tech-grid opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Hero / Header */}
        <div className="text-center max-w-4xl mx-auto space-y-6 pt-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
            <span>ABOUT NEXORA TECHNOLOGIES</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            Engineering the Digital Backbone for{' '}
            <span className="text-gradient-primary">
              Global Scale.
            </span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Founded with the conviction that enterprise software must be robust, type-safe, and built without architectural compromise. We turn complex computational challenges into durable digital competitive advantage.
          </p>
        </div>

        {/* Company Introduction Presentation */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-bold tracking-widest text-blue-400 uppercase">
              Our Identity & Purpose
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              A Global Software Consultancy Built on Uncompromising Technical Rigor
            </h2>
            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                At <span className="text-white font-semibold">NEXORA TECHNOLOGIES</span>, we engineer software that cannot afford to fail. In an era where modern commerce, financial systems, and global healthcare rely entirely on software infrastructure, fragility is not an option.
              </p>
              <p>
                Unlike traditional agency models that treat software engineering as an outsourced assembly line, Nexora operates as a strategic engineering partner. Our teams comprise senior full-stack architects, distributed systems specialists, and AI researchers who take end-to-end ownership of client systems.
              </p>
              <p>
                From low-latency distributed telemetry engines to multi-agent artificial intelligence pipelines, our systems are built with zero-trust security postures, automated continuous integration, and complete intellectual property ownership transferred directly to our clients.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap gap-4 text-xs font-mono text-slate-300">
              <div className="px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% In-House Senior Engineers</span>
              </div>
              <div className="px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>Zero Subcontracting Gateways</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="p-8 rounded-2xl bg-[#0c101a] border border-blue-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
                  <Terminal className="w-4 h-4 text-blue-400" />
                  <span>nexora_charter.config</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                  Immutable
                </span>
              </div>

              <div className="space-y-4 font-mono text-xs text-slate-300 leading-relaxed">
                <div>
                  <span className="text-blue-400">const</span> enterprisePrinciples = &#123;
                </div>
                <div className="pl-4 space-y-1.5 text-slate-300">
                  <div><span className="text-violet-400">codeOwnership:</span> '100% Client Retained',</div>
                  <div><span className="text-violet-400">vendorLockIn:</span> 'Strictly Prohibited',</div>
                  <div><span className="text-violet-400">typeSafety:</span> 'Enforced End-to-End',</div>
                  <div><span className="text-violet-400">deliveryModel:</span> 'Agile Bi-Weekly Deploys',</div>
                  <div><span className="text-violet-400">securityModel:</span> 'Zero-Trust Multi-Cloud',</div>
                  <div><span className="text-violet-400">globalAvailability:</span> '99.99% Design Benchmark'</div>
                </div>
                <div>&#125;;</div>
              </div>

              <div className="pt-4 border-t border-white/[0.08] text-xs text-slate-400 leading-normal">
                "Our guiding metric is system resilience under peak real-world pressure."
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-[#0c111e] to-[#07090e] border border-blue-500/30 shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white">Our Vision</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              To pioneer resilient, human-centered digital foundations that empower global enterprises to operate with speed, autonomous intelligence, and absolute security in tomorrow's interconnected digital world.
            </p>
            <div className="pt-4 text-xs font-mono text-blue-400">
              Focus: Global Interoperability & Durable Architecture
            </div>
          </div>

          <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-[#0e0f1e] to-[#07090e] border border-violet-500/30 shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white">Our Mission</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              To eliminate technical friction for international businesses by delivering enterprise software, custom artificial intelligence, and cloud platforms engineered with uncompromising craftsmanship, transparent communication, and rapid turnaround.
            </p>
            <div className="pt-4 text-xs font-mono text-violet-400">
              Focus: Measurable Impact & Zero Technical Debt
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-bold tracking-widest text-blue-400 uppercase">
              What Defines Us
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Our Guiding Architectural Values
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              These principles govern every commit we push, every architecture decision we draft, and every partnership we undertake.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreValues.map((value) => (
              <div 
                key={value.number}
                className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-blue-500/40 transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-extrabold font-mono text-blue-400">
                      {value.number}
                    </span>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                      {value.metric}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{value.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global Delivery Model Presentation */}
        <section className="p-8 sm:p-12 rounded-3xl bg-[#090d16] border border-white/[0.08] space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-bold tracking-widest text-emerald-400 uppercase">
              Global Delivery Infrastructure
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Distributed Coordination, Localized Alignment
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Nexora provides global coverage for enterprise partners across North America, Europe, and Asia-Pacific. We operate with synchronous architectural reviews and continuous asynchronous deployment cycles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <div className="text-xs font-mono text-blue-400">Region 01</div>
              <div className="text-base font-bold text-white">North America Operations</div>
              <p className="text-xs text-slate-400">
                Coordinated sprint retrospectives and executive architecture consultations across EST & PST timezones.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <div className="text-xs font-mono text-violet-400">Region 02</div>
              <div className="text-base font-bold text-white">EMEA Strategic Hubs</div>
              <p className="text-xs text-slate-400">
                UK & European Union time alignment ensuring real-time incident triage and continuous development coverage.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <div className="text-xs font-mono text-cyan-400">Region 03</div>
              <div className="text-base font-bold text-white">Asia-Pacific Delivery</div>
              <p className="text-xs text-slate-400">
                High-throughput automated overnight test verification, automated regression suites, and release engineering.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="text-center py-12 space-y-6">
          <h2 className="text-3xl font-extrabold text-white">
            Looking for a Senior Software Partner?
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Speak directly with our technical leadership regarding your architectural roadmap, team extension, or greenfield system.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all"
            >
              <span>Connect With Our Architects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
