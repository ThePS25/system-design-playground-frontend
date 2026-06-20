import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { useCostStore } from '@/store';
import styles from './CostCharts.module.scss';

const COLORS = ['#456882', '#D2C1B6', '#4ade80', '#fbbf24', '#f87171', '#527a96', '#8b7355'];

export function CostCharts() {
  const estimate = useCostStore((s) => s.estimate);

  if (!estimate) return null;

  return (
    <div className={styles.charts}>
      <div className={styles.chartBlock}>
        <h4>Cost by Category</h4>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={estimate.charts.byCategory}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ category, percent }) =>
                `${category} ${(percent * 100).toFixed(0)}%`
              }
            >
              {estimate.charts.byCategory.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: '#234C6A',
                border: '1px solid rgba(210,193,182,0.2)',
                borderRadius: 8,
                color: '#D2C1B6',
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Cost']}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.chartBlock}>
        <h4>12-Month Projection</h4>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={estimate.charts.monthlyProjection}>
            <XAxis dataKey="month" tick={{ fill: '#D2C1B6', fontSize: 10 }} />
            <YAxis tick={{ fill: '#D2C1B6', fontSize: 10 }} />
            <Tooltip
              contentStyle={{
                background: '#234C6A',
                border: '1px solid rgba(210,193,182,0.2)',
                borderRadius: 8,
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Cost']}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#456882"
              strokeWidth={2}
              dot={{ fill: '#D2C1B6' }}
              name="Monthly Cost"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
