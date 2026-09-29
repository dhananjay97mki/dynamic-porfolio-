'use client';

import { Profile, About, Skill, SocialLink } from '@/lib/types';
import { ArrowRight, Download, Mail, Github, Linkedin, MessageSquare, MapPin, GraduationCap, Code2 } from 'lucide-react';

interface HeroProps {
  profile: Profile;
  about?: About;
  skills?: Skill[];
  socialLinks: SocialLink[];
  resumeUrl?: string;
}

export function Hero({ profile, about, skills, socialLinks, resumeUrl }: HeroProps) {
  const getSocialIcon = (platform: string) => {
    const lower = platform.toLowerCase();
    if (lower.includes('github')) return Github;
    if (lower.includes('linkedin')) return Linkedin;
    if (lower.includes('whatsapp')) return MessageSquare;
    return Mail;
  };

  // Dynamic values derived from profile / about / skills
  const educationText =
    profile.education ||
    about?.education_summary ||
    'PJLCE (AI) & IIT Madras (Data Science)';

  const publishedSkills = skills ? skills.filter((s) => s.is_published) : [];
  const skillsText =
    profile.skills ||
    (publishedSkills.length > 0
      ? publishedSkills.slice(0, 6).map((s) => s.name).join(', ')
      : 'Python, React, ML, NLP, Node.js, SQL');

  const locationText =
    profile.location ||
    about?.location ||
    'Nagpur, Maharashtra, India';

  return (
    <section id="hero" className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden z-10">
      {/* Subtle background ambient gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Hero Text Content (Col 1-6) */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
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

          {/* Upgraded Larger Right Profile Card (Col 7-12) */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-[490px] xl:max-w-[520px] group">
              {/* Modern Blue/Purple Outer Glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-blue-600/40 via-purple-600/30 to-blue-500/40 rounded-[2.5rem] blur-2xl opacity-80 group-hover:opacity-100 transition duration-700 pointer-events-none" />

              {/* Main Dark Glassmorphism Card */}
              <div className="relative w-full rounded-[2.25rem] overflow-hidden border border-white/20 dark:border-slate-700/60 bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-2xl shadow-2xl transition-all duration-500">
                {/* Profile Photo Area - Larger height (520-620px) for natural focus */}
                <div className="relative w-full h-[500px] sm:h-[570px] lg:h-[610px] overflow-hidden bg-slate-950">
                  <img
                    src={
                      profile.profile_image_url ||
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600'
                    }
                    alt={profile.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient overlay at bottom of photo */}
                  <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-slate-950 via-slate-950/65 to-transparent pointer-events-none" />

                  {/* Compact Glassmorphism Information Overlay */}
                  <div className="absolute bottom-14 left-3.5 right-3.5 sm:bottom-15 sm:left-4.5 sm:right-4.5 p-3.5 sm:p-4 rounded-2xl bg-slate-900/85 dark:bg-slate-950/85 backdrop-blur-md border border-white/15 shadow-2xl text-white space-y-2 sm:space-y-2.5">
                    {/* 1. Education */}
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 shrink-0">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-blue-300/80 leading-none mb-0.5">
                          Education
                        </p>
                        <p className="text-xs sm:text-sm font-semibold text-slate-100 truncate leading-snug">
                          {educationText}
                        </p>
                      </div>
                    </div>

                    <div className="h-[1px] bg-white/10 w-full" />

                    {/* 2. Top Skills */}
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400 shrink-0">
                        <Code2 className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-purple-300/80 leading-none mb-0.5">
                          Top Skills
                        </p>
                        <p className="text-xs sm:text-sm font-semibold text-slate-100 truncate leading-snug">
                          {skillsText}
                        </p>
                      </div>
                    </div>

                    <div className="h-[1px] bg-white/10 w-full" />

                    {/* 3. Location */}
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-300/80 leading-none mb-0.5">
                          Location
                        </p>
                        <p className="text-xs sm:text-sm font-semibold text-slate-100 truncate leading-snug">
                          {locationText}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Status Bar */}
                  <div className="absolute inset-x-0 bottom-0 px-5 py-3 bg-slate-950/90 backdrop-blur-md border-t border-white/10 flex items-center justify-between text-xs font-semibold text-slate-300">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-slate-200">Available for Hire</span>
                    </span>
                    <a
                      href="#contact"
                      className="text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors hover:underline"
                    >
                      <span>Let&apos;s talk</span>
                      <span>&rarr;</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
