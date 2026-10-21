import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroKinetic from './components/HeroKinetic';
import SkillsSection from './components/SkillsSection';
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
        <SkillsSection onOpenContact={() => setIsContactOpen(true)} />
      </main>

      {/* Contact Drawer / Modal */}
      <ContactModal 
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
