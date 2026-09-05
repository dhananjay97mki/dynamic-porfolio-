'use client';

import { useEffect, useState } from 'react';
import { About } from '@/lib/types';
import { fetchPortfolioData, updateAboutStore } from '@/lib/store';
import { Save, CheckCircle2 } from 'lucide-react';

export default function AdminAboutPage() {
  const [about, setAbout] = useState<About | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await fetchPortfolioData();
      setAbout(data.about);
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!about) return;
    setSaving(true);
    setSaved(false);
    await updateAboutStore(about);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!about) return <div className="py-20 text-center">Loading About Details...</div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-white">About Me Settings</h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage your background narrative, education summary, career interests, and status.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>About Me details saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Section Title</label>
          <input
            type="text"
            value={about.title}
            onChange={(e) => setAbout({ ...about, title: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Professional Story / Bio</label>
          <textarea
            rows={5}
            value={about.story}
            onChange={(e) => setAbout({ ...about, story: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Education Summary</label>
            <input
              type="text"
              value={about.education_summary}
              onChange={(e) => setAbout({ ...about, education_summary: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Current Status</label>
            <input
              type="text"
              value={about.current_status}
              onChange={(e) => setAbout({ ...about, current_status: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Career Focus & Interests</label>
          <input
            type="text"
            value={about.career_interests}
            onChange={(e) => setAbout({ ...about, career_interests: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save About Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
