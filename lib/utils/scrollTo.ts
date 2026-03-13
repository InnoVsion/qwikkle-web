/**
 * Smoothly scrolls to a section on the landing page.
 * Used by the navbar CTA buttons.
 *
 * @param sectionId - The HTML id of the target section
 * @param offset - Additional pixel offset from the top (default: 80px for fixed navbar)
 */
export function scrollToSection(sectionId: string, offset: number = 80): void {
  const el = document.getElementById(sectionId);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}
