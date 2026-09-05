'use client';

import { useState } from 'react';
import { Skill, SkillCategory } from '@/lib/types';
import { Code, Terminal, Cpu, Database, Wrench, Layers } from 'lucide-react';

const categoryIcons: Record<string, any> = {
  Programming: Terminal,
  'AI / Machine Learning': Cpu,
  'Data Engineering': Layers,
  'Web Development': Code,
  Databases: Database,
  'Tools & Technologies': Wrench,
};

export function Skills({ skills }: { skills: Skill[] }) {
  const publishedSkills = skills.filter((s) => s.is_published);
  const categories: SkillCategory[] = [
    'Programming',
    'AI / Machine Learning',
    'Data Engineering',
    'Web Development',
    'Databases',
    'Tools & Technologies',
  ];

  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredSkills =
    activeCategory === 'All'
      ? publishedSkills
      : publishedSkills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-16 sm:py-24 border-t border-cream-border/60 dark:border-dark-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            Technical Stack
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-cream-text dark:text-dark-text tracking-tight">
            Skills & Technologies
          </p>
          <p className="mt-3 text-sm sm:text-base text-cream-muted dark:text-dark-muted">
            Core technical competencies across AI engineering, data science, and modern full-stack development.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeCategory === 'All'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-cream-card dark:bg-dark-card border border-cream-border dark:border-dark-border text-cream-muted dark:text-dark-muted hover:text-cream-text dark:hover:text-dark-text'
            }`}
          >
            All Categories ({publishedSkills.length})
          </button>
          {categories.map((cat) => {
            const count = publishedSkills.filter((s) => s.category === cat).length;
            if (count === 0) return null;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-cream-card dark:bg-dark-card border border-cream-border dark:border-dark-border text-cream-muted dark:text-dark-muted hover:text-cream-text dark:hover:text-dark-text'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredSkills.map((skill) => {
            const Icon = categoryIcons[skill.category] || Code;
            return (
              <div
                key={skill.id}
                className="glass-card p-4 sm:p-5 rounded-2xl border border-cream-border dark:border-dark-border flex flex-col justify-between hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-200/60 dark:bg-slate-800/60 text-cream-muted dark:text-dark-muted">
                      {skill.category.split(' ')[0]}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-cream-text dark:text-dark-text">
                    {skill.name}
                  </h3>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between items-center text-xs font-semibold text-cream-muted dark:text-dark-muted mb-1.5">
                    <span>Proficiency</span>
                    <span className="text-blue-600 dark:text-blue-400">{skill.proficiency_percent}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${skill.proficiency_percent}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
