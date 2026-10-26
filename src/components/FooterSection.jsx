import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { FOOTER_BLUEPRINT_CONFIG } from '../config/footerBlueprint';
import '../styles/footer.css';

// ─── Mathematical Blueprint Geometric SVG Layer ──────────────────────────────
function BlueprintVectorOverlay() {
  const { viewBox, circle1, circle2, horizontalLines, verticalLines } = FOOTER_BLUEPRINT_CONFIG;

  return (
    <svg
      className="footer-blueprint-svg"
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* ── Exactly 2 Large Intersecting Circles ── */}
      <circle
        cx={circle1.cx}
        cy={circle1.cy}
        r={circle1.r}
        stroke={circle1.stroke}
        strokeWidth={circle1.strokeWidth}
      />
      <circle
        cx={circle2.cx}
        cy={circle2.cy}
        r={circle2.r}
        stroke={circle2.stroke}
        strokeWidth={circle2.strokeWidth}
      />

      {/* ── Exactly 2 Horizontal Lines ── */}
      {horizontalLines.map((line) => (
        <line
          key={line.id}
          x1="0"
          y1={line.y}
          x2="1440"
          y2={line.y}
          stroke={line.stroke}
          strokeWidth={line.strokeWidth}
        />
      ))}

      {/* ── Exactly 3 Vertical Lines ── */}
      {verticalLines.map((line) => (
        <line
          key={line.id}
          x1={line.x}
          y1="0"
          x2={line.x}
          y2="760"
          stroke={line.stroke}
          strokeWidth={line.strokeWidth}
        />
      ))}
    </svg>
  );
}

