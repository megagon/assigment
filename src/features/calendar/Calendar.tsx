import React, { useCallback } from 'react';
import Calendar, { OnChangeDateRangeCallback } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectDate } from '../launches/launchesSlice';

export const useCalendarFilter = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.lauches.status);
  const selectedDate = useAppSelector((state) => state.lauches.selectedDate);
  const selectDateAction = useCallback((newRange: Parameters<OnChangeDateRangeCallback>[0]) => {
    if (status !== 'loading') {
      dispatch(selectDate({
        from: newRange[0].toUTCString(),
        to: newRange[1] ? newRange[1].toUTCString() : new Date().toUTCString(),
      }));
    }
  }, [dispatch, status]);

  return { values: { selectedDate }, operations: { selectDateAction } };
};
export function CalendarFilter() {
  const { values: { selectedDate }, operations: { selectDateAction } } = useCalendarFilter();

  return (
    <Calendar selectRange returnValue="range" onChange={selectDateAction} defaultValue={[selectedDate.from, selectedDate.to]} />
  );
}
