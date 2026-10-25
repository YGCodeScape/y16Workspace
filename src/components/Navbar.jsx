import { useState, useEffect } from 'react';
import { Download, Mail, ArrowUpRight, Menu, X } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, ChessComIcon} from './Icons';
import letterMark from '../assets/letterMark0.3.png';

export default function Navbar({ onOpenContact, onDownloadResume }) {
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOverFooter, setIsOverFooter] = useState(false);

  useEffect(() => {
    const footer = document.getElementById('footer');
    if (!footer) return;

    const checkFooter = () => {
      const rect = footer.getBoundingClientRect();
      // When footer top boundary reaches the navigation bar (75px from viewport top)
      setIsOverFooter(rect.top <= 75 && rect.bottom > 0);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOverFooter(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '-75px 0px 0px 0px',
        threshold: 0,
      }
    );

    observer.observe(footer);
    window.addEventListener('scroll', checkFooter, { passive: true });
    window.addEventListener('resize', checkFooter);
    checkFooter();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', checkFooter);
      window.removeEventListener('resize', checkFooter);
    };
  }, []);

  const socials = [
    { id: 'github', label: 'GitHub', icon: GithubIcon, url: 'https://github.com' },
    { id: 'linkedin', label: 'LinkedIn', icon: LinkedinIcon, url: 'https://linkedin.com' },
    { id: 'instagram', label: 'Instagram', icon: InstagramIcon, url: 'https://instagram.com' },
    { id: 'chess', label: 'Chess.com', icon: ChessComIcon, url: 'https://www.chess.com/member/yashrg07' },
  ];

  return (
    <>
      <header className="navigation-header">
        {/* Top Left: Logo / Brand Name with Lettermark */}
        <div className={`nav-brand-group ${isOverFooter ? 'nav-over-footer' : ''}`}>
          <a href="#home" className={`top-left-logo ${isOverFooter ? 'over-footer' : ''}`}>
            <img src={letterMark} alt="Y16 Lettermark" className="logo-lettermark" />
            <span className="logo-wordmark">Workspace</span>
          </a>

          {/* Live Status Pill */}
          <div className="live-pill">
            <span className="live-dot animate-pulse-dot" />
          </div>
        </div>

        {/* Top Center: Social Media Icons Dock (Desktop Only) */}
        <nav className="social-dock">
          {socials.map((item) => {
            const Icon = item.icon;
            const isHovered = activeTooltip === item.id;
            return (
              <div 
                key={item.id} 
                className="nav-icon-container"
                onMouseEnter={() => setActiveTooltip(item.id)}
                onMouseLeave={() => setActiveTooltip(null)}
              >
                <a 
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="nav-tags"
                >
                  <Icon size={18} strokeWidth={2} />
                </a>

                {/* Tooltip bubble */}
                {isHovered && (
                  <div className="tooltip-bubble">
                    {item.label}
                    <div className="tooltip-mark" />
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Top Right: Desktop Morphing CTAs & Mobile Hamburger */}
        <div className="nav-right-group">
          <div className="nav-cta-group desktop-only">
            {/* Direct Download Resume Button */}
            <div className="cta-btn-wrapper resume-wrapper">
              <button 
                onClick={onDownloadResume}
                id="btn-resume-download"
                className="cta-morph-btn resume-btn"
                aria-label="Download Resume"
              >
                <span className="cta-icon-box">
                  <Download size={16} strokeWidth={2.2} />
                </span>
                <span className="cta-btn-text">Resume</span>
              </button>
            </div>

            {/* Contact CTA Button */}
            <div className="cta-btn-wrapper contact-wrapper">
              <button
                onClick={onOpenContact}
                id="btn-contact-cta"
                className="cta-morph-btn contact-btn"
                aria-label="Contact Yash"
              >
                <span className="cta-icon-box">
                  <Mail size={16} strokeWidth={2.2} />
                </span>
                <span className="cta-btn-text">Contact</span>
                <span className="cta-btn-arrow">
                  <ArrowUpRight size={15} strokeWidth={2.5} />
                </span>
              </button>
            </div>
          </div>

          {/* Mobile: Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-hamburger-btn mobile-only"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Animated Dropdown Box (Contains CTAs & Social Icons) */}
      {mobileMenuOpen && (
        <>
          <div 
            className="mobile-drawer-backdrop"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="mobile-dropdown-box">
            {/* Dropdown Header */}
            <div className="mobile-dropdown-header">
              <div className="mobile-dropdown-brand">
                <img src={letterMark} alt="Y16 Lettermark" className="logo-lettermark" />
                <span>Workspace</span>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-drawer-close"
                aria-label="Close Menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Section 1: The 2 CTAs */}
            <div className="mobile-ctas-container">
              <button
                onClick={() => {
                  onDownloadResume();
                  setMobileMenuOpen(false);
                }}
                className="mobile-cta-btn mobile-resume-btn"
              >
                <Download size={17} strokeWidth={2.2} />
                <span>Resume</span>
              </button>

              <button
                onClick={() => {
                  onOpenContact();
                  setMobileMenuOpen(false);
                }}
                className="mobile-cta-btn mobile-contact-btn"
              >
                <Mail size={17} strokeWidth={2.2} />
                <span>Contact</span>
                <ArrowUpRight size={15} strokeWidth={2.5} />
              </button>
            </div>

            <div className="mobile-dropdown-divider" />

            {/* Section 2: Social Icons Nav Dock */}
            <div className="mobile-socials-wrapper">
              <span className="mobile-socials-label">Socials</span>
              <div className="mobile-socials-row">
                {socials.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mobile-social-icon-btn"
                      aria-label={item.label}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon size={19} strokeWidth={2} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
