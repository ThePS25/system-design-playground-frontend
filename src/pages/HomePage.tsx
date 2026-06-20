import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppLayout } from '@/layouts/AppLayout';
import { Card, Badge } from '@/components/ui';
import { ROUTES } from '@/routes/paths';
import styles from './HomePage.module.scss';

const MODULES = [
  { route: ROUTES.learn, title: 'Start Here', desc: 'Guided path from zero — no prior experience needed', icon: '🚀', tag: 'Begin' },
  { route: ROUTES.explorer, title: 'Architecture Explorer', desc: 'Browse 8 reference system architectures with interactive nodes', icon: '🏗️', tag: 'Explore' },
  { route: ROUTES.traffic, title: 'Traffic Simulator', desc: 'Simulate traffic from 100 to 1M RPS and detect bottlenecks', icon: '📊', tag: 'Simulate' },
  { route: ROUTES.failure, title: 'Failure Simulator', desc: 'Toggle component failures and visualize cascade impact', icon: '💥', tag: 'Simulate' },
  { route: ROUTES.scaling, title: 'Scaling Evolution', desc: 'See how architectures evolve from 100 to 100M users', icon: '📈', tag: 'Learn' },
  { route: ROUTES.challenge, title: 'Design Challenge', desc: 'Interview-style challenges with rule-based scoring', icon: '🎯', tag: 'Practice' },
  { route: ROUTES.interview, title: 'Interview Prep', desc: 'Component knowledge base with interview questions', icon: '💬', tag: 'Study' },
  { route: ROUTES.glossary, title: 'Glossary', desc: 'HLD and LLD terms with definitions, examples, and interview tips', icon: '📖', tag: 'Study' },
  { route: ROUTES.cost, title: 'Cost Estimator', desc: 'Estimate monthly infrastructure costs with breakdowns', icon: '💰', tag: 'Plan' },
];

export function HomePage() {
  return (
    <AppLayout>
      <div className={styles.page}>
        <motion.section
          className={styles.hero}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="primary">Learn from scratch</Badge>
          <h1 className={styles.title}>
            Welcome to
            <span className={styles.highlight}> DesignScape</span>
          </h1>
          <p className={styles.subtitle}>
            A visual playground for system design — start with the guided path,
            then explore architectures, run simulations, and practice interview challenges.
          </p>
          <Link to={ROUTES.learn} className={styles.cta}>
            Start learning →
          </Link>
        </motion.section>

        <section className={styles.grid}>
          {MODULES.map((mod, i) => (
            <motion.div
              key={mod.route}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link to={mod.route}>
                <Card hover padding="lg" className={styles.moduleCard}>
                  <div className={styles.moduleIcon}>{mod.icon}</div>
                  <Badge>{mod.tag}</Badge>
                  <h3 className={styles.moduleTitle}>{mod.title}</h3>
                  <p className={styles.moduleDesc}>{mod.desc}</p>
                </Card>
              </Link>
            </motion.div>
          ))}
        </section>
      </div>
    </AppLayout>
  );
}
