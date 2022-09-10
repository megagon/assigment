import {
  configureStore, ThunkAction, Action, getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { counterSliceReducer } from '../features/counter/counterSlice';
import { launchesReducer } from '../features/launches/launchesSlice';

export const store = configureStore({
  reducer: {
    counter: counterSliceReducer,
    lauches: launchesReducer,
  },
  middleware: getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
