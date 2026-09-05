import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ui/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dhananjay C. Moundekar | AI Developer & Full Stack Engineer',
  description:
    'Personal portfolio of Dhananjay C. Moundekar. AI Developer, Full Stack Engineer & Data Scientist. Final year AI student at PJLCE Nagpur & pursuing B.S. in Data Science at IIT Madras.',
  keywords: [
    'Dhananjay Moundekar',
    'AI Developer',
    'Full Stack Engineer',
    'Data Scientist',
    'IIT Madras Data Science',
    'PJLCE Artificial Intelligence',
    'Machine Learning',
    'NLP',
    'React',
    'Next.js',
    'Python',
  ],
  openGraph: {
    title: 'Dhananjay C. Moundekar | AI & Full Stack Developer',
    description:
      'Explore AI projects, machine learning models, full stack web apps, certificates, and research presentations.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
