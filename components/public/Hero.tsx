'use client';

import { Profile, SocialLink } from '@/lib/types';
import { ArrowRight, Download, Mail, Github, Linkedin, MessageSquare, MapPin, GraduationCap, Code2 } from 'lucide-react';

interface HeroProps {
  profile: Profile;
  socialLinks: SocialLink[];
  resumeUrl?: string;
}

export function Hero({ profile, socialLinks, resumeUrl }: HeroProps) {
  const getSocialIcon = (platform: string) => {
    const lower = platform.toLowerCase();
    if (lower.includes('github')) return Github;
    if (lower.includes('linkedin')) return Linkedin;
    if (lower.includes('whatsapp')) return MessageSquare;
    return Mail;
  };

  return (
    <section id="hero" className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden z-10">
      {/* Subtle background ambient gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Text Content (Col 1-7) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-400 text-xs sm:text-sm font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-ping" />
              <span>{profile.greeting || "Hi, I'm Dhananjay 👋"}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-cream-text dark:text-dark-text leading-[1.15]">
              {profile.name}
              <span className="block mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text">
                {profile.headline}
              </span>
            </h1>

            <p className="max-w-2xl mx-auto lg:mx-0 text-base sm:text-lg text-cream-muted dark:text-dark-muted leading-relaxed font-normal">
              {profile.short_intro}
            </p>

            {/* CTAs & Resume Button */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href={profile.primary_cta_link || '#projects'}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 active:scale-95 text-sm sm:text-base"
              >
                <span>{profile.primary_cta_text || 'View Projects'}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={profile.secondary_cta_link || '#contact'}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-cream-border dark:border-dark-border bg-cream-card dark:bg-dark-card hover:bg-stone-200/60 dark:hover:bg-slate-800/60 text-cream-text dark:text-dark-text font-semibold shadow-sm transition-all hover:-translate-y-0.5 text-sm sm:text-base"
              >
                <span>{profile.secondary_cta_text || 'Contact Me'}</span>
              </a>

              <a
                href={resumeUrl || '/resume.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10 text-blue-700 dark:text-blue-400 font-semibold transition-all hover:-translate-y-0.5 text-sm sm:text-base"
              >
                <Download className="w-4 h-4" />
                <span>Resume</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-cream-muted dark:text-dark-muted mr-2">
                Connect:
              </span>
              {socialLinks
                .filter((link) => link.is_published)
                .map((link) => {
                  const Icon = getSocialIcon(link.platform);
                  return (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl border border-cream-border dark:border-dark-border bg-cream-card dark:bg-dark-card text-cream-muted dark:text-dark-muted hover:text-blue-700 dark:hover:text-blue-400 hover:border-blue-500/50 hover:scale-105 transition-all shadow-sm"
                      title={link.platform}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
            </div>
          </div>

          {/* Quick Info & Profile Floating Card (Col 8-12) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-sm rounded-3xl glass-card p-6 sm:p-8 relative group border border-cream-border dark:border-dark-border animate-float">
              {/* Profile Image Preview */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto mb-6 rounded-2xl overflow-hidden shadow-xl ring-4 ring-blue-600/30">
                <img
                  src={profile.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600'}
                  alt={profile.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <h3 className="text-xl font-bold text-center text-cream-text dark:text-dark-text">
                Quick Overview
              </h3>
              <div className="mt-4 space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-3 text-cream-muted dark:text-dark-muted">
                  <GraduationCap className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-cream-text dark:text-dark-text">Education:</strong> PJLCE (AI) & IIT Madras (Data Science)
                  </span>
                </div>
                <div className="flex items-start gap-3 text-cream-muted dark:text-dark-muted">
                  <Code2 className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-cream-text dark:text-dark-text">Top Skills:</strong> Python, React, ML, NLP, Node.js, SQL
                  </span>
                </div>
                <div className="flex items-start gap-3 text-cream-muted dark:text-dark-muted">
                  <MapPin className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-cream-text dark:text-dark-text">Location:</strong> {profile.location || 'Nagpur, MH, India'}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-cream-border dark:border-dark-border flex items-center justify-between text-xs font-medium text-cream-muted dark:text-dark-muted">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Available for Hire
                </span>
                <a href="#contact" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Let&apos;s talk &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
