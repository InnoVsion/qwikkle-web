import { render, screen } from '@testing-library/react';
import { DownloadSection } from '@/components/sections/DownloadSection';

describe('DownloadSection', () => {
  it('renders with correct test id', () => {
    render(<DownloadSection />);
    expect(screen.getByTestId('download-section')).toBeInTheDocument();
  });

  it('renders both app store badges', () => {
    render(<DownloadSection />);
    expect(screen.getByRole('link', { name: /download on the app store/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /get it on google play/i })).toBeInTheDocument();
  });

  it('renders trust points', () => {
    render(<DownloadSection />);
    expect(screen.getByText('Free forever')).toBeInTheDocument();
    expect(screen.getByText('No data collection')).toBeInTheDocument();
    expect(screen.getByText('Open source')).toBeInTheDocument();
  });
});
