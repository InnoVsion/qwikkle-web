import { render, screen } from '@testing-library/react';
import { PrivacyPromiseCard } from '@/components/privacy/PrivacyPromiseCard';

describe('PrivacyPromiseCard', () => {
  it('renders the card heading', () => {
    render(<PrivacyPromiseCard />);
    expect(screen.getByRole('heading', { name: /our privacy promise/i })).toBeInTheDocument();
  });

  it('renders all four promise items', () => {
    render(<PrivacyPromiseCard />);
    expect(screen.getByText(/we never read your messages/i)).toBeInTheDocument();
    expect(screen.getByText(/we never sell your data/i)).toBeInTheDocument();
    expect(screen.getByText(/we never show you ads/i)).toBeInTheDocument();
    expect(screen.getByText(/we never share data with third parties/i)).toBeInTheDocument();
  });

  it('renders the explanatory paragraph', () => {
    render(<PrivacyPromiseCard />);
    expect(screen.getByText(/architecturally incapable/i)).toBeInTheDocument();
  });
});
