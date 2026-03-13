import { render, screen } from '@testing-library/react';
import { AppStoreBadge } from '@/components/shared/AppStoreBadge';

describe('AppStoreBadge', () => {
  it('renders an App Store link with correct aria-label', () => {
    render(<AppStoreBadge store="apple" />);
    const link = screen.getByRole('link', { name: /download on the app store/i });
    expect(link).toBeInTheDocument();
  });

  it('renders a Google Play link with correct aria-label', () => {
    render(<AppStoreBadge store="google" />);
    const link = screen.getByRole('link', { name: /get it on google play/i });
    expect(link).toBeInTheDocument();
  });

  it('renders both variants side by side', () => {
    render(
      <>
        <AppStoreBadge store="apple" />
        <AppStoreBadge store="google" />
      </>,
    );
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });
});
