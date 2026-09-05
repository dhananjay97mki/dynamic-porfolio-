'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />;
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="p-2 rounded-full border border-cream-border dark:border-dark-border bg-cream-card dark:bg-dark-card text-cream-text dark:text-dark-text hover:bg-slate-200 dark:hover:bg-slate-800 transition-all duration-200 flex items-center justify-center shadow-sm"
      aria-label="Toggle Theme"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform duration-300" />
      ) : (
        <Moon className="w-4 h-4 text-indigo-600 hover:-rotate-12 transition-transform duration-300" />
      )}
    </button>
  );
}
