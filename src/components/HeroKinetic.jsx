import { useState, useMemo, useRef, useCallback } from 'react';
import { ArrowRight, ArrowDown, Sparkles, RotateCcw } from 'lucide-react';
import '../styles/hero.css';

const COOLORS_PALETTE = [
  '#00D084', // Mint / Emerald Green
  '#FF3366', // Hot Coral Pink
  '#00B4D8', // Electric Cyan
  '#FFB800', // Marigold Amber
  '#FF6B35', // Warm Tangerine
  '#7928CA', // Royal Purple
  '#2563EB', // Cobalt Blue
  '#EC4899', // Vivid Fuchsia
  '#10B981', // Neon Green
];

const NOTE_TEXT = "Hi, I’m Yash R. Gaikwad. I don’t just write code I build fast, engaging, and memorable web experiences. I'm ready to tackle challenges and deliver impact from day one.";

// Split into words so wrapping is natural and responsive
const WORDS = NOTE_TEXT.split(' ');

// Static constant: total non-space characters
const TOTAL_LETTERS = NOTE_TEXT.replace(/\s+/g, '').length;

export default function HeroKinetic({ onOpenContact }) {
  // Map of charIndex -> { revealed: bool, activeColor: string | null, tilt: number, isHovered: bool }
  const [letterStates, setLetterStates] = useState({});
  const containerRef = useRef(null);

  // Derived state during render (100% React 19 pure render compliant)
  const revealedCount = useMemo(() => {
    return Object.values(letterStates).filter((s) => s?.revealed).length;
  }, [letterStates]);

  const isFullyRevealed = TOTAL_LETTERS > 0 && revealedCount >= TOTAL_LETTERS;
  const hasStartedRevealing = revealedCount > 0;

  // Trigger reveal on a specific letter
  const triggerLetter = useCallback((charIndex) => {
    setLetterStates((prev) => {
      const existing = prev[charIndex];

      // Pick a random vibrant color from Coolors palette
      const randomColor = COOLORS_PALETTE[Math.floor(Math.random() * COOLORS_PALETTE.length)];
      // Playful tilt between -3.5° and +3.5°
      const tilt = (Math.random() * 7 - 3.5).toFixed(1);

      if (existing?.timerId) {
        clearTimeout(existing.timerId);
      }

      // Transition to black after 650ms
      const timerId = setTimeout(() => {
        setLetterStates((current) => {
          if (!current[charIndex]) return current;
          return {
            ...current,
            [charIndex]: {
              ...current[charIndex],
              isHovered: false,
              activeColor: null, // settles back to black
              tilt: 0,
            },
          };
        });
      }, 650);

      return {
        ...prev,
        [charIndex]: {
          revealed: true,
          activeColor: randomColor,
          tilt: tilt,
          isHovered: true,
          timerId: timerId,
        },
      };
    });
  }, []);

  // Desktop sweep cursor tracking across letters
  const handleMouseMoveContainer = (e) => {
    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (el && el.dataset && el.dataset.charIndex !== undefined) {
      const charIndex = parseInt(el.dataset.charIndex, 10);
      triggerLetter(charIndex);
    }
  };

  // Mobile finger sweep / touch tracking across letters
  const handleTouchMoveContainer = (e) => {
    if (e.touches && e.touches.length > 0) {
      const touch = e.touches[0];
      const el = document.elementFromPoint(touch.clientX, touch.clientY);
      if (el && el.dataset && el.dataset.charIndex !== undefined) {
        const charIndex = parseInt(el.dataset.charIndex, 10);
        triggerLetter(charIndex);
      }
    }
  };

  const handleTouchStartContainer = (e) => {
    if (e.touches && e.touches.length > 0) {
      const touch = e.touches[0];
      const el = document.elementFromPoint(touch.clientX, touch.clientY);
      if (el && el.dataset && el.dataset.charIndex !== undefined) {
        const charIndex = parseInt(el.dataset.charIndex, 10);
        triggerLetter(charIndex);
      }
    }
  };

  // Reveal all letters sequentially with color wave
  const handleRevealAll = () => {
    let globalCharIndex = 0;
    let delay = 0;

    for (let w = 0; w < WORDS.length; w++) {
      const word = WORDS[w];
      for (let c = 0; c < word.length; c++) {
        const targetIdx = globalCharIndex;
        setTimeout(() => {
          triggerLetter(targetIdx);
        }, delay);
        delay += 12; // fast wave effect
        globalCharIndex++;
      }
    }
  };

  // Reset note back to initial blank state
  const handleReset = () => {
    setLetterStates({});
  };

  // Track global index while mapping words
  let charCounter = 0;

  return (
    <section 
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMoveContainer}
      onTouchMove={handleTouchMoveContainer}
      onTouchStart={handleTouchStartContainer}
      className="bg-grid-pattern no-select hero-kinetic-section"
    >
      {/* Floating Directional Arrow Indicator */}
      <div className={`hero-guide-arrow ${hasStartedRevealing ? 'revealing' : ''}`}>
        <div className="hero-arrow-icon animate-arrow-nudge">
          <ArrowRight size={18} strokeWidth={2.5} />
        </div>
        <div className="hero-arrow-pill">
          <span>Swipe or hover here</span>
          <span className="hero-arrow-symbol">➜</span>
        </div>
      </div>

      {/* Main Interactive Single Note Block */}
      <div className="hero-note-container">
        {WORDS.map((word, wordIndex) => {
          return (
            <span key={wordIndex} className="hero-word">
              {Array.from(word).map((char) => {
                const charIndex = charCounter++;
                const state = letterStates[charIndex];
                const isRevealed = !!state?.revealed;
                const currentColor = state?.activeColor || '#0A0A0A';
                const tilt = state?.tilt || 0;
                const isHovered = !!state?.isHovered;

                return (
                  <span
                    key={charIndex}
                    data-char-index={charIndex}
                    onMouseEnter={() => triggerLetter(charIndex)}
                    onTouchStart={() => triggerLetter(charIndex)}
                    className={`hero-char ${isRevealed ? 'revealed' : ''} ${isHovered ? 'hovered' : ''}`}
                    style={{
                      '--char-color': currentColor,
                      '--char-tilt': `${tilt}deg`,
                    }}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
          );
        })}
      </div>

      {/* Small Bottom Center Chip: Explore Me */}
      <a 
        href="#about-section" 
        className="hero-explore-chip" 
        aria-label="Explore About Me"
        onClick={(e) => {
          e.preventDefault();
          const target = document.getElementById('about-section');
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <span>explore me</span>
        <ArrowDown size={13} strokeWidth={2.4} className="hero-explore-chip-arrow" />
      </a>

      {/* Single Bottom Right Button: Reveal All / Reset Note */}
      <div className={`hero-bottom-action ${hasStartedRevealing ? 'active' : ''}`}>
        <button
          onClick={isFullyRevealed ? handleReset : handleRevealAll}
          id="btn-reveal-all"
          className="hero-reveal-btn"
        >
          {isFullyRevealed ? (
            <>
              <RotateCcw size={15} strokeWidth={2.4} />
              <span>Start fresh</span>
            </>
          ) : (
            <>
              <Sparkles size={15} strokeWidth={2.4} />
              <span>Light it up</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
}
