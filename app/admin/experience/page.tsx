'use client';

import { useEffect, useState } from 'react';
import { Experience, ExperienceCategory } from '@/lib/types';
import { fetchPortfolioData, updateExperiencesStore } from '@/lib/store';
import { Plus, Trash2, Edit3, Eye, EyeOff, X, Compass } from 'lucide-react';

export default function AdminExperiencePage() {
  const [exps, setExps] = useState<Experience[]>([]);
  const [editingExp, setEditingExp] = useState<Partial<Experience> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories: ExperienceCategory[] = ['Education', 'Presentation', 'Hackathon', 'Work Experience', 'Achievement'];

  useEffect(() => {
    async function load() {
      const data = await fetchPortfolioData();
      setExps(data.experiences);
    }
    load();
  }, []);

  const saveExps = async (updated: Experience[]) => {
    setExps(updated);
    await updateExperiencesStore(updated);
  };

  const handleAddNew = () => {
    setEditingExp({
      id: 'exp-' + Date.now(),
      title: '',
      organization: '',
      location: '',
      start_date: new Date().getFullYear().toString(),
      end_date: 'Present',
      is_current: true,
      description: '',
      category: 'Education',
      sort_order: exps.length + 1,
      is_published: true,
    });
    setIsModalOpen(true);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp?.title || !editingExp?.organization) return;

    const existingIdx = exps.findIndex((e) => e.id === editingExp.id);
    let updated: Experience[];

    if (existingIdx >= 0) {
      updated = [...exps];
      updated[existingIdx] = editingExp as Experience;
    } else {
      updated = [...exps, editingExp as Experience];
    }

    await saveExps(updated);
    setIsModalOpen(false);
    setEditingExp(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this timeline entry?')) return;
    const updated = exps.filter((e) => e.id !== id);
    await saveExps(updated);
  };

  const togglePublished = async (id: string) => {
    const updated = exps.map((e) =>
      e.id === id ? { ...e, is_published: !e.is_published } : e
    );
    await saveExps(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Journey & Experience Manager</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your academic programs, symposium presentations, hackathons, and work milestones.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Timeline Entry</span>
        </button>
      </div>

      <div className="space-y-4">
        {exps.map((exp) => (
          <div
            key={exp.id}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400">
                  {exp.category}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  {exp.start_date} - {exp.is_current ? 'Present' : exp.end_date}
                </span>
              </div>
              <h3 className="font-bold text-white text-base">{exp.title}</h3>
              <p className="text-xs font-semibold text-slate-400">{exp.organization} • {exp.location}</p>
              <p className="text-xs text-slate-500 mt-1">{exp.description}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => togglePublished(exp.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                  exp.is_published ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                }`}
              >
                {exp.is_published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{exp.is_published ? 'Published' : 'Hidden'}</span>
              </button>

              <button
                onClick={() => {
                  setEditingExp(exp);
                  setIsModalOpen(true);
                }}
                className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(exp.id)}
                className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && editingExp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-lg">
                {editingExp.id ? 'Edit Entry' : 'New Entry'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={editingExp.title || ''}
                  onChange={(e) => setEditingExp({ ...editingExp, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Organization / University *</label>
                <input
                  type="text"
                  required
                  value={editingExp.organization || ''}
                  onChange={(e) => setEditingExp({ ...editingExp, organization: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Category</label>
                  <select
                    value={editingExp.category || 'Education'}
                    onChange={(e) =>
                      setEditingExp({ ...editingExp, category: e.target.value as ExperienceCategory })
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

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Location</label>
                  <input
                    type="text"
                    value={editingExp.location || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, location: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Start Date</label>
                  <input
                    type="text"
                    value={editingExp.start_date || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, start_date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">End Date</label>
                  <input
                    type="text"
                    value={editingExp.end_date || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, end_date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingExp.description || ''}
                  onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

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
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
