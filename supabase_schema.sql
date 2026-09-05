-- ====================================================================
-- DHANANJAY MOUNDEKAR PORTFOLIO - SUPABASE DATABASE SCHEMA & SEED SCRIPT
-- ====================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- --------------------------------------------------------------------
-- 1. PROFILES TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY DEFAULT 'profile-1',
  name TEXT NOT NULL,
  greeting TEXT,
  headline TEXT,
  short_intro TEXT,
  profile_image_url TEXT,
  primary_cta_text TEXT,
  primary_cta_link TEXT,
  secondary_cta_text TEXT,
  secondary_cta_link TEXT,
  email TEXT,
  phone TEXT,
  location TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- --------------------------------------------------------------------
-- 2. ABOUT TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.about (
  id TEXT PRIMARY KEY DEFAULT 'about-1',
  title TEXT,
  story TEXT,
  education_summary TEXT,
  current_status TEXT,
  career_interests TEXT,
  location TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- --------------------------------------------------------------------
-- 3. CERTIFICATES TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.certificates (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issue_date TEXT,
  description TEXT,
  image_url TEXT,
  certificate_url TEXT,
  sort_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- --------------------------------------------------------------------
-- 4. SKILLS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.skills (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  proficiency_percent INT DEFAULT 85,
  icon TEXT,
  sort_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true
);

-- --------------------------------------------------------------------
-- 5. PROJECTS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_desc TEXT,
  detailed_desc TEXT,
  problem_statement TEXT,
  solution_statement TEXT,
  contribution TEXT,
  image_url TEXT,
  github_url TEXT,
  live_demo_url TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  category TEXT DEFAULT 'AI & ML',
  featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  date TEXT
);

-- --------------------------------------------------------------------
-- 6. EXPERIENCES TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.experiences (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  organization TEXT NOT NULL,
  location TEXT,
  start_date TEXT,
  end_date TEXT,
  is_current BOOLEAN DEFAULT false,
  description TEXT,
  category TEXT DEFAULT 'Education',
  sort_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true
);

-- --------------------------------------------------------------------
-- 7. RESUMES TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.resumes (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  type TEXT DEFAULT 'resume',
  is_published BOOLEAN DEFAULT true,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- --------------------------------------------------------------------
-- 8. SOCIAL LINKS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.social_links (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  sort_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true
);

-- --------------------------------------------------------------------
-- 9. CONTACT MESSAGES TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Public: SELECT on published content
-- Authenticated Users (Admin): ALL Operations (INSERT, UPDATE, DELETE)
-- ====================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "Public Read Profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Admin All Profiles" ON public.profiles FOR ALL USING (auth.role() = 'authenticated');

-- About
CREATE POLICY "Public Read About" ON public.about FOR SELECT USING (true);
CREATE POLICY "Admin All About" ON public.about FOR ALL USING (auth.role() = 'authenticated');

-- Certificates
CREATE POLICY "Public Read Certificates" ON public.certificates FOR SELECT USING (is_published = true);
CREATE POLICY "Admin All Certificates" ON public.certificates FOR ALL USING (auth.role() = 'authenticated');

-- Skills
CREATE POLICY "Public Read Skills" ON public.skills FOR SELECT USING (is_published = true);
CREATE POLICY "Admin All Skills" ON public.skills FOR ALL USING (auth.role() = 'authenticated');

-- Projects
CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (is_published = true);
CREATE POLICY "Admin All Projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');

-- Experiences
CREATE POLICY "Public Read Experiences" ON public.experiences FOR SELECT USING (is_published = true);
CREATE POLICY "Admin All Experiences" ON public.experiences FOR ALL USING (auth.role() = 'authenticated');

-- Resumes
CREATE POLICY "Public Read Resumes" ON public.resumes FOR SELECT USING (is_published = true);
CREATE POLICY "Admin All Resumes" ON public.resumes FOR ALL USING (auth.role() = 'authenticated');

-- Social Links
CREATE POLICY "Public Read Social Links" ON public.social_links FOR SELECT USING (is_published = true);
CREATE POLICY "Admin All Social Links" ON public.social_links FOR ALL USING (auth.role() = 'authenticated');

-- Contact Messages (Public can Insert, Admin can View/Delete)
CREATE POLICY "Public Insert Messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin All Messages" ON public.contact_messages FOR ALL USING (auth.role() = 'authenticated');

-- ====================================================================
-- SEED DATA
-- ====================================================================

INSERT INTO public.profiles (id, name, greeting, headline, short_intro, profile_image_url, primary_cta_text, primary_cta_link, secondary_cta_text, secondary_cta_link, email, phone, location)
VALUES (
  'profile-1',
  'Dhananjay C. Moundekar',
  'Hi, I''m Dhananjay 👋',
  'AI Developer | Full Stack Engineer | Data Scientist',
  'Building AI-powered tools and scalable full-stack applications. Final-year AI student at PJLCE Nagpur & pursuing B.S. in Data Science at IIT Madras.',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
  'View Projects',
  '#projects',
  'Contact Me',
  '#contact',
  'dhanjanjaymoundekar1244@gmail.com',
  '+91 7875654030',
  'Nagpur, Maharashtra, India'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.about (id, title, story, education_summary, current_status, career_interests, location)
VALUES (
  'about-1',
  'Driven by AI Innovation & Seamless User Experiences',
  'I am a final-year Artificial Intelligence student at Priyadarshini J. L. College of Engineering (PJLCE), Nagpur, concurrently pursuing a B.S. in Data Science from IIT Madras. I specialize in bridging advanced Machine Learning / Natural Language Processing models with clean, performant full-stack web applications. Outside of code, I enjoy exploring geopolitics, historical events, and aviation developments.',
  'B.Tech in Artificial Intelligence (PJLCE) & B.S. in Data Science (IIT Madras)',
  'Open to Full-time AI / Software Engineering Roles & Internships',
  'AI Engineering, Full Stack Web Development, NLP Pipelines, Scalable Systems',
  'Nagpur / Remote'
) ON CONFLICT (id) DO NOTHING;
