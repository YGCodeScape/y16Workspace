import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Lock, ExternalLink } from 'lucide-react';
import { GithubIcon } from './Icons';
import { PROJECTS_DATA } from '../data/projectsData';
import '../styles/projects.css';

// ─── Featured 3D Browser Mockup (Desktop Sticky Stack) ───────────────────────
function BrowserMockup({ project }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    setRotateX(-((e.clientY - rect.top - cy) / cy) * 5);
    setRotateY(((e.clientX - rect.left - cx) / cx) * 5);
  };

  return (
    <div className="browser-perspective-wrapper" style={{ perspective: 1100 }}>
      <motion.div
        ref={cardRef}
        className="browser-mockup-frame"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setRotateX(0);
          setRotateY(0);
          setIsHovered(false);
        }}
        animate={{ rotateX, rotateY, scale: isHovered ? 1.015 : 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.6 }}
      >
        <a 
          href={project.liveUrl} 
          target="_blank" 
          rel="noreferrer" 
          className="browser-anchor-wrap"
          aria-label={`Open live preview for ${project.title}`}
        >
          {/* Chrome Bar */}
          <div className="browser-chrome-bar">
            <div className="browser-traffic-lights">
              <span className="traffic-dot dot-close" />
              <span className="traffic-dot dot-minimize" />
              <span className="traffic-dot dot-expand" />
            </div>
            <div className="browser-address-pill">
              <Lock size={11} className="address-lock-icon" />
              <span className="address-domain-text">{project.browserDisplayUrl}</span>
              <ExternalLink size={10} className="address-launch-icon" />
            </div>
            <div className="browser-chrome-end">
              <span className="chrome-status-dot" style={{ backgroundColor: project.accentColor }} />
              <span className="chrome-status-text">SSL Active</span>
            </div>
          </div>

          {/* Screen Viewport */}
          <div className="browser-screen-viewport" style={{ background: project.fallbackGradient }}>
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              loading="lazy"
              decoding="async"
              className="browser-screenshot-img"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="browser-screen-scrim" />
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

