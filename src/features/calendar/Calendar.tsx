import React, { useCallback } from 'react';
import Calendar, { OnChangeDateRangeCallback } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectDate } from '../launches/launchesSlice';
import css from './styles.module.css';

export const useCalendarFilter = () => {
  const dispatch = useAppDispatch();
  const selectedDate = useAppSelector((state) => state.lauches.selectedDate);
  const selectDateAction = useCallback((newRange: Parameters<OnChangeDateRangeCallback>[0]) => {
    dispatch(selectDate({
      from: newRange[0].toISOString(),
      to: newRange[1] ? newRange[1].toISOString() : new Date().toISOString(),
    }));
  }, [dispatch]);

  return { values: { selectedDate }, operations: { selectDateAction } };
};
export function CalendarFilter() {
  const { values: { selectedDate }, operations: { selectDateAction } } = useCalendarFilter();

  return (
    <Calendar className={css.container} selectRange returnValue="range" onChange={selectDateAction} defaultValue={[selectedDate.from, selectedDate.to]} />
  );
}
