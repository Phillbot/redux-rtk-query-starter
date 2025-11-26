import { configureStore } from '@reduxjs/toolkit';

import { counterReducer } from './counter/counter-slice';
import { healthApi } from './health/health-api';
import { uuidApi } from './uuid/uuid-api';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [healthApi.reducerPath]: healthApi.reducer,
    [uuidApi.reducerPath]: uuidApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(healthApi.middleware, uuidApi.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
