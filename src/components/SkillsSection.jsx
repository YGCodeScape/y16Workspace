import { useState, useMemo, useRef, useEffect } from 'react';
import { SKILLS_DATA } from '../data/skillsData';
import HexagonCard from './HexagonCard';
import { 
  Rocket, 
  Sparkles, 
  RotateCcw,
  Search,
  X
} from 'lucide-react';
import '../styles/skills.css';

export default function SkillsSection({ onOpenContact }) {
  const [searchQuery, setSearchQuery] = useState('');
  const scrollTrackRef = useRef(null);

  // Filter skills based on search term
  const filteredSkills = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return SKILLS_DATA;

    return SKILLS_DATA.filter((skill) => {
      const matchName = skill.name.toLowerCase().includes(query);
      const matchCategory = skill.category.toLowerCase().includes(query);
      const matchTags = skill.tags?.some((t) => t.toLowerCase().includes(query));
      return matchName || matchCategory || matchTags;
    });
  }, [searchQuery]);

  // Distribute skills between Row 1 (top) and Row 2 (bottom)
  // Even index -> Top Row (HTML 5, REACT.JS, etc.)
  // Odd index  -> Bottom Row (CSS, JAVASCRIPT, etc.)
  const topRowSkills = useMemo(() => {
    return filteredSkills.filter((_, idx) => idx % 2 === 0);
  }, [filteredSkills]);

  const bottomRowSkills = useMemo(() => {
    return filteredSkills.filter((_, idx) => idx % 2 === 1);
  }, [filteredSkills]);

  // Check scroll boundary to update button states
  const checkScrollBoundaries = () => {
    const el = scrollTrackRef.current;
    if (!el) return;
  };

  useEffect(() => {
    const el = scrollTrackRef.current;
    if (!el) return;
    checkScrollBoundaries();
    el.addEventListener('scroll', checkScrollBoundaries, { passive: true });
    window.addEventListener('resize', checkScrollBoundaries);
    return () => {
      el.removeEventListener('scroll', checkScrollBoundaries);
      window.removeEventListener('resize', checkScrollBoundaries);
    };
  }, [filteredSkills]);

  const handleClearSearch = () => {
    setSearchQuery('');
    if (scrollTrackRef.current) {
      scrollTrackRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const handleChallengeMe = () => {
    if (onOpenContact) {
      onOpenContact(searchQuery);
    }
  };

  return (
    <section id="skills-section" className="skills-section bg-grid-pattern">
      <div className="skills-container">
        {/* ================= Header Row ================= */}
        <div className="skills-header-row">
          {/* Top Left Title (No eyebrow pill, no subtitle) */}
          <div className="skills-title-group">
            <h2 className="skills-heading">
              Engineered with Precision. <br />
              <span className="gradient-text">Driven by Curiosity.</span>
            </h2>
          </div>

          {/* Top Right Search Bar */}
          <div className="skills-search-wrapper">
            <div className="skills-search-pill-box">
              <Search size={16} className="skills-search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search skills, tools, tags..."
                className="skills-search-pill-input"
                aria-label="Search skills"
                id="skills-search-field"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="skills-search-pill-clear"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ================= Content: Honeycomb or Empty State ================= */}
        {filteredSkills.length === 0 ? (
          /* Recruiter Hunger-To-Learn Empty State */
          <div className="skills-empty-state">
            <div className="empty-badge-icon">
              <Rocket size={28} strokeWidth={2.2} />
            </div>
            <h3 className="empty-state-title">
              Targeting &ldquo;{searchQuery}&rdquo;?
            </h3>
            <p className="empty-state-pitch">
              It&rsquo;s not in my everyday stack yet &mdash; <strong>but that&rsquo;s exactly where my fastest growth happens</strong>. 
              I thrive when dropped into unfamiliar architectures and emerging frameworks. Give me a weekend with the documentation 
              and a real product challenge, and I&rsquo;ll deliver clean, production-ready code.
            </p>

            <div className="empty-highlights-list">
              <div className="empty-highlight-item">
                <span className="bullet-icon">&#10003;</span>
                <span>High learning velocity &amp; zero-ego engineering mindset</span>
              </div>
              <div className="empty-highlight-item">
                <span className="bullet-icon">&#10003;</span>
                <span>Documentation-first, deep first-principles comprehension</span>
              </div>
              <div className="empty-highlight-item">
                <span className="bullet-icon">&#10003;</span>
                <span>From zero to production-tested PR in days, not weeks</span>
              </div>
            </div>

            <div className="empty-state-actions">
              <button onClick={handleChallengeMe} className="empty-challenge-btn" id="btn-challenge-learn">
                <Sparkles size={16} strokeWidth={2.4} />
                <span>Challenge me to learn it</span>
              </button>

              <button onClick={handleClearSearch} className="empty-reset-btn" id="btn-reset-skills-search">
                <RotateCcw size={14} />
                <span>Reset search</span>
              </button>
            </div>
          </div>
        ) : (
          /* ================= Horizontal Scrolling Interlocking Honeycomb ================= */
          <div className="honeycomb-horizontal-scroll-area">
            <div ref={scrollTrackRef} className="honeycomb-scroll-track">
              {/* Row 1 (Top) */}
              <div className="honeycomb-row row-top">
                {topRowSkills.map((skill) => (
                  <HexagonCard key={skill.id} skill={skill} />
                ))}
              </div>

              {/* Row 2 (Bottom - Staggered & Shifted to Interlock) */}
              <div className="honeycomb-row row-bottom">
                {bottomRowSkills.map((skill) => (
                  <HexagonCard key={skill.id} skill={skill} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
