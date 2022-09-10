import React from 'react';
import { useAppSelector } from '../../app/hooks';
import loader from './loading.gif';
import css from './styles.module.css';

const useLoader = () => {
  const status = useAppSelector((state) => state.lauches.status);
  const isOpen = status === 'loading';
  return { values: { isOpen } };
};
export function Loader() {
  const { values: { isOpen } } = useLoader();
  return <img src={loader} alt="" className={`${css.container} ${!isOpen ? css.hidden : ''}`} />;
}
