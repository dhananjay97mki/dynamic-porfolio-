import { PortfolioData, Profile, About, Certificate, Skill, Project, Experience, Resume, SocialLink, ContactMessage } from './types';
import { initialPortfolioData } from './initialData';
import { supabase, isSupabaseConfigured } from './supabase/client';

const STORAGE_KEY = 'dhananjay_portfolio_data_v1';

// Helper to get local data
export const getLocalPortfolioData = (): PortfolioData => {
  if (typeof window === 'undefined') return initialPortfolioData;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialPortfolioData));
      return initialPortfolioData;
    }
    return JSON.parse(saved);
  } catch (e) {
    console.error('Failed to read from localStorage:', e);
    return initialPortfolioData;
  }
};

// Helper to save local data
export const saveLocalPortfolioData = (data: PortfolioData): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
};

// Async data fetcher (Supabase or Local)
export const fetchPortfolioData = async (): Promise<PortfolioData> => {
  if (isSupabaseConfigured() && supabase) {
    try {
      const [
        { data: profile },
        { data: about },
        { data: certificates },
        { data: skills },
        { data: projects },
        { data: experiences },
        { data: resumes },
        { data: socialLinks },
      ] = await Promise.all([
        supabase.from('profiles').select('*').single(),
        supabase.from('about').select('*').single(),
        supabase.from('certificates').select('*').order('sort_order', { ascending: true }),
        supabase.from('skills').select('*').order('sort_order', { ascending: true }),
        supabase.from('projects').select('*').order('sort_order', { ascending: true }),
        supabase.from('experiences').select('*').order('sort_order', { ascending: true }),
        supabase.from('resumes').select('*'),
        supabase.from('social_links').select('*').order('sort_order', { ascending: true }),
      ]);

      if (profile && about && certificates && skills && projects && experiences) {
        return {
          profile: profile as Profile,
          about: about as About,
          certificates: certificates as Certificate[],
          skills: skills as Skill[],
          projects: projects as Project[],
          experiences: experiences as Experience[],
          resumes: (resumes as Resume[]) || initialPortfolioData.resumes,
          socialLinks: (socialLinks as SocialLink[]) || initialPortfolioData.socialLinks,
        };
      }
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to local storage:', err);
    }
  }

  return getLocalPortfolioData();
};

// Save entity helpers
export const updateProfileStore = async (profile: Profile): Promise<void> => {
  if (isSupabaseConfigured() && supabase) {
    await supabase.from('profiles').upsert(profile);
  }
  const current = getLocalPortfolioData();
  current.profile = profile;
  saveLocalPortfolioData(current);
};

export const updateAboutStore = async (about: About): Promise<void> => {
  if (isSupabaseConfigured() && supabase) {
    await supabase.from('about').upsert(about);
  }
  const current = getLocalPortfolioData();
  current.about = about;
  saveLocalPortfolioData(current);
};

export const updateCertificatesStore = async (certificates: Certificate[]): Promise<void> => {
  if (isSupabaseConfigured() && supabase) {
    await supabase.from('certificates').upsert(certificates);
  }
  const current = getLocalPortfolioData();
  current.certificates = certificates;
  saveLocalPortfolioData(current);
};

export const updateSkillsStore = async (skills: Skill[]): Promise<void> => {
  if (isSupabaseConfigured() && supabase) {
    await supabase.from('skills').upsert(skills);
  }
  const current = getLocalPortfolioData();
  current.skills = skills;
  saveLocalPortfolioData(current);
};

export const updateProjectsStore = async (projects: Project[]): Promise<void> => {
  if (isSupabaseConfigured() && supabase) {
    await supabase.from('projects').upsert(projects);
  }
  const current = getLocalPortfolioData();
  current.projects = projects;
  saveLocalPortfolioData(current);
};

export const updateExperiencesStore = async (experiences: Experience[]): Promise<void> => {
  if (isSupabaseConfigured() && supabase) {
    await supabase.from('experiences').upsert(experiences);
  }
  const current = getLocalPortfolioData();
  current.experiences = experiences;
  saveLocalPortfolioData(current);
};

export const updateResumesStore = async (resumes: Resume[]): Promise<void> => {
  if (isSupabaseConfigured() && supabase) {
    await supabase.from('resumes').upsert(resumes);
  }
  const current = getLocalPortfolioData();
  current.resumes = resumes;
  saveLocalPortfolioData(current);
};

export const updateSocialLinksStore = async (socialLinks: SocialLink[]): Promise<void> => {
  if (isSupabaseConfigured() && supabase) {
    await supabase.from('social_links').upsert(socialLinks);
  }
  const current = getLocalPortfolioData();
  current.socialLinks = socialLinks;
  saveLocalPortfolioData(current);
};

// Contact message store
export const saveContactMessage = async (msg: Omit<ContactMessage, 'id' | 'created_at' | 'is_read'>): Promise<void> => {
  const newMsg: ContactMessage = {
    ...msg,
    id: 'msg-' + Date.now(),
    created_at: new Date().toISOString(),
    is_read: false,
  };

  if (isSupabaseConfigured() && supabase) {
    await supabase.from('contact_messages').insert(newMsg);
  }

  if (typeof window !== 'undefined') {
    const existing: ContactMessage[] = JSON.parse(localStorage.getItem('dhananjay_contact_messages') || '[]');
    existing.unshift(newMsg);
    localStorage.setItem('dhananjay_contact_messages', JSON.stringify(existing));
  }
};

export const getContactMessages = async (): Promise<ContactMessage[]> => {
  if (isSupabaseConfigured() && supabase) {
    const { data } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
    if (data) return data as ContactMessage[];
  }

  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('dhananjay_contact_messages') || '[]');
  }
  return [];
};
