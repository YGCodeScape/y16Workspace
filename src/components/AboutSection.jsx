import { motion } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import '../styles/about.css';

export default function AboutSection() {
  return (
    <section id="about-section" className="about-section bg-grid-pattern">
      <div className="about-container">
        
        {/* ================= Header Row ================= */}
        <motion.div 
          className="about-header-row"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="about-title-group">
            <h2 className="about-heading">
              Behind the Pixels. <br />
              <span className="gradient-text">The Story, Mindset &amp; Craft.</span>
            </h2>
          </div>
        </motion.div>

        {/* ================= Clean Editorial 2-Column Grid ================= */}
        <motion.div 
          className="about-editorial-grid"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Column 1: Story & Self-Learner Mindset */}
          <div className="editorial-col story-col">
            <span className="editorial-kicker">THE STORY &amp; PHILOSOPHY</span>
            
            <h3 className="story-lead-title">
              I treat the web as a canvas for high-precision engineering and tactile motion.
            </h3>

            <div className="story-paragraphs">
              <p>
                Hi, I'm <strong>Yash R. Gaikwad</strong>. I don't believe in static or boring interfaces. I build fast, engaging web applications that react naturally to human touch with sub-second feedback.
              </p>
              <p>
                <strong>Self-Learner at Core:</strong> While formal academics gave me my grounding, my true engineering edge comes from curiosity—reading documentation, inspecting open-source systems, and practicing code daily.
              </p>
            </div>

            <div className="minimal-divided-row story-specs-row">
              <span>Docs-First Learner</span>
              <span className="divider-bar">|</span>
              <span>Project-Based Mastery</span>
              <span className="divider-bar">|</span>
              <span>Daily Practice</span>
            </div>

            <div className="story-action-row">
              <a href="#skills-section" className="about-explore-stack-btn">
                <span>Explore Technical Stack</span>
                <ArrowDownRight size={13} strokeWidth={2.4} className="hero-explore-chip-arrow"  />
              </a>
            </div>
          </div>

          {/* Column 2: Clean Chronological Journey & Education */}
          <div className="editorial-col journey-col">
            <span className="editorial-kicker">EXPERIENCE &amp; CREDENTIALS</span>

            <div className="clean-timeline-list">

              {/* Milestone 1: Internship */}
              <div className="clean-milestone">
                <div className="milestone-badge-row">
                  <span className="milestone-type work">INTERNSHIP</span>
                  <span className="divider-bar">|</span>
                  <span className="milestone-time">3 Months Experience</span>
                </div>
                <h4 className="milestone-title">Full Stack Developer Intern</h4>
                <p className="milestone-desc">
                  Built responsive frontend components, integrated RESTful APIs, and contributed to full-stack features with clean component architecture.
                </p>
                <div className="minimal-divided-row">
                  <span>Full Stack Architecture</span>
                  <span className="divider-bar">|</span>
                  <span>Component Systems</span>
                  <span className="divider-bar">|</span>
                  <span>REST APIs</span>
                </div>
              </div>

              {/* Milestone 2: BCA Degree */}
              <div className="clean-milestone">
                <div className="milestone-badge-row">
                  <span className="milestone-type edu">HIGHER EDUCATION</span>
                  <span className="divider-bar">|</span>
                  <span className="milestone-time">Graduated May 2026</span>
                </div>
                <h4 className="milestone-title">Bachelor of Computer Applications (BCA)</h4>
                <span className="milestone-institute">Tilak Maharashtra Vidyapeeth (TMV), Pune</span>
                <div className="minimal-divided-row score-emphasis-line">
                  <span className="score-val">8.4 CGPA</span>
                  <span className="divider-bar">|</span>
                  <span className="score-val">79% Marks</span>
                  <span className="divider-bar">|</span>
                  <span>Computer Applications</span>
                </div>
              </div>

              {/* Milestone 3: 12th Commerce */}
              <div className="clean-milestone">
                <div className="milestone-badge-row">
                  <span className="milestone-type hsc">FOUNDATIONS</span>
                  <span className="divider-bar">|</span>
                  <span className="milestone-time">HSC Completed</span>
                </div>
                <h4 className="milestone-title">12th Commerce / Higher Secondary</h4>
                <span className="milestone-institute">DVS College of Commerce, Navi Mumbai</span>
                <div className="minimal-divided-row score-emphasis-line">
                  <span className="score-val">60% Score</span>
                  <span className="divider-bar">|</span>
                  <span>Commerce Stream</span>
                </div>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
