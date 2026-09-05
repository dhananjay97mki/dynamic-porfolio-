'use client';

import { Lock, Heart } from 'lucide-react';

export function Footer({ name }: { name: string }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-cream-border dark:border-dark-border bg-cream-card/50 dark:bg-dark-card/50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <p className="text-sm font-bold text-cream-text dark:text-dark-text">
              © {currentYear} {name || 'Dhananjay C. Moundekar'}. All rights reserved.
            </p>
            <p className="mt-1 text-xs text-cream-muted dark:text-dark-muted flex items-center justify-center md:justify-start gap-1">
              <span>Built with React, Next.js & Tailwind CSS</span>
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs text-cream-muted dark:text-dark-muted font-medium">
            <a href="#hero" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Back to Top
            </a>
            <a href="#projects" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Projects
            </a>
            <a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Contact
            </a>
            <a
              href="/admin"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-200/60 dark:bg-slate-800/60 text-cream-text dark:text-dark-text hover:bg-blue-600 hover:text-white transition-all"
              title="Admin Portal"
            >
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
