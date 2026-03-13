import { render, screen } from '@testing-library/react';
import { FeaturePreviewSection } from '@/components/sections/FeaturePreviewSection';

describe('FeaturePreviewSection', () => {
  it('renders with correct test id', () => {
    render(<FeaturePreviewSection />);
    expect(screen.getByTestId('features-preview-section')).toBeInTheDocument();
  });

  it('renders the section heading', () => {
    render(<FeaturePreviewSection />);
    expect(screen.getByRole('heading', { name: /why millions choose us/i })).toBeInTheDocument();
  });

  it('renders all three feature cards', () => {
    render(<FeaturePreviewSection />);
    expect(screen.getByRole('heading', { name: /military-grade encryption/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /instant delivery/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /works on every device/i })).toBeInTheDocument();
  });

  it('renders the explore all features link', () => {
    render(<FeaturePreviewSection />);
    const link = screen.getByRole('link', { name: /explore all features/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/features');
  });
});
