"use client";
import React, { useState } from 'react';
import {
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  Mail,
  Phone,
  MapPin,
  Clock,
  Linkedin,
  Instagram,
  Github,
  Twitter,
} from 'lucide-react';
import { brand } from '@/config/brand';

const socialIcons = {
  Twitter,
  LinkedIn: Linkedin,
  Instagram,
  GitHub: Github,
} as const;

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

const inputClass =
  'w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-white placeholder-white/35 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-sky-400/70';

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: '',
  });

  const [status, setStatus] = useState<FormStatus>({ type: 'idle', message: '' });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: '' });

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '20d19e80-6c66-484a-b9cd-94c6d6c3f05d',
          ...formData,
          subject: `New Contact Form Submission from ${formData.name}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus({
          type: 'success',
          message: "Thank you! We'll get back to you within 24 hours.",
        });
        setFormData({ name: '', email: '', company: '', phone: '', service: '', message: '' });
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Something went wrong. Please try again or email us directly.',
      });
    }
  };

  const details = [
    { icon: Mail, label: 'Email us', value: brand.contact.email, href: `mailto:${brand.contact.email}` },
    { icon: Phone, label: 'Call us', value: brand.contact.phone, href: `tel:${brand.contact.phone}` },
    { icon: MapPin, label: 'Based in', value: brand.contact.location, href: null },
  ];

  return (
    <section className="relative overflow-hidden px-6 pb-28">
      {/* Ambient glow so the frosted form has something to blur */}
      <div className="pointer-events-none absolute left-[8%] top-10 h-[30rem] w-[30rem] rounded-full bg-sky-600/25 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-0 right-[5%] h-[26rem] w-[26rem] rounded-full bg-indigo-700/25 blur-[150px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_50%,transparent_100%)]" />

      <div className="relative z-10 mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Left — contact information */}
        <div className="lg:sticky lg:top-28">
          <div className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-white/50">
            Get in touch
          </div>
          <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl">
            Talk to a real
            <br />
            <span className="text-white/50">engineer, not a bot.</span>
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/55">
            Whether you&apos;re securing an existing system or building something new,
            we&apos;ll give you a straight answer about what it takes.
          </p>

          <div className="mt-10 space-y-3">
            {details.map((item) => {
              const Icon = item.icon;
              const inner = (
                <>
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-700">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-white/40">{item.label}</p>
                    <p className="truncate text-sm text-white/85">{item.value}</p>
                  </div>
                </>
              );
              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="liquid-glass flex items-center gap-4 rounded-2xl p-4 transition-transform duration-300 hover:translate-x-1"
                >
                  {inner}
                </a>
              ) : (
                <div key={item.label} className="liquid-glass flex items-center gap-4 rounded-2xl p-4">
                  {inner}
                </div>
              );
            })}
          </div>

          {/* Response time */}
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
            <Clock className="h-5 w-5 flex-shrink-0 text-emerald-400" />
            <p className="text-sm text-white/75">
              We typically reply within <span className="text-white">24 hours</span>.
            </p>
          </div>

          {/* Socials */}
          <div className="mt-10 border-t border-white/10 pt-8">
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/40">Follow along</p>
            <div className="flex items-center gap-3">
              {brand.socials.map((social) => {
                const Icon = socialIcons[social.name as keyof typeof socialIcons] ?? Github;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="liquid-glass flex h-11 w-11 items-center justify-center rounded-xl text-white/60 transition-all duration-300 hover:-translate-y-1 hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right — frosted glass form */}
        <div className="liquid-glass liquid-glass-strong rounded-[2rem] p-7 shadow-2xl shadow-black/40 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-white/80">
                  Full Name *
                </label>
                <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className={inputClass} placeholder="John Smith" />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/80">
                  Email Address *
                </label>
                <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className={inputClass} placeholder="john@company.com" />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="company" className="mb-2 block text-sm font-medium text-white/80">
                  Company Name
                </label>
                <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className={inputClass} placeholder="Your Company" />
              </div>
              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium text-white/80">
                  Phone Number
                </label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="+1 (555) 000-0000" />
              </div>
            </div>

            <div>
              <label htmlFor="service" className="mb-2 block text-sm font-medium text-white/80">
                Service Interested In *
              </label>
              <select id="service" name="service" required value={formData.service} onChange={handleChange} className={inputClass}>
                <option value="" className="bg-slate-900">Select a service</option>
                <option value="cybersecurity" className="bg-slate-900">Cybersecurity</option>
                <option value="pentesting" className="bg-slate-900">Penetration Testing</option>
                <option value="engineering" className="bg-slate-900">Software Engineering</option>
                <option value="cloud" className="bg-slate-900">Cloud &amp; DevOps</option>
                <option value="managed-it" className="bg-slate-900">Managed IT &amp; Support</option>
                <option value="compliance" className="bg-slate-900">Compliance &amp; Risk</option>
                <option value="other" className="bg-slate-900">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-white/80">
                Project Details *
              </label>
              <textarea id="message" name="message" required rows={5} value={formData.message} onChange={handleChange} className={`${inputClass} resize-none`} placeholder="Tell us about your project requirements..." />
            </div>

            {status.type !== 'idle' && (
              <div
                className={`flex items-center gap-3 rounded-xl p-4 ${
                  status.type === 'success'
                    ? 'border border-green-500/30 bg-green-500/20'
                    : status.type === 'error'
                      ? 'border border-red-500/30 bg-red-500/20'
                      : 'border border-blue-500/30 bg-blue-500/20'
                }`}
              >
                {status.type === 'success' && <CheckCircle className="h-5 w-5 text-green-400" />}
                {status.type === 'error' && <AlertCircle className="h-5 w-5 text-red-400" />}
                {status.type === 'loading' && <Loader2 className="h-5 w-5 animate-spin text-blue-400" />}
                <p
                  className={`text-sm ${
                    status.type === 'success'
                      ? 'text-green-200'
                      : status.type === 'error'
                        ? 'text-red-200'
                        : 'text-blue-200'
                  }`}
                >
                  {status.message || 'Sending your message...'}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={status.type === 'loading'}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-700 px-6 py-4 font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status.type === 'loading' ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" /> Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
