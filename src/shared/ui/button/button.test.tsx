import { render, screen } from '@testing-library/react';

import { Button } from './button';

describe('Button', () => {
  it('renders label text', () => {
    render(<Button>Primary Action</Button>);

    expect(screen.getByRole('button', { name: 'Primary Action' })).toBeInTheDocument();
  });

  it('applies custom class names', () => {
    render(
      <Button className="data-test" variant="outline">
        Outline
      </Button>,
    );

    expect(screen.getByRole('button')).toHaveClass('data-test');
  });
});