// ─── All-Projects Auto-Scroll Strip Frame ─────────────────────────────────────
function ScrollFrame({ project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`scroll-frame ${hovered ? 'scroll-frame--hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setHovered((prev) => !prev)}
    >
      {/* Browser Chrome Header */}
      <div className="scroll-frame-chrome">
        <div className="scroll-frame-lights">
          <span className="sf-dot sf-close" />
          <span className="sf-dot sf-min" />
          <span className="sf-dot sf-max" />
        </div>
        <div className="scroll-frame-url">
          <Lock size={9} style={{ color: project.accentColor, flexShrink: 0 }} />
          <span>{project.browserDisplayUrl}</span>
        </div>
      </div>

      {/* Screen Viewport */}
      <div className="scroll-frame-screen" style={{ background: project.fallbackGradient }}>
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          draggable="false"
          className="scroll-frame-img"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="scroll-frame-scrim" />

        {/* Project Title Strip (Visible by default) */}
        <div className="scroll-frame-label">
          <span className="scroll-frame-num" style={{ color: project.accentColor }}>
            {project.number}
          </span>
          <span className="scroll-frame-name">{project.title}</span>
        </div>

        {/* Hover/Tap Overlay with CTAs */}
        <div className="scroll-frame-overlay">
          <p className="scroll-frame-tagline">{project.tagline}</p>
          <div className="scroll-frame-ctas">
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="sf-btn sf-btn--primary"
              onClick={(e) => e.stopPropagation()}
            >
              <span>View Live</span>
              <ArrowUpRight size={13} />
            </a>
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="sf-btn sf-btn--ghost"
              onClick={(e) => e.stopPropagation()}
            >
              <GithubIcon size={13} />
              <span>Repo</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 3D Horizontal Gallery (Autoscroll + Hold & Drag on PC + Touch Swipe on Mobile) ──
function AutoScrollGallery() {
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const xRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const autoPausedRef = useRef(false);
  const isInertiaRef = useRef(false);
  const velRef = useRef(0);
  const hasMovedRef = useRef(false);
  const dragStartX = useRef(0);
  const dragStartY = useRef(0);
  const scrollStartX = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const resumeTimerRef = useRef(null);
  const isHorizontalSwipe = useRef(null);

  const AUTO_SPEED = 3.2;

  const normalizeX = (val, half) => {
    if (half <= 0) return 0;
    let v = val % half;
    if (v < 0) v += half;
    return v;
  };

  const renderPosition = () => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${xRef.current}px)`;
    }
  };

  const scheduleAutoResume = (delay = 700) => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      if (!isDraggingRef.current && !isHoveredRef.current && !isInertiaRef.current) {
        autoPausedRef.current = false;
      }
    }, delay);
  };

  const startInertia = () => {
    let vel = velocityRef.current * 16;
    const MAX_VEL = 28;
    if (vel > MAX_VEL) vel = MAX_VEL;
    if (vel < -MAX_VEL) vel = -MAX_VEL;

    if (Math.abs(vel) > 0.5) {
      velRef.current = vel;
      isInertiaRef.current = true;
    } else {
      isInertiaRef.current = false;
      scheduleAutoResume(600);
    }
  };

  // Main RAF loop: smooth continuous autoscroll & inertia glide
  useEffect(() => {
    let animId;

    const tick = () => {
      const el = trackRef.current;
      if (el) {
        const half = el.scrollWidth / 2;

        if (isInertiaRef.current) {
          velRef.current *= 0.94;
          if (Math.abs(velRef.current) < 0.2) {
            isInertiaRef.current = false;
            scheduleAutoResume(600);
          } else if (half > 0) {
            xRef.current = normalizeX(xRef.current + velRef.current, half);
            renderPosition();
          }
        } else if (!isDraggingRef.current && !isHoveredRef.current && !autoPausedRef.current) {
          if (half > 0) {
            xRef.current = normalizeX(xRef.current + AUTO_SPEED, half);
            renderPosition();
          }
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animId);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  // PC: Hold and Drag (mousedown + mousemove + mouseup)
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    isInertiaRef.current = false;
    autoPausedRef.current = true;
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    dragStartX.current = e.clientX;
    scrollStartX.current = xRef.current;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;

    stageRef.current?.classList.add('is-dragging');

    const onMouseMove = (moveEvent) => {
      if (!isDraggingRef.current) return;
      const dx = dragStartX.current - moveEvent.clientX;
      if (Math.abs(dx) > 4) {
        hasMovedRef.current = true;
      }
      const el = trackRef.current;
      if (!el) return;
      const half = el.scrollWidth / 2;
      xRef.current = normalizeX(scrollStartX.current + dx, half);
      renderPosition();

      const now = performance.now();
      const dt = now - lastTimeRef.current;
      if (dt > 10) {
        velocityRef.current = (lastXRef.current - moveEvent.clientX) / dt;
        lastXRef.current = moveEvent.clientX;
        lastTimeRef.current = now;
      }
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      stageRef.current?.classList.remove('is-dragging');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);

      if (hasMovedRef.current) {
        startInertia();
        setTimeout(() => {
          hasMovedRef.current = false;
        }, 80);
      } else {
        scheduleAutoResume(600);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  // Mobile: Single Touch Horizontal Swipe (preserves normal vertical page scrolling)
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const onTouchStart = (e) => {
      isInertiaRef.current = false;
      autoPausedRef.current = true;
      isDraggingRef.current = true;
      hasMovedRef.current = false;
      const touch = e.touches[0];
      dragStartX.current = touch.clientX;
      dragStartY.current = touch.clientY;
      scrollStartX.current = xRef.current;
      lastXRef.current = touch.clientX;
      lastTimeRef.current = performance.now();
      velocityRef.current = 0;
      isHorizontalSwipe.current = null;
    };

    const onTouchMove = (e) => {
      if (!isDraggingRef.current) return;
      const touch = e.touches[0];
      const dx = dragStartX.current - touch.clientX;
      const dy = dragStartY.current - touch.clientY;

      if (isHorizontalSwipe.current === null) {
        if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
          isHorizontalSwipe.current = Math.abs(dx) > Math.abs(dy);
        }
      }

      if (isHorizontalSwipe.current === false) {
        return;
      }

      if (isHorizontalSwipe.current === true) {
        if (e.cancelable) e.preventDefault();
        if (Math.abs(dx) > 4) {
          hasMovedRef.current = true;
        }
        const el = trackRef.current;
        if (!el) return;
        const half = el.scrollWidth / 2;
        xRef.current = normalizeX(scrollStartX.current + dx, half);
        renderPosition();

        const now = performance.now();
        const dt = now - lastTimeRef.current;
        if (dt > 10) {
          velocityRef.current = (lastXRef.current - touch.clientX) / dt;
          lastXRef.current = touch.clientX;
          lastTimeRef.current = now;
        }
      }
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
      if (isHorizontalSwipe.current && hasMovedRef.current) {
        startInertia();
        setTimeout(() => {
          hasMovedRef.current = false;
        }, 80);
      } else {
        scheduleAutoResume(800);
      }
      isHorizontalSwipe.current = null;
    };

    stage.addEventListener('touchstart', onTouchStart, { passive: true });
    stage.addEventListener('touchmove', onTouchMove, { passive: false });
    stage.addEventListener('touchend', onTouchEnd, { passive: true });
    stage.addEventListener('touchcancel', onTouchEnd, { passive: true });

    return () => {
      stage.removeEventListener('touchstart', onTouchStart);
      stage.removeEventListener('touchmove', onTouchMove);
      stage.removeEventListener('touchend', onTouchEnd);
      stage.removeEventListener('touchcancel', onTouchEnd);
    };
  }, []);

  const doubled = [...PROJECTS_DATA, ...PROJECTS_DATA];

  return (
    <div
      ref={stageRef}
      className="autoscroll-stage"
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
        scheduleAutoResume(300);
      }}
      onMouseDown={handleMouseDown}
      onClickCapture={(e) => {
        if (hasMovedRef.current) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    >
      <div className="autoscroll-3d-wrapper">
        <div ref={trackRef} className="autoscroll-track">
          {doubled.map((project, i) => (
            <ScrollFrame key={`${project.id}-${i}`} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Projects Section ───────────────────────────────────────────────────
export default function ProjectsSection() {
  const FEATURED = PROJECTS_DATA.slice(0, 4);

  return (
    <section id="projects-section" className="projects-section bg-grid-pattern">
      <div className="projects-container">

        {/* Section Header */}
        <motion.div
          className="projects-header-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="projects-title-group">
            <h2 className="projects-heading">
              Selected Works. <br />
              <span className="gradient-text">Crafted with Precision</span>
            </h2>
          </div>
        </motion.div>

        {/* Desktop Featured Sticky Stack (Top 3 Projects — Hidden on Mobile) */}
        <div className="projects-stack-deck">
          {FEATURED.map((project, index) => (
            <motion.article
              key={project.id}
              className="project-deck-card"
              style={{
                '--project-accent': project.accentColor,
                '--card-index': index,
                top: `calc(5.5rem + ${index * 24}px)`,
                zIndex: index + 1,
              }}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="project-card-inner-grid">

                {/* Left: Project Dossier */}
                <div className="project-dossier-col">
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

                  <div className="project-naming-block">
                    <h3 className="project-card-title">{project.title}</h3>
                    <p className="project-card-tagline">{project.tagline}</p>
                  </div>

                  <p className="project-card-desc">{project.description}</p>

                  <div className="project-stack-group">
                    <span className="stack-group-label">STACK:</span>
                    <div className="project-chips-wrapper">
                      {project.techStack.map((tech, i) => (
                        <span key={i} className="project-half-rounded-chip">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="project-cta-actions">
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="project-btn-primary">
                      <span>View Live Demo</span>
                      <ArrowUpRight size={15} />
                    </a>
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="project-btn-ghost">
                      <GithubIcon size={15} />
                      <span>Source Code</span>
                    </a>
                  </div>
                </div>

                {/* Right: 3D Viewport Frame */}
                <div className="project-viewport-col">
                  <BrowserMockup project={project} />
                </div>

              </div>
            </motion.article>
          ))}
        </div>

      </div>

      {/* All Projects 3D Auto-Scroll Strip (Featured on both Mobile and Desktop) */}
      <div className="all-projects-strip">
        <div className="all-projects-strip-header">
          <span className="strip-eyebrow">ALL PROJECTS</span>
          <span className="strip-count">{PROJECTS_DATA.length} works</span>
        </div>
        <AutoScrollGallery />
      </div>

    </section>
  );
}
