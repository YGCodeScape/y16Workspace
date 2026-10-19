/**
 * Direct Resume Download Handler for Y16Workspace
 * Generates and triggers instant download of an official Portfolio CV
 */
export function downloadResume() {
  const resumeContent = `=====================================================
            Y16WORKSPACE | PORTFOLIO RESUME
         Creative Developer & Design Engineer
              contact: hello@y16workspace.com
              web: https://y16workspace.dev
=====================================================

[ SUMMARY ]
Full-stack creative engineer with expertise in interactive 
web experiences, kinetic typography, modern design systems, 
and performance-obsessed frontends.

[ CORE STACK ]
- Frontend: React 19, Vite, Next.js, TypeScript, JavaScript
- Aesthetics: Kinetic Typography, Canvas 2D / WebGL, Framer Motion
- Styling: Custom CSS Design Systems, Modern UI/UX, Glassmorphism
- Backend / Cloud: Node.js, Express, REST/GraphQL, PostgreSQL

[ FEATURED PROJECTS ]
1. Y16Workspace Kinetic Canvas
   - Custom proximity-aware kinetic typography engine
   - Sub-millisecond letter-by-letter color interpolation
   - Interactive re-hide echo trail mechanics

2. Color Palettes & Generative Design Engine
   - Vector palette generator inspired by Coolors
   - High-contrast visual accessibility grading

[ EDUCATION & EXPERIENCE ]
- Senior Creative Developer & UI Architect
- Dedicated to crafting high-impact digital experiences

=====================================================
Downloaded from Y16Workspace Portfolio (Landing Page)
=====================================================`;

  const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Y16Workspace_Resume.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
