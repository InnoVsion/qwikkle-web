import { render, screen } from '@testing-library/react';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';

describe('TestimonialsSection', () => {
  it('renders with correct test id', () => {
    render(<TestimonialsSection />);
    expect(screen.getByTestId('testimonials-section')).toBeInTheDocument();
  });

  it('renders the section heading', () => {
    render(<TestimonialsSection />);
    expect(screen.getByRole('heading', { name: /what people are saying/i })).toBeInTheDocument();
  });

  it('renders all six testimonials', () => {
    render(<TestimonialsSection />);
    const quotes = screen.getAllByRole('blockquote');
    expect(quotes).toHaveLength(6);
  });

  it('renders star ratings accessible to assistive technology', () => {
    render(<TestimonialsSection />);
    const ratings = screen.getAllByRole('img', { name: /5 out of 5 stars/i });
    expect(ratings).toHaveLength(6);
  });
});
