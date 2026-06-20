import { NavLink } from 'react-router-dom';
import { useUiStore } from '@/store';
import { ROUTES } from '@/routes/paths';
import styles from './Sidebar.module.scss';

const NAV_ITEMS = [
  { to: ROUTES.home, label: 'Home', icon: '🏠' },
  { to: ROUTES.learn, label: 'Start Here', icon: '🚀' },
  { to: ROUTES.explorer, label: 'Architecture Explorer', icon: '🏗️' },
  { to: ROUTES.traffic, label: 'Traffic Simulator', icon: '📊' },
  { to: ROUTES.failure, label: 'Failure Simulator', icon: '💥' },
  { to: ROUTES.scaling, label: 'Scaling Evolution', icon: '📈' },
  { to: ROUTES.challenge, label: 'Design Challenge', icon: '🎯' },
  { to: ROUTES.interview, label: 'Interview Prep', icon: '💬' },
  { to: ROUTES.glossary, label: 'Glossary', icon: '📖' },
  { to: ROUTES.cost, label: 'Cost Estimator', icon: '💰' },
];

export function Sidebar() {
  const collapsed = useUiStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>◆</span>
          {!collapsed && <span className={styles.logoText}>DesignScape</span>}
        </div>
        <button className={styles.toggle} onClick={toggleSidebar} aria-label="Toggle sidebar">
          {collapsed ? '→' : '←'}
        </button>
      </div>

      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
            title={item.label}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            {!collapsed && <span className={styles.navLabel}>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {!collapsed && (
        <div className={styles.footer}>
          <span className={styles.footerText}>DesignScape v1.0</span>
        </div>
      )}
    </aside>
  );
}
