'use client';

import { Certificate } from '@/lib/types';
import { Award, ExternalLink, Calendar, Building2 } from 'lucide-react';

export function Certificates({ certificates }: { certificates: Certificate[] }) {
  const publishedCerts = certificates.filter((c) => c.is_published);

  if (publishedCerts.length === 0) return null;

  return (
    <section id="certificates" className="py-16 sm:py-24 border-t border-cream-border/60 dark:border-dark-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-semibold mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Honors & Recognitions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-cream-text dark:text-dark-text tracking-tight">
            Certificates & Achievements
          </h2>
          <p className="mt-3 text-sm sm:text-base text-cream-muted dark:text-dark-muted">
            Recognitions and certifications from academic competitions and institutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {publishedCerts.map((cert) => (
            <div
              key={cert.id}
              className="glass-card rounded-3xl overflow-hidden border border-cream-border dark:border-dark-border group flex flex-col justify-between hover:border-blue-500/50 transition-all duration-300"
            >
              <div>
                {/* Certificate Image Preview */}
                {cert.image_url && (
                  <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={cert.image_url}
                      alt={cert.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                    <span className="absolute bottom-3 left-4 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-medium flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      {cert.issue_date}
                    </span>
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{cert.issuer}</span>
                  </div>
                  <h3 className="text-xl font-bold text-cream-text dark:text-dark-text tracking-tight">
                    {cert.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-cream-muted dark:text-dark-muted leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              </div>

              {cert.certificate_url && cert.certificate_url !== '#' && (
                <div className="px-6 pb-6 pt-2">
                  <a
                    href={cert.certificate_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-semibold transition-all"
                  >
                    <span>View Certificate</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
