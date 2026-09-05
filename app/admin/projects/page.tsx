'use client';

import { useEffect, useState } from 'react';
import { Project, ProjectCategory } from '@/lib/types';
import { fetchPortfolioData, updateProjectsStore } from '@/lib/store';
import { FileUploader } from '@/components/admin/FileUploader';
import { Plus, Trash2, Edit3, Eye, EyeOff, Sparkles, X, Layers } from 'lucide-react';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [techInput, setTechInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories: ProjectCategory[] = ['AI & ML', 'Full Stack', 'Data Science', 'Mobile & Realtime'];

  useEffect(() => {
    async function load() {
      const data = await fetchPortfolioData();
      setProjects(data.projects);
    }
    load();
  }, []);

  const saveProjects = async (updated: Project[]) => {
    setProjects(updated);
    await updateProjectsStore(updated);
  };

  const handleAddNew = () => {
    setEditingProject({
      id: 'proj-' + Date.now(),
      title: '',
      slug: 'project-' + Date.now(),
      short_desc: '',
      detailed_desc: '',
      problem_statement: '',
      solution_statement: '',
      contribution: '',
      image_url: '',
      github_url: 'https://github.com/dhananjay97mki',
      live_demo_url: '#',
      tech_stack: ['React', 'Python'],
      category: 'AI & ML',
      featured: false,
      sort_order: projects.length + 1,
      is_published: true,
      date: new Date().getFullYear().toString(),
    });
    setTechInput('React, Python');
    setIsModalOpen(true);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title) return;

    const stackArray = techInput
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const projectToSave = {
      ...editingProject,
      tech_stack: stackArray.length > 0 ? stackArray : editingProject.tech_stack || [],
      slug: editingProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    } as Project;

    const existingIdx = projects.findIndex((p) => p.id === projectToSave.id);
    let updated: Project[];

    if (existingIdx >= 0) {
      updated = [...projects];
      updated[existingIdx] = projectToSave;
    } else {
      updated = [...projects, projectToSave];
    }

    await saveProjects(updated);
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project showcase?')) return;
    const updated = projects.filter((p) => p.id !== id);
    await saveProjects(updated);
  };

  const togglePublished = async (id: string) => {
    const updated = projects.map((p) =>
      p.id === id ? { ...p, is_published: !p.is_published } : p
    );
    await saveProjects(updated);
  };

  const toggleFeatured = async (id: string) => {
    const updated = projects.map((p) =>
      p.id === id ? { ...p, featured: !p.featured } : p
    );
    await saveProjects(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Projects Manager</h1>
          <p className="text-xs text-slate-400 mt-1">
            Add, edit, upload photos, feature, reorder, or unpublish portfolio project cards.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4"
          >
            <div className="flex items-start gap-4">
              {proj.image_url ? (
                <img
                  src={proj.image_url}
                  alt={proj.title}
                  className="w-20 h-20 rounded-xl object-cover border border-slate-700 shrink-0"
                />
              ) : (
                <div className="w-20 h-20 rounded-xl bg-slate-800 text-slate-500 flex items-center justify-center shrink-0">
                  <Layers className="w-8 h-8" />
                </div>
              )}

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                    {proj.category}
                  </span>
                  {proj.featured && (
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 text-[10px] font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Featured
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-white text-base">{proj.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">{proj.short_desc}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => togglePublished(proj.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                    proj.is_published ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                  }`}
                >
                  {proj.is_published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{proj.is_published ? 'Published' : 'Hidden'}</span>
                </button>

                <button
                  onClick={() => toggleFeatured(proj.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                    proj.featured ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  Star
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingProject(proj);
                    setTechInput(proj.tech_stack.join(', '));
                    setIsModalOpen(true);
                  }}
                  className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(proj.id)}
                  className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-lg">
                {editingProject.id ? 'Edit Project Details' : 'New Project'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Category</label>
                  <select
                    value={editingProject.category || 'AI & ML'}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, category: e.target.value as ProjectCategory })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Short Card Description *</label>
                <textarea
                  rows={2}
                  required
                  value={editingProject.short_desc || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, short_desc: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Detailed Description</label>
                <textarea
                  rows={4}
                  value={editingProject.detailed_desc || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, detailed_desc: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Problem Statement</label>
                  <textarea
                    rows={2}
                    value={editingProject.problem_statement || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, problem_statement: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Solution Statement</label>
                  <textarea
                    rows={2}
                    value={editingProject.solution_statement || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, solution_statement: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">My Key Contribution</label>
                <input
                  type="text"
                  value={editingProject.contribution || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, contribution: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Tech Stack (Comma-separated)</label>
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="React, Node.js, Python, MongoDB"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">GitHub URL</label>
                  <input
                    type="text"
                    value={editingProject.github_url || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, github_url: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Live Demo URL</label>
                  <input
                    type="text"
                    value={editingProject.live_demo_url || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, live_demo_url: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <FileUploader
                label="Project Banner Image"
                currentUrl={editingProject.image_url}
                onUploadComplete={(url) => setEditingProject({ ...editingProject, image_url: url })}
              />

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-800 text-xs font-bold text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
