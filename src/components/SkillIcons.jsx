import { FigmaIcon } from './Icons';
import { 
  Database,
  BrainCircuit,
  Sparkles
} from 'lucide-react';

// ES Module imports for images to ensure Vite bundles and hashes them cleanly
import reactIcon from '../assets/react-icon.png';
import jsIcon from '../assets/javascript-icon.png';
import nodeIcon from '../assets/nodejs-icon.png';
import tsIcon from '../assets/typeScript-icon.png';
import nextIcon from '../assets/nextJs-icon.png';
import mysqlIcon from '../assets/mysql-icon.png';
import supabaseIcon from '../assets/supabase.png';
import tailwindIcon from '../assets/tailwind-icon.png';
import gitIcon from '../assets/git-icon.png';
import viteIcon from '../assets/vite-icon.png';
import pythonIcon from '../assets/python-icon.png';
import postmanIcon from '../assets/postman-icon.png';

export default function SkillIcon({ type, size = 46, color = 'currentColor' }) {
  switch (type) {
    case 'html':
      return (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          width={size} 
          height={size} 
          fill={color}
          aria-label="HTML5"
        >
          <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
        </svg>
      );

    case 'css':
      return (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          width={size} 
          height={size} 
          fill={color}
          aria-label="CSS3"
        >
          <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z" />
        </svg>
      );

    case 'react':
      return (
        <img 
          src={reactIcon} 
          alt="React.js" 
          width={size} 
          height={size} 
          style={{ objectFit: 'contain' }}
        />
      );

    case 'javascript':
      return (
        <img 
          src={jsIcon} 
          alt="JavaScript" 
          width={size} 
          height={size} 
          style={{ objectFit: 'contain' }}
        />
      );

    case 'nodejs':
      return (
        <img 
          src={nodeIcon} 
          alt="Node.js" 
          width={size} 
          height={size} 
          style={{ objectFit: 'contain' }}
        />
      );

    case 'typescript':
      return (
        <img 
          src={tsIcon} 
          alt="TypeScript" 
          width={size} 
          height={size} 
          style={{ objectFit: 'contain' }}
        />
      );

    case 'nextjs':
      return (
        <img 
          src={nextIcon} 
          alt="Next.js" 
          width={size} 
          height={size} 
          style={{ objectFit: 'contain' }}
        />
      );

    case 'mysql':
      return (
        <img 
          src={mysqlIcon} 
          alt="MySQL" 
          width={size} 
          height={size} 
          style={{ objectFit: 'contain' }}
        />
      );

    case 'supabase':
      return (
        <img 
          src={supabaseIcon} 
          alt="Supabase" 
          width={size} 
          height={size} 
          style={{ objectFit: 'contain' }}
        />
      );

    case 'tailwind':
      return (
        <img 
          src={tailwindIcon} 
          alt="Tailwind CSS" 
          width={size} 
          height={size} 
          style={{ objectFit: 'contain' }}
        />
      );

    case 'git':
      return (
        <img 
          src={gitIcon} 
          alt="Git" 
          width={size} 
          height={size} 
          style={{ objectFit: 'contain' }}
        />
      );

    case 'vite':
      return (
        <img 
          src={viteIcon} 
          alt="Vite" 
          width={size} 
          height={size} 
          style={{ objectFit: 'contain' }}
        />
      );

    case 'python':
      return (
        <img 
          src={pythonIcon} 
          alt="Python" 
          width={size} 
          height={size} 
          style={{ objectFit: 'contain' }}
        />
      );

    case 'postman':
      return (
        <img 
          src={postmanIcon} 
          alt="postman" 
          width={size} 
          height={size} 
          style={{ objectFit: 'contain' }}
        />
      );

    case 'api':
      return <Database size={size} color="#FF3366" strokeWidth={2.2} />;

    case 'figma':
      return <FigmaIcon size={size} color={color} />;

    case 'creative':
      return <Sparkles size={size} color="#7928CA" strokeWidth={2.2} />;

    case 'problem':
      return <BrainCircuit size={size} color="#FF6B35" strokeWidth={2.2} />;

    default:
      return <Sparkles size={size} color={color} strokeWidth={2} />;
  }
}
