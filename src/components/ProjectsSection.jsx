import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, 
  Lock, 
  ExternalLink, 
  Check, 
  Sparkles,
  Layers,
  Code2
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { PROJECTS_DATA } from '../data/projectsData';
import '../styles/projects.css';

// Interactive 3D Browser Window Component
function BrowserMockup({ project }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Smooth, restrained tilt (max ±5 degrees)
    const rotX = -((y - centerY) / centerY) * 5;
    const rotY = ((x - centerX) / centerX) * 5;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <div 
      className="browser-perspective-wrapper"
      style={{ perspective: 1100 }}
    >
      <motion.div
        ref={cardRef}
        className="browser-mockup-frame"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.015 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 280,
          damping: 24,
          mass: 0.6,
        }}
        style={{
          '--project-accent': project.accentColor,
        }}
      >
        <a 
          href={project.liveUrl} 
          target="_blank" 
          rel="noreferrer" 
          className="browser-anchor-wrap"
          aria-label={`Open live preview for ${project.title}`}
        >
          {/* ================= Mac-Style Browser Chrome Header ================= */}
          <div className="browser-chrome-bar">
            {/* Window Traffic Lights */}
            <div className="browser-traffic-lights">
              <span className="traffic-dot dot-close" />
              <span className="traffic-dot dot-minimize" />
              <span className="traffic-dot dot-expand" />
            </div>

            {/* Address Bar */}
            <div className="browser-address-pill">
              <Lock size={11} className="address-lock-icon" />
              <span className="address-domain-text">{project.browserDisplayUrl}</span>
              <ExternalLink size={10} className="address-launch-icon" />
            </div>

            {/* Right Status Badge */}
            <div className="browser-chrome-end">
              <span className="chrome-status-dot" style={{ backgroundColor: project.accentColor }} />
              <span className="chrome-status-text">SSL Active</span>
            </div>
          </div>

          {/* ================= Main Viewport Screen ================= */}
          <div 
            className="browser-screen-viewport"
            style={{ background: project.fallbackGradient }}
          >
            <img 
              src={project.image} 
              alt={`${project.title} landing page UI screenshot`} 
              loading="lazy"
              className="browser-screenshot-img"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />

            {/* Subtle Gradient Overlay for depth */}
            <div className="browser-screen-scrim" />

            {/* Floating Live Preview Pill on Hover */}
            <div className={`browser-hover-pill ${isHovered ? 'visible' : ''}`}>
              <span>Open Live Demo</span>
              <ArrowUpRight size={14} />
            </div>
          </div>
        </a>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects-section" className="projects-section bg-grid-pattern">
      <div className="projects-container">
        
        {/* ================= Section Header Row ================= */}
        <motion.div 
          className="projects-header-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="projects-title-group">
            <span className="projects-eyebrow">
              <span className="projects-eyebrow-dot" />
              03 / FEATURED WORK
            </span>
            <h2 className="projects-heading">
              Selected Works. <br />
              <span className="gradient-text">Crafted with Precision &amp; Speed.</span>
            </h2>
          </div>

          <p className="projects-header-subtitle">
            Full-stack architectures, high-performance web systems, and tactile digital products built from first principles.
          </p>
        </motion.div>

        {/* ================= Kinetic Sticky Stack Showcase ================= */}
        <div className="projects-stack-deck">
          {PROJECTS_DATA.map((project, index) => {
            return (
              <motion.article 
                key={project.id}
                className="project-deck-card"
                style={{
                  '--card-index': index,
                  '--project-accent': project.accentColor,
                  top: `calc(5.5rem + ${index * 14}px)`,
                }}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="project-card-inner-grid">

                  {/* Left Column: Project Editorial Dossier */}
                  <div className="project-dossier-col">
                    
                    {/* Index & Category Meta */}
                    <div className="project-meta-kicker">
                      <span className="project-kicker-number" style={{ color: project.accentColor }}>
                        {project.number}
                      </span>
                      <span className="divider-bar">|</span>
                      <span className="project-kicker-cat">{project.category}</span>
                      <span className="divider-bar">|</span>
                      <span className="project-status-badge">
                        <span className="status-live-dot" style={{ backgroundColor: project.accentColor }} />
                        <span>{project.status}</span>
                      </span>
                    </div>

                    {/* Project Title & Tagline */}
                    <div className="project-naming-block">
                      <h3 className="project-card-title">{project.title}</h3>
                      <p className="project-card-tagline">{project.tagline}</p>
                    </div>

                    {/* Detailed Overview */}
                    <p className="project-card-desc">{project.description}</p>

                    {/* Key Architectural Highlights */}
                    <div className="project-highlights-box">
                      <span className="highlights-box-label">ENGINEERING HIGHLIGHTS</span>
                      <ul className="project-highlights-list">
                        {project.highlights.map((highlight, hIdx) => (
                          <li key={hIdx} className="highlight-item">
                            <span className="highlight-icon-wrap" style={{ color: project.accentColor }}>
                              <Check size={13} strokeWidth={2.8} />
                            </span>
                            <span className="highlight-text">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Minimal Metrics Row */}
                    <div className="minimal-divided-row project-metrics-row">
                      {project.metrics.split('  |  ').map((metric, mIdx, arr) => (
                        <span key={mIdx}>
                          <span className="metric-text-val">{metric}</span>
                          {mIdx < arr.length - 1 && <span className="divider-bar">|</span>}
                        </span>
                      ))}
                    </div>

                    {/* Minimal Tech Stack Row */}
                    <div className="project-tech-stack-row">
                      <span className="tech-stack-label">STACK:</span>
                      <div className="minimal-divided-row">
                        {project.techStack.map((tech, tIdx) => (
                          <span key={tIdx}>
                            <span className="tech-item-name">{tech}</span>
                            {tIdx < project.techStack.length - 1 && <span className="divider-bar">|</span>}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Dual Action CTA Buttons */}
                    <div className="project-cta-actions">
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="project-btn-primary"
                      >
                        <span>View Live Demo</span>
                        <ArrowUpRight size={15} />
                      </a>

                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="project-btn-ghost"
                      >
                        <GithubIcon size={15} />
                        <span>Source Code</span>
                      </a>
                    </div>

                  </div>

                  {/* Right Column: 3D Interactive Browser Viewport */}
                  <div className="project-viewport-col">
                    <BrowserMockup project={project} />
                  </div>

                </div>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
