import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addMonths, endOfDay, isAfter, startOfDay,
} from 'date-fns';
import { fetchLaunchesApi, LaunchPage } from './launchesAPI';

export interface LaunchesState {
  launches: LaunchPage | null,
  selectedDate: { from: Date, to: Date },
  status: 'loading' | 'idle' | 'error',
  selectedLaunch: string,
}

const initialState: LaunchesState = {
  launches: null,
  selectedDate: { from: startOfDay(new Date()), to: endOfDay(addMonths(new Date(), 3)) },
  status: 'idle',
  selectedLaunch: '',
};

export const fetchLaunches = createAsyncThunk(
  'launches/fetchCount',
  async (args: Parameters<typeof fetchLaunchesApi>[0]) => {
    const response = await fetchLaunchesApi(args);
    return response;
  },
);

export const launchesSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    selectDate: (state, action: PayloadAction<{ from: string, to: string }>) => {
      state.selectedDate.from = new Date(action.payload.from);
      state.selectedDate.to = new Date(action.payload.to);
    },
    selectLaunch: (state, action: PayloadAction<string>) => {
      state.selectedLaunch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLaunches.pending, (state) => {
        state.status = 'loading';
        state.launches = null;
      })
      .addCase(fetchLaunches.fulfilled, (state, action) => {
        state.status = 'idle';
        state.launches = action.payload;
        state.selectedLaunch = [...action.payload.results].sort((a, b) => (
          isAfter(new Date(a.window_start), new Date(b.window_start)) ? 0 : 1))[0].id;
      })
      .addCase(fetchLaunches.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { selectDate, selectLaunch } = launchesSlice.actions;

export const launchesReducer = launchesSlice.reducer;
