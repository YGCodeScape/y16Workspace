import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, ChessComIcon } from './Icons';
import letterMark from '../assets/letterMark0.3.png';

export default function Navbar({ isMenuOpen, onToggleMenu, onDownloadResume }) {
  const [activeTooltip, setActiveTooltip] = useState(null);
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
    { id: 'github', label: 'GitHub', icon: GithubIcon, url: 'https://github.com/YGCodeScape' },
    { id: 'linkedin', label: 'LinkedIn', icon: LinkedinIcon, url: 'https://www.linkedin.com/in/yash-gaikwad-a0969833b' },
    { id: 'instagram', label: 'Instagram', icon: InstagramIcon, url: 'https://www.instagram.com/yashgaikwad7_' },
    { id: 'chess', label: 'Chess.com', icon: ChessComIcon, url: 'https://www.chess.com/member/yashrg07' },
  ];

  const isDarkHeader = isOverFooter || isMenuOpen;

  return (
    <header className={`navigation-header ${isDarkHeader ? 'nav-is-dark' : ''}`}>
      {/* Top Left: Logo / Brand Name with Lettermark */}
      <div className={`nav-brand-group ${isDarkHeader ? 'nav-over-footer' : ''}`}>
        <a href="#home" className={`top-left-logo ${isDarkHeader ? 'over-footer' : ''}`}>
          <img src={letterMark} alt="Y16 Lettermark" className="logo-lettermark" />
          <span className="logo-wordmark">Workspace</span>
        </a>
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

      {/* Top Right: Resume CTA & 2-Line Morphing Menu Toggle */}
      <div className="nav-right-group">
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

        {/* Unified 2-Line Menu Toggle Button (Desktop & Mobile) */}
        <button
          type="button"
          onClick={onToggleMenu}
          className={`nav-menu-toggle-btn ${isMenuOpen ? 'is-active' : ''} ${isDarkHeader ? 'is-dark' : ''}`}
          aria-label={isMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
        >
          <span className="menu-line menu-line-1" />
          <span className="menu-line menu-line-2" />
        </button>
      </div>
    </header>
  );
}
