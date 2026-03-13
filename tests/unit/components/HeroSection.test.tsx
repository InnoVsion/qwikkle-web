// TODO: Expand once HeroSection receives typed props from CMS content schema
import { render, screen } from '@testing-library/react';
import { HeroSection } from '@/components/sections/HeroSection';

describe('HeroSection', () => {
  it('renders the section with correct test id', () => {
    render(<HeroSection />);
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
  });
});
