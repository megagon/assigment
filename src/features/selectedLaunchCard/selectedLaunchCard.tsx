import React from 'react';
import { useAppSelector } from '../../app/hooks';
import css from './styles.module.css';

const useSelectedLaunchCard = () => {
  const launches = useAppSelector((state) => state.lauches.launches);
  const selectedLaunch = useAppSelector((state) => state.lauches.selectedLaunch);
  const fullLaunch = launches?.results.find((launch) => launch.id === selectedLaunch);
  const isOpen = !!fullLaunch;
  return { values: { selectedLaunch: fullLaunch, isOpen } };
};
export function SelectedLaunchCard() {
  const { values: { selectedLaunch, isOpen } } = useSelectedLaunchCard();
  return (
    <div className={`${css.container} ${!isOpen ? css.hidden : ''}`}>
      <div className={css.rowContainer}>
        <span>
          launch name:
        </span>
        <span>
          {selectedLaunch?.name}
        </span>
      </div>
      <div className={css.rowContainer}>
        <span>
          pad name:
        </span>
        <span>
          {selectedLaunch?.pad.name}
        </span>
      </div>
      <div className={css.rowContainer}>
        <span>
          window start:
        </span>
        <span>
          {selectedLaunch?.window_start}
        </span>
      </div>
    </div>
  );
}
