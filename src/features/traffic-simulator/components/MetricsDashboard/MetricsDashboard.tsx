import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { useSimulationStore } from '@/store';
import styles from './MetricsDashboard.module.scss';

const CHART_COLORS = {
  primary: '#456882',
  accent: '#D2C1B6',
  success: '#4ade80',
  warning: '#fbbf24',
  danger: '#f87171',
};

export function MetricsDashboard() {
  const result = useSimulationStore((s) => s.result);

  if (!result) {
    return (
      <div className={styles.empty}>
        <p>Select a template and run a simulation to see metrics.</p>
      </div>
    );
  }

  const { metrics } = result;

  const gaugeData = [
    { name: 'CPU', value: metrics.cpu, fill: metrics.cpu > 85 ? CHART_COLORS.danger : CHART_COLORS.primary },
    { name: 'Memory', value: metrics.memory, fill: metrics.memory > 85 ? CHART_COLORS.warning : CHART_COLORS.accent },
    { name: 'Cache Hit', value: Math.round(metrics.cacheHitRate * 100), fill: CHART_COLORS.success },
  ];

  const throughputData = [
    { name: 'Target', rps: result.rps },
    { name: 'Actual', rps: metrics.throughput },
  ];

  const latencyData = [
    { name: 'p99', ms: metrics.latency },
    { name: 'Queue', ms: Math.min(metrics.queueDepth / 100, metrics.latency) },
  ];

  return (
    <div className={styles.dashboard}>
      <h3 className={styles.title}>Metrics</h3>

      <div className={styles.stats}>
        <Stat label="Throughput" value={`${metrics.throughput.toLocaleString()} RPS`} />
        <Stat label="Latency (p99)" value={`${metrics.latency} ms`} />
        <Stat label="Cache Hit Rate" value={`${Math.round(metrics.cacheHitRate * 100)}%`} />
        <Stat label="Queue Depth" value={metrics.queueDepth.toLocaleString()} />
        <Stat label="Error Rate" value={`${(metrics.errorRate * 100).toFixed(2)}%`} />
      </div>

      <div className={styles.chartBlock}>
        <span className={styles.chartLabel}>Utilization</span>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={gaugeData} layout="vertical">
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis type="category" dataKey="name" width={70} tick={{ fill: '#D2C1B6', fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                background: '#234C6A',
                border: '1px solid rgba(210,193,182,0.2)',
                borderRadius: 8,
                color: '#D2C1B6',
              }}
            />
            <Bar dataKey="value" radius={4} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.chartBlock}>
        <span className={styles.chartLabel}>Throughput</span>
        <ResponsiveContainer width="100%" height={100}>
          <AreaChart data={throughputData}>
            <XAxis dataKey="name" tick={{ fill: '#D2C1B6', fontSize: 11 }} />
            <YAxis tick={{ fill: '#D2C1B6', fontSize: 10 }} />
            <Tooltip
              contentStyle={{
                background: '#234C6A',
                border: '1px solid rgba(210,193,182,0.2)',
                borderRadius: 8,
              }}
            />
            <Area type="monotone" dataKey="rps" stroke={CHART_COLORS.primary} fill={CHART_COLORS.primary} fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.chartBlock}>
        <span className={styles.chartLabel}>Latency Profile</span>
        <ResponsiveContainer width="100%" height={100}>
          <BarChart data={latencyData}>
            <XAxis dataKey="name" tick={{ fill: '#D2C1B6', fontSize: 11 }} />
            <YAxis tick={{ fill: '#D2C1B6', fontSize: 10 }} />
            <Tooltip
              contentStyle={{
                background: '#234C6A',
                border: '1px solid rgba(210,193,182,0.2)',
                borderRadius: 8,
              }}
            />
            <Bar dataKey="ms" fill={CHART_COLORS.accent} radius={4} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.stat}>
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statValue}>{value}</span>
    </div>
  );
}
