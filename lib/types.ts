export interface Profile {
  id: string;
  name: string;
  greeting: string;
  headline: string;
  short_intro: string;
  profile_image_url: string;
  primary_cta_text: string;
  primary_cta_link: string;
  secondary_cta_text: string;
  secondary_cta_link: string;
  email: string;
  phone: string;
  location: string;
  updated_at?: string;
}

export interface About {
  id: string;
  title: string;
  story: string;
  education_summary: string;
  current_status: string;
  career_interests: string;
  location: string;
  updated_at?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issue_date: string;
  description: string;
  image_url: string;
  certificate_url: string;
  sort_order: number;
  is_published: boolean;
  created_at?: string;
}

export type SkillCategory =
  | 'Programming'
  | 'AI / Machine Learning'
  | 'Data Engineering'
  | 'Web Development'
  | 'Databases'
  | 'Tools & Technologies';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency_percent: number;
  icon?: string;
  sort_order: number;
  is_published: boolean;
}

export type ProjectCategory = 'AI & ML' | 'Full Stack' | 'Data Science' | 'Mobile & Realtime';

export interface Project {
  id: string;
  title: string;
  slug: string;
  short_desc: string;
  detailed_desc: string;
  problem_statement?: string;
  solution_statement?: string;
  contribution?: string;
  image_url: string;
  github_url: string;
  live_demo_url: string;
  tech_stack: string[];
  category: ProjectCategory;
  featured: boolean;
  sort_order: number;
  is_published: boolean;
  date: string;
}

export type ExperienceCategory = 'Education' | 'Presentation' | 'Hackathon' | 'Work Experience' | 'Achievement';

export interface Experience {
  id: string;
  title: string;
  organization: string;
  location: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  description: string;
  category: ExperienceCategory;
  sort_order: number;
  is_published: boolean;
}

export interface Resume {
  id: string;
  title: string;
  description: string;
  file_url: string;
  type: 'resume' | 'cv';
  is_published: boolean;
  updated_at: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  sort_order: number;
  is_published: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

export interface PortfolioData {
  profile: Profile;
  about: About;
  certificates: Certificate[];
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  resumes: Resume[];
  socialLinks: SocialLink[];
}
