import type { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { store } from './store';

type StateProviderProps = Readonly<{
  children: ReactNode;
}>;

export const StateProvider = ({ children }: StateProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};
