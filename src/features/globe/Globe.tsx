import React, { useCallback, useEffect, useMemo } from 'react';
import Globe from 'react-globe.gl';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchLaunches, selectLaunch } from '../launches/launchesSlice';

const markerSvg = `<svg viewBox="-4 0 36 36">
    <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
    <circle fill="black" cx="14" cy="14" r="7"></circle>
  </svg>`;

export const useMoonCalendar = () => {
  const dispatch = useAppDispatch();
  const launchPage = useAppSelector((state) => state.lauches);
  const selectedDate = useAppSelector((state) => state.lauches.selectedDate);
  const includeFailed = useAppSelector((state) => state.lauches.includeFailed);
  const includeSuccess = useAppSelector((state) => state.lauches.includeSuccessful);

  const padsLocations = useMemo(() => launchPage.launches?.results
    .map((launch) => ({
      lat: launch.pad.latitude, lng: launch.pad.longitude, size: Math.random() / 3, color: 'red', id: launch.id,
    })), [launchPage]);

  const selectLaunchAction = useCallback((id: string) => {
    dispatch(selectLaunch(id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchLaunches({ selectedDate, includeSuccess, includeFailed }));
  }, [dispatch, selectedDate, includeFailed, includeSuccess]);

  return { values: { padsLocations }, operations: { selectLaunchAction } };
};

export function MoonCalendar() {
  const { values: { padsLocations }, operations: { selectLaunchAction } } = useMoonCalendar();
  return (
    <Globe
      htmlElementsData={padsLocations}
      htmlElement={(d: any) => {
        const el = document.createElement('div');
        el.innerHTML = markerSvg;
        el.style.color = 'red';
        el.style.width = '20px';
        el.style.pointerEvents = 'auto';

        el.style.cursor = 'pointer';
        el.onclick = () => selectLaunchAction(d.id);
        return el;
      }}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
    />
  );
}
