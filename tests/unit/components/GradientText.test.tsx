import { render, screen } from '@testing-library/react';
import { GradientText } from '@/components/shared/GradientText';

describe('GradientText', () => {
  it('renders children text', () => {
    render(<GradientText>Hello world</GradientText>);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('applies the gradient inline style', () => {
    render(<GradientText>Test</GradientText>);
    const el = screen.getByText('Test');
    expect(el).toHaveStyle({ WebkitTextFillColor: 'transparent' });
  });

  it('forwards additional className', () => {
    render(<GradientText className="font-bold">Text</GradientText>);
    expect(screen.getByText('Text')).toHaveClass('font-bold');
  });
});
