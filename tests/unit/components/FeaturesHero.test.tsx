import { render, screen } from '@testing-library/react';
import { FeaturesHero } from '@/components/features/FeaturesHero';

describe('FeaturesHero', () => {
  it('renders the page heading', () => {
    render(<FeaturesHero />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders the tag badge', () => {
    render(<FeaturesHero />);
    expect(screen.getByText(/full feature overview/i)).toBeInTheDocument();
  });

  it('renders the subtext', () => {
    render(<FeaturesHero />);
    expect(screen.getByText(/simple, powerful, private/i)).toBeInTheDocument();
  });
});
