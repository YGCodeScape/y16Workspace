import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroKinetic from './components/HeroKinetic';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import FooterSection from './components/FooterSection';
import ContactModal from './components/ContactModal';
import { downloadResume } from './utils/resumeDownload';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', position: 'relative' }}>
      {/* Top Header Navigation */}
      <Navbar 
        onOpenContact={() => setIsContactOpen(true)}
        onDownloadResume={downloadResume}
      />

      {/* Main Interactive Sections */}
      <main>
        <HeroKinetic />
        <AboutSection />
        <SkillsSection onOpenContact={() => setIsContactOpen(true)} />
        <ProjectsSection />
        <FooterSection />
      </main>

      {/* Contact Drawer / Modal */}
      <ContactModal 
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
