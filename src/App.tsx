import { useEffect, useRef } from 'react';
import { AdminCMS } from './components/AdminCMS';
import './styles/base/reset.css';
import './styles/base/variables.css';
import './styles/admin-cms.css';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cmsRef = useRef<AdminCMS | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cms = new AdminCMS(() => {
      if (containerRef.current && cmsRef.current) {
        containerRef.current.innerHTML = cmsRef.current.renderAdminModalHTML();
        cmsRef.current.bindAdminEvents(containerRef.current);
      }
    });
    cmsRef.current = cms;

    containerRef.current.innerHTML = cms.renderAdminModalHTML();
    cms.bindAdminEvents(containerRef.current);
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
