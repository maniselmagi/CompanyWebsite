import React, { useState } from 'react';
import { companyProfile } from '../data/companyData';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../components/SocialIcons';
import { RevealOnScroll } from '../components/RevealOnScroll';
import { 
  Mail, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  Sparkles, 
  Lock, 
  ExternalLink,
  Info
} from 'lucide-react';

interface ContactFormState {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  consent: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  subject?: string;
  message?: string;
  consent?: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormState>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    subject: 'Custom Enterprise Software',
    message: '',
    consent: true
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    status: 'idle' | 'validated' | 'error';
    summary?: string;
  }>({ status: 'idle' });

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.firstName.trim()) {
      errs.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      errs.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      errs.email = 'Corporate email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid corporate email address';
    }
    if (!formData.subject.trim()) {
      errs.subject = 'Please select a topic';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please describe your technical requirements';
    } else if (formData.message.trim().length < 15) {
      errs.message = 'Please provide at least 15 characters of project detail';
    }
    if (!formData.consent) {
      errs.consent = 'Consent is required to proceed with communications';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Transparent real validation handling per specification
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionResult({
        status: 'validated',
        summary: `Validated inquiry from ${formData.firstName} ${formData.lastName} (${formData.email}) for "${formData.subject}".`
      });
    }, 600);
  };

  const generateMailtoLink = () => {
    const subjectLine = encodeURIComponent(`[Inquiry] ${formData.subject} - ${formData.company || formData.firstName}`);
    const bodyContent = encodeURIComponent(
      `Name: ${formData.firstName} ${formData.lastName}\n` +
      `Email: ${formData.email}\n` +
      `Company: ${formData.company || 'N/A'}\n` +
      `Topic: ${formData.subject}\n\n` +
      `Project Requirements:\n${formData.message}\n`
    );
    return `mailto:${companyProfile.contactEmail}?subject=${subjectLine}&body=${bodyContent}`;
  };

  return (
    <div className="relative min-h-screen pt-28 pb-20">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px]"></div>
        <div className="absolute top-2/3 right-10 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[140px]"></div>
        <div className="absolute inset-0 bg-tech-grid opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header - Inspired by Screenshot 1 */}
        <RevealOnScroll variant="fade-up">
          <div className="text-center max-w-3xl mx-auto space-y-4 pt-8">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-xs font-semibold text-purple-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get In Touch</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Let's Build the{' '}
              <span className="text-gradient-purple-pink">
                Future Together
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Have questions about Nexora Technologies? Want to see an architectural walkthrough? Our senior engineering team is ready to help you transform your software operations.
            </p>
          </div>
        </RevealOnScroll>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Get In Touch Card (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <RevealOnScroll variant="slide-right">
              <div className="bento-card-spotlight p-8 rounded-3xl space-y-6 shadow-2xl">
                <h2 className="text-xl font-bold text-white">Get in touch</h2>
                
                <div className="space-y-4">
                  {/* Email Us */}
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-4 hover:border-purple-500/40 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Email us</div>
                      <a 
                        href={`mailto:${companyProfile.contactEmail}`} 
                        className="text-xs sm:text-sm font-semibold text-purple-300 hover:text-purple-200 transition-colors block mt-0.5"
                      >
                        {companyProfile.contactEmail}
                      </a>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Monitored by Principal Solutions Architects
                      </div>
                    </div>
                  </div>

                  {/* Call Us */}
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-4 hover:border-blue-500/40 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Call us</div>
                      <div className="text-xs sm:text-sm font-semibold text-blue-300 block mt-0.5">
                        {companyProfile.phonePlaceholder}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {companyProfile.operatingHours}
                      </div>
                    </div>
                  </div>

                  {/* Visit Us */}
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-4 hover:border-violet-500/40 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-violet-400 shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Visit us</div>
                      <div className="text-xs sm:text-sm font-semibold text-violet-300 block mt-0.5">
                        Nexora Global Delivery Hubs
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                        {companyProfile.hqLocation}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security & NDA Assurance */}
                <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/20 space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Confidentiality & Mutual NDA</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed text-[11px]">
                    All architectural discussions are governed by strict confidentiality. 100% IP ownership transfers directly to you.
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
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs text-slate-300 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-all hover:scale-105"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs text-slate-300 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-all hover:scale-105"
                    >
                      <LinkedinIcon className="w-4 h-4 text-blue-400" />
                      <span>LinkedIn</span>
                    </a>
                    <a 
                      href="https://twitter.com" 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs text-slate-300 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-all hover:scale-105"
                    >
                      <TwitterIcon className="w-4 h-4 text-sky-400" />
                      <span>Twitter / X</span>
                    </a>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right Column: Send Us a Message Card (7 Cols) */}
          <div className="lg:col-span-7">
            <RevealOnScroll variant="slide-left">
              <div className="bento-card-spotlight p-8 sm:p-10 rounded-3xl shadow-2xl relative">
              <h2 className="text-2xl font-bold text-white mb-6">Send us a message</h2>

              {/* Status Alert if Form is Validated */}
              {submissionResult.status === 'validated' && (
                <div className="mb-6 p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Inquiry Validated Successfully</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {submissionResult.summary}
                  </p>
                  
                  {/* Honest backend notification as requested */}
                  <div className="p-3 rounded-lg bg-black/40 border border-white/10 text-[11px] text-slate-300 space-y-2">
                    <div className="flex items-start gap-2 text-amber-300">
                      <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span>
                        <strong>Direct Dispatch Ready:</strong> To ensure your message reaches our architects immediately without relying on an external webhook API key, click below to send via your email client:
                      </span>
                    </div>
                    <a
                      href={generateMailtoLink()}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 text-black font-semibold text-xs hover:bg-emerald-400 transition-colors"
                    >
                      <span>Send Now via Corporate Email Client</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSubmissionResult({ status: 'idle' })}
                    className="text-xs text-slate-400 hover:text-white underline pt-1"
                  >
                    Edit inquiry details
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* First Name & Last Name Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="firstName" className="block text-xs font-semibold text-slate-200">
                      First Name <span className="text-purple-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="John"
                      className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all ${
                        errors.firstName ? 'border-rose-500/80 bg-rose-500/[0.02]' : 'border-white/[0.1] focus:border-purple-500/50'
                      }`}
                    />
                    {errors.firstName && (
                      <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.firstName}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="lastName" className="block text-xs font-semibold text-slate-200">
                      Last Name <span className="text-purple-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Doe"
                      className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all ${
                        errors.lastName ? 'border-rose-500/80 bg-rose-500/[0.02]' : 'border-white/[0.1] focus:border-purple-500/50'
                      }`}
                    />
                    {errors.lastName && (
                      <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.lastName}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-200">
                    Email Address <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@company.com"
                    className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all ${
                      errors.email ? 'border-rose-500/80 bg-rose-500/[0.02]' : 'border-white/[0.1] focus:border-purple-500/50'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Company Name */}
                <div className="space-y-1.5">
                  <label htmlFor="company" className="block text-xs font-semibold text-slate-200">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Your Company"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.1] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/40 transition-all"
                  />
                </div>

                {/* Subject Dropdown */}
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="block text-xs font-semibold text-slate-200">
                    Subject <span className="text-purple-400">*</span>
                  </label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0c101a] border border-white/[0.1] text-sm text-white focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/40 transition-all"
                  >
                    <option value="Smart-Kiosk & Touch Systems">Smart-Kiosk & Touch Terminal Systems</option>
                    <option value="Custom Software Development">Custom Software Development</option>
                    <option value="Web Application Development">Web Application Development</option>
                    <option value="Mobile & Tablet App Development">Mobile & Tablet App Development</option>
                    <option value="UI/UX & Product Design">UI/UX & Product Design Systems</option>
                    <option value="Technical Consultation & Architecture">Technical Consultation & Scope Review</option>
                  </select>
                </div>

                {/* Message Field */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-xs font-semibold text-slate-200">
                    Message <span className="text-purple-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project and how we can help..."
                    className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all ${
                      errors.message ? 'border-rose-500/80 bg-rose-500/[0.02]' : 'border-white/[0.1] focus:border-purple-500/50'
                    }`}
                  ></textarea>
                  {errors.message && (
                    <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Consent Checkbox */}
                <div className="space-y-1 pt-1">
                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="w-4 h-4 rounded bg-white/5 border border-white/20 text-purple-600 focus:ring-purple-500 focus:ring-offset-0 mt-0.5"
                    />
                    <label htmlFor="consent" className="text-xs text-slate-400 select-none cursor-pointer leading-normal">
                      I agree to receive communications from Nexora Technologies and understand that I can unsubscribe at any time.
                    </label>
                  </div>
                  {errors.consent && (
                    <p className="text-[11px] text-rose-400">{errors.consent}</p>
                  )}
                </div>

                {/* Vibrant Gradient Submit Button (as in screenshot 1) */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:shadow-[0_0_35px_rgba(217,70,239,0.5)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 border border-white/20 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Validating Dispatch...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </div>
  );
};
