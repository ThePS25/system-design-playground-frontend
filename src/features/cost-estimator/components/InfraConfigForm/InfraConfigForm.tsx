import { useCostStore } from '@/store';
import styles from './InfraConfigForm.module.scss';

const RPS_PRESETS = [1000, 10000, 50000, 100000, 500000];

export function InfraConfigForm() {
  const rps = useCostStore((s) => s.rps);
  const config = useCostStore((s) => s.configuration);
  const setRps = useCostStore((s) => s.setRps);
  const updateConfig = useCostStore((s) => s.updateConfig);

  return (
    <div className={styles.form}>
      <h3 className={styles.title}>Infrastructure Config</h3>

      <div className={styles.field}>
        <label>Expected RPS</label>
        <div className={styles.presets}>
          {RPS_PRESETS.map((level) => (
            <button
              key={level}
              type="button"
              className={`${styles.preset} ${rps === level ? styles.active : ''}`}
              onClick={() => setRps(level)}
            >
              {level >= 1000 ? `${level / 1000}K` : level}
            </button>
          ))}
        </div>
        <input
          type="number"
          className={styles.input}
          value={rps}
          onChange={(e) => setRps(Number(e.target.value) || 0)}
          min={0}
        />
      </div>

      <NumberField
        label="Application Servers"
        value={config.applicationServers.count}
        onChange={(v) =>
          updateConfig({ applicationServers: { ...config.applicationServers, count: v } })
        }
      />
      <NumberField
        label="Redis Clusters"
        value={config.redisClusters.count}
        onChange={(v) =>
          updateConfig({ redisClusters: { ...config.redisClusters, count: v } })
        }
      />
      <NumberField
        label="Databases"
        value={config.databases.count}
        onChange={(v) =>
          updateConfig({ databases: { ...config.databases, count: v } })
        }
      />
      <NumberField
        label="Read Replicas"
        value={config.databases.readReplicas ?? 0}
        onChange={(v) =>
          updateConfig({ databases: { ...config.databases, readReplicas: v } })
        }
      />
      <NumberField
        label="Load Balancers"
        value={config.loadBalancers.count}
        onChange={(v) =>
          updateConfig({ loadBalancers: { count: v } })
        }
      />
      <NumberField
        label="Kafka Clusters"
        value={config.kafkaClusters?.count ?? 0}
        onChange={(v) =>
          updateConfig({ kafkaClusters: { count: v } })
        }
      />
      <NumberField
        label="Object Storage (TB)"
        value={config.objectStorage?.storageTb ?? 0}
        onChange={(v) =>
          updateConfig({ objectStorage: { storageTb: v } })
        }
      />

      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={config.cdn.enabled}
          onChange={(e) =>
            updateConfig({ cdn: { ...config.cdn, enabled: e.target.checked } })
          }
        />
        Enable CDN
      </label>
      {config.cdn.enabled && (
        <NumberField
          label="CDN Bandwidth (TB)"
          value={config.cdn.bandwidthTb ?? 1}
          onChange={(v) =>
            updateConfig({ cdn: { ...config.cdn, bandwidthTb: v } })
          }
        />
      )}
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className={styles.field}>
      <label>{label}</label>
      <input
        type="number"
        className={styles.input}
        value={value}
        min={0}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
      />
    </div>
  );
}
