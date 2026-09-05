'use client';

import { useEffect, useState } from 'react';
import { Certificate } from '@/lib/types';
import { fetchPortfolioData, updateCertificatesStore } from '@/lib/store';
import { FileUploader } from '@/components/admin/FileUploader';
import { Plus, Trash2, Edit3, Eye, EyeOff, Save, X, Award } from 'lucide-react';

export default function AdminCertificatesPage() {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [editingCert, setEditingCert] = useState<Partial<Certificate> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await fetchPortfolioData();
      setCerts(data.certificates);
    }
    load();
  }, []);

  const saveCerts = async (updated: Certificate[]) => {
    setCerts(updated);
    await updateCertificatesStore(updated);
  };

  const handleAddNew = () => {
    setEditingCert({
      id: 'cert-' + Date.now(),
      title: '',
      issuer: '',
      issue_date: new Date().getFullYear().toString(),
      description: '',
      image_url: '',
      certificate_url: '',
      sort_order: certs.length + 1,
      is_published: true,
    });
    setIsModalOpen(true);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert?.title || !editingCert?.issuer) return;

    const existingIdx = certs.findIndex((c) => c.id === editingCert.id);
    let updated: Certificate[];

    if (existingIdx >= 0) {
      updated = [...certs];
      updated[existingIdx] = editingCert as Certificate;
    } else {
      updated = [...certs, editingCert as Certificate];
    }

    await saveCerts(updated);
    setIsModalOpen(false);
    setEditingCert(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this certificate?')) return;
    const updated = certs.filter((c) => c.id !== id);
    await saveCerts(updated);
  };

  const togglePublished = async (id: string) => {
    const updated = certs.map((c) =>
      c.id === id ? { ...c, is_published: !c.is_published } : c
    );
    await saveCerts(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Certificates & Achievements</h1>
          <p className="text-xs text-slate-400 mt-1">
            Add, edit, upload images, reorder, or unpublish certificate cards.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Certificate</span>
        </button>
      </div>

      {/* Certificates List Table / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certs.map((cert) => (
          <div
            key={cert.id}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                {cert.image_url ? (
                  <img
                    src={cert.image_url}
                    alt={cert.title}
                    className="w-14 h-14 rounded-xl object-cover border border-slate-700"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
                    <Award className="w-6 h-6" />
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-white text-base">{cert.title}</h3>
                  <p className="text-xs font-medium text-slate-400">{cert.issuer} • {cert.issue_date}</p>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{cert.description}</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => togglePublished(cert.id)}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                  cert.is_published
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : 'bg-amber-500/10 text-amber-400'
                }`}
              >
                {cert.is_published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{cert.is_published ? 'Published' : 'Hidden'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingCert(cert);
                    setIsModalOpen(true);
                  }}
                  className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                  title="Edit Certificate"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(cert.id)}
                  className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20"
                  title="Delete Certificate"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit/Add Modal */}
      {isModalOpen && editingCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-lg">
                {editingCert.id ? 'Edit Certificate' : 'New Certificate'}
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
                  value={editingCert.title || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Issuing Organization *</label>
                <input
                  type="text"
                  required
                  value={editingCert.issuer || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Issue Date</label>
                  <input
                    type="text"
                    value={editingCert.issue_date || ''}
                    onChange={(e) => setEditingCert({ ...editingCert, issue_date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Certificate URL</label>
                  <input
                    type="text"
                    value={editingCert.certificate_url || ''}
                    onChange={(e) => setEditingCert({ ...editingCert, certificate_url: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingCert.description || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <FileUploader
                label="Certificate Image"
                currentUrl={editingCert.image_url}
                onUploadComplete={(url) => setEditingCert({ ...editingCert, image_url: url })}
              />

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-800 text-xs font-bold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase"
                >
                  Save Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
