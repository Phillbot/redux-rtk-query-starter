import type { Story } from '@ladle/react';

import { Button } from './button';

export const Primary: Story = () => <Button>Primary action</Button>;

export const Outline: Story = () => (
  <Button variant="outline">Outline action</Button>
);

export const Ghost: Story = () => (
  <Button variant="ghost">Ghost action</Button>
);

export default {
  title: 'shared/Button',
};
