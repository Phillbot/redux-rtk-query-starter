import type { ReactNode } from 'react';

import { StateProvider } from '@/state/provider';
import { FeatureFlagsProvider } from '@/app/providers/feature-flags-provider';
import '@/shared/config/i18n';

type AppProvidersProps = Readonly<{
  children: ReactNode;
}>;

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <FeatureFlagsProvider>
      <StateProvider>{children}</StateProvider>
    </FeatureFlagsProvider>
  );
};
