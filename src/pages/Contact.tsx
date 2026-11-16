import React, { useState } from 'react';
import { companyProfile } from '../data/companyData';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../components/SocialIcons';
import { 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Send,
  Sparkles,
  Lock
} from 'lucide-react';

interface FormData {
  fullName: string;
  businessEmail: string;
  projectDomain: string;
  subject: string;
  message: string;
  ndaRequired: boolean;
}

interface FormErrors {
  fullName?: string;
  businessEmail?: string;
  subject?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    businessEmail: '',
    projectDomain: 'Custom Enterprise Software',
    subject: '',
    message: '',
    ndaRequired: true
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.businessEmail.trim()) {
      newErrors.businessEmail = 'Business email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail)) {
      newErrors.businessEmail = 'Please provide a valid corporate email address';
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please provide brief details of your technical requirements';
    } else if (formData.message.trim().length < 15) {
      newErrors.message = 'Please provide at least 15 characters detailing your scope';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate reliable enterprise form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        fullName: '',
        businessEmail: '',
        projectDomain: 'Custom Enterprise Software',
        subject: '',
        message: '',
        ndaRequired: true
      });
      setErrors({});
    }, 1000);
  };

  return (
    <div className="relative min-h-screen pt-28 pb-20">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px]"></div>
        <div className="absolute top-2/3 right-10 w-[450px] h-[450px] bg-violet-600/10 rounded-full blur-[140px]"></div>
        <div className="absolute inset-0 bg-tech-grid opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6 pt-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
            <span>DIRECT ARCHITECTURAL ENGAGEMENT</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            Let's Architect Your{' '}
            <span className="text-gradient-primary">
              Next Breakthrough.
            </span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Reach out directly to Nexora Technologies. Whether exploring greenfield system architecture, AI modernization, or legacy migration, our senior team responds within 24 business hours.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Placeholders (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-[#090d16] border border-white/[0.08] space-y-6 shadow-xl">
              <h2 className="text-xl font-bold text-white">Direct Communication Channels</h2>
              
              <div className="space-y-5 text-sm">
                {/* Business Email Placeholder */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Business Email Placeholder</div>
                    <a href={`mailto:${companyProfile.contactEmail}`} className="text-base font-semibold text-white hover:text-blue-400 transition-colors">
                      {companyProfile.contactEmail}
                    </a>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Monitored by Principal Solutions Architects
                    </div>
                  </div>
                </div>

                {/* Company Location Placeholder */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Company Location Placeholder</div>
                    <div className="text-sm font-semibold text-white">
                      Nexora Global Delivery Hubs
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      {companyProfile.hqLocation}
                    </div>
                  </div>
                </div>

                {/* Response SLA */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">SLA Commitment</div>
                    <div className="text-sm font-semibold text-white">
                      Guaranteed Initial Review
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {companyProfile.responseSla}
                    </div>
                  </div>
                </div>
              </div>

              {/* Confidentiality Notice */}
              <div className="pt-4 border-t border-white/[0.08] p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <Lock className="w-4 h-4" />
                  <span>Confidentiality Guaranteed</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  We treat all system disclosures with utmost confidentiality. Standard mutual Non-Disclosure Agreements (NDAs) are executed prior to deep architectural data sharing.
                </p>
              </div>

              {/* Social Channels */}
              <div className="pt-2 border-t border-white/[0.08]">
                <div className="text-xs font-mono text-slate-400 mb-3 uppercase tracking-wider">
                  Verified Social Channels
                </div>
                <div className="flex items-center gap-3">
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all"
                  >
                    <TwitterIcon className="w-4 h-4" />
                    <span>Twitter / X</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Functional Form with Validation (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#090d16] border border-blue-500/25 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
                <div>
                  <h2 className="text-2xl font-bold text-white">Project Inquiry & RFP</h2>
                  <p className="text-xs text-slate-400 mt-1">Provide preliminary details regarding your technical requirements.</p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Direct Routing</span>
                </div>
              </div>

              {isSuccess ? (
                <div className="py-12 text-center space-y-5 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">Inquiry Transmitted Successfully</h3>
                    <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      Thank you for contacting Nexora Technologies. Our Principal Architecture Committee has received your request and will initiate contact within 24 business hours.
                    </p>
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors"
                    >
                      Submit Another Technical Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 pt-6" noValidate>
                  {/* Name and Email Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="block text-xs font-semibold text-slate-200">
                        Full Name <span className="text-blue-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Elena Rostova"
                        className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all ${
                          errors.fullName ? 'border-rose-500/80 bg-rose-500/[0.02]' : 'border-white/[0.1] focus:border-blue-500/50'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="businessEmail" className="block text-xs font-semibold text-slate-200">
                        Business Email <span className="text-blue-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="businessEmail"
                        value={formData.businessEmail}
                        onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                        placeholder="e.g. elena@enterprise.com"
                        className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all ${
                          errors.businessEmail ? 'border-rose-500/80 bg-rose-500/[0.02]' : 'border-white/[0.1] focus:border-blue-500/50'
                        }`}
                      />
                      {errors.businessEmail && (
                        <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.businessEmail}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Project Domain / Service Selector */}
                  <div className="space-y-2">
                    <label htmlFor="projectDomain" className="block text-xs font-semibold text-slate-200">
                      Technical Domain Focus
                    </label>
                    <select
                      id="projectDomain"
                      value={formData.projectDomain}
                      onChange={(e) => setFormData({ ...formData, projectDomain: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0c101a] border border-white/[0.1] text-sm text-white focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/40 transition-all"
                    >
                      <option value="Custom Enterprise Software">1. Custom Software Development</option>
                      <option value="Web Application Development">2. Web Application Development</option>
                      <option value="Mobile App Development">3. Mobile App Development</option>
                      <option value="AI & Machine Learning">4. AI & Machine Learning Systems</option>
                      <option value="Cloud Solutions & DevOps">5. Cloud Solutions & Infrastructure</option>
                      <option value="UI/UX Systems Design">6. UI/UX Design Systems</option>
                      <option value="General Technical Consultation">Comprehensive Full-Stack Modernization</option>
                    </select>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-xs font-semibold text-slate-200">
                      Subject <span className="text-blue-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Distributed Telemetry Pipeline Modernization"
                      className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all ${
                        errors.subject ? 'border-rose-500/80 bg-rose-500/[0.02]' : 'border-white/[0.1] focus:border-blue-500/50'
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.subject}</span>
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-xs font-semibold text-slate-200">
                      Project Scope & Architectural Requirements <span className="text-blue-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline target concurrency, existing stack bottlenecks, timeline goals, or cloud preferences..."
                      className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all ${
                        errors.message ? 'border-rose-500/80 bg-rose-500/[0.02]' : 'border-white/[0.1] focus:border-blue-500/50'
                      }`}
                    ></textarea>
                    {errors.message && (
                      <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Mutual NDA Checkbox */}
                  <div className="flex items-center gap-3 pt-1">
                    <input
                      type="checkbox"
                      id="nda"
                      checked={formData.ndaRequired}
                      onChange={(e) => setFormData({ ...formData, ndaRequired: e.target.checked })}
                      className="w-4 h-4 rounded bg-white/5 border border-white/20 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                    />
                    <label htmlFor="nda" className="text-xs text-slate-300 select-none cursor-pointer">
                      Execute standard mutual Non-Disclosure Agreement (NDA) prior to technical deep-dive
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-200 border border-white/20 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Transmitting Encrypted Dispatch...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Architecture Inquiry</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
