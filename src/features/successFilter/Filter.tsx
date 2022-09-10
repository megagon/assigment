import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toggleIncludeFaled, toggleIncludeSuccessful } from '../launches/launchesSlice';
import css from './styles.module.css';

const useFilter = () => {
  const dispatch = useAppDispatch();
  const toggleSuccessAction = useCallback(() => {
    dispatch(toggleIncludeSuccessful());
  }, [dispatch]);
  const toggleFailedAction = useCallback(() => {
    dispatch(toggleIncludeFaled());
  }, [dispatch]);
  const includeSuccessful = useAppSelector((state) => state.lauches.includeSuccessful);
  const includeFailed = useAppSelector((state) => state.lauches.includeFailed);
  return {
    values: { includeFailed, includeSuccessful },
    operations: { toggleFailedAction, toggleSuccessAction },
  };
};
export function SuccessFilter() {
  const {
    values:
  { includeSuccessful, includeFailed }, operations: { toggleSuccessAction, toggleFailedAction },
  } = useFilter();
  return (
    <div className={css.container}>
      <span> Successfull </span>
      <input checked={includeSuccessful} onChange={toggleSuccessAction} type="checkbox" />
      <span> Failed </span>
      <input checked={includeFailed} onChange={toggleFailedAction} type="checkbox" />
    </div>
  );
}
