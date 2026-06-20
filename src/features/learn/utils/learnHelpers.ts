import { LEARN_LESSONS } from '../data/learnPath';
import type { LearnLesson } from '@/types';

export function getLessons(): LearnLesson[] {
  return [...LEARN_LESSONS].sort((a, b) => a.order - b.order);
}

export function getLesson(slug: string): LearnLesson | undefined {
  return LEARN_LESSONS.find((lesson) => lesson.slug === slug);
}

export function getAdjacentLessons(slug: string): {
  prev: LearnLesson | null;
  next: LearnLesson | null;
} {
  const lessons = getLessons();
  const index = lessons.findIndex((lesson) => lesson.slug === slug);

  return {
    prev: index > 0 ? lessons[index - 1] : null,
    next: index >= 0 && index < lessons.length - 1 ? lessons[index + 1] : null,
  };
}
