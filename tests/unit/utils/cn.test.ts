import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils/cn';

describe('cn()', () => {
  it('merges class names', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
  });

  it('resolves Tailwind conflicts (last wins)', () => {
    expect(cn('px-4', 'px-6')).toBe('px-6');
  });

  it('handles conditional classes', () => {
    expect(cn('base', false && 'not-included', 'included')).toBe('base included');
  });
});
