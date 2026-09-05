'use client';

import { useState } from 'react';
import { Project, ProjectCategory } from '@/lib/types';
import { ProjectModal } from './ProjectModal';
import { Github, ExternalLink, ArrowUpRight, Sparkles, FolderCode } from 'lucide-react';

export function Projects({ projects }: { projects: Project[] }) {
  const publishedProjects = projects.filter((p) => p.is_published);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<string>('All');

  const categories: ProjectCategory[] = ['AI & ML', 'Full Stack', 'Data Science', 'Mobile & Realtime'];

  const filteredProjects =
    activeTab === 'All'
      ? publishedProjects
      : publishedProjects.filter((p) => p.category === activeTab);

  return (
    <section id="projects" className="py-16 sm:py-24 border-t border-cream-border/60 dark:border-dark-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-3">
            <FolderCode className="w-3.5 h-3.5" />
            <span>Featured Portfolio Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-cream-text dark:text-dark-text tracking-tight">
            Projects Showcase
          </h2>
          <p className="mt-3 text-sm sm:text-base text-cream-muted dark:text-dark-muted">
            Explore intelligent AI applications, scalable full-stack web platforms, and data analytics tools.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveTab('All')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'All'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-cream-card dark:bg-dark-card border border-cream-border dark:border-dark-border text-cream-muted dark:text-dark-muted hover:text-cream-text dark:hover:text-dark-text'
            }`}
          >
            All Projects ({publishedProjects.length})
          </button>
          {categories.map((cat) => {
            const count = publishedProjects.filter((p) => p.category === cat).length;
            if (count === 0) return null;
            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-cream-card dark:bg-dark-card border border-cream-border dark:border-dark-border text-cream-muted dark:text-dark-muted hover:text-cream-text dark:hover:text-dark-text'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="glass-card rounded-3xl overflow-hidden border border-cream-border dark:border-dark-border group flex flex-col justify-between hover:border-blue-500/50 hover:-translate-y-1.5 transition-all duration-300 shadow-md"
            >
              <div>
                {/* Project Image Container */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
                  <img
                    src={project.image_url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800'}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {project.featured && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                      <Sparkles className="w-3 h-3" /> Featured
                    </span>
                  )}

                  <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-medium">
                    {project.category}
                  </span>
                </div>

                {/* Content Details */}
                <div className="p-6">
                  <h3
                    onClick={() => setSelectedProject(project)}
                    className="text-xl font-bold text-cream-text dark:text-dark-text tracking-tight hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors"
                  >
                    {project.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-cream-muted dark:text-dark-muted line-clamp-3 leading-relaxed">
                    {project.short_desc}
                  </p>

                  {/* Tech Stack Badges */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tech_stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-lg bg-slate-200/60 dark:bg-slate-800/60 text-[11px] font-semibold text-cream-muted dark:text-dark-muted"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech_stack.length > 4 && (
                      <span className="px-2 py-0.5 rounded-lg bg-blue-500/10 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                        +{project.tech_stack.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 pb-6 pt-2 border-t border-cream-border/50 dark:border-dark-border/50 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <span>Details</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl text-cream-muted dark:text-dark-muted hover:text-cream-text dark:hover:text-dark-text hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors"
                      title="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}

                  {project.live_demo_url && project.live_demo_url !== '#' && (
                    <a
                      href={project.live_demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
