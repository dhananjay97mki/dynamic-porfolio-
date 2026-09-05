'use client';

import { Project } from '@/lib/types';
import { X, ExternalLink, Github, CheckCircle2, AlertCircle, Sparkles, Layers } from 'lucide-react';
import { useEffect } from 'react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-cream-card dark:bg-dark-card border border-cream-border dark:border-dark-border shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Hero Banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
          <img
            src={project.image_url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800'}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold uppercase tracking-wider">
              {project.category}
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="mt-1 text-sm text-slate-300 line-clamp-2">
              {project.short_desc}
            </p>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 text-cream-text dark:text-dark-text">
          {/* Detailed Overview */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
              Project Overview
            </h3>
            <p className="text-base text-cream-muted dark:text-dark-muted leading-relaxed">
              {project.detailed_desc}
            </p>
          </div>

          {/* Problem & Solution */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {project.problem_statement && (
              <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm mb-1.5">
                  <AlertCircle className="w-4 h-4" />
                  <span>The Challenge</span>
                </div>
                <p className="text-xs sm:text-sm text-cream-muted dark:text-dark-muted">
                  {project.problem_statement}
                </p>
              </div>
            )}

            {project.solution_statement && (
              <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm mb-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>The Solution</span>
                </div>
                <p className="text-xs sm:text-sm text-cream-muted dark:text-dark-muted">
                  {project.solution_statement}
                </p>
              </div>
            )}
          </div>

          {/* My Contribution */}
          {project.contribution && (
            <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/20">
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-sm mb-1.5">
                <Sparkles className="w-4 h-4" />
                <span>My Key Contribution</span>
              </div>
              <p className="text-xs sm:text-sm text-cream-muted dark:text-dark-muted">
                {project.contribution}
              </p>
            </div>
          )}

          {/* Tech Stack Badges */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-cream-muted dark:text-dark-muted mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-500" />
              <span>Technologies Used</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech_stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-4 border-t border-cream-border dark:border-dark-border flex flex-wrap items-center gap-4">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-all shadow-md"
              >
                <Github className="w-4 h-4" />
                <span>View Source Code</span>
              </a>
            )}

            {project.live_demo_url && project.live_demo_url !== '#' && (
              <a
                href={project.live_demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-all shadow-md"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            <button
              onClick={onClose}
              className="ml-auto px-4 py-2.5 rounded-xl border border-cream-border dark:border-dark-border text-xs sm:text-sm font-semibold hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
