'use client';

import { useState, useEffect } from 'react';
import { Menu, X, FileText, Sparkles, User, Award, Code, Briefcase, Compass, Mail } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';

const navItems = [
  { label: 'Home', href: '#hero', icon: Sparkles },
  { label: 'About', href: '#about', icon: User },
  { label: 'Certificates', href: '#certificates', icon: Award },
  { label: 'Skills', href: '#skills', icon: Code },
  { label: 'Projects', href: '#projects', icon: Briefcase },
  { label: 'Journey', href: '#journey', icon: Compass },
  { label: 'Contact', href: '#contact', icon: Mail },
];

export function Navbar({ resumeUrl }: { resumeUrl?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream-bg/95 dark:bg-dark-bg/90 backdrop-blur-md shadow-sm border-b border-cream-border dark:border-dark-border py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="#hero"
            className="flex items-center gap-2 font-bold text-lg sm:text-xl tracking-tight text-cream-text dark:text-dark-text hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-md">
              D
            </div>
            <span>Dhananjay Portfolio</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-3 py-1.5 text-sm font-semibold rounded-lg text-cream-text/90 dark:text-dark-text/80 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-stone-300/40 dark:hover:bg-slate-800/50 transition-all"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA + Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <a
              href={resumeUrl || '/resume.pdf'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium shadow-sm transition-all hover:shadow-blue-500/25 active:scale-95"
            >
              <FileText className="w-4 h-4" />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-cream-text dark:text-dark-text hover:bg-stone-300/50 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="md:hidden mt-3 pt-3 pb-4 border-t border-cream-border dark:border-dark-border bg-cream-card dark:bg-dark-card rounded-2xl p-4 shadow-xl space-y-2 animate-in fade-in slide-in-from-top-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-base font-semibold text-cream-text dark:text-dark-text hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span>{item.label}</span>
                </a>
              );
            })}
            <div className="pt-2 border-t border-cream-border dark:border-dark-border">
              <a
                href={resumeUrl || '/resume.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md transition-all"
              >
                <FileText className="w-5 h-5" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
