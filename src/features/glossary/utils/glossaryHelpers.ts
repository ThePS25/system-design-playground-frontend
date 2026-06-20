import type { GlossaryCategory, GlossaryTerm } from '@/types';
import { GLOSSARY_CATEGORIES, GLOSSARY_TERMS } from '../data/glossaryTerms';

export function isGlossaryCategory(value: string): value is GlossaryCategory {
  return value === 'hld' || value === 'lld';
}

export function getCategoryMeta(category: GlossaryCategory) {
  return GLOSSARY_CATEGORIES[category];
}

export function getTermsByCategory(category: GlossaryCategory): GlossaryTerm[] {
  return GLOSSARY_TERMS.filter((term) => term.category === category).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
}

export function getTerm(category: GlossaryCategory, slug: string): GlossaryTerm | undefined {
  return GLOSSARY_TERMS.find((term) => term.category === category && term.slug === slug);
}

export function getTermCount(category: GlossaryCategory): number {
  return getTermsByCategory(category).length;
}

export function resolveRelatedTerms(term: GlossaryTerm): GlossaryTerm[] {
  return term.relatedTerms
    .map((ref) => getTerm(ref.category, ref.slug))
    .filter((t): t is GlossaryTerm => Boolean(t));
}

export function searchTerms(category: GlossaryCategory, query: string): GlossaryTerm[] {
  const normalized = query.trim().toLowerCase();
  const terms = getTermsByCategory(category);

  if (!normalized) return terms;

  return terms.filter(
    (term) =>
      term.name.toLowerCase().includes(normalized) ||
      term.shortDefinition.toLowerCase().includes(normalized) ||
      term.definition.toLowerCase().includes(normalized),
  );
}
