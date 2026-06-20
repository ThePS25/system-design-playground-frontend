import { useTemplates } from '@/hooks/useTemplates';
import styles from './TemplateSelector.module.scss';

interface TemplateSelectorProps {
  value: string;
  onChange: (slug: string) => void;
}

export function TemplateSelector({ value, onChange }: TemplateSelectorProps) {
  const { data: templates, isLoading } = useTemplates();

  return (
    <div className={styles.selector}>
      <label className={styles.label} htmlFor="template-select">
        Architecture
      </label>
      <select
        id="template-select"
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isLoading}
      >
        {!value && <option value="">Select template...</option>}
        {templates?.map((t) => (
          <option key={t.slug} value={t.slug}>
            {t.name}
          </option>
        ))}
      </select>
    </div>
  );
}
