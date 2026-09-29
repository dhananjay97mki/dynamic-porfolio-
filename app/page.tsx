"use client";

import { useEffect, useState } from "react";
import PortfolioCursor from "@/components/PortfolioCursor";
import { PortfolioData } from "@/lib/types";
import { fetchPortfolioData } from "@/lib/store";

import { Navbar } from "@/components/public/Navbar";
import { Hero } from "@/components/public/Hero";
import { About } from "@/components/public/About";
import { Certificates } from "@/components/public/Certificates";
import { Skills } from "@/components/public/Skills";
import { Projects } from "@/components/public/Projects";
import { Experience } from "@/components/public/Experience";
import { ResumeSection } from "@/components/public/ResumeSection";
import { ContactSection } from "@/components/public/ContactSection";
import { Footer } from "@/components/public/Footer";
import { AntigravityCanvas } from "@/components/ui/AntigravityCanvas";

export default function Home() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await fetchPortfolioData();
        setData(result);
      } catch (err) {
        console.error("Failed to load portfolio data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-bg dark:bg-dark-bg">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />

          <p className="text-sm font-semibold text-cream-muted dark:text-dark-muted">
            Loading Dhananjay&apos;s Portfolio...
          </p>
        </div>
      </div>
    );
  }

  const primaryResume = data.resumes.find(
    (resume) => resume.is_published
  )?.file_url;

  return (
    <div className="min-h-screen relative bg-cream-bg dark:bg-dark-bg text-cream-text dark:text-dark-text selection:bg-blue-600 selection:text-white overflow-x-hidden">
      {/* Custom Jet Cursor */}
      <PortfolioCursor />

      {/* Antigravity Canvas Particles */}
      <AntigravityCanvas />

      {/* Public Navbar */}
      <Navbar resumeUrl={primaryResume} />

      {/* Main Portfolio Content */}
      <main className="relative z-10">
        <Hero
          profile={data.profile}
          about={data.about}
          skills={data.skills}
          socialLinks={data.socialLinks}
          resumeUrl={primaryResume}
        />

        <About about={data.about} />

        <Certificates certificates={data.certificates} />

        <Skills skills={data.skills} />

        <Projects projects={data.projects} />

        <Experience experiences={data.experiences} />

        <ResumeSection resumes={data.resumes} />

        <ContactSection
          profile={data.profile}
          socialLinks={data.socialLinks}
        />
      </main>

      {/* Footer */}
      <Footer name={data.profile.name} />
    </div>
  );
}