import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppLayout } from '@/layouts/AppLayout';
import { Card, Badge } from '@/components/ui';
import { useTemplates } from '@/hooks/useTemplates';
import { ROUTES } from '@/routes/paths';
import styles from './ScalingListPage.module.scss';

export function ScalingListPage() {
  const { data: templates, isLoading, error } = useTemplates();

  return (
    <AppLayout>
      <div className={styles.page}>
        <header className={styles.header}>
          <h1>Scaling Evolution</h1>
          <p>Explore how architectures evolve from 100 to 100M users</p>
        </header>

        {isLoading && <p className={styles.status}>Loading...</p>}
        {error && <p className={styles.error}>Failed to load templates.</p>}

        <div className={styles.grid}>
          {templates?.map((template, i) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link to={ROUTES.scalingDetail(template.slug)}>
                <Card hover padding="lg" className={styles.card}>
                  <div className={styles.cardHeader}>
                    <h3>{template.name}</h3>
                    <Badge variant="primary">{template.stageCount} stages</Badge>
                  </div>
                  <p className={styles.tagline}>{template.tagline}</p>
                  <p className={styles.desc}>{template.description}</p>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
