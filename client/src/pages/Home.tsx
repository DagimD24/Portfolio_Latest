import { useRef } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';

export default function Home() {
  const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const scrollToSection = (sectionId: string) => {
    const section = sectionsRef.current[sectionId];
    if (section) {
      const offset = 80;
      const top = section.offsetTop - offset;
      window.scrollTo({
        top,
        behavior: 'smooth',
      });
    } else if (sectionId === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const handleDownloadResume = () => {
    console.log('Download resume');
  };

  return (
    <div className="min-h-screen bg-background relative">
      <ParticleBackground />
      <Navbar onNavigate={scrollToSection} />
      
      <main>
        <Hero
          onViewWork={() => scrollToSection('projects')}
          onDownloadResume={handleDownloadResume}
        />
        
        <div ref={(el) => (sectionsRef.current['about'] = el)}>
          <About />
        </div>
        
        <div ref={(el) => (sectionsRef.current['skills'] = el)}>
          <Skills />
        </div>
        
        <div ref={(el) => (sectionsRef.current['projects'] = el)}>
          <Projects />
        </div>
        
        <div ref={(el) => (sectionsRef.current['experience'] = el)}>
          <Experience />
        </div>
        
        <div ref={(el) => (sectionsRef.current['education'] = el)}>
          <Education />
        </div>
        
        <div ref={(el) => (sectionsRef.current['contact'] = el)}>
          <Contact />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
