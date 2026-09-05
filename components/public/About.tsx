'use client';

import { About as AboutType } from '@/lib/types';
import { UserCheck, BookOpen, Compass, Target, MapPin } from 'lucide-react';

export function About({ about }: { about: AboutType }) {
  return (
    <section id="about" className="py-16 sm:py-24 border-t border-cream-border/60 dark:border-dark-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            About Me
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-cream-text dark:text-dark-text tracking-tight">
            {about.title || 'Driven by AI Innovation & Scalable Architecture'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Story (Col 1-7) */}
          <div className="lg:col-span-7 space-y-6 glass-card p-6 sm:p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-cream-text dark:text-dark-text flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Professional Story</span>
            </h3>
            <p className="text-base text-cream-muted dark:text-dark-muted leading-relaxed whitespace-pre-line font-normal">
              {about.story}
            </p>
          </div>

          {/* Key Quick Cards (Col 8-12) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-card p-6 rounded-2xl border border-cream-border dark:border-dark-border">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-cream-text dark:text-dark-text">Education</h4>
                  <p className="mt-1 text-xs sm:text-sm text-cream-muted dark:text-dark-muted">
                    {about.education_summary}
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-cream-border dark:border-dark-border">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-cream-text dark:text-dark-text">Current Status</h4>
                  <p className="mt-1 text-xs sm:text-sm text-cream-muted dark:text-dark-muted">
                    {about.current_status}
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-cream-border dark:border-dark-border">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-cream-text dark:text-dark-text">Career Focus</h4>
                  <p className="mt-1 text-xs sm:text-sm text-cream-muted dark:text-dark-muted">
                    {about.career_interests}
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-cream-border dark:border-dark-border">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-cream-text dark:text-dark-text">Location</h4>
                  <p className="mt-1 text-xs sm:text-sm text-cream-muted dark:text-dark-muted">
                    {about.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
