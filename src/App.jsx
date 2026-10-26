import { useState } from 'react';
import Navbar from './components/Navbar';
import FullScreenMenu from './components/FullScreenMenu';
import HeroKinetic from './components/HeroKinetic';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import FooterSection from './components/FooterSection';
import { downloadResume } from './utils/resumeDownload';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', position: 'relative' }}>
      {/* Top Header Navigation */}
      <Navbar 
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
        onDownloadResume={downloadResume} 
      />

      {/* Full-Screen Dark Navigation Overlay (Layered right behind Navigation Header) */}
      <FullScreenMenu 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      {/* Main Interactive Sections */}
      <main>
        <HeroKinetic />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <FooterSection />
      </main>
    </div>
  );
}
