'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { isSupabaseConfigured, supabase } from '@/lib/supabase/client';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      if (pathname === '/admin/login') {
        setAuthenticated(true);
        return;
      }

      // Check session
      if (isSupabaseConfigured() && supabase) {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          setAuthenticated(true);
          return;
        }
      }

      // Local storage dev fallback check
      const localAuth = localStorage.getItem('dhananjay_admin_auth');
      if (localAuth === 'true') {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
        router.push('/admin/login');
      }
    };

    checkAuth();
  }, [pathname, router]);

  const handleLogout = async () => {
    if (isSupabaseConfigured() && supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('dhananjay_admin_auth');
    router.push('/admin/login');
  };

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-100">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      <AdminSidebar onLogout={handleLogout} />
      <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-7xl">
        {children}
      </main>
    </div>
  );
}
