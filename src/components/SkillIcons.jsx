import { ChessComIcon, FigmaIcon, GithubIcon } from './Icons';
import { 
  Database,
  BrainCircuit,
  Sparkles,
  Music
} from 'lucide-react';

export default function SkillIcon({ type, size = 48, color = 'currentColor' }) {
  switch (type) {
    case 'html':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          {/* Official HTML5 Shield */}
          <path d="M4 2.5L5.6 20.5L12 22.3L18.4 20.5L20 2.5H4Z" fill="#E44D26" />
          <path d="M12 20.6L17.1 19.2L18.4 4.1H12V20.6Z" fill="#F16529" />
          <path d="M12 8.3H8.3L8.6 11.2H12V8.3Z" fill="#EBEBEB" />
          <path d="M12 14.1L12 14L9.9 13.5L9.8 11.9H7.6L7.9 15.6L12 16.7V14.1Z" fill="#EBEBEB" />
          <path d="M12 8.3V11.2H15.4L15.1 14.1L12 15V16.7L16.1 15.6L16.6 8.3H12Z" fill="#FFFFFF" />
        </svg>
      );

    case 'css':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          {/* Official CSS3 Shield */}
          <path d="M4 2.5L5.6 20.5L12 22.3L18.4 20.5L20 2.5H4Z" fill="#1572B6" />
          <path d="M12 20.6L17.1 19.2L18.4 4.1H12V20.6Z" fill="#33A9DC" />
          <path d="M12 8.3H8.3L8.6 11.2H12V8.3Z" fill="#EBEBEB" />
          <path d="M12 14.1L12 14L9.9 13.5L9.8 11.9H7.6L7.9 15.6L12 16.7V14.1Z" fill="#EBEBEB" />
          <path d="M15.7 8.3H12V11.2H14.4L14.1 14.1L12 15V16.7L16.1 15.6L16.6 8.3H15.7Z" fill="#FFFFFF" />
        </svg>
      );

    case 'react':
      return (
        <svg width={size} height={size} viewBox="-11.5 -10.23174 23 20.46348" fill="none">
          <circle cx="0" cy="0" r="2.05" fill="#00D8FF" />
          <g stroke="#00D8FF" strokeWidth="1.1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );

    case 'javascript':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          {/* Official JS Yellow Square */}
          <rect width="22" height="22" x="1" y="1" rx="3.5" fill="#F7DF1E" />
          <path d="M6.5 16.8c.8.9 1.9 1.4 3.1 1.4 1.8 0 2.6-1 2.6-2.6V8h-2.5v7.2c0 .6-.2 1-.8 1-.5 0-.8-.3-1.1-.7l-1.3 1.3z" fill="#000000" />
          <path d="M14.5 16.8c1 .9 2.2 1.4 3.5 1.4 2 0 3.2-1 3.2-2.7 0-1.6-1-2.2-2.4-2.8l-.8-.3c-.8-.3-1.2-.6-1.2-1.2 0-.6.5-1.1 1.4-1.1.9 0 1.6.4 2.1.9l1.1-1.2c-.8-.8-1.9-1.2-3.2-1.2-2 0-3.1 1.1-3.1 2.6 0 1.5.9 2.2 2.3 2.8l.8.3c.9.4 1.3.7 1.3 1.3 0 .7-.6 1.2-1.6 1.2-1.1 0-2-.5-2.6-1.3l-1.5 1.2z" fill="#000000" />
        </svg>
      );

    case 'nodejs':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          {/* Official Node.js Hexagon */}
          <path d="M16 2.5L28 9.5V22.5L16 29.5L4 22.5V9.5L16 2.5Z" fill="#339933" />
          <path d="M16 6.5L24.5 11.5V19.5L16 24.5L7.5 19.5V11.5L16 6.5Z" fill="#FFFFFF" />
          <path d="M13.5 12V20H15.5V14.5L18.5 20H20.5V12H18.5V17.5L15.5 12H13.5Z" fill="#339933" />
        </svg>
      );

    case 'typescript':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect width="22" height="22" x="1" y="1" rx="3.5" fill="#3178C6" />
          <path d="M6 9h6v2H9.5v7h-2.2v-7H6V9z" fill="#FFFFFF" />
          <path d="M13.5 16.2c.8.6 1.7.9 2.6.9 1.4 0 2.2-.7 2.2-1.8 0-1-.6-1.5-1.8-1.9l-.7-.3c-1.3-.5-2-1.1-2-2.3 0-1.6 1.3-2.7 3.3-2.7 1.2 0 2.1.3 2.8.8l-.7 1.6c-.6-.4-1.3-.7-2.1-.7-1 0-1.6.5-1.6 1.2 0 .8.5 1.2 1.6 1.6l.7.3c1.6.6 2.3 1.3 2.3 2.6 0 1.8-1.4 2.8-3.6 2.8-1.4 0-2.5-.4-3.3-1l.6-1.5z" fill="#FFFFFF" />
        </svg>
      );

    case 'nextjs':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" fill="#000000" />
          <path d="M8 8v8l8-9v8" stroke="#FFFFFF" />
        </svg>
      );

    case 'tailwind':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M12 6c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5 1 .2 1.7.9 2.4 1.7C14.2 11.4 15.6 13 19 13c2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-1-.2-1.7-.9-2.4-1.7C17 7.6 15.6 6 12 6zM5 13c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5 1 .2 1.7.9 2.4 1.7C7.2 18.4 8.6 20 12 20c2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-1-.2-1.7-.9-2.4-1.7C10 14.6 8.6 13 5 13z" fill="#38BDF8" />
        </svg>
      );

    case 'git':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M2.6 10.6L10.6 2.6c.8-.8 2-.8 2.8 0l8 8c.8.8.8 2 0 2.8l-8 8c-.8.8-2 .8-2.8 0l-8-8c-.8-.8-.8-2 0-2.8z" fill="#F05032" />
          <circle cx="12" cy="12" r="2.2" fill="#FFFFFF" />
          <circle cx="16.5" cy="7.5" r="2.2" fill="#FFFFFF" />
          <path d="M12 12V6.5" stroke="#FFFFFF" strokeWidth="1.5" />
        </svg>
      );

    case 'vite':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <path d="M29.5 5.5L16.8 29.2c-.3.6-1.2.6-1.5 0L2.5 5.5c-.4-.7.1-1.5.9-1.5h25.2c.8 0 1.3.8.9 1.5z" fill="#BD34FE" />
          <path d="M21.5 4L16 15.5l3.5 1L12.5 25.5 14.5 16l-3.5-1L18.5 4h3z" fill="#FFD62E" />
        </svg>
      );

    case 'python':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M11.9 2c-3.3 0-5.4.7-5.4 3.2v2.3h5.5v.8H4.6C2.1 8.3 1 10.3 1 13.5c0 3.3 1.8 5.1 4.7 5.1h1.7v-2.4c0-2.3 2-4.3 4.4-4.3h5.4v-.8c0-3.2-1.9-5.1-5.3-5.1zm-1.8 1.9c.7 0 1.2.6 1.2 1.2s-.6 1.2-1.2 1.2-1.2-.5-1.2-1.2.5-1.2 1.2-1.2z" fill="#387EB8" />
          <path d="M12.1 22c3.3 0 5.4-.7 5.4-3.2v-2.3H12v-.8h7.4c2.5 0 3.6-2 3.6-5.2 0-3.3-1.8-5.1-4.7-5.1h-1.7v2.4c0 2.3-2 4.3-4.4 4.3H6.8v.8c0 3.2 1.9 5.1 5.3 5.1zm1.8-1.9c-.7 0-1.2-.6-1.2-1.2s.6-1.2 1.2-1.2 1.2.5 1.2 1.2-.5 1.2-1.2 1.2z" fill="#FFE052" />
        </svg>
      );

    case 'api':
      return <Database size={size} color="#FF3366" strokeWidth={2} />;

    case 'figma':
      return <FigmaIcon size={size} color={color} />;

    case 'chess':
      return <ChessComIcon size={size} color="#00D084" />;

    case 'creative':
      return <Sparkles size={size} color="#7928CA" strokeWidth={2.2} />;

    case 'music':
      return <Music size={size} color="#FF3366" strokeWidth={2.2} />;

    case 'problem':
      return <BrainCircuit size={size} color="#FF6B35" strokeWidth={2.2} />;

    default:
      return <Sparkles size={size} color={color} strokeWidth={2} />;
  }
}
