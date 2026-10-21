import { useState, useRef } from 'react';
import SkillIcon from './SkillIcons';

export default function HexagonCard({ skill }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // SVG Circular progress math (radius = 36)
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (skill.percentage / 100) * circumference;

  const handleMouseEnter = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    cardRef.current.style.setProperty('--mx', `${x}px`);
    cardRef.current.style.setProperty('--my', `${y}px`);
    setIsHovered(true);
  };

  const handleMouseLeave = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    cardRef.current.style.setProperty('--mx', `${x}px`);
    cardRef.current.style.setProperty('--my', `${y}px`);
    setIsHovered(false);
  };

  const handleClick = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    cardRef.current.style.setProperty('--mx', `${x}px`);
    cardRef.current.style.setProperty('--my', `${y}px`);
    setIsHovered((prev) => !prev);
  };

  return (
    <div
      ref={cardRef}
      className={`hex-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        '--card-accent': skill.color,
      }}
      role="button"
      tabIndex={0}
      aria-label={`${skill.name} - ${skill.percentage}%`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsHovered((prev) => !prev);
        }
      }}
    >
      {/* ================= Front Face ================= */}
      <div className="hex-face hex-face-front">
        {/* Minimalist Top Diamond Glyph */}
        <div className="hex-top-accent">
          <span className="hex-diamond-glyph" style={{ color: skill.color }}>❖</span>
        </div>

        {/* Centered Branded Tech Logo / Icon */}
        <div className="hex-icon-container">
          <SkillIcon type={skill.iconType} size={46} color={skill.color} />
        </div>

        {/* Skill Name in Clean Typography */}
        <h3 className="hex-skill-name">{skill.name}</h3>
      </div>

      {/* ================= Back Face (Directional Circular Overlay) ================= */}
      <div className="hex-face hex-face-back">
        <div className="hex-back-content">
          {/* Sleek Fine-Gauge Circular Meter */}
          <div className="hex-circle-meter">
            <svg className="meter-svg" viewBox="0 0 100 100">
              {/* Background Track Circle */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="meter-circle-bg"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="3.5"
                fill="none"
              />
              {/* Animated Progress Circle Fill */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="meter-circle-fill"
                stroke="#FFFFFF"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                transform="rotate(-90 50 50)"
              />
            </svg>

            {/* Percentage Centered Inside Circle */}
            <div className="meter-percentage-center">
              <span className="meter-val">{skill.percentage}</span>
              <span className="meter-unit">%</span>
            </div>
          </div>

          {/* Minimalist Skill Name Label */}
          <span className="hex-back-label">{skill.name}</span>
        </div>
      </div>

      {/* Minimal Hairline Hexagon Border SVG (Topmost Layer) */}
      <svg className="hex-border-svg" viewBox="0 0 100 115.47" preserveAspectRatio="none">
        <polygon
          points="50,1.5 98.5,29.5 98.5,85.5 50,113.5 1.5,85.5 1.5,29.5"
          fill="none"
          className="hex-polygon-stroke"
        />
      </svg>
    </div>
  );
}
