'use client';

import { Experience as ExperienceType } from '@/lib/types';
import { Briefcase, GraduationCap, Award, Trophy, Compass, Calendar, MapPin } from 'lucide-react';

export function Experience({ experiences }: { experiences: ExperienceType[] }) {
  const publishedExps = experiences.filter((e) => e.is_published);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Education':
        return GraduationCap;
      case 'Presentation':
        return Trophy;
      case 'Hackathon':
        return Award;
      case 'Work Experience':
        return Briefcase;
      default:
        return Compass;
    }
  };

  return (
    <section id="journey" className="py-16 sm:py-24 border-t border-cream-border/60 dark:border-dark-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Timeline & Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-cream-text dark:text-dark-text tracking-tight">
            My Journey & Experience
          </h2>
          <p className="mt-3 text-sm sm:text-base text-cream-muted dark:text-dark-muted">
            Academic achievements, degree programs, research presentations, and practical developments.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-indigo-600 to-purple-600 -translate-x-1/2 opacity-30" />

          <div className="space-y-12">
            {publishedExps.map((exp, idx) => {
              const Icon = getCategoryIcon(exp.category);
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={exp.id}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Badge Center Pin */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 ring-4 ring-cream-bg dark:ring-dark-bg z-10">
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Content Box */}
                  <div className="ml-12 sm:ml-0 sm:w-1/2 sm:px-8">
                    <div className="glass-card p-6 rounded-3xl border border-cream-border dark:border-dark-border hover:border-blue-500/40 transition-all duration-300">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase">
                          {exp.category}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-cream-muted dark:text-dark-muted font-medium">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>
                            {exp.start_date} - {exp.is_current ? 'Present' : exp.end_date}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-cream-text dark:text-dark-text tracking-tight">
                        {exp.title}
                      </h3>
                      
                      <div className="mt-1 flex items-center gap-2 text-xs font-semibold text-cream-muted dark:text-dark-muted">
                        <span>{exp.organization}</span>
                        {exp.location && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" /> {exp.location}
                            </span>
                          </>
                        )}
                      </div>

                      <p className="mt-3 text-xs sm:text-sm text-cream-muted dark:text-dark-muted leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
