'use client';

import { useEffect, useState } from 'react';
import { SocialLink } from '@/lib/types';
import { fetchPortfolioData, updateSocialLinksStore } from '@/lib/store';
import { Plus, Trash2, Edit3, Eye, EyeOff, Save, CheckCircle2 } from 'lucide-react';

export default function AdminSocialPage() {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await fetchPortfolioData();
      setLinks(data.socialLinks);
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    await updateSocialLinksStore(links);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateLink = (id: string, field: keyof SocialLink, val: any) => {
    setLinks((prev) =>
      prev.map((l) => (l.id === id ? { ...l, [field]: val } : l))
    );
  };

  const handleAddNew = () => {
    setLinks((prev) => [
      ...prev,
      {
        id: 'soc-' + Date.now(),
        platform: 'New Platform',
        url: 'https://',
        icon: 'link',
        sort_order: prev.length + 1,
        is_published: true,
      },
    ]);
  };

  const handleDelete = (id: string) => {
    setLinks((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Social Media Links</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your LinkedIn, GitHub, WhatsApp, Email, and social URLs.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs uppercase tracking-wider hover:bg-slate-700 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Social Link</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Social links saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-4">
        {links.map((link) => (
          <div
            key={link.id}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="w-full sm:w-1/3">
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Platform</label>
              <input
                type="text"
                value={link.platform}
                onChange={(e) => updateLink(link.id, 'platform', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="w-full sm:w-1/2">
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">URL Target</label>
              <input
                type="text"
                value={link.url}
                onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-2 pt-4 sm:pt-0 shrink-0">
              <button
                type="button"
                onClick={() => updateLink(link.id, 'is_published', !link.is_published)}
                className={`p-2 rounded-lg text-xs font-semibold ${
                  link.is_published ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                {link.is_published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => handleDelete(link.id)}
                className="p-2 rounded-lg text-red-400 hover:bg-red-500/20"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Social Links'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
