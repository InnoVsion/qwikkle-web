import '@testing-library/jest-dom';
import { vi } from 'vitest';

// jsdom doesn't implement IntersectionObserver or ResizeObserver — both are
// called with `new` by framer-motion's whileInView and Next.js Image internals.
// They must be real constructors (not arrow functions) so `new Foo()` works.
class MockObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockObserver,
});

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  configurable: true,
  value: MockObserver,
});
