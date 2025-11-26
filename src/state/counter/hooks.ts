import { useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks';

import { counterActions } from './counter-slice';

type UseCounterResult = Readonly<{
  value: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}>;

export const useCounter = (): UseCounterResult => {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state.counter.value);

  const actions = useMemo(
    () => ({
      increment: () => dispatch(counterActions.increment()),
      decrement: () => dispatch(counterActions.decrement()),
      reset: () => dispatch(counterActions.reset()),
    }),
    [dispatch],
  );

  return useMemo(() => ({ value, ...actions }), [actions, value]);
};
