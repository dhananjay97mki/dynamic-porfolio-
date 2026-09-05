'use client';

import { useEffect, useState } from 'react';
import { PortfolioData, ContactMessage } from '@/lib/types';
import { fetchPortfolioData, getContactMessages } from '@/lib/store';
import { Briefcase, Code, Award, Compass, Mail, FileText, ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminOverviewPage() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const portData = await fetchPortfolioData();
      const msgs = await getContactMessages();
      setData(portData);
      setMessages(msgs);
      setLoading(false);
    }
    load();
  }, []);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const totalProjects = data.projects.length;
  const publishedProjects = data.projects.filter((p) => p.is_published).length;
  const totalSkills = data.skills.length;
  const totalCerts = data.certificates.length;
  const totalExperiences = data.experiences.length;
  const unreadMessages = messages.filter((m) => !m.is_read).length;

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>Welcome, Dhananjay</span>
            <Sparkles className="w-5 h-5 text-amber-400" />
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your personal portfolio content, projects, skills, certificates, and incoming messages.
          </p>
        </div>

        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shrink-0"
        >
          <span>View Public Site</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Overview Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Projects</p>
            <h3 className="text-2xl font-black text-white mt-1">{totalProjects}</h3>
            <p className="text-[11px] text-blue-400 mt-0.5">{publishedProjects} published</p>
          </div>
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Skills & Tech</p>
            <h3 className="text-2xl font-black text-white mt-1">{totalSkills}</h3>
            <p className="text-[11px] text-purple-400 mt-0.5">Across 6 categories</p>
          </div>
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
            <Code className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Certificates</p>
            <h3 className="text-2xl font-black text-white mt-1">{totalCerts}</h3>
            <p className="text-[11px] text-emerald-400 mt-0.5">Verified achievements</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Messages</p>
            <h3 className="text-2xl font-black text-white mt-1">{messages.length}</h3>
            <p className="text-[11px] text-amber-400 mt-0.5">{unreadMessages} unread</p>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
            <Mail className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
          Quick Management Sections
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/admin/profile"
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all group"
          >
            <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors flex items-center justify-between">
              <span>Hero & Profile</span>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400" />
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Edit headline, greeting, introduction, photo, and CTA buttons.
            </p>
          </Link>

          <Link
            href="/admin/projects"
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all group"
          >
            <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors flex items-center justify-between">
              <span>Projects Manager</span>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400" />
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Add, edit, delete, reorder, or feature showcase projects.
            </p>
          </Link>

          <Link
            href="/admin/certificates"
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all group"
          >
            <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors flex items-center justify-between">
              <span>Certificates Manager</span>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400" />
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Upload certificate photos, specify issuers, dates, and links.
            </p>
          </Link>

          <Link
            href="/admin/skills"
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all group"
          >
            <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors flex items-center justify-between">
              <span>Skills Manager</span>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400" />
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Manage programming languages, frameworks, DBs, and tools.
            </p>
          </Link>

          <Link
            href="/admin/experience"
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all group"
          >
            <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors flex items-center justify-between">
              <span>Journey & Experience</span>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400" />
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Manage education, symposiums, hackathons, and milestones.
            </p>
          </Link>

          <Link
            href="/admin/resume"
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all group"
          >
            <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors flex items-center justify-between">
              <span>Resume & CV Files</span>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400" />
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Upload & replace downloadable PDF resume and academic CV.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
