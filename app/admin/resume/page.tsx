'use client';

import { useEffect, useState } from 'react';
import { Resume } from '@/lib/types';
import { fetchPortfolioData, updateResumesStore } from '@/lib/store';
import { FileUploader } from '@/components/admin/FileUploader';
import { FileText, Save, CheckCircle2, Eye } from 'lucide-react';

export default function AdminResumePage() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await fetchPortfolioData();
      setResumes(data.resumes);
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    await updateResumesStore(resumes);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateDoc = (id: string, field: keyof Resume, val: any) => {
    setResumes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: val } : r))
    );
  };

  if (resumes.length === 0) return <div className="py-20 text-center">Loading Resume Manager...</div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Resume & CV Documents</h1>
        <p className="text-xs text-slate-400 mt-1">
          Upload and replace downloadable PDF resume files for recruiters and employers.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Resume files updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {resumes.map((doc) => (
          <div
            key={doc.id}
            className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-600/20 text-blue-400">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">{doc.title}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Type: {doc.type.toUpperCase()}
                  </span>
                </div>
              </div>

              {doc.file_url && (
                <a
                  href={doc.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview File</span>
                </a>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Document Title</label>
              <input
                type="text"
                value={doc.title}
                onChange={(e) => updateDoc(doc.id, 'title', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Description</label>
              <input
                type="text"
                value={doc.description}
                onChange={(e) => updateDoc(doc.id, 'description', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <FileUploader
              label={`Upload New ${doc.type.toUpperCase()} File (PDF)`}
              accept=".pdf,application/pdf"
              currentUrl={doc.file_url}
              folder="resumes"
              onUploadComplete={(url) => updateDoc(doc.id, 'file_url', url)}
            />
          </div>
        ))}

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Resume Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
