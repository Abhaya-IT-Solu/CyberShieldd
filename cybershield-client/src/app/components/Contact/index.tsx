"use client";
import React, {useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { div } from 'motion/react-client';
import { DEFAULT_MAX_VERSION } from 'tls';

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

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: ''
  });

  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: '' });

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '20d19e80-6c66-484a-b9cd-94c6d6c3f05d',
          ...formData,
          subject: `New Contact Form Submission from ${formData.name}`
        })
      });

      const result = await response.json();

      if (result.success) {
        setStatus({
          type: 'success',
          message: 'Thank you! We\'ll get back to you within 24 hours.'
        });
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          service: '',
          message: ''
        });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Something went wrong. Please try again or email us directly.'
      });
    }
  };

  return (
    <div className='relative h-full w-full bg-[#000000]'>
            <div className="min-h-screen bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] flex items-center justify-center p-4">
        <div className="max-w-2xl w-full m-20 mx-0">
            {/* Header */}
            <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
                Let's Build Together
            </h1>
            <p className="text-slate-300 text-lg">
                Transform your business with cutting-edge IT solutions
            </p>
            </div>

            {/* Form Card */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email Row */}
                <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-200 mb-2">
                    Full Name *
                    </label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="John Smith"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-2">
                    Email Address *
                    </label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="john@company.com"
                    />
                </div>
                </div>

                {/* Company & Phone Row */}
                <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="company" className="block text-sm font-medium text-slate-200 mb-2">
                    Company Name
                    </label>
                    <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Your Company"
                    />
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-200 mb-2">
                    Phone Number
                    </label>
                    <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="+1 (555) 000-0000"
                    />
                </div>
                </div>

                {/* Service Selection */}
                <div>
                <label htmlFor="service" className="block text-sm font-medium text-slate-200 mb-2">
                    Service Interested In *
                </label>
                <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                    <option value="" className="bg-slate-900">Select a service</option>
                    <option value="cloud" className="bg-slate-900">Cloud Solutions</option>
                    <option value="cybersecurity" className="bg-slate-900">Cybersecurity</option>
                    <option value="software" className="bg-slate-900">Software Development</option>
                    <option value="consulting" className="bg-slate-900">IT Consulting</option>
                    <option value="infrastructure" className="bg-slate-900">Infrastructure Management</option>
                    <option value="other" className="bg-slate-900">Other</option>
                </select>
                </div>

                {/* Message */}
                <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-200 mb-2">
                    Project Details *
                </label>
                <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your project requirements..."
                />
                </div>

                {/* Status Messages */}
                {status.type !== 'idle' && (
                <div className={`flex items-center gap-3 p-4 rounded-lg ${
                    status.type === 'success' ? 'bg-green-500/20 border border-green-500/30' :
                    status.type === 'error' ? 'bg-red-500/20 border border-red-500/30' :
                    'bg-blue-500/20 border border-blue-500/30'
                }`}>
                    {status.type === 'success' && <CheckCircle className="w-5 h-5 text-green-400" />}
                    {status.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400" />}
                    {status.type === 'loading' && <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />}
                    <p className={`text-sm ${
                    status.type === 'success' ? 'text-green-200' :
                    status.type === 'error' ? 'text-red-200' :
                    'text-blue-200'
                    }`}>
                    {status.message || 'Sending your message...'}
                    </p>
                </div>
                )}

                {/* Submit Button */}
                <button
                type="submit"
                disabled={status.type === 'loading'}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                {status.type === 'loading' ? (
                    <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                    </>
                ) : (
                    <>
                    <Send className="w-5 h-5" />
                    Send Message
                    </>
                )}
                </button>
            </form>

            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <p className="text-slate-300 text-sm">
                We typically respond within 24 hours. For urgent matters, call us at{' '}
                <span className="text-blue-400 font-medium">+91 9503705181</span>
                </p>
            </div>
            </div>
        </div>
        </div>
    </div>
    
  );
}