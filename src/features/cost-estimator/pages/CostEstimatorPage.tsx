import { AppLayout } from '@/layouts/AppLayout';
import { Button } from '@/components/ui';
import { InfraConfigForm } from '../components/InfraConfigForm';
import { CostSummary } from '../components/CostSummary';
import { CostCharts } from '../components/CostCharts';
import { useCalculateCost } from '@/hooks/useCalculateCost';
import { useCostStore } from '@/store';
import styles from './CostEstimatorPage.module.scss';

export function CostEstimatorPage() {
  const rps = useCostStore((s) => s.rps);
  const configuration = useCostStore((s) => s.configuration);
  const setEstimate = useCostStore((s) => s.setEstimate);
  const { mutate, isPending } = useCalculateCost();

  const handleCalculate = () => {
    mutate(
      { rps, configuration },
      { onSuccess: (result) => setEstimate(result) },
    );
  };

  return (
    <AppLayout>
      <div className={styles.page}>
        <header className={styles.header}>
          <div>
            <h1>Cost Estimator</h1>
            <p>Estimate monthly and yearly infrastructure costs</p>
          </div>
          <Button onClick={handleCalculate} loading={isPending} size="lg">
            Calculate Cost
          </Button>
        </header>

        <div className={styles.layout}>
          <div className={styles.config}>
            <InfraConfigForm />
          </div>
          <div className={styles.results}>
            <CostSummary />
            <CostCharts />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
