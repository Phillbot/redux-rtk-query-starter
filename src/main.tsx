import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { assertDefined } from 'handy-ts-tools';

import { App } from '@/app/app';

const rootElement = assertDefined(document.getElementById('root'), 'Root container not found');

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
