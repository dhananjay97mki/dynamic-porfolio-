'use client';

import { useState } from 'react';
import { Profile, SocialLink } from '@/lib/types';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { saveContactMessage } from '@/lib/store';

export function ContactSection({ profile, socialLinks }: { profile: Profile; socialLinks: SocialLink[] }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields (Name, Email, Message).');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      // Send to store / API
      await saveContactMessage(formData);
      
      // Send to server API endpoint as well
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again or email directly.');
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 border-t border-cream-border/60 dark:border-dark-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            Get In Touch
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-cream-text dark:text-dark-text tracking-tight">
            Contact Me
          </p>
          <p className="mt-3 text-sm sm:text-base text-cream-muted dark:text-dark-muted">
            Have a project in mind, an opportunity, or a research collaboration? Feel free to reach out.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Details & Info Cards (Col 1-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6 border border-cream-border dark:border-dark-border">
              <h3 className="text-xl font-bold text-cream-text dark:text-dark-text">
                Contact Information
              </h3>

              <div className="space-y-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-cream-bg/60 dark:bg-dark-bg/60 border border-cream-border dark:border-dark-border hover:border-blue-500/50 transition-all group"
                >
                  <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-cream-muted dark:text-dark-muted">Direct Email</p>
                    <p className="text-sm font-bold text-cream-text dark:text-dark-text group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {profile.email}
                    </p>
                  </div>
                </a>

                <a
                  href={`tel:${profile.phone}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-cream-bg/60 dark:bg-dark-bg/60 border border-cream-border dark:border-dark-border hover:border-blue-500/50 transition-all group"
                >
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-cream-muted dark:text-dark-muted">Phone / WhatsApp</p>
                    <p className="text-sm font-bold text-cream-text dark:text-dark-text group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {profile.phone}
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-cream-bg/60 dark:bg-dark-bg/60 border border-cream-border dark:border-dark-border">
                  <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-cream-muted dark:text-dark-muted">Location</p>
                    <p className="text-sm font-bold text-cream-text dark:text-dark-text">
                      {profile.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="pt-4 border-t border-cream-border dark:border-dark-border">
                <p className="text-xs font-bold uppercase tracking-wider text-cream-muted dark:text-dark-muted mb-3">
                  Find me on social media
                </p>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((s) => (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-xl bg-cream-bg/80 dark:bg-dark-bg/80 border border-cream-border dark:border-dark-border text-xs font-semibold hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/40 transition-all"
                    >
                      {s.platform}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Form (Col 6-12) */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="glass-card p-6 sm:p-8 rounded-3xl border border-cream-border dark:border-dark-border space-y-5"
            >
              <h3 className="text-xl font-bold text-cream-text dark:text-dark-text">
                Send a Direct Message
              </h3>

              {status === 'success' && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-start gap-3 text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Message Delivered!</p>
                    <p className="text-xs opacity-90">Thank you for reaching out. Dhananjay will get back to you shortly.</p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 flex items-start gap-3 text-sm font-medium">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cream-muted dark:text-dark-muted mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Johnson"
                    className="w-full px-4 py-3 rounded-xl bg-cream-bg/80 dark:bg-dark-bg/80 border border-cream-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cream-muted dark:text-dark-muted mb-1.5">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-cream-bg/80 dark:bg-dark-bg/80 border border-cream-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-cream-muted dark:text-dark-muted mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Project Inquiry / Job Opportunity"
                  className="w-full px-4 py-3 rounded-xl bg-cream-bg/80 dark:bg-dark-bg/80 border border-cream-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-cream-muted dark:text-dark-muted mb-1.5">
                  Message *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 rounded-xl bg-cream-bg/80 dark:bg-dark-bg/80 border border-cream-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
