import { Suspense } from 'react';

import { ErrorBoundary, SuspenseFallback } from '@/shared/ui';
import { FeatureFlagsPanel } from '@/shared/dev-tools';

import { AppRouter } from './router';
import { AppProviders } from './providers/app-providers';
import './styles/index.scss';

export const App = () => (
  <AppProviders>
    <div className="app min-h-screen bg-base-dark/95 text-surface">
      <ErrorBoundary>
        <Suspense fallback={<SuspenseFallback />}>
          <AppRouter />
        </Suspense>
      </ErrorBoundary>
      {import.meta.env.DEV && <FeatureFlagsPanel />}
    </div>
  </AppProviders>
);
