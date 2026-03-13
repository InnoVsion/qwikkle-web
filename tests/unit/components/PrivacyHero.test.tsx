import { render, screen } from '@testing-library/react';
import { PrivacyHero } from '@/components/privacy/PrivacyHero';

describe('PrivacyHero', () => {
  it('renders the Privacy Policy heading', () => {
    render(<PrivacyHero />);
    expect(screen.getByRole('heading', { name: /privacy policy/i, level: 1 })).toBeInTheDocument();
  });

  it('renders the last updated badge', () => {
    render(<PrivacyHero />);
    expect(screen.getByText(/last updated/i)).toBeInTheDocument();
  });

  it("renders the privacy tagline", () => {
    render(<PrivacyHero />);
    expect(screen.getByText(/we don't read your messages/i)).toBeInTheDocument();
  });

  it('renders the description paragraph', () => {
    render(<PrivacyHero />);
    expect(screen.getByText(/privacy as the foundation/i)).toBeInTheDocument();
  });
});
