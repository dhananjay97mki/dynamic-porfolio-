'use client';

import { useEffect, useState } from 'react';
import { Skill, SkillCategory } from '@/lib/types';
import { fetchPortfolioData, updateSkillsStore } from '@/lib/store';
import { Plus, Trash2, Edit3, Eye, EyeOff, X } from 'lucide-react';

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories: SkillCategory[] = [
    'Programming',
    'AI / Machine Learning',
    'Data Engineering',
    'Web Development',
    'Databases',
    'Tools & Technologies',
  ];

  useEffect(() => {
    async function load() {
      const data = await fetchPortfolioData();
      setSkills(data.skills);
    }
    load();
  }, []);

  const saveSkills = async (updated: Skill[]) => {
    setSkills(updated);
    await updateSkillsStore(updated);
  };

  const handleAddNew = () => {
    setEditingSkill({
      id: 'sk-' + Date.now(),
      name: '',
      category: 'Programming',
      proficiency_percent: 85,
      sort_order: skills.length + 1,
      is_published: true,
    });
    setIsModalOpen(true);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill?.name) return;

    const existingIdx = skills.findIndex((s) => s.id === editingSkill.id);
    let updated: Skill[];

    if (existingIdx >= 0) {
      updated = [...skills];
      updated[existingIdx] = editingSkill as Skill;
    } else {
      updated = [...skills, editingSkill as Skill];
    }

    await saveSkills(updated);
    setIsModalOpen(false);
    setEditingSkill(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this skill?')) return;
    const updated = skills.filter((s) => s.id !== id);
    await saveSkills(updated);
  };

  const togglePublished = async (id: string) => {
    const updated = skills.map((s) =>
      s.id === id ? { ...s, is_published: !s.is_published } : s
    );
    await saveSkills(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Skills & Technologies</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage tech stack items, categories, and proficiency ratings.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                {skill.category}
              </span>
              <h3 className="font-bold text-white text-sm">{skill.name}</h3>
              <p className="text-xs text-slate-400 font-medium">Proficiency: {skill.proficiency_percent}%</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => togglePublished(skill.id)}
                className={`p-2 rounded-lg text-xs font-semibold ${
                  skill.is_published ? 'text-emerald-400' : 'text-amber-400'
                }`}
                title={skill.is_published ? 'Published' : 'Hidden'}
              >
                {skill.is_published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>

              <button
                onClick={() => {
                  setEditingSkill(skill);
                  setIsModalOpen(true);
                }}
                className="p-2 rounded-lg text-slate-300 hover:text-white"
              >
                <Edit3 className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleDelete(skill.id)}
                className="p-2 rounded-lg text-red-400 hover:bg-red-500/20"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && editingSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-lg">
                {editingSkill.id ? 'Edit Skill' : 'New Skill'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Skill Name *</label>
                <input
                  type="text"
                  required
                  value={editingSkill.name || ''}
                  onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Category</label>
                <select
                  value={editingSkill.category || 'Programming'}
                  onChange={(e) =>
                    setEditingSkill({ ...editingSkill, category: e.target.value as SkillCategory })
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
                <div className="flex justify-between items-center text-xs font-bold uppercase text-slate-400 mb-1">
                  <span>Proficiency Percentage</span>
                  <span className="text-blue-400">{editingSkill.proficiency_percent}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={editingSkill.proficiency_percent || 85}
                  onChange={(e) =>
                    setEditingSkill({ ...editingSkill, proficiency_percent: parseInt(e.target.value) })
                  }
                  className="w-full accent-blue-600"
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
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
