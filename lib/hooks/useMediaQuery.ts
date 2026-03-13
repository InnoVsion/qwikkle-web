'use client';

import { useState, useEffect } from 'react';

/**
 * Returns true when the given media query matches.
 * Safely handles SSR — defaults to false on the server.
 *
 * @param query - A valid CSS media query string, e.g. "(min-width: 768px)"
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    // Read initial value synchronously inside the effect to avoid
    // a separate setState call flagged by react-hooks/set-state-in-effect
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    // Sync state with the current match without a separate setState call
    if (media.matches !== matches) setMatches(media.matches);
    return () => media.removeEventListener('change', listener);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return matches;
}