// ─── Word-Wrapped Typewriter Letter Animator ──────────────────────────────────
function TypewriterText({ text, inView, baseDelay = 0, charSpeed = 0.024, className = "" }) {
  const words = text.split(' ');

  return (
    <span className={`typewriter-phrase ${className}`}>
      {words.map((word, wIdx) => {
        const wordChars = word.split('');
        const startOffset = words
          .slice(0, wIdx)
          .reduce((acc, prevWord) => acc + prevWord.length + 1, 0);

        return (
          <span key={wIdx} className="typewriter-word" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            {wordChars.map((char, cIdx) => {
              const letterIndex = startOffset + cIdx;
              return (
                <motion.span
                  key={cIdx}
                  className="typewriter-char"
                  initial={{ opacity: 0, y: 5 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
                  transition={{
                    duration: 0.16,
                    delay: baseDelay + letterIndex * charSpeed,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ display: 'inline-block' }}
                >
                  {char}
                </motion.span>
              );
            })}
            {wIdx < words.length - 1 && (
              <span className="typewriter-space" style={{ display: 'inline-block' }}>
                &nbsp;
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}

export default function FooterSection() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: '-60px' });
  const goTopRef = useRef(null);
  const [goTopHovered, setGoTopHovered] = useState(false);

  // Direction-Aware Cursor Tracking for "GO TOP" Circular Bloom
  const handleGoTopMouseEnter = (e) => {
    if (!goTopRef.current) return;
    const rect = goTopRef.current.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    goTopRef.current.style.setProperty('--mx', `${x}px`);
    goTopRef.current.style.setProperty('--my', `${y}px`);
    setGoTopHovered(true);
  };

  const handleGoTopMouseLeave = (e) => {
    if (!goTopRef.current) return;
    const rect = goTopRef.current.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    goTopRef.current.style.setProperty('--mx', `${x}px`);
    goTopRef.current.style.setProperty('--my', `${y}px`);
    setGoTopHovered(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" ref={footerRef} className="portfolio-footer-section">
      {/* Soft Vignette Depth & Matte Paper Grain Texture Overlays */}
      <div className="footer-vignette-overlay" />
      <div className="footer-grain-texture" />

      {/* Pure Mathematical SVG Blueprint Vector Layer (2 Intersecting Circles, 2 H-Lines, 3 V-Lines) */}
      <BlueprintVectorOverlay />

      <div className="footer-inner-container">
        {/* ================= Upper Region: Hero Typography & Go Top ================= */}
        <div className="footer-upper-row">
          {/* Center-Left Massive Headline */}
          <div className="footer-headline-block">
            <h3 className="footer-author-name">
              <TypewriterText 
                text="YASH GAIKWAD" 
                inView={isInView} 
                baseDelay={0.1} 
                charSpeed={0.03} 
              />
            </h3>

            <div className="footer-hero-title-wrap">
              <h2 className="footer-portfolio-word">
                <TypewriterText 
                  text="PORTFOLIO" 
                  inView={isInView} 
                  baseDelay={0.45} 
                  charSpeed={0.032} 
                />
              </h2>
              <span className="footer-year-badge">
                <TypewriterText 
                  text="2026" 
                  inView={isInView} 
                  baseDelay={0.8} 
                  charSpeed={0.035} 
                />
              </span>
            </div>
          </div>

          {/* Right Floating GO TOP Button with Directional Hover Circle */}
          <motion.div 
            className="footer-go-top-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              ref={goTopRef}
              type="button"
              className={`go-top-circle-btn ${goTopHovered ? 'hovered' : ''}`}
              onMouseEnter={handleGoTopMouseEnter}
              onMouseLeave={handleGoTopMouseLeave}
              onClick={scrollToTop}
              aria-label="Scroll back to top"
            >
              <div className="go-top-fill" />
              <div className="go-top-icon-wrap">
                <ArrowUp size={26} strokeWidth={2.4} className="go-top-arrow-icon" />
              </div>
            </button>
            <span className="go-top-label" onClick={scrollToTop}>
              <TypewriterText 
                text="GO TOP" 
                inView={isInView} 
                baseDelay={0.65} 
                charSpeed={0.035} 
              />
            </span>
          </motion.div>
        </div>

        {/* ================= Lower Region: 3-Column Footer Grid ================= */}
        <div className="footer-lower-grid">

          {/* Column 1: Contact Info */}
          <div className="footer-col footer-col-contact">
            <h4 className="footer-col-heading">
              <TypewriterText 
                text="CONTACT" 
                inView={isInView} 
                baseDelay={0.85} 
                charSpeed={0.03} 
              />
            </h4>
            <div className="footer-contact-list">
              <a href="tel:+919082882412" className="footer-contact-item">
                <TypewriterText 
                  text="+91 9082882412" 
                  inView={isInView} 
                  baseDelay={1.0} 
                  charSpeed={0.02} 
                />
              </a>

              <a href="mailto:yashgaikwad0450@gmail.com" className="footer-contact-item">
                <TypewriterText 
                  text="yashgaikwad0450@gmail.com" 
                  inView={isInView} 
                  baseDelay={1.12} 
                  charSpeed={0.016} 
                />
              </a>

              <span className="footer-contact-item footer-address-text">
                <TypewriterText 
                  text="NAVI MUMBAI, MAHARASHTRA." 
                  inView={isInView} 
                  baseDelay={1.25} 
                  charSpeed={0.018} 
                />
              </span>
            </div>
          </div>

          {/* Column 2: Online Presence */}
          <div className="footer-col footer-col-socials">
            <h4 className="footer-col-heading">
              <TypewriterText 
                text="ONLINE PRESENCE" 
                inView={isInView} 
                baseDelay={0.9} 
                charSpeed={0.025} 
              />
            </h4>
            <div className="footer-social-links-list">
              <a 
                href=" https://github.com/YGCodeScape" 
                target="_blank" 
                rel="noreferrer" 
                className="footer-social-link"
              >
                <TypewriterText 
                  text="GITHUB" 
                  inView={isInView} 
                  baseDelay={1.05} 
                  charSpeed={0.026} 
                />
              </a>

              <a 
                href="https://www.linkedin.com/in/yash-gaikwad-a0969833b" 
                target="_blank" 
                rel="noreferrer" 
                className="footer-social-link"
              >
                <TypewriterText 
                  text="LINKEDIN" 
                  inView={isInView} 
                  baseDelay={1.15} 
                  charSpeed={0.026} 
                />
              </a>

              <a 
                href="https://www.instagram.com/yashgaikwad7_" 
                target="_blank" 
                rel="noreferrer" 
                className="footer-social-link"
              >
                <TypewriterText 
                  text="INSTAGRAM" 
                  inView={isInView} 
                  baseDelay={1.25} 
                  charSpeed={0.026} 
                />
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
