import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type CounterState = Readonly<{
  value: number;
}>;

const initialState: CounterState = { value: 0 };

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },
    set(state, action: PayloadAction<number>) {
      state.value = action.payload;
    },
    reset() {
      return initialState;
    },
  },
});

export const counterActions = counterSlice.actions;
export const counterReducer = counterSlice.reducer;
