import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/fullscreenMenu.css';

const NAV_LINKS = [
  { id: 'home', label: 'HOME', href: '#home' },
  { id: 'about', label: 'ABOUT', href: '#about-section' },
  { id: 'skills', label: 'SKILLS', href: '#skills-section' },
  { id: 'projects', label: 'WORKS', href: '#projects-section' },
];

export default function FullScreenMenu({ isOpen, onClose }) {
  const overlayRef = useRef(null);
  const tlRef = useRef(null);
  const isNavigatingRef = useRef(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const ctx = gsap.context(() => {
      // Initialize hidden off-screen above
      gsap.set(overlay, { yPercent: -100, display: 'none' });

      // Build Entrance Timeline
      tlRef.current = gsap.timeline({ paused: true })
        .set(overlay, { display: 'flex' })
        // 1. Full dark section sweeps down from top
        .to(overlay, {
          yPercent: 0,
          duration: 1,
          ease: 'power4.inOut',
        })
        // 2. Center navigation links appear (staggered editorial typewriter reveal)
        .fromTo(
          '.fs-nav-link',
          { y: 40, opacity: 0, filter: 'blur(8px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.55,
            stagger: 0.08,
            ease: 'power3.out',
          },
          '-=0.2'
        )
        // 3. Lower 3-column footer grid appears last in timeline
        .fromTo(
          '.fs-col',
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.08,
            ease: 'power2.out',
          },
          '-=0.25'
        );
    }, overlayRef);

    return () => ctx.revert();
  }, []);

  // Handle open / close animation trigger
  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;

    if (isOpen) {
      isNavigatingRef.current = false;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      tl.play();
    } else if (!isNavigatingRef.current) {
      tl.reverse().eventCallback('onReverseComplete', () => {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      });
    }
  }, [isOpen]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Smooth Navigation handler: Reverses timeline, closes menu, then smoothly scrolls
  const handleNavigate = (href) => {
    isNavigatingRef.current = true;
    const tl = tlRef.current;

    const performScroll = () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      onClose();

      setTimeout(() => {
        const targetId = href.replace('#', '');
        if (targetId === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 50);
    };

    if (tl) {
      tl.reverse().eventCallback('onReverseComplete', performScroll);
    } else {
      performScroll();
    }
  };

  return (
    <section ref={overlayRef} 
      className="fullscreen-menu-overlay"
      aria-hidden={!isOpen}
      role="dialog"
      aria-label="Full screen site navigation"
    >

      <div className="fs-menu-content">
        {/* Center: 4 Page Navigation Links in Single Row */}
        <nav className="fs-center-nav-row" aria-label="Main menu">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              className="fs-nav-link"
              onClick={() => handleNavigate(link.href)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Lower Region: 3-Column Footer Grid (Reusing Footer Content) */}
        <div className="fs-bottom-grid">
          {/* Column 1: Contact Info */}
          <div className="fs-col fs-col-contact">
            <span className="fs-col-heading">CONTACT</span>
            <div className="fs-contact-links">
              <a href="tel:+919082882412" className="fs-link">
                +91 9082882412
              </a>
              <a href="mailto:yashgaikwad0450@gmail.com" className="fs-link">
                yashgaikwad0450@gmail.com
              </a>
              <span className="fs-address-text">
                NAVI MUMBAI, MAHARASHTRA.
              </span>
            </div>
          </div>

          {/* Column 2: Status & Details */}
          <div className="fs-col fs-col-details">
            <span className="fs-col-heading">CURRENT STATUS</span>
            <div className="fs-status-pill">
              <span>Available for Roles &amp; Freelance</span>
            </div>
            <p className="fs-details-sub">
              Full Stack &amp; Creative UI Engineering
            </p>
          </div>

          {/* Column 3: Online Presence */}
          <div className="fs-col fs-col-socials">
            <span className="fs-col-heading">ONLINE PRESENCE</span>
            <div className="fs-social-links-list">
              <a 
                href="https://github.com/YGCodeScape" 
                target="_blank" 
                rel="noreferrer" 
                className="fs-link fs-social-link"
              >
                GITHUB
              </a>
              <a 
                href="https://www.linkedin.com/in/yash-gaikwad-a0969833b" 
                target="_blank" 
                rel="noreferrer" 
                className="fs-link fs-social-link"
              >
                LINKEDIN
              </a>
              <a 
                href="https://www.instagram.com/yashgaikwad7_" 
                target="_blank" 
                rel="noreferrer" 
                className="fs-link fs-social-link"
              >
                INSTAGRAM
              </a>
              <a 
                href="https://www.chess.com/member/yashrg07" 
                target="_blank" 
                rel="noreferrer" 
                className="fs-link fs-social-link"
              >
                CHESS.COM
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
