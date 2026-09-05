'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Project } from '@/lib/types';
import { fetchPortfolioData } from '@/lib/store';
import { ArrowLeft, Github, ExternalLink, AlertCircle, CheckCircle2, Sparkles, Layers } from 'lucide-react';
import Link from 'next/link';

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await fetchPortfolioData();
      const found = data.projects.find(
        (p) => p.id === params.id || p.slug === params.id
      );
      if (found) setProject(found);
      setLoading(false);
    }
    load();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-bg dark:bg-dark-bg">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cream-bg dark:bg-dark-bg text-center p-4">
        <h1 className="text-2xl font-bold mb-2">Project Not Found</h1>
        <Link href="/" className="text-blue-600 underline font-medium">
          &larr; Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-bg dark:bg-dark-bg text-cream-text dark:text-dark-text py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cream-card dark:bg-dark-card border border-cream-border dark:border-dark-border text-sm font-semibold hover:border-blue-500/50 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </Link>

        <div className="glass-card rounded-3xl overflow-hidden border border-cream-border dark:border-dark-border shadow-xl">
          <div className="relative h-72 sm:h-96 w-full bg-slate-900">
            <img
              src={project.image_url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800'}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold uppercase tracking-wider">
                {project.category}
              </span>
              <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {project.title}
              </h1>
            </div>
          </div>

          <div className="p-6 sm:p-10 space-y-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
                About the Project
              </h3>
              <p className="text-base text-cream-muted dark:text-dark-muted leading-relaxed">
                {project.detailed_desc}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

            {project.contribution && (
              <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/20">
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-sm mb-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>My Contribution</span>
                </div>
                <p className="text-xs sm:text-sm text-cream-muted dark:text-dark-muted">
                  {project.contribution}
                </p>
              </div>
            )}

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-cream-muted dark:text-dark-muted mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-500" />
                <span>Tech Stack</span>
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

            <div className="pt-6 border-t border-cream-border dark:border-dark-border flex flex-wrap gap-4">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-all shadow-md"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              )}

              {project.live_demo_url && project.live_demo_url !== '#' && (
                <a
                  href={project.live_demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-all shadow-md"
                >
                  <span>Live Application</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
