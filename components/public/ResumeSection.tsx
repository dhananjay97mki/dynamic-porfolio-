'use client';

import { Resume } from '@/lib/types';
import { FileText, Download, Eye, CheckCircle, ShieldCheck } from 'lucide-react';

export function ResumeSection({ resumes }: { resumes: Resume[] }) {
  const publishedResumes = resumes.filter((r) => r.is_published);

  return (
    <section id="resume" className="py-16 sm:py-24 border-t border-cream-border/60 dark:border-dark-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-cream-border dark:border-dark-border relative overflow-hidden">
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Text & Header (Col 1-7) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Curriculum Vitae</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-cream-text dark:text-dark-text tracking-tight">
                Resume & Academic CV
              </h2>
              <p className="text-base text-cream-muted dark:text-dark-muted leading-relaxed">
                Download my latest formatted software engineering resume or academic curriculum vitae detailing AI coursework, research papers, and technical projects.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs sm:text-sm text-cream-muted dark:text-dark-muted">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  <span>AI & Full Stack Focus</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  <span>PDF Format</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  <span>Updated 2025</span>
                </div>
              </div>
            </div>

            {/* Document Action Cards (Col 8-12) */}
            <div className="lg:col-span-5 space-y-4">
              {publishedResumes.map((doc) => (
                <div
                  key={doc.id}
                  className="p-5 rounded-2xl bg-cream-bg/80 dark:bg-dark-bg/80 border border-cream-border dark:border-dark-border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-blue-600 text-white shrink-0 shadow-md">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-cream-text dark:text-dark-text">
                        {doc.title}
                      </h4>
                      <p className="text-xs text-cream-muted dark:text-dark-muted">
                        {doc.description || `${doc.type.toUpperCase()} File`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={doc.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl border border-cream-border dark:border-dark-border hover:bg-slate-200 dark:hover:bg-slate-800 text-cream-text dark:text-dark-text transition-colors"
                      title="View PDF"
                    >
                      <Eye className="w-4 h-4" />
                    </a>

                    <a
                      href={doc.file_url}
                      download
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
