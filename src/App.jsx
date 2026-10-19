import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroKinetic from './components/HeroKinetic';
import ContactModal from './components/ContactModal';
import PaintBrushCursor from './components/PaintBrushCursor';
import { downloadResume } from './utils/resumeDownload';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', position: 'relative' }}>
      {/* Custom Paintbrush Cursor with Dynamic Fading Colorful Tail */}
      <PaintBrushCursor />

      {/* Top Header Navigation */}
      <Navbar 
        onOpenContact={() => setIsContactOpen(true)}
        onDownloadResume={downloadResume}
      />

      {/* Main Interactive Hero Section */}
      <main>
        <HeroKinetic />
      </main>

      {/* Contact Drawer / Modal */}
      <ContactModal 
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
