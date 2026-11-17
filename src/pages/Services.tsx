import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import { ServiceCardSchematic } from '../components/ServiceCardSchematic';
import { RevealOnScroll } from '../components/RevealOnScroll';
import { 
  Cpu, 
  Globe, 
  Smartphone, 
  Sparkles, 
  Layout, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Clock, 
  ShieldCheck, 
  ChevronDown,
  AlertTriangle
} from 'lucide-react';

export const Services: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Can Nexora customize the Smart-Kiosk software for our specific dining or retail operations?',
      a: 'Yes. We specialize in tailoring menus, visual layouts, language packs, spice and combo customizers, POS integrations, and kitchen display workflows around your exact operational routines.'
    },
    {
      q: 'How do you test software on physical commercial tablets and kiosk hardware?',
      a: 'We test directly on physical 8", 10", and 12" Android tablets and commercial kiosk mounts. We validate minimum 48px touch targets, multi-touch stability, orientation adaptation, and screen contrast in varied ambient lighting conditions.'
    },
    {
      q: 'How does Nexora guarantee intellectual property protection and code ownership?',
      a: 'All intellectual property, proprietary software source code, designs, tokens, and build configurations are 100% owned by the client from day one. Formal IP assignment covenants are executed prior to sprint kickoff.'
    },
    {
      q: 'Can the kiosk application operate reliably during intermittent internet hiccups?',
      a: 'Yes. Our kiosk architecture utilizes offline-first caching, LocalStorage state persistence, and local inter-screen BroadcastChannel messaging. Diners can continue to navigate menus and build orders even if outside internet connectivity fluctuates.'
    }
  ];

  return (
    <div className="relative min-h-screen pt-28 pb-20">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-1/3 w-[550px] h-[550px] bg-blue-600/10 rounded-full blur-[150px]"></div>
        <div className="absolute top-2/3 right-10 w-[450px] h-[450px] bg-violet-600/10 rounded-full blur-[140px]"></div>
        <div className="absolute inset-0 bg-tech-grid opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Header */}
        <RevealOnScroll variant="fade-up" duration={700}>
          <div className="text-center max-w-4xl mx-auto space-y-6 pt-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono font-semibold text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TOUCH SYSTEMS & SOFTWARE ENGINEERING SERVICES</span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05]">
              Engineered for Touch Terminals, Fluid Performance &{' '}
              <span className="text-electric-cyan">
                Operational Reliability.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              Five focused engineering services. From commercial restaurant kiosks to bespoke business software, responsive web applications, and ergonomic design systems.
            </p>
          </div>
        </RevealOnScroll>

        {/* 5 Services Deep Dive */}
        <div className="space-y-16">
          {servicesData.map((service, index) => {
            const Icon = {
              Cpu: Cpu,
              Globe: Globe,
              Smartphone: Smartphone,
              Sparkles: Sparkles,
              Layout: Layout
            }[service.iconName] || Cpu;

            return (
              <RevealOnScroll key={service.id} variant="fade-up" delay={index % 2 === 0 ? 0 : 100}>
                <section 
                  id={service.id}
                  className="scroll-mt-28 p-8 sm:p-12 rounded-3xl bento-card-spotlight shadow-2xl space-y-8"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    {/* Left Column (Main Information) */}
                    <div className="lg:col-span-7 space-y-6 text-left">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-xs font-mono text-slate-400">Service 0{index + 1}</span>
                          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                            {service.title}
                          </h2>
                        </div>
                      </div>

                      <p className="text-sm font-medium text-blue-400">
                        {service.subtitle}
                      </p>

                      <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                        {service.fullDescription}
                      </p>

                      {/* Customer Problems Solved */}
                      <div className="p-4 rounded-xl bg-amber-500/[0.04] border border-amber-500/20 space-y-2">
                        <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Core Operational Bottlenecks Solved</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Eliminates manual ordering errors, paper slip friction, complex user onboarding, and unmaintainable technical debt through clean, modern software architecture.
                        </p>
                      </div>

                      {/* Embedded UI Schematic */}
                      <div className="space-y-2">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Live Architectural Schematic:
                        </div>
                        <ServiceCardSchematic serviceId={service.id} />
                      </div>

                      {/* Key Capabilities */}
                      <div className="space-y-3 pt-2">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                          <Layers className="w-3.5 h-3.5 text-blue-400" />
                          <span>Core Capabilities & Deliverables</span>
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {service.keyCapabilities.map((cap, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-slate-300 bg-white/[0.02] p-2.5 rounded-lg border border-white/[0.05]">
                              <span className="text-blue-400 font-bold">•</span>
                              <span>{cap}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Architecture Highlights */}
                      <div className="space-y-2 pt-2">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                          Architectural Standards
                        </h3>
                        <ul className="space-y-1.5 text-xs text-slate-400">
                          {service.architectureHighlights.map((arch, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-emerald-400">✓</span>
                              <span>{arch}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right Column (Benefits & Direct CTA Card) */}
                    <div className="lg:col-span-5 space-y-6 text-left">
                      <div className="p-7 rounded-2xl bg-gradient-to-br from-[#0c111d] to-[#07090e] border border-blue-500/25 space-y-6">
                        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                          <span className="text-xs font-bold uppercase tracking-wider text-white">
                            Business Advantages
                          </span>
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        </div>

                        <div className="space-y-3">
                          {service.benefits.map((benefit, i) => (
                            <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-4 border-t border-white/[0.08] space-y-2 text-xs">
                          <div className="flex items-center gap-2 text-slate-400">
                            <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                            <span>{service.deliveryTimeline}</span>
                          </div>
                        </div>

                        <Link
                          to="/contact"
                          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all duration-200"
                        >
                          <span>Inquire About {service.title}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </section>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Technical FAQ Accordion */}
        <RevealOnScroll variant="fade-up">
          <section className="max-w-4xl mx-auto space-y-8 pt-8 text-left">
            <div className="text-center space-y-3">
              <div className="text-xs font-bold tracking-widest text-blue-400 uppercase">
                Frequently Asked Questions
              </div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Commercial Touch Systems & Development Inquiries
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div 
                  key={idx}
                  className="rounded-xl bg-[#090d16] border border-white/[0.08] overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between text-sm sm:text-base font-semibold text-white hover:text-blue-300 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {activeFaq === idx && (
                    <div className="px-5 pb-5 text-sm text-slate-300 leading-relaxed border-t border-white/[0.05] pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </RevealOnScroll>

        {/* Bottom CTA */}
        <RevealOnScroll variant="scale-up">
          <section className="text-center py-12 space-y-6">
            <h2 className="text-3xl font-extrabold text-white">
              Have a Specific Software or Kiosk Project?
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              Our software engineers are ready to review your specifications and propose a concrete technical path forward.
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        </RevealOnScroll>
      </div>
    </div>
  );
};
