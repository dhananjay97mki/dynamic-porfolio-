'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  BookOpen,
  Award,
  Code,
  Briefcase,
  Compass,
  FileText,
  Share2,
  Mail,
  ExternalLink,
  LogOut,
  ShieldAlert,
} from 'lucide-react';

const adminNav = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Hero & Profile', href: '/admin/profile', icon: User },
  { label: 'About Me', href: '/admin/about', icon: BookOpen },
  { label: 'Certificates', href: '/admin/certificates', icon: Award },
  { label: 'Skills & Tech', href: '/admin/skills', icon: Code },
  { label: 'Projects', href: '/admin/projects', icon: Briefcase },
  { label: 'Journey & Exp', href: '/admin/experience', icon: Compass },
  { label: 'Resume & CV', href: '/admin/resume', icon: FileText },
  { label: 'Social Links', href: '/admin/social', icon: Share2 },
  { label: 'Messages Inbox', href: '/admin/messages', icon: Mail },
];

export function AdminSidebar({ onLogout }: { onLogout: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col justify-between p-4 min-h-screen border-r border-slate-800 shrink-0">
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-3 py-4 mb-6 border-b border-slate-800">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg">
            A
          </div>
          <div>
            <h2 className="font-bold text-base tracking-tight text-white">Admin CMS</h2>
            <p className="text-xs text-slate-400">Portfolio Manager</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {adminNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Controls */}
      <div className="pt-4 border-t border-slate-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}
