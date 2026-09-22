import { useEffect, useRef } from 'react';
import { AdminCMS } from './components/AdminCMS';
import { ThemeService } from './services/themeService';
import { ArticleService } from './services/articleService';
import { AuthorService } from './services/authorService';
import { SocialMediaService } from './services/socialMediaService';
import './styles/base/reset.css';
import './styles/base/variables.css';
import './styles/admin-cms.css';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cmsRef = useRef<AdminCMS | null>(null);

  useEffect(() => {
    // 1. Initialize Theme Mode
    ThemeService.init();

    if (!containerRef.current) return;

    // 2. Initialize CMS
    const cms = new AdminCMS(() => {
      if (containerRef.current && cmsRef.current) {
        containerRef.current.innerHTML = cmsRef.current.renderAdminModalHTML();
        cmsRef.current.bindAdminEvents(containerRef.current);
      }
    });
    cmsRef.current = cms;

    containerRef.current.innerHTML = cms.renderAdminModalHTML();
    cms.bindAdminEvents(containerRef.current);

    // 3. Proactive Background Synchronization with PostgreSQL Database
    Promise.allSettled([
      ArticleService.syncWithBackend(false),
      AuthorService.syncWithBackend(),
      SocialMediaService.syncWithBackend()
    ]).then(() => {
      if (containerRef.current && cmsRef.current) {
        containerRef.current.innerHTML = cmsRef.current.renderAdminModalHTML();
        cmsRef.current.bindAdminEvents(containerRef.current);
      }
    });
  }, []);

  return (
    <div
      id="studio-workspace"
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        position: 'fixed',
        inset: 0,
      }}
      ref={containerRef}
    />
  );
}
